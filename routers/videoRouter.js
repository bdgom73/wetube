import express from "express"
import { editVideo, getUpload, postUpload, upload, videoDetail } from "../controllers/videoController";
import { uploadVideo } from "../middlewares";
import routes from "../routes"
const videoRouter = express.Router();

videoRouter.get("/",(req,res)=>{ res.send("videos") })
videoRouter.get(routes.upload, getUpload);
videoRouter.post(routes.upload, uploadVideo,postUpload);
videoRouter.get(routes.videoDetail(),videoDetail)
videoRouter.get(routes.editVideo,editVideo)
videoRouter.get(routes.deleteVideo,(req,res)=>{ res.send("seadeleteVideorch") })

export default videoRouter;