/**
 *
 * @遥控骰子
 *
 */
class PanelChooseDice extends basic.PanelBase {
    
    //自定义界面
    private static _instance: PanelChooseDice;
    public static get instance(): PanelChooseDice {
        if(this._instance == undefined) {
            this._instance = new PanelChooseDice();
        }
        return this._instance;
    }

    //定义变量
    private btn_yes: eui.Button;
	private btn_dice: eui.Button[] = [];
	private now_dice: number;

    //皮肤设置
    protected init(): void {
        this.skinName = PanelChooseDiceSkin;
    }
    
    //定义界面
    constructor() {
        super(basic.dialogEffect.Scale,{
            withFade: true,
            ease: egret.Ease.backOut
        },basic.dialogEffect.Scale,{ withFade: true,ease: egret.Ease.backIn });
    }

    //初始化界面
    createChildren(): void {
        super.createChildren();

		//数据赋值
		for(var i: number = 1;i < 7;i++){
			//定义变量
			var now_btn: eui.Button = this["btn_dice" + i];

			//数据赋值
			this.btn_dice[i] = now_btn;
			this.btn_dice[i].currentState = "up";

			//注册按钮
			this.btn_dice[i].addEventListener(egret.TouchEvent.TOUCH_TAP,this.onDiceBtn,this);
		}
        

        //注册按钮
        this.btn_yes.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onYesBtn,this);
    }

    //显示界面
    show(callback: Function = null): void {
        //数据赋值
        this._callback = callback;

        //显示界面
        this.popup( this.funExit.bind(this));

        //显示按钮状态
		this.now_dice = 0;
		for(var i: number = 1;i < 7;i++){
			if(i == this.now_dice){
				this.btn_dice[i].currentState = "down";
			}
			else{
				this.btn_dice[i].currentState = "up";
			}
		}
    }

    //退出函数
    private funExit(): void {
        //退出事件
        this.dealAction();
    }

    //性别按钮
    private onDiceBtn(e:egret.TouchEvent): void{
        //定义变量
        this.now_dice = Number(e.target.name);
        
        //播放声音
        basic.SoundManager.instance.playEffect("sound_btn_mp3");
		
		//显示按钮状态
		for(var i: number = 1;i < 7;i++){
			if(i == this.now_dice){
				this.btn_dice[i].currentState = "down";
			}
			else{
				this.btn_dice[i].currentState = "up";
			}
		}
    }

    //确定按钮
    private onYesBtn(e: egret.TouchEvent): void{
        //播放声音
        basic.SoundManager.instance.playEffect("sound_btn_mp3");

        //判断显示
        if(this.now_dice > 0){
            if(GameData.jl_dj_num > 0){
                //数据赋值
                GameData.jl_dj_num -= 1;

                //保存数据
                basic.Dispatcher.dispatch(EventNames.SHOW_TIPSTIMES);

                //发送消息
                Comm.instance.sendSocket({"type":"playDice","num":this.now_dice});

                //退出设置
                this.funExit();
            }
            else{
                if(GameData.tips_num[0] > 0){
                    if(UserData.User_Gold >= GameData.DJ_Gold_Dice){
                        //数据赋值
                        GameData.tips_num[0] -= 1;

                        //保存数据
                        basic.Dispatcher.dispatch(EventNames.SHOW_TIPSTIMES);

                        //发送消息
                        Comm.instance.sendSocket({"type":"playDice","num":this.now_dice});

                        //退出设置
                        this.funExit();
                    }
                    else{
                        //退出设置
                        this.funExit();

                        //显示提示界面
                        egret.setTimeout(()=>{
                            PanelShopTips.instance.show();
                        },this,300);
                    }
                }
                else{
                    basic.Dispatcher.dispatch(EventNames.SHOW_TIPS,{"msg":"超出使用次数"});
                }
            }
        }
        else{
            basic.Dispatcher.dispatch(EventNames.SHOW_TIPS,{"msg":"请选择需要的点数"});
        }
    }
}