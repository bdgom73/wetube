import mongoose, { connection } from "mongoose";
import dotenv from "dotenv";
dotenv.config();

mongoose.connect(
    process.env.MONGO_URL_PROD,
    {
        useNewUrlParser : true,
        useFindAndModify : false,
        useUnifiedTopology: true
    }
);

const db = mongoose.connection;

const handleOpen = ()=>{
    console.log(`✔️ `+""+"Connected to DB")
}
const handleError = (error)=>{
    console.log(`❌ Connected to DB ERROR : ${error}`)
}

db.once("open",handleOpen);
db.on("error",handleError)