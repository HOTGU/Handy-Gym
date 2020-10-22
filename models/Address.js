import mongoose from "mongoose";

const AddressSchema = new mongoose.Schema({
  add1: {
    type: String,
  },
  add2: {
    type: String,
  },
  add3: {
    type: String,
  },
  fullAdd: {
    type: String,
  },
});

const model = mongoose.model("Address", AddressSchema, "address");

export default model;
