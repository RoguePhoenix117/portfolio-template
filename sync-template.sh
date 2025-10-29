#!/usr/bin/env bash
set -e

BRANCH=$(git rev-parse --abbrev-ref HEAD)

echo "Fetching template..."
git fetch template

echo "Merging template/main into $BRANCH..."
git merge template/main --no-edit || {
  echo "Merge conflicts – resolve them, then run: git merge --continue"
  exit 1
}

echo "Pushing to origin..."
git push origin "$BRANCH"

echo "Done!"