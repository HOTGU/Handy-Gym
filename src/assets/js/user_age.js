const select = document.querySelector("select[name=age]");

const init = () => {
  const age = parseInt(select.id);
  for (var i = 10; i <= 60; i = i + 10)
    if (i === age) {
      const option = document.createElement("option");
      option.value = i;
      option.innerText = `${i}대`;
      option.selected = true;
      select.appendChild(option);
    } else {
      const option = document.createElement("option");
      option.value = i;
      option.innerText = `${i}대`;
      select.appendChild(option);
    }
};

if (select) {
  init();
}
