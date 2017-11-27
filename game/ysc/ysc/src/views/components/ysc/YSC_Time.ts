/**
 *
 * @夜市场-倒计时
 *
 */
class YSC_Time extends eui.Component {
    //定义变量
    private now_time: number;
    private img_name:eui.Image;
    private txt_time:eui.BitmapLabel;
    private timer_timing: basic.Timer = null;
    
    //初始化
    createChildren(): void {
        super.createChildren();

        //注册事件
        basic.Dispatcher.addListener(EventNames.YSC_CHANGESTATUS,this.onChangeStatus,this);
    }
    
    //初始化
    info(_status:number,_time:number=0):void{
        //数据赋值
        this.now_time=_time;
        GameData.YSC_Game_Status=_status;

        //显示界面
        this.jugeShowFace();
    }
    
    //清除
    clean(): void {
        //判断结束
        if(this.timer_timing) {
            this.timer_timing.stop();
            this.timer_timing.removeEventListener(basic.TimerEvent.TIMER,this.onTiming,this);
            this.timer_timing.removeEventListener(basic.TimerEvent.TIMER_COMPLETE,this.onTimingComplete,this);
            this.timer_timing = null;
        }
    }
    
    //改变状态
    private onChangeStatus(e:egret.Event):void{
        //数据赋值
        this.now_time = e.data.leftTime;
        GameData.YSC_Game_Status = e.data.status;

        //显示界面
        this.jugeShowFace();
    }

    //显示界面
    private jugeShowFace():void{
        //判断显示界面
        if(GameData.YSC_Game_Status==0){
            //显示图片
            this.img_name.x = 10;
            this.txt_time.visible = true;
            this.img_name.source = "txt_ysc_ddsj_ch_png";

            //开始计时
            this.startTime();
            
            //注销按钮
            basic.Dispatcher.dispatch(EventNames.YSC_REMOVEBTN);
        }
        else if(GameData.YSC_Game_Status==1){
            //数据赋值
            this.now_time=this.now_time-2;

            //显示图片
            this.img_name.x=10;
            this.txt_time.visible=true;
            this.img_name.source="txt_ysc_xzsj_ch_png";

            //开始计时
            this.startTime();
            
            //注册按钮
            basic.Dispatcher.dispatch(EventNames.YSC_REGISTERBTN);
        }
        else if(GameData.YSC_Game_Status==2){
            //显示图片
            this.img_name.x=90;
            this.txt_time.visible=false;
            this.img_name.source ="txt_ysc_kjz_ch_png";
            
            //注销按钮
            basic.Dispatcher.dispatch(EventNames.YSC_REMOVEBTN);
        }
        else if(GameData.YSC_Game_Status==3){
            //显示图片
            this.img_name.x=90;
            this.txt_time.visible=false;
            this.img_name.source ="txt_ysc_jsz_ch_png";
            
            //注销按钮
            basic.Dispatcher.dispatch(EventNames.YSC_REMOVEBTN);
        }
    }

    //开始计时
    private startTime():void{
        //判断结束
        if(this.timer_timing) {
            this.timer_timing.stop();
            this.timer_timing.removeEventListener(basic.TimerEvent.TIMER,this.onTiming,this);
            this.timer_timing.removeEventListener(basic.TimerEvent.TIMER_COMPLETE,this.onTimingComplete,this);
            this.timer_timing = null;
        }
        
        //显示时间
        this.txt_time.text = this.assShowTime(this.now_time);
        
        //开始计时
        this.timer_timing = new basic.Timer(1000,this.now_time);
        this.timer_timing.addEventListener(basic.TimerEvent.TIMER,this.onTiming,this);
        this.timer_timing.addEventListener(basic.TimerEvent.TIMER_COMPLETE,this.onTimingComplete,this);
        this.timer_timing.start();
    }

    //计时中
    private onTiming(e:basic.TimerEvent):void{
        //数据赋值
        this.now_time -= 1;
        
        //显示时间
        this.txt_time.text = this.assShowTime(this.now_time);
        
        //判断播放声音
        if(GameData.YSC_Game_Status == 1 && this.now_time == 0) {
            //数据赋值
            GameData.YSC_Game_Status = 2;
            
            //注销按钮
            basic.Dispatcher.dispatch(EventNames.YSC_REMOVEBTN);
            
            //播放声音
            basic.SoundManager.instance.playEffect("sound_g_yazhuover_mp3");
        }
    }
    
    //计时结束
    private onTimingComplete(e:basic.TimerEvent):void{
        //判断结束
        if(this.timer_timing) {
            this.timer_timing.stop();
            this.timer_timing.removeEventListener(basic.TimerEvent.TIMER,this.onTiming,this);
            this.timer_timing.removeEventListener(basic.TimerEvent.TIMER_COMPLETE,this.onTimingComplete,this);
            this.timer_timing=null;
        }
    }
    
    //时间显示文本赋值
    private assShowTime(_time:number):string{
        //定义变量
        var showtime: string;
        var time_minute: number;
        var time_second: number;
        
        //数据赋值
        time_second = _time % 60;
        time_minute = Math.floor(_time / 60);
        if(time_minute<10){
            showtime = "0" + time_minute.toString();
        }
        else{
            showtime = time_minute.toString();
        }
        if(time_second<10){
            showtime += "&0" + time_second.toString();
        }
        else{
            showtime += "&" + time_second.toString();
        }
        
        return showtime;
    }
}
