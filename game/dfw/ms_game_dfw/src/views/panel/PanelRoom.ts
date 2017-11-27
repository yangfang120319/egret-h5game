/**
 *
 * @房间
 *
 */
class PanelRoom extends basic.PanelBase {
    //自定义界面
    private static _instance: PanelRoom;
    public static get instance(): PanelRoom {
        if(this._instance == undefined) {
            this._instance = new PanelRoom();
        }
        return this._instance;
    }

    //定义变量
    private img_tips: eui.Image;
    private img_title: eui.Image;
    private btn_close: eui.Button;
    private sp_qrcode: egret.Sprite;

    //皮肤设置
    protected init(): void {
        this.skinName = PanelRoomSkin;
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

        //关闭按钮
        this.btn_close.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onCloseBtn,this);
    }

    //显示界面
    show(_url: string,_type: number,callback: Function = null): void {
        //显示界面
        this.popup(this.funExit.bind(this));

        //显示二维码
        this.sp_qrcode = qr.QRCode.create(_url,250,250);
        this.addChild(this.sp_qrcode);
		this.sp_qrcode.scaleX = 1.1;
		this.sp_qrcode.scaleY = 1.1;
        this.sp_qrcode.x = 185;
        this.sp_qrcode.y = 85;

        //判断显示
        if(_type == 0){
            this.img_tips.visible = true;
            this.img_title.visible = false;
            this.img_title.source = "txt_g_fj_png";
        }
        else{
            this.img_tips.visible = false;
            this.img_title.visible = true;
            this.img_title.source = "txt_s_fz_png";
        }
    }

    //退出函数
    private funExit(): void {
        //退出事件
        this.dealAction();

		//移除二维码
		this.removeChild(this.sp_qrcode);
    }

    //关闭按钮
    private onCloseBtn(e:egret.TouchEvent): void{
        //播放声音
        basic.SoundManager.instance.playEffect("sound_btn_mp3");

        //退出函数
        this.funExit();
    }
}