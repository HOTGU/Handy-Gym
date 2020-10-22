import express from "express";
import routes from "../routes";
import {
  wanthHealth,
  wanthHealthDetail,
  getWanthHealthUpload,
  postWanthHealthUpload,
} from "../controllers/wantHealthController";
import { onlyUser } from "../middleware";

const wanthHealthRouter = express.Router();

wanthHealthRouter.get(routes.home, wanthHealth);
wanthHealthRouter.get(routes.wantHealthUpload, onlyUser, getWanthHealthUpload);
wanthHealthRouter.post(routes.wantHealthUpload, postWanthHealthUpload);
wanthHealthRouter.get(routes.healthDetail(), wanthHealthDetail);

export default wanthHealthRouter;
