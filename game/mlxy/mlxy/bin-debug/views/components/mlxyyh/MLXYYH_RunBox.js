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
 * @Box
 *
 */
var MLXYYH_RunBox = (function (_super) {
    __extends(MLXYYH_RunBox, _super);
    function MLXYYH_RunBox() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._tween_alpha1 = null;
        _this._tween_alpha2 = null;
        _this._tween_scaleX = null;
        _this._tween_scaleY = null;
        return _this;
    }
    //初始化
    MLXYYH_RunBox.prototype.createChildren = function () {
        _super.prototype.createChildren.call(this);
    };
    //初始化
    MLXYYH_RunBox.prototype.info = function (_box_num) {
        //数据赋值
        this.box_num = _box_num;
        //显示界面
        this.img_box.alpha = 0;
        this.rect_mask.alpha = 1;
        this.img_box.visible = true;
        this.img_icon.visible = true;
        this.rect_mask.visible = true;
        this.img_light.visible = false;
        this.img_light.blendMode = "add";
        this.img_icon.source = "icon_mlxyyh_" + this.box_num.toString() + "_0_png";
        this.img_light.source = "icon_mlxyyh_" + this.box_num.toString() + "_1_png";
    };
    //显示界面
    MLXYYH_RunBox.prototype.showBox = function (_time) {
        //显示框
        if (_time == 0) {
            this.img_box.alpha = 1;
            this.rect_mask.alpha = 0;
            this.img_icon.scaleX = 0.93;
            this.img_icon.scaleY = 0.93;
            this.img_light.scaleX = 0.93;
            this.img_light.scaleY = 0.93;
        }
        else {
            this.img_icon.scaleX = 0.93;
            this.img_icon.scaleY = 0.93;
            this.img_light.scaleX = 0.93;
            this.img_light.scaleY = 0.93;
            var tween_alpha11 = egret.Tween.get(this.img_box).
                to({ alpha: 1 }, _time);
            var tween_alpha2 = egret.Tween.get(this.rect_mask).
                to({ alpha: 0 }, _time);
        }
    };
    //隐藏Box
    MLXYYH_RunBox.prototype.hideBox = function (_time) {
        if (_time == 0) {
            this.img_box.alpha = 0;
            this.rect_mask.alpha = 0.83;
            this.img_icon.scaleX = 0.83;
            this.img_icon.scaleY = 0.83;
            this.img_light.scaleX = 0.83;
            this.img_light.scaleY = 0.83;
        }
        else {
            //显示框
            this.img_icon.scaleX = 0.83;
            this.img_icon.scaleY = 0.83;
            this.img_light.scaleX = 0.83;
            this.img_light.scaleY = 0.83;
            var tween_alpha1 = egret.Tween.get(this.img_box).
                to({ alpha: 0 }, _time);
            var tween_alpha2 = egret.Tween.get(this.rect_mask).
                to({ alpha: 1 }, _time);
        }
    };
    //显示遮罩宽度
    MLXYYH_RunBox.prototype.showMaskWidth = function (_width) {
        //显示宽度
        this.rect_mask.width = _width;
    };
    //显示遮罩高度
    MLXYYH_RunBox.prototype.showMaskHeight = function (_height) {
        //显示高度
        this.rect_mask.height = _height;
    };
    //显示遮罩Y
    MLXYYH_RunBox.prototype.showMaskY = function (_Y) {
        //显示高度
        this.rect_mask.y = _Y;
    };
    //显示闪灯
    MLXYYH_RunBox.prototype.startLight = function () {
        //停止发光
        this.stopLight();
        //显示
        this.img_light.alpha = 0;
        this.img_light.visible = true;
        //显示发光
        this._tween_alpha1 = egret.Tween.get(this.img_light, { loop: true }).
            to({ alpha: 0.6 }, 800).wait(300).
            to({ alpha: 0 }, 800).wait(300);
    };
    //清除界面
    MLXYYH_RunBox.prototype.clean = function () {
        //判断开始发光
        if (this.img_light.visible == true) {
            if (this._tween_alpha1) {
                this._tween_alpha1.setPaused(true);
                this._tween_alpha1 = null;
            }
            if (this._tween_alpha2) {
                this._tween_alpha2.setPaused(true);
                this._tween_alpha2 = null;
            }
            this.img_light.visible = false;
        }
        this.rect_mask.alpha = 0;
    };
    //显示遮罩
    MLXYYH_RunBox.prototype.showMask = function () {
        this.rect_mask.alpha = 1;
    };
    //隐藏遮罩
    MLXYYH_RunBox.prototype.hideMask = function () {
        this.rect_mask.alpha = 0;
    };
    //停止闪灯
    MLXYYH_RunBox.prototype.stopLight = function () {
        //判断开始发光
        if (this.img_light.visible == true) {
            if (this._tween_alpha1) {
                this._tween_alpha1.setPaused(true);
                this._tween_alpha1 = null;
            }
            if (this._tween_alpha2) {
                this._tween_alpha2.setPaused(true);
                this._tween_alpha2 = null;
            }
            this.img_light.visible = false;
        }
    };
    return MLXYYH_RunBox;
}(eui.Component));
__reflect(MLXYYH_RunBox.prototype, "MLXYYH_RunBox");
//# sourceMappingURL=MLXYYH_RunBox.js.map