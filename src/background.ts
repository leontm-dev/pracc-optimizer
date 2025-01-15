chrome.storage.sync.get("userIcon", (data) => {
  if (!data.userIcon) {
    console.log("Error");
    return;
  }

  chrome.action
    .setIcon({ path: data.userIcon })
    .then(() => {
      console.log("Icon set successfully");
    })
    .catch((error) => {
      console.error("Icon set error", error);
    });
});
