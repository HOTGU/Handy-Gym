const trainerQuestion = document.querySelector(".trainer__question");
const careerYearInput = document.getElementById("input-1");

const createQuestion = (num) => {
  const yesBtn = document.getElementById(`yes-${num}`);
  const noBtn = document.getElementById(`no-${num}`);
  const toggle = document.getElementById(`toggle-${num}`);
  const input = document.getElementById(`input-${num}`);
  const resizeInput = () => {
    input.style.width = (input.value.length + 2) * 11 + "px";
  };
  resizeInput();
  input.addEventListener("keyup", () => {
    resizeInput();
  });
  yesBtn.addEventListener("click", () => {
    toggle.classList.remove("hidden");
  });
  noBtn.addEventListener("click", () => {
    toggle.classList.add("hidden");
    input.value = "";
  });
};

const handleInput = (e) => {
  if (e.target.value.length > e.target.maxLength) {
    e.target.value = e.target.value.slice(0, e.target.maxLength);
  }
};

function init() {
  careerYearInput.addEventListener("input", handleInput);
  createQuestion(1);
  createQuestion(2);
  createQuestion(3);
}

if (trainerQuestion) {
  init();
}
