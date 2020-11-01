import express from "express"
import { editProfile,changePassword, userDetail } from "../controllers/userController";
import routes from "../routes"
const userRouter = express.Router();

userRouter.get("/",(req,res)=>{ res.send("users") })
userRouter.get(routes.editProfile, editProfile)
userRouter.get(routes.changePassword,changePassword)
userRouter.get(routes.userDetail(),userDetail);

export default userRouter;



