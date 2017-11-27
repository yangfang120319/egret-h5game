/**
 *
 * @夜市场-动画界面
 *
 */
class YSC_Play extends eui.Component {
    //定义变量
    private g_table: eui.Group[] = [];
    private img_mask: eui.Image[] = [];
    private img_light: eui.Image[] = [];
    private img_alllight: eui.Image[] = [];
    
    //定义数据变量
    private play_now: number;
    private over_index: number;
    private play_now_show: number;
    private play_middle_num: number;
    private play_Over_addnum: number;
    private play_Over_num: number = 3;
    private play_start_num: number = 4;
    private play_middle_time: number = 240;
    private play_start_time: number[] = [120,440,400,420];
    private play_Over_time: number[] = [420,420,410];
    private now_show_light: number = 0;
    private timer_start: basic.Timer = null;
    private timer_middle: basic.Timer = null;
    private timer_over: basic.Timer = null;
    private timer_Light: egret.Timer = null;
    
    //初始化
    createChildren(): void {
        super.createChildren();
        
        //数据赋值
        for(var i: number = 0;i < 4;i++) {
            //定义变量
            var table: eui.Group = this["g_table" + i];
            var mask: eui.Image = this["img_mask" + i];
            var light: eui.Image = this["img_light" + i];

            //数据赋值
            this.g_table[i] = table;
            this.img_mask[i] = mask;
            this.img_light[i] = light;
        }
        
        //数据赋值
        for(var j: number = 0;j < 28;j++) {
            //定义变量
            var img: eui.Image = this["img_light_" + j];
            
            //数据赋值
            this.img_alllight[j] = img;
        }
        
        //显示灯
        this.showAllLight();
	}
	
	//初始化界面
    playLight():void{
        //判断停止
        if(this.timer_Light) {
            this.timer_Light.stop();
            this.timer_Light.removeEventListener(basic.TimerEvent.TIMER,this.onShowLight,this);
            this.timer_Light = null;
        }
        
        //开始闪灯
        this.timer_Light = new egret.Timer(800);
        this.timer_Light.addEventListener(egret.TimerEvent.TIMER,this.onShowLight,this);
        this.timer_Light.start();
    }
    
    //清除界面
    stopLight():void{
        //判断停止
        if(this.timer_Light) {
            this.timer_Light.stop();
            this.timer_Light.removeEventListener(egret.TimerEvent.TIMER,this.onShowLight,this);
            this.timer_Light = null;
        }
    }
    
    //初始化界面
    info(_now_show: number): void {
        //隐藏界面
        for(var i: number = 0;i < 4;i++) {
            if(_now_show == -1) {
                this.img_mask[i].alpha = 0;
                this.img_light[i].alpha = 0;
            }
            else if(i == _now_show) {
                this.img_mask[i].alpha = 0;
                this.img_light[i].alpha = 0.8;
            }
            else {
                this.img_mask[i].alpha = 0.7;
                this.img_light[i].alpha = 0;
            }
        }
    }

    //清除界面
    clean(): void {
        //隐藏界面
        for(var i: number = 0;i < 4;i++) {
            this.img_mask[i].alpha = 0;
            this.img_light[i].alpha = 0;
        }
    }

    //初始化界面
    startPlay(_index: number,_time: number): void {
        //数据赋值
        this.play_now = 0;
        this.play_now_show = 0;
        this.over_index = _index;
        this.play_middle_num = 13;
        this.play_Over_addnum = 4 + this.over_index;

        //初始显示
        var _tween_alpha3: egret.Tween = egret.Tween.get(this.img_mask[3]).wait(_time).to({ alpha: 0.7 },300);
        var _tween_alpha2: egret.Tween = egret.Tween.get(this.img_mask[2]).wait(_time).to({ alpha: 0.7 },300);
        var _tween_alpha1: egret.Tween = egret.Tween.get(this.img_mask[1]).wait(_time).to({ alpha: 0.7 },300);
        var _tween_alpha0: egret.Tween = egret.Tween.get(this.img_light[0]).wait(_time).to({ alpha: 0.8 },300).call(() => {
            //播放声音
            basic.SoundManager.instance.playEffect("sound_ysc_run_start_mp3");

            //开始显示动画
            this.onStartPlay();
        });
    }
    
    //显示桌面
    private showTable(_table: number): void {
        //显示动画
        var _tween_mask: egret.Tween = egret.Tween.get(this.img_mask[_table]).to({ alpha: 0 },50);
        var _tween_light: egret.Tween = egret.Tween.get(this.img_light[_table]).to({ alpha: 1 },50);
    }

    //隐藏桌面
    private hideTable(_table: number): void {
        //显示动画
        var _tween_mask: egret.Tween = egret.Tween.get(this.img_mask[_table]).to({ alpha: 0.7 },50);
        var _tween_light: egret.Tween = egret.Tween.get(this.img_light[_table]).to({ alpha: 0 },50);
    }

    //开始动画
    private onStartPlay(): void {
        //开始动画
        this.timer_start = new basic.Timer(this.play_start_time[this.play_now],1);
        this.timer_start.addEventListener(basic.TimerEvent.TIMER_COMPLETE,this.onStartTimerComplete,this);
        this.timer_start.start();
    }

    //开始动画结束
    private onStartTimerComplete(e: basic.TimerEvent): void {
        //注销事件
        if(this.timer_start) {
            this.timer_start.stop();
            this.timer_start.removeEventListener(basic.TimerEvent.TIMER_COMPLETE,this.onStartTimerComplete,this);
            this.timer_start = null;
        }

        //显示动画
        if(this.play_now_show == 3) {
            this.showTable(0);
        }
        else {
            this.showTable(this.play_now_show + 1);
        }
        this.hideTable(this.play_now_show);

        //数据复制
        this.play_now += 1;
        this.play_now_show += 1;
        if(this.play_now_show > 3) {
            this.play_now_show = 0;
        }

        //判断显示
        if(this.play_now >= this.play_start_num) {
            //数据赋值
            this.play_now = 0;

            //开始中间动画
            this.onMiddlePlay();
        }
        else {
            //继续开始
            this.onStartPlay();
        }
    }

    //开始中间动画
    private onMiddlePlay(): void {
        //开始动画
        this.timer_middle = new basic.Timer(this.play_middle_time,this.play_middle_num);
        this.timer_middle.addEventListener(basic.TimerEvent.TIMER,this.onMiddleTimer,this);
        this.timer_middle.addEventListener(basic.TimerEvent.TIMER_COMPLETE,this.onMiddleTimerComplete,this);
        this.timer_middle.start();
    }

    //中间动画显示中
    private onMiddleTimer(e: basic.TimerEvent): void {
        //显示动画
        if(this.play_now_show == 3) {
            this.showTable(0);
        }
        else {
            this.showTable(this.play_now_show + 1);
        }
        this.hideTable(this.play_now_show);

        //数据复制
        this.play_now_show += 1;
        if(this.play_now_show > 3) {
            this.play_now_show = 0;
        }
    }

    //中间动画结束
    private onMiddleTimerComplete(e: basic.TimerEvent): void {
        //注销事件
        if(this.timer_middle) {
            this.timer_middle.stop();
            this.timer_middle.removeEventListener(basic.TimerEvent.TIMER,this.onMiddleTimer,this);
            this.timer_middle.removeEventListener(basic.TimerEvent.TIMER_COMPLETE,this.onMiddleTimerComplete,this);
            this.timer_middle = null;
        }

        //开始结束动画
        this.onOverPlay();
    }

    //开始结束动画
    private onOverPlay(): void {
        //开始动画
        this.timer_over = new basic.Timer(this.play_Over_time[Math.min(this.play_now,this.play_Over_num - 1)],1);
        this.timer_over.addEventListener(basic.TimerEvent.TIMER_COMPLETE,this.onOverTimerComplete,this);
        this.timer_over.start();
    }

    //开始动画结束
    private onOverTimerComplete(e: basic.TimerEvent): void {
        //注销事件
        if(this.timer_over) {
            this.timer_over.stop();
            this.timer_over.removeEventListener(basic.TimerEvent.TIMER_COMPLETE,this.onOverTimerComplete,this);
            this.timer_over = null;
        }

        //显示动画
        if(this.play_now_show == 3) {
            this.showTable(0);
        }
        else {
            this.showTable(this.play_now_show + 1);
        }
        this.hideTable(this.play_now_show);

        //数据复制
        this.play_now += 1;
        this.play_now_show += 1;
        if(this.play_now_show > 3) {
            this.play_now_show = 0;
        }

        //判断显示
        if(this.play_now >= this.play_Over_num + this.play_Over_addnum) {
            //播放声音
            basic.SoundManager.instance.playEffect("sound_ysc_run_over_mp3");

            //显示结束动画
            this.img_light[this.play_now_show].alpha = 1;
            var _tween_light: egret.Tween = egret.Tween.get(this.img_light[this.play_now_show]).wait(1200).
                to({ alpha: 0 },150).wait(150).
                to({ alpha: 1 },150).wait(250).
                to({ alpha: 0 },150).wait(150).
                to({ alpha: 1 },150).wait(250).
                to({ alpha: 0 },150).wait(150).
                to({ alpha: 1 },150).wait(250).
                to({ alpha: 0 },150).wait(150).
                to({ alpha: 1 },150).wait(250).call(() => {
                    //通知显示界面
                    basic.Dispatcher.dispatch(EventNames.YSC_SHOWOVERFACE);
                });
        }
        else {
            if(this.play_now >= this.play_Over_num) {
                //播放声音
                basic.SoundManager.instance.playEffect("sound_ysc_run_middle_mp3");
            }

            //继续开始
            this.onOverPlay();
        }
    }
    
    //显示灯
    private onShowLight(e: egret.TimerEvent): void {
        //数据赋值
        if(this.now_show_light == 0) {
            this.now_show_light = 1;
        }
        else {
            this.now_show_light = 0;
        }
        
        //显示灯
        this.showAllLight();
    }
    
    //显示灯
    private showAllLight(): void {
        //判断显示灯
        for(var i: number = 0;i < 28;i++) {
            //判断显示
            if(i % 2 == this.now_show_light) {
                this.img_alllight[i].alpha = 1;
            }
            else{
                this.img_alllight[i].alpha = 0.3;
            }
        }
    }
}
