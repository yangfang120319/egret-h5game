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
 * @爆庄
 *
 */
var JSYS_BaoZhuang = (function (_super) {
    __extends(JSYS_BaoZhuang, _super);
    function JSYS_BaoZhuang() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._tween_alpha = null;
        _this._tween_scaleX = null;
        _this._tween_scaleY = null;
        _this._timer_action = null;
        _this._tween_alpha_bao = null;
        _this.now_action = 0;
        return _this;
    }
    //初始化
    JSYS_BaoZhuang.prototype.createChildren = function () {
        _super.prototype.createChildren.call(this);
        //清除界面
        this.clean();
        //注册事件
        basic.Dispatcher.addListener(EventNames.JSYS_BAOZHUANG, this.onBaoZhuang, this);
    };
    //显示爆庄效果
    JSYS_BaoZhuang.prototype.onBaoZhuang = function (e) {
        //清除界面
        this.clean();
        //显示界面
        this.visible = true;
        //显示动画
        this._tween_alpha = egret.Tween.get(this.img_back).wait(100).to({ alpha: 1 }, 200);
        this._tween_scaleX = egret.Tween.get(this.img_back).wait(100).to({ scaleX: 0.7 }, 200);
        this._tween_scaleY = egret.Tween.get(this.img_back).wait(100).to({ scaleY: 0.7 }, 200);
        //开始动画
        this._timer_action = new egret.Timer(100, 5);
        this._timer_action.addEventListener(egret.TimerEvent.TIMER, this.onAction, this);
        this._timer_action.addEventListener(egret.TimerEvent.TIMER_COMPLETE, this.onActionComplete, this);
        this._timer_action.start();
    };
    //开始动画
    JSYS_BaoZhuang.prototype.onAction = function (e) {
        //显示动画
        this.now_action += 1;
        this.img_bao.source = "icon_jsys_bao" + this.now_action.toString() + "_png";
    };
    //动画结束
    JSYS_BaoZhuang.prototype.onActionComplete = function (e) {
        var _this = this;
        //停止
        if (this._timer_action) {
            this._timer_action.stop();
            this._timer_action.removeEventListener(egret.TimerEvent.TIMER, this.onAction, this);
            this._timer_action.removeEventListener(egret.TimerEvent.TIMER_COMPLETE, this.onActionComplete, this);
            this._timer_action = null;
        }
        //显示动画
        this._tween_alpha_bao = egret.Tween.get(this.img_bao).to({ alpha: 0 }, 100).wait(3000).call(function () {
            //清除界面
            _this.clean();
        });
    };
    //清除界面
    JSYS_BaoZhuang.prototype.clean = function () {
        //显示界面
        this.now_action = 0;
        this.visible = false;
        this.img_bao.alpha = 1;
        this.img_back.alpha = 0;
        this.img_back.scaleX = 0;
        this.img_back.scaleY = 0;
        this.img_bao.source = "icon_jsys_bao" + this.now_action.toString() + "_png";
        //判断停止
        if (this._tween_alpha) {
            this._tween_alpha.setPaused(true);
            this._tween_alpha = null;
        }
        if (this._tween_scaleX) {
            this._tween_scaleX.setPaused(true);
            this._tween_scaleX = null;
        }
        if (this._tween_scaleY) {
            this._tween_scaleY.setPaused(true);
            this._tween_scaleY = null;
        }
        if (this._tween_alpha_bao) {
            this._tween_alpha_bao.setPaused(true);
            this._tween_alpha_bao = null;
        }
        //判断显示
        if (this._timer_action) {
            this._timer_action.stop();
            this._timer_action.removeEventListener(egret.TimerEvent.TIMER, this.onAction, this);
            this._timer_action.removeEventListener(egret.TimerEvent.TIMER, this.onActionComplete, this);
            this._timer_action = null;
        }
    };
    return JSYS_BaoZhuang;
}(eui.Component));
__reflect(JSYS_BaoZhuang.prototype, "JSYS_BaoZhuang");
