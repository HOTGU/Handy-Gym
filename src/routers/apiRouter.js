import express from "express";
import routes from "../routes";
import {
  api,
  apiAddressSearch,
  apiAwsAvatarUpload,
  apiAwsPhotoUpload,
  apiMessageRead,
  apiMessageSend,
  apiTrainerAvatar,
  apiTrainerInfo,
  apiTrainerPhoto,
  apiTrainerWrite,
  resendEmail,
} from "../controllers/apiContoller";
import { awsApiDeletePhoto, trainerMulterAvatar, trainerMulterImage } from "../middleware";

const apiRouter = express.Router();

apiRouter.get(routes.home, api);

apiRouter.post(routes.apiAddressSearch, apiAddressSearch);

apiRouter.post(routes.apiResendEmail, resendEmail);

apiRouter.post(routes.apiMessageRead(), apiMessageRead);

apiRouter.post(routes.apiMessageSend(), apiMessageSend);

apiRouter.post(routes.apiRemovePhoto, awsApiDeletePhoto);

apiRouter.post(routes.apiTrainerAvatarSave(), trainerMulterAvatar, apiTrainerAvatar);

apiRouter.post(routes.apiTrainerPhotoSave(), apiTrainerPhoto);

apiRouter.post(routes.apiTrainerWriteSave(), apiTrainerWrite);

apiRouter.post(routes.apiTrainerInfoSave(), apiTrainerInfo);

apiRouter.post(routes.awsAvatarUpload, trainerMulterAvatar, apiAwsAvatarUpload);
apiRouter.post(routes.awsPhotoUpload, trainerMulterImage, apiAwsPhotoUpload);

export default apiRouter;
