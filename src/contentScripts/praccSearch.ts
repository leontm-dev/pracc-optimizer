function autoTurnOnMatchDates() {
  console.log("Turning on match dates");
  const matchDatesInput = document.getElementsByClassName("css-1wkwmmc")[0]
    .children[1].children[0].children[0].children[0] as HTMLInputElement | null;
  if (!matchDatesInput) {
    console.error("Match dates input not found");
    return;
  }
  matchDatesInput.click();
  console.log("Match dates turned on");
}
function injectOnlyNotBlockedTeamsButton() {
  const sidebarPanelsList = document.getElementsByClassName("css-1m90y6u");
  const teamsSidebarPanel = sidebarPanelsList[sidebarPanelsList.length - 1];
  if (!teamsSidebarPanel) {
    console.error("Teams sidebar panel not found");
    return;
  }

  const buttonContainer = document.createElement("div");
  buttonContainer.classList.add(
    "MuiGrid-root",
    "MuiGrid-container",
    "MuiGrid-item",
    "css-14i2kc6"
  );
  const buttonIsThere = document.getElementById(
    "pracc-optimizer-block-list-input"
  );
  if (buttonIsThere) {
    console.log("Button already exists");
    return;
  }
  buttonContainer.innerHTML = `
  <label class="MuiFormControlLabel-root MuiFormControlLabel-labelPlacementEnd css-kswqkt" style="margin-bottom: 0px;">
    <span class="MuiButtonBase-root MuiCheckbox-root MuiCheckbox-colorPrimary PrivateSwitchBase-root MuiCheckbox-root MuiCheckbox-colorPrimary MuiCheckbox-root MuiCheckbox-colorPrimary css-nhqirp">
      <input class="pracc-optimizer-block-list-input" id="pracc-optimizer-block-list-input" type="checkbox" data-indeterminate="false">
    </span>
    <span class="MuiTypography-root MuiTypography-body1 MuiFormControlLabel-label css-9l3uo3">
      Only teams that are not blocked
    </span>
  </label>`;
  teamsSidebarPanel.appendChild(buttonContainer);
  const blockListInput = document.getElementById(
    "pracc-optimizer-block-list-input"
  ) as HTMLInputElement | null;
  if (!blockListInput) {
    console.error("Block list input not found");
    return;
  }
  blockListInput.onclick = () => {
    if (blockListInput.checked) {
      onlyShowNotBlockedTeams();
    } else {
      window.location.reload();
    }
  };
}
function injectOnlyFavoriteButton() {
  const sidebarPanelsList = document.getElementsByClassName("css-1m90y6u");
  const teamsSidebarPanel = sidebarPanelsList[sidebarPanelsList.length - 1];
  if (!teamsSidebarPanel) {
    console.error("Teams sidebar panel not found");
    return;
  }

  const buttonContainer = document.createElement("div");
  buttonContainer.classList.add(
    "MuiGrid-root",
    "MuiGrid-container",
    "MuiGrid-item",
    "css-14i2kc6"
  );
  const buttonIsThere = document.getElementById(
    "pracc-optimizer-favorite-input"
  );
  if (buttonIsThere) {
    console.log("Button already exists");
    return;
  }
  buttonContainer.innerHTML = `
  <label class="MuiFormControlLabel-root MuiFormControlLabel-labelPlacementEnd css-kswqkt" style="margin-bottom: 0px;">
    <span class="MuiButtonBase-root MuiCheckbox-root MuiCheckbox-colorPrimary PrivateSwitchBase-root MuiCheckbox-root MuiCheckbox-colorPrimary MuiCheckbox-root MuiCheckbox-colorPrimary css-nhqirp">
      <input class="pracc-optimizer-favorite-input" id="pracc-optimizer-favorite-input" type="checkbox" data-indeterminate="false">
    </span>
    <span class="MuiTypography-root MuiTypography-body1 MuiFormControlLabel-label css-9l3uo3">
      Only favorites
    </span>
  </label>`;
  teamsSidebarPanel.appendChild(buttonContainer);
  const blockListInput = document.getElementById(
    "pracc-optimizer-block-list-input"
  ) as HTMLInputElement | null;
  if (!blockListInput) {
    console.error("Favorite input not found");
    return;
  }
  blockListInput.onclick = () => {
    if (blockListInput.checked) {
      onlyShowNotBlockedTeams();
    } else {
      window.location.reload();
    }
  };
}
async function onlyShowNotBlockedTeams() {
  const teamList = document.getElementsByClassName("boPKSZ")[0];
  if (!teamList) {
    console.error("Team list not found");
    return;
  }
  const blocked = (await chrome.storage.sync.get("blocked")).blocked;
  const entries = document.getElementsByClassName("jJQINC");
  for (const entry of entries) {
    const teamIdElement = entry.children[1].children[0].children[0]
      .children[0] as HTMLAnchorElement | null;
    console.log(teamIdElement);
    if (!teamIdElement) {
      console.error("Team id element not found");
      return;
    }

    const teamId = teamIdElement.href.replace("https://pracc.com/team/", "");
    console.log(teamId);
    if (blocked.includes(teamId)) {
      teamList.removeChild(entry);
    }
  }
}

const observer = new MutationObserver(function () {
  (async () => {
    const permissions = (await chrome.storage.sync.get("permissions"))
      .permissions;
    console.log(permissions);
    console.log("praccSearch content script loaded successfully");
    if (permissions.includes("block-list")) injectOnlyNotBlockedTeamsButton();
    if (permissions.includes("favorites")) injectOnlyFavoriteButton();
    console.log("praccSearch content script finished");
  })();
});

const target = document.querySelector("body");
const config = { childList: true };
observer.observe(target!, config);
window.onload = () => {
  setTimeout(async () => {
    const permissions = (await chrome.storage.sync.get("permissions"))
      .permissions;
    if (permissions.includes("auto-match-dates")) autoTurnOnMatchDates();
  }, 1000);
};
