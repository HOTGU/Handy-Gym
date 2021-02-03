import axios from "axios";
import crypto from "crypto";

const emailConfirmForm = document.getElementById("jsEmailConfirm");

const alertComment = () => {
  alert("🔒 이메일로 전송된 인증링크를 확인해주세요.");
  const comment = document.getElementById("jsComment");
  comment.classList.remove("hidden");
};

const sendConfirmEmail = async (email, new_key) => {
  const response = await axios({
    url: "/api/resend-email",
    method: "POST",
    data: {
      email,
      new_key,
    },
  });
  alertComment();
};

const handleSubmit = (event) => {
  event.preventDefault();
  const emailInput = emailConfirmForm.querySelector("input");
  const email = emailInput.value;
  var key_one = crypto.randomBytes(256).toString("hex").substr(100, 5);
  var key_two = crypto.randomBytes(256).toString("hex").substr(50, 5);
  var new_key = key_one + key_two;
  sendConfirmEmail(email, new_key);
};

function init() {
  emailConfirmForm.addEventListener("submit", handleSubmit);
}

if (emailConfirmForm) {
  init();
}
