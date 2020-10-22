import mongoose from "mongoose";
import passportLocalMongoose from "passport-local-mongoose";

const UserSchema = new mongoose.Schema(
  {
    avatarUrl: {
      type: String,
    },
    gender: {
      type: String,
      required: "성별을 선택하세요.",
    },
    age: {
      type: String,
      required: "나이를 선택하세요.",
    },
    nickname: {
      type: String,
      required: "닉네임을 적으세요.",
    },
    name: {
      type: String,
      required: "이름을 적으세요.",
    },
    email: {
      type: String,
      required: "이메일을 적으세요.",
    },
    isTrainer: {
      type: Boolean,
      default: false,
    },
    trainer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Trainer",
    },
    uploads: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Health",
      },
    ],
  },
  { usePushEach: true }
);

UserSchema.plugin(passportLocalMongoose, { usernameField: "email" });

const model = mongoose.model("User", UserSchema);

export default model;
