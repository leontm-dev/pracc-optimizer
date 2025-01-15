window.onload = async () => {
  const userIcon = document.getElementsByClassName("css-n4rc87")[0].children[0]
    .children[0].children[0].children[0] as HTMLImageElement | null;
  if (!userIcon) {
    console.error("User icon not found");
    return;
  }
  console.log(userIcon.src);
};
