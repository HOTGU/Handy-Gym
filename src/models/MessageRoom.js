import mongoose from "mongoose";
import moment from "moment";
require("moment-timezone");
moment.tz.setDefault("Asia/Seoul");

const getCurrentDate = () => {
  var date = new Date();
  var year = date.getFullYear();
  var month = date.getMonth();
  var today = date.getDate();
  var hours = date.getHours();
  var minutes = date.getMinutes();
  var seconds = date.getSeconds();
  var milliseconds = date.getMilliseconds();
  return new Date(Date.UTC(year, month, today, hours, minutes, seconds, milliseconds));
};

const MessageRoomSchema = new mongoose.Schema({
  messages: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Message",
    },
  ],
  join_users: [{ type: String }],
  other_user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  read_check: [
    {
      userId: String,
      readnum: Number,
    },
  ],
  unread_number: { type: Number },
  createAt: {
    type: Date,
    default: getCurrentDate(),
  },
});

const model = mongoose.model("MessageRoom", MessageRoomSchema);

export default model;
