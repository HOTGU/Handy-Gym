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
  confirmEmail,
  resendEmail,
} from "../controllers/globalController";
import { onlyLogin, onlyPublic, onlyTrainer, onlyUser, onlyEmailVerify } from "../middleware";

const globalRouter = express.Router();

globalRouter.get(routes.home, home);
globalRouter.get(routes.join, onlyPublic, getJoin);
globalRouter.post(routes.join, postJoin);
globalRouter.get(routes.login, onlyPublic, getLogin);
globalRouter.post(routes.login, postLogin);
globalRouter.get(routes.logout, onlyLogin, logout);
globalRouter.get(routes.search, onlyLogin, onlyTrainer, search);
globalRouter.get(routes.me, onlyLogin, onlyEmailVerify, onlyUser, getMe);
globalRouter.get(routes.trainerMe, onlyLogin, onlyEmailVerify, onlyTrainer, getTrainerMe);
globalRouter.get(routes.confirmEmail, confirmEmail);
globalRouter.get(routes.resendEmail, resendEmail);

export default globalRouter;
