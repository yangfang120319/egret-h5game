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
var EBG_StartTips = (function (_super) {
    __extends(EBG_StartTips, _super);
    function EBG_StartTips() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._tween_alpha0 = null;
        _this._tween_alpha1 = null;
        _this._tween_alpha2 = null;
        _this._tween_alpha3 = null;
        return _this;
    }
    //初始化
    EBG_StartTips.prototype.createChildren = function () {
        _super.prototype.createChildren.call(this);
        //显示界面
        this.visible = false;
    };
    //开始提示
    EBG_StartTips.prototype.start = function () {
        var _this = this;
        //定义变量
        var time = 100;
        //隐藏字
        this.img_1.x = 90;
        this.img_2.x = 210;
        this.img_3.x = 330;
        this.img_0.alpha = 0;
        this.img_1.alpha = 0;
        this.img_2.alpha = 0;
        this.img_3.alpha = 0;
        this.visible = true;
        //显示第一个字
        this._tween_alpha0 = egret.Tween.get(this.img_0).to({ alpha: 1 }, 300).wait(200).call(function () {
            //显示第二个字
            var _tween_alpha1 = egret.Tween.get(_this.img_1).to({ x: 210 }, time);
            _this._tween_alpha1 = egret.Tween.get(_this.img_1).wait(time / 2).to({ alpha: 1 }, time / 2).wait(200).call(function () {
                //显示第三个字
                var _tween_alpha2 = egret.Tween.get(_this.img_2).to({ x: 330 }, time);
                _this._tween_alpha2 = egret.Tween.get(_this.img_2).wait(time / 2).to({ alpha: 1 }, time / 2).wait(200).call(function () {
                    //显示第四个字
                    var _tween_alpha3 = egret.Tween.get(_this.img_3).to({ x: 450 }, time);
                    _this._tween_alpha3 = egret.Tween.get(_this.img_3).wait(time / 2).to({ alpha: 1 }, time / 2).wait(2000).call(function () {
                        //退出界面
                        _this.visible = false;
                    });
                });
            });
        });
    };
    return EBG_StartTips;
}(eui.Component));
__reflect(EBG_StartTips.prototype, "EBG_StartTips");
