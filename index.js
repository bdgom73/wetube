//require & import
const express = require("express");
const app = express();

// port listen
const handleListing = () =>{console.log(`Listening on : http://localhost:${port}`)}
const port = 5000;

function handleHome(req,res){
    res.send("hello!")
}
function handleProfile(req,res){
    res.send("U R on my profile!")
}
app.get("/", handleHome)

app.get('/profile',handleProfile)
app.listen(port, handleListing);