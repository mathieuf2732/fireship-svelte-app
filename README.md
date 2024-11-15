# Notes

## Types of files

### Page

- page.svelte: Main UI building block. On first load, it is rendered on the server, which is good for SEO. Then, updates are done on the client side, making it faster and more efficient.
- page.ts: Data fetching & logic on client and server
- page.server.ts: Data fetching only on server

### Layout

- layout.svelte: Share UI across multiple child routes.
- layout.ts: Data fetching & logic on client and server
- layout.server.ts: Data fetching only on server

### Other

- server.ts: Used to make non-html API routes on the server
- error.svelte: Fallback for a page when data fetching fails, runs on server only
