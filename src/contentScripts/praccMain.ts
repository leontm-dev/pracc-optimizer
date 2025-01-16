const observer = new MutationObserver(function () {
  (async () => {
    console.log("praccMain content script loaded successfully");
    const userIcon = document.getElementsByClassName(
      "css-1hy9t21"
    )[1] as HTMLImageElement | null;
    if (!userIcon) {
      console.error("User icon not found");
      return;
    }
    if (!userIcon.src) {
      console.error("User icon src not found");
      return;
    }
    chrome.storage.sync.set({ userIcon: encodeURIComponent(userIcon.src) });
    console.log("praccMain content script finished");
  })();
});

const target = document.querySelector("body");
const config = { childList: true };
observer.observe(target!, config);
