# Local Development Workflow

## Goal

Speed up iteration between `easy-vscode` and consumer extensions without publishing on every change.

## Recommended Flow

1. Build local packages in `easy-vscode` as needed.
2. In consumer project, use local dependency mapping during development.
3. Validate behavior in Extension Development Host.
4. Publish only when a milestone is stable.

## Preferred Options

### Option A: `file:` dependency (recommended)

- Point consumer `package.json` dependencies to local package paths.
- Best for deterministic local testing.

### Option B: `yalc`

- Good simulation of package publish/install cycle.
- Useful when testing package boundary behavior.

## Release Gate

Before publishing:

- Runtime API changes are reflected in `webview-public-api.md`.
- Template examples still compile and run.
- Consumer project validates key message flows.

## Non-Goal

- Do not force package publish for each runtime adjustment during active development.

