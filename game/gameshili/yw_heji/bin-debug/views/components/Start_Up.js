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
 * @开始上边
 *
 */
var Start_Up = (function (_super) {
    __extends(Start_Up, _super);
    function Start_Up() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    //初始化
    Start_Up.prototype.createChildren = function () {
        _super.prototype.createChildren.call(this);
        //注册按钮
        this.head.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onUserBtn, this);
        this.btn_set.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onSetBtn, this);
        this.btn_shop.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onShopBtn, this);
        this.btn_custom.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onCustomBtn, this);
    };
    //显示基本信息
    Start_Up.prototype.showMessage = function (_head, _id, _vip) {
        //显示基本信息
        this.head.show(_head);
        this.txt_id.text = "ID:" + _id.toString();
        this.img_vip.source = "txt_s_vip" + _vip.toString() + "_png";
        if (UserData.is_APP == true) {
            this.btn_shop.visible = false;
        }
        else {
            this.btn_shop.visible = true;
        }
    };
    //显示金币
    Start_Up.prototype.showGold = function (_gold) {
        //显示金币
        this.txt_gold.text = _gold.toString();
        //判断显示金币
        if (_gold < 100000000) {
            this.txt_gold.text = Math.floor(_gold / 10000).toString() + "万";
        }
        else {
            this.txt_gold.text = Number(Math.floor(_gold / 1000000) / 100).toString() + "亿";
        }
    };
    //用户按钮
    Start_Up.prototype.onUserBtn = function (e) {
        var _this = this;
        //播放声音
        basic.SoundManager.instance.playEffect("sound_btn_mp3");
        //显示用户信息
        PanelUser.instance.show(function () {
            _this.showMessage(UserData.User_Head, UserData.User_Id, UserData.User_VIP);
        });
    };
    //设置按钮
    Start_Up.prototype.onSetBtn = function (e) {
        //播放声音
        basic.SoundManager.instance.playEffect("sound_btn_mp3");
        //显示设置
        PanelSet.instance.show();
    };
    //商店按钮
    Start_Up.prototype.onShopBtn = function (e) {
        //播放声音
        basic.SoundManager.instance.playEffect("sound_btn_mp3");
        //发送消息
        basic.Dispatcher.dispatch(EventNames.SHOW_FACE, { "nowshow": 1 });
    };
    //客服按钮
    Start_Up.prototype.onCustomBtn = function (e) {
        //播放声音
        basic.SoundManager.instance.playEffect("sound_btn_mp3");
        //发送消息
        basic.Dispatcher.dispatch(EventNames.SHOW_FACE, { "nowshow": 5 });
    };
    return Start_Up;
}(eui.Component));
__reflect(Start_Up.prototype, "Start_Up");
