var titleLogin = document.getElementsByClassName('title-login')[0];
var titleRegister = document.getElementsByClassName('title-register')[0];
var registerBar = document.getElementsByClassName('register-bar')[0];
function init(){
    let Token = hasToken('Token')
    if(Token){
        titleLogin.innerHTML = '已登录';
        titleRegister.style.display = 'none';
        registerBar.style.display = 'none';
        titleLogin.setAttribute('href','javascript:;')
    }
}
function hasToken(str){
    var arr = document.cookie.split('; ');
    var len = arr.length;
    for( var i = 0; i < len; i++){
        var item = arr[i].split('=');
        if(str == item[0]){
            return item[1];
        }
    }
    // arr.forEach(function(value,index,arr){
    //     item = value.split('=');
    //     console.log(arr);
    //     if(str == item[0]){
    //         console.log(str);
    //         return item[1];
    //     }
    // })//

    // 使用forEach()不行，forEach()回调函数的返回值总是 undefined
}
init();

// var arr = [1,3,3];
// arr.forEach(function(value,index,arr){
//     console.log(value,index,arr);
//     console.log(this);
// })
// arr.forEach(function(value,index){
//     console.log(value,index);
//     console.log(this);
// })