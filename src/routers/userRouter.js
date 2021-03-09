import express from "express";
import routes from "../routes";
import {
  users,
  userDetail,
  changePassword,
  getUserEditProfile,
  postUserEditProfile,
} from "../controllers/userController";
import { userMutlerAvatar, resizeImage, onlyUser, onlyLogin, onlyEmailVerify, awsAvatarDelete } from "../middleware";

const userRouter = express.Router();

userRouter.get(routes.home, users);

userRouter.get(routes.userEditProfile, onlyLogin, onlyEmailVerify, getUserEditProfile);
userRouter.post(routes.userEditProfile, userMutlerAvatar, postUserEditProfile);

userRouter.get(routes.userDetail(), onlyLogin, onlyEmailVerify, userDetail);

userRouter.get(routes.changePassword, changePassword);

export default userRouter;
