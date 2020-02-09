var num = 0;
jq('.container li').each(function(index,value){
    jq(value).on('tap',function(){
        num = jq('.container li').index(this);
        jq('.show').css('display','block');
        oneImg();
        jq('.show ul').on('swipeLeft','li',function(){
            num++;
            oneImg();
        }).on('swipeRight','li',function(){
            num--;
            oneImg();
        }).on('swipeDown','li',function(){
            jq('.show').css({
                display: 'none'
            })
        })
    })
    if(index == 0 || index == 4){
        jq(value).css({
            'background-image': `url(./img/a1${index}.jpeg)`
        })
    }else{
        jq(value).css({
            'background-image': `url(./img/a1${index}.jpg)`
        })
    }
})
function show(dom){
    if(dom.width() > dom.height()){
        if(dom.height() > jq('body').height()){
            dom.css('height','100vh')
        }
        dom.css({
            width: '100vw'
        })
    }else if(dom.width() <= dom.height()){
        if(dom.width() > jq('body').width()){
            dom.css('width','100vw')
        }
        dom.css({
            height: '100vh'
        })
    }
}
function oneImg(){
    if(num >= jq('.show li').length){
        num = 0
    }else if( num < 0){
        num = 9;
    }
    jq('.show li').css({
        display: 'none'
    }).eq(num).css({
        display: 'flex'
    })
    show(jq('.show img').eq(num));
}