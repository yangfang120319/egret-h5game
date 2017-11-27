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
var HeadGame = (function (_super) {
    __extends(HeadGame, _super);
    function HeadGame() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    //初始化
    HeadGame.prototype.createChildren = function () {
        _super.prototype.createChildren.call(this);
        //显示遮罩
        this.img_mask.visible = true;
        this.currentState = "0";
    };
    //显示头像
    HeadGame.prototype.show = function (_head) {
        //判断显示
        if (_head != "" && _head != null) {
            this.img_head.source = _head;
        }
        else {
            this.img_head.source = "";
        }
    };
    //显示遮罩
    HeadGame.prototype.showStatus = function (_status) {
        if (_status == 0) {
            //隐藏遮罩
            this.img_mask.visible = false;
        }
        else {
            //显示遮罩
            this.img_mask.visible = true;
        }
    };
    //改变状态
    HeadGame.prototype.changeState = function (_state) {
        this.currentState = _state;
    };
    return HeadGame;
}(eui.Component));
__reflect(HeadGame.prototype, "HeadGame");
//# sourceMappingURL=HeadGame.js.map