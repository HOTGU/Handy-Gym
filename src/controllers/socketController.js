import MessageRoom from "../models/MessageRoom";

const socketController = (socket, io) => {
  const req = socket.request;
  const {
    headers: { referer },
  } = req;

  socket.on("joinRoom", async ({ room }) => {
    socket.join(room);
    console.log("채팅방에 들어왔습니다. 채팅방 이름 : " + room);
  });

  socket.on("read_check", async (data) => {
    socket.broadcast.emit("print_read_check", data);
    // io.emit("print_read_check", data);
  });

  socket.on("sendMessage", async (data) => {
    socket.to(data.room).emit("receiveMessage", data);
  });
};

export default socketController;
