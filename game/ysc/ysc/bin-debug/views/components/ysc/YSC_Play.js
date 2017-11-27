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
 * @夜市场-动画界面
 *
 */
var YSC_Play = (function (_super) {
    __extends(YSC_Play, _super);
    function YSC_Play() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        //定义变量
        _this.g_table = [];
        _this.img_mask = [];
        _this.img_light = [];
        _this.img_alllight = [];
        _this.play_Over_num = 3;
        _this.play_start_num = 4;
        _this.play_middle_time = 240;
        _this.play_start_time = [120, 440, 400, 420];
        _this.play_Over_time = [420, 420, 410];
        _this.now_show_light = 0;
        _this.timer_start = null;
        _this.timer_middle = null;
        _this.timer_over = null;
        _this.timer_Light = null;
        return _this;
    }
    //初始化
    YSC_Play.prototype.createChildren = function () {
        _super.prototype.createChildren.call(this);
        //数据赋值
        for (var i = 0; i < 4; i++) {
            //定义变量
            var table = this["g_table" + i];
            var mask = this["img_mask" + i];
            var light = this["img_light" + i];
            //数据赋值
            this.g_table[i] = table;
            this.img_mask[i] = mask;
            this.img_light[i] = light;
        }
        //数据赋值
        for (var j = 0; j < 28; j++) {
            //定义变量
            var img = this["img_light_" + j];
            //数据赋值
            this.img_alllight[j] = img;
        }
        //显示灯
        this.showAllLight();
    };
    //初始化界面
    YSC_Play.prototype.playLight = function () {
        //判断停止
        if (this.timer_Light) {
            this.timer_Light.stop();
            this.timer_Light.removeEventListener(basic.TimerEvent.TIMER, this.onShowLight, this);
            this.timer_Light = null;
        }
        //开始闪灯
        this.timer_Light = new egret.Timer(800);
        this.timer_Light.addEventListener(egret.TimerEvent.TIMER, this.onShowLight, this);
        this.timer_Light.start();
    };
    //清除界面
    YSC_Play.prototype.stopLight = function () {
        //判断停止
        if (this.timer_Light) {
            this.timer_Light.stop();
            this.timer_Light.removeEventListener(egret.TimerEvent.TIMER, this.onShowLight, this);
            this.timer_Light = null;
        }
    };
    //初始化界面
    YSC_Play.prototype.info = function (_now_show) {
        //隐藏界面
        for (var i = 0; i < 4; i++) {
            if (_now_show == -1) {
                this.img_mask[i].alpha = 0;
                this.img_light[i].alpha = 0;
            }
            else if (i == _now_show) {
                this.img_mask[i].alpha = 0;
                this.img_light[i].alpha = 0.8;
            }
            else {
                this.img_mask[i].alpha = 0.7;
                this.img_light[i].alpha = 0;
            }
        }
    };
    //清除界面
    YSC_Play.prototype.clean = function () {
        //隐藏界面
        for (var i = 0; i < 4; i++) {
            this.img_mask[i].alpha = 0;
            this.img_light[i].alpha = 0;
        }
    };
    //初始化界面
    YSC_Play.prototype.startPlay = function (_index, _time) {
        var _this = this;
        //数据赋值
        this.play_now = 0;
        this.play_now_show = 0;
        this.over_index = _index;
        this.play_middle_num = 13;
        this.play_Over_addnum = 4 + this.over_index;
        //初始显示
        var _tween_alpha3 = egret.Tween.get(this.img_mask[3]).wait(_time).to({ alpha: 0.7 }, 300);
        var _tween_alpha2 = egret.Tween.get(this.img_mask[2]).wait(_time).to({ alpha: 0.7 }, 300);
        var _tween_alpha1 = egret.Tween.get(this.img_mask[1]).wait(_time).to({ alpha: 0.7 }, 300);
        var _tween_alpha0 = egret.Tween.get(this.img_light[0]).wait(_time).to({ alpha: 0.8 }, 300).call(function () {
            //播放声音
            basic.SoundManager.instance.playEffect("sound_ysc_run_start_mp3");
            //开始显示动画
            _this.onStartPlay();
        });
    };
    //显示桌面
    YSC_Play.prototype.showTable = function (_table) {
        //显示动画
        var _tween_mask = egret.Tween.get(this.img_mask[_table]).to({ alpha: 0 }, 50);
        var _tween_light = egret.Tween.get(this.img_light[_table]).to({ alpha: 1 }, 50);
    };
    //隐藏桌面
    YSC_Play.prototype.hideTable = function (_table) {
        //显示动画
        var _tween_mask = egret.Tween.get(this.img_mask[_table]).to({ alpha: 0.7 }, 50);
        var _tween_light = egret.Tween.get(this.img_light[_table]).to({ alpha: 0 }, 50);
    };
    //开始动画
    YSC_Play.prototype.onStartPlay = function () {
        //开始动画
        this.timer_start = new basic.Timer(this.play_start_time[this.play_now], 1);
        this.timer_start.addEventListener(basic.TimerEvent.TIMER_COMPLETE, this.onStartTimerComplete, this);
        this.timer_start.start();
    };
    //开始动画结束
    YSC_Play.prototype.onStartTimerComplete = function (e) {
        //注销事件
        if (this.timer_start) {
            this.timer_start.stop();
            this.timer_start.removeEventListener(basic.TimerEvent.TIMER_COMPLETE, this.onStartTimerComplete, this);
            this.timer_start = null;
        }
        //显示动画
        if (this.play_now_show == 3) {
            this.showTable(0);
        }
        else {
            this.showTable(this.play_now_show + 1);
        }
        this.hideTable(this.play_now_show);
        //数据复制
        this.play_now += 1;
        this.play_now_show += 1;
        if (this.play_now_show > 3) {
            this.play_now_show = 0;
        }
        //判断显示
        if (this.play_now >= this.play_start_num) {
            //数据赋值
            this.play_now = 0;
            //开始中间动画
            this.onMiddlePlay();
        }
        else {
            //继续开始
            this.onStartPlay();
        }
    };
    //开始中间动画
    YSC_Play.prototype.onMiddlePlay = function () {
        //开始动画
        this.timer_middle = new basic.Timer(this.play_middle_time, this.play_middle_num);
        this.timer_middle.addEventListener(basic.TimerEvent.TIMER, this.onMiddleTimer, this);
        this.timer_middle.addEventListener(basic.TimerEvent.TIMER_COMPLETE, this.onMiddleTimerComplete, this);
        this.timer_middle.start();
    };
    //中间动画显示中
    YSC_Play.prototype.onMiddleTimer = function (e) {
        //显示动画
        if (this.play_now_show == 3) {
            this.showTable(0);
        }
        else {
            this.showTable(this.play_now_show + 1);
        }
        this.hideTable(this.play_now_show);
        //数据复制
        this.play_now_show += 1;
        if (this.play_now_show > 3) {
            this.play_now_show = 0;
        }
    };
    //中间动画结束
    YSC_Play.prototype.onMiddleTimerComplete = function (e) {
        //注销事件
        if (this.timer_middle) {
            this.timer_middle.stop();
            this.timer_middle.removeEventListener(basic.TimerEvent.TIMER, this.onMiddleTimer, this);
            this.timer_middle.removeEventListener(basic.TimerEvent.TIMER_COMPLETE, this.onMiddleTimerComplete, this);
            this.timer_middle = null;
        }
        //开始结束动画
        this.onOverPlay();
    };
    //开始结束动画
    YSC_Play.prototype.onOverPlay = function () {
        //开始动画
        this.timer_over = new basic.Timer(this.play_Over_time[Math.min(this.play_now, this.play_Over_num - 1)], 1);
        this.timer_over.addEventListener(basic.TimerEvent.TIMER_COMPLETE, this.onOverTimerComplete, this);
        this.timer_over.start();
    };
    //开始动画结束
    YSC_Play.prototype.onOverTimerComplete = function (e) {
        //注销事件
        if (this.timer_over) {
            this.timer_over.stop();
            this.timer_over.removeEventListener(basic.TimerEvent.TIMER_COMPLETE, this.onOverTimerComplete, this);
            this.timer_over = null;
        }
        //显示动画
        if (this.play_now_show == 3) {
            this.showTable(0);
        }
        else {
            this.showTable(this.play_now_show + 1);
        }
        this.hideTable(this.play_now_show);
        //数据复制
        this.play_now += 1;
        this.play_now_show += 1;
        if (this.play_now_show > 3) {
            this.play_now_show = 0;
        }
        //判断显示
        if (this.play_now >= this.play_Over_num + this.play_Over_addnum) {
            //播放声音
            basic.SoundManager.instance.playEffect("sound_ysc_run_over_mp3");
            //显示结束动画
            this.img_light[this.play_now_show].alpha = 1;
            var _tween_light = egret.Tween.get(this.img_light[this.play_now_show]).wait(1200).
                to({ alpha: 0 }, 150).wait(150).
                to({ alpha: 1 }, 150).wait(250).
                to({ alpha: 0 }, 150).wait(150).
                to({ alpha: 1 }, 150).wait(250).
                to({ alpha: 0 }, 150).wait(150).
                to({ alpha: 1 }, 150).wait(250).
                to({ alpha: 0 }, 150).wait(150).
                to({ alpha: 1 }, 150).wait(250).call(function () {
                //通知显示界面
                basic.Dispatcher.dispatch(EventNames.YSC_SHOWOVERFACE);
            });
        }
        else {
            if (this.play_now >= this.play_Over_num) {
                //播放声音
                basic.SoundManager.instance.playEffect("sound_ysc_run_middle_mp3");
            }
            //继续开始
            this.onOverPlay();
        }
    };
    //显示灯
    YSC_Play.prototype.onShowLight = function (e) {
        //数据赋值
        if (this.now_show_light == 0) {
            this.now_show_light = 1;
        }
        else {
            this.now_show_light = 0;
        }
        //显示灯
        this.showAllLight();
    };
    //显示灯
    YSC_Play.prototype.showAllLight = function () {
        //判断显示灯
        for (var i = 0; i < 28; i++) {
            //判断显示
            if (i % 2 == this.now_show_light) {
                this.img_alllight[i].alpha = 1;
            }
            else {
                this.img_alllight[i].alpha = 0.3;
            }
        }
    };
    return YSC_Play;
}(eui.Component));
__reflect(YSC_Play.prototype, "YSC_Play");
//# sourceMappingURL=YSC_Play.js.map