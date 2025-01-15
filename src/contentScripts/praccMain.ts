window.onload = async () => {
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
  chrome.storage.sync.set({ userIcon: userIcon.src });
};
