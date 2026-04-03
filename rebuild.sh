#!/bin/bash
# Re-bundle the app after changing ut_app_basecode.jsx
NODE_ENV=production node_modules/.bin/esbuild preview-entry.jsx \
  --bundle \
  --outfile=app-bundle.js \
  --format=iife \
  --loader:.jsx=jsx \
  --jsx=automatic \
  --define:process.env.NODE_ENV=\"production\"
echo "Done. Refresh the browser."
