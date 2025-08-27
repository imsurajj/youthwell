# Contributing to YouthWell

Thanks for your interest in contributing! This project is a Next.js app. Please follow these guidelines to help keep the codebase consistent and easy to review.

## Getting Started

1. Fork the repository and clone your fork:

```bash
git clone https://github.com/<your-username>/youthwell.git
cd youthwell
```

2. (Optional) Add upstream remote to sync with the original repo:

```bash
git remote add upstream https://github.com/imsurajj/youthwell.git
```

3. Install dependencies:

```bash
npm ci
# or
npm install
```

4. Start the dev server:

```bash
npm run dev
```

5. Open http://localhost:3000 in your browser.

## Branching

Create a branch from `main` using one of the following prefixes:
- feat/short-description — for new features
- fix/short-description — for bug fixes
- chore/short-description — for chores and tooling
- docs/short-description — for documentation-only changes

## Coding Standards

- Use TypeScript where applicable.
- Ensure ESLint passes: `npm run lint`.
- Keep changes small and focused; avoid unrelated edits.
- Place reusable UI in `src/app/components/` when possible.

## Commit Messages

Follow Conventional Commits:
- feat: add new navbar
- fix: correct navbar alignment
- docs: update README with setup steps
- chore: bump dependencies
- refactor: improve component structure

## Testing & Checks

- Build locally before submitting: `npm run build`.
- Run the dev server and smoke test impacted pages/components.

## Pull Requests

1. Sync your branch with `main` before opening a PR.
2. Provide context, screenshots for UI changes, and testing notes.
3. Keep PRs small and focused for faster reviews.
4. Link related issues if applicable.

## Issues

- Use clear titles and steps to reproduce.
- Include environment details (OS, Node version) and screenshots if relevant.

## Project Scripts

- `npm run dev` — start dev server
- `npm run build` — build production
- `npm run start` — start production
- `npm run lint` — run ESLint

## License

By contributing, you agree that your contributions will be licensed under the MIT License.

---

Questions? Open an issue in the repository: https://github.com/imsurajj/youthwell
