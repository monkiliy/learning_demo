function FileLoader(fileList, Event){
    this.fileList = fileList;
    this.reader = new FileReader();
    this.total = fileList[0].size;
    this.step = 1024*1024;
    this.loaded = 0;
    this.Event = Event;
    this.readFile(0,this.step);
    this.eventListener();
}
FileLoader.prototype = {
    readFile: function (start, step){
        if(this.fileList[0].slice){
            this.reader.readAsText(this.fileList[0].slice(start, start + step));
        }else{
            this.reader.readerAsText(this.fileList[0]);
        }
    },
    eventListener: function (){
        var _this = this;
        this.reader.onprogress = function(e){
            _this.onProgress(e.loaded);
        }
        this.reader.onload = function(){
            _this.onLoad();
        }
    },
    onProgress: function (num){
        this.loaded += num;
        var per = this.loaded/this.total;
        if( per > 1){
            per = 1;
        }
        this.Event.progressIng(per);
    },
    onLoad:function (){
        //上传文件
        this.Event.Loaded(this.loaded);
        if( this.loaded < this.total){
            this.readFile(this.loaded, this.step);
        }else{
            this.Event.loadDone();
        }
    }
}