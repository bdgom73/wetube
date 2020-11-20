import routes from "./routes";
import multer from "multer";
import multerS3 from "multer-s3";
import aws from "aws-sdk";

const s3 = new aws.S3({
    secretAccessKey:process.env.AWS_SECRET,
    accessKeyId:process.env.AWS_KEY,
    region:"ap-northeast-2"
})

const multerVideo = multer({
    storage: multerS3({
        s3,
        acl:'public-read',
        bucket:"wetuebe/video"
    })
})
const multerAvatar = multer({
    storage: multerS3({
        s3,
        acl:'public-read',
        bucket:"wetuebe/avatar"
    })
})

export const localsMiddleware = (req,res,next)=>{
    res.locals.siteTitle = "WeTube";
    res.locals.routes = routes;
    res.locals.loggedUser = req.user || "";
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
export const uploadAvatar = multerAvatar.single('avatar')