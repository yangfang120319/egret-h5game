/**
 *
 * @author 
 *
 */
class Panel_SG_PaiXing extends basic.PanelBase {
    //自定义界面
    private static _instance: Panel_SG_PaiXing;
    public static get instance(): Panel_SG_PaiXing {
        if(this._instance == undefined) {
            this._instance = new Panel_SG_PaiXing();
        }
        return this._instance;
    }

    //定义变量
    private rect_back: eui.Rect;

    //皮肤设置
    protected init(): void {
        this.skinName = Panel_SG_PaiXingSkin;
    }

    //定义界面
    constructor() {
        super(basic.dialogEffect.Flew,{
            duration: 400,
            direction: 'left',
            withFade: true
        },basic.dialogEffect.Flew,{ duration: 400,direction: 'left',withFade: true });
    }

    //初始化界面
    createChildren(): void {
        super.createChildren();

        //注册按钮
        this.rect_back.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onCloseBtn,this);
    }

    //显示界面
    show(callback: Function = null): void {
        //显示宽度
        this.width = basic.StageProxy.width;

        //数据赋值
        basic.PopUpManager.modalMaskAlpha = 0;

        //显示界面
        this.popup(this.funExit.bind(this));
    }

    //退出函数
    private funExit(): void {
        //播放声音
        basic.SoundManager.instance.playEffect("sound_btn_mp3");

        //数据赋值
        basic.PopUpManager.modalMaskAlpha = 0.6;
        //basic.PopUpManager.modalMaskIsShow = true;
        //退出界面
        this.dealAction();
    }

    //退出按钮
    private onCloseBtn(e: egret.TouchEvent) {
        //退出函数
        this.funExit();
    }
}