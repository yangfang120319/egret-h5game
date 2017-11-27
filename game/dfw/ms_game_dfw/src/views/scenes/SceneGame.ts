/**
 *
 * @游戏界面
 *
 */
class SceneGame extends basic.SceneBase {
	//定义变量
	private run: Run;
	private user: User;
	private g_btn: eui.Group;
	private img_back: eui.Image;
	private countdown: CountDown;
	private btn_tsz: eui.Button;
	private btn_blz: eui.Button;
	private is_start_info: boolean;
	private _tween_dice_y: egret.Tween = null;
	private _tween_stop_y: egret.Tween = null;
	private _tween_prevent_y: egret.Tween = null;
	private is_countdown_start: boolean;
	private txt_nowplay: eui.Label;

	//定义界面
    public constructor() {
        super();

        //定义界面
        this.skinName = SceneGameSkin;

		//注册按钮
		this.btn_tsz.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onTszBtn,this);
		this.btn_blz.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onBlzBtn,this);

    }


	//投骰子
	private onTszBtn(e:egret.TouchEvent): void{
		
	}


	//避雷针
	private onBlzBtn(e:egret.TouchEvent): void{
		
	}


   
    //定义适配
    onShowPlace():void{
        //定义变量
		var ratezoom: number;

		//判断显示
		if(basic.StageProxy.height > 1334){
			//定义大小
			this.run.scaleX = 0.96;
			this.run.scaleY = 0.9;
			this.user.scaleX = 1;
			this.user.scaleY = 1;
		
			this.btn_tsz.scaleX = 1;
			this.btn_tsz.scaleY = 1;
			this.btn_blz.scaleX = 1;
			this.btn_blz.scaleY = 1;
	

			//定义大小和位置
			this.user.y = 0;
			this.user.width = 750;
			//this.run.y = 130 + (basic.StageProxy.height - 1334)/2;
		}
		else if(basic.StageProxy.height > 1250){
			//数据赋值
			ratezoom = (basic.StageProxy.height - 1250)/84;

			//定义大小
			this.run.scaleX = 0.9 + 0.06 * ratezoom;
			this.run.scaleY = 0.8 + 0.1 * ratezoom;
			this.user.scaleX = 0.9 + 0.1 * ratezoom;
			this.user.scaleY = 0.9 + 0.1 * ratezoom;
			this.btn_tsz.scaleX = 0.9 + 0.1 * ratezoom;
			this.btn_tsz.scaleY = 0.9 + 0.1 * ratezoom;
			this.btn_blz.scaleX = 0.9 + 0.1 * ratezoom;
			this.btn_blz.scaleY = 0.9 + 0.1 * ratezoom;
		

			//定义大小和位置
			this.user.y = -4 + 4 * ratezoom;
			//this.run.y = 115 + 15 * ratezoom;
			this.user.width = 750 / this.user.scaleX;
		}else if(basic.StageProxy.height > 1136){
			//数据赋值
			ratezoom = (basic.StageProxy.height - 1136)/114;

			//定义大小
			this.run.scaleX = 0.84 + 0.1 * ratezoom;
			this.run.scaleY = 0.7 + 0.1 * ratezoom;
			this.user.scaleX = 0.9 + 0.1 * ratezoom;
			this.user.scaleY = 0.9 + 0.1 * ratezoom;
			this.btn_tsz.scaleX = 0.9 + 0.1 * ratezoom;
			this.btn_tsz.scaleY = 0.9 + 0.1 * ratezoom;
			this.btn_blz.scaleX = 0.9 + 0.1 * ratezoom;
			this.btn_blz.scaleY = 0.9 + 0.1 * ratezoom;
		

			//定义大小和位置
			this.user.y = -4 + 4 * ratezoom;
		}else if(basic.StageProxy.height > 960){
			//数据赋值
			ratezoom = (basic.StageProxy.height - 960)/176;

			//定义大小
			this.run.scaleX = 0.8 + 0.04 * ratezoom;
			this.run.scaleY = 0.55 + 0.15 * ratezoom;
			this.user.scaleX = 0.9 + 0.1 * ratezoom;
			this.user.scaleY = 0.9 + 0.1 * ratezoom;
			this.btn_tsz.scaleX = 0.9 + 0.1 * ratezoom;
			this.btn_tsz.scaleY = 0.9 + 0.1 * ratezoom;
			this.btn_blz.scaleX = 0.9 + 0.1 * ratezoom;
			this.btn_blz.scaleY = 0.9 + 0.1 * ratezoom;
		

			//定义大小和位置
			this.user.y = -4 + 4 * ratezoom;
		}
		else{
			//定义大小
			this.run.scaleX = 0.95;
			this.user.scaleX = 0.9;
			this.user.scaleY = 0.9;
			this.btn_tsz.scaleX = 0.9;
			this.btn_tsz.scaleY = 0.9;
			this.btn_blz.scaleX = 0.9;
			this.btn_blz.scaleY = 0.9;
			
			this.run.scaleY = (basic.StageProxy.height - 225)/1080;

			//定义大小和位置
			this.user.y = -4;
			this.run.y = 115;
			this.user.width = 750 / this.user.scaleX;
		}

		//显示遮罩位置
		//this.run.showMaskPlace();

		//显示位置
		this.user.showPlace(this.user.width);

		
    }
}