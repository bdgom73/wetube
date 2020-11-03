import app from "./app";
import "./db"
import dotenv from "dotenv";
dotenv.config();
import "./models/Video"
import "./models/Comment"

const port = process.env.PORT || 3010;

const handleListening = ()=>{
    console.log(`Listening on : port ${port}`)
}

app.listen(port,handleListening)