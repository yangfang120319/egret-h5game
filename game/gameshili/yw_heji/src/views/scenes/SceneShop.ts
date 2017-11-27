/**
 *
 * @商城
 *
 */
class SceneShop extends basic.SceneBase {
    //定义变量
    private list: eui.List;
    private btn_close: eui.Button;
    private _data: eui.ArrayCollection;
    private shop_data: any[] = [];

    //定义界面
    public constructor() {
        super();
        
        //定义界面
        this.skinName = SceneShopSkin;
        
        //数据赋值
        this.shop_data = [
            { "icon": "icon_s_shop0_png","goldname": "6000万","gold": 60000000,"money": 10 },
            { "icon": "icon_s_shop1_png","goldname": "3亿","gold": 300000000,"money": 50 },
            { "icon": "icon_s_shop2_png","goldname": "6亿","gold": 600000000,"money": 100 },
            { "icon": "icon_s_shop3_png","goldname": "30亿","gold": 3000000000,"money": 500 },
            { "icon": "icon_s_shop4_png","goldname": "60亿","gold": 6000000000,"money": 1000 }
        ];
        
        //定义界面
        this.list.dataProvider = this._data = new eui.ArrayCollection(this.shop_data);
        this.list.itemRenderer = ShopListItem;
        
        //注册按钮
        this.btn_close.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onCloseBtn,this);
    }

    //显示前调用
    beforeShow(): void {
        
    }

    //关闭按钮
    private onCloseBtn(e: egret.TouchEvent): void {
        //播放声音
        basic.SoundManager.instance.playEffect("sound_btn_mp3");
        
        //发送消息
        basic.Dispatcher.dispatch(EventNames.SHOW_FACE,{ "nowshow": 0 });
    }
}

//显示条定义
class ShopListItem extends eui.ItemRenderer {
    //定义变量
    private img_icon: eui.Image;
    private txt_gold: eui.Label;
    private btn_buy: eui.Button;
    
    //初始化界面
    dataChanged(): void {
        super.dataChanged();

        //显示界面
        this.img_icon.source = this.data.icon;
        this.txt_gold.text = "x" + this.data.goldname;
        this.btn_buy.label = "￥" + String(this.data.money);
        
        //注册按钮
        this.btn_buy.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onBuyBtn,this);
    }
    
    //购买按钮
    private onBuyBtn(e:egret.TouchEvent):void{
        //播放声音
        basic.SoundManager.instance.playEffect("sound_btn_mp3");
        
        
    }
}
