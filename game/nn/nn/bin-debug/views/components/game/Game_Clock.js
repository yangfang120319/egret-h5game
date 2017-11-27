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
 * @游戏倒计时
 *
 */
var Game_Clock = (function (_super) {
    __extends(Game_Clock, _super);
    function Game_Clock() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.timer = null; //计时器
        _this._tween_scaleX = null;
        _this._tween_scaleY = null;
        _this._tween_alpha = null;
        _this._tween_scaleX_add = null;
        _this._tween_scaleY_add = null;
        _this._tween_alpha_add = null;
        return _this;
    }
    //初始化
    Game_Clock.prototype.createChildren = function () {
        _super.prototype.createChildren.call(this);
        //隐藏界面
        this.txt_time.visible = true;
        this.img_back.visible = true;
        this.g_waiting.visible = false;
        this.img_countdown.visible = false;
        this.img_countdown_add.visible = false;
    };
    //初始化
    Game_Clock.prototype.info = function (_type) {
        //数据赋值
        this.game_type = _type;
    };
    //显示等待界面
    Game_Clock.prototype.showWaiting = function (_tips) {
        this.visible = true;
        this.txt_tips.text = _tips;
        this.txt_time.visible = false;
        this.img_back.visible = false;
        this.g_waiting.visible = true;
        this.img_countdown.visible = false;
        this.img_countdown_add.visible = false;
    };
    //开始计时
    Game_Clock.prototype.startTimer = function (_status, _continue_time, _callback) {
        if (_continue_time === void 0) { _continue_time = 0; }
        if (_callback === void 0) { _callback = null; }
        //停止计时
        this.stopTimer();
        //数据赋值
        this.now_status = _status;
        this.callback = _callback;
        //判断显示
        if (_status == 0) {
            console.log(5);
            //显示界面
            this.visible = true;
            this.txt_time.visible = false;
            this.img_back.visible = false;
            this.g_waiting.visible = true;
            this.img_countdown.visible = false;
            this.img_countdown_add.visible = false;
            this.txt_tips.text = "本局马上开始，等待开始下注！";
        }
        else if (_status == 1) {
            //数据赋值
            this.now_time = 0;
            this.continue_time = _continue_time;
            //显示文本
            this.showText();
            //显示界面
            this.visible = true;
            this.txt_time.visible = true;
            this.img_back.visible = true;
            this.g_waiting.visible = false;
            this.img_countdown.visible = false;
            this.img_countdown_add.visible = false;
            //开始计时
            if (this.continue_time > 0) {
                this.timer = new basic.Timer(1000, this.continue_time);
                this.timer.addEventListener(basic.TimerEvent.TIMER, this.onTimer, this);
                this.timer.addEventListener(basic.TimerEvent.TIMER_COMPLETE, this.onTimerComplete, this);
                this.timer.start();
            }
        }
        else {
            this.visible = false;
        }
    };
    //停止计时
    Game_Clock.prototype.stopTimer = function () {
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
    Game_Clock.prototype.showText = function () {
        //定义变量
        var num_now = this.continue_time - this.now_time - 1;
        //判断显示
        if (this.now_status == 1 && num_now >= 0) {
            if (num_now < 6) {
                //显示界面
                this.txt_time.visible = false;
                this.img_back.visible = false;
                this.img_countdown.visible = true;
                this.img_countdown_add.visible = true;
                //显示界面
                this.img_countdown.alpha = 1;
                this.img_countdown.scaleX = 5;
                this.img_countdown.scaleY = 5;
                this.img_countdown_add.alpha = 0;
                this.img_countdown.source = "icon_countdown" + num_now.toString() + "_png";
                this.img_countdown_add.source = "icon_countdown" + num_now.toString() + "_png";
                //显示动画
                if (num_now == 0) {
                    //播放声音
                    basic.SoundManager.instance.playEffect("sound_g_countover_mp3");
                    //显示动画
                    this.img_countdown_add.scaleX = 1;
                    this.img_countdown_add.scaleY = 1;
                    this._tween_alpha = egret.Tween.get(this.img_countdown).wait(1000).to({ alpha: 0 }, 200);
                    this._tween_scaleX = egret.Tween.get(this.img_countdown_add).wait(1000).to({ scaleX: 2 }, 200);
                    this._tween_scaleY = egret.Tween.get(this.img_countdown_add).wait(1000).to({ scaleY: 2 }, 200);
                    this._tween_scaleX = egret.Tween.get(this.img_countdown).to({ scaleX: 1 }, 200).wait(800).to({ scaleX: 1.5 }, 200);
                    this._tween_scaleY = egret.Tween.get(this.img_countdown).to({ scaleY: 1 }, 200).wait(800).to({ scaleY: 1.5 }, 200);
                    this._tween_alpha_add = egret.Tween.get(this.img_countdown_add).wait(100).to({ alpha: 1 }, 100).wait(800).to({ alpha: 0 }, 200).call(function () {
                        //播放声音
                        basic.SoundManager.instance.playEffect("sound_g_yazhuover_mp3");
                    });
                }
                else if (num_now > 0) {
                    //播放声音
                    basic.SoundManager.instance.playEffect("sound_g_count_mp3");
                    //显示动画
                    this.img_countdown_add.scaleX = 0.5;
                    this.img_countdown_add.scaleY = 0.5;
                    this._tween_alpha = egret.Tween.get(this.img_countdown).wait(500).to({ alpha: 0 }, 200);
                    this._tween_scaleX = egret.Tween.get(this.img_countdown_add).wait(500).to({ scaleX: 2 }, 200);
                    this._tween_scaleY = egret.Tween.get(this.img_countdown_add).wait(500).to({ scaleY: 2 }, 200);
                    this._tween_scaleX = egret.Tween.get(this.img_countdown).to({ scaleX: 0.5 }, 200).wait(300).to({ scaleX: 1.5 }, 200);
                    this._tween_scaleY = egret.Tween.get(this.img_countdown).to({ scaleY: 0.5 }, 200).wait(300).to({ scaleY: 1.5 }, 200);
                    this._tween_alpha_add = egret.Tween.get(this.img_countdown_add).wait(200).to({ alpha: 1 }, 300).to({ alpha: 0 }, 200);
                }
            }
            else {
                //显示文本
                this.txt_time.text = num_now.toString();
                //显示界面
                this.txt_time.visible = true;
                this.img_back.visible = true;
                this.img_countdown.visible = false;
            }
        }
    };
    //计时中
    Game_Clock.prototype.onTimer = function (e) {
        //数据赋值
        this.now_time += 1;
        //显示文本
        this.showText();
    };
    //计时结束
    Game_Clock.prototype.onTimerComplete = function (e) {
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
    };
    return Game_Clock;
}(eui.Component));
__reflect(Game_Clock.prototype, "Game_Clock");
//# sourceMappingURL=Game_Clock.js.map