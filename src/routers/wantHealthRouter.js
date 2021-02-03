import express from "express";
import routes from "../routes";
import {
  wantHealth,
  wantHealthDetail,
  getWantHealthUpload,
  postWantHealthUpload,
  getWantHealthUpdate,
  postWantHealthUpdate,
  postWantHealthDelete,
} from "../controllers/wantHealthController";
import { onlyEmailVerify, onlyLogin, onlyUser } from "../middleware";

const wantHealthRouter = express.Router();

wantHealthRouter.get(routes.home, onlyLogin, onlyEmailVerify, wantHealth);

wantHealthRouter.get(routes.wantHealthUpload, onlyLogin, onlyEmailVerify, onlyUser, getWantHealthUpload);
wantHealthRouter.post(routes.wantHealthUpload, postWantHealthUpload);

wantHealthRouter.get(routes.healthDetail(), onlyLogin, onlyEmailVerify, wantHealthDetail);

wantHealthRouter.get(routes.wantHealthUpdate(), getWantHealthUpdate);
wantHealthRouter.post(routes.wantHealthUpdate(), postWantHealthUpdate);
wantHealthRouter.post(routes.wantHealthDelete(), postWantHealthDelete);

export default wantHealthRouter;
