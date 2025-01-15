const loadTrackerButtons = () => {
  console.log("Loading tracker buttons");
  const listOfPlayers = document.getElementsByClassName("css-1c2lhu");
  for (const player of listOfPlayers) {
    const nameContainer = player.children[1];
    if (!nameContainer) {
      console.error("Name container not found");
      continue;
    }
    const name = nameContainer.children[0].innerHTML;

    if (name.includes("#")) {
      const button = document.createElement("button");
      button.className = "valorant-tracker-button-pracc-optimizer";
      button.onclick = () => {
        window.open(
          `https://tracker.gg/valorant/profile/riot/${encodeURIComponent(
            name
          )}/overview?playlist=competitive`
        );
      };
      button.innerHTML =
        "<img src='https://avatars.githubusercontent.com/u/12829003?s=200&v=4'/>";
      player.appendChild(button);
    }
  }
  console.log("Loaded tracker buttons");
};
const loadDescriptionLinks = () => {
  console.log("Loading description links");
  const pageContainer = document.getElementsByClassName("jss24")[0].children[0];
  const linksOutOfDescriptionContainer = document.createElement("div");
  const teamDescription = document.getElementById(
    "mui-5"
  ) as HTMLTextAreaElement | null;
  if (!teamDescription || !teamDescription.value) {
    console.error("Description not found");
    return;
  }
  const links: {
    type: "tracker" | "vlr" | "rib" | "twitter" | "discord" | "x";
    link: string;
    text?: string;
  }[] = [];

  const linksInLines = teamDescription.value
    .split(/\s+/)
    .filter((link) => link.trim().startsWith("https://"));
  linksInLines.forEach((link) => {
    if (new URL(link).hostname.includes("tracker.gg")) {
      const text = decodeURI(link.split("/")[6]).replace("%23", "#");
      links.push({ type: "tracker", link, text });
    } else if (new URL(link).hostname.includes("discord.gg")) {
      links.push({ type: "discord", link });
    } else if (new URL(link).hostname.includes("x.com")) {
      const text = link.split("/")[3];
      links.push({ type: "x", link, text });
    } else if (new URL(link).hostname.includes("twitter.com")) {
      const text = link.split("/")[3];
      links.push({ type: "x", link, text });
    } else if (new URL(link).hostname.includes("rib.gg")) {
      links.push({ type: "rib", link });
    } else if (new URL(link).hostname.includes("vlr.gg")) {
      const text = link.split("/")[5];
      links.push({ type: "vlr", link, text });
    }
  });
  linksOutOfDescriptionContainer.classList.add(
    "MuiPaper-root",
    "MuiPaper-elevation1",
    "MuiPaper-rounded"
  );
  const linksContainer = document.createElement("div");
  linksContainer.classList.add("paper-content");
  links.forEach((link) => {
    const linkContainer = document.createElement("div");
    linkContainer.classList.add("link-pracc-optimizer");
    const linkElement = document.createElement("a");
    linkElement.href = link.link;
    switch (link.type) {
      case "x":
        linkElement.innerHTML = `<img src='https://brandlogos.net/wp-content/uploads/2023/07/x__twitter-logo_brandlogos.net_fxbde.png'/> ${
          link.text ? link.text : link.link
        }`;
        break;
      case "discord":
        linkElement.innerHTML = `<img src='https://brandlogos.net/wp-content/uploads/2021/11/discord-logo-300x300.png'/> ${
          link.text ? link.text : link.link
        }`;
        break;
      case "tracker":
        linkElement.innerHTML = `<img src='https://avatars.githubusercontent.com/u/12829003?s=200&v=4'/> ${
          link.text ? link.text : link.link
        }`;
        break;
      case "twitter":
        linkElement.innerHTML = `<img src='https://brandlogos.net/wp-content/uploads/2023/07/x__twitter-logo_brandlogos.net_fxbde.png'/> ${
          link.text ? link.text : link.link
        }`;
        break;
      case "rib":
        linkElement.innerHTML = `<img src='https://www.rib.gg/assets/rib-logo-dark.webp'/> ${
          link.text ? link.text : link.link
        }`;
        break;
      case "vlr":
        linkElement.innerHTML = `<img src='https://fe-app.pracc.com/387f9ad86a58dd98b5b9eb94dd6503f3fca758e3/static/media/vlrgg.50bb8f0e2dc0697702e8.png'/> ${
          link.text ? link.text : link.link
        }`;
        break;
    }
    linkContainer.appendChild(linkElement);
    linksContainer.appendChild(linkContainer);
  });
  linksOutOfDescriptionContainer.appendChild(linksContainer);
  pageContainer.appendChild(linksOutOfDescriptionContainer);
  console.log("Loaded description links");
};
const addBlockListButton = async () => {
  console.log("Adding block list button");

  const id = window.location.href.split("/")[4];

  const buttonList = document.getElementsByClassName("css-1xhj18k")[0];
  if (!buttonList) {
    console.error("Button list not found");
    return;
  }
  const button = document.createElement("button");

  const blockedTeams = (await chrome.storage.sync.get("blocked")).blocked;
  if (blockedTeams.includes(id)) {
    button.innerHTML = "Unblock team";
  } else {
    button.innerHTML = "Block team";
  }
  button.classList.add("pracc-optimizer-block-button");
  button.onclick = () => {
    chrome.storage.sync.get("blocked", (data) => {
      const blockedTeams = data.blocked || [];
      if (blockedTeams.includes(id)) {
        blockedTeams.splice(blockedTeams.indexOf(id), 1);
        chrome.storage.sync.set({ blocked: blockedTeams });
        button.innerHTML = "Block team";
      } else {
        blockedTeams.push(id);
        chrome.storage.sync.set({ blocked: blockedTeams });
        button.innerHTML = "Unblock team";
      }
    });
  };
  buttonList.appendChild(button);
  console.log("Added block list button");
};

window.onload = async () => {
  const permissions = (await chrome.storage.sync.get("permissions"))
    .permissions;
  console.log(permissions);
  console.log("praccTeam content script loaded successfully");
  if (permissions.includes("tracker-buttons")) loadTrackerButtons();
  if (permissions.includes("description-links")) loadDescriptionLinks();
  if (permissions.includes("block-list")) addBlockListButton();
  console.log("praccTeam content script finished");
};
