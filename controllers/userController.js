import routes from "../routes";

export const getJoin = (req,res)=> {
    res.render("join",{pageTitle:"join"});
}
export const postJoin = (req,res)=>{
    const {
        body : {name,email,password,password2}
    }= req;
    if(password !== password2){
        res.status(400);
        res.render("join",{pageTitle:"join"});
    }else{
        res.redirect(routes.home)
    }
    
}
export const getlogin = (req,res)=> {
    res.render("login",{pageTitle:"Login"});
}
export const postlogin = (req,res)=> {
    res.redirect(routes.home)
}
export const logout = (req,res)=>{
    res.redirect(routes.home);
} 
export const editProfile = (req,res)=> res.render("editProfile",{pageTitle : "editProfile"});
export const userDetail = (req,res)=> res.render("userDetail",{pageTitle : "userDetail"});
export const changePassword = (req,res)=> res.render("changePassword",{pageTitle : "changePassword"});