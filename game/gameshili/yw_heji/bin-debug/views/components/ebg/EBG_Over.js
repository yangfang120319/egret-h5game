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
 * @author
 *
 */
var EBG_Over = (function (_super) {
    __extends(EBG_Over, _super);
    function EBG_Over() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._tween_rotation = null;
        return _this;
    }
    //初始化
    EBG_Over.prototype.createChildren = function () {
        _super.prototype.createChildren.call(this);
        //隐藏界面
        this.hide();
    };
    //显示金币
    EBG_Over.prototype.assShowGold = function (_gold) {
        //定义变量
        var show_gold;
        //判断显示
        if (_gold == 0) {
            show_gold = "0";
        }
        else if (Math.abs(_gold) < 100000000) {
            show_gold = _gold.toString();
        }
        else {
            show_gold = Math.floor(_gold / 10000).toString() + "万";
        }
        return show_gold;
    };
    //显示界面
    EBG_Over.prototype.show = function () {
        //显示
        this.visible = true;
        //开始动画
        this.com_light.rotation = 0;
        this._tween_rotation = egret.Tween.get(this.com_light, { loop: true }).to({ rotation: 360 }, 5000);
        //显示用户数据
        this.head_user.show(UserData.User_Head);
        this.txt_name_user.text = UserData.User_Name;
        this.txt_gold_user.text = this.assShowGold(Number(GameData.EBG_OverData.winGold));
        //显示庄
        if (GameData.Zhuang_Id == 0) {
            this.head_zhuang.show("icon_zhuanghead_jpg");
        }
        else {
            this.head_zhuang.show(GameData.Zhuang_Head);
        }
        this.txt_name_zhuang.text = GameData.Zhuang_Name;
        this.txt_gold_zhuang.text = this.assShowGold(GameData.EBG_OverData.dealerWinGold);
        //显示大赢家
        if (GameData.EBG_OverData.bigWinUser.headImgURL != null) {
            this.head_bigwin.show(GameData.EBG_OverData.bigWinUser.headImgURL);
            this.txt_name_bigwin.text = GameData.EBG_OverData.bigWinUser.nickName;
            this.txt_gold_bigwin.text = this.assShowGold(GameData.EBG_OverData.bigWinUser.winGold);
        }
    };
    //隐藏界面
    EBG_Over.prototype.hide = function () {
        //隐藏
        this.visible = false;
        //停止动画
        if (this._tween_rotation) {
            this._tween_rotation.setPaused(true);
            this._tween_rotation = null;
        }
        //清空数据
        this.head_user.show("");
        this.head_zhuang.show("");
        this.head_bigwin.show("");
        this.txt_name_user.text = "";
        this.txt_name_zhuang.text = "";
        this.txt_name_bigwin.text = "";
        this.txt_gold_user.text = "";
        this.txt_gold_zhuang.text = "";
        this.txt_gold_bigwin.text = "";
    };
    return EBG_Over;
}(eui.Component));
__reflect(EBG_Over.prototype, "EBG_Over");
