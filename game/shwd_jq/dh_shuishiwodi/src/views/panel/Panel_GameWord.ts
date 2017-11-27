/**
 *
 * @获得词语界面
 *
 */
class Panel_GameWord extends basic.PanelBase {
    //自定义界面
    private static _instance: Panel_GameWord;
    public static get instance(): Panel_GameWord {
        if(this._instance == undefined) {
            this._instance = new Panel_GameWord();
        }
        return this._instance;
    }

    //定义变量
    private txt_word: eui.Label;
    private btn_yes: eui.Button;
    
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
        this.skinName = Panel_GameWordSkin;
        
        //定义按钮事件
        this.btn_yes.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onYesBtn,this);
    }
    
    //显示界面
    show(callback: Function = null): void {
        //判断显示
        if(GameData.Is_Show_Word == false){
            //显示界面
            this.popup();

            //数据赋值
            GameData.Is_Show_Word = true;

            //显示词语
            this.txt_word.text = GameData.Game_Word;
        }
    }

    //确定按钮
    private onYesBtn(e: egret.TouchEvent): void {
        //退出事件
        this.funExit();

        //数据赋值
        GameData.Game_State = 0;

        //显示描述界面
        egret.setTimeout(()=>{
            Panel_GameDescription.instance.show();
        },this,400)
    }
    
    //退出函数
    funExit(): void {
        //判断移除
        if(GameData.Is_Show_Word == true){
             //退出事件
            this.dealAction();

            //数据赋值
            GameData.Is_Show_Word = false;
        }
    }
}
