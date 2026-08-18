import ReactDOM from "react-dom/client";
import "./styles.css";
import { CommentDisplaySearchPage } from "./comment-display";

let cachedCSS: string | null = null;

async function fetchCSS() {
  if (cachedCSS) return cachedCSS;
  try {
    const cssUrl = new URL("./styles.css", import.meta.url);
    const response = await fetch(cssUrl);
    if (!response.ok) throw new Error("CSS load failed");
    cachedCSS = await response.text();
    return cachedCSS;
  } catch (err) {
    console.error("Could not load extension styles:", err);
    return "";
  }
}

function injectExtension() {
  if (!window.location.href.startsWith("https://pracc.com/search")) {
    return;
  }

  const parentElements = document.querySelectorAll(".HnZGg");
  if (parentElements.length === 0) return;

  parentElements.forEach((parentElement) => {
    if (parentElement.querySelector("[data-extension-pracc-optimizer]")) {
      return;
    }

    console.log(parentElement);

    const rootDiv = document.createElement("div");
    rootDiv.setAttribute("data-extension-pracc-optimizer", "true");

    parentElement.querySelector(".ZqITY")?.appendChild(rootDiv);

    const shadowRoot = rootDiv.attachShadow({ mode: "open" });
    const styleElement = document.createElement("style");
    shadowRoot.appendChild(styleElement);

    fetchCSS().then((cssText) => {
      styleElement.textContent = cssText;
    });

    const linkElement = parentElement.querySelector(
      ".sc-WKhSL",
    ) as HTMLAnchorElement | null;
    console.log(linkElement);
    if (!linkElement) {
      console.log("Link element with teamId not found");
      return;
    }
    const teamIdMatch = linkElement.href.match(/\/team\/(\d+)/);
    const teamId = teamIdMatch ? parseInt(teamIdMatch[1], 10) : null;

    if (!teamId) return;

    if (!document.querySelector('link[href="styles.css"]')) {
      const stylesheet = document.createElement("link");
      stylesheet.rel = "stylesheet";
      stylesheet.href = "styles.css";
      document.head.appendChild(stylesheet);
    }

    const mountingPoint = ReactDOM.createRoot(shadowRoot);
    mountingPoint.render(
      <div>
        <CommentDisplaySearchPage teamId={teamId} />
      </div>,
    );
  });
}

export default function initial() {
  let observer: MutationObserver | null = null;

  const start = () => {
    injectExtension();

    observer = new MutationObserver(() => {
      injectExtension();
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true,
    });

    return observer;
  };

  const boot = () => {
    if (!observer) start();
  };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", boot, { once: true });
  } else {
    boot();
  }

  return () => {
    observer?.disconnect();
  };
}
