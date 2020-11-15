import routes from "../routes";
import Video from "../models/Video"
import User from "../models/User"
import Comment from "../models/Comment"
export const home = async (req,res)=>{
    try{
        const videos = await Video.find()
        res.render("home", {pageTitle :"HOME",videos});
    }catch(error){
        console.log(error);
        res.render("home", {pageTitle :"HOME",videos:[]});
    }
    
   
} 

export const search = async (req,res)=>{
    const {query:{
        term : searchingBy,
        searchid
    }} = req;
    let videos = []
    try{
        if(searchid === "user"){
            videos = await User.find({name: {$regex:searchingBy, $options :"i"}})  
        }else{
            videos = await Video.find({title: {$regex:searchingBy, $options :"i"}})  
        }
        
    }catch(error){
        console.log(error)
    }
    res.render("Search",{pageTitle : "Search", searchingBy,searchid,videos});
} 

export const getUpload = (req,res)=>{ 
    res.render("upload",{pageTitle : "upload"});
}

export const postUpload = async (req,res)=>{ 
    const {
        body:{title,description},
        file : {path}
    } = req;
    const newVideo = await Video.create({
        fileUrl : path,
        title,
        description,
        creator:req.user.id
    })
    req.user.videos.push(newVideo.id);
    req.user.save();
    res.redirect(routes.videoDetail(newVideo.id))
}
export const videoDetail = async (req,res)=> {
    const {
        params : {id}
    } = req;
    try{   
        const video = await Video.findById(id).populate('creator').populate({
            path:'comments',
            model:'Comment',
            populate:{
                path:'creator',
                model:'User'
            }
        })
        const rep = new RegExp("http(s)?:\/\/");
        if(rep.test(video.creator.avatarUrl)){
            video.creator.avatarUrl = `${video.creator.avatarUrl}`
        }else{
            video.creator.avatarUrl = `/${video.creator.avatarUrl}`
        }
        video.views+=1;
        video.save();
        res.render("videoDetail",{pageTitle : video.title ,video}); 
    }catch(error){
        console.log(error)
        res.redirect(routes.home);
    }
}
export const videoComments = async (req,res)=>{
    const {
        params: {id},
        body:{comment},
    } = req;
    try{
        const newComment = await Comment.create({
            text:comment,
            creator:req.user.id
        })
        const videoComment = await Video.findById(id);
        req.user.comments.push(newComment.id);
        req.user.save();
        videoComment.comments.push(newComment.id);
        videoComment.save();
        res.redirect(routes.videoDetail(id))
    }catch(error){
        console.log(error);
        res.redirect(routes.videoDetail(id));
    }
}

export const getEditVideo = async (req,res)=>{
    const {
        params : {id}
    }=req;
    try{
        const video = await Video.findById(id);
        if(`${video.creator}` !== `${req.user.id}`){
            throw Error();
        }else{
            res.render("editVideo",{pageTitle:`Edit ${video.title}`, video})
        }
    }catch(error){
        res.redirect(routes.home)
    }
}
export const postEditVideo = async (req,res)=>{
    const {
        params : {id},
        body : { title,description }
    }=req;
    try{
        await Video.findOneAndUpdate({_id:id},{title,description})
        res.redirect(routes.videoDetail(id))
    }catch(error){
        res.redirect(routes.home)
    }
   
}

export const deleteVideo = async (req,res)=>{ 
    const {
        params : {id}
    } = req;
    try{
        const video = await Video.findById(id);
        if(`${video.creator}` !== `${req.user.id}`){
            throw Error();
        }else{
            await Video.findOneAndRemove({_id:id});
        }   
        }
    catch(error){} 
    res.redirect(routes.home)
}
export const deleteComment = async (req,res)=>{ 
    const {
        params : {id,video_id}
    } = req;
    try{
        const comment = await Comment.findById(id);
        if(`${comment.creator._id}` !== `${req.user.id}`){
            throw Error();
        }else{
            await Comment.findOneAndRemove({_id:id});
        }   
    }
    catch(error){
        console.log(error)
    } 
    res.redirect(routes.videoDetail(video_id));
}