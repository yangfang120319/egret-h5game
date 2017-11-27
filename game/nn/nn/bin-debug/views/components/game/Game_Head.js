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
 * @游戏头像
 *
 */
var Game_Head = (function (_super) {
    __extends(Game_Head, _super);
    function Game_Head() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    //初始化
    Game_Head.prototype.createChildren = function () {
        _super.prototype.createChildren.call(this);
        //显示遮罩
        this.rect_mask.visible = true;
        this.img_head.mask = this.rect_mask;
        this.txt_name.visible = false;
        this.img_nameback.visible = false;
    };
    //显示头像
    Game_Head.prototype.show = function (_address, _name) {
        if (_name === void 0) { _name = ""; }
        //显示头像
        if (_address != "" && _address != null) {
            this.img_head.source = _address;
        }
        //判断显示名称
        if (_name == "") {
            this.txt_name.visible = false;
            this.img_nameback.visible = false;
        }
        else {
            this.txt_name.text = _name;
            this.txt_name.visible = true;
            this.img_nameback.visible = true;
        }
    };
    return Game_Head;
}(eui.Component));
__reflect(Game_Head.prototype, "Game_Head");
//# sourceMappingURL=Game_Head.js.map