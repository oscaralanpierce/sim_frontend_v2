# Coding Agent Instructions

## Do Not Modify

This file must never be modified by a coding agent. You may suggest changes to a human user but never modify this file directly.

## Tech Stack and Key Project Details

### Yarn, not NPM

This project uses Yarn. `yarn.lock` is the source of truth for dependencies. Never install or update packages with `npm`.

There are several Yarn commands defined under `scripts` in the `package.json` file.

The following Yarn commands are run in CI and have to succeed before any changes can be merged. Use these commands instead of the underlying commands (like `vitest`):

- `yarn`
- `yarn format` (run `yarn format:fix` for local development)
- `yarn build-storybook`
- `yarn test`
- `yarn coverage` (expects 95% test coverage project-wide)

### No Linting

ESLint is incompatible with TypeScript 7, a key dependency of this project. As such, there is no linting for this project.

### Yes Formatting

We use Prettier for formatting. `yarn format:fix` can be used to format code.

### Functional Components Only

This React 19 project uses functional components only. Do not build class-based components.

### async/await over then/resolve/reject Syntax

Use `async`/`await` syntax instead unless promise resolution with `then`/`resolve`/`reject` is absolutely required. If an API requires `then`/`resolve`/`reject` syntax, consider another design if practical.
