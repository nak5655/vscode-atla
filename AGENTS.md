# AGENTS.md

Working rules for human contributors and AI agents (e.g., GitHub Copilot) in this repository.

---

## Purpose

This document defines the conventions and workflow rules every contributor—human or automated—must follow when working on `vscode-atla`.

---

## Project Context

- **What it is**: A VS Code extension that adds language support for **Atla**, a custom programming language.
- **Core features**:
  - Real-time error diagnostics via the **Language Server Protocol (LSP)**.
  - **IntelliSense** features powered by the LSP server (`atla-lsp.exe`): completions, hover information, signature help, and diagnostics.
- **Runtime requirements**: Node.js **≥ 20**, VS Code **≥ 1.90.0**.
- **External dependency**: `atla-lsp.exe` and `atla.exe` must be installed separately by users (default path `~/.atla/`).

---

## Development Workflow

### Commands

```bash
npm install           # Install dependencies
npm run build         # Bundle extension (output: dist/extension.js)
npm run dev           # Watch mode – rebuild on save
npm run typecheck     # Type-check without emitting files
npm run lint          # Run ESLint on src/
npm run format        # Format with Prettier
npm run check         # lint + typecheck + build (used by vscode:prepublish)
```

### Before Starting Feature Work

> **Mandatory**: Before opening a PR that adds, removes, or improves a feature or behavior, update `PLANS.md` with the planned scope. See [PLANS.md](./PLANS.md) for the required entry format.
>
> Pure documentation edits, typo fixes, and refactors that do not change observable behavior are exempt.

---

## PR Checklist

For every PR that adds, removes, or improves a feature or behavior:

- [ ] `PLANS.md` entry added **before or when opening the PR**.
- [ ] `CHANGELOG.md` updated following [Keep a Changelog](https://keepachangelog.com/) conventions (`Added` / `Changed` / `Fixed` / `Removed` under `[Unreleased]`).
- [ ] `npm run check` passes locally.
- [ ] PR description explains *what* changed and *why*.
- [ ] No unrelated refactors or formatting changes mixed in.
- [ ] If a new VS Code contribution point is added (command, configuration key, language, etc.), `package.json` and `README` are updated.

---

## Release Process

Releases are **manual**:

1. Confirm `[Unreleased]` in `CHANGELOG.md` is complete.
2. Bump the version in `package.json`.
3. Rename `[Unreleased]` to the new version + date in `CHANGELOG.md`.
4. Create and push a version tag (e.g., `git tag v0.1.0`).
5. Package the extension (`npx vsce package`) and publish or attach to the GitHub release.

---

## Security & Secrets

- **Never** commit API tokens, credentials, or private keys.
- **Never** log sensitive user data from the LSP connection.
- If a secret is accidentally committed, rotate it immediately and open a security advisory.
