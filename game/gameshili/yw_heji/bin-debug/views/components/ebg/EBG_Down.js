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
 * @游戏界面
 *
 */
var EBG_Down = (function (_super) {
    __extends(EBG_Down, _super);
    function EBG_Down() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    //初始化
    EBG_Down.prototype.createChildren = function () {
        _super.prototype.createChildren.call(this);
        //注册按钮
        this.btn_trend.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTrendBtn, this);
        this.btn_patterns.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onPatternsBtn, this);
    };
    //初始化界面
    EBG_Down.prototype.info = function () {
        //显示基本信息
        this.head.show(UserData.User_Head);
        this.txt_name.text = UserData.User_Name;
    };
    //显示金币
    EBG_Down.prototype.showGold = function (_gold) {
        //显示金币
        this.txt_gold.text = GameData.assGold(2, _gold);
    };
    //走势按钮
    EBG_Down.prototype.onTrendBtn = function (e) {
        //播放声音
        basic.SoundManager.instance.playEffect("sound_btn_mp3");
        //显示走势
        Panel_EBG_ZouShi.instance.show();
    };
    //牌型按钮
    EBG_Down.prototype.onPatternsBtn = function (e) {
        //播放声音
        basic.SoundManager.instance.playEffect("sound_btn_mp3");
        //显示牌型
        Panel_EBG_PaiXing.instance.show();
    };
    return EBG_Down;
}(eui.Component));
__reflect(EBG_Down.prototype, "EBG_Down");
