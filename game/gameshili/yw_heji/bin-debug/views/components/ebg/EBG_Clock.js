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
 * @二八杠时钟
 *
 */
var EBG_Clock = (function (_super) {
    __extends(EBG_Clock, _super);
    function EBG_Clock() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.timer = null; //计时器
        _this._tween_scaleX = null;
        _this._tween_scaleY = null;
        return _this;
    }
    //初始化
    EBG_Clock.prototype.createChildren = function () {
        _super.prototype.createChildren.call(this);
    };
    //开始计时
    EBG_Clock.prototype.start = function (_time) {
        //停止计时
        this.stop();
        //数据赋值
        this.num_nowtimer = 0;
        this.num_timer = _time - 1;
        //显示文本
        this.showText();
        //显示界面
        this.visible = true;
        //开始计时
        this.timer = new basic.Timer(1000, this.num_timer);
        this.timer.addEventListener(basic.TimerEvent.TIMER, this.onTimer, this);
        this.timer.addEventListener(basic.TimerEvent.TIMER_COMPLETE, this.onTimerComplete, this);
        this.timer.start();
    };
    //停止计时
    EBG_Clock.prototype.stop = function () {
        //判断停止
        if (this.timer) {
            this.timer.stop();
            this.timer.removeEventListener(basic.TimerEvent.TIMER, this.onTimer, this);
            this.timer.removeEventListener(basic.TimerEvent.TIMER_COMPLETE, this.onTimerComplete, this);
            this.timer = null;
        }
        //停止缓动
        if (this._tween_scaleX) {
            this._tween_scaleX.setPaused(true);
        }
        if (this._tween_scaleY) {
            this._tween_scaleY.setPaused(true);
        }
    };
    //显示文本
    EBG_Clock.prototype.showText = function () {
        //定义变量
        var num_now = this.num_timer - this.num_nowtimer - 1;
        //显示文本
        this.txt_time.text = num_now.toString();
        //判断显示动画
        if (num_now < 6) {
            //判断播放声音
            if (num_now < 4) {
                basic.SoundManager.instance.playEffect("sound_ebg_countdown_mp3");
            }
            //显示动画
            this._tween_scaleX = egret.Tween.get(this.txt_time).to({ scaleX: 1.4 }, 100).to({ scaleX: 1 }, 100);
            this._tween_scaleY = egret.Tween.get(this.txt_time).to({ scaleY: 1.4 }, 100).to({ scaleY: 1 }, 100);
        }
        else {
            this.txt_time.scaleX = 1;
            this.txt_time.scaleY = 1;
        }
    };
    //计时中
    EBG_Clock.prototype.onTimer = function (e) {
        //数据赋值
        this.num_nowtimer += 1;
        //显示文本
        this.showText();
    };
    //计时结束
    EBG_Clock.prototype.onTimerComplete = function (e) {
        //停止计时
        if (this.timer) {
            this.timer.stop();
            this.timer.removeEventListener(basic.TimerEvent.TIMER, this.onTimer, this);
            this.timer.removeEventListener(basic.TimerEvent.TIMER_COMPLETE, this.onTimerComplete, this);
            this.timer = null;
        }
        //数据赋值
        GameData.EBG_State = 2;
        //隐藏界面
        this.visible = false;
    };
    return EBG_Clock;
}(eui.Component));
__reflect(EBG_Clock.prototype, "EBG_Clock");
