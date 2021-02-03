import express from "express";
import routes from "../routes";
import {
  getTrainers,
  postTrainers,
  getTrainerPhoto,
  postTrainerPhoto,
  getTrainerWrite,
  postTrainerWrite,
  trainerDetail,
  trainerEditProfile,
  postTrainerJoin,
  getTrainerJoin,
  getTrainerInfo,
  postTrainerInfo,
  trainerPhoneVerify,
} from "../controllers/trainerController";
import {
  inspectTrainer,
  multiResizeImage,
  trainerMulterImage,
  onlyTrainerEdit,
  onlyUser,
  onlyLogin,
  confirmTrainer,
  onlyEmailVerify,
} from "../middleware";

const trainerRouter = express.Router();

trainerRouter.get(routes.home, onlyLogin, getTrainers);
trainerRouter.post(routes.home, postTrainers);

trainerRouter.get(routes.trainerJoin(), onlyLogin, onlyEmailVerify, getTrainerJoin);
trainerRouter.post(routes.trainerJoin(), inspectTrainer, postTrainerJoin);

trainerRouter.get(routes.trainerPhoto(), onlyLogin, onlyEmailVerify, onlyTrainerEdit, getTrainerPhoto);
trainerRouter.post(routes.trainerPhoto(), postTrainerPhoto);

trainerRouter.get(routes.trainerWrite(), onlyLogin, onlyEmailVerify, onlyTrainerEdit, getTrainerWrite);
trainerRouter.post(routes.trainerWrite(), postTrainerWrite);

trainerRouter.get(routes.trainerInfo(), onlyLogin, onlyEmailVerify, onlyTrainerEdit, getTrainerInfo);
trainerRouter.post(routes.trainerInfo(), postTrainerInfo);

trainerRouter.get(routes.trainerDetail(), onlyLogin, onlyEmailVerify, trainerDetail);

// trainerRouter.get(routes.editProfile, trainerEditProfile);

export default trainerRouter;
