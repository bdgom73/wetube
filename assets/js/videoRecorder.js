const { get } = require("mongoose");

const recorderContainer = document.getElementById("jsRecordContainer");
const recorderBtn = document.getElementById("jsRecordBtn");
const videoPreview = document.getElementById("jsVideoPreview");

let stremaObject;
let videoRecorder

const handleVideoData = (event)=>{
    const { data:videoFile }= event;
    const link = document.createElement("a");
    link.href = URL.createObjectURL(videoFile);
    link.download = "recorded.mp4";
    document.body.appendChild(link);
    link.click();
}

const stopRecording = ()=>{
    videoRecorder.stop();
    recorderBtn.removeEventListener("click",stopRecording);
    recorderBtn.addEventListener("click",getVideo)
    recorderBtn.innerHTML = "Start recording";
    stopStreamedVideo(videoPreview);
}

const startRecording = ()=>{
    videoRecorder = new MediaRecorder(stremaObject);
    videoRecorder.start();
    videoRecorder.addEventListener("dataavailable",handleVideoData);
    recorderBtn.addEventListener("click",stopRecording);
}

function stopStreamedVideo(videoElem) {
    const stream = videoElem.srcObject;
    const tracks = stream.getTracks();
    
    tracks.forEach(function(track) {
        track.stop();
    });
    
    videoElem.srcObject = null;
}

const getVideo = async ()=>{
    try{
        const stream = await navigator.mediaDevices.getUserMedia({
            audio:true,
            video:{width:1280, height:720}
        });
        videoPreview.srcObject = stream;
        videoPreview.muted = true;
        videoPreview.play();
        recorderBtn.innerHTML = "Stop recording";
        stremaObject = stream;
        startRecording();
        
    }catch(error){
        recorderBtn.innerHTML = "Cant record";
    }finally{
        recorderBtn.removeEventListener("click",getVideo);
    }
}

function init(){
    recorderBtn.addEventListener("click", getVideo)
}

if(recorderContainer){
    init()
}