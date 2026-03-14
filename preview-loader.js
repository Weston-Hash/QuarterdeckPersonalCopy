(async () => {
  const root = document.getElementById("root");
  const setStatus = (message, color = "#555") => {
    root.innerHTML = `<p style="font-family:sans-serif;padding:2rem;color:${color}">${message}</p>`;
  };

  // Expose React hooks as globals so the JSX file's ES-style imports resolve
  const { useState, useEffect, createContext, useContext } = React;
  Object.assign(window, { useState, useEffect, createContext, useContext });

  setStatus("Loading app source...");
  let src;
  try {
    const res = await fetch(`ut_app_basecode.jsx?v=${Date.now()}`, { cache: "no-store" });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    src = await res.text();
  } catch (err) {
    setStatus(`Could not load ut_app_basecode.jsx: ${err.message}`, "red");
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
    setStatus("Compiling app...");
    await new Promise((resolve) => requestAnimationFrame(resolve));
    ({ code } = Babel.transform(src, { presets: ["react"] }));
  } catch (err) {
    setStatus(`Babel transform error: ${err.message}`, "red");
    return;
  }

  setStatus("Starting app...");
  await new Promise((resolve) => requestAnimationFrame(resolve));
  const script = document.createElement("script");
  script.textContent = code;
  document.body.appendChild(script);
})();
