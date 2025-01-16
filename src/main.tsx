// Imports

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Popup } from "./chrome-extension/popup/index";
import "./chrome-extension/global.css";

// Imports

import { ThemeProvider } from "./components/theme-provider";
import { TooltipProvider } from "./components/ui/tooltip";

// Code

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider>
      <TooltipProvider>
        <div className="w-[600px] h-[500px] flex">
          <Popup />
        </div>
      </TooltipProvider>
    </ThemeProvider>
  </StrictMode>
);
