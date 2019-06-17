// 获取DOM元素
var body = document.getElementsByTagName("body")[0];
var audio = document.getElementById("audio");
var control = document.getElementsByClassName("control")[0];
var previous = document.getElementsByClassName("previous")[0];
var next = document.getElementsByClassName("next")[0];
var changeStyle = document.getElementsByClassName("change-style")[0];
var disc = document.getElementsByClassName("disc")[0];
var discImg = document.getElementById("discImg");
var playTime = document.getElementsByClassName("playTime")[0];
var lineProgress = document.getElementsByClassName("line")[0];
var progressMove = document.getElementsByClassName("move")[0];
var allTime = document.getElementsByClassName("allTime")[0];
var volumeCtl = document.getElementsByClassName("volumeCtl")[0];
var volumeState = document.getElementsByClassName("volumeState")[0];
var volume = document.getElementsByClassName("volume")[0];
var volumeMove = document.getElementsByClassName("volumeMove")[0];
var volumeLine = document.getElementsByClassName("volumeLine")[0];
var move = document.getElementsByClassName("move")[0];
var playedCtl = document.getElementsByClassName("playedCtl")[0];
//设置变量
var musicAry = [];
var discImgAry = [];
var playListAry = [];
var i = 1;
var j = 1;
var timer1 = null;
var timer2 = null;
// 设置数据
musicAry = ["./music/我曾.mp3","./music/time Machine.mp3","./music/往后余生.mp3"];
discImgAry = ["./image/我曾.jpg","./image/timeMachine.jfif","./image/往后余生.jpg"];
playListAry = ["&#xe624;","&#xe623;","&#xe609;"];
//播放暂停
control.onclick = function(){
    if(audio.paused){
        control.innerHTML = "&#xe60c;";
        audio.play();
        var totalTime = audio.duration;
        allTime.innerHTML = "0" + parseInt(totalTime/60) + ':' + parseInt(totalTime%60);
        discImg.className = "ctl";//唱片旋转
        discImg.style.animationPlayState = "running";
    }else{
        audio.pause();
        control.innerHTML = "&#xe61d;";
        clearInterval(timer1);
        clearInterval(timer2);
        discImg.style.animationPlayState = "paused";//唱片旋转停止
    }
}
// 一个元素同一个事件应该在事件内部判定启动不同的效果
// audio.src返回的是绝对路径值不是一个简单的先对路径字符串
// var musicName = audio.src;
    // console.log(musicName);
    // var musicIndex = musicAry.indexOf(musicName);
    // console.log(musicIndex);打印-1说明不在数组内
// 播放方式按钮
changeStyle.onclick = function(){
    j = j + 1 > 2 ? 0 : j + 1;
    changeStyle.innerHTML = playListAry[j];
    if(j == 0){
        // 单曲循环;
        audio.setAttribute("loop","loop");
    }else{
        audio.removeAttribute("loop");
    }
}
//音乐进度条
audio.onplay = playFunc;
function playFunc(){
    // 播放时间
    timer1 = setInterval(function(){
        var playedTime = audio.currentTime;
        playTime.innerHTML = playedTime > 10 ? "0" + parseInt(playedTime/60) + ':' + parseInt(playedTime%60) : "00" + ":" + "0" + parseInt(playedTime%60);
    },50);
    //进度条控制
    timer2 = setInterval(function(){  
        var totalTime = audio.duration;
        var timeRatio = audio.currentTime/totalTime;
        progressMove.style.left = (-6 + timeRatio*lineProgress.offsetWidth) + "px";
        playedCtl.style.width = timeRatio*lineProgress.offsetWidth + "px";//播放颜色控制
    },20)
}
audio.oncanplay = function(){
    var totalTime = audio.duration;
    allTime.innerHTML = "0" + parseInt(totalTime/60) + ':' + parseInt(totalTime%60);
}
// 列表循环 随机播放 
// 判定播放顺序
    // 上一首
previous.onclick = function(){
    clearInterval(timer1);//清空计时器
    clearInterval(timer2);//清空计时器
    if(j == 1 || j == 0){
        // 列表循环
        // 切换歌单
        i = i - 1 < 0 ? 2 : i - 1;
        audio.src = musicAry[i]
        discImg.src = discImgAry[i];//改变图片
        control.innerHTML = "&#xe60c;";// 改变按钮状态
    }else if(j == 2){
        var num = parseInt(Math.random()*3);//上下一首随机播放
        audio.src = musicAry[num];
        discImg.src = discImgAry[num];
    }
    //总的时间
    audio.play();  
}
// 下一首
next.onclick = function(){
    clearInterval(timer1);//清空计时器
    clearInterval(timer2);//清空计时器
    if(j == 1 || j == 0){
        // 列表循环
        // 切换歌单
        i = i + 1 > 2 ? 0 : i + 1;
        audio.src = musicAry[i];
        discImg.src = discImgAry[i];//改变图片
        control.innerHTML = "&#xe60c;";// 改变按钮状态
    }else if(j == 2){
        var num = parseInt(Math.random()*3);//上下一首随机播放
        audio.src = musicAry[num];
        discImg.src = discImgAry[num];
    }
    audio.play();
}
// 自动播放
audio.onended = function(){
    clearInterval(timer1);//清空计时器
    clearInterval(timer2);//清空计时器
    if(j == 1){
        i = i + 1 > 2 ? 0 : i + 1;
        audio.src = musicAry[i];
        discImg.src = discImgAry[i];//改变图片
        audio.play();
        control.innerHTML = "&#xe60c;";// 改变按钮状态
    }
    if(j == 2){
        var num = parseInt(Math.random()*3);//上下一首随机播放
        audio.src = musicAry[num];
        audio.play();
        discImg.src = discImgAry[num];
    }
}
//音量控制
var flag = true;
volumeState.onclick = function(){
    if(flag){
        volume.classList.add("show");
    }else{
        volume.className = "volume";
    }
    flag = !flag;
}
volumeMove.onmousedown = function(){
    var volumeHeight = -6;
    body.onmousemove = function(e){
        volumeHeight = (e.clientY - volumeLine.getBoundingClientRect().top);
        if(volumeHeight < -6){
            volumeHeight = -6;
        }
        if(volumeHeight > 94){
            volumeHeight = 94;
        }
        volumeMove.style.top = volumeHeight + "px";
        volumeCtl.style.height = (94 - volumeHeight) + "px";//音量颜色
        audio.volume = (94 - volumeHeight)/100 * 1;
        if(audio.volume == 0){
            volumeState.innerHTML = "&#xe652;";
        }else{
            volumeState.innerHTML = "&#xe759;";
        }
    }
    body.onmouseup = function(){
        body.onmousemove = null;
        body.onmouseup = null;
        volume.className = "volume";//控制音量调消失
        // audio.volume = (94 - volumeHeight)/100 * 1;
    }
    // volumeLine.onmousemove = function(e){
    //     volumeMove.style.top = (-6 + e.offsetY) + "px";
    // }存在响应误差问题
}
//播放进度控制
move.onmousedown = function(){
    clearInterval(timer1);
    clearInterval(timer2);
    var progressDone = -6;
    var playTimeCtl = null;
    body.onmousemove = function(e){
        progressDone = e.clientX - lineProgress.getBoundingClientRect().left;
        if(progressDone < -6){
            progressDone = -6;
        }
        if(progressDone > 170){
            progressDone = 170;
        }
        move.style.left = progressDone + "px";
        playTimeCtl = (progressDone + 6)/170 * audio.duration;
        playTime.innerHTML = playTimeCtl > 10 ? "0" + parseInt(playTimeCtl/60) + ':' + parseInt(playTimeCtl%60) : "00" + ":" + "0" + parseInt(playTimeCtl%60);
        playedCtl.style.width = (progressDone + 6) + "px";//播放颜色
    }
    body.onmouseup = function(){
        body.onmousemove = null;
        body.onmouseup = null;
        audio.currentTime = playTimeCtl;
        playFunc();
    }
}
 






