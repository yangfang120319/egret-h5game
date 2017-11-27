/**
 *
 * @充值提示
 *
 */
class PanelShopTips  extends basic.PanelBase {
    //自定义界面
    private static _instance: PanelShopTips;
    public static get instance(): PanelShopTips {
        if(this._instance == undefined) {
            this._instance = new PanelShopTips();
        }
        return this._instance;
    }

    //定义变量
    private btn_no: eui.Button;
    private btn_yes: eui.Button;

    //皮肤设置
    protected init(): void {
        this.skinName = PanelShopTipsSkin;
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
        this.btn_no.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onNoBtn,this);
        this.btn_yes.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onYesBtn,this);
    }

    //显示界面
    show(callback: Function = null): void {
        //显示界面
        this.popup(this.funExit.bind(this));
    }

    //退出函数
    private funExit(): void {
        //退出事件
        this.dealAction();
    }

    //取消按钮
    private onNoBtn(e:egret.TouchEvent): void{
        //播放声音
        basic.SoundManager.instance.playEffect("sound_btn_mp3");

		//退出对话框
		this.funExit();
    }

    //确定按钮
    private onYesBtn(e: egret.TouchEvent): void{
        //播放声音
        basic.SoundManager.instance.playEffect("sound_btn_mp3");

		//显示充值界面
        window.location.href = GameData.Shop_Url;
		
		//退出对话框
		this.funExit();
    }
}