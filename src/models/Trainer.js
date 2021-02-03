import mongoose from "mongoose";
import passportLocalMongoose from "passport-local-mongoose";

const TrainerSchema = new mongoose.Schema({
  avatarUrl: {
    type: String,
  },
  phone_number: {
    type: String,
  },
  photo_1: {
    type: String,
  },
  photo_2: {
    type: String,
  },
  photo_3: {
    type: String,
  },
  photo_4: {
    type: String,
  },
  program: {
    type: String,
  },
  myself: {
    type: String,
  },
  career: {
    type: String,
  },
  career_year: {
    type: String,
  },
  supplies: {
    type: String,
  },
  supplies_list: {
    type: String,
    default: "",
  },
  place: {
    type: String,
  },
  program_place: {
    type: String,
  },
  free_class: {
    type: String,
  },
  running_hour: {
    type: String,
  },
  running_min: {
    type: String,
  },
  program_price: {
    type: String,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

const model = mongoose.model("Trainer", TrainerSchema);

export default model;
