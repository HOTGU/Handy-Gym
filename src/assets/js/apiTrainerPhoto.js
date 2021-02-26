import axios from "axios";

const form = document.getElementById("jsTrainerPhotoApi");

let reader = new FileReader();

const photoRemove = async (imgSrc) => {
  await axios({
    url: `/api/remove-photo`,
    method: "POST",
    headers: {
      enctype: "multipart/form-data",
    },
    data: { imgSrc },
  });
};

const photoControl = (num) => {
  const photo = document.getElementById(`jsPhoto_${num}`);
  const img = document.getElementById(`jsImg_${num}`);

  const dbSavePhoto = async (fileUrl, fieldName) => {
    const trainerId = window.location.href.split("/")[4];
    await axios({
      url: `/api/${trainerId}/trainer-photo-save`,
      method: "POST",
      headers: {
        enctype: "multipart/form-data",
      },
      data: { fileUrl, fieldName },
    });
  };

  const awsUploadPhoto = async (file) => {
    let formData = new FormData();
    formData.append(`trainerPhoto_${num}`, file);
    img.classList.add("hidden");
    const imgContainer = img.parentNode;
    const loader = document.createElement("div");
    loader.classList.add("loading-active");
    imgContainer.appendChild(loader);
    const response = await axios({
      url: `/api/aws/photo-upload`,
      method: "POST",
      headers: {
        enctype: "multipart/form-data",
      },
      data: formData,
    });
    if (response.status === 200) {
      img.classList.remove("hidden");
      imgContainer.removeChild(loader);
      img.src = response.data.fileUrl;
      dbSavePhoto(response.data.fileUrl, response.data.fieldName);
    }
  };
  photo.addEventListener("change", (e) => {
    const currentImgSrc = img.src;
    let imgFile = e.target.files[0];
    let c = confirm("이 사진으로 하실건가요?");
    if (c === true) {
      // if (currentImgSrc !== "http://handygym.herokuapp.com/static/images/no-image.jpg") {
      //   photoRemove(currentImgSrc);
      // }
      awsUploadPhoto(imgFile);
    } else {
      return;
    }
  });
};

function init() {
  photoControl(1);
  photoControl(2);
  photoControl(3);
  photoControl(4);
}

if (form) {
  init();
}
