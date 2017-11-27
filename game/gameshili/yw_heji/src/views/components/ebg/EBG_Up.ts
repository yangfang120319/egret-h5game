/**
 *
 * @二八杠庄
 *
 */
class EBG_Up extends eui.Component {
    //定义变量
    private head: Head;
    private btn_up: eui.Button;
    private txt_name: eui.Label;
    private btn_exit: eui.Button;
    private txt_gold: eui.BitmapLabel;
    
    //初始化
    createChildren(): void {
        super.createChildren();
        
        //注册按钮
        this.btn_up.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onUpBtn,this);
        this.btn_exit.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onExitBtn,this);
    }
    
    //显示庄
    show(): void {
        //显示金币
        this.showGold();
        
        //判断显示
        if(GameData.Zhuang_Id == 0){
            this.head.show("icon_zhuanghead_jpg");
        }
        else{
            this.head.show(GameData.Zhuang_Head);
        }
        
        //显示信息
        this.txt_name.text = GameData.Zhuang_Name;
    }
    
    //显示金币
    private showGold():void{
        //显示金币
        if(GameData.Zhuang_Id == 0) {
            this.txt_gold.text = "88888y";
        }
        else{
            this.txt_gold.text = GameData.assGold(2,GameData.Zhuang_Gold);
        }
    }
    
    //上庄按钮
    private onUpBtn(e: egret.TouchEvent): void {
        //播放声音
        basic.SoundManager.instance.playEffect("sound_btn_mp3");
        
        //显示
        Panel_EBG_ZhuangList.instance.show();
    }
    
    //退出按钮
    private onExitBtn(e: egret.TouchEvent): void {
        //播放声音
        basic.SoundManager.instance.playEffect("sound_btn_mp3");

        //判断提示
        if(UserData.User_Id == GameData.Zhuang_Id) {
            //显示提示
            basic.Dispatcher.dispatch(EventNames.SHOW_TIPS,{ "tips": "您当前是庄加，请下庄后退出!" });
        }
        else {
            //显示提示
            PanelExit.instance.show();
        }
    }
}
