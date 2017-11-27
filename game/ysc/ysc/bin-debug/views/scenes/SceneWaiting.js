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
        //定义变量
        _this.trun_speed = 400;
        _this._tween_rotation = null;
        //定义界面
        _this.skinName = SceneWaitingSkin;
        return _this;
    }
    //显示前调用
    SceneWaiting.prototype.beforeShow = function () {
        //开始动画
        this._tween_rotation = egret.Tween.get(this.com_waiting, { loop: true }).
            to({ rotation: 360 }, this.trun_speed);
    };
    //隐藏前调用
    SceneWaiting.prototype.onHide = function () {
        //结束动画
        if (this._tween_rotation) {
            this._tween_rotation.setPaused(true);
            this._tween_rotation = null;
        }
    };
    return SceneWaiting;
}(basic.SceneBase));
__reflect(SceneWaiting.prototype, "SceneWaiting");
//# sourceMappingURL=SceneWaiting.js.map