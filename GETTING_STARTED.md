# TanStack Query: Guided Employee Manager Lesson

**Start here.** You will build an Employee Manager while Claude teaches you TanStack Query one step at a time.

## First-time setup
1. Open this folder in VS Code. If you do not have it, install [VS Code](https://code.visualstudio.com/).
2. Install the official **Claude Code** extension by Anthropic in VS Code. Open Extensions with `Ctrl+Shift+X`, search for `Claude Code`, and install it. Open Claude via its sidebar icon or `Ctrl+Shift+P` and search `Claude Code`.
3. Optional: In Claude Code, type `/plugin` and install **Learning Output Style** if available. This is a one-time setup; you do not need `/plugin` every lesson.
4. In the VS Code terminal (`Ctrl+backtick`), run `npm install` and then `npm run dev:all`. Keep that terminal running. You need Node.js 20.19+ or 22.12+ for this Vite version.
5. Open the local web address printed by Vite (usually `http://localhost:5173`).
6. In Claude chat, type **Start my TanStack Query lesson.**

**You write the code in `frontend/src/`. Claude should teach and review, not complete your assignment.**

## Help
- No terminal? Use **Terminal > New Terminal**.
- `npm` not found? Install a current Node.js LTS from https://nodejs.org/ and restart VS Code.
- Can't open Claude? Check Extensions and use `Ctrl+Shift+P` to search `Claude Code`.
- API not working? Check that `npm run dev:all` is still running. Test `http://localhost:3001/employees` in a browser.
- Gray inline AI completions? This repository disables inline suggestions by default. If you still see them, disable the extension providing them.
- Starting again? Open Claude and say **Continue my TanStack Query lesson**. Tell it where you stopped if it cannot determine your progress.

## Project layout
- `frontend/src/`: Your React and TanStack Query code.
- `backend/db.json`: Practice API data, managed by JSON Server.
