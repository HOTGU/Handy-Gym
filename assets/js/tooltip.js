const tooltips = document.querySelectorAll(".tooltip-text");

const init = () => {
  window.onmousemove = function (e) {
    let x = e.clientX + 20 + "px",
      y = e.clientY + 20 + "px";
    for (var i = 0; i < tooltips.length; i++) {
      tooltips[i].style.top = y;
      tooltips[i].style.left = x;
    }
  };
};

if (tooltips) {
  init();
}
