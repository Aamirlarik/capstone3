document.getElementById('signupForm').addEventListener('submit',function(event){
    event.preventDefault();
    
    let userEmail = document.getElementById('userEmail').value
    let userPassword = document.getElementById('userPassword').value
    
    
    console.log(userEmail, userPassword);
    
    if(userEmail && userPassword){
        localStorage.setItem('Email',userEmail)
        localStorage.setItem('Password',userPassword)
    
        window.location.href = "login.html"
    }
    
    
    });