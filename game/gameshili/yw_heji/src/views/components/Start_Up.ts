/**
 *
 * @开始上边 
 *
 */
class Start_Up extends eui.Component{
    //定义变量
    private head: Head;
    private txt_id: eui.Label;
    private txt_gold: eui.Label;
    private img_vip: eui.Image;
    private btn_set: eui.Button;
    private btn_shop: eui.Button;
    private btn_custom: eui.Button;
    
    //初始化
    createChildren(): void {
        super.createChildren();
        
        //注册按钮
        this.head.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onUserBtn,this);
        this.btn_set.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onSetBtn,this);
        this.btn_shop.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onShopBtn,this);
        this.btn_custom.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onCustomBtn,this);
    }
    
    //显示基本信息
    showMessage(_head: string,_id: number,_vip: number): void {
        //显示基本信息
        this.head.show(_head);
        this.txt_id.text = "ID:" + _id.toString();
        this.img_vip.source = "txt_s_vip" + _vip.toString() + "_png";
        
        if(UserData.is_APP == true) {
            this.btn_shop.visible = false;
        }
        else {
            this.btn_shop.visible = true;
        }
    }
    
    //显示金币
    showGold(_gold: number): void {
        //显示金币
        this.txt_gold.text = _gold.toString();
        
        //判断显示金币
        if(_gold < 100000000) {
            this.txt_gold.text = Math.floor(_gold / 10000).toString() + "万";
        }
        else {
            this.txt_gold.text = Number(Math.floor(_gold / 1000000) / 100).toString() + "亿";
        }
    }
    
    //用户按钮
    private onUserBtn(e:egret.TouchEvent):void{
        //播放声音
        basic.SoundManager.instance.playEffect("sound_btn_mp3");

        //显示用户信息
        PanelUser.instance.show(()=>{
            this.showMessage(UserData.User_Head,UserData.User_Id,UserData.User_VIP);
        });
    }
    
    //设置按钮
    private onSetBtn(e:egret.TouchEvent):void{
        //播放声音
        basic.SoundManager.instance.playEffect("sound_btn_mp3");
        
        //显示设置
        PanelSet.instance.show();
    }
    
    //商店按钮
    private onShopBtn(e: egret.TouchEvent): void {
        //播放声音
        basic.SoundManager.instance.playEffect("sound_btn_mp3");
        
        //发送消息
        basic.Dispatcher.dispatch(EventNames.SHOW_FACE,{ "nowshow": 1 });
    }
    
    //客服按钮
    private onCustomBtn(e: egret.TouchEvent): void {
        //播放声音
        basic.SoundManager.instance.playEffect("sound_btn_mp3");
        
        //发送消息
        basic.Dispatcher.dispatch(EventNames.SHOW_FACE,{ "nowshow": 5 });
    }
}
