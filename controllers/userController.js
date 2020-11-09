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
        res.status(400);
        res.render("join",{pageTitle:"join"});
    }else{
        try{
            const user = await User({
                name, 
                email
            })
            await User.register(user, password);
            next();
        }catch(error){
            console.log(error);
            res.redirect(routes.home)
        }
    }
}

export const getlogin = (req,res)=> {
    res.render("login",{pageTitle:"Login"});
}

export const postlogin = passport.authenticate('local',{
    failureRedirect:routes.login,
    successRedirect:routes.home
});

//github
export const githubLogin = passport.authenticate('github');
export const githubLoginCallback = async (a, __, profile, cb)=>{
    const {_json:{id, avatar_url:avatarUrl, name, email}} = profile;
    try {
        const user = await User.findOne({email});
        if(user){
            user.githubId = id;
            user.email = email;
            user.name = name;
            user.avatarUrl = avatarUrl
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
    res.redirect(routes.home)
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
    req.logout();
    res.redirect(routes.home);
} 
export const getMe = (req,res)=>{
    res.render("userDetail",{pageTitle : "userDetail", user:req.user});
}
export const editProfile = (req,res)=> res.render("editProfile",{pageTitle : "editProfile"});
export const userDetail = async (req,res)=> {
    const {params : {id}} =req;
    try {
        const user = await User.findById({_id:id});
        res.render("userDetail",{pageTitle : "userDetail",user});
    } catch (error) {
        res.redirect(routes.home)
    }
   
}
export const changePassword = (req,res)=> res.render("changePassword",{pageTitle : "changePassword"});