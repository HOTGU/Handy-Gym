import axios from "axios";

const trainerAvatar = document.querySelector("input[name=trainerAvatar]");
const userAvatar = document.querySelector("input[name=userAvatar]");

let reader = new FileReader();

const photoRemove = async (imgSrc) => {
  const response = await axios({
    url: `/api/remove-photo`,
    method: "POST",
    headers: {
      enctype: "multipart/form-data",
    },
    data: { imgSrc },
  });
};

const saveAvatar = async (file) => {
  let formData = new FormData();
  formData.append("trainerAvatar", file);
  const trainerId = window.location.href.split("/")[4];
  const response = await axios({
    // url: `/trainers/${trainerId}/photo`,
    url: `/api/${trainerId}/trainer-avatar-save`,
    method: "POST",
    headers: {
      enctype: "multipart/form-data",
    },
    data: formData,
  });
  if (response.status === 200) {
    window.location.reload();
  }
};

const previewImg = (e, imgFile) => {
  const avatarImg = e.target.parentNode.querySelector("img");
  reader.readAsDataURL(imgFile);
  reader.onload = (e) => {
    avatarImg.src = e.target.result;
  };
};

const handleUserInput = (e) => {
  let imgFile = e.target.files[0];
  previewImg(e, imgFile);
};

const handleTrainerAvatar = (e) => {
  const currentImgSrc = e.target.parentNode.querySelector("img").src;
  let imgFile = e.target.files[0];
  let c = confirm("이 사진으로 하시겠습니까??");
  if (c === true) {
    photoRemove(currentImgSrc);
    saveAvatar(imgFile);
    previewImg(e, imgFile);
  } else {
    return;
  }
};

if (trainerAvatar) {
  trainerAvatar.addEventListener("change", handleTrainerAvatar);
}
if (userAvatar) {
  userAvatar.addEventListener("change", handleUserInput);
}
