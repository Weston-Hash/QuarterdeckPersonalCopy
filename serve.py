#!/usr/bin/env python3
"""Simple HTTP server for serving the live preview from project root."""
import http.server
import os
import socketserver
import sys
import urllib.error
import urllib.request
from urllib.parse import unquote, urlparse


ROOT = os.path.dirname(os.path.abspath(__file__))
PORT = 8000


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
        self.send_header(
            "Content-Security-Policy",
            "default-src 'self'; "
            "script-src 'self' 'unsafe-inline'; "
            "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; "
            "font-src 'self' https://fonts.gstatic.com; "
            "connect-src 'self' https://script.google.com https://script.googleusercontent.com; "
            "frame-src https://calendar.google.com; "
            "img-src 'self' data:;"
        )
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


class PreviewServer(socketserver.ThreadingMixIn, http.server.HTTPServer):
    daemon_threads = True
    allow_reuse_address = True


def existing_server_is_healthy(port):
    try:
        with urllib.request.urlopen(f"http://127.0.0.1:{port}/", timeout=2) as response:
            return response.status == 200
    except (urllib.error.URLError, TimeoutError, OSError):
        return False


print(f"Serving project preview at http://localhost:{PORT}")
try:
    PreviewServer(("", PORT), PreviewHandler).serve_forever()
except OSError as err:
    if err.errno == 98 and existing_server_is_healthy(PORT):
        print(f"Preview server is already running at http://localhost:{PORT}")
        sys.exit(0)
    raise
