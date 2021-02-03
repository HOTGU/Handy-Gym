import axios from "axios";

const searchImotion = document.querySelector(".search-imotion");

const searchBtn = document.getElementById("jsAddressSearchBtn");
const searchInput = document.getElementById("jsAddressInput");
const searchResult = document.getElementById("jsResult");
const inputAddress = document.querySelector("input[name=wantAddress]");
const popupContainer = document.querySelector(".form-popup__container");

const deleteDimmer = () => {
  const dimmer = document.querySelector(".dimmer");
  document.body.removeChild(dimmer);
  popupContainer.style.animation = "closePopup 0.25s ease-in forwards";
  popupContainer.style.zIndex = "-1";
};

const removeSearch = () => {
  if (searchResult.childNodes) {
    while (searchResult.hasChildNodes()) {
      searchResult.removeChild(searchResult.firstChild);
    }
  }
};

const searchAddress = async (address) => {
  removeSearch();
  const response = await axios({
    url: `/api/address-search`,
    method: "POST",
    headers: {
      enctype: "multipart/form-data",
    },
    data: {
      searchingAddress: address,
    },
  }).then(function (result) {
    if (result.data.length > 0) {
      for (var i = 0; i < result.data.length; i++) {
        const handleClick = (e) => {
          inputAddress.value = e.target.innerHTML;
          if (inputAddress.style.display === "none") {
            inputAddress.style.display = "block";
          }
          removeSearch();
          if (popupContainer.id !== "NoDeleteDimmer") {
            deleteDimmer();
          }
          inputAddress.style.backgroundColor = "#16c2c2";
          inputAddress.style.color = "white";
          searchImotion.style.color = "white";
          searchInput.value = "";
        };
        const li = document.createElement("li");
        li.innerHTML = result.data[i].fullAdd;
        li.classList.add("search_list");
        li.addEventListener("click", handleClick);
        document.getElementById("jsResult").appendChild(li);
      }
    } else {
      const li = document.createElement("li");
      li.innerHTML = "읍면동으로 검색해주세요😂";
      document.getElementById("jsResult").appendChild(li);
    }
  });
};

const handleClick = (e) => {
  e.preventDefault();
  let value = searchInput.value;
  if (value) {
    searchAddress(value);
  } else {
    false;
  }
};

const initSearch = (e) => {
  removeSearch();
  searchInput.value = "";
};

function init() {
  searchBtn.addEventListener("click", handleClick);
  searchInput.addEventListener("keyup", handleClick);
  window.addEventListener("click", initSearch);
}

if (searchBtn) {
  init();
}
