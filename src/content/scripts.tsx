import ReactDOM from "react-dom/client";
import DetailedView from "./detailed-view";
import "./styles.css";

let isInitialized = false;

function injectExtension() {
  if (
    !window.location.href.startsWith("https://pracc.com/team/") ||
    window.location.href.replace("https://pracc.com/team/", "").length === 0
  ) {
    return;
  }

  const existingRoot = document.querySelector('[data-extension-root="true"]');
  if (existingRoot) {
    return;
  }

  const parentElement = document.querySelector(".jss24");
  if (!parentElement) {
    return;
  }

  console.log("pracc-optimizer initialized");
  isInitialized = true;

  const rootDiv = document.createElement("div");
  rootDiv.setAttribute("data-extension-root", "true");

  parentElement.insertBefore(rootDiv, parentElement.childNodes[1]);

  const shadowRoot = rootDiv.attachShadow({ mode: "open" });
  const styleElement = document.createElement("style");
  shadowRoot.appendChild(styleElement);

  fetchCSS().then((response) => (styleElement.textContent = response));

  const mountingPoint = ReactDOM.createRoot(shadowRoot);

  if (!document.querySelector('link[href="styles.css"]')) {
    const stylesheet = document.createElement("link");
    stylesheet.rel = "stylesheet";
    stylesheet.href = "styles.css";
    document.head.appendChild(stylesheet);
  }

  mountingPoint.render(
    <div>
      <DetailedView />
    </div>,
  );
}

export default function initial() {
  injectExtension();

  const observer = new MutationObserver(() => {
    if (document.querySelector('[data-extension-root="true"]')) {
      return;
    }

    injectExtension();
  });

  observer.observe(document.body, {
    childList: true,
    subtree: true,
  });

  return () => {
    observer.disconnect();
    const existingRoot = document.querySelector('[data-extension-root="true"]');
    if (existingRoot) {
      existingRoot.remove();
    }
  };
}

async function fetchCSS() {
  const cssUrl = new URL("./styles.css", import.meta.url);
  const response = await fetch(cssUrl);
  const text = await response.text();
  return response.ok ? text : Promise.reject(text);
}
