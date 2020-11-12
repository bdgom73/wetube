const videoContainer = document.getElementById("jsVideoPlayer");
const videoPlayer = document.querySelector("#jsVideoPlayer video");
const playBtn = document.getElementById("jsPlayBtn");
const volumeBtn = document.getElementById("jsVolumeBtn");
const extendBtn = document.getElementById("jsExpandBtn");

function handlePlayClick(){
    if(videoPlayer.paused){
        videoPlayer.play();
        playBtn.innerHTML ='<i class="fas fa-pause"></i>'
    }else{
        videoPlayer.pause();
        playBtn.innerHTML ='<i class="fas fa-play"></i>'
    }
}
function handleVolumeClick(){
    if(videoPlayer.muted){
        videoPlayer.muted = false;
        volumeBtn.innerHTML ='<i class="fas fa-volume-up"></i>'
    }else{
        videoPlayer.muted = true;
        volumeBtn.innerHTML ='<i class="fas fa-volume-mute"></i>'
    }
}
function exitFullScreen(){
    extendBtn.innerHTML = '<i class="fas fa-expand"></i>';
    extendBtn.addEventListener("click",goFullScreen);
    document.exitFullscreen();
}
function goFullScreen(){
    videoContainer.requestFullscreen();
    extendBtn.innerHTML = '<i class="fas fa-compress"></i>'
    extendBtn.removeEventListener("click",goFullScreen);
    extendBtn.addEventListener("click",exitFullScreen)
}

function init(){
    playBtn.addEventListener("click",handlePlayClick);
    volumeBtn.addEventListener("click", handleVolumeClick);
    extendBtn.addEventListener("click",goFullScreen);
}

if(videoContainer){
    init();
}

