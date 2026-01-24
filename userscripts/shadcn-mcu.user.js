// ==UserScript==
// @name         Shadcn MCU Colors
// @namespace    https://github.com/abernier/react-mcu
// @version      1.0.0
// @description  Extract shadcn primary color and generate MCU color scheme
// @author       abernier
// @match        *://*/*
// @grant        none
// @require      https://cdn.jsdelivr.net/npm/@material/material-color-utilities@0.3.0/dist/bundle.min.js
// ==/UserScript==

(function() {
    'use strict';

    // Wait for the page to load
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

    function init() {
        // Check if this is a shadcn site by looking for --primary CSS variable
        const primaryColor = getShadcnPrimaryColor();
        
        if (!primaryColor) {
            console.log('[Shadcn MCU] No shadcn primary color found on this page');
            return;
        }

        console.log('[Shadcn MCU] Found shadcn primary color:', primaryColor);
        
        // Generate and inject MCU colors
        injectMcuColors(primaryColor);
        
        console.log('[Shadcn MCU] MCU colors injected successfully');
    }

    /**
     * Get the shadcn --primary color from the page
     * @returns {string|null} The primary color in hex format, or null if not found
     */
    function getShadcnPrimaryColor() {
        // Get the computed style of the root element
        const rootStyles = getComputedStyle(document.documentElement);
        
        // Get the --primary variable value
        const primaryValue = rootStyles.getPropertyValue('--primary').trim();
        
        if (!primaryValue) {
            return null;
        }

        // shadcn uses HSL values like "222.2 47.4% 11.2%"
        // We need to convert this to hex
        if (primaryValue.includes('%')) {
            return hslToHex(primaryValue);
        }
        
        // If it's already a hex color
        if (primaryValue.startsWith('#')) {
            return primaryValue;
        }
        
        return null;
    }

    /**
     * Convert HSL string to hex color
     * @param {string} hslString - HSL string like "222.2 47.4% 11.2%"
     * @returns {string} Hex color like "#0e1216"
     */
    function hslToHex(hslString) {
        const parts = hslString.split(/\s+/);
        const h = parseFloat(parts[0]);
        const s = parseFloat(parts[1]) / 100;
        const l = parseFloat(parts[2]) / 100;

        const c = (1 - Math.abs(2 * l - 1)) * s;
        const x = c * (1 - Math.abs((h / 60) % 2 - 1));
        const m = l - c / 2;

        let r = 0, g = 0, b = 0;

        if (h >= 0 && h < 60) {
            r = c; g = x; b = 0;
        } else if (h >= 60 && h < 120) {
            r = x; g = c; b = 0;
        } else if (h >= 120 && h < 180) {
            r = 0; g = c; b = x;
        } else if (h >= 180 && h < 240) {
            r = 0; g = x; b = c;
        } else if (h >= 240 && h < 300) {
            r = x; g = 0; b = c;
        } else if (h >= 300 && h < 360) {
            r = c; g = 0; b = x;
        }

        r = Math.round((r + m) * 255);
        g = Math.round((g + m) * 255);
        b = Math.round((b + m) * 255);

        return '#' + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
    }

    /**
     * Convert string to kebab-case
     * @param {string} str - Input string
     * @returns {string} Kebab-cased string
     */
    function kebabCase(str) {
        return str
            .replace(/([a-z])([A-Z])/g, '$1-$2')
            .replace(/[\s_]+/g, '-')
            .toLowerCase();
    }

    /**
     * Generate MCU colors and inject them into the page
     * @param {string} sourceHex - Source color in hex format
     */
    function injectMcuColors(sourceHex) {
        // Use the Material Color Utilities library (loaded via @require)
        const {
            argbFromHex,
            CorePalette,
            hexFromArgb,
            MaterialDynamicColors,
            SchemeTonalSpot,
            Hct
        } = window.MaterialColorUtilities;

        // Token names for MCU colors
        const tokenNames = [
            "background",
            "onBackground",
            "surface",
            "surfaceDim",
            "surfaceBright",
            "surfaceContainerLowest",
            "surfaceContainerLow",
            "surfaceContainer",
            "surfaceContainerHigh",
            "surfaceContainerHighest",
            "onSurface",
            "onSurfaceVariant",
            "outline",
            "outlineVariant",
            "inverseSurface",
            "inverseOnSurface",
            "primary",
            "onPrimary",
            "primaryContainer",
            "onPrimaryContainer",
            "primaryFixed",
            "primaryFixedDim",
            "onPrimaryFixed",
            "onPrimaryFixedVariant",
            "inversePrimary",
            "secondary",
            "onSecondary",
            "secondaryContainer",
            "onSecondaryContainer",
            "secondaryFixed",
            "secondaryFixedDim",
            "onSecondaryFixed",
            "onSecondaryFixedVariant",
            "tertiary",
            "onTertiary",
            "tertiaryContainer",
            "onTertiaryContainer",
            "tertiaryFixed",
            "tertiaryFixedDim",
            "onTertiaryFixed",
            "onTertiaryFixedVariant",
            "error",
            "onError",
            "errorContainer",
            "onErrorContainer",
            "scrim",
            "shadow"
        ];

        const STANDARD_TONES = [0, 5, 10, 15, 20, 25, 30, 35, 40, 50, 60, 70, 80, 90, 95, 98, 99, 100];

        // Convert source hex to ARGB
        const sourceArgb = argbFromHex(sourceHex);
        const hct = Hct.fromInt(sourceArgb);

        // Create light and dark schemes
        const lightScheme = new SchemeTonalSpot(hct, false, 0);
        const darkScheme = new SchemeTonalSpot(hct, true, 0);

        // Create CorePalette for tonal palette access
        const corePalette = CorePalette.of(sourceArgb);

        // Generate CSS variables for base colors
        const generateColorVars = (scheme) => {
            const vars = [];
            tokenNames.forEach(tokenName => {
                const dynamicColor = MaterialDynamicColors[tokenName];
                if (dynamicColor) {
                    const argb = dynamicColor.getArgb(scheme);
                    const hex = hexFromArgb(argb);
                    const varName = `--mcu-${kebabCase(tokenName)}`;
                    vars.push(`${varName}:${hex};`);
                }
            });
            return vars.join(' ');
        };

        // Generate tonal palette vars
        const generateTonalPaletteVars = (paletteName, palette) => {
            return STANDARD_TONES.map(tone => {
                const color = palette.tone(tone);
                const hex = hexFromArgb(color);
                return `--mcu-${paletteName}-${tone}:${hex};`;
            }).join(' ');
        };

        const lightVars = generateColorVars(lightScheme);
        const darkVars = generateColorVars(darkScheme);

        const coreColorsTonalVars = [
            generateTonalPaletteVars('primary', corePalette.a1),
            generateTonalPaletteVars('secondary', corePalette.a2),
            generateTonalPaletteVars('tertiary', corePalette.a3),
            generateTonalPaletteVars('neutral', corePalette.n1),
            generateTonalPaletteVars('neutral-variant', corePalette.n2),
            generateTonalPaletteVars('error', corePalette.error)
        ].join(' ');

        // Create the CSS
        const css = `
:root { ${lightVars} ${coreColorsTonalVars} }
.dark { ${darkVars} }
`;

        // Inject the CSS into the page
        const styleId = 'shadcn-mcu-colors';
        let styleEl = document.getElementById(styleId);
        
        if (!styleEl) {
            styleEl = document.createElement('style');
            styleEl.id = styleId;
            document.head.appendChild(styleEl);
        }
        
        styleEl.textContent = css;
    }

})();
