import routes from "./routes";
import multer from "multer";

const multerVideo = multer({dest:"uploads/videos/"});

export const localsMiddleware = (req,res,next)=>{
    res.locals.siteTitle = "WeTube";
    res.locals.routes = routes;
    res.locals.user = {
        isAuthenticated : false,
        id:1
    };
    next();
}

export const setHeaderPolicy = (req,res,next) =>{
    res.setHeader("Content-Security-Policy", "script-src 'self' https://archive.org");
    next();
}
export const uploadVideo = multerVideo.single('videoFile')