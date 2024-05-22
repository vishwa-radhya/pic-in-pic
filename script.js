const videoElement=document.getElementById('video');
const button1=document.getElementById('btn-1');
const button2=document.getElementById('btn-2');
const message=document.getElementById('msg');
// async func prompt to select media stream, pass to video element, then play

async function selectMediaStream(){
    message.textContent=''
    try{
        const mediaStream = await navigator.mediaDevices.getDisplayMedia();
        videoElement.srcObject=mediaStream;
        videoElement.onloadedmetadata=()=>{
            videoElement.play();
        }
    }catch(err){
        if (err.name === 'NotAllowedError') {
            console.log('Permission denied: User did not grant screen sharing permission.');
            message.textContent='Select the TAB and  click share.'
        } else {
            alert('Error Occured Please Try Again Or Refresh The Page');
        }
    }
}
 async function reqPicInPic(){
    try{
        await videoElement.requestPictureInPicture();
    }catch(err){
        if(err.name==='InvalidStateError'){
            message.textContent='Click the START first to share the screen.';
        }else{
            alert('Error Occured Please Try Again Or Refresh The Page');
        }
    }
 }

button1.addEventListener('click',()=>{
 selectMediaStream();
});


button2.addEventListener('click',()=>{
    button1.disabled=true;
    button2.disabled=true;
    //start pic in pic
    reqPicInPic();
    //reset button
    button1.disabled=false;
    button2.disabled=false;
})
