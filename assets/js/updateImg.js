const avatarInput = document.getElementById("jsAvatar");
const avatarImg = document.getElementById("jsAvatarImg");
const trainerPhoto = document.querySelector(".trainer__photo");

let reader = new FileReader();

const handleInputImg = (event) => {
  let imgFile = event.target.files[0];
  reader.readAsDataURL(imgFile);
  reader.onload = (e) => {
    avatarImg.src = e.target.result;
  };
};

const updatePhoto = async (num) => {
  const input = document.getElementById(`jsPhoto_${num}`);
  const img = document.getElementById(`jsImg_${num}`);
  input.addEventListener("change", function (e) {
    let imgFile = e.target.files[0];
    reader.readAsDataURL(imgFile);
    reader.onload = (e) => {
      img.src = e.target.result;
    };
  });
};

function init() {
  avatarInput.addEventListener("change", handleInputImg);
  if (trainerPhoto) {
    updatePhoto(1);
    updatePhoto(2);
    updatePhoto(3);
    updatePhoto(4);
  }
}

if (avatarInput) {
  init();
}
