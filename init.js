import app from "./app";

const port = 5000;

const handleListening = ()=>{
    console.log(`Listening on : port ${port}`)
}

app.listen(port,handleListening)