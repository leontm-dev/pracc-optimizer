import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import Options from "./chrome-extension/options/index";
import "./chrome-extension/global.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <div className="bg-white w-full h-250">
      <Options />
    </div>
  </StrictMode>,
);
