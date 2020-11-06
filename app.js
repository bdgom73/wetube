import express from "express"
import morgan from "morgan"
import helmet from "helmet"
import cookieParser from "cookie-parser"
import bodyParser from "body-parser"
import passport from "passport";
import session from "express-session";
import { localsMiddleware,setHeaderPolicy } from "./middlewares"
import userRouter from "./routers/userRouter"
import videoRouter from "./routers/videoRouter"
import globalRouter from "./routers/globalRouter"
import routes from "./routes"
import "./passport"
const app = express();


app.use(helmet());
app.set("view engine","pug");
app.use("/uploads", express.static("uploads"));
app.use("/static", express.static("static"));
app.use(cookieParser()); //cookie 정보
app.use(bodyParser.json()); // form data 정보
app.use(bodyParser.urlencoded({extended:true})); // url 인코더
app.use(morgan("dev")) //logger
app.use(session({
    secret:process.env.COOKIE_SECRET,
    resave:true,
    saveUninitialized:false
}))
app.use(passport.initialize());
app.use(passport.session());

app.use(localsMiddleware)
app.use(setHeaderPolicy)

app.use(routes.home, globalRouter)
app.use(routes.users, userRouter)
app.use(routes.videos, videoRouter)

export default app;