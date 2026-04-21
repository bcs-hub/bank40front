---
name: skill-git-pr-full-merge
description: Full PR workflow — branch, commit, push, PR, squash merge, cleanup
---

# PR Full Merge

Complete workflow: branch → commit → push → PR → squash merge → cleanup.

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

### 6. Squash merge
- Merge with `gh pr merge <number> --squash --delete-branch` (deletes remote branch automatically).

### 7. Cleanup
- Switch to master: `git checkout master`
- Pull latest: `git fetch origin && git pull origin master`
- Delete local feature branch only if it still exists: `git branch --list <branch>` first, then `git branch -d <branch>` if found
- Confirm to user that everything is clean.
