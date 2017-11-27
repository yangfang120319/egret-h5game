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
        _this.trun_speed = 400;
        //定义界面
        _this.skinName = SceneWaitingSkin;
        return _this;
    }
    //显示前调用
    SceneWaiting.prototype.beforeShow = function (params) {
        //显示界面
        this.txt_progress.text = "0%";
        //开始转圈
        this._tween_rotation = egret.Tween.get(this.com_loading, { loop: true }).to({ rotation: 360 }, this.trun_speed);
        //注册事件
        basic.Dispatcher.addListener(EventNames.LOADING_PROGRESS, this.onLoadingProgress, this);
    };
    //隐藏前调用
    SceneWaiting.prototype.beforeHide = function (params) {
        //判断停止
        if (this._tween_rotation) {
            this._tween_rotation.setPaused(true);
            this._tween_rotation = null;
        }
        //注销事件
        basic.Dispatcher.removeListener(EventNames.LOADING_PROGRESS, this.onLoadingProgress, this);
    };
    //显示加载进度
    SceneWaiting.prototype.onLoadingProgress = function (event) {
        //定义变量
        var num_now_loader = (event.data.itemsLoaded / event.data.itemsTotal) * 100;
        //显示文本
        this.txt_progress.text = Math.floor(num_now_loader).toString() + "%";
    };
    return SceneWaiting;
}(basic.SceneBase));
__reflect(SceneWaiting.prototype, "SceneWaiting");
