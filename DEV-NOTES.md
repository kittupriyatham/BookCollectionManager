# Project context snapshot (persist across reboot)

Date: 2025-10-31

RESUME: Step 4 — Wire `BookForm` and `BookList` in `frontend/src/App.js` (refresh flow)

SESSION UPDATE (2025-10-31):

- `frontend/src/components/BookForm.js` was created (Title/Author inputs; posts to `/api/books`; calls `onCreated()` on success).
- `frontend/src/components/BookList.js` import was fixed to use `../api/books`.
- `frontend/src/api/books.js` was updated to use `/api/books` for both list and create functions.
- `frontend/package.json` proxy was corrected to `http://localhost:8080` (previously incorrectly included the path).
- Backend `BookController` exposes GET `/api/books` returning two hardcoded books. A quick E2E check confirmed `http://localhost:3000/api/books` returned the backend data when dev servers were running.
- Permission note: the user revoked the assistant's edit/run rights during the session; do not run commands or change files without explicit permission.

This file captures the current state so you can resume seamlessly after a reboot. Nothing here changes your app; it’s just notes.

## Repo + architecture

- Repo root: `c:\Users\kittu\projects\BookCollectionManager`
- Frontend: Create React App under `frontend/` (react-scripts 5)
  - Entry: `frontend/src/index.js`, main: `frontend/src/App.js`
  - Plan to call backend via CRA dev proxy using relative URLs like `/api/books`
- Backend: Spring Boot (to be created/managed with Spring Tool Suite) in `backend/`
  - Project location in STS: use custom location pointing to this exact `backend/` folder
  - Build: Maven

## Java toolchain (decisions made)

- Runtime JDK installed: 25 (OK)
- Compile target (Maven): release 24 (set via maven-compiler-plugin)
  - Rationale: compiling for 25 not supported yet; 24 is safe, or 21 if needed
- In STS: default JRE should point to JDK 25; project compliance can remain <= 24 (Maven is source of truth)

## Current plan (high-level)

1) Create `api/books.js` (frontend helper: listBooks, createBook) — DONE
2) Create `components/BookList.js` (fetch + render list with loading/error) — DONE
3) Create `components/BookForm.js` (POST new book) — DONE
4) Wire both into `App.js` with a `refreshKey` — NEXT
4) Wire both into `App.js` with a `refreshKey`
5) Backend: add GET `/api/books` (hardcoded two books) to validate E2E
6) Add CRA dev proxy in `frontend/package.json`: `"proxy": "http://localhost:8080"` — DONE
7) Backend: add POST `/api/books` (in-memory) — NEXT (requires permission to edit backend)
8) Persistence: JPA + H2 (Book entity, repository, service, DTO)
9) Frontend: CRUD enhancements (edit/delete) and small tests

## Immediate next step to perform

Create this file (we'll provide code on request when you resume): `frontend/src/components/BookForm.js`

Behavior outline:

- Inputs: Title, Author (both required)
- On submit: POST to `/api/books` with `{ title, author }`
- On success: clear the form and call `onCreated()` so the parent can refresh the list

## Quick resume after reboot

1) Verify tools (optional):

```cmd
node -v
npm -v
java -version
echo %JAVA_HOME%
```

2) Start frontend:

```cmd
cd frontend
npm start
```

3) Backend (if already created in STS): run from STS (Run As > Spring Boot App) or:

```cmd
cd backend
mvnw.cmd spring-boot:run
```

## Notes and preferences

- You prefer manual, step-by-step. No changes will happen without explicit approval.
- You are also hand-writing the same code for your notes; proceed at your pace.
- Agents: `.github/copilot-instructions.md` currently exists; can remove on your approval to keep repo agent-free.
- CRA with React 19 may show peer-dependency warnings (expected with react-scripts 5). Fine for learning.

## Where to place upcoming files (for quick reference)

- `frontend/src/components/BookForm.js` (next step)
- `frontend/src/App.js` (wire components)
- Backend controller example later: `backend/src/main/java/<your_package>/controller/BookController.java`
