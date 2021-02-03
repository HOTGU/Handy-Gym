const btn = document.getElementById("jsPopUpBtn");
const popupContainer = document.querySelector(".form-popup__container");
const cancelBtn = document.getElementById("jsCancelBtn");

const createDimmer = () => {
  const checkDimmer = document.querySelector(".dimmer");
  if (checkDimmer) {
    return;
  } else {
    const dimmer = document.createElement("div");
    dimmer.style.width = window.innerWidth + "px";
    dimmer.style.height = window.innerHeight + "px";
    dimmer.className = "dimmer";
    dimmer.addEventListener("click", deleteDimmer);
    document.body.appendChild(dimmer);
  }
};

const deleteDimmer = () => {
  const dimmer = document.querySelector(".dimmer");
  document.body.removeChild(dimmer);
  popupContainer.style.animation = "closePopup 0.25s ease-in forwards";
  popupContainer.style.zIndex = "-1";
};

const handleClick = () => {
  createDimmer();
  popupContainer.style.animation = "popup 0.25s ease-in forwards";
  popupContainer.style.zIndex = "100";
};

const handleCancel = () => {
  deleteDimmer();
};

function init() {
  btn.addEventListener("click", handleClick);
  cancelBtn.addEventListener("click", handleCancel);
}

if (btn) {
  init();
}
