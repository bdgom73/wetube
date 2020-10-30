import app from "./app";

const port = 3010;

const handleListening = ()=>{
    console.log(`Listening on : port ${port}`)
}

app.listen(port,handleListening)