import "@babel/polyfill";

import "./db";
import app from "./app";
import dotenv from "dotenv";
import socketIo from "socket.io";
dotenv.config();

import "./models/Address";
import "./models/Health";
import "./models/MessageRoom";
import "./models/Messages";
import "./models/Trainer";
import "./models/User";
import socketController from "./controllers/socketController";

const PORT = process.env.PORT;

const handleListening = () => {
  console.log(`✅Listening on: http://localhost:${PORT}`);
};

const server = app.listen(PORT || 4000, handleListening);

const io = socketIo(server);

app.set("io", io);

io.on("connection", (socket, io) => socketController(socket, io));
