var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 *Created by jq on 2016/4/14
 * @计时器
 *
 */
var basic;
(function (basic) {
    var Timer = (function () {
        //初始化
        function Timer(delay, repeat) {
            if (repeat === void 0) { repeat = 0; }
            //数据复制
            this._now_repeat = 0;
            this._delay = delay;
            this._repeat = repeat;
            this._start_time = egret.getTimer();
            //数据清空
            this._timer = null;
            this._obj = null;
            this._onTimer = null;
            this._onTimerComplete = null;
        }
        //注册事件
        Timer.prototype.addEventListener = function (eventName, callback, thisObj) {
            //数据赋值
            this._obj = thisObj;
            //判断显示
            if (eventName == basic.TimerEvent.TIMER) {
                this._onTimer = callback.bind(thisObj);
            }
            else if (eventName == basic.TimerEvent.TIMER_COMPLETE) {
                this._onTimerComplete = callback.bind(thisObj);
            }
        };
        //注销事件
        Timer.prototype.removeEventListener = function (eventName, callback, thisObj) {
            //判断显示
            if (eventName == basic.TimerEvent.TIMER) {
                this._onTimer = null;
            }
            else if (eventName == basic.TimerEvent.TIMER_COMPLETE) {
                this._onTimerComplete = null;
            }
        };
        //开始
        Timer.prototype.start = function () {
            //开始事件
            this._timer = new egret.Timer(Math.floor(this._delay / 10));
            this._timer.addEventListener(egret.TimerEvent.TIMER, this.onTimer.bind(this), this._obj);
            this._timer.start();
        };
        //停止
        Timer.prototype.stop = function () {
            //注销事件
            if (this._timer) {
                this._timer.stop();
                this._timer.removeEventListener(egret.TimerEvent.TIMER, this.onTimer.bind(this), this._obj);
                this._timer = null;
            }
            //清空数据
            this._obj = null;
        };
        //指定时间间隔事件
        Timer.prototype.onTimer = function (e) {
            //定义变量
            var now_repeat;
            //数据赋值
            this._now_time = egret.getTimer() - this._start_time;
            now_repeat = Math.floor(this._now_time / this._delay);
            //判断显示
            if (this._onTimer && now_repeat != this._now_repeat) {
                this._onTimer(basic.TimerEvent);
            }
            //数据赋值
            this._now_repeat = now_repeat;
            //判断结束
            if (this._now_repeat >= this._repeat) {
                //注销事件
                try {
                    if (this._timer) {
                        this._timer.stop();
                        this._timer.removeEventListener(egret.TimerEvent.TIMER, this.onTimer, this._obj);
                        this._timer = null;
                    }
                }
                catch (error) {
                }
                //判断调用函数
                if (this._onTimerComplete) {
                    this._onTimerComplete(basic.TimerEvent);
                }
            }
        };
        return Timer;
    }());
    basic.Timer = Timer;
    __reflect(Timer.prototype, "basic.Timer");
})(basic || (basic = {}));
//# sourceMappingURL=Timer.js.map