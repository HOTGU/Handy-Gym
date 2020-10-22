import axios from "axios";

const searchBtn = document.getElementById("jsAddressSearchBtn");
const wantAddress = document.getElementById("wantAddress");
const input = document.getElementById("jsAddressInput");

const removeSearch = () => {
  const result = document.getElementById("jsResult");
  if (result.childNodes) {
    while (result.hasChildNodes()) {
      result.removeChild(result.firstChild);
    }
  }
};

const handleDeleteBtn = (event) => {
  const target = event.target;
  const parent = target.parentNode;
  wantAddress.removeChild(parent);
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
          if (wantAddress.childNodes.length < 5) {
            const value = e.target.innerHTML;
            const wrapper = document.createElement("div");
            wrapper.classList.add("want-address__wrapper");
            const input = document.createElement("input");
            input.value = value;
            input.classList.add("want-address__input");
            input.name = "wantAddress[]";
            input.style.margin = 0;
            input.readOnly = true;
            const deleteBtn = document.createElement("i");
            deleteBtn.classList.add("want-address__btn", "fas", "fa-times");
            deleteBtn.addEventListener("click", handleDeleteBtn);
            wantAddress.appendChild(wrapper);
            wrapper.appendChild(input);
            wrapper.appendChild(deleteBtn);
            deleteDimmer();
          } else {
            deleteDimmer();
            alert("운동하고 싶은 동네는 다섯개까지입니다.");
            false;
          }
        };
        const li = document.createElement("li");
        li.innerHTML = result.data[i].fullAdd;
        li.classList.add("search_list");
        li.addEventListener("click", handleClick);
        document.getElementById("jsResult").appendChild(li);
      }
    } else {
      alert("검색결과가 없습니다. 읍/면/동을 검색해주세요.");
    }
  });
};

const createDimmer = () => {
  const checkDimmer = document.querySelector(".dimmer");
  if (checkDimmer) {
    return;
  } else {
    const dimmer = document.createElement("div");
    input.placeholder = "읍면동으로 검색하세요";
    dimmer.style.width = window.innerWidth + "px";
    dimmer.style.height = window.innerHeight + "px";
    dimmer.className = "dimmer";
    dimmer.addEventListener("click", deleteDimmer);
    document.body.appendChild(dimmer);
  }
};

const deleteDimmer = () => {
  const dimmer = document.querySelector(".dimmer");
  document.body.removeChild(dimmer);
  input.placeholder = "운동할 동네 추가하기(최대 5개)";
  input.value = "";
  removeSearch();
};

const handleClick = (e) => {
  e.preventDefault();
  let value = input.value;
  if (value) {
    searchAddress(value);
  } else {
    false;
  }
};

function init() {
  searchBtn.addEventListener("click", handleClick);
  input.addEventListener("click", createDimmer);
}

if (searchBtn) {
  init();
}
