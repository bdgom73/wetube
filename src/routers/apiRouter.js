import express from "express"
import { root } from "postcss";
import { postAddComment, postRegisterView } from "../controllers/videoController";
import routes from "../routes"
const apiRouter = express.Router();

apiRouter.post(routes.registerView,postRegisterView);
apiRouter.post(routes.addComment, postAddComment);

export default apiRouter;



