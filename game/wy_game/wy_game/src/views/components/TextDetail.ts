/**
 *
 * @文本内容
 *
 */
class TextDetail extends eui.Component{
	//定义变量
	public is_start: Boolean;
	private str_detail: string;
	private now_action: number;
	private callback: Function;
	private actionback: Function;
	private action_speed: number;
	private txt_detail: eui.Label;
    private _timer_action: egret.Timer = null;

	//初始化
	public constructor() {
		super();

		//定义界面
        this.skinName = TextDetailSkin;

		//数据赋值
		this.now_action = 0;
		this.is_start = false;
		this.action_speed = 200;
	}

	//开始动画
	start(_detail: string,_callback: Function = null,_actionback: Function = null): void{
		//数据赋值
        this.now_action = 0;
		this.is_start = true;
		this.callback = _callback;
		this.actionback = _actionback;
		this.str_detail = this.assDetail(_detail);

		//清空文本
		this.txt_detail.text = "";

		//判断显示
		if(this.str_detail.indexOf("：")>=0){
			this.showText(this.str_detail.substring(0,this.str_detail.indexOf("：") + 1));
		}
        this.now_action = this.str_detail.indexOf("：");
			
        //开始动画
        this._timer_action = new egret.Timer(this.action_speed,this.str_detail.length - this.now_action);
        this._timer_action.addEventListener(egret.TimerEvent.TIMER,this.onAction,this);
        this._timer_action.addEventListener(egret.TimerEvent.TIMER_COMPLETE,this.onActionComplete,this);
        this._timer_action.start();
	}

	//停止
	stop():void{
		//结束动画
        if(this._timer_action){
            this._timer_action.stop();
            this._timer_action.removeEventListener(egret.TimerEvent.TIMER,this.onAction,this);
            this._timer_action.removeEventListener(egret.TimerEvent.TIMER_COMPLETE,this.onActionComplete,this);
            this._timer_action = null;
        }

		//判断赋值
		if(this.is_start == true){
			//数据赋值
			this.is_start = false;

			//显示文本
			this.showText(this.str_detail);
		}
	}

	//显示文本
	showText(_detail:string):void{
		//显示文本
		this.txt_detail.text = this.assDetail(_detail);

		//显示高度
		this.height = this.txt_detail.height;
	}

	//修改文本颜色
	changeTextColor():void{
		//定义游戏颜色
		this.txt_detail.textColor = 0xB2B2B2;

		//显示文本
		this.txt_detail.text = this.txt_detail.text;
	}

	//定义高度
	assHeight(_detail: string): number{
		//定义变量
		var show_height: number;

		//显示文本
		this.txt_detail.text = this.assDetail(_detail);
		show_height = this.txt_detail.height;
		this.txt_detail.text = "";

		return show_height;
	}

	//数据赋值
	private assDetail(_detail: string): string{
		//定义变量
		var now_detail: string = "";

		//数据赋值
		if(_detail.indexOf("**") >= 0){
			now_detail += _detail.substring(0,_detail.indexOf("**")) + UserData.User_Name;
			now_detail += _detail.substring(_detail.indexOf("**") + 2,_detail.length);
		}
		else{
			now_detail = _detail;
		}

		return now_detail;
	}

	//显示动画
    private onAction(e: egret.TimerEvent): void {
        //数据赋值
        this.now_action += 1;

        //判断显示
        if(this.now_action <= this.str_detail.length) {
			//显示文本
			this.showText(this.str_detail.substring(0,this.now_action));
        }

		//显示动画回调
		if(this.actionback){
			this.actionback();
		}
    }
    
    //动画结束
    private onActionComplete(e:egret.TimerEvent):void{
        //停止
		this.stop();

		//显示回调函数
		if(this.callback){
			this.callback();
		}
    }
}