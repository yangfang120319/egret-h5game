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
 * @服务条款
 *
 */
var SceneClause = (function (_super) {
    __extends(SceneClause, _super);
    //定义界面
    function SceneClause() {
        var _this = _super.call(this) || this;
        //定义界面
        _this.skinName = SceneClauseSkin;
        //注册按钮
        _this.btn_close.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onCloseBtn, _this);
        return _this;
    }
    //显示前调用
    SceneClause.prototype.beforeShow = function () {
    };
    //关闭按钮
    SceneClause.prototype.onCloseBtn = function (e) {
        //播放声音
        basic.SoundManager.instance.playEffect("sound_btn_mp3");
        //发送消息
        basic.Dispatcher.dispatch(EventNames.SHOW_FACE, { "nowshow": 0 });
    };
    return SceneClause;
}(basic.SceneBase));
__reflect(SceneClause.prototype, "SceneClause");
