import Axios from "axios";
import axios from "axios";

const socket = io();

const submitBtn = document.getElementById("jsMsgSubmit");
const messageInput = document.getElementById("jsMsg");
const messageRoom = document.querySelector(".message-room");
const roomId = window.location.href.split("/")[5];

const modalBtn = document.getElementById("jsModalCreateBtn");
const modalCloseBtn = document.getElementById("jsModalCloseBtn");
const modalForm = document.getElementById("jsMsgSendForm");

const scrollToBottom = () => {
  document.body.scrollTop = document.body.scrollHeight;
};

const handleModal = (height, margin) => {
  modalForm.style.height = height;
  messageRoom.style.marginBottom = margin;
  scrollToBottom();
};

const appendMsg = (messageClass, createAt, description, avatarImg, nickname, gender) => {
  const messageWrapper = document.createElement("div");
  messageWrapper.classList.add("message__wrapper", messageClass);
  messageRoom.appendChild(messageWrapper);
  const messageCreateAt = document.createElement("div");
  messageCreateAt.classList.add("message__create-day");
  messageCreateAt.innerText = createAt;
  messageWrapper.appendChild(messageCreateAt);
  const messageContent = document.createElement("div");
  messageContent.classList.add("message__content");
  messageWrapper.appendChild(messageContent);
  const author = document.createElement("div");
  author.classList.add("author");
  messageContent.appendChild(author);
  const authorAvatar = document.createElement("div");
  authorAvatar.classList.add("author__image");
  author.appendChild(authorAvatar);
  const avatar = document.createElement("img");
  if (avatarImg) {
    avatar.src = avatarImg;
    authorAvatar.appendChild(avatar);
  }
  if (!avatarImg && gender === "남자") {
    avatar.src = `../../static/images/male_avatar.png`;
    authorAvatar.appendChild(avatar);
  }
  if (!avatarImg && gender === "여자") {
    avatar.src = `../../static/images/female_avatar.png`;
    authorAvatar.appendChild(avatar);
  }
  const authorNickname = document.createElement("div");
  authorNickname.classList.add("author__nickname");
  authorNickname.innerText = nickname;
  author.appendChild(authorNickname);
  const messageDesription = document.createElement("div");
  messageDesription.classList.add("message__description");
  messageDesription.innerText = description;
  messageContent.appendChild(messageDesription);
  messageInput.value = "";
};

export const messageRead = async () => {
  await axios({
    url: `/api/${roomId}/message-read`,
    method: "POST",
  }).then(async (res) => {
    socket.emit("read_check", {
      roomId: res.data.roomId,
      otherUnReadNum: res.data.other_un_read_num,
    });
  });
};

const messageSave = async (message) => {
  await axios({
    url: `/api/${roomId}/message`,
    method: "POST",
    data: { message },
  }).then(async (res) => {
    const description = res.data.messageObj.description;
    const createAt = res.data.messageObj.createAt;
    const nickname = res.data.messageObj.author_nickname;
    const avatar = res.data.messageObj.author_avatar;
    const gender = res.data.messageObj.author_gender;
    const room = res.data.messageObj.room_id;
    if (res.status === 200) {
      appendMsg("myMessage", createAt, description, avatar, nickname, gender);
      scrollToBottom();
      messageRead();
      socket.emit("sendMessage", {
        description,
        createAt,
        room,
        nickname,
        avatar,
        gender,
      });
    }
  });
};

const handleSubmit = (e) => {
  e.preventDefault();
  const messageValue = messageInput.value;
  messageSave(messageValue);
  handleModal("0", "0");
};

const handleLoad = () => {
  scrollToBottom();
  messageRead();
};

const init = () => {
  window.addEventListener("load", handleLoad);

  submitBtn.addEventListener("click", handleSubmit);

  modalBtn.addEventListener("click", () => {
    handleModal("250px", "130px");
  });

  modalCloseBtn.addEventListener("click", () => {
    handleModal("0", "0");
  });

  socket.emit("joinRoom", { room: roomId });

  socket.on("receiveMessage", async (data) => {
    appendMsg("youMessage", data.createAt, data.description, data.avatar, data.nickname, data.gender);
    messageRead();
    scrollToBottom();
  });
};

if (submitBtn) {
  init();
}
