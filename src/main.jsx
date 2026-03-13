import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "../ut_app_basecode.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>
);
