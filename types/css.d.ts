// Ambient type declarations for global (non-module) CSS side-effect imports.
// Next.js only ships types for CSS Modules (*.module.css), not for plain
// global stylesheets imported for their side effects (e.g. `import "./globals.css"`).
// The more specific "*.module.css" declaration from Next.js still takes precedence,
// so CSS Module typing is unaffected.
declare module "*.css"
