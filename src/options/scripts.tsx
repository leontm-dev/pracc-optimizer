import { createRoot } from "react-dom/client";
import SidebarApp from "./OptionsPage";
import "./styles.css";
import { TooltipProvider } from "@/components/ui/tooltip";

const rootElement = document.getElementById("root");

if (!rootElement) {
  throw new Error("Sidebar root element not found");
}

const reactRoot = createRoot(rootElement as HTMLElement);
reactRoot.render(
  <TooltipProvider>
    <SidebarApp />
  </TooltipProvider>,
);
