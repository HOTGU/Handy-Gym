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
} from "../controllers/trainerController";
import { inspectTrainer, multiResizeImage, trainerMulterImage, onlyTrainerEdit, onlyUser } from "../middleware";

const trainerRouter = express.Router();

trainerRouter.get(routes.home, onlyUser, getTrainers);
trainerRouter.post(routes.home, postTrainers);

trainerRouter.get(routes.trainerJoin(), onlyUser, getTrainerJoin);
trainerRouter.post(routes.trainerJoin(), inspectTrainer, postTrainerJoin);

trainerRouter.get(routes.trainerPhoto(), onlyTrainerEdit, getTrainerPhoto);
trainerRouter.post(routes.trainerPhoto(), trainerMulterImage, multiResizeImage, postTrainerPhoto);

trainerRouter.get(routes.trainerWrite(), onlyTrainerEdit, getTrainerWrite);
trainerRouter.post(routes.trainerWrite(), postTrainerWrite);

trainerRouter.get(routes.trainerInfo(), onlyTrainerEdit, getTrainerInfo);
trainerRouter.post(routes.trainerInfo(), postTrainerInfo);

trainerRouter.get(routes.trainerDetail(), trainerDetail);

trainerRouter.get(routes.editProfile, trainerEditProfile);

export default trainerRouter;
