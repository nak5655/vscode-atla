# VS Code Atla Extension

## Project Overview

A VS Code extension providing language support for the **Atla programming language**. The extension implements a lightweight LSP (Language Server Protocol) client that connects to an external Atla Language Server (`atla-lsp.exe`) to deliver features like syntax highlighting, diagnostics, code completion, and problem reporting.

## Build and Development

```bash
npm run compile   # Compile TypeScript → JavaScript (output: out/)
npm run watch     # Watch mode for development (recompile on file changes)
npm run lint      # Run ESLint on TypeScript source
npm run vscode:prepublish  # Pre-publish compilation
```

- **TypeScript 5.4.5** with strict mode enabled—no implicit types, unused variables, or uncovered return types
- ES2022 target compilation with source maps and declaration files for type support
- ESLint 9 with TypeScript ESLint parser for modern linting
- Node.js 20+ and VS Code 1.90.0+ required

## Code Style

- **File organization**: Logic-driven modules (`main.ts` for activation, `config.ts` for paths, `tasks.ts` for build integration)
- **TypeScript strictness**: Strict mode enabled with `noUnusedLocals`, `noUnusedParameters`, `noImplicitReturns`, `noFallthroughCasesInSwitch`, and `forceConsistentCasingInFileNames`
- **Module resolution**: Modern Node.js-style with `esModuleInterop` and `resolveJsonModule` enabled
- **Linting**: ESLint 9 with `@typescript-eslint/parser` v7 and `@typescript-eslint/eslint-plugin` v7
- **Type support**: Declaration files generated alongside compiled JavaScript for better IDE support
- Comments: Japanese throughout codebase (translator note: preserve original intent)

## Architecture

The extension follows a **thin wrapper pattern**:
- **[src/main.ts](src/main.ts)**: Extension activation, LSP client initialization, task provider instantiation
- **[src/config.ts](src/config.ts)**: Resolves configurable paths (`atla-lsp.exe`, `atla.exe`); handles Windows home directory expansion via `USERPROFILE`
- **[src/tasks.ts](src/tasks.ts)**: VS Code task provider for Atla build operations (build, clean, run); includes problem matcher for parsing compiler errors

**Key design decision**: The extension does *not* implement language features directly. All semantics, diagnostics, and analysis are delegated to the external Language Server. The extension's role is configuration, activation, and task integration.

## Configuration

The extension requires two external executables to be installed and configured:

| Executable | Purpose | Default Path | Configurable |
|-----------|---------|----------------|---|
| `atla-lsp.exe` | Language Server | `~/.atla/atla-lsp.exe` | Yes (extension settings) |
| `atla.exe` | Build system CLI | `~/.atla/atla.exe` | Yes (extension settings) |

Users must have these installed before the extension can provide full functionality. The `~` home directory is resolved using `process.env.USERPROFILE` on Windows.

## Activation Events

- Activates only when opening or creating files with `.atla` extension (`onLanguage:atla`)
- Lazy-loads LSP client to minimize startup overhead
- **Requires**: VS Code 1.90.0 or later, Node.js 20.0.0 or later

## Dependencies

| Package | Version | Role |^9.0.1 | LSP client implementation (modern protocol support) |
| `typescript` | ^5.4.5 | Language and build tool with ES2022 support |
| `eslint` | ^9.0.0 | Code quality linting (flat config compatible) |
| `@typescript-eslint/parser` | ^7.4.0 | TypeScript parser for ESLint |
| `@typescript-eslint/eslint-plugin` | ^7.4.0 | TypeScript-specific linting rules |
| `@types/vscode` | ^1.90.0 | VS Code API type definitions |
| `@types/node` | ^20.10.0 | Node.js type definitions |

No runtime dependencies except VS Code's built-in extension API. Node.js 20+ recommended for development

No runtime dependencies except VS Code's built-in extension API.

## Common Workflows

**Adding a new task provider action:**
1. Define task in [src/tasks.ts](src/tasks.ts) with appropriate problem matcher regex
2. Update extension metadata in [package.json](package.json) if exposing new task types
3. Ensure paths resolve correctly via [src/config.ts](src/config.ts)

**Debugging LSP communication:**
- Enable LSP tracing via VS Code's extension host output
- Validate `atla-lsp.exe` is running and responding on the configured port/socket
- Check [src/main.ts](src/main.ts) for client initialization

**Modifying configuration paths:**
- All path logic centralized in [src/config.ts](src/config.ts)
- Update default paths there; user overrides happen via VS Code settings

## Repository

- **License**: Apache 2.0
- **Repository**: https://github.com/tatsuno/atla-vscode
