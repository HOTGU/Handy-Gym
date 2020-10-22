import mongoose from "mongoose";

const HealthSchema = new mongoose.Schema({
  wantAddress: { type: Array, required: "주소는 필수입니다." },
  wantCategory: {
    type: Array,
    required: "카테고리선택은 필수입니다.",
  },
  wantProgram: {
    type: String,
    required: "프로그램내용은 필수입니다.",
  },
  createAt: {
    type: String,
    default: Date.now,
  },
  creator: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

const model = mongoose.model("Health", HealthSchema);

export default model;
