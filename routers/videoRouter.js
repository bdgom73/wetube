import express from "express"
import { getEditVideo, getUpload, postUpload, upload, videoDetail,postEditVideo, deleteVideo, videoComments, deleteComment } from "../controllers/videoController";
import { onlyPrivate, uploadVideo } from "../middlewares";
import routes from "../routes"
const videoRouter = express.Router();

videoRouter.get(routes.upload,onlyPrivate, getUpload);
videoRouter.post(routes.upload, onlyPrivate,uploadVideo,postUpload);

videoRouter.get(routes.videoDetail(),videoDetail)

videoRouter.get(routes.editVideo(),onlyPrivate, getEditVideo)
videoRouter.post(routes.editVideo(),onlyPrivate, postEditVideo)

// videoRouter.post(routes.videoComment(),videoComments)

videoRouter.get(routes.deleteVideo(),onlyPrivate,deleteVideo)
videoRouter.get(routes.videoCommentDelete(), onlyPrivate, deleteComment)

export default videoRouter;