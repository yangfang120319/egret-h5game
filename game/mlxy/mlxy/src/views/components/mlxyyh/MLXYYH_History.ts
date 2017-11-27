/**
 *
 * @马来西亚银行-历史记录+时间
 *
 */
class MLXYYH_History extends eui.Component {
    //定义变量
    private now_time: number;
    private img_type: eui.Image;
    private txt_time: eui.BitmapLabel;
    private timer_timing: basic.Timer = null;
    private history: eui.Image[] = [];
    
    //初始化
    createChildren(): void {
        super.createChildren();
        
        //数据复制
        for(var i: number = 0;i < 20;i++) {
            //定义变量
            var img: eui.Image = this["history" + i];

            //数据赋值
            this.history[i] = img;
            this.history[i].source = "";
        }
        
        //注册事件
        basic.Dispatcher.addListener(EventNames.MLXYYH_HISTORY,this.onShowHistory,this);
        basic.Dispatcher.addListener(EventNames.MLXYYH_CHANGESTATUS,this.onChangeStatus,this);
    }
    
    //初始化
    info(_status: number,_time: number):void{
        //判断显示界面
        this.now_time = _time;
        GameData.MLXYYH_Game_Status = _status;

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
    
    //显示历史记录
    private onShowHistory(e: egret.Event): void {
        //清除界面
        for(var j: number = 0;j < 20;j++) {
            this.history[j].source = "";
        }

        //显示界面
        for(var i: number = 0;i < Math.min(20,e.data.historys.length);i++) {
            //显示图片
            this.history[i].source = "icon_mlxyyh_" + e.data.historys[i] + "_0_png";
        }
    }
    
    //改变状态
    private onChangeStatus(e: egret.Event): void {
        //数据赋值
        this.now_time = e.data.leftTime;
        GameData.MLXYYH_Game_Status = e.data.status;

        //显示界面
        this.jugeShowFace();
    }

    //显示界面
    private jugeShowFace(): void {
        //判断显示
        if(GameData.MLXYYH_Game_Status == 0) {
            this.txt_time.visible = false;
            this.img_type.visible = true;
            this.img_type.source = "txt_mlxyyh_ddxz_ch_png";
            
            //发送消息
            basic.Dispatcher.dispatch(EventNames.GAME_SHOW_WAITING);
        }
        else if(GameData.MLXYYH_Game_Status == 1) {
            //数据赋值
            this.now_time = this.now_time - 2;

            //显示界面
            this.txt_time.visible = true;
            this.img_type.visible = false;

            //开始计时
            this.startTime();
            
            //发送消息
            basic.Dispatcher.dispatch(EventNames.GAME_Hide_WAITING);
        }
        else if(GameData.MLXYYH_Game_Status == 2) {
            this.txt_time.visible = false;
            this.img_type.visible = true;
            this.img_type.source = "txt_mlxyyh_kjz_ch_png";
            
            //发送消息
            basic.Dispatcher.dispatch(EventNames.GAME_Hide_WAITING);
        }
        else if(GameData.MLXYYH_Game_Status == 3) {
            //显示界面
            this.txt_time.visible = false;
            this.img_type.visible = true;
            this.img_type.source = "txt_mlxyyh_jsz_ch_png";
            
            //发送消息
            basic.Dispatcher.dispatch(EventNames.GAME_Hide_WAITING);
        }
    }

    //开始计时
    private startTime(): void {
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
    private onTiming(e: basic.TimerEvent): void {
        //数据赋值
        this.now_time -= 1;
        
        //发送消息
        if(this.now_time < 6 && GameData.MLXYYH_Game_Status == 1) {
            basic.Dispatcher.dispatch(EventNames.GAME_SHOW_COUNTDOWN,{ "nownum": this.now_time });
        }
        
        //显示时间
        this.txt_time.text = this.assShowTime(this.now_time);

        //判断播放声音
        if(GameData.MLXYYH_Game_Status == 1 && this.now_time == 0) {
            //数据赋值
            GameData.MLXYYH_Game_Status = 2;
            
            //隐藏菜单
            basic.Dispatcher.dispatch(EventNames.MLXYYH_HIDEMENU);
            
            //注销按钮
            basic.Dispatcher.dispatch(EventNames.MLXYYH_REMOVEBTN);
        }
    }

    //计时结束
    private onTimingComplete(e: basic.TimerEvent): void {
        //判断结束
        if(this.timer_timing) {
            this.timer_timing.stop();
            this.timer_timing.removeEventListener(basic.TimerEvent.TIMER,this.onTiming,this);
            this.timer_timing.removeEventListener(basic.TimerEvent.TIMER_COMPLETE,this.onTimingComplete,this);
            this.timer_timing = null;
        }
    }

    //时间显示文本赋值
    private assShowTime(_time: number): string {
        //定义变量
        var showtime: string;
        var time_minute: number;
        var time_second: number;

        //数据赋值
        time_second = _time % 60;
        time_minute = Math.floor(_time / 60);
        if(time_minute < 10) {
            showtime = "0" + time_minute.toString();
        }
        else {
            showtime = time_minute.toString();
        }
        if(time_second < 10) {
            showtime += "&0" + time_second.toString();
        }
        else {
            showtime += "&" + time_second.toString();
        }

        return showtime;
    }
    
}
