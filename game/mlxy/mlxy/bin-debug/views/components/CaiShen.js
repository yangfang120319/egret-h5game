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
 * @财神动画
 *
 */
var CaiShen = (function (_super) {
    __extends(CaiShen, _super);
    //定义界面
    function CaiShen() {
        var _this = _super.call(this) || this;
        _this._tween_left = null;
        _this._tween_right = null;
        _this._tween_yun_x = null;
        _this._tween_yun_y = null;
        _this._tween_meimao = null;
        //定义界面
        _this.skinName = CaiShenSkin;
        return _this;
    }
    //初始化界面
    CaiShen.prototype.info = function () {
        //帽子动画
        this._tween_left = egret.Tween.get(this.com_left, { loop: true }).to({ rotation: 10 }, 500).to({ rotation: 0 }, 500);
        this._tween_right = egret.Tween.get(this.com_right, { loop: true }).to({ rotation: -10 }, 500).to({ rotation: 0 }, 500);
        //云动画
        this._tween_yun_x = egret.Tween.get(this.img_yun, { loop: true }).to({ scaleX: 1.35 }, 1000).to({ scaleX: 1.5 }, 1000);
        this._tween_yun_y = egret.Tween.get(this.img_yun, { loop: true }).to({ scaleY: 1.35 }, 1000).to({ scaleY: 1.5 }, 1000);
        //眉毛动画
        this._tween_meimao = egret.Tween.get(this.img_meimao, { loop: true }).
            to({ y: 85 }, 60).to({ y: 95 }, 100).wait(100).
            to({ y: 85 }, 60).to({ y: 95 }, 100).wait(100).
            to({ y: 85 }, 60).to({ y: 95 }, 100).wait(2000);
    };
    //清除界面
    CaiShen.prototype.clean = function () {
        //判断停止
        if (this._tween_left) {
            this._tween_left.setPaused(true);
            this._tween_left = null;
        }
        if (this._tween_right) {
            this._tween_right.setPaused(true);
            this._tween_right = null;
        }
        if (this._tween_yun_x) {
            this._tween_yun_x.setPaused(true);
            this._tween_yun_x = null;
        }
        if (this._tween_yun_y) {
            this._tween_yun_y.setPaused(true);
            this._tween_yun_y = null;
        }
        if (this._tween_meimao) {
            this._tween_meimao.setPaused(true);
            this._tween_meimao = null;
        }
    };
    return CaiShen;
}(eui.Component));
__reflect(CaiShen.prototype, "CaiShen");
//# sourceMappingURL=CaiShen.js.map