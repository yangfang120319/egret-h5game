/**
 *
 * @头像
 *
 */
class CountDown extends eui.Component{
	//定义变量
	private now_count: number;
	private callback: Function;
	private img_countdown: eui.Image;
	private _timer_count: egret.Timer = null;
	
	//初始化
    createChildren(): void {
        super.createChildren();

		//显示倒计时
		this.visible = false;
	}

	//开始倒计时
	start(_callback: Function):void{
		//数据赋值
		this.now_count = 3;
		this.callback = _callback;

		//显示界面
		this.visible = true;

		//显示界面
		this.showNowNum();

		//开始计时
		this._timer_count = new egret.Timer(1000,4);
		this._timer_count.addEventListener(egret.TimerEvent.TIMER,this.onCountDown,this);
		this._timer_count.addEventListener(egret.TimerEvent.TIMER_COMPLETE,this.onCountDownComplete,this);
		this._timer_count.start();
	}

	//计时中
	private onCountDown(e:egret.TimerEvent): void{
		//数据赋值
		this.now_count -= 1;

		//显示界面
		if(this.now_count >= 0){
			this.showNowNum();
		}
	}

	//计时结束
	private onCountDownComplete(e:egret.TimerEvent): void{
		//停止计时
		this.stop();
	}

	//停止计时
	stop():void{
		//停止计时
		if(this._timer_count){
			this._timer_count.stop();
			this._timer_count.removeEventListener(egret.TimerEvent.TIMER,this.onCountDown,this);
			this._timer_count.removeEventListener(egret.TimerEvent.TIMER_COMPLETE,this.onCountDownComplete,this);
			this._timer_count = null;
		}

		//回调函数
		this.callback();

		//隐藏界面
		this.visible = false;
	}

	//显示当前数字
	private showNowNum():void{
		//显示图片
		this.img_countdown.source = "txt_g_countdown" + this.now_count.toString() + "_png";

		//显示动画
		this.img_countdown.scaleX = 5;
		this.img_countdown.scaleY = 5;

		//显示动画
		var  _tween_scaleX: egret.Tween = egret.Tween.get(this.img_countdown).to({scaleX:1},200);
		var  _tween_scaleY: egret.Tween = egret.Tween.get(this.img_countdown).to({scaleY:1},200);
	}
}