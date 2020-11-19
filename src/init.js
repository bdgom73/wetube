import dotenv from "dotenv";
dotenv.config();

import "./db"
import app from "./app";

import "./models/Video"
import "./models/Comment"
import "./models/User"

const port = process.env.PORT || 3010;

const handleListening = ()=>{
    console.log(`Listening on : port ${port}`)
}

app.listen(port,handleListening)