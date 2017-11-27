/**
 *
 * @退出提示
 *
 */
class PanelExit extends basic.PanelBase {
    private static _instance: PanelExit;
    public static get instance(): PanelExit {
        if(this._instance == undefined) {
            this._instance = new PanelExit();
        }
        return this._instance;
    }

    //定义变量
    private btn_jixu: eui.Button;
    private btn_tuichu: eui.Button;

    //定义界面
    constructor() {
        super(basic.dialogEffect.Scale,{
            withFade: true,
            ease: egret.Ease.backOut
        },basic.dialogEffect.Scale,{ withFade: true,ease: egret.Ease.backIn });
    }

    //初始化
    createChildren(): void {
        super.createChildren();

        //定义界面
        this.skinName = PanelExitSkin;

        //注册按钮
        this.btn_jixu.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onJiXuBtn,this);
        this.btn_tuichu.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onTuiChuBtn,this);
    }

    //显示界面
    show(callback: Function = null): void {
        //显示界面
        this.popup(this.funExit.bind(this));
    }

    //退出对话框
    private funExit(): void {
        //退出界面
        this.dealAction();
    }

    //继续按钮
    private onJiXuBtn(e: egret.TouchEvent) {
        //播放声音
        basic.SoundManager.instance.playEffect("sound_btn_mp3");

        //退出对话框
        this.funExit();
    }

    //退出按钮
    private onTuiChuBtn(e: egret.TouchEvent) {
        //播放声音
        basic.SoundManager.instance.playEffect("sound_btn_mp3");
        
        //退出对话框
        this.funExit();
        
        //退出游戏
        if(GameData.Game_Type==-1){
            //调用退出函数
            window["AndroidexitGame"]("");
        }
        else {
            basic.SceneManager.back();
        }
    }
}
