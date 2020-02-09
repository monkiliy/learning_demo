var loginTabs = document.getElementById("loginTabs");//选项卡 登录
var registerTabs = document.getElementById("registerTabs");//选项卡 注册

var login = document.getElementsByClassName('login')[0];//登录块
var usernameLogin = document.getElementById('username-login');//登录名
var pwdLogin = document.getElementById('pwd-login');//登录密码
var btnLogin = document.getElementById('btn-login');//登录提交按钮

var register = document.getElementsByClassName('register')[0];//注册块
var usernameRegister = document.getElementById('username-register');//注册名
var pwdRegister = document.getElementById('pwd-register');//注册密码
var pwd2Register = document.getElementById('pwd2-register');//确认密码
var btnRegister = document.getElementById('btn-register');//注册提交按钮

function init(){
    let arr = location.search.slice(1).split('&');
    for(var i = 0; i < arr.length; i++){
        if(arr[i] == 'url=register'){
            registerTabs.onclick();
        }
    }
}
btnRegister.onclick = function(e){
    e.preventDefault();
    let value = usernameRegister.value;
    let pwd = pwdRegister.value;
    let pwd2 = pwd2Register.value;
    const str = `name=${value}&password=${pwd}`;
    if(pwd == pwd2){
        ajax('POST','http://vip.chanke.xyz/mi/register',cbs,str,true);
    }else if(pwd != pwd2){
        alert('密码不一致');
    }
}
function cbs(data){
    data = JSON.parse(data);
    if(data.errorCode == 400){
        alert(data.errorMessage);
    }else if(data.errorCode == 0){
        location.href = './index.html';
    }
}
btnLogin.onclick = function(e){
    e.preventDefault();
    let value = usernameLogin.value;
    let pwd = pwdLogin.value;
    const str = `name=${value}&password=${pwd}`;
    ajax('POST','http://vip.chanke.xyz/mi/login',cbss,str,true);
}
function cbss(data){
    data = JSON.parse(data)
    console.log(data);
    if(data.errorCode == 0){
        location.href = './index.html'
    }else if(data.errorCode == 400){
        alert(data.errorMessage);
    }
}

loginTabs.onclick = function(){
    register.style.display = "none";
    login.style.display = "block";
    loginTabs.className="tabs-link select";
    registerTabs.className="tabs-link";
}
registerTabs.onclick = function(){
    register.style.display = "block";
    login.style.display = "none";
    loginTabs.className="tabs-link";
    registerTabs.className="tabs-link select";
}
init();
