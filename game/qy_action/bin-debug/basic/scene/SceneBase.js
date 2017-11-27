/**
 * Created by jq on 2016/2/5.
 * 场景基类
 */
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
var basic;
(function (basic) {
    var SceneBase = (function (_super) {
        __extends(SceneBase, _super);
        //初始化界面
        function SceneBase() {
            var _this = _super.call(this) || this;
            //触屏控制
            _this.touchChildren = true;
            _this.touchEnabled = false;
            //定义场景大小
            _this.width = basic.StageProxy.stage.stageWidth;
            _this.height = basic.StageProxy.stage.stageHeight;
            return _this;
        }
        //显示前
        SceneBase.prototype._beforeShow = function (params) {
            if (params === void 0) { params = null; }
            this.beforeShow(params);
        };
        //隐藏前
        SceneBase.prototype._beforeHide = function (params) {
            if (params === void 0) { params = null; }
            this.beforeHide(params);
        };
        //显示时
        SceneBase.prototype._onShow = function (params) {
            if (params === void 0) { params = null; }
            this.onShow(params);
        };
        //隐藏时
        SceneBase.prototype._onHide = function (params) {
            if (params === void 0) { params = null; }
            this.onHide(params);
        };
        //显示前
        SceneBase.prototype.beforeShow = function (params) {
            if (params === void 0) { params = null; }
        };
        //隐藏前
        SceneBase.prototype.beforeHide = function (params) {
            if (params === void 0) { params = null; }
        };
        //显示时
        SceneBase.prototype.onShow = function (params) {
            if (params === void 0) { params = null; }
        };
        //隐藏时
        SceneBase.prototype.onHide = function (params) {
            if (params === void 0) { params = null; }
        };
        return SceneBase;
    }(eui.Component));
    basic.SceneBase = SceneBase;
    __reflect(SceneBase.prototype, "basic.SceneBase");
})(basic || (basic = {}));
//# sourceMappingURL=SceneBase.js.map