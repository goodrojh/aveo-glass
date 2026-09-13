#!/usr/bin/env bash
# Сборка и публикация на GitHub Pages (ветка gh-pages)
set -e
npm run build
touch out/.nojekyll
cd out
git init -q -b gh-pages
git add -A
git -c user.name="goodrojh" -c user.email="vladhalubets@gmail.com" commit -q -m "deploy $(date +%F_%T)"
git push -q -f https://github.com/goodrojh/aveo-glass.git gh-pages
cd .. && rm -rf out/.git
echo "Deployed: https://goodrojh.github.io/aveo-glass/"
