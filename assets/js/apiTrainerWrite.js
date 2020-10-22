import axios from "axios";

const form = document.getElementById("jsTrainerWriteApi");
const link = document.querySelectorAll("a");
const program = document.querySelector("textarea[name=program]");
const myself = document.querySelector("textarea[name=myself]");

const saveValue = async (obj) => {
  const trainerId = window.location.href.split("/")[4];
  const response = await axios({
    url: `/trainers/${trainerId}/write`,
    method: "POST",
    data: obj,
  });
};

const handleSubmit = () => {
  const programValue = program.value;
  const myselfValue = myself.value;
  const obj = {
    program: programValue,
    myself: myselfValue,
  };
  saveValue(obj);
};

const handleClick = () => {
  handleSubmit();
  return;
};

function init() {
  for (var i = 0; i < link.length; i++) {
    link[i].addEventListener("click", handleClick);
  }
  form.addEventListener("submit", handleSubmit);
}

if (form) {
  init();
}
