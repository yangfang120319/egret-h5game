/**
 *
 * @从链接提示
 *
 */
class PanelConnectTips extends basic.PanelBase {
    //自定义界面
    private static _instance: PanelConnectTips;
    public static get instance(): PanelConnectTips {
        if(this._instance == undefined) {
            this._instance = new PanelConnectTips();
        }
        return this._instance;
    }

    //定义变量
    private btn_yes: eui.Button;

    //皮肤设置
    protected init(): void {
        this.skinName = PanelConnectTipsSkin;
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

        //注册按钮
        this.btn_yes.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onYesBtn,this);
    }

    //显示界面
    show(callback: Function = null): void {
        //显示界面
        this.popup();
    }

    //退出函数
    funExit(): void {
        //退出事件
        this.dealAction();
    }
	
    //确定按钮
    private onYesBtn(e: egret.TouchEvent): void{
        //播放声音
        basic.SoundManager.instance.playEffect("sound_btn_mp3");
		
		//链接服务器
		Comm.instance.init();
    }
}