import passport from "passport";
import facebook from "passport-facebook";
import github from "passport-github"
import { facebookLoginCallback, githubLoginCallback } from "./controllers/userController";
import User from "./models/User";
import routes from "./routes";

passport.use(User.createStrategy());

passport.use(
    new github({
            clientID: process.env.GH_ID,
            clientSecret: process.env.GH_SECRET,
            callbackURL: `http://127.0.0.1:3010${routes.githubCallback}`
        },githubLoginCallback)      
);
passport.use(
    //현재 코로나 사태로 인한 사용불가! FB 개인 사용자 인증x!
    //https이상만가능
    new facebook({
        clientID: process.env.FB_ID,
        clientSecret: process.env.FB_SECRET,
        callbackURL: `http://127.0.0.1:3010${routes.facebookCallback}`,
        profileFields:['id','displayName','photos','email'],
        scope:['public_profile','email']
    },facebookLoginCallback)
)
// passport.serializeUser(User.serializeUser());
// passport.deserializeUser(User.deserializeUser());
passport.serializeUser(function (user, done) {
    done(null, user);
});
    
// passport.deserializeUser(function (user, done) {
//     done(null, user);
// });
passport.deserializeUser(function(id, done){
    User.findById(id, function(err, user){
    done(err, user);
    });
});