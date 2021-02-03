import mongoose from "mongoose";

const HealthSchema = new mongoose.Schema({
  wantAddress: { type: String, required: "동네를 설정해주세요." },
  wantCategory: {
    type: Array,
    required: "카테고리선택은 필수입니다.",
  },
  wantProgram: {
    type: String,
    required: "프로그램내용을 적어주세요.",
  },
  createAt: {
    type: String,
    default: Date.now,
  },
  creator: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  message_send_users: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
});

const model = mongoose.model("Health", HealthSchema);

export default model;
