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
 * @开始动画
 *
 */
var StartAction = (function (_super) {
    __extends(StartAction, _super);
    function StartAction() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.g_btn = [];
        _this.tips_num = [5, 9, 20];
        _this.title_num = [4, 4, 5];
        _this.title_y = [];
        _this.img_tips = [];
        _this.img_title = [];
        _this.timer_action = null;
        _this.timer_waiting = null;
        _this.tween_scaleX = null;
        _this.tween_scaleY = null;
        _this.airplay_type = 0;
        return _this;
    }
    //初始化
    StartAction.prototype.createChildren = function () {
        _super.prototype.createChildren.call(this);
        //数据赋值
        for (var i = 0; i < 3; i++) {
            //定义变量
            var now_title_y = [];
            var now_tips = [];
            var now_title = [];
            var now_g_btn = this["g_btn" + i];
            //数据赋值
            for (var j = 0; j < this.tips_num[i]; j++) {
                //定义变量
                var now_img_tips = this["img_tips" + i.toString() + "_" + j.toString()];
                //数据赋值
                now_tips[j] = now_img_tips;
            }
            for (var k = 0; k < this.title_num[i]; k++) {
                //定义变量
                var now_img_title = this["img_title" + i.toString() + "_" + k.toString()];
                //数据赋值
                now_title[k] = now_img_title;
                now_title_y[k] = now_title[k].y;
            }
            //数据赋值
            this.g_btn[i] = now_g_btn;
            this.img_tips[i] = now_tips;
            this.img_title[i] = now_title;
            this.title_y[i] = now_title_y;
            this.g_btn[i].touchChildren = false;
            //注册按钮
            this.g_btn[i].addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onThisBtn, this);
        }
    };
    //初始化界面
    StartAction.prototype.info = function () {
        //清除界面
        this.clean();
        //显示界面
        for (var i = 0; i < 3; i++) {
            for (var j = 0; j < this.tips_num[i]; j++) {
                this.img_tips[i][j].alpha = 1;
                this.img_tips[i][j].scaleX = 1;
                this.img_tips[i][j].scaleY = 1;
            }
            for (var k = 0; k < this.title_num[i]; k++) {
                this.img_title[i][k].y = this.title_y[i][k];
            }
        }
        //开始显示界面
        this.now_Show_index = 0;
        //开始动画
        this.startAction();
    };
    //清除界面
    StartAction.prototype.clean = function () {
        //判断停止
        if (this.timer_action) {
            this.timer_action.stop();
            this.timer_action.removeEventListener(egret.TimerEvent.TIMER, this.onAction, this);
            this.timer_action.removeEventListener(egret.TimerEvent.TIMER_COMPLETE, this.onActionComplete, this);
            this.timer_action = null;
        }
        //判断停止
        if (this.timer_waiting) {
            this.timer_waiting.stop();
            this.timer_waiting.removeEventListener(egret.TimerEvent.TIMER_COMPLETE, this.onWaitingComplete, this);
            this.timer_waiting = null;
        }
    };
    //当前按钮
    StartAction.prototype.onThisBtn = function (e) {
        //定义变量
        var btnnum = Number(e.target.name);
        //判断显示
        if (e.type == egret.TouchEvent.TOUCH_BEGIN) {
            //数据赋值
            this.now_click = btnnum;
            //显示界面
            for (var i = 0; i < 3; i++) {
                this.g_btn[i].scaleX = 1 * 0.85;
                this.g_btn[i].scaleX = 1 * 0.85;
            }
            //显示动画
            this.tween_scaleX = egret.Tween.get(this.g_btn[btnnum]).
                to({ scaleX: 1.04 * 0.85 }, 100);
            this.tween_scaleY = egret.Tween.get(this.g_btn[btnnum]).
                to({ scaleY: 1.04 * 0.85 }, 100);
            //注册按钮
            this.addEventListener(egret.TouchEvent.TOUCH_END, this.onThisOverBtn, this);
        }
    };
    //定义按钮
    StartAction.prototype.onThisOverBtn = function (e) {
        //注销按钮
        this.removeEventListener(egret.TouchEvent.TOUCH_END, this.onThisOverBtn, this);
        //显示动画
        this.tween_scaleX = egret.Tween.get(this.g_btn[this.now_click]).
            to({ scaleX: 0.96 * 0.85 }, 100).
            to({ scaleX: 1 * 0.85 }, 100);
        this.tween_scaleY = egret.Tween.get(this.g_btn[this.now_click]).
            to({ scaleY: 0.96 * 0.85 }, 100).
            to({ scaleY: 1 * 0.85 }, 100);
        //数据赋值
        this.now_click = -1;
    };
    //开始动画
    StartAction.prototype.startAction = function () {
        //数据赋值
        var action_times;
        //数据赋值
        this.now_show_text = 0;
        action_times = this.title_num[this.now_Show_index];
        action_times += this.tips_num[this.now_Show_index];
        action_times += 5;
        //判断显示动画
        this.startAirPlayAction();
        //清除界面
        for (var i = 0; i < this.tips_num[this.now_Show_index]; i++) {
            //隐藏界面
            var _tween_alpha = egret.Tween.get(this.img_tips[this.now_Show_index][i]).to({ alpha: 0 }, 400);
            var _tween_scaleX = egret.Tween.get(this.img_tips[this.now_Show_index][i]).wait(300).to({ scaleX: 0 }, 100);
            var _tween_scaleY = egret.Tween.get(this.img_tips[this.now_Show_index][i]).wait(300).to({ scaleY: 0 }, 100);
        }
        //开始动画
        this.timer_action = new egret.Timer(150, action_times);
        this.timer_action.addEventListener(egret.TimerEvent.TIMER, this.onAction, this);
        this.timer_action.addEventListener(egret.TimerEvent.TIMER_COMPLETE, this.onActionComplete, this);
        this.timer_action.start();
    };
    //动画运行中
    StartAction.prototype.onAction = function (e) {
        //判断显示
        if (this.now_show_text < this.title_num[this.now_Show_index]) {
            //显示标题动画
            var _tween_y = egret.Tween.get(this.img_title[this.now_Show_index][this.now_show_text])
                .to({ y: this.title_y[this.now_Show_index][this.now_show_text] - 20 }, 300, egret.Ease.backOut)
                .to({ y: this.title_y[this.now_Show_index][this.now_show_text] }, 150);
        }
        else if (this.now_show_text >= this.title_num[this.now_Show_index] + 4) {
            //定义变量
            var tipstext_num = this.now_show_text - (this.title_num[this.now_Show_index] + 4);
            //判断显示
            if (tipstext_num < this.tips_num[this.now_Show_index]) {
                //显示提示动画
                var _tween_alpha = egret.Tween.get(this.img_tips[this.now_Show_index][tipstext_num])
                    .to({ alpha: 1 }, 300);
                var _tween_scaleX = egret.Tween.get(this.img_tips[this.now_Show_index][tipstext_num])
                    .to({ scaleX: 1.2 }, 200, egret.Ease.backOut).to({ scaleX: 1 }, 100);
                var _tween_scaleY = egret.Tween.get(this.img_tips[this.now_Show_index][tipstext_num])
                    .to({ scaleY: 1 }, 200, egret.Ease.backOut).to({ scaleY: 1 }, 100);
            }
        }
        //数据赋值
        this.now_show_text += 1;
    };
    //动画运行结束
    StartAction.prototype.onActionComplete = function (e) {
        //判断停止
        if (this.timer_action) {
            this.timer_action.stop();
            this.timer_action.removeEventListener(egret.TimerEvent.TIMER, this.onAction, this);
            this.timer_action.removeEventListener(egret.TimerEvent.TIMER_COMPLETE, this.onActionComplete, this);
            this.timer_action = null;
        }
        //开始等待
        this.timer_waiting = new egret.Timer(1000, 1);
        this.timer_waiting.addEventListener(egret.TimerEvent.TIMER_COMPLETE, this.onWaitingComplete, this);
        this.timer_waiting.start();
    };
    //等待结束
    StartAction.prototype.onWaitingComplete = function (e) {
        //判断停止
        if (this.timer_waiting) {
            this.timer_waiting.stop();
            this.timer_waiting.removeEventListener(egret.TimerEvent.TIMER_COMPLETE, this.onWaitingComplete, this);
            this.timer_waiting = null;
        }
        //开始显示界面
        this.now_Show_index += 1;
        if (this.now_Show_index >= 3) {
            this.now_Show_index = 0;
        }
        //开始动画
        this.startAction();
    };
    ;
    //飞机动画
    StartAction.prototype.startAirPlayAction = function () {
        //定义变量
        var move_to_x;
        var move_to_y;
        var move_to_rotation;
        //显示动画
        this.com_airplay.rotation = 0;
        if (this.airplay_type % 2 == 0) {
            this.com_airplay.x = -134;
            this.com_airplay.skewY = 180;
            this.com_airplay.y = this.height - 80;
            move_to_y = this.height - 400;
            move_to_rotation = -50;
            move_to_x = 900;
        }
        else {
            this.com_airplay.x = 770;
            this.com_airplay.skewY = 0;
            this.com_airplay.y = this.height - 80;
            move_to_y = this.height - 400;
            move_to_rotation = 50;
            move_to_x = -160;
        }
        //显示动画
        var _tween_x = egret.Tween.get(this.com_airplay).to({ x: move_to_x }, 1200);
        var _tween_y = egret.Tween.get(this.com_airplay).wait(200).to({ y: move_to_y }, 1000);
        var _tween_rotation = egret.Tween.get(this.com_airplay).wait(200).to({ rotation: move_to_rotation }, 1000);
        //数据赋值
        this.airplay_type += 1;
    };
    return StartAction;
}(eui.Component));
__reflect(StartAction.prototype, "StartAction");
//# sourceMappingURL=StartAction.js.map