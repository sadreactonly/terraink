# Repository Guidelines

## Project Structure & Module Organization

`src/` contains the application. Keep feature work inside `src/features/<feature>/` using the existing layers: `domain/`, `application/`, `infrastructure/`, and `ui/`. Cross-cutting code belongs in `src/core/` (ports, adapters, config, service wiring) or `src/shared/` (`geo/`, `hooks/`, `ui/`, `utils/`). Static JSON lives in `src/data/`, global CSS in `src/styles/`, and public assets in `public/`. Do not add business logic to `src/App.tsx`; it should stay a thin shell.

## Build, Test, and Development Commands

- `bun install`: install dependencies and update `bun.lock`.
- `bun run dev`: start the Vite dev server at `http://localhost:5173`.
- `bun run build`: create a production build in `dist/`.
- `bun run preview`: serve the production build locally.
- `bun run typecheck`: run TypeScript checks without emitting files.
- `bun run showcase:grid`: rebuild the showcase grid image used by marketing assets.
- `docker compose up -d --build`: run the self-hosted stack locally.

## Coding Style & Naming Conventions

Use TypeScript + React with the existing `@/` alias for cross-feature imports; avoid `../../` across feature boundaries. Follow the layer boundaries in [`agent.md`](/Users/stefanvasic/Documents/Developer/terraink/agent.md). Components use `PascalCase.tsx`, hooks use `useCamelCase.ts`, utilities use `camelCase.ts`, port interfaces use an `I` prefix, and CSS classes use `kebab-case`. Reuse existing hooks, utilities, and adapters before adding new ones. Access all `VITE_*` variables through `src/core/config.ts`.

## Testing Guidelines

This repository currently has no dedicated automated test runner in `package.json`. For now, treat `bun run typecheck` and a successful `bun run build` as the minimum validation for every change. If you add tests later, place them beside the feature they cover and use `*.test.ts` or `*.test.tsx`.

## Commit & Pull Request Guidelines

Branch from `dev` and open PRs against `dev` only. Use emoji-style Conventional Commits, for example `🐛 fix(location): reduce reverse geocode spam`. Keep commits to one logical change, with a lowercase imperative subject under 50 characters. PRs should describe the problem, summarize the solution, link the related issue, and include screenshots or recordings for UI changes.

## Security & Configuration Tips

Environment variables are optional for most local work. Start from `.env.example`, never commit secrets, and do not read `import.meta.env` outside `src/core/config.ts`.
