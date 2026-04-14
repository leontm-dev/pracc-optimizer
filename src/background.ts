chrome.storage.sync.get("userIcon", (data) => {
  if (!data || !data.userIcon) {
    console.log("Error");
    return;
  }

  chrome.action
    .setIcon({ path: decodeURIComponent(data.userIcon) })
    .then(() => {
      console.log("Icon set successfully");
    })
    .catch((error) => {
      console.error("Icon set error", error);
    });
});
chrome.storage.sync.get("blocked", (data) => {
  if (!data) {
    console.log("Error");
    return;
  }

  if (!data.blocked) {
    chrome.storage.sync.set({ blocked: [] });
  }
});
