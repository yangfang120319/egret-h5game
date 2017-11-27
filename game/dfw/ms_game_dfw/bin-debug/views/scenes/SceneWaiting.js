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
 * @等待界面
 *
 */
var SceneWaiting = (function (_super) {
    __extends(SceneWaiting, _super);
    //定义界面
    function SceneWaiting() {
        var _this = _super.call(this) || this;
        _this._tween_rotation = null;
        //定义界面
        _this.skinName = SceneWaitingSkin;
        //注册事件
        //注册按钮
        _this.btn_yes.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onYesBtn, _this);
        return _this;
    }
    //显示前调用
    SceneWaiting.prototype.beforeShow = function (params) {
        //数据赋值
        GameData.Is_Show_Waiting = true;
        //显示动画
        this.com_waiting.rotation = 0;
        this._tween_rotation = egret.Tween.get(this.com_waiting, { loop: true }).to({ rotation: 360 }, 1000);
    };
    //隐藏前调用
    SceneWaiting.prototype.beforeHide = function () {
        //停止动画
        if (this._tween_rotation) {
            this._tween_rotation.setPaused(true);
            this._tween_rotation = null;
        }
        //数据赋值
        GameData.Is_Show_Waiting = false;
    };
    //确定按钮
    SceneWaiting.prototype.onYesBtn = function (e) {
        //播放声音
        basic.SoundManager.instance.playEffect("sound_btn_mp3");
        //刷新界面
        window.location.href = window.location.href;
    };
    return SceneWaiting;
}(basic.SceneBase));
__reflect(SceneWaiting.prototype, "SceneWaiting");
//# sourceMappingURL=SceneWaiting.js.map