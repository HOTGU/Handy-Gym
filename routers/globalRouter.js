import express from "express";
import routes from "../routes";
import {
  home,
  getJoin,
  postJoin,
  getLogin,
  postLogin,
  logout,
  search,
  getMe,
  getTrainerMe,
} from "../controllers/globalController";
import { onlyPublic, onlyTrainer, onlyUser } from "../middleware";

const globalRouter = express.Router();

globalRouter.get(routes.home, home);
globalRouter.get(routes.join, onlyPublic, getJoin);
globalRouter.post(routes.join, postJoin);
globalRouter.get(routes.login, onlyPublic, getLogin);
globalRouter.post(routes.login, postLogin);
globalRouter.get(routes.logout, onlyUser, logout);
globalRouter.get(routes.search, search);
globalRouter.get(routes.me, onlyUser, getMe);
globalRouter.get(routes.trainerMe, onlyTrainer, getTrainerMe);

export default globalRouter;
