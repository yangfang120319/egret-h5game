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
var Head = (function (_super) {
    __extends(Head, _super);
    function Head() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    //初始化
    Head.prototype.createChildren = function () {
        _super.prototype.createChildren.call(this);
        //定义遮罩
        this.img_mask.visible = true;
        this.img_head.mask = this.img_mask;
    };
    //显示头像
    Head.prototype.show = function (_head) {
        //判断显示头像
        if (_head != "" && _head != null) {
            this.img_head.source = _head;
        }
        else {
            this.img_head.source = "";
        }
        this.currentState = "show";
    };
    //隐藏头像
    Head.prototype.hide = function () {
        //隐藏头像
        this.img_head.source = "";
        this.currentState = "hide";
        this.com_sex.visible = false;
    };
    //显示性别
    Head.prototype.showSex = function (_sex) {
        //显示性别
        this.com_sex.visible = true;
        this.com_sex.currentState = _sex.toString();
    };
    //显示遮罩
    Head.prototype.showStatus = function (_status) {
        if (_status == 0) {
            //隐藏遮罩
            this.rect_mask.visible = false;
        }
        else {
            //显示遮罩
            this.rect_mask.visible = true;
        }
    };
    //显示名称
    Head.prototype.showName = function (_name) {
        //显示昵称
        this.txt_name.text = _name;
        this.txt_name.visible = true;
    };
    return Head;
}(eui.Component));
__reflect(Head.prototype, "Head");
//# sourceMappingURL=Head.js.map