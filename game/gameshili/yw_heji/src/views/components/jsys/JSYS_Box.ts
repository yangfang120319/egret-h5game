/**
 *
 * @显示Box
 *
 */
class JSYS_Box extends eui.Component {
    //定义变量
    private img_over: eui.Image;
    private overshow: JSYS_OverShow;
    private btn_box: eui.Button[] = [];
    private box_type: number[] = [1,6,6,6,0,2,2,2,1,3,3,0,4,4,1,5,5,5,0,9,9,9,1,8,8,0,7,7];
    
    //运行显示变量
    private run_now: number;//当前运行
    private run_over: number;//运行结束
    private box_num: number = 28;//Box个数
    private box_nowshow: number[] = [];//当前显示Box
    private run_begintime: number;//运行开始时间
    private callback: Function;
    
    //运行时间变量
    private now_runnum: number;
    private run_middletime: number;
    private total_starttime: number;
    private total_middletime: number;
    private run_middleboxnum: number;
    private run_maxshownum: number = 5;
    private run_middlecirclenum: number = 3;
    private run_overtime: number[] = [84,84,84,84,215,215,225,236];
    private run_starttime: number[] = [155,275,260,220,200,160,140,83,83,83];
    private timer_over: egret.Timer = null;
    private timer_start: egret.Timer = null;
    private timer_middle: egret.Timer = null;
    private timer_action: egret.Timer = null;
    
    //初始化
    createChildren(): void {
        super.createChildren();
        
        //数据赋值
        this.img_over.visible = false;
        for(var i: number = 0;i < this.box_num;i++) {
            //定义变量
            var box: eui.Button = this["btn_box_"+i];
            
            //数据赋值
            this.btn_box[i] = box;
            this.btn_box[i].currentState = "up";
        }
    }
    
    //初始化界面
    info(_index: number): void {
        //数据赋值
        this.run_now = _index;
        this.box_nowshow = [_index];
        GameData.JSYS_RunOver_Type = this.box_type[_index];
        if(GameData.JSYS_RunOver_Type < 2) {
            GameData.JSYS_RunOver_Family = -1;
        }
        else if(GameData.JSYS_RunOver_Type < 6) {
            GameData.JSYS_RunOver_Family = 10;
        }
        else {
            GameData.JSYS_RunOver_Family = 11
        }
        
        //显示Box
        this.showBox();
    }
    
    //清除
    clean():void{
        //注销事件
        if(this.timer_start) {
            this.timer_start.stop();
            this.timer_start.removeEventListener(egret.TimerEvent.TIMER_COMPLETE,this.onStartComplete,this);
            this.timer_start = null;
        }
        
        //注销事件
        if(this.timer_middle) {
            this.timer_middle.stop();
            this.timer_middle.removeEventListener(egret.TimerEvent.TIMER,this.onMiddle,this);
            this.timer_middle.removeEventListener(egret.TimerEvent.TIMER_COMPLETE,this.onMiddleComplete,this);
            this.timer_middle = null;
        }
        
        //停止等待
        if(this.timer_over) {
            this.timer_over.stop();
            this.timer_over.removeEventListener(egret.TimerEvent.TIMER_COMPLETE,this.onOverComplete,this);
            this.timer_over = null;
        }
        
        //停止等待
        if(this.timer_action) {
            this.timer_action.stop();
            this.timer_action.removeEventListener(egret.TimerEvent.TIMER,this.onAction,this);
            this.timer_action.removeEventListener(egret.TimerEvent.TIMER_COMPLETE,this.onActionComplete,this);
            this.timer_action = null;
        }
    }
    
    //游戏开始
    start(_over_index: number,_callback:Function): void {
        //数据赋值
        this.callback = _callback;
        this.run_over = _over_index;
        this.box_nowshow = [this.run_now];
        this.run_begintime = egret.getTimer();
        GameData.JSYS_RunOver_Type = this.box_type[this.run_over];
        this.assRunTime();
        
        //判断家庭
        if(GameData.JSYS_RunOver_Type < 2) {
            GameData.JSYS_RunOver_Family = -1;
        }
        else if(GameData.JSYS_RunOver_Type < 6) {
            GameData.JSYS_RunOver_Family = 10;
        }
        else {
            GameData.JSYS_RunOver_Family = 11
        }
        
        //播放开始声音
        basic.SoundManager.instance.playEffect("sound_jsys_run_mp3");
        
        //开始转圈
        this.runStart();
    }
    
    //隐藏界面
    hideOver():void{
        //隐藏图片
        this.img_over.visible = false;
    }
    
    //显示Box
    private showBox():void{
        //清空显示
        for(var i: number = 0;i < this.box_num;i++) {
            this.btn_box[i].currentState = "up";
        }

        //显示界面
        for(var j: number = 0;j < this.box_nowshow.length;j++) {
            try {
                this.btn_box[this.box_nowshow[j]].currentState = "down";
            }
            catch(error) {
                console.log(this.box_nowshow[j]);
            }
        }
    }
    
    //运行时间赋值
    private assRunTime(): void {
        //定义变量
        var total_time: number = 5050;
        var total_overtime: number = 0;

        //数据赋值
        this.total_starttime = 0;
        for(var i: number = 0;i < this.run_starttime.length;i++) {
            this.total_starttime += this.run_starttime[i];
        }
        for(var j: number = 0;j < this.run_overtime.length;j++) {
            total_overtime += this.run_overtime[j];
        }
        this.total_middletime = total_time - this.total_starttime - total_overtime;
        this.run_middleboxnum = this.run_over - this.run_now - this.run_starttime.length - this.run_overtime.length - 1;
        if(this.run_middleboxnum < 0) {
            this.run_middleboxnum += this.box_num;
        }
        this.run_middleboxnum += this.box_num * this.run_middlecirclenum + 1;
        this.run_middletime = this.total_middletime / this.run_middleboxnum;
        if(this.run_middletime > 18) {
            this.run_middleboxnum += this.box_num;
            this.run_middletime = this.total_middletime / this.run_middleboxnum;
            if(this.run_middletime > 18) {
                this.run_middleboxnum += this.box_num;
                this.run_middletime = this.total_middletime / this.run_middleboxnum;
            }
        }
    }
    
    //开始转圈
    private runStart(): void {
        //数据赋值
        this.now_runnum = 0;
        
        //开始等待
        this.timer_start = new egret.Timer(this.run_starttime[this.now_runnum],1);
        this.timer_start.addEventListener(egret.TimerEvent.TIMER_COMPLETE,this.onStartComplete,this);
        this.timer_start.start();
    }
    
    //开始转圈结束
    private onStartComplete(e:egret.TimerEvent):void{
        //定义变量
        var nowshow: number[] = [];
        
        //注销事件
        if(this.timer_start) {
            this.timer_start.stop();
            this.timer_start.removeEventListener(egret.TimerEvent.TIMER_COMPLETE,this.onStartComplete,this);
            this.timer_start = null;
        }
        
        //数据赋值
        this.run_now += 1;
        if(this.run_now >= this.box_num) {
            this.run_now = 0;
        }
        
        //数据赋值
        if(this.box_nowshow.length < this.run_maxshownum) {
            nowshow[0] = this.run_now;
            for(var i1: number = 0;i1 < this.box_nowshow.length;i1++) {
                nowshow[i1 + 1] = this.box_nowshow[i1];
            }
            this.box_nowshow = nowshow;
        }
        else {
            nowshow[0] = this.run_now;
            for(var i2: number = 0;i2 < this.box_nowshow.length - 1;i2++) {
                nowshow[i2 + 1] = this.box_nowshow[i2];
            }
            this.box_nowshow = nowshow;
        }

        //当前显示
        this.showBox();

        //判断显示
        this.now_runnum += 1;
        if(this.now_runnum < this.run_starttime.length) {
            //开始等待
            this.timer_start = new egret.Timer(this.run_starttime[this.now_runnum],1);
            this.timer_start.addEventListener(egret.TimerEvent.TIMER_COMPLETE,this.onStartComplete,this);
            this.timer_start.start();
        }
        else {
            //开始中间转圈
            this.runMiddle();
        }
    }
    
    //中间转圈
    private runMiddle():void{
        //数据复制
        this.now_runnum = 0;

        //开始等待
        this.timer_middle = new egret.Timer(this.run_middletime,this.run_middleboxnum);
        this.timer_middle.addEventListener(egret.TimerEvent.TIMER,this.onMiddle,this);
        this.timer_middle.addEventListener(egret.TimerEvent.TIMER_COMPLETE,this.onMiddleComplete,this);
        this.timer_middle.start();
    }
    
    //中间转圈中
    private onMiddle(e: egret.TimerEvent): void {
        //定义变量
        var nowshow: number[] = [];

        //数据赋值
        this.run_now += 1;
        if(this.run_now >= this.box_num) {
            this.run_now = 0;
        }

        //数据赋值
        nowshow[0] = this.run_now;
        for(var i2: number = 0;i2 < this.box_nowshow.length - 1;i2++) {
            nowshow[i2 + 1] = this.box_nowshow[i2];
        }
        this.box_nowshow = nowshow;

        //当前显示
        this.showBox();

        //判断显示结束
        this.now_runnum += 1;
        if((this.run_middleboxnum - this.now_runnum) % this.box_num == 0) {
            if(egret.getTimer() - this.run_begintime > this.total_middletime + this.total_starttime) {
                //注销事件
                if(this.timer_middle) {
                    this.timer_middle.stop();
                    this.timer_middle.removeEventListener(egret.TimerEvent.TIMER,this.onMiddle,this);
                    this.timer_middle.removeEventListener(egret.TimerEvent.TIMER_COMPLETE,this.onMiddleComplete,this);
                    this.timer_middle = null;
                }
                
                //结束转圈
                this.runOver();
            }
        }
    }

    //中间转圈结束
    private onMiddleComplete(): void {
        //注销事件
        if(this.timer_middle) {
            this.timer_middle.stop();
            this.timer_middle.removeEventListener(egret.TimerEvent.TIMER,this.onMiddle,this);
            this.timer_middle.removeEventListener(egret.TimerEvent.TIMER_COMPLETE,this.onMiddleComplete,this);
            this.timer_middle = null;
        }

        //结束转圈
        this.runOver();
    }
    
    //结束转圈
    private runOver():void{
        //数据赋值
        this.now_runnum = 0;
        
        //开始等待
        this.timer_over = new egret.Timer(this.run_overtime[this.now_runnum],1);
        this.timer_over.addEventListener(egret.TimerEvent.TIMER_COMPLETE,this.onOverComplete,this);
        this.timer_over.start();
    }
    
    //结束转圈结束
    private onOverComplete(e: egret.TimerEvent): void {
        //定义变量
        var nowshow_num: number;
        var nowshow: number[] = [];
        
        //停止等待
        if(this.timer_over) {
            this.timer_over.stop();
            this.timer_over.removeEventListener(egret.TimerEvent.TIMER_COMPLETE,this.onOverComplete,this);
            this.timer_over = null;
        }

        //数据赋值
        this.run_now += 1;
        if(this.run_now >= this.box_num) {
            this.run_now = 0;
        }

        //数据赋值
        this.now_runnum += 1;
        if(this.run_overtime.length - this.now_runnum < 3) {
            this.box_nowshow = [this.run_now];
        }
        else {
            nowshow_num = Math.min(this.run_maxshownum,this.run_overtime.length - this.now_runnum - 2);
            nowshow[0] = this.run_now;
            for(var i: number = 0;i < nowshow_num - 1;i++) {
                nowshow[i + 1] = this.box_nowshow[i];
            }
            this.box_nowshow = nowshow;
        }

        //当前显示
        this.showBox();

        //判断结束
        if(this.now_runnum < this.run_overtime.length) {
            //开始等待
            this.timer_over = new egret.Timer(this.run_overtime[this.now_runnum],1);
            this.timer_over.addEventListener(egret.TimerEvent.TIMER_COMPLETE,this.onOverComplete,this);
            this.timer_over.start();
        }
        else {
            //结束
            if(this.callback) {
                this.callback();
            }

            //显示闪动动画
            this.showOverAction();
            
            //播放声音
            egret.setTimeout(() => {
                //播放声音
                basic.SoundManager.instance.playEffect("sound_jsys_type" + GameData.JSYS_RunOver_Type.toString() + "_mp3");
            },this,1500);
        }
    }
    
    //显示结束动画
    private showOverAction(): void {
        //显示结束动画
        this.overshow.start(GameData.JSYS_RunOver_Type);
        
        //开始闪动
        this.timer_action = new egret.Timer(500,6);
        this.timer_action.addEventListener(egret.TimerEvent.TIMER,this.onAction,this);
        this.timer_action.addEventListener(egret.TimerEvent.TIMER_COMPLETE,this.onActionComplete,this);
        this.timer_action.start();
    }
    
    //闪动动画
    private onAction(e:egret.TimerEvent):void{
        //判断显示
        if(this.btn_box[this.run_now].currentState == "up") {
            this.btn_box[this.run_now].currentState = "down";
        }
        else{
            this.btn_box[this.run_now].currentState = "up";
        }
    }
    
    //闪动结束
    private onActionComplete(e: egret.TimerEvent): void {
        //停止等待
        if(this.timer_action) {
            this.timer_action.stop();
            this.timer_action.removeEventListener(egret.TimerEvent.TIMER,this.onAction,this);
            this.timer_action.removeEventListener(egret.TimerEvent.TIMER_COMPLETE,this.onActionComplete,this);
            this.timer_action = null;
        }
        
        //显示结束图片
        this.img_over.scaleX = 1;
        this.img_over.scaleY = 1;
        this.img_over.source = "icon_jsys_box" + GameData.JSYS_RunOver_Type + "_png";

        //定义位置
        if(GameData.JSYS_RunOver_Type == 0) {
            this.img_over.x = this.btn_box[this.run_over].x + 2;
            this.img_over.y = this.btn_box[this.run_over].y + 3;
        }
        else {
            this.img_over.x = this.btn_box[this.run_over].x + 4;
            this.img_over.y = this.btn_box[this.run_over].y + 4;
        }
        
        //显示移动动画
        this.img_over.visible = true;
        var _tween_x: egret.Tween = egret.Tween.get(this.img_over).to({ x: 84 },1000);
        var _tween_y: egret.Tween = egret.Tween.get(this.img_over).to({ y: 460 },1000);
        if(GameData.JSYS_RunOver_Type == 0) {
            var _tween_scaleX: egret.Tween = egret.Tween.get(this.img_over).to({ scaleX: 0.5 },1000);
            var _tween_scaleY: egret.Tween = egret.Tween.get(this.img_over).to({ scaleY: 0.5 },1000); 
        }
        else{
            var _tween_scaleX: egret.Tween = egret.Tween.get(this.img_over).to({ scaleX: 0.646 },1000);
            var _tween_scaleY: egret.Tween = egret.Tween.get(this.img_over).to({ scaleY: 0.646 },1000); 
        }
    }
    
}
