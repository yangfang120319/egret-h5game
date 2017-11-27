/**
 *
 * @输入昵称
 *
 */
class PanelNickName extends basic.PanelBase {
    //自定义界面
    private static _instance: PanelNickName;
    public static get instance(): PanelNickName {
        if(this._instance == undefined) {
            this._instance = new PanelNickName();
        }
        return this._instance;
    }

    //定义变量
    private rect_mask: eui.Rect;
    private btn_yes: eui.Button;
    private txt_tips: eui.Label;
    private txt_nickname: eui.EditableText;
    
    //皮肤设置
    protected init(): void {
        this.skinName = PanelNickNameSkin;
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
        this.txt_nickname.addEventListener(egret.FocusEvent.FOCUS_IN,this.onNickNameText,this);
        this.txt_nickname.addEventListener(egret.FocusEvent.FOCUS_OUT,this.onNickNameText,this);
    }

    //显示界面
    show(callback: Function = null): void {
        //数据赋值
        this._callback = callback;

        //显示界面
        this.popup();
        
        //显示文本
        this.txt_tips.text = "";
        this.txt_nickname.text = "";
        this.rect_mask.visible = false;
    }
    
    //昵称文本
    private onNickNameText(e:egret.FocusEvent):void{
        //判断显示
        if(e.type == egret.FocusEvent.FOCUS_IN) {
            this.rect_mask.visible = true;
        }
        else if(e.type == egret.FocusEvent.FOCUS_OUT) {
            //判断显示
            if(this.txt_nickname.text==""){
                this.rect_mask.visible = false;
            }
        }
    }
    
    //确定按钮
    private onYesBtn(e: egret.TouchEvent): void {
        //播放声音
        basic.SoundManager.instance.playEffect("sound_btn_mp3");

        //判断显示
        if(this.txt_nickname.text==""){
            //显示提示
            this.txt_tips.text = "昵称不能为空";
        }
        else if(String(this.txt_nickname.text).length > 5){
            //显示提示
            this.txt_tips.text = "昵称最多5个字";
        }
        else{
            //数据赋值
            UserData.User_Name = this.txt_nickname.text;
            
            //退出界面
            this.dealAction();
        }
    }
}
