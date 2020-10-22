import axios from "axios";

const form = document.getElementById("jsTrainerPhotoApi");
const avatar = document.getElementById("jsAvatar");

let reader = new FileReader();

const photoSave = (num) => {
  const photo = document.getElementById(`jsPhoto_${num}`);
  const savePhoto = async (file) => {
    let formData = new FormData();
    formData.append(`trainerPhoto_${num}`, file);
    const trainerId = window.location.href.split("/")[4];
    const response = await axios({
      url: `/trainers/${trainerId}/photo`,
      method: "POST",
      headers: {
        enctype: "multipart/form-data",
      },
      data: formData,
    });
    console.log(response);
  };
  photo.addEventListener("change", (e) => {
    let imgFile = e.target.files[0];
    reader.readAsArrayBuffer(imgFile);
    savePhoto(imgFile);
  });
};

const saveAvatar = async (file) => {
  let formData = new FormData();
  formData.append("trainerAvatar", file);
  const trainerId = window.location.href.split("/")[4];
  const response = await axios({
    url: `/trainers/${trainerId}/photo`,
    method: "POST",
    headers: {
      enctype: "multipart/form-data",
    },
    data: formData,
  });
};

const handleChange = (e) => {
  let imgFile = e.target.files[0];
  reader.readAsArrayBuffer(imgFile);
  saveAvatar(imgFile);
};

function init() {
  avatar.addEventListener("change", handleChange);
  photoSave(1);
  photoSave(2);
  photoSave(3);
  photoSave(4);
}

if (form) {
  init();
}
