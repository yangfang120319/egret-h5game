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
 * @加载动画
 *
 */
var Loading = (function (_super) {
    __extends(Loading, _super);
    function Loading() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._tween_ma0 = null;
        _this._tween_ma1 = null;
        _this._tween_ma2 = null;
        _this._tween_star = null;
        _this._tween_light1 = null;
        _this._tween_light2 = null;
        _this._tween_light3 = null;
        return _this;
    }
    //初始化
    Loading.prototype.createChildren = function () {
        _super.prototype.createChildren.call(this);
    };
    //开始动画
    Loading.prototype.startPlay = function () {
        console.info(434434343);
        //星星动画
        this.img_star.rotation = 0;
        this._tween_star = egret.Tween.get(this.img_star, { loop: true }).
            to({ rotation: 360 }, 1000).
            set({ rotation: 0 });
        //显示灯动画
        this.img_light2.alpha = 1;
        this.img_light3.alpha = 1;
        this.img_light1.alpha = 0.3;
        this._tween_light1 = egret.Tween.get(this.img_light1, { loop: true }).wait(200).
            set({ alpha: 1 }, 700).wait(200).
            set({ alpha: 0.3 }, 700);
        this._tween_light2 = egret.Tween.get(this.img_light2, { loop: true }).wait(200).
            set({ alpha: 0.3 }, 700).wait(200).
            set({ alpha: 1 }, 700);
        this._tween_light3 = egret.Tween.get(this.img_light3, { loop: true }).wait(200).
            set({ alpha: 0.3 }, 700).wait(200).
            set({ alpha: 1 }, 700);
        //显示马动画
        this.img_ma0.y = 236;
        this.img_ma1.y = 225;
        this.img_ma2.y = 214;
        this._tween_ma0 = egret.Tween.get(this.img_ma0, { loop: true }).wait(100).
            to({ y: 214 }, 1600).wait(100).
            to({ y: 236 }, 1600);
        this._tween_ma1 = egret.Tween.get(this.img_ma1, { loop: true }).
            to({ y: 236 }, 800).wait(100).
            to({ y: 214 }, 1600).wait(100).
            to({ y: 225 }, 800);
        this._tween_ma2 = egret.Tween.get(this.img_ma2, { loop: true }).wait(100).
            to({ y: 236 }, 1600).wait(100).
            to({ y: 214 }, 1600);
    };
    //停止动画
    Loading.prototype.stopPlay = function () {
        if (this._tween_star) {
            this._tween_star.setPaused(true);
            this._tween_star = null;
        }
        if (this._tween_light1) {
            this._tween_light1.setPaused(true);
            this._tween_light1 = null;
        }
        if (this._tween_light2) {
            this._tween_light2.setPaused(true);
            this._tween_light2 = null;
        }
        if (this._tween_light3) {
            this._tween_light3.setPaused(true);
            this._tween_light3 = null;
        }
        if (this._tween_ma0) {
            this._tween_ma0.setPaused(true);
            this._tween_ma0 = null;
        }
        if (this._tween_ma1) {
            this._tween_ma1.setPaused(true);
            this._tween_ma1 = null;
        }
        if (this._tween_ma2) {
            this._tween_ma2.setPaused(true);
            this._tween_ma2 = null;
        }
    };
    return Loading;
}(eui.Component));
__reflect(Loading.prototype, "Loading");
//# sourceMappingURL=Loading.js.map