/**
 *
 * @保险箱界面
 *
 */
class SceneSaveBox extends basic.SceneBase {
    //定义变量
    private txt_tips: eui.Label;
    private rect_back: eui.Rect;
    private btn_get: eui.Button;
    private btn_close: eui.Button;
    private btn_left: eui.Button;
    private btn_right: eui.Button;
    private btn_seposit: eui.Button;
    private txt_change_gold: eui.Label;
    private txt_gold: eui.BitmapLabel;
    private txt_savegold: eui.BitmapLabel;
    private change_gold: number = 10000;
    
    //定义界面
    public constructor() {
        super();
        
        //定义界面
        this.skinName = SceneSaveBoxSkin;
        
        //显示文本
        this.txt_tips.text = "";
        
        //显示修改金币
        this.showChangeGold();
        
        //注册事件
        basic.Dispatcher.addListener(EventNames.GOLD_CHANGE,this.onGoldChange,this);
        
        //注册按钮
        this.btn_get.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onGetBtn,this);
        this.btn_close.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onCloseBtn,this);
        this.btn_left.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onLeftBtn,this);
        this.btn_right.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onRightBtn,this);
        this.btn_seposit.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onSepositBtn,this);
    }
    
    //显示前调用
    beforeShow(): void {
        //判断显示
        if(GameData.Game_Type == -1) {
            this.rect_back.visible = false;
        }
        else{
            this.rect_back.visible = true;
        }
        
        //显示金币
        this.showGold();
    }
    
    //金币改变
    private onGoldChange(e:egret.Event):void{
        //显示金币
        this.showGold();

        //显示文本
        this.txt_tips.text = "存取成功!";
    }
    
    //显示金币
    private showGold():void{
        //判断显示金币
        if(UserData.User_Gold < 100000000) {
            this.txt_gold.text = Math.floor(UserData.User_Gold / 10000).toString() + "w";
        }
        else {
            this.txt_gold.text = Number(Math.floor(UserData.User_Gold / 1000000) / 100).toString() + "y";
        }
        
        if(UserData.User_SaveGold < 100000000) {
            this.txt_savegold.text = Math.floor(UserData.User_SaveGold / 10000).toString() + "w";
        }
        else {
            this.txt_savegold.text = Number(Math.floor(UserData.User_SaveGold / 1000000) / 100).toString() + "y";
        }
    }
    
    //显示金币
    private showChangeGold(): void {
        //判断显示金币
        if(this.change_gold < 100000000) {
            this.txt_change_gold.text = Math.floor(this.change_gold / 10000).toString() + "万 整存整取";
        }
        else {
            this.txt_change_gold.text = Math.floor(this.change_gold / 100000000).toString() + "亿 整存整取";
        }
    }
    
    //关闭按钮
    private onCloseBtn(e: egret.TouchEvent): void {
        //播放声音
        basic.SoundManager.instance.playEffect("sound_btn_mp3");

        //判断显示
        if(GameData.Game_Type == -1) {
            //发送消息
            basic.Dispatcher.dispatch(EventNames.SHOW_FACE,{ "nowshow": 0 });
        }
        else {
            //显示保险箱
            basic.SceneManager.removeTopScene(SceneNames.SAVEBOX);
        }
    }
    
    //取按钮
    private onGetBtn(e: egret.TouchEvent): void {
        //播放声音
        basic.SoundManager.instance.playEffect("sound_btn_mp3");

        //显示提示
        this.txt_tips.text = "";
        
        //判断显示
        if(this.change_gold > UserData.User_SaveGold) {
            //显示提示
            this.txt_tips.text = "保存金币不足！";
        }
        else {
            //发送消息
            Comm.instance.sendSocket({ "type": "exchangeGold","gold": this.change_gold,"exchangeType": 0 });
        }
    }
    
    //存按钮
    private onSepositBtn(e:egret.TouchEvent):void{
        //播放声音
        basic.SoundManager.instance.playEffect("sound_btn_mp3");

        //显示提示
        this.txt_tips.text = "";
        
        //判断显示
        if(this.change_gold > UserData.User_Gold) {
            //显示提示
            this.txt_tips.text = "现有金币不足！";
        }
        else {
            //发送消息
            Comm.instance.sendSocket({ "type": "exchangeGold","gold": this.change_gold,"exchangeType": 1 });
        }
    }
    
    //左边按钮
    private onLeftBtn(e:egret.TouchEvent):void{
        //播放声音
        basic.SoundManager.instance.playEffect("sound_btn_mp3");
        
        //数据赋值
        this.change_gold = Math.floor(this.change_gold / 10);
        if(this.change_gold < 10000) {
            this.change_gold = 100000000000;
        }
        
        //显示文本
        this.showChangeGold();
    }
    
    //右边按钮
    private onRightBtn(e: egret.TouchEvent): void {
        //播放声音
        basic.SoundManager.instance.playEffect("sound_btn_mp3");
        
        //数据赋值
        this.change_gold = Math.floor(this.change_gold * 10);
        if(this.change_gold > 100000000000) {
            this.change_gold = 10000;
        }

        //显示文本
        this.showChangeGold();
    }
}
