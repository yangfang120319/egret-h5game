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
 * @失败
 *
 */
var Action_Lose = (function (_super) {
    __extends(Action_Lose, _super);
    function Action_Lose() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._tween_y = null;
        _this._tween_book_x = null;
        _this._tween_renwu_x = null;
        _this._tween_light_alpha = null;
        _this._tween_light_rotation = null;
        _this._tween_xunzhang_alpha = null;
        return _this;
    }
    //初始化
    Action_Lose.prototype.createChildren = function () {
        _super.prototype.createChildren.call(this);
    };
    //开始动画
    Action_Lose.prototype.start = function (_type) {
        var _this = this;
        //清除界面
        this.clean();
        //判断显示动画
        if (_type == 1) {
            this.img_title.source = "txt_tzsb_png";
            this._tween_renwu_x = egret.Tween.get(this.img_renwu).wait(300).to({ x: 170 }, 200);
            this._tween_book_x = egret.Tween.get(this.img_book).wait(500).to({ x: 375 }, 200, egret.Ease.backOut);
        }
        else {
            this.img_title.source = "txt_cgsb_png";
            //显示动画
            this._tween_xunzhang_alpha = egret.Tween.get(this.img_xunzhang).wait(300).to({ alpha: 1 }, 500);
        }
        //开始动画
        this._tween_light_alpha = egret.Tween.get(this.com_light).wait(400).to({ alpha: 1 }, 700);
        this._tween_y = egret.Tween.get(this.g_title).to({ y: 290 }, 300, egret.Ease.backOut);
        //判断显示光动画
        egret.setTimeout(function () {
            _this._tween_light_rotation = egret.Tween.get(_this.com_light, { loop: true }).to({ rotation: 360 }, 8000);
        }, this, 400);
    };
    //清除
    Action_Lose.prototype.clean = function () {
        //隐藏界面
        this.g_title.y = -170;
        this.img_book.x = 650;
        this.img_renwu.x = -230;
        this.com_light.alpha = 0;
        this.com_light.rotation = 0;
        this.img_xunzhang.alpha = 0;
        //停止动画
        if (this._tween_y) {
            this._tween_y.setPaused(true);
            this._tween_y = null;
        }
        if (this._tween_renwu_x) {
            this._tween_renwu_x.setPaused(true);
            this._tween_renwu_x = null;
        }
        if (this._tween_book_x) {
            this._tween_book_x.setPaused(true);
            this._tween_book_x = null;
        }
        if (this._tween_light_alpha) {
            this._tween_light_alpha.setPaused(true);
            this._tween_light_alpha = null;
        }
        if (this._tween_light_rotation) {
            this._tween_light_rotation.setPaused(true);
            this._tween_light_rotation = null;
        }
        if (this._tween_xunzhang_alpha) {
            this._tween_xunzhang_alpha.setPaused(true);
            this._tween_xunzhang_alpha = null;
        }
    };
    return Action_Lose;
}(eui.Component));
__reflect(Action_Lose.prototype, "Action_Lose");
//# sourceMappingURL=Action_Lose.js.map