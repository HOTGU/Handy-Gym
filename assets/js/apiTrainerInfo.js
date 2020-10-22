import axios from "axios";

const form = document.getElementById("jsTrainerInfoApi");
const link = document.querySelectorAll("a");
const career = document.getElementsByName("career");
const careerYear = document.querySelector("input[name=career_year]");
const supplies = document.getElementsByName("supplies");
const suppliesList = document.querySelector("input[name=supplies_list]");
const place = document.getElementsByName("place");
const programPlace = document.querySelector("input[name=program_place]");
const freeClass = document.getElementsByName("free_class");
const runningHour = document.querySelector("select[name=running_hour]");
const runningMin = document.querySelector("select[name=running_min]");
const programPrice = document.querySelector("input[name=program_price]");

const saveValue = async (obj) => {
  const trainerId = window.location.href.split("/")[4];
  const response = await axios({
    url: `/trainers/${trainerId}/info`,
    method: "POST",
    data: obj,
  });
  console.log(response);
};

const handleSubmit = () => {
  let careerValue;
  for (let i = 0; i < career.length; i++) {
    if (career[i].checked) {
      careerValue = career[i].value;
    }
  }
  const careerYearValue = careerYear.value;
  let suppliesValue;
  for (let i = 0; i < supplies.length; i++) {
    if (supplies[i].checked) {
      suppliesValue = supplies[i].value;
    }
  }
  const suppliesListValue = suppliesList.value;
  let placeValue;
  console.log(place);
  console.log(place.length);
  for (let i = 0; i < place.length; i++) {
    if (place[i].checked) {
      placeValue = place[i].value;
    }
  }
  console.log(placeValue);
  const programPlaceValue = programPlace.value;
  let freeClassValue;
  for (let i = 0; i < freeClass.length; i++) {
    if (freeClass[i].checked) {
      freeClassValue = freeClass[i].value;
    }
  }
  const runningHourValue = runningHour.value;
  const runningMinValue = runningMin.value;
  const programPriceValue = programPrice.value;
  const obj = {
    career: careerValue,
    career_year: careerYearValue,
    supplies: suppliesValue,
    supplies_list: suppliesListValue,
    place: placeValue,
    program_place: programPlaceValue,
    free_class: freeClassValue,
    running_hour: runningHourValue,
    running_min: runningMinValue,
    program_price: programPriceValue,
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
