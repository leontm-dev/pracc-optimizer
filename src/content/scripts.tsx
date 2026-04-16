import ReactDOM from "react-dom/client";
import DetailedView from "./detailed-view";
import "./styles.css";

// Flag um zu verhindern, dass die Initialisierung mehrmals gleichzeitig läuft
let isInitialized = false;

function injectExtension() {
  // 1. URL-Check
  if (
    !window.location.href.startsWith("https://pracc.com/team/") ||
    window.location.href.replace("https://pracc.com/team/", "").length === 0
  ) {
    return;
  }

  // 2. Prüfen, ob das Element bereits existiert
  const existingRoot = document.querySelector('[data-extension-root="true"]');
  if (existingRoot) {
    return;
  }

  // 3. Prüfen, ob das Ziel-Element geladen ist
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

  // Optional: Globales Stylesheet nur einmal hinzufügen
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

// 4. Initialisierung des Observers anstelle des einmaligen Aufrufs
export default function initial() {
  // Führe es einmal direkt beim Start aus (für den Fall, dass die Seite schon fertig ist)
  injectExtension();

  // Verwende MutationObserver für alle zukünftigen DOM-Änderungen und Navigationen
  const observer = new MutationObserver(() => {
    // Wenn das Element existiert, tun wir nichts
    if (document.querySelector('[data-extension-root="true"]')) {
      return;
    }

    // Versuche die Extension zu injizieren
    injectExtension();
  });

  // Überwache das gesamte Dokument auf Strukturänderungen
  observer.observe(document.body, {
    childList: true,
    subtree: true,
  });

  return () => {
    // Cleanup-Logik, falls React-Root entfernt werden soll
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
