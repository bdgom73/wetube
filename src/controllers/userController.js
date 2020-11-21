import passport from "passport";
import routes from "../routes";
import User from "../models/User";

export const getJoin = (req,res)=> {
    res.render("join",{pageTitle:"join"});
}
export const postJoin = async (req,res,next)=>{
    const {
        body : {name,email,password,password2}
    }= req;
    if(password !== password2){
        req.flash("error", "Password does not match.");
        res.status(400);
        res.render("join",{pageTitle:"join"});
    }else{
        try{
            const userChack = await User.find({email});
            if(userChack){
                throw error;
            }
            const user = await User({
                name, 
                email,
                avatarUrl:routes.basicimg
            })
            await User.register(user, password);
            next();
        }catch(error){
            req.flash("error","Email already exists or information is incorrect.")
            res.redirect(routes.home)
        }
    }
}

export const getlogin = (req,res)=> {
    res.render("login",{pageTitle:"Login"});
}

export const postlogin = passport.authenticate('local',{ 
    failureFlash: "Can't log in. Check email and/or password",
    failureRedirect:routes.login,
    successFlash:"Welcome!",
    successRedirect:routes.home, 
   
});

//github
export const githubLogin = passport.authenticate('github',{
    successFlash: "Welcome",
    failureFlash: "Can't log in at this time"
});
export const githubLoginCallback = async (a, __, profile, cb)=>{
    const {_json:{id, avatar_url:avatarUrl, name, email}} = profile;
    try {
        const user = await User.findOne({email});
        if(user){
            user.githubId = id;
            user.avatarUrl = avatarUrl;
            user.save();
            return cb(null,user);
        }
        const newUser = await User.create({
            email,
            name,
            githubId:id,
            avatarUrl
        })
        return cb(null,newUser);
    } catch (error) {return cb(error)}
}
export const postGithubLogin = (req,res)=>{
    res.redirect(routes.home);
}

//facebook
export const facebookLogin = passport.authenticate('facebook');
export const facebookLoginCallback = async (_, __, profile, cb)=>{
    console.log(_, __, profile, cb)
}
export const postFacebookLogin = (req,res)=>{
    res.redirect(routes.home)
}

export const logout = (req,res)=>{
    req.flash("info", "Logged out, see you later");
    req.logout();
    res.redirect(routes.home);
} 
export const getMe = (req,res)=>{
    res.render("userDetail",{pageTitle : "userDetail", user:req.user});
}

export const userDetail = async (req,res)=> {
    const {params : {id}} =req;
    try {
        const user = await User.findById({_id:id}).populate('videos');
        res.render("userDetail",{pageTitle : "userDetail", user , id})
    } catch (error) {
        req.flash("error", "User not found");
        res.redirect(routes.home)
    }
   
}

export const basicUserAvatar = async (req,res)=>{
    const {
        user:{_id:id},
    } =req;
    try {
        await User.findByIdAndUpdate(id,{
            avatarUrl:routes.basicimg
        })
        req.flash("success", "Changed to basic image.");
        res.redirect(`/users${routes.editProfile}`)
    } catch (error) {
        res.render("editProfile",{pageTitle : "editProfile"}); 
    }
}

export const getEditProfile = (req,res)=>{
    res.render("editProfile",{pageTitle : "editProfile"});
}
export const postEditProfile = async (req,res)=>{
    const {
        user:{_id:id},
        body :{name,email},
        file
    } =req;
    try {
        const checkEmail = await User.find({email:email});
        if(!checkEmail[0]){
            await User.findByIdAndUpdate(id,{
                name,
                email,
                avatarUrl:file ? file.location : req.user.avatarUrl
            });
        }
        await User.findByIdAndUpdate(id,{
            name,
            avatarUrl:file ? file.location : req.user.avatarUrl
        });
        req.flash("success", "Profile updated");
        res.redirect(routes.me)
    } catch (error) {
        req.flash("error", "Can't update profile");
        res.render("editProfile",{pageTitle : "editProfile"});
    }
}
export const getChangePassword = (req,res)=>{
    res.render("changePassword",{pageTitle : "changePassword"});
}
export const postChangePassword = async (req,res)=>{
    const{
        body:{oldPassword,newPassword,newPassword2},
    }=req;
    try {
        if(newPassword !== newPassword2){
            req.flash("error", "Password does not match.");
            res.status(400);
            res.redirect(routes.changePassword);
            return;
        }
        req.flash("success", "Successfully changed password.");
        await req.user.changePassword(oldPassword,newPassword)
        res.redirect(routes.me)
    } catch (error) {
        res.status(400);
        res.redirect(routes.changePassword)
    }
}