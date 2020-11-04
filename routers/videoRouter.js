import express from "express"
import { getEditVideo, getUpload, postUpload, upload, videoDetail,postEditVideo, deleteVideo } from "../controllers/videoController";
import { uploadVideo } from "../middlewares";
import routes from "../routes"
const videoRouter = express.Router();

videoRouter.get("/",(req,res)=>{ res.send("videos") })

videoRouter.get(routes.upload, getUpload);
videoRouter.post(routes.upload, uploadVideo,postUpload);

videoRouter.get(routes.videoDetail(),videoDetail)

videoRouter.get(routes.editVideo(), getEditVideo)
videoRouter.post(routes.editVideo(), postEditVideo)

videoRouter.get(routes.deleteVideo(),deleteVideo)

export default videoRouter;