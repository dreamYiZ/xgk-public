#!/usr/bin/env bash
npm run build
cp -r .next ../bibi-f-n/
cp -r public ../bibi-f-n/
find . -maxdepth 1 -type f ! -name "wrangler.toml" -exec cp {} ../bibi-f-n/ \;
