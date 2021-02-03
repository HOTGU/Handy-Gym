import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
  useCreateIndex: true,
});

const db = mongoose.connection;

const handleOpen = () => {
  console.log("✅ Connected to DB");
};

const handleError = (err) => {
  console.log(`❌ Error on DB Connection: ${err}`);
};

db.error("error", handleError);
db.once("open", handleOpen);
