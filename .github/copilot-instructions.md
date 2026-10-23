## Quick context

- This repository contains a Create React App frontend in `frontend/`. The `backend/` folder exists but is currently empty (no server code yet).
- Frontend entry points: `frontend/src/index.js` (React root) and `frontend/src/App.js` (main component).
- Build tooling: the frontend uses `react-scripts` (`package.json` in `frontend/`) — standard CRA commands apply.

## High-level architecture (what to know)

- Single-page React application located at `frontend/`. There is no active backend in `backend/` yet — assume any API work will be added under `backend/` or integrated as a remote service.
- Data flow: typical CRA React app (components under `frontend/src/` render UI and will call APIs). Example files:
  - `frontend/src/index.js` — mounts <App />.
  - `frontend/src/App.js` — default top-level component (edit here for UI changes).
- Static assets and HTML are under `frontend/public/`.

## Developer workflows (exact commands)

- Install dependencies and run the frontend dev server (from repo root):

  cd frontend
  npm install
  npm start

  Notes: CRA runs on port 3000 by default. Use the browser console and network tab to debug runtime issues.

- Build for production (from `frontend/`):

  npm run build

- Run tests (from `frontend/`):

  npm test

## Project-specific conventions & patterns

- Keep all frontend code inside `frontend/`. Do not add a root-level `package.json` unless you intentionally want a monorepo setup.
- Linting config is provided inside `frontend/package.json` (uses `react-app` and `react-app/jest` rules). Follow existing formatting and ESLint rules when changing files.
- Small, focused components: the current tree is minimal (CRA scaffold). When adding features, follow conventional React patterns — place new components under `frontend/src/components/` and route-level pages under `frontend/src/pages/` if routing is introduced.

## Integration points & notes for implementing a backend/API

- `backend/` is present but empty. If you add a server, prefer placing it in `backend/` (e.g., Express/Node) and run it on a different port (e.g., 5000). Use CORS or a proxy in development.
- If you implement a backend and want the CRA dev server to proxy API requests, add a `proxy` field to `frontend/package.json` (e.g., `"proxy": "http://localhost:5000"`) or configure a setupProxy.js file.

## Common tasks & examples to guide code generation

- Edit UI text or small components: change `frontend/src/App.js` — the app reloads automatically on save when `npm start` is running.
- Add a new component:
  - Create `frontend/src/components/YourComponent.js`
  - Import it in `App.js` and add tests under `frontend/src/__tests__/` or next to the component using `.test.js`.
- To call an API from a component, use fetch/axios inside a useEffect and handle loading/errors. If backend is added locally, point fetch to the proxy or the backend port.

## Troubleshooting & debugging tips

- Dev server not starting: ensure you ran `npm install` in `frontend/` and you have a supported Node.js version. The project uses `react-scripts@5.0.1`.
- Tests failing locally: run `npm test -- --watchAll=false` to run once and see errors; CRA's Jest config is used.
- Lint warnings appear in console during `npm start`. Follow `react-app` ESLint rules or run `npm run` scripts that include lint when added.

## What an AI agent should do (explicit guidance)

- Make minimal, runnable changes. Prefer small PRs: change one component or add one feature at a time with an associated test.
- When adding API integrations, leave clear TODOs and update README in `backend/` to describe how to run the server.
- Reference exact files when suggesting changes (e.g., "edit `frontend/src/App.js` to replace placeholder text"), and include the relative path from repo root.

## Important files to reference

- `frontend/package.json` — scripts and dependencies (start/build/test).
- `frontend/src/index.js` — React entrypoint.
- `frontend/src/App.js` — top-level component scaffold.
- `frontend/public/` — static files and `index.html`.

---
If you want, I can (1) create a short `README` in `backend/` describing how to add a Node/Express server, or (2) add example component + test scaffolding under `frontend/` to show patterns. Tell me which and I'll proceed.

## Recent session (2025-10-31)

- Frontend: added `frontend/src/components/BookForm.js` (Title/Author inputs; POSTs to `/api/books`; calls `onCreated()` on success).
- Frontend: fixed `frontend/src/components/BookList.js` import and `frontend/src/api/books.js` to consistently use `/api/books`.
- Frontend: updated `frontend/package.json` proxy to `http://localhost:8080` (was incorrectly including the `/api/books` path).
- Backend: a simple Spring Boot controller `backend/src/main/java/com/BookCollectionManager/controller/BookController.java` exposes GET `/api/books` returning two hardcoded books.
- Verification: built the frontend (`npm run build`) successfully and confirmed `http://localhost:3000/api/books` returned the hardcoded backend JSON when dev servers were running.

Notes for next session:
- The user revoked edit/run permissions during the session — do not run commands or change files unless the user explicitly re-grants permission.
- Suggested next steps (require permission): implement POST `/api/books` in backend (in-memory), wire `BookForm` into `App.js` refresh flow, or add a small E2E test.
