#!/bin/bash
# Re-bundle the app after changing ut_app_basecode.jsx
node_modules/.bin/esbuild preview-entry.jsx --bundle --outfile=app-bundle.js --format=iife --loader:.jsx=jsx --jsx=automatic
echo "Done. Refresh the browser."
