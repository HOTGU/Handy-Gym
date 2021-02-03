import mongoose from "mongoose";
import moment from "moment";
require("moment-timezone");
moment.tz.setDefault("Asia/Seoul");

const MessageSchema = new mongoose.Schema({
  description: {
    type: String,
    required: "내용이 있어야 합니다.",
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  readNum: {
    type: Number,
  },
  createAt: { type: String, default: moment().format("YYYY년 MM월 DD일 h:mm a") },
});

const model = mongoose.model("Message", MessageSchema);

export default model;
