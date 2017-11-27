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
 * @倒计时
 *
 */
var JSYS_Time = (function (_super) {
    __extends(JSYS_Time, _super);
    function JSYS_Time() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.timer = null;
        _this.timer_count = null;
        _this._tween_scaleX = null;
        _this._tween_scaleY = null;
        _this._tween_rotation = null;
        return _this;
    }
    //初始化
    JSYS_Time.prototype.createChildren = function () {
        _super.prototype.createChildren.call(this);
        //隐藏图片
        this.g_count.visible = false;
    };
    //开始计时
    JSYS_Time.prototype.start = function (_time, _callback) {
        if (_callback === void 0) { _callback = null; }
        //数据赋值
        this.now_time = _time;
        this.callback = _callback;
        //隐藏图片
        this.g_count.visible = false;
        //判断开始
        if (GameData.JSYS_State == 1 && this.now_time > 0) {
            //显示文本
            this.showText();
            //开始计时
            this.timer = new basic.Timer(1000, this.now_time);
            this.timer.addEventListener(basic.TimerEvent.TIMER, this.onTimer, this);
            this.timer.addEventListener(basic.TimerEvent.TIMER_COMPLETE, this.onTimerComplete, this);
            this.timer.start();
        }
        else {
            //显示文本
            this.txt_time.text = "00";
        }
    };
    //停止计时
    JSYS_Time.prototype.clean = function () {
        //判断停止
        if (this.timer) {
            this.timer.stop();
            this.timer.removeEventListener(basic.TimerEvent.TIMER, this.onTimer, this);
            this.timer.removeEventListener(basic.TimerEvent.TIMER_COMPLETE, this.onTimerComplete, this);
            this.timer = null;
        }
        //停止计时
        if (this.timer_count) {
            this.timer_count.stop();
            this.timer_count.removeEventListener(basic.TimerEvent.TIMER, this.onCount, this);
            this.timer_count.removeEventListener(basic.TimerEvent.TIMER_COMPLETE, this.onCountComplete, this);
            this.timer_count = null;
        }
        //停止动画
        if (this._tween_scaleX) {
            this._tween_scaleX.setPaused(true);
            this._tween_scaleX = null;
        }
        if (this._tween_scaleY) {
            this._tween_scaleY.setPaused(true);
            this._tween_scaleY = null;
        }
        if (this._tween_rotation) {
            this._tween_rotation.setPaused(true);
            this._tween_rotation = null;
        }
        //隐藏图片
        this.g_count.visible = false;
    };
    //显示文本
    JSYS_Time.prototype.showText = function () {
        //判断显示
        if (this.now_time > 0) {
            //判断显示
            if (this.now_time < 10) {
                this.txt_time.text = "0" + this.now_time.toString();
            }
            else {
                this.txt_time.text = this.now_time.toString();
            }
        }
        else {
            //显示文本
            this.txt_time.text = "00";
        }
    };
    //计时中
    JSYS_Time.prototype.onTimer = function (e) {
        //数据赋值
        this.now_time -= 1;
        //显示文本
        this.showText();
    };
    //计时结束
    JSYS_Time.prototype.onTimerComplete = function (e) {
        //停止计时
        if (this.timer) {
            this.timer.stop();
            this.timer.removeEventListener(basic.TimerEvent.TIMER, this.onTimer, this);
            this.timer.removeEventListener(basic.TimerEvent.TIMER_COMPLETE, this.onTimerComplete, this);
            this.timer = null;
        }
        //显示回调函数
        if (this.callback != null) {
            this.callback();
        }
        //显示倒计时
        this.startCount();
    };
    //开始倒计时
    JSYS_Time.prototype.startCount = function () {
        //显示图片
        this.now_count = 3;
        this.g_count.visible = true;
        //显示动画
        this.showCountAction(this.now_count);
        //开始动画
        this.com_light.rotation = 0;
        this._tween_rotation = egret.Tween.get(this.com_light, { loop: true }).to({ rotation: 360 }, 5000);
        //开始计时
        this.timer_count = new basic.Timer(1000, 3);
        this.timer_count.addEventListener(basic.TimerEvent.TIMER, this.onCount, this);
        this.timer_count.addEventListener(basic.TimerEvent.TIMER_COMPLETE, this.onCountComplete, this);
        this.timer_count.start();
    };
    //计时中
    JSYS_Time.prototype.onCount = function (e) {
        //数据赋值
        this.now_count -= 1;
        //显示文本
        if (this.now_count > 0) {
            this.showCountAction(this.now_count);
        }
    };
    //计时结束
    JSYS_Time.prototype.onCountComplete = function (e) {
        //停止计时
        if (this.timer_count) {
            this.timer_count.stop();
            this.timer_count.removeEventListener(basic.TimerEvent.TIMER, this.onCount, this);
            this.timer_count.removeEventListener(basic.TimerEvent.TIMER_COMPLETE, this.onCountComplete, this);
            this.timer_count = null;
        }
        //停止动画
        if (this._tween_scaleX) {
            this._tween_scaleX.setPaused(true);
            this._tween_scaleX = null;
        }
        if (this._tween_scaleY) {
            this._tween_scaleY.setPaused(true);
            this._tween_scaleY = null;
        }
        if (this._tween_rotation) {
            this._tween_rotation.setPaused(true);
            this._tween_rotation = null;
        }
        //隐藏图片
        this.g_count.visible = false;
    };
    //显示动画
    JSYS_Time.prototype.showCountAction = function (_num) {
        //播放声音
        basic.SoundManager.instance.playEffect("sound_jsys_countdown_mp3");
        //显示界面
        this.g_count.scaleX = 0;
        this.g_count.scaleY = 0;
        this.img_count.source = "txt_jsys_countdown" + _num + "_png";
        this._tween_scaleX = egret.Tween.get(this.g_count).to({ scaleX: 1 }, 400, egret.Ease.backOut);
        this._tween_scaleY = egret.Tween.get(this.g_count).to({ scaleY: 1 }, 400, egret.Ease.backOut);
    };
    return JSYS_Time;
}(eui.Component));
__reflect(JSYS_Time.prototype, "JSYS_Time");
