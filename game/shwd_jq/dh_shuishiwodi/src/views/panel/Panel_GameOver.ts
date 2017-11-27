/**
 *
 * @结束界面
 *
 */
class Panel_GameOver extends basic.PanelBase {
    //自定义界面
    private static _instance: Panel_GameOver;
    public static get instance(): Panel_GameOver {
        if(this._instance == undefined) {
            this._instance = new Panel_GameOver();
        }
        return this._instance;
    }
    
    //定义变量FD4700
    private head: Head;
    private btn_exit: eui.Button;
    private btn_again: eui.Button;
    private txt_name: eui.Label;
    private txt_level: eui.Label;
    private txt_word_pm: eui.Label;
    private txt_word_wd: eui.Label;
    private txt_win_rate: eui.Label;
    private txt_win_tips: eui.Label;
    private txt_user_type: eui.Label;
    private txt_level_change: eui.Label;
    private com_type: eui.Component;

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
        this.skinName = Panel_GameOverSkin;

        //注册按钮
        this.btn_exit.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onExitBtn,this);
        this.btn_again.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onAgainlBtn,this);
    }
    
    //显示界面
    show(_data: any,callback: Function = null): void {
        //显示界面
        this.popup(this.funExit.bind(this));
        
        //数据赋值
        UserData.User_Level = _data.level;

        //显示界面
        this.head.show(UserData.User_Head);
        this.txt_win_rate.text = _data.rate;
        this.txt_name.text = UserData.User_Name;
        this.txt_word_pm.text = "平民词：" + _data.normal_terms;
        this.txt_word_wd.text = "卧底词：" + _data.undercover_terms;

        //判断显示玩家身份
        if(_data.playerType == 0){
            this.txt_user_type.text = "平民";
        }
        else{
            this.txt_user_type.text = "卧底"
        }
        
        //判断显示结果
        if(_data.winType == 0){
            this.txt_win_tips.text = "平民胜利";
        }
        else{
            this.txt_win_tips.text = "卧底胜利";
        }

        //判断显示等级
        if(UserData.User_Level < 30){
            this.txt_level.text = "初级卧底";
        }
        else if(UserData.User_Level < 60){
            this.txt_level.text = "中级卧底";
        }
        else if(UserData.User_Level < 90){
            this.txt_level.text = "高级卧底";
        }
        else{
            this.txt_level.text = "终极卧底";
        }

        //判断显示星星改变
        if(_data.levelUp > 0){
            this.com_type.currentState = "1";
            this.txt_level_change.text = "星星  +" + String(_data.levelUp);
        }
        else{
            this.com_type.currentState = "0";
            this.txt_level_change.text = "星星  " + String(_data.levelUp);
        }
    }

    //再来一次
    private onAgainlBtn(e: egret.TouchEvent): void {
        //退出事件
        this.funExit();
    }

    //退出按钮
    private onExitBtn(e: egret.TouchEvent): void {
        //退出事件
        this.funExit();

        //退出游戏
        basic.SceneManager.back();
    }
    
    //退出函数
    funExit(): void {
        //退出事件
        this.dealAction();
    }
}
