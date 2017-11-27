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
 * @客服
 *
 */
var SceneCustom = (function (_super) {
    __extends(SceneCustom, _super);
    //定义界面
    function SceneCustom() {
        var _this = _super.call(this) || this;
        //定义界面
        _this.skinName = SceneCustomSkin;
        //注册按钮
        _this.btn_close.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onCloseBtn, _this);
        return _this;
    }
    //显示前调用
    SceneCustom.prototype.beforeShow = function () {
    };
    //关闭按钮
    SceneCustom.prototype.onCloseBtn = function (e) {
        //播放声音
        basic.SoundManager.instance.playEffect("sound_btn_mp3");
        //发送消息
        basic.Dispatcher.dispatch(EventNames.SHOW_FACE, { "nowshow": 0 });
    };
    return SceneCustom;
}(basic.SceneBase));
__reflect(SceneCustom.prototype, "SceneCustom");
