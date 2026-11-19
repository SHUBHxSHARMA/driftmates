import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "./index.css";

const icon = document.createElement("link");
icon.rel = "icon";
icon.type = "image/png";
icon.href = "/logo.png";
document.head.appendChild(icon);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>
);
