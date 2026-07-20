window.addEventListener("DOMContentLoaded",()=>{

const form=document.getElementById("loginForm");

const loginBtn=document.getElementById("loginBtn");

form.addEventListener("submit",async(e)=>{

e.preventDefault();

const email=document.getElementById("email").value.trim();

const password=document.getElementById("password").value;

loginBtn.disabled=true;

loginBtn.innerHTML=`
<span class="loader"></span>
Logging In...
`;

try{

const response=await fetch(
"https://young-invest-backend.onrender.com/api/auth/login",
{
method:"POST",
headers:{
"Content-Type":"application/json"
},
body:JSON.stringify({
email,
password
})
}
);

const data=await response.json();

loginBtn.disabled=false;

loginBtn.innerHTML="Login";

if(response.ok){

localStorage.setItem(
"user",
JSON.stringify(data.user)
);

showSuccess(
"Login Successful",
"Welcome back to Crest Wealth Investment.",
()=>{
window.location.href="dashboard.html";
}
);

}else{

showError(
"Login Failed",
data.message||"Invalid email or password."
);

}

}catch(error){

console.log(error);

loginBtn.disabled=false;

loginBtn.innerHTML="Login";

showError(
"Connection Error",
"Unable to connect to the server."
);

}

});

});
