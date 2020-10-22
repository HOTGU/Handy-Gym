import express from "express";
import routes from "../routes";
import {
  users,
  userDetail,
  changePassword,
  getUserEditProfile,
  postUserEditProfile,
} from "../controllers/userController";
import { userMutlerImage, resizeImage, onlyUser } from "../middleware";

const userRouter = express.Router();

userRouter.get(routes.home, users);

userRouter.get(routes.userEditProfile, onlyUser, getUserEditProfile);
userRouter.post(routes.userEditProfile, userMutlerImage, resizeImage, postUserEditProfile);

userRouter.get(routes.userDetail(), userDetail);

userRouter.get(routes.changePassword, changePassword);

export default userRouter;
