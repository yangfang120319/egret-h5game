/**
 *
 * @author 
 *
 */
class Panel_GameDescription extends basic.PanelBase {
    //自定义界面
    private static _instance: Panel_GameDescription;
    public static get instance(): Panel_GameDescription {
        if(this._instance == undefined) {
            this._instance = new Panel_GameDescription();
        }
        return this._instance;
    }
    
    //定义变量
    private btn_yes: eui.Button;
    private txt_word: eui.Label;
    private txt_description: eui.EditableText;
    private is_show: boolean = false;
    
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

        //定义界面
        this.skinName = Panel_GameDescriptionSkin;

        //注册按钮
        this.btn_yes.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onYesBtn,this);
    }
    
    //退出函数
    funExit(): void {
        //判断移除
        if(this.is_show == true){
             //退出事件
            this.dealAction();

            //数据赋值
            this.is_show = false;
        }
    }
    
    //显示界面
    show(callback: Function = null): void {
        //判断显示
        if(this.is_show == false){
            //显示界面
            this.popup();

            //数据赋值
            this.is_show = true;

            //显示文本
            this.txt_description.text = "";
            this.txt_word.text = GameData.Game_Word;
        }
    }
    
    //确定按钮
    private onYesBtn(e: egret.TouchEvent): void {
        //退出事件
        this.funExit();

        //判断发送消息
        if(this.txt_description.text == ""){
            Comm.instance.sendSocket({"type":"gameDescribe","describe":" "});
        }
        else{
            Comm.instance.sendSocket({"type":"gameDescribe","describe":this.txt_description.text});
        }
    }
}
