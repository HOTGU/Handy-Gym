const menuBtn = document.querySelector(".menu-btn");
const menuList = document.querySelector(".menu-list");

const createMenuToggle = (name) => {
  const btn = document.getElementById(`menu-${name}_btn`);
  const list = document.getElementById(`menu-${name}_list`);
  const handleBtnClick = () => {
    console.log("작동");
    if (list.classList.contains("hidden")) {
      list.classList.remove("hidden");
    } else {
      list.classList.add("hidden");
    }
  };
  const handleWindowClick = (e) => {
    if (e.path.indexOf(list) < 0 && e.path.indexOf(btn) < 0) {
      list.classList.add("hidden");
    }
  };
  btn.addEventListener("click", handleBtnClick);
  document.addEventListener("click", handleWindowClick);
};

const init = () => {
  createMenuToggle("header");
  if (document.getElementById("menu-trainerUpdate_btn")) {
    createMenuToggle("trainerUpdate");
  }
};

if (menuBtn) {
  init();
}
