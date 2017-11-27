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
 * @历史记录
 *
 */
var JSYS_History = (function (_super) {
    __extends(JSYS_History, _super);
    function JSYS_History() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.img_box = [];
        return _this;
    }
    //初始化
    JSYS_History.prototype.createChildren = function () {
        _super.prototype.createChildren.call(this);
        //数据复制
        for (var i = 0; i < 8; i++) {
            //定义变量
            var box = this["img_box" + i];
            //数据复制
            this.img_box[i] = box;
        }
    };
    //显示历史记录
    JSYS_History.prototype.show = function (_history) {
        //显示历史
        this.g_show.x = 10;
        this.img_new.visible = true;
        //显示历史
        for (var i = 0; i < Math.min(_history.length, 8); i++) {
            this.img_box[i].source = "icon_jsys_box" + _history[i].toString() + "_png";
        }
    };
    //增加历史
    JSYS_History.prototype.addShow = function () {
        //隐藏最新
        this.img_new.visible = false;
        //移动历史
        var _tween_x = egret.Tween.get(this.g_show).to({ x: 68 }, 400);
    };
    return JSYS_History;
}(eui.Component));
__reflect(JSYS_History.prototype, "JSYS_History");
