/**
 *
 * @游戏界面
 *
 */
class EBG_Down extends eui.Component {
    //定义变量
    private head: Head;
    private chip: EBG_Chip;
    private txt_name: eui.Label;
    private btn_trend: eui.Button;
    private btn_patterns: eui.Button
    private txt_gold: eui.BitmapLabel;
    
    //初始化
    createChildren(): void {
        super.createChildren();
        
        //注册按钮
        this.btn_trend.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onTrendBtn,this);
        this.btn_patterns.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onPatternsBtn,this);
    }
    
    //初始化界面
    info():void{
        //显示基本信息
        this.head.show(UserData.User_Head);
        this.txt_name.text = UserData.User_Name;
    }
    
    //显示金币
    showGold(_gold:number):void{
        //显示金币
        this.txt_gold.text = GameData.assGold(2,_gold);
    }
    
    //走势按钮
    private onTrendBtn(e: egret.TouchEvent): void {
        //播放声音
        basic.SoundManager.instance.playEffect("sound_btn_mp3");
        
        //显示走势
        Panel_EBG_ZouShi.instance.show();
    }
    
    //牌型按钮
    private onPatternsBtn(e: egret.TouchEvent): void {
        //播放声音
        basic.SoundManager.instance.playEffect("sound_btn_mp3");
        
        //显示牌型
        Panel_EBG_PaiXing.instance.show();
    }
}
