import express from "express";
import { messages, messageRoom, messageSend } from "../controllers/messageController";
import { onlyEmailVerify, onlyLogin, onlyTrainer, onlyUser } from "../middleware";
import routes from "../routes";

const messageRouter = express.Router();

messageRouter.get(routes.home, messages);

messageRouter.post(routes.messageSendInUpload(), onlyLogin, onlyEmailVerify, onlyTrainer, messageSend);

messageRouter.get(routes.messageRoom(), onlyLogin, onlyEmailVerify, messageRoom);

export default messageRouter;
