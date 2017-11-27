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
 * @开始用户信息
 *
 */
var StartUser = (function (_super) {
    __extends(StartUser, _super);
    function StartUser() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    //初始化
    StartUser.prototype.createChildren = function () {
        _super.prototype.createChildren.call(this);
        //注册按钮
        this.btn_exit.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onExitBtn, this);
        this.btn_send.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onSendBtn, this);
        this.btn_shop.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onShopBtn, this);
    };
    //显示
    StartUser.prototype.show = function () {
        //显示头像
        this.head.show(UserData.User_Head);
        this.head.currentState = "hide";
        //显示文本
        this.txt_name.text = UserData.User_Name;
        this.txt_gold.text = UserData.User_Gold.toString();
        //显示位置
        this.showPlace();
    };
    //显示位置
    StartUser.prototype.showPlace = function () {
        //定义变量
        var now_show_x = 750 - 12;
        //判断显示发钻按钮
        if (UserData.User_Is_Dl == true) {
            this.btn_send.visible = true;
        }
        else {
            this.btn_send.visible = false;
        }
        //判断定义位置
        this.btn_exit.x = now_show_x - this.btn_exit.width;
        now_show_x = now_show_x - this.btn_exit.width - 12;
        this.btn_shop.x = now_show_x - this.btn_shop.width;
        now_show_x = now_show_x - this.btn_shop.width - 12;
        if (this.btn_send.visible == true) {
            this.btn_send.x = now_show_x - this.btn_send.width;
            now_show_x = now_show_x - this.btn_send.width - 12;
        }
    };
    //退出按钮
    StartUser.prototype.onExitBtn = function (e) {
        //播放声音
        basic.SoundManager.instance.playEffect("sound_btn_mp3");
        //显示退出提示
        PanelExit.instance.show();
    };
    //发钻按钮
    StartUser.prototype.onSendBtn = function (e) {
        //定义变量
        var params = basic.Utils.getUrlParams();
        //注销按钮
        this.btn_send.enabled = false;
        //播放声音
        basic.SoundManager.instance.playEffect("sound_btn_mp3");
        //判断赋值
        if (GameData.Is_Test == true) {
            params = { "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHBpcmVkIjoxNTA5NjA5OTI5NjkyLCJ1c2VySWQiOjUwMzF9.gqRswsAY_csgCl5AnNpoJf-_eCyLNpuzDAztNRpd4rk" };
        }
        //请求参数
        var request = new egret.HttpRequest();
        request.responseType = egret.HttpResponseType.TEXT;
        request.open("https://client.yile.vip/api/game/paymentUrl.json?token=" + params.token, egret.HttpMethod.GET);
        request.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        request.send();
        request.addEventListener(egret.Event.COMPLETE, this.onGetComplete, this);
    };
    //商店按钮
    StartUser.prototype.onShopBtn = function (e) {
        //播放声音
        basic.SoundManager.instance.playEffect("sound_btn_mp3");
        //显示充值界面
        window.location.href = GameData.Shop_Url;
    };
    //获取数据完成
    StartUser.prototype.onGetComplete = function (event) {
        //数据赋值
        var request = event.currentTarget;
        var sign = JSON.parse(request.response);
        //显示按钮
        this.btn_send.enabled = true;
        //显示对话框
        PanelRoom.instance.show(sign.data.payurl, 1);
    };
    return StartUser;
}(eui.Component));
__reflect(StartUser.prototype, "StartUser");
//# sourceMappingURL=StartUser.js.map