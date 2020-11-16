import axios from "axios";
import routes from "../../routes.js";

const addCommentForm = document.getElementById("jsAddComment");
const a = addCommentForm.querySelector("input");
const commentNumber = document.getElementById("jsCommentNumber");

const increaseNumber =()=>{
    commentNumber.innerHTML = parseInt(commentNumber.innerHTML,10) +1
}
const addComment = async (data)=>{
    const videoId = window.location.href.split("/videos/")[1];
    const videoComments = document.getElementById("jsVideoComments");
    const d = document.createElement("d");
    d.classList = "videoComments";
    d.innerHTML += (`    
        <a href=${routes.userDetail(data.creator._id)}>
            <img class="videoComment_avatar" src='${(!data.creator.avatarUrl) ? "" : data.creator.avatarUrl.indexOf("http")!==-1 ? data.creator.avatarUrl : "/" +data.creator.avatarUrl}'/>
            <h5 class="videoComment_creator">${data.creator.name}</h5>
            <h6 class="videoComment_date">${data.createdAt}</h6>
        </a>
        <h4 class="videoComment_text">${data.text}</h4>
        <a href=${routes.videoCommentDelete(data._id, videoId)} class="videoComment_delete">
            <button class="videoComment_delete-button">Delete</button>
        </a>
    `)
    videoComments.append(d);
    increaseNumber();
}
const sendComment = async (comment)=>{
    const videoId = window.location.href.split("/videos/")[1];
    const commentInput = addCommentForm.querySelector("textarea");
    const response = await axios({
        url: `/api/${videoId}/comment`,
        method: "post",
        data: {
          comment
        }
      });
    commentInput.value="";
    addComment(response.data[0])
    
    
}

const handleSubmit = (event)=>{
    event.preventDefault()
    const commentInput = addCommentForm.querySelector("textarea");
    const comment = commentInput.value;
    sendComment(comment);
}

function init(){
    a.addEventListener("click",handleSubmit);
}

if(addCommentForm){
    init();
}