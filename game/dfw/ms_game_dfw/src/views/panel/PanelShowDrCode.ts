/**
 *
 * @关注公众号
 *
 */
class PanelShowDrCode  extends basic.PanelBase {
    //自定义界面
    private static _instance: PanelShowDrCode;
    public static get instance(): PanelShowDrCode {
        if(this._instance == undefined) {
            this._instance = new PanelShowDrCode();
        }
        return this._instance;
    }

    //皮肤设置
    protected init(): void {
        this.skinName = PanelShowDrCodeSkin;
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
    }

    //显示界面
    show(callback: Function = null): void {
        //显示界面
        this.popup(this.funExit.bind(this));

        //显示二维码
        this.showCode();
    }

    //退出函数
    private funExit(): void {
        //退出事件
        this.dealAction();

		//移除二维码
		hideQrCode();
    }

	//显示二维码
    private showCode():void{
        //定义变量
        var top_px: number;
        var img_url: string;
        var top_show: number;
        var height_px: number;
        var show_height: number = 300;

        //判断显示
        img_url = "https://game.yile.vip/h5/erweima.jpg";
        height_px = window.innerWidth * show_height / basic.StageProxy.width;
        top_px = window.innerHeight - (basic.StageProxy.height * 0.57 + 125) * (window.innerWidth / basic.StageProxy.width);
        
        //显示关注微信公众号
        showQrCode(
            img_url,
            top_px,
            height_px
        );
    }
}