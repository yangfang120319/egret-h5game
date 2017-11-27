/**
 *
 * @人物
 *
 */
class Person  extends eui.Component{
	//定义变量
	private img_back: eui.Image;
	private img_head: eui.Image;
	private rect_mask: eui.Rect;
	private img_mask: eui.Image;
	private img_light: eui.Image;
	private img_light_add: eui.Image;

	//数据变量
	private index: number;
	public now_place: number;
	private callback: Function;
	private move_to_place: number;
	private show_x: number[] = [];
	private show_y: number[] = [];
	private _timer_action: egret.Timer = null;
	
	//初始化
    createChildren(): void {
        super.createChildren();

		//定义遮罩
		this.rect_mask.visible = true;
		this.img_head.mask = this.rect_mask;
		this.img_light.visible = false;
		this.img_light_add.visible = false;
	}

	//人物初始化
	info(_index: number,_head: string,_place: number,_show_x: Array<number>,_show_y: Array<number>): void{
		//数据复制
		this.index = _index;
		this.show_x = _show_x;
		this.show_y = _show_y;
		this.now_place =_place;
		
		//显示头像
		if(_head != "" && _head != null){
			this.img_head.source = _head;
		}
		else{
			this.img_head.source = "";
		}

		//显示底
		this.img_back.source = "icon_g_head" + _index.toString() + "_png";

		//停止动画
		if(this._timer_action){
			this._timer_action.stop();
			this._timer_action.removeEventListener(egret.TimerEvent.TIMER,this.onAction,this);
			this._timer_action.removeEventListener(egret.TimerEvent.TIMER_COMPLETE,this.onActionComplete,this);
			this._timer_action = null;
		}
	}

	//清楚界面
	clean(): void{
		//数据赋值
		this.now_place = 0;

		//显示位置
		this.x = this.show_x[this.now_place];
		this.y = this.show_y[this.now_place];

		//停止动画
		if(this._timer_action){
			this._timer_action.stop();
			this._timer_action.removeEventListener(egret.TimerEvent.TIMER,this.onAction,this);
			this._timer_action.removeEventListener(egret.TimerEvent.TIMER_COMPLETE,this.onActionComplete,this);
			this._timer_action = null;
		}
	}

	//开始人移动动画
	startMove(_move_to: number,_callback: Function):void{
		//定义变量
		var action_times: number;

		//停止动画
		if(this._timer_action){
			this._timer_action.stop();
			this._timer_action.removeEventListener(egret.TimerEvent.TIMER,this.onAction,this);
			this._timer_action.removeEventListener(egret.TimerEvent.TIMER_COMPLETE,this.onActionComplete,this);
			this._timer_action = null;
		}

		//数据赋值
		this.callback = _callback;
		this.move_to_place = Math.min(22,_move_to);
		action_times = Math.abs(_move_to - this.now_place) + 1;

		//开始动画
		this._timer_action = new egret.Timer(700,action_times);
		this._timer_action.addEventListener(egret.TimerEvent.TIMER,this.onAction,this);
		this._timer_action.addEventListener(egret.TimerEvent.TIMER_COMPLETE,this.onActionComplete,this);
		this._timer_action.start();
	}

	//显示光
	showLight(_type:number):void{
		if(_type == 0){
			this.img_light.visible = false;
			this.img_light_add.visible = false;
		}
		else{
			this.img_light.visible = true;
			this.img_light_add.visible = true;
		}
	}

	//停止移动
	stopMove():void{
		//停止动画
		if(this._timer_action){
			this._timer_action.stop();
			this._timer_action.removeEventListener(egret.TimerEvent.TIMER,this.onAction,this);
			this._timer_action.removeEventListener(egret.TimerEvent.TIMER_COMPLETE,this.onActionComplete,this);
			this._timer_action = null;
		}

		//判断赋值
		this.now_place = this.move_to_place;

		//显示位置
		this.x = this.show_x[this.now_place];
		this.y = this.show_y[this.now_place];
		
		//显示回调函数
		if(this.callback){
			this.callback();
		}
	}
	
	//显示状态
	showStatus(_status: number):void{
		//显示界面
		if(_status == 0){
			this.img_mask.visible = false;
		}
		else{
			this.img_mask.visible = true;
		}
	}

	//动画函数
	private onAction(e:egret.TimerEvent): void{
		//定义变量
		var is_show_action: boolean = false;

		//数据赋值
		if(this.now_place > this.move_to_place){
			this.now_place -= 1;
			is_show_action = true;
		}
		else if(this.now_place < this.move_to_place){
			this.now_place += 1;
			is_show_action = true;
		}

		//判断显示动画
		if(is_show_action == true){
			//显示位置
			if(this.now_place > 21){
				this.x = this.show_x[0];
				this.y = this.show_y[0];
			}
			else{
				this.x = this.show_x[this.now_place];
				this.y = this.show_y[this.now_place];
			}
			
			//显示动画
			var _tween_scaleY: egret.Tween = egret.Tween.get(this)
				.to({scaleY: 0.7}, 200,egret.Ease.backInOut)
				.to({scaleY: 0.8}, 200,egret.Ease.backInOut);
		}
	}

	
	//动画结束
	private onActionComplete(e:egret.TimerEvent): void{
		//停止移动
		this.stopMove();
	}
}