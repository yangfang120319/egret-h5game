var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
/**
 *
 * @商城
 *
 */
var SceneShop = (function (_super) {
    __extends(SceneShop, _super);
    //定义界面
    function SceneShop() {
        var _this = _super.call(this) || this;
        _this.shop_data = [];
        //定义界面
        _this.skinName = SceneShopSkin;
        //数据赋值
        _this.shop_data = [
            { "icon": "icon_s_shop0_png", "goldname": "6000万", "gold": 60000000, "money": 10 },
            { "icon": "icon_s_shop1_png", "goldname": "3亿", "gold": 300000000, "money": 50 },
            { "icon": "icon_s_shop2_png", "goldname": "6亿", "gold": 600000000, "money": 100 },
            { "icon": "icon_s_shop3_png", "goldname": "30亿", "gold": 3000000000, "money": 500 },
            { "icon": "icon_s_shop4_png", "goldname": "60亿", "gold": 6000000000, "money": 1000 }
        ];
        //定义界面
        _this.list.dataProvider = _this._data = new eui.ArrayCollection(_this.shop_data);
        _this.list.itemRenderer = ShopListItem;
        //注册按钮
        _this.btn_close.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onCloseBtn, _this);
        return _this;
    }
    //显示前调用
    SceneShop.prototype.beforeShow = function () {
    };
    //关闭按钮
    SceneShop.prototype.onCloseBtn = function (e) {
        //播放声音
        basic.SoundManager.instance.playEffect("sound_btn_mp3");
        //发送消息
        basic.Dispatcher.dispatch(EventNames.SHOW_FACE, { "nowshow": 0 });
    };
    return SceneShop;
}(basic.SceneBase));
__reflect(SceneShop.prototype, "SceneShop");
//显示条定义
var ShopListItem = (function (_super) {
    __extends(ShopListItem, _super);
    function ShopListItem() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    //初始化界面
    ShopListItem.prototype.dataChanged = function () {
        _super.prototype.dataChanged.call(this);
        //显示界面
        this.img_icon.source = this.data.icon;
        this.txt_gold.text = "x" + this.data.goldname;
        this.btn_buy.label = "￥" + String(this.data.money);
        //注册按钮
        this.btn_buy.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBuyBtn, this);
    };
    //购买按钮
    ShopListItem.prototype.onBuyBtn = function (e) {
        //播放声音
        basic.SoundManager.instance.playEffect("sound_btn_mp3");
    };
    return ShopListItem;
}(eui.ItemRenderer));
__reflect(ShopListItem.prototype, "ShopListItem");
