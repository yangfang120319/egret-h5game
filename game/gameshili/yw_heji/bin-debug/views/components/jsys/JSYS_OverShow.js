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
 * @结束显示
 *
 */
var JSYS_OverShow = (function (_super) {
    __extends(JSYS_OverShow, _super);
    function JSYS_OverShow() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._tween_rotation = null;
        _this.box_y = [0, 0, 27, 27, 27, 27, 27, 27, 27, 27];
        return _this;
    }
    //初始化
    JSYS_OverShow.prototype.createChildren = function () {
        _super.prototype.createChildren.call(this);
        this.rotation;
        //显示界面
        this.visible = false;
    };
    //开始动画
    JSYS_OverShow.prototype.start = function (_box) {
        var _this = this;
        //显示图片
        this.visible = true;
        this.img_beilv.scaleX = 0;
        this.img_beilv.scaleY = 0;
        this.com_light.scaleX = 0;
        this.com_light.scaleY = 0;
        this.img_box.y = this.box_y[_box];
        this.img_box.source = "icon_jsys_box_big" + _box.toString() + "_png";
        this.img_beilv.source = "txt_sjys_x" + GameData.JSYS_Box_Beilv[_box] + "_png";
        //初始化界面
        this.g_show.alpha = 0;
        this.img_tiao.y = -150;
        this.img_tiao.alpha = 0;
        this.g_show.scaleX = 0.2;
        this.g_show.scaleY = 0.2;
        //显示动画
        this.com_light.rotation = 0;
        this._tween_rotation = egret.Tween.get(this.com_light, { loop: true }).to({ rotation: 360 }, 4000);
        var _tween_scaleX_light = egret.Tween.get(this.com_light).wait(600).to({ scaleX: 1.8 }, 200).wait(3300).to({ scaleX: 0 }, 200);
        var _tween_scaleY_light = egret.Tween.get(this.com_light).wait(600).to({ scaleY: 1.8 }, 200).wait(3300).to({ scaleY: 0 }, 200);
        var _tween_scaleX_beilv = egret.Tween.get(this.img_beilv).wait(300).to({ scaleX: 1 }, 200).wait(3400).to({ scaleX: 0 }, 200);
        var _tween_scaleY_beilv = egret.Tween.get(this.img_beilv).wait(300).to({ scaleY: 1 }, 200).wait(3400).to({ scaleY: 0 }, 200);
        var _tween_scaleX_show = egret.Tween.get(this.g_show).wait(600).to({ scaleX: 1 }, 300).wait(3300).to({ scaleX: 0.2 }, 300);
        var _tween_scaleY_show = egret.Tween.get(this.g_show).wait(600).to({ scaleY: 1 }, 300).wait(3300).to({ scaleY: 0.2 }, 300);
        var _tween_alpha_show = egret.Tween.get(this.g_show).wait(600).to({ alpha: 1 }, 200).wait(3500).to({ alpha: 0 }, 200);
        var _tween_alpha = egret.Tween.get(this.img_tiao).to({ alpha: 1 }, 300).wait(4200).to({ alpha: 0 }, 300);
        var _tween_y = egret.Tween.get(this.img_tiao).to({ y: 150 }, 300).wait(4200).to({ y: -150 }, 300).call(function () {
            //显示界面
            _this.visible = false;
            if (_this._tween_rotation) {
                _this._tween_rotation.setPaused(true);
                _this._tween_rotation = null;
            }
        });
    };
    return JSYS_OverShow;
}(eui.Component));
__reflect(JSYS_OverShow.prototype, "JSYS_OverShow");
