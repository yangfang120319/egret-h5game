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
var Card = (function (_super) {
    __extends(Card, _super);
    function Card() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    //初始化
    Card.prototype.createChildren = function () {
        _super.prototype.createChildren.call(this);
        this.currentState = "1";
    };
    //改变状态
    Card.prototype.cardState = function (state, txt_num) {
        this.currentState = state;
        if (state == "2") {
            this.txt_bluenum.text = txt_num;
        }
        else if (state == "3") {
            this.txt_rednum.text = txt_num;
        }
    };
    return Card;
}(eui.Component));
__reflect(Card.prototype, "Card");
//# sourceMappingURL=Card.js.map