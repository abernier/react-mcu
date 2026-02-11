/// <reference types="vite/client" />

// Type definition for importing SVG files as raw strings
declare module "*.svg?raw" {
  const content: string;
  export default content;
}
