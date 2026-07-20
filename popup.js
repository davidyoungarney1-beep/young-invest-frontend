function showPopup(type,title,message,callback=null){

const old=document.getElementById("popupOverlay");

if(old) old.remove();

const icon=type==="success"?"✓":"!";

const overlay=document.createElement("div");

overlay.className="popup-overlay show";

overlay.id="popupOverlay";

overlay.innerHTML=`

<div class="popup">

<div class="popup-icon ${type}">

${icon}

</div>

<h2>${title}</h2>

<p>${message}</p>

<button id="popupBtn">

Continue

</button>

</div>

`;

document.body.appendChild(overlay);

document.getElementById("popupBtn").onclick=()=>{

overlay.remove();

if(callback) callback();

};

}

function showSuccess(title,message,callback=null){

showPopup("success",title,message,callback);

}

function showError(title,message){

showPopup("error",title,message);

}
