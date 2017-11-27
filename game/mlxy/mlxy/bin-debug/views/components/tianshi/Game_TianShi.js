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
 * @天使
 *
 */
var Game_TianShi = (function (_super) {
    __extends(Game_TianShi, _super);
    function Game_TianShi() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._tween_light_y = null;
        _this._tween_light_scaleX = null;
        _this._tween_light_scaleY = null;
        _this._tween_light_alpha = null;
        _this._tween_chibang_rotation0 = null;
        _this._tween_chibang_rotation1 = null;
        _this.chibang_rotation = 10;
        _this.chibang_start_rotation = 13;
        return _this;
    }
    //初始化
    Game_TianShi.prototype.createChildren = function () {
        _super.prototype.createChildren.call(this);
    };
    //天使初始化
    Game_TianShi.prototype.info = function () {
        //停止动画
        this.stop();
        //数据赋值
        this.com_chibang0.rotation = -this.chibang_start_rotation;
        this.com_chibang1.rotation = this.chibang_start_rotation;
    };
    //开始动画
    Game_TianShi.prototype.start = function (_time) {
        //开始眨眼睛
        this.eyes.start();
        //开始光动画
        this.startLightAction();
        //显示翅膀动画
        this.startChiBangAction(_time);
    };
    //开始光动画
    Game_TianShi.prototype.startLightAction = function () {
        //定义变量
        var show_time = 1200;
        //显示光环
        this.com_light.y = 58;
        this.com_light.alpha = 1;
        this.com_light.scaleX = 1;
        this.com_light.scaleY = 1;
        this._tween_light_scaleX = egret.Tween.get(this.com_light, { loop: true }).
            to({ scaleX: 0.8 }, show_time).
            to({ scaleX: 1 }, show_time);
        this._tween_light_scaleY = egret.Tween.get(this.com_light, { loop: true }).
            to({ scaleY: 0.94 }, show_time).
            to({ scaleY: 1 }, show_time);
        this._tween_light_alpha = egret.Tween.get(this.com_light, { loop: true }).
            to({ alpha: 0.6 }, show_time).
            to({ alpha: 1 }, show_time);
        this._tween_light_y = egret.Tween.get(this.com_light, { loop: true }).
            to({ y: 62 }, show_time).
            to({ y: 58 }, show_time);
    };
    //停止光动画
    Game_TianShi.prototype.stopLightAction = function () {
        //停止动画
        if (this._tween_light_scaleX) {
            this._tween_light_scaleX.setPaused(true);
            this._tween_light_scaleX = null;
        }
        if (this._tween_light_scaleY) {
            this._tween_light_scaleY.setPaused(true);
            this._tween_light_scaleY = null;
        }
        if (this._tween_light_alpha) {
            this._tween_light_alpha.setPaused(true);
            this._tween_light_alpha = null;
        }
        if (this._tween_light_y) {
            this._tween_light_y.setPaused(true);
            this._tween_light_y = null;
        }
    };
    //开始翅膀动画
    Game_TianShi.prototype.startChiBang = function (_time) {
        //开始动画
        this._tween_chibang_rotation0 = egret.Tween.get(this.com_chibang0).
            to({ rotation: this.chibang_rotation }, _time);
        this._tween_chibang_rotation1 = egret.Tween.get(this.com_chibang1).
            to({ rotation: -this.chibang_rotation }, _time);
    };
    //初始化界面
    Game_TianShi.prototype.infoChiBang = function () {
        this.com_chibang0.rotation = this.chibang_rotation;
        this.com_chibang1.rotation = -this.chibang_rotation;
    };
    //开始翅膀动画
    Game_TianShi.prototype.startChiBangAction = function (_time) {
        //开始动画
        this._tween_chibang_rotation0 = egret.Tween.get(this.com_chibang0, { loop: true }).
            to({ rotation: -this.chibang_rotation }, _time).
            to({ rotation: this.chibang_rotation }, _time);
        this._tween_chibang_rotation1 = egret.Tween.get(this.com_chibang1, { loop: true }).
            to({ rotation: this.chibang_rotation }, _time).
            to({ rotation: -this.chibang_rotation }, _time);
    };
    //停止翅膀动画
    Game_TianShi.prototype.stopChiBangAction = function () {
        if (this._tween_chibang_rotation0) {
            this._tween_chibang_rotation0.setPaused(true);
            this._tween_chibang_rotation0 = null;
        }
        if (this._tween_chibang_rotation1) {
            this._tween_chibang_rotation1.setPaused(true);
            this._tween_chibang_rotation1 = null;
        }
    };
    //停止动画
    Game_TianShi.prototype.stop = function () {
        //停止眨眼睛
        this.eyes.stop();
        //停止光动画
        this.stopLightAction();
        //停止翅膀动画
        this.stopChiBangAction();
    };
    return Game_TianShi;
}(eui.Component));
__reflect(Game_TianShi.prototype, "Game_TianShi");
//# sourceMappingURL=Game_TianShi.js.map