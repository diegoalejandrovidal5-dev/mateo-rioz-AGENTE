# Dev stability structure

Use this command for a clean local start that avoids stale chunk errors:

- `npm run dev:stable`

What it does:

1. Stops previous Node dev processes
2. Deletes `.cache/next`
3. Starts Next.js at `http://localhost:3010`

This project uses `distDir: ".cache/next"` in `next.config.mjs` so runtime artifacts stay isolated in a dedicated folder.
