import express from "express"
import passport from "passport";
import { getJoin,postJoin, logout, getlogin, postlogin, githubLogin, postGithubLogin, getMe, facebookLogin } from "../controllers/userController";
import { home, search } from "../controllers/videoController";
import {onlyPrivate, onlyPublic} from "../middlewares"
import routes from "../routes"

const globalRouter = express.Router();

globalRouter.get(routes.join, onlyPublic, getJoin)
globalRouter.post(routes.join,onlyPublic, postJoin, postlogin)

globalRouter.get(routes.login ,onlyPublic, getlogin)
globalRouter.post(routes.login ,onlyPublic, postlogin)

globalRouter.get(routes.gitHub, githubLogin)
globalRouter.get(routes.githubCallback, passport.authenticate('github',{failureRedirect:routes.login}),
    postGithubLogin
)
globalRouter.get(routes.facebook, facebookLogin)
globalRouter.get(routes.facebookCallback, passport.authenticate('facebook',{failureRedirect:routes.login}),
    postGithubLogin
)

globalRouter.get(routes.home,home)
globalRouter.get(routes.logout,onlyPrivate,logout)
globalRouter.get(routes.search,search)

globalRouter.get(routes.me, getMe)

export default globalRouter;