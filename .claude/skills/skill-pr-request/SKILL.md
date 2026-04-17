---
name: skill-pr-request
description: PR workflow — branch, commit, push, PR. No merge.
---

# PR Request

Workflow kuni PR loomiseni: branch → commit → push → PR.

## Steps

### 1. Branch
- Check current branch. If already on a feature branch (not `master`), use it.
- If on `master`, check if a relevant feature branch exists (`git branch --list`). If yes, check it out. If no, ask the user for the branch name, then create and checkout: `git checkout -b <name>`.

### 2. Dirty working tree check
- Run `git status`. If there are unstaged or untracked changes, warn the user and ask whether to proceed (they may want to stage more files first).

### 3. Stage & commit
- Run `git diff HEAD` and `git status` to understand what changed.
- Generate a commit message in Estonian based on the diff (technical terms may stay in English).
- Show the proposed commit message to the user and ask for confirmation before committing.
- Stage all modified/new files relevant to the task and commit.

### 4. Push
- Push the branch to origin: `git push -u origin <branch>`.

### 5. Pull Request
- Create a PR using `gh pr create` with an auto-generated title and body (Summary + Test plan).
- Show the PR URL to the user.
- Stop here — do not merge.
