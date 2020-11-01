import routes from "./routes";

export const localsMiddleware = (req,res,next)=>{
    res.locals.siteTitle = "WeTube";
    res.locals.routes = routes;
    res.locals.user = {
        isAuthenticated : true,
        id:1
    };
    next();
}

export const setHeaderPolicy = (req,res,next) =>{
    res.setHeader("Content-Security-Policy", "script-src 'self' https://archive.org");
    next();
}