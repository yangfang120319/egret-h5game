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
 * @夜市场-用户金币
 *
 */
var YSC_UserGold = (function (_super) {
    __extends(YSC_UserGold, _super);
    function YSC_UserGold() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    //初始化
    YSC_UserGold.prototype.createChildren = function () {
        _super.prototype.createChildren.call(this);
        //注册事件
        basic.Dispatcher.addListener(EventNames.YSC_SHOWGOLD, this.onShowGold, this);
    };
    //显示金币事件
    YSC_UserGold.prototype.onShowGold = function (e) {
        //定义变量
        var show_gold = e.data.gold;
        //显示金币
        this.txt_gold.text = show_gold.toString();
    };
    return YSC_UserGold;
}(eui.Component));
__reflect(YSC_UserGold.prototype, "YSC_UserGold");
//# sourceMappingURL=YSC_UserGold.js.map