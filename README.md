# Kotlin website

This is a simplified version of https://kotlinlang.org, created for the JetSites 2026 internship test assignment.

## Original Stack (Python/Jinja)

Docker is required to run locally. From the root directory of the project run:

```
docker compose up
```

After that, the site will be available at http://localhost:9000.

The site contains only the home page.

The site is built with Flask, Jinja2 templates, and React.

---

## React Router 7 Migration

A modern migration of this website to **React Router 7 with SSR (Server-Side Rendering)** and Vite is available in the `migrate-rr7/` folder.

### Why migrate-rr7 is inside this repo?

The migration was created locally within this repository because the `@jetbrains/kotlin-web-site-ui` package requires authentication with a JetBrains private npm registry. The registry token is automatically available when running `npm install` in this original repository structure.

Rather than spend time configuring external registry tokens, the migration was created as `migrate-rr7/` to leverage the existing setup. Normally, migrations like this would be in a separate repository, but this was the most practical solution given the constraints.

### Running the React Router 7 version

```bash
cd migrate-rr7
docker build -t kotlin-website-rr7 .
docker run -p 3000:3000 kotlin-website-rr7
```

The website will open at **http://localhost:3000**

**The site works fully without JavaScript** — you can disable JS in your browser to verify SSR is working correctly.

#### Local Development

```bash
cd migrate-rr7
npm install
npm run dev
```

Development server: http://localhost:5173

#### Technologies

- React Router 7 with SSR
- Vite 7 + SCSS
- @rescui/ UI components
- TypeScript
- highlight.js for Kotlin syntax highlighting

### SSR & @jetbrains/kotlin-web-site-ui Challenges

The `@jetbrains/kotlin-web-site-ui` package (used for the header and footer) was not designed for SSR. Several issues had to be resolved:

1. **DOM access in SSR context** — The package uses resize observers and directly accesses the DOM, which doesn't exist on the server. Solution: Created a shim to mock DOM-dependent modules during server-side rendering.

2. **`global` vs `globalThis`** — Peer dependencies in the package were using the outdated `global` reference instead of the standard `globalThis`, causing errors in Node.js SSR context. Updated references throughout to use `globalThis`.

3. **Client-side-only hooks** — Highlight.js and state initialization had to be wrapped in `useEffect` hooks to ensure they only run on the client after hydration.

4. **Significant optimization work** was required to make this production-grade package work in an SSR environment, including careful management of when and where DOM APIs are accessed.

---

## Task description

The task description can be found in the `TASK.md` file.
