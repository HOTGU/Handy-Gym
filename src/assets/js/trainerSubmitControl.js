const writeBtn = document.getElementById("jsTrainerWriteSubmitBtn");
const infoBtn = document.getElementById("jsTrainerInfoSubmitBtn");

const program = document.querySelector("textarea[name=program]");
const myself = document.querySelector("textarea[name=myself]");

const careerYear = document.querySelector("input[name=career_year]");
const suppliesList = document.querySelector("input[name=supplies_list]");
const programPlace = document.querySelector("input[name=program_place]");
const runningHour = document.querySelector("select[name=running_hour]");
const runningMin = document.querySelector("select[name=running_min]");
const programPrice = document.querySelector("input[name=program_price]");

const handleWriteBtn = (e) => {
  if (program.value.length < 200 || myself.value.length < 200) {
    alert("글을 더 작성해주셔야 됩니다.");
    e.preventDefault();
  }
};

const handleInfoBtn = (e) => {
  if (!programPrice.value || programPrice.value === "0") {
    alert("가격을 책정해주세요.");
    e.preventDefault();
  }
  if (runningHour.value === "0" && runningMin.value === "0") {
    alert("시간을 설정해주세요");
    e.preventDefault();
  }
  if (document.querySelector("input[name=career]:checked").value === "yes") {
    if (!careerYear.value) {
      alert("경력 년수를 적어주세요");
      e.preventDefault();
    }
  }
  if (document.querySelector("input[name=supplies]:checked").value === "yes") {
    if (!suppliesList.value) {
      alert("준비물을 적어주세요");
      e.preventDefault();
    }
  }
  if (document.querySelector("input[name=place]:checked").value === "yes") {
    if (!programPlace.value) {
      alert("장소 주소를 검색하세요");
      e.preventDefault();
    }
  }
};

const init = () => {
  writeBtn.addEventListener("click", handleWriteBtn);
};

const init2 = () => {
  infoBtn.addEventListener("click", handleInfoBtn);
};

if (writeBtn) {
  init();
}

if (infoBtn) {
  init2();
}
