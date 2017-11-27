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
 * @用户信息
 *
 */
var StartMsg = (function (_super) {
    __extends(StartMsg, _super);
    function StartMsg() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    //初始化
    StartMsg.prototype.createChildren = function () {
        _super.prototype.createChildren.call(this);
        //注册按钮
        this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onThisBtn, this);
    };
    //显示内容
    StartMsg.prototype.show = function () {
        //显示头像
        this.head.show(UserData.User_Head);
        //显示文本
        this.txt_nickname.text = UserData.User_Name;
        this.txt_goldnum.text = UserData.User_Gold.toString();
        //判断显示等级
        if (UserData.User_Level < 30) {
            this.txt_level.text = "初级卧底";
        }
        else if (UserData.User_Level < 60) {
            this.txt_level.text = "中级卧底";
        }
        else if (UserData.User_Level < 90) {
            this.txt_level.text = "高级卧底";
        }
        else {
            this.txt_level.text = "终极卧底";
        }
        //定义位置
        this.img_vip.x = this.txt_nickname.x + this.txt_nickname.width + 10;
        this.img_star.x = this.img_vip.x + this.img_vip.width * this.img_vip.scaleX + 5;
        //显示等级
        this.img_star.source = "icon_star" + Number(UserData.User_Level % 10).toString() + "_png";
        this.img_vip.source = "icon_vip" + Math.floor(UserData.User_Level / 10).toString() + "_png";
    };
    //界面按钮
    StartMsg.prototype.onThisBtn = function (e) {
    };
    return StartMsg;
}(eui.Component));
__reflect(StartMsg.prototype, "StartMsg");
