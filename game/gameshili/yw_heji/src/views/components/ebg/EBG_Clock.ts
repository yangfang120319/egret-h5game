/**
 *
 * @二八杠时钟
 *
 */
class EBG_Clock extends eui.Component {
    //定义变量
    private txt_time: eui.Label;
    private img_text: eui.Image;
    private num_timer: number;//计时个数
    private num_nowtimer: number;//当前计时
    private timer: basic.Timer = null;//计时器
    private _tween_scaleX: egret.Tween = null;
    private _tween_scaleY: egret.Tween = null;

    //初始化
    createChildren(): void {
        super.createChildren();
    }

    //开始计时
    start(_time: number): void {
        //停止计时
        this.stop();
        
        //数据赋值
        this.num_nowtimer = 0;
        this.num_timer = _time - 1;
        
        //显示文本
        this.showText();
        
        //显示界面
        this.visible = true;
        
        //开始计时
        this.timer = new basic.Timer(1000,this.num_timer);
        this.timer.addEventListener(basic.TimerEvent.TIMER,this.onTimer,this);
        this.timer.addEventListener(basic.TimerEvent.TIMER_COMPLETE,this.onTimerComplete,this);
        this.timer.start();
    }

    //停止计时
    stop(): void {
        //判断停止
        if(this.timer) {
            this.timer.stop();
            this.timer.removeEventListener(basic.TimerEvent.TIMER,this.onTimer,this);
            this.timer.removeEventListener(basic.TimerEvent.TIMER_COMPLETE,this.onTimerComplete,this);
            this.timer = null;
        }

        //停止缓动
        if(this._tween_scaleX) {
            this._tween_scaleX.setPaused(true);
        }
        if(this._tween_scaleY) {
            this._tween_scaleY.setPaused(true);
        }
    }

    //显示文本
    private showText(): void {
        //定义变量
        var num_now: number = this.num_timer - this.num_nowtimer - 1;

        //显示文本
        this.txt_time.text = num_now.toString();

        //判断显示动画
        if(num_now < 6) {
            //判断播放声音
            if(num_now < 4) {
                basic.SoundManager.instance.playEffect("sound_ebg_countdown_mp3");
            }
            
            //显示动画
            this._tween_scaleX = egret.Tween.get(this.txt_time).to({ scaleX: 1.4 },100).to({ scaleX: 1 },100);
            this._tween_scaleY = egret.Tween.get(this.txt_time).to({ scaleY: 1.4 },100).to({ scaleY: 1 },100);
        }
        else {
            this.txt_time.scaleX = 1;
            this.txt_time.scaleY = 1;
        }
    }

    //计时中
    private onTimer(e: basic.TimerEvent): void {
        //数据赋值
        this.num_nowtimer += 1;

        //显示文本
        this.showText();
    }

    //计时结束
    private onTimerComplete(e: basic.TimerEvent): void {
        //停止计时
        if(this.timer) {
            this.timer.stop();
            this.timer.removeEventListener(basic.TimerEvent.TIMER,this.onTimer,this);
            this.timer.removeEventListener(basic.TimerEvent.TIMER_COMPLETE,this.onTimerComplete,this);
            this.timer = null;
        }
        
        //数据赋值
        GameData.EBG_State = 2;

        //隐藏界面
        this.visible = false;
    }
}
