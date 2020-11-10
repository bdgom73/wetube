import routes from "./routes";
import multer from "multer";
import { basicUserAvatar } from "./controllers/userController";
const multerVideo = multer({dest:"uploads/videos/"});
const multerAvatar = multer({dest:"uploads/avatars/"})

export const localsMiddleware = (req,res,next)=>{
    res.locals.siteTitle = "WeTube";
    res.locals.routes = routes;
    res.locals.loggedUser = req.user ;
    res.locals.resetAvatar = basicUserAvatar;
    next();
}

export const setHeaderPolicy = (req,res,next) =>{
    res.setHeader("Content-Security-Policy", "script-src 'self' https://archive.org");
    next();
}

export const onlyPublic = (req,res,next)=>{
    if(req.user){
        res.redirect(routes.home);
    }else{
        next();
    }
}

export const onlyPrivate = (req,res,next)=>{
    if(req.user){
        next();
    }else{
        res.redirect(routes.home)
    }
}
export const uploadVideo = multerVideo.single('videoFile')
export const uploadAvatar = multerVideo.single('avatar')