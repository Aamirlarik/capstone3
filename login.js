document.getElementById("loginForm").addEventListener('submit',function (event) {
    event.preventDefault();

let localEmail = localStorage.getItem("Email");
let localPassword = localStorage.getItem("Password");

    let userEmail = document.getElementById('userEmail').value
    let userPassword = document.getElementById('userPassword').value
    
    if(userEmail === localEmail && userPassword === localPassword){
        window.location.href = "./index.html"
    }else{
        alert('something went wrong')
    }
       
    
});