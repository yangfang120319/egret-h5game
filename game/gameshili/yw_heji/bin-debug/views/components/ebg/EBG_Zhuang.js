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
 * @author
 *
 */
var EBG_Zhuang = (function (_super) {
    __extends(EBG_Zhuang, _super);
    function EBG_Zhuang() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    //定义变量
    //初始化
    EBG_Zhuang.prototype.createChildren = function () {
        _super.prototype.createChildren.call(this);
    };
    return EBG_Zhuang;
}(eui.Component));
__reflect(EBG_Zhuang.prototype, "EBG_Zhuang");
