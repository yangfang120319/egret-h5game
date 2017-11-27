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
 * @马来西亚银行-顶部
 *
 */
var MLXYYH_Top = (function (_super) {
    __extends(MLXYYH_Top, _super);
    function MLXYYH_Top() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    //初始化
    MLXYYH_Top.prototype.createChildren = function () {
        _super.prototype.createChildren.call(this);
        //注册按钮
        this.btn_set.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onSetBtn, this);
        this.btn_back.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBackBtn, this);
    };
    //-----------------定义按钮-----------------
    //设置按钮
    MLXYYH_Top.prototype.onSetBtn = function (e) {
        //播放声音
        basic.SoundManager.instance.playEffect("sound_btn_mp3");
        //显示设置界面
        PanelSet.instance.show();
    };
    //返回按钮
    MLXYYH_Top.prototype.onBackBtn = function (e) {
        //播放声音
        basic.SoundManager.instance.playEffect("sound_btn_mp3");
        //退出到主界面
        basic.SceneManager.back();
    };
    return MLXYYH_Top;
}(eui.Component));
__reflect(MLXYYH_Top.prototype, "MLXYYH_Top");
//# sourceMappingURL=MLXYYH_Top.js.map