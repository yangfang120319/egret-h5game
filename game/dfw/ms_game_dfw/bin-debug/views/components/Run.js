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
 * @运行界面
 *
 */
var Run = (function (_super) {
    __extends(Run, _super);
    function Run() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.card = [];
        return _this;
    }
    //初始化
    Run.prototype.createChildren = function () {
        _super.prototype.createChildren.call(this);
        //数据赋值
        for (var i = 0; i < 9; i++) {
            //定义变量
            var now_card = this["card" + i];
            var num = i + 3;
            //数据赋值
            this.card[i] = now_card;
            this.card[i].img_back.source = num + "_png";
        }
    };
    return Run;
}(eui.Component));
__reflect(Run.prototype, "Run");
//# sourceMappingURL=Run.js.map