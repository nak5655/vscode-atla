# PLANS.md

Lightweight planning log for `vscode-atla`. One entry per PR that adds, removes, or improves a feature or behavior.

---

## How to Use This Document

- **Who updates it**: Any contributor opening a PR that changes observable behavior (diagnostics, IntelliSense, commands, configuration, etc.).
- **When**: Update `PLANS.md` **at PR creation time** — before or when opening the PR.
- **Exempt**: Pure documentation edits, typo fixes, and refactors that do not change behavior.
- **Format**: Copy the template below, fill it in, and prepend it under [Planned / In Progress](#planned--in-progress).
- **After merge**: Move the entry to [Completed](#completed) and verify the matching `CHANGELOG.md` entry exists.

---

## PR Plan Entry Template

```markdown
### [PR #<number>] <Short title>

- **Goal**: <One sentence describing what this PR achieves.>
- **Scope**:
  - Does: <list what is included>
- **Non-goals**:
  - Does not: <list what is explicitly excluded>
- **User-visible changes**:
  - Diagnostics: <describe any change to error/warning reporting, or "none">
  - IntelliSense: <describe any change to completions/hover/etc., or "none">
- **Testing / validation plan**:
  - <How you will verify the change works (manual steps, automated tests, etc.). Prefer automated tests where feasible.>
- **Docs & CHANGELOG**:
  - [ ] `PLANS.md` entry added
  - [ ] `CHANGELOG.md` updated under `[Unreleased]` (Keep a Changelog format)
  - [ ] `README` updated if a user-facing setting or command changed
```

---

## Planned / In Progress

*(No active entries. Add yours here when opening a PR.)*

---

## Completed

*(Entries move here after the PR is merged. Verify the CHANGELOG entry exists before archiving.)*
