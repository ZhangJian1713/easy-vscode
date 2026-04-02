# Webview template initialization: design and conventions

## Background

- **Runtime**: `@easy_vscode/webview` (npm or `file:`) only exposes `registerWebview` / `callVscode`.
- **Frontend build**: `webpack`, `index.html`, `favicon`, optional Ant Design shell, etc. live under **`easy-vscode/webview-templates/*`**, referenced from the extension repo or **copied** and owned there.

Goals: **repeatable wiring**, **idempotency** (do not clobber existing files by default), and paths that can later be wrapped as an **npm CLI**.

---

## Which template for `vscode-webview-demo`?

The minimal demo lives at **`examples/vscode-webview-demo`** in this repo.

- **Use `minimal-react`** by default (no Ant Design; matches the demo).
- **Do not use `antd-less`** unless you add Ant Design in the demo and copy `AntdWebviewShell` plus global styles.

Relationship:

| Template       | Use case                                        |
|----------------|-------------------------------------------------|
| `minimal-react` | React + plain CSS; lightweight demo             |
| `antd-less`     | Ant Design + Less (same class as `vscode-image-viewer`) |

---

## Directory conventions (recommended checks)

From the extension root (where `package.json` lives):

| Path                         | Role                                                                 |
|------------------------------|----------------------------------------------------------------------|
| `src/webview/index.tsx`      | Webpack **entry**; calls `registerWebview(...)` inside               |
| `src/webview/**/*.tsx`       | Webview UI components                                                |
| **`scaffold/webview.webpack.js`** | Webpack CLI entry file                                        |
| **`scaffold/bundler/`**      | Vendored template (factory + HTML/favicon), separate from app code   |

**Legacy** repos may keep `easyVscodeConfig/webview.webpack.js`; choose **either** that **or** **`scaffold/`**. New setups and `init-webview-template` default to **`scaffold/`**.

The init script **by default** only ensures **`scaffold/webview.webpack.js`** is created/updated; it does **not** insist on creating `src/webview` (avoids overwriting product code). Optional `--check-entry` only prints missing-path hints.

---

## How “source” templates are consumed

Two modes (document both; the script supports them):

### A. Monorepo reference (current style)

- Do not copy the template; `require('.../easy-vscode/webview-templates/.../webpack.factory.js')` directly.
- **Pros**: one template change rolls out to all dependents immediately.
- **Cons**: after publish, the extension repo may have **no** `easy-vscode` checkout—switch to mode B.

### B. Vendor copy (`--vendor`)

- **Copy** the chosen template into **`scaffold/bundler/`** at the extension root (replace whole directory when switching `minimal-react` / `antd-less`; commit to git if desired).
- **`scaffold/webview.webpack.js`** `require`s **`./bundler/webpack.factory.js`**.
- **Pros**: extension clone and release work without monorepo paths.
- **Cons**: template upgrades need rerun script or manual merge.

---

## Idempotent behavior

| Target                                      | Default                         | `--force`                    |
|---------------------------------------------|---------------------------------|------------------------------|
| `easyVscodeConfig/webview.webpack.js`       | **skip** if present             | overwrite                    |
| `scaffold/bundler/` (`--vendor`)            | **skip copy** if dir non-empty | delete dir, then copy        |

Exit code `0` on success (including skipped steps); non-zero on valid errors or missing template root.

---

## npm / CLI evolution

**Today**, from the `easy-vscode` repo:

```bash
node easy-vscode/scripts/init-webview-template.cjs --cwd /path/to/extension --template minimal-react
```

**Later** (optional): ship `@easy_vscode/create-webview` or `create-easy-vscode-webview` with a bundled template tarball:

```bash
npx @easy_vscode/create-webview --template minimal-react
```

Implementation-wise: resolve paths inside the package, write **`scaffold/webview.webpack.js`**, and optionally **`--vendor`** extract into **`scaffold/bundler/`**.

---

## Relationship to `@easy_vscode/webview`

- **Dependency**: extension `package.json` always lists `@easy_vscode/webview` (semver in production, `file:` in dev).
- **Templates**: **separate** from the npm package; the script only wires **webpack/HTML paths**, it does not install runtime.

This keeps “small runtime dependency” and “full bundler ownership” at once.
