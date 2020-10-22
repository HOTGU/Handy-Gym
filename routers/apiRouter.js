import express from "express";
import routes from "../routes";
import { api, apiAddressSearch } from "../controllers/apiContoller";

const apiRouter = express.Router();

apiRouter.get(routes.home, api);
apiRouter.post(routes.apiAddressSearch, apiAddressSearch);

export default apiRouter;
