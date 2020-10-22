const textarea = document.querySelector(".trainer__textarea");
const program = document.querySelector("textarea[name=program]");
const myself = document.querySelector("textarea[name=myself]");
const programResult = document.getElementById("programResult");
const myselfResult = document.getElementById("myselfResult");
const submit = document.getElementById("uploadBtn");

const MIN_LENGTH = 200;

function countProgram() {
  const str = this.value.length;
  programResult.innerHTML = `${str} / 1000`;
  programResult.style.color = "black";
  program.style.border = "2px solid #16c2c2";
  program.style.opacity = "1";
}

function countHost() {
  const str = this.value.length;
  myselfResult.innerHTML = `${str} / 1000`;
  myselfResult.style.color = "black";
  myself.style.border = "2px solid #16c2c2";
  myself.style.opacity = "1";
}

function blurProgram() {
  const str = this.value.length;
  const moreLength = MIN_LENGTH - str;
  if (str < MIN_LENGTH) {
    programResult.innerHTML = `${moreLength}자를 더 입력해주세요`;
    programResult.style.color = "red";
    program.style.border = "2px solid red";
    program.style.opacity = "0.8";
  } else {
    program.style.border = "2px solid #16c2c2";
    program.style.opacity = "1";
  }
}

function blurHost() {
  const str = this.value.length;
  const moreLength = MIN_LENGTH - str;
  if (str < MIN_LENGTH) {
    myselfResult.innerHTML = `${moreLength}자를 더 입력해주세요`;
    myselfResult.style.color = "red";
    myself.style.border = "2px solid red";
    myself.style.opacity = "0.8";
  } else {
    myself.style.border = "2px solid #16c2c2";
    myself.style.opacity = "1";
  }
}

function focusProgram() {
  const str = this.value.length;
  programResult.innerHTML = `${str} / 1000`;
  programResult.style.color = "black";
  program.style.border = "2px solid #16c2c2";
  program.style.opacity = "1";
}

function focusHost() {
  const str = this.value.length;
  myselfResult.innerHTML = `${str} / 1000`;
  myselfResult.style.color = "black";
  myself.style.border = "2px solid #16c2c2";
  myself.style.opacity = "1";
}

function programInit() {
  let programLength = program.value.length;
  const moreLength = MIN_LENGTH - programLength;
  if (programLength > 0) {
    if (programLength < MIN_LENGTH) {
      programResult.innerHTML = `${moreLength}자를 더 입력해주세요`;
      programResult.style.color = "red";
      program.style.border = "2px solid red";
      program.style.opacity = "0.8";
    } else {
      programResult.innerHTML = `${programLength} / 1000`;
      program.style.border = "2px solid #16c2c2";
      program.style.opacity = "1";
    }
  }
}

function myselfInit() {
  let myselfLength = myself.value.length;
  const moreLength = MIN_LENGTH - myselfLength;
  if (myselfLength > 0) {
    if (myselfLength < MIN_LENGTH) {
      myselfResult.innerHTML = `${moreLength}자를 더 입력해주세요`;
      myselfResult.style.color = "red";
      myself.style.border = "2px solid red";
      myself.style.opacity = "0.8";
    } else {
      myselfResult.innerHTML = `${myselfLength} / 1000`;
      myself.style.border = "2px solid #16c2c2";
      myself.style.opacity = "1";
    }
  }
}

function init() {
  programInit();
  myselfInit();
  program.addEventListener("input", countProgram, false);
  program.addEventListener("blur", blurProgram, false);
  program.addEventListener("focus", focusProgram, false);
  myself.addEventListener("keyup", countHost, false);
  myself.addEventListener("blur", blurHost, false);
  myself.addEventListener("focus", focusHost, false);
}

if (textarea) {
  init();
}
