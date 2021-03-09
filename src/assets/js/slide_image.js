let slideIndex = 1;

const backBtn = document.getElementById("jsBackBtn");

const slide = document.querySelector(".slideshow-container");
const slides = document.getElementsByClassName("mySlides");
const dots = document.getElementsByClassName("dot");
const prevBtn = document.querySelector(".prev");
const slideBtn = document.querySelectorAll(".slide_btn");

const initImage = () => {
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  for (i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(" active", "");
  }
};

const showSlides = (n) => {
  if (n < 1) {
    slideIndex = slides.length;
  }
  if (n > slides.length) {
    slideIndex = 1;
  }
  initImage();
  slides[slideIndex - 1].style.display = "block";
  dots[slideIndex - 1].className += " active";
};

const dotControl = (id) => {
  const currentSlide = () => {
    showSlides((slideIndex = id + 1));
  };
  dots[id].addEventListener("click", currentSlide);
};

const btnControl = (id) => {
  const handleBtn = (e) => {
    if (e.target.id === "prev") {
      slideIndex += -1;
      showSlides(slideIndex);
    }
    if (e.target.id === "next") {
      slideIndex += 1;
      showSlides(slideIndex);
    }
  };
  slideBtn[id].addEventListener("click", handleBtn);
};

const init = () => {
  showSlides();
  for (i = 0; i < dots.length; i++) {
    dotControl(i);
  }
  for (j = 0; j < slideBtn.length; j++) {
    btnControl(j);
  }
  backBtn.addEventListener("click", (e) => {
    // backBtn.setAttribute("href", document.referrer);
    window.history.back();
  });
};

if (slide) {
  init();
}

// function backUrl() {
//   document.getElementById("jsBackBtn").href = document.referrer;
//   return;
// }

// function currentSlide(n) {
//   showSlides((slideIndex = n));
// }
