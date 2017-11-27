/**
 *
 * @author 
 *
 */
class JSYS_Up extends eui.Component {
    //定义变量
    private head: Head;
    private img_vip: eui.Image
    private txt_gold: eui.Label;
    private txt_name: eui.Label;
    private btn_exit: eui.Button;
    private btn_savebox: eui.Button;
    
    //初始化
    createChildren(): void {
        super.createChildren();
        
        //注册按钮
        this.btn_exit.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onExitBtn,this);
        this.btn_savebox.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onSaveBoxBtn,this);
    }
    
    //初始化界面
    info(): void {
        //显示界面
        this.head.show(UserData.User_Head);
        this.txt_name.text = UserData.User_Name;
        this.txt_gold.text = UserData.User_Gold.toString();
        this.img_vip.source = "txt_s_vip" + UserData.User_VIP.toString() + "_png";
    }
    
    //显示金币
    showGold(_gold: number): void {
        //显示金币
        this.txt_gold.text = _gold.toString();
    }
    
    //退出按钮
    private onExitBtn(e: egret.TouchEvent): void {
        //播放声音
        basic.SoundManager.instance.playEffect("sound_btn_mp3");
        
        //判断提示
        if(UserData.User_Id == GameData.Zhuang_Id) {
            //显示提示
            basic.Dispatcher.dispatch(EventNames.SHOW_TIPS,{ "tips": "您当前是庄家，请下庄后退出!" });
        }
        else {
            //显示提示
            PanelExit.instance.show();
        }
    }
    
    //保险箱按钮
    private onSaveBoxBtn(e: egret.TouchEvent): void {
        //播放声音
        basic.SoundManager.instance.playEffect("sound_btn_mp3");
        
        //显示保险箱
        basic.SceneManager.addTopScene(SceneNames.SAVEBOX);
    }
}
