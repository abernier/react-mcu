#!/usr/bin/env node

/**
 * Build a single-file HTML version of the Storybook static export.
 *
 * Usage:
 *   node scripts/build-storybook-single.mjs
 *
 * This script:
 *   1. Runs `storybook build` with vite-plugin-singlefile enabled (via STORYBOOK_SINGLE_FILE env)
 *   2. Post-processes the output to produce a single self-contained HTML file
 *      - Inlines all JS, CSS, fonts and images as data URIs
 *      - Embeds the iframe preview inside the manager HTML
 */

import { execSync } from "node:child_process";
import { readFileSync, writeFileSync, mkdirSync, existsSync } from "node:fs";
import { resolve, dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, "..");
const STATIC_DIR = join(ROOT, "storybook-static");
const OUT_DIR = join(ROOT, "storybook-single");
const OUT_FILE = join(OUT_DIR, "index.html");

// ── 1. Build storybook with single-file plugin ────────────────────────
console.log("Building Storybook with vite-plugin-singlefile…");
execSync("npx storybook build", {
  cwd: ROOT,
  stdio: "inherit",
  env: { ...process.env, STORYBOOK_SINGLE_FILE: "1" },
});

// ── helpers ────────────────────────────────────────────────────────────
function read(relPath) {
  return readFileSync(join(STATIC_DIR, relPath), "utf-8");
}

function readBinary(relPath) {
  return readFileSync(join(STATIC_DIR, relPath));
}

function toDataURI(relPath) {
  const buf = readBinary(relPath);
  const ext = relPath.split(".").pop();
  const mime =
    ext === "woff2"
      ? "font/woff2"
      : ext === "svg"
        ? "image/svg+xml"
        : ext === "mp4"
          ? "video/mp4"
          : "application/octet-stream";
  return `data:${mime};base64,${buf.toString("base64")}`;
}

/** Replace url('./relative/path.woff2') in CSS with data URIs */
function inlineFontUrls(html) {
  return html.replace(
    /url\(['"]?(\.\/(sb-common-assets\/[^'")]+\.woff2))['"]?\)/g,
    (_match, relPath) => {
      return `url('${toDataURI(relPath)}')`;
    },
  );
}

/** Replace <link rel="icon" ... href="./path.svg"> with inline data URI */
function inlineFavicon(html) {
  return html.replace(
    /(<link\s+rel="icon"[^>]*href=")([^"]+)("[^>]*>)/gi,
    (_match, before, href, after) => {
      const relPath = href.replace(/^\.\//, "");
      if (existsSync(join(STATIC_DIR, relPath))) {
        return `${before}${toDataURI(relPath)}${after}`;
      }
      return _match;
    },
  );
}

// ── 2. Process iframe.html ─────────────────────────────────────────────
console.log("Processing iframe.html…");
let iframeHtml = read("iframe.html");

// Remove orphaned <script src="./vite-inject-mocker-entry.js"> tag (already inlined by plugin)
iframeHtml = iframeHtml.replace(
  /<script[^>]*src="\.\/vite-inject-mocker-entry\.js"[^>]*><\/script>\s*/g,
  "",
);

// Inline font urls
iframeHtml = inlineFontUrls(iframeHtml);

// ── 3. Process index.html ──────────────────────────────────────────────
console.log("Processing index.html…");
let indexHtml = read("index.html");

// Inline font urls
indexHtml = inlineFontUrls(indexHtml);

// Inline favicon
indexHtml = inlineFavicon(indexHtml);

// Remove <link rel="modulepreload"> tags (we'll inline the scripts)
indexHtml = indexHtml.replace(
  /\s*<link\s+href="[^"]*"\s+rel="modulepreload"\s*\/?\s*>\s*/g,
  "\n",
);

// Find the <script type="module"> block with imports and inline each module
indexHtml = indexHtml.replace(
  /<script type="module">\s*([\s\S]*?)\s*<\/script>/,
  (_match, importBlock) => {
    // Parse import statements
    const importRegex = /import\s+['"]([^'"]+)['"]\s*;?/g;
    let importMatch;
    const scripts = [];
    while ((importMatch = importRegex.exec(importBlock)) !== null) {
      const modulePath = importMatch[1].replace(/^\.\//, "");
      try {
        const content = read(modulePath);
        scripts.push(`<script type="module">\n${content}\n</script>`);
      } catch {
        console.warn(`  ⚠ Could not read ${modulePath}, skipping`);
      }
    }
    return scripts.join("\n");
  },
);

// ── 4. Embed iframe into index.html ────────────────────────────────────
console.log("Embedding iframe into single HTML…");

// Escape the iframe HTML for embedding in a JS template literal
const escapedIframe = iframeHtml
  .replace(/\\/g, "\\\\")
  .replace(/`/g, "\\`")
  .replace(/\$\{/g, "\\${");

// Add a script before the closing </body> that:
// - Creates a blob URL from the embedded iframe content
// - Intercepts iframe src assignment to use the blob URL
const embedScript = `
<script>
(function() {
  var IFRAME_HTML = \`${escapedIframe}\`;
  var blob = new Blob([IFRAME_HTML], { type: 'text/html' });
  var IFRAME_BLOB_URL = URL.createObjectURL(blob);

  // Intercept iframe src to replace iframe.html with blob URL
  var origCreateElement = document.createElement.bind(document);
  document.createElement = function(tag, opts) {
    var el = origCreateElement(tag, opts);
    if (tag.toLowerCase() === 'iframe') {
      var origSrcDesc = Object.getOwnPropertyDescriptor(HTMLIFrameElement.prototype, 'src');
      Object.defineProperty(el, 'src', {
        set: function(val) {
          if (typeof val === 'string' && val.indexOf('iframe.html') !== -1) {
            val = IFRAME_BLOB_URL + val.substring(val.indexOf('?'));
          }
          origSrcDesc.set.call(this, val);
        },
        get: function() {
          return origSrcDesc.get.call(this);
        },
        configurable: true
      });
    }
    return el;
  };
})();
</script>`;

indexHtml = indexHtml.replace("</body>", `${embedScript}\n</body>`);

// ── 5. Write output ────────────────────────────────────────────────────
mkdirSync(OUT_DIR, { recursive: true });
writeFileSync(OUT_FILE, indexHtml, "utf-8");

const sizeMB = (Buffer.byteLength(indexHtml) / 1024 / 1024).toFixed(2);
console.log(`\n✅ Single-file Storybook written to: ${OUT_FILE}`);
console.log(`   Size: ${sizeMB} MB`);
