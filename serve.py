#!/usr/bin/env python3
"""Simple HTTP server with correct MIME types for serving the built app."""
import http.server
import os

os.chdir(os.path.join(os.path.dirname(os.path.abspath(__file__)), "dist"))

handler = http.server.SimpleHTTPRequestHandler
handler.extensions_map.update({
    ".js": "application/javascript",
    ".mjs": "application/javascript",
    ".css": "text/css",
    ".html": "text/html",
    ".json": "application/json",
    ".svg": "image/svg+xml",
    ".wasm": "application/wasm",
})

print("Serving dist/ at http://localhost:8000")
http.server.HTTPServer(("", 8000), handler).serve_forever()
