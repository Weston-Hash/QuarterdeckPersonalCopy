#!/usr/bin/env python3
"""Simple HTTP server for serving the live preview from project root."""
import http.server
import os
from urllib.parse import unquote, urlparse


ROOT = os.path.dirname(os.path.abspath(__file__))


class PreviewHandler(http.server.SimpleHTTPRequestHandler):
    extensions_map = http.server.SimpleHTTPRequestHandler.extensions_map.copy()
    extensions_map.update({
        ".js": "application/javascript",
        ".jsx": "application/javascript",
        ".mjs": "application/javascript",
        ".css": "text/css",
        ".html": "text/html",
        ".json": "application/json",
        ".svg": "image/svg+xml",
        ".wasm": "application/wasm",
    })

    def end_headers(self):
        self.send_header("Cache-Control", "no-store, no-cache, must-revalidate, max-age=0")
        self.send_header("Pragma", "no-cache")
        self.send_header("Expires", "0")
        super().end_headers()

    def _disable_conditional_cache(self):
        for header in ("If-Modified-Since", "If-None-Match"):
            if header in self.headers:
                del self.headers[header]

    def do_GET(self):
        self._disable_conditional_cache()
        super().do_GET()

    def do_HEAD(self):
        self._disable_conditional_cache()
        super().do_HEAD()

    def translate_path(self, path):
        parsed = urlparse(path)
        request_path = unquote(parsed.path)
        if request_path in ("", "/", "/index.html"):
            request_path = "/preview.html"

        clean_parts = [part for part in request_path.split("/") if part and part not in (".", "..")]
        return os.path.join(ROOT, *clean_parts)


print("Serving project preview at http://localhost:8000")
http.server.HTTPServer(("", 8000), PreviewHandler).serve_forever()
