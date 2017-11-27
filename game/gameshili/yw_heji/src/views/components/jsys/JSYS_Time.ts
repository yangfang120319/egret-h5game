/**
 *
 * @倒计时
 * 
 */
class JSYS_Time extends eui.Component {
    //定义变量
    private now_time: number;
    private g_count:eui.Group;
    private img_count: eui.Image;
    private com_light: eui.Component;
    private txt_time: eui.BitmapLabel;
    private timer: basic.Timer = null;
    private timer_count: basic.Timer = null;
    private _tween_scaleX: egret.Tween = null;
    private _tween_scaleY: egret.Tween = null;
    private _tween_rotation: egret.Tween = null;
    private now_count: number;
    private callback: Function;

    //初始化
    createChildren(): void {
        super.createChildren();
        
        //隐藏图片
        this.g_count.visible = false;
    }
    
    //开始计时
    start(_time: number,_callback:Function=null): void {
        //数据赋值
        this.now_time = _time;
        this.callback = _callback;
        
        //隐藏图片
        this.g_count.visible = false;
        
        //判断开始
        if(GameData.JSYS_State == 1 && this.now_time > 0) {
            //显示文本
            this.showText();

            //开始计时
            this.timer = new basic.Timer(1000,this.now_time);
            this.timer.addEventListener(basic.TimerEvent.TIMER,this.onTimer,this);
            this.timer.addEventListener(basic.TimerEvent.TIMER_COMPLETE,this.onTimerComplete,this);
            this.timer.start();
        }
        else {
            //显示文本
            this.txt_time.text = "00";
        }
    }
    
    //停止计时
    clean(): void {
        //判断停止
        if(this.timer) {
            this.timer.stop();
            this.timer.removeEventListener(basic.TimerEvent.TIMER,this.onTimer,this);
            this.timer.removeEventListener(basic.TimerEvent.TIMER_COMPLETE,this.onTimerComplete,this);
            this.timer = null;
        }
        
        //停止计时
        if(this.timer_count) {
            this.timer_count.stop();
            this.timer_count.removeEventListener(basic.TimerEvent.TIMER,this.onCount,this);
            this.timer_count.removeEventListener(basic.TimerEvent.TIMER_COMPLETE,this.onCountComplete,this);
            this.timer_count = null;
        }
        
        //停止动画
        if(this._tween_scaleX) {
            this._tween_scaleX.setPaused(true);
            this._tween_scaleX = null;
        }
        if(this._tween_scaleY) {
            this._tween_scaleY.setPaused(true);
            this._tween_scaleY = null;
        }
        if(this._tween_rotation) {
            this._tween_rotation.setPaused(true);
            this._tween_rotation = null;
        }
        
        //隐藏图片
        this.g_count.visible = false;
    }

    //显示文本
    private showText(): void {
        //判断显示
        if(this.now_time > 0) {
            //判断显示
            if(this.now_time < 10) {
                this.txt_time.text = "0" + this.now_time.toString();
            }
            else{
                this.txt_time.text = this.now_time.toString();
            }
        }
        else{
            //显示文本
            this.txt_time.text = "00";
        }
    }

    //计时中
    private onTimer(e: basic.TimerEvent): void {
        //数据赋值
        this.now_time -= 1;

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

        //显示回调函数
        if(this.callback != null) {
            this.callback();
        }
        
        //显示倒计时
        this.startCount();
    }
    
    //开始倒计时
    private startCount():void{
        //显示图片
        this.now_count = 3;
        this.g_count.visible = true;
        
        //显示动画
        this.showCountAction(this.now_count);
        
        //开始动画
        this.com_light.rotation = 0;
        this._tween_rotation = egret.Tween.get(this.com_light,{ loop: true }).to({ rotation: 360 },5000);
        
        //开始计时
        this.timer_count = new basic.Timer(1000,3);
        this.timer_count.addEventListener(basic.TimerEvent.TIMER,this.onCount,this);
        this.timer_count.addEventListener(basic.TimerEvent.TIMER_COMPLETE,this.onCountComplete,this);
        this.timer_count.start();
    }
    
    //计时中
    private onCount(e: basic.TimerEvent): void {
        //数据赋值
        this.now_count -= 1;
        
        //显示文本
        if(this.now_count > 0) {
            this.showCountAction(this.now_count);
        }
    }
    
    //计时结束
    private onCountComplete(e: basic.TimerEvent): void {
        //停止计时
        if(this.timer_count) {
            this.timer_count.stop();
            this.timer_count.removeEventListener(basic.TimerEvent.TIMER,this.onCount,this);
            this.timer_count.removeEventListener(basic.TimerEvent.TIMER_COMPLETE,this.onCountComplete,this);
            this.timer_count = null;
        }
        
        //停止动画
        if(this._tween_scaleX) {
            this._tween_scaleX.setPaused(true);
            this._tween_scaleX = null;
        }
        if(this._tween_scaleY) {
            this._tween_scaleY.setPaused(true);
            this._tween_scaleY = null;
        }
        if(this._tween_rotation) {
            this._tween_rotation.setPaused(true);
            this._tween_rotation = null;
        }
        
        //隐藏图片
        this.g_count.visible = false;
    }
    
    //显示动画
    private showCountAction(_num: number): void {
        //播放声音
        basic.SoundManager.instance.playEffect("sound_jsys_countdown_mp3");
        
        //显示界面
        this.g_count.scaleX = 0;
        this.g_count.scaleY = 0;
        this.img_count.source = "txt_jsys_countdown" + _num + "_png";
        this._tween_scaleX = egret.Tween.get(this.g_count).to({ scaleX: 1 },400,egret.Ease.backOut);
        this._tween_scaleY = egret.Tween.get(this.g_count).to({ scaleY: 1 },400,egret.Ease.backOut);
    }
    
}
