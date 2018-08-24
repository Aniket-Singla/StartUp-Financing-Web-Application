//logging in
var username = document.querySelector('#uname').textContent;
var password = document.querySelector("#pwd").textContent;
var login = document.getElementById('login');

login.onclick=function(){

  var request = new XMLHttpRequest();
  request.onreadystatechange= function(){
    //take the reuired action
    if(request.readyState===XMLHttpRequest.DONE){
      if(request.status===200){
        console.log('user logged in successfully');
        alert('congrats! logged in successfully');
        
      }
      else if(request.status===403){
          console.log('error in logging in');
          alert('username / password incorrect');
      }
      else if(request.status===500){
          console.log('error in logging in');
          alert(' some internal server error');
      }
    }
  }
    var username = document.getElementById('username').value;
    var password = document.getElementById('password').value;
    console.log(username);
    request.open('POST','/login',true);
    request.setRequestHeader('Content-Type','application/json');
    request.send(JSON.stringify({username : username, password : password}));
}
