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
 * @头像
 *
 */
var Head_Add = (function (_super) {
    __extends(Head_Add, _super);
    //定义界面
    function Head_Add() {
        var _this = _super.call(this) || this;
        //定义界面
        _this.skinName = HeadSkin;
        //显示遮罩
        _this.img_hook.visible = false;
        _this.img_headmask.visible = true;
        _this.img_head.mask = _this.img_headmask;
        return _this;
    }
    //显示头像
    Head_Add.prototype.show = function (_head) {
        //判断显示
        if (_head != "" && _head != null) {
            this.img_head.source = _head;
        }
        else {
            this.img_head.source = "";
        }
    };
    //显示钩子
    Head_Add.prototype.showHook = function () {
        //显示界面
        this.img_hook.visible = true;
    };
    return Head_Add;
}(eui.Component));
__reflect(Head_Add.prototype, "Head_Add");
