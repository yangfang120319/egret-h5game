/**
 *
 * @骰子
 *
 */
class Dice extends eui.Component{
	//定义变量
	private img_dice: eui.Image;
	private img_action: eui.Image;
	private now_dice_num: number;
	private now_action: number;
	private action_times: number = 2;
	private now_action_times: number;
	private _timer_action: egret.Timer = null;
	private callback: Function;
	
	//初始化
    createChildren(): void {
        super.createChildren();

		//初始化界面
		this.now_dice_num = 1;
		this.img_dice.visible = true;
		this.img_action.visible = false;
		this.img_dice.source = "icon_g_dice" + this.now_dice_num.toString() + "_png";
	}

	//开始动画
	start(_dice: number,_callback: Function):void{
		//数据赋值
		this.now_action = 0;
		this.now_action_times = 0;
		this.now_dice_num = _dice;
		this.callback = _callback;

		//显示界面
		this.img_dice.visible = false;
		this.img_action.visible = true;
		this.img_dice.source = "icon_g_dice" + this.now_dice_num.toString() + "_png";
		this.img_action.source = "icon_g_diceaction" + this.now_action.toString() + "_png";

		//开始动画
		this._timer_action = new egret.Timer(60);
		this._timer_action.addEventListener(egret.TimerEvent.TIMER,this.onShowAction,this);
		this._timer_action.start();
	}

	//显示动画
	private onShowAction(e:egret.TimerEvent): void{
		//数据赋值
		this.now_action += 1;
		if(this.now_action >= 15){
			//数据赋值
			this.now_action_times += 1;

			//判断显示
			if(this.now_action_times < this.action_times){
				//数据赋值
				this.now_action = 7;

				//显示界面
				this.img_action.source = "icon_g_diceaction" + this.now_action.toString() + "_png";
			}
			else{
				//停止动画
				this.stop();
			}
		}
		else{
			//显示界面
			this.img_action.source = "icon_g_diceaction" + this.now_action.toString() + "_png";
		}
	}

	//显示骰子
	show(_dice: number): void{
		//数据赋值
		this.now_dice_num = _dice;

		//显示界面
		this.img_dice.visible = true;
		this.img_action.visible = false;
		this.img_dice.source = "icon_g_dice" + this.now_dice_num.toString() + "_png";
	}

	//停止动画
	stop():void{
		//停止动作
		if(this._timer_action){
			this._timer_action.stop();
			this._timer_action.removeEventListener(egret.TimerEvent.TIMER,this.onShowAction,this);
			this._timer_action = null;
		}

		//显示界面
		this.img_dice.visible = true;
		this.img_action.visible = false;
		this.img_dice.source = "icon_g_dice" + this.now_dice_num.toString() + "_png";

		//显示回调函数
		if(this.callback){
			this.callback();
		}
	}
}