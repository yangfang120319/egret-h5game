/**
 *
 * @选择按钮
 *
 */
class ChooseBtn extends eui.Component{
	//定义变量
	private callback: Function;
	public now_choose: number = -1;
	private btn_choose: eui.Button[]= [];

	//初始化
	public constructor() {
		super();

		//定义界面
        this.skinName = ChooseBtnSkin;

		//数据赋值
		for(var i: number = 0;i < 3 ;i++){
			//定义变量
			var now_btn: eui.Button = this["btn_choose" + i];

			//数据赋值
			this.btn_choose[i] = now_btn;
			this.btn_choose[i].visible = false;
			this.btn_choose[i].currentState = "up";

			//注册按钮
			this.btn_choose[i].addEventListener(egret.TouchEvent.TOUCH_TAP,this.onChooseBtn,this);
		}
	}

	//初始化界面
	info(_btn_detail: Array<string>,_callback: Function = null):void{
		//数据赋值
		this.callback = _callback;

		//初始化按钮
		for(var i:number = 0;i<_btn_detail.length;i++){
			//显示按钮
			this.btn_choose[i].visible = true;
			this.btn_choose[i].label = _btn_detail[i];
		}

		//判断显示高度
		if(_btn_detail.length == 2){
			this.height = 210;
		}
		else if(_btn_detail.length == 3){
			this.height = 310;
		}
	}

	//显示当前选项
	showChoose(_choose:number):void{
		//数据赋值
		this.now_choose = _choose;

		//显示按钮
		for(var i:number = 0;i < 3;i++){
			//判断显示
			if(i == this.now_choose){
				this.btn_choose[i].currentState = "down";
			}
			else{
				this.btn_choose[i].currentState = "up";
			}
		}
	}

	//选择按钮
	private onChooseBtn(e:egret.TouchEvent):void{
		//定义变量
		var btnnum: number = Number(e.target.name);

		//数据赋值
		this.now_choose = btnnum;

		//播放声音
        basic.SoundManager.instance.playEffect("sound_btn_mp3");

		//显示按钮
		for(var i:number = 0;i < 3;i++){
			//判断显示
			if(i == this.now_choose){
				this.btn_choose[i].currentState = "down";
			}
			else{
				this.btn_choose[i].currentState = "up";
			}
		}

		//显示回调函数
		if(this.callback){
			this.callback(this.now_choose);
		}
	}
}