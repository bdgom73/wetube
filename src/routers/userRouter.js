import express from "express"
import { editProfile,changePassword, userDetail, me, getEditProfile, postEditProfile, getChangePassword, postChangePassword, basicUserAvatar } from "../controllers/userController";
import routes from "../routes"
import {onlyPrivate, uploadAvatar} from "../middlewares"
const userRouter = express.Router();

userRouter.get(routes.editProfile, onlyPrivate, getEditProfile)
userRouter.post(routes.editProfile, onlyPrivate, uploadAvatar, postEditProfile)

userRouter.get(routes.changePassword,onlyPrivate,getChangePassword)
userRouter.post(routes.changePassword,onlyPrivate,postChangePassword)

userRouter.get(routes.userDetail(), userDetail);

userRouter.post(routes.resetavatar, basicUserAvatar);

export default userRouter;



