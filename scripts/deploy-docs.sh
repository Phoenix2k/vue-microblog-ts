#!/usr/bin/env sh

# Abort on errors
set -e

# Build
npm run docs:build

# Navigate into the build output directory
cd docs/.vuepress/dist

# Create a temporary Git repository for deployment
git init
git add -A
git commit -m 'Deploy docs to GitHub Pages'
git push -f git@github.com:Phoenix2k/vue-microblog-ts.git master:gh-pages

cd -
