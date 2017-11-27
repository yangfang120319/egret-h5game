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
var CountDown = (function (_super) {
    __extends(CountDown, _super);
    function CountDown() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._timer_count = null;
        return _this;
    }
    //初始化
    CountDown.prototype.createChildren = function () {
        _super.prototype.createChildren.call(this);
        //显示倒计时
        this.visible = false;
    };
    //开始倒计时
    CountDown.prototype.start = function (_callback) {
        //数据赋值
        this.now_count = 3;
        this.callback = _callback;
        //显示界面
        this.visible = true;
        //显示界面
        this.showNowNum();
        //开始计时
        this._timer_count = new egret.Timer(1000, 4);
        this._timer_count.addEventListener(egret.TimerEvent.TIMER, this.onCountDown, this);
        this._timer_count.addEventListener(egret.TimerEvent.TIMER_COMPLETE, this.onCountDownComplete, this);
        this._timer_count.start();
    };
    //计时中
    CountDown.prototype.onCountDown = function (e) {
        //数据赋值
        this.now_count -= 1;
        //显示界面
        if (this.now_count >= 0) {
            this.showNowNum();
        }
    };
    //计时结束
    CountDown.prototype.onCountDownComplete = function (e) {
        //停止计时
        this.stop();
    };
    //停止计时
    CountDown.prototype.stop = function () {
        //停止计时
        if (this._timer_count) {
            this._timer_count.stop();
            this._timer_count.removeEventListener(egret.TimerEvent.TIMER, this.onCountDown, this);
            this._timer_count.removeEventListener(egret.TimerEvent.TIMER_COMPLETE, this.onCountDownComplete, this);
            this._timer_count = null;
        }
        //回调函数
        this.callback();
        //隐藏界面
        this.visible = false;
    };
    //显示当前数字
    CountDown.prototype.showNowNum = function () {
        //显示图片
        this.img_countdown.source = "txt_g_countdown" + this.now_count.toString() + "_png";
        //显示动画
        this.img_countdown.scaleX = 5;
        this.img_countdown.scaleY = 5;
        //显示动画
        var _tween_scaleX = egret.Tween.get(this.img_countdown).to({ scaleX: 1 }, 200);
        var _tween_scaleY = egret.Tween.get(this.img_countdown).to({ scaleY: 1 }, 200);
    };
    return CountDown;
}(eui.Component));
__reflect(CountDown.prototype, "CountDown");
//# sourceMappingURL=CountDown.js.map