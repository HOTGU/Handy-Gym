import axios from "axios";

const socket = io();

const a = document.querySelectorAll(".message_room_link");
const messageRoomBlock = document.querySelector(".message-room-block__wrapper");

const init = () => {
  var perfEntries = performance.getEntriesByType("navigation");
  if (perfEntries[0].type === "back_forward") {
    window.location.reload();
  }
  socket.on("print_read_check", (data) => {
    for (let i = 0; i < a.length; i++) {
      const roomId = a[i].href.split("/")[5];
      if (roomId === data.roomId) {
        const divNum = a[i].querySelector(".message_unread_num");
        if (data.otherUnReadNum !== 0) {
          if (divNum.classList === "unread_num_container") {
            divNum.textContent = data.otherUnReadNum;
          } else {
            divNum.textContent = data.otherUnReadNum;
            divNum.classList.add("unread_num_container");
          }
        } else {
          divNum.classList.remove("unread_num_container");
          divNum.textContent = data.otherUnReadNum;
        }
      } else {
      }
    }
  });
};

if (messageRoomBlock) {
  init();
}
