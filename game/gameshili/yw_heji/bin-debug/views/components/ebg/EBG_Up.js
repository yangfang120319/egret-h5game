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
 * @二八杠庄
 *
 */
var EBG_Up = (function (_super) {
    __extends(EBG_Up, _super);
    function EBG_Up() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    //初始化
    EBG_Up.prototype.createChildren = function () {
        _super.prototype.createChildren.call(this);
        //注册按钮
        this.btn_up.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onUpBtn, this);
        this.btn_exit.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onExitBtn, this);
    };
    //显示庄
    EBG_Up.prototype.show = function () {
        //显示金币
        this.showGold();
        //判断显示
        if (GameData.Zhuang_Id == 0) {
            this.head.show("icon_zhuanghead_jpg");
        }
        else {
            this.head.show(GameData.Zhuang_Head);
        }
        //显示信息
        this.txt_name.text = GameData.Zhuang_Name;
    };
    //显示金币
    EBG_Up.prototype.showGold = function () {
        //显示金币
        if (GameData.Zhuang_Id == 0) {
            this.txt_gold.text = "88888y";
        }
        else {
            this.txt_gold.text = GameData.assGold(2, GameData.Zhuang_Gold);
        }
    };
    //上庄按钮
    EBG_Up.prototype.onUpBtn = function (e) {
        //播放声音
        basic.SoundManager.instance.playEffect("sound_btn_mp3");
        //显示
        Panel_EBG_ZhuangList.instance.show();
    };
    //退出按钮
    EBG_Up.prototype.onExitBtn = function (e) {
        //播放声音
        basic.SoundManager.instance.playEffect("sound_btn_mp3");
        //判断提示
        if (UserData.User_Id == GameData.Zhuang_Id) {
            //显示提示
            basic.Dispatcher.dispatch(EventNames.SHOW_TIPS, { "tips": "您当前是庄加，请下庄后退出!" });
        }
        else {
            //显示提示
            PanelExit.instance.show();
        }
    };
    return EBG_Up;
}(eui.Component));
__reflect(EBG_Up.prototype, "EBG_Up");
