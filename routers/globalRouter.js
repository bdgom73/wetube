import express from "express"
import { getJoin,postJoin, login, logout, getlogin, postlogin } from "../controllers/userController";
import { home, search } from "../controllers/videoController";
import routes from "../routes"
const globalRouter = express.Router();

globalRouter.get(routes.join, getJoin)
globalRouter.post(routes.join, postJoin)
globalRouter.get(routes.login ,getlogin)
globalRouter.post(routes.login ,postlogin)
globalRouter.get(routes.home,home)
globalRouter.get(routes.logout,logout)
globalRouter.get(routes.search,search)

export default globalRouter;