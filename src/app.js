import bodyParser from "body-parser";
import express from "express";
import flash from "connect-flash";
import morgan from "morgan";
import helmet from "helmet";
import cookieParser from "cookie-parser";
import MongoStroe from "connect-mongo";
import mongoose from "mongoose";
import passport from "passport";
import session from "express-session";
import { localsMiddleware,setHeaderPolicy } from "./middlewares";
import userRouter from "./routers/userRouter";
import videoRouter from "./routers/videoRouter";
import globalRouter from "./routers/globalRouter";
import apiRouter from "./routers/apiRouter";
import routes from "./routes";
import path, { dirname } from "path";
import "./passport";
const app = express();

const cookieStore = MongoStroe(session);

app.use(helmet());
app.set("views",path.join(__dirname,"views"));
app.set("view engine","pug");
app.use("/static", express.static(__dirname+"/static"));
app.use(cookieParser()); //cookie 정보
app.use(bodyParser.json()); // form data 정보
app.use(bodyParser.urlencoded({extended:true})); // url 인코더
app.use(morgan("dev")) //logger
app.use(flash());
app.use(session({
    secret:process.env.COOKIE_SECRET,
    resave:true,
    saveUninitialized:false,
    store : new cookieStore({mongooseConnection : mongoose.connection})
}))
app.use(passport.initialize());
app.use(passport.session());


app.use(localsMiddleware)
app.use(setHeaderPolicy)

app.use(routes.home, globalRouter)
app.use(routes.users, userRouter)
app.use(routes.videos, videoRouter)
app.use(routes.api, apiRouter)

export default app;