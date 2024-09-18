document.getElementById('loginForm').addEventListener('submit', function(event){
    event.preventDefault();

    
    let localEmail = localStorage.setItem('https://fakestoreapi.com/users');
    let localPassword = localStorage.getItem('https://fakestoreapi.com/users');
    const userData = users.map(user => ({ email: user.email, password: user.password }));
      localStorage.getItemetItem('users', JSON.stringify(userData));

    if(userEmail === localEmail && userPassword ===localPassword ){
        alert("Login successfully!");
        window.location.href = "./signin.html";
        
    } else{
        alert("Wrong password!");
    }
    
})