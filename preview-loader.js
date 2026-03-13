(async () => {
  // Expose React hooks as globals so the JSX file's ES-style imports resolve
  const { useState, useEffect, createContext, useContext } = React;
  Object.assign(window, { useState, useEffect, createContext, useContext });

  let src;
  try {
    const res = await fetch(`ut_app_basecode.jsx?v=${Date.now()}`, { cache: "no-store" });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    src = await res.text();
  } catch (err) {
    document.getElementById("root").innerHTML =
      `<p style="font-family:sans-serif;padding:2rem;color:red">
         Could not load ut_app_basecode.jsx: ${err.message}
       </p>`;
    return;
  }

  // Strip ES module import/export so the file runs as a plain script
  src = src.replace(/^import\s+.*from\s+['"]react['"];?\s*/gm, "");
  src = src.replace(/^export\s+default\s+/gm, "");
  src = src.replace(/^export\s+/gm, "");

  // Append render call
  src += "\nReactDOM.createRoot(document.getElementById('root')).render(React.createElement(App));";

  // Transpile JSX → JS via Babel standalone
  let code;
  try {
    ({ code } = Babel.transform(src, { presets: ["react"] }));
  } catch (err) {
    document.getElementById("root").innerHTML =
      `<p style="font-family:sans-serif;padding:2rem;color:red">
         Babel transform error: ${err.message}
       </p>`;
    return;
  }

  const script = document.createElement("script");
  script.textContent = code;
  document.body.appendChild(script);
})();
