import passport from "passport";
import github from "passport-github"
import { githubLoginCallback } from "./controllers/userController";
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

// passport.serializeUser(User.serializeUser());
// passport.deserializeUser(User.deserializeUser());
passport.serializeUser(function (user, done) {
    done(null, user);
});
    
passport.deserializeUser(function (user, done) {
    done(null, user);
});
