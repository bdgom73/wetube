import { comment } from "postcss";

// Global
const HOME = "/";
const JOIN = "/join";
const LOGIN = "/login";
const LOGOUT = "/logout";
const SEARCH = "/search";
const BASICIMG = "https://wetuebe.s3.ap-northeast-2.amazonaws.com/avatar/basicuser.png";

// Users
const USERS = "/users";
const USER_DETAIL = "/:id";
const EDIT_PROFILE = "/edit-profile";
const CHANGE_PASSWORD = "/change-password";
const ME ="/me";
const RESETAVATAR = "/basicUserAvatar"

// Videos
const VIDEOS = "/videos";
const UPLOAD = "/upload";
const VIDEO_DETAIL = "/:id";
const EDIT_VIDEO = "/:id/edit";
const DELETE_VIDEO = "/:id/delete";
const COMMENTS = "/:id/comments";
const COMMENTS_DELETE = "/:video_id/comments/:id/delete";

// GITHUB
const GITHUB = "/auth/github";
const GITHUB_CB = "/auth/github/callback";

// FACEBOOK
const FACEBOOK = "/auth/facebook";
const FACEBOOK_CB = "/auth/facebook/callback";


// API
const API = "/api";
const REGISTER_VIEW = "/:id/view";
const ADD_COMMENT = "/:id/comment";

const routes = {
    home : HOME,
    join : JOIN,
    login : LOGIN,
    logout : LOGOUT,
    search : SEARCH,
    users : USERS,
    userDetail: (id)=>{
        if(id){
            return `/users/${id}`
        }else{
            return USER_DETAIL
        }
    },
    editProfile : EDIT_PROFILE,
    changePassword : CHANGE_PASSWORD,
    videos : VIDEOS,
    upload : UPLOAD,
    videoDetail : (id)=>{
        if(id){
            return `/videos/${id}`
        }else{
            return VIDEO_DETAIL
        }
    },
    editVideo : (id)=>{
        if(id){
            return `/videos/${id}/edit`
        }else{
            return EDIT_VIDEO
        }
    },
    deleteVideo : (id)=>{
        if(id){
            return `/videos/${id}/delete`
        }else{
            return DELETE_VIDEO
        }
    },
    me:ME,
    gitHub:GITHUB,
    githubCallback:GITHUB_CB,
    facebook:FACEBOOK,
    facebookCallback:FACEBOOK_CB,
    resetavatar:RESETAVATAR,
    basicimg:BASICIMG,
    videoComment : (id)=>{
        if(id){
            return `/videos/${id}/comments`
        }else{
            return COMMENTS
        }
    },
    videoCommentDelete : (id,video_id)=>{
        if(id && video_id){
            return `/videos/${video_id}/comments/${id}/delete`
        }else{
            return COMMENTS_DELETE
        }
    },
    api: API,
    registerView:REGISTER_VIEW,
    addComment:ADD_COMMENT,
};

export default routes;