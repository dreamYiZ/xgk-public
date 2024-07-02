#!/usr/bin/env bash
npm run build
cp -r .next ../bibi-f-n/
cp -r public ../bibi-f-n/
# find . -maxdepth 1 -type f ! -name "wrangler.toml" ! -name "*.bash" ! -name "LICENSE" ! -name "README.md" -exec cp {} ../bibi-f-n/ \;
cp jsconfig.json ../bibi-f-n/
cp .editorconfig ../bibi-f-n/
cp package.json ../bibi-f-n/
cp package-lock.json ../bibi-f-n/
cp yarn.lock ../bibi-f-n/
cp next.config.mjs ../bibi-f-n/
cp .env.local ../bibi-f-n/
