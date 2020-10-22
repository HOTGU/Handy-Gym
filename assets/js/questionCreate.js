const trainerQuestion = document.querySelector(".trainer__question");
const careerYearInput = document.getElementById("input-1");

const createQuestion = (num) => {
  const yesBtn = document.getElementById(`yes-${num}`);
  const noBtn = document.getElementById(`no-${num}`);
  const toggle = document.getElementById(`toggle-${num}`);
  const input = document.getElementById(`input-${num}`);
  console.log(input.value);
  yesBtn.addEventListener("click", () => {
    toggle.classList.remove("hidden");
    console.log(input.value);
  });
  noBtn.addEventListener("click", () => {
    toggle.classList.add("hidden");
    input.value = "";
    console.log(input);
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
