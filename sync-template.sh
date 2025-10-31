#!/usr/bin/env bash
set -e

BRANCH=$(git rev-parse --abbrev-ref HEAD)

# Check for uncommitted changes
if ! git diff-index --quiet HEAD --; then
  echo "⚠️  Warning: You have uncommitted changes."
  echo "Would you like to stash them before syncing? (y/n)"
  read -r response
  if [[ "$response" =~ ^([yY][eE][sS]|[yY])$ ]]; then
    git stash push -m "Stashed before syncing with template"
    STASHED=true
  else
    echo "Please commit or stash your changes first."
    exit 1
  fi
fi

echo "📥 Fetching template..."
git fetch template

# Determine template branch (try main first, then master)
TEMPLATE_BRANCH="main"
if ! git show-ref --verify --quiet refs/remotes/template/main; then
  if git show-ref --verify --quiet refs/remotes/template/master; then
    TEMPLATE_BRANCH="master"
  else
    echo "❌ Error: Could not find template/main or template/master branch"
    exit 1
  fi
fi

echo "🔄 Merging template/$TEMPLATE_BRANCH into $BRANCH..."
if git merge "template/$TEMPLATE_BRANCH" --no-edit; then
  echo "✅ Merge successful!"
  
  # Restore stashed changes if any
  if [ "$STASHED" = true ]; then
    echo "📦 Restoring stashed changes..."
    git stash pop || {
      echo "⚠️  Warning: Could not restore stashed changes. Run 'git stash list' to view them."
    }
  fi
  
  echo "📤 Pushing to origin..."
  git push origin "$BRANCH"
  
  echo "✅ Done! Synced template changes to origin."
else
  echo "❌ Merge conflicts detected!"
  echo "   Resolve conflicts, then run: git merge --continue"
  
  # Restore stashed changes even on conflict
  if [ "$STASHED" = true ]; then
    echo "📦 Restoring stashed changes..."
    git stash pop || true
  fi
  
  exit 1
fi