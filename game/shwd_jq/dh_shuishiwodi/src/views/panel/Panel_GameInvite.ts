/**
 *
 * @author 
 *
 */
class Panel_GameInvite extends basic.PanelBase {
    //自定义界面
    private static _instance: Panel_GameInvite;
    public static get instance(): Panel_GameInvite {
        if(this._instance == undefined) {
            this._instance = new Panel_GameInvite();
        }
        return this._instance;
    }

    //定义变量
    private txt_name: eui.Label;
    private head: Head;
    private btn_cancel: eui.Button;
    private btn_enter: eui.Button;


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
        this.skinName = Panel_GameInviteSkin;

        //注册按钮
        this.btn_cancel.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onCancelBtn,this);
        this.btn_enter.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onEnterBtn,this);
    }
    
    //显示界面
    show(callback: Function = null): void {

        //显示界面
        this.popup(this.funExit.bind(this));
    }

    //确定按钮
    private onCancelBtn(e: egret.TouchEvent): void {

        //退出事件
        this.funExit();

    }
    
    //加入房间
    private onEnterBtn(e: egret.TouchEvent): void {
        
        //退出事件
        this.funExit();
        
        basic.SceneManager.show(SceneNames.GAME);

    }
    
    //退出函数
    private funExit(): void {
        
        //退出事件
        this.dealAction();
    }
    
}
