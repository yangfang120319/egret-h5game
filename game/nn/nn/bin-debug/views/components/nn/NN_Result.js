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
 * @author
 *
 */
var NN_Result = (function (_super) {
    __extends(NN_Result, _super);
    function NN_Result() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._tween_back = null;
        _this._tween_alpha = null;
        _this._tween_rotation = null;
        _this._tween_niualpha = null;
        _this._tween_ndgalpha = null;
        _this._tween_numalpha = null;
        _this._tween_niux = null;
        _this._tween_niuy = null;
        _this._tween_numx = null;
        _this._tween_numy = null;
        _this._tween_niu_scaleX = null;
        _this._tween_niu_scaleY = null;
        _this._tween_num_scaleX = null;
        _this._tween_num_scaleY = null;
        _this.timer_waiting = null;
        _this.timer_action = null;
        return _this;
    }
    //初始化
    NN_Result.prototype.createChildren = function () {
        _super.prototype.createChildren.call(this);
        //定义大小
        this.img_action2.scaleX = 1.5;
        this.img_action2.scaleY = 1.5;
        this.img_action3.scaleX = 1.5;
        this.img_action3.scaleY = 1.5;
        this.img_action4.scaleX = 2.5;
        this.img_action4.scaleY = 2.5;
    };
    //显示界面
    NN_Result.prototype.show = function (_resoutnum, _callback) {
        if (_callback === void 0) { _callback = null; }
        //数据赋值
        this.fun_callback = _callback;
        this.num_resout_num = _resoutnum;
        //判断显示
        if (this.num_resout_num == 0) {
            //数据赋值
            this.num_resout_type = 1;
            //显示效果1
            this.showAction1();
        }
        else if (this.num_resout_num < 7) {
            //数据赋值
            this.num_resout_type = 2;
            //显示效果2
            this.showAction2();
        }
        else if (this.num_resout_num < 10) {
            //数据赋值
            this.num_resout_type = 3;
            //显示效果3
            this.showAction3();
        }
        else if (this.num_resout_num < 16) {
            //数据赋值
            this.num_resout_type = 4;
            //显示效果4
            this.showAction4();
        }
        //显示状态
        this.currentState = "type" + this.num_resout_type.toString();
    };
    //直接显示结果
    NN_Result.prototype.showResult = function (_resoutnum, _callback) {
        if (_callback === void 0) { _callback = null; }
        //数据赋值
        this.fun_callback = _callback;
        this.num_resout_num = _resoutnum;
        //判断显示
        if (this.num_resout_num == 0) {
            //数据赋值
            this.num_resout_type = 1;
            //显示界面
            this.g_niu1.alpha = 1;
            this.g_niutxt.rotation = 0;
            this.rect_back1.alpha = 1;
            this.rect_back1.scaleY = 1;
        }
        else if (this.num_resout_num < 7) {
            //数据赋值
            this.num_resout_type = 2;
            //显示界面
            this.img_niu2.alpha = 1;
            this.img_num2.alpha = 1;
            this.g_niu2.x = -62;
            this.g_niu2.y = -29;
            this.g_num2.x = -2;
            this.g_num2.y = -39;
            this.img_niu2.scaleX = 1;
            this.img_niu2.scaleY = 1;
            this.img_num2.scaleX = 1;
            this.img_num2.scaleY = 1;
            this.rect_back2.alpha = 1;
            this.rect_back2.scaleY = 1;
            //定义图片
            this.img_num2.source = "txt_nn_" + this.num_resout_num + "_png";
        }
        else if (this.num_resout_num < 10) {
            //数据赋值
            this.num_resout_type = 3;
            //显示界面
            this.img_niu3.alpha = 1;
            this.img_num3.alpha = 1;
            this.g_niu3.x = -62;
            this.g_niu3.y = -29;
            this.g_num3.x = -2;
            this.g_num3.y = -39;
            this.img_niu3.scaleX = 1;
            this.img_niu3.scaleY = 1;
            this.img_num3.scaleX = 1;
            this.img_num3.scaleY = 1;
            this.rect_back3.alpha = 1;
            this.rect_back3.scaleY = 1;
            //定义图片
            this.img_num3.source = "txt_nn_" + this.num_resout_num + "_png";
        }
        else if (this.num_resout_num < 16) {
            //数据赋值
            this.num_resout_type = 4;
            //显示界面
            this.img_niu4.alpha = 1;
            this.img_niu4.scaleX = 1;
            this.img_niu4.scaleY = 1;
            this.rect_back4.alpha = 1;
            this.rect_back4.scaleY = 1;
            if (this.num_resout_num == 15) {
                this.img_ndg.alpha = 1;
            }
            else {
                this.img_ndg.alpha = 0;
            }
            //定义图片
            this.img_niu4.source = "txt_nn_" + this.num_resout_num + "_png";
        }
        //显示状态
        this.currentState = "type" + this.num_resout_type.toString();
    };
    //底效果
    NN_Result.prototype.showActionBack = function (_rect, _callback) {
        if (_callback === void 0) { _callback = null; }
        //显示底动画
        _rect.alpha = 0;
        _rect.scaleY = 0;
        this._tween_alpha = egret.Tween.get(_rect).to({ alpha: 1 }, 50);
        this._tween_back = egret.Tween.get(_rect).
            to({ scaleY: 1.4 }, 100).wait(40).
            to({ scaleY: 0.8 }, 30).
            to({ scaleY: 1.1 }, 30).wait(20).
            to({ scaleY: 0.95 }, 30).
            to({ scaleY: 1 }, 30).
            call(function () {
            if (_callback) {
                _callback();
            }
        });
    };
    //牛效果1
    NN_Result.prototype.showActionNiu1 = function (_niu, _num, _g_niu, _g_num, _callback) {
        if (_callback === void 0) { _callback = null; }
        //定义变量
        var num_show_speed = 300;
        //定义图片
        _num.source = "txt_nn_" + this.num_resout_num + "_png";
        //显示动画
        _g_niu.x = -242;
        _g_niu.y = 1;
        _g_num.x = 178;
        _g_num.y = -69;
        this._tween_niux = egret.Tween.get(_g_niu).to({ x: -62 }, num_show_speed, egret.Ease.backOut);
        this._tween_niuy = egret.Tween.get(_g_niu).to({ y: -29 }, num_show_speed, egret.Ease.backOut);
        this._tween_numx = egret.Tween.get(_g_num).to({ x: -2 }, num_show_speed, egret.Ease.backOut);
        this._tween_numy = egret.Tween.get(_g_num).to({ y: -39 }, num_show_speed, egret.Ease.backOut);
        this._tween_niualpha = egret.Tween.get(_niu).to({ alpha: 1 }, num_show_speed / 2);
        this._tween_numalpha = egret.Tween.get(_num).to({ alpha: 1 }, num_show_speed / 2);
        this._tween_niu_scaleX = egret.Tween.get(_niu).wait(num_show_speed * 30 / 100).to({ scaleX: 0.58 }, 4 * num_show_speed / 20).wait(num_show_speed / 8).to({ scaleX: 1 }, 4 * num_show_speed / 20);
        this._tween_niu_scaleY = egret.Tween.get(_niu).wait(num_show_speed * 30 / 100).to({ scaleY: 0.93 }, 4 * num_show_speed / 20).wait(num_show_speed / 8).to({ scaleY: 1 }, 4 * num_show_speed / 20);
        this._tween_num_scaleX = egret.Tween.get(_num).wait(num_show_speed * 30 / 100).to({ scaleX: 0.58 }, 4 * num_show_speed / 20).wait(num_show_speed / 8).to({ scaleX: 1 }, 4 * num_show_speed / 20);
        this._tween_num_scaleY = egret.Tween.get(_num).wait(num_show_speed * 30 / 100).to({ scaleY: 0.93 }, 4 * num_show_speed / 20).wait(num_show_speed / 8).to({ scaleY: 1 }, 4 * num_show_speed / 20);
        //显示效果
        this.timer_waiting = new egret.Timer(num_show_speed * 3 / 4, 1);
        this.timer_waiting.addEventListener(egret.TimerEvent.TIMER_COMPLETE, this.waitingShowComplete, this);
        this.timer_waiting.start();
    };
    //牛效果2
    NN_Result.prototype.showActionNiu2 = function (_niu, _callback) {
        var _this = this;
        if (_callback === void 0) { _callback = null; }
        //定义变量
        var num_show_speed = 100;
        //定义图片
        _niu.source = "txt_nn_" + this.num_resout_num + "_png";
        //播放声音
        basic.SoundManager.instance.playEffect("sound_g_texiao2_mp3");
        //显示动画
        this.showActionSpecial();
        //显示动画
        _niu.scaleX = 3;
        _niu.scaleY = 3;
        this._tween_niualpha = egret.Tween.get(_niu).wait(200).to({ alpha: 0.8 }, num_show_speed / 2).wait(90 + num_show_speed / 2).to({ alpha: 1 }, 30);
        this._tween_niu_scaleX = egret.Tween.get(_niu).wait(200).to({ scaleX: 1 }, num_show_speed);
        this._tween_niu_scaleY = egret.Tween.get(_niu).wait(200).to({ scaleY: 1 }, num_show_speed).call(function () {
            //播放声音
            basic.SoundManager.instance.playEffect("sound_nn_niu" + _this.num_resout_num + "_mp3");
            //返回函数
            if (_this.fun_callback) {
                _this.fun_callback();
            }
        });
        //判断显示
        if (this.num_resout_num == 15) {
            this._tween_ndgalpha = egret.Tween.get(this.img_ndg).to({ alpha: 1 }, 200);
        }
    };
    //等待结束函数
    NN_Result.prototype.waitingShowComplete = function (e) {
        //停止等待
        if (this.timer_waiting) {
            this.timer_waiting.stop();
            this.timer_waiting.removeEventListener(egret.TimerEvent.TIMER_COMPLETE, this.waitingShowComplete, this);
            this.timer_waiting = null;
        }
        //播放声音
        basic.SoundManager.instance.playEffect("sound_g_texiao1_mp3");
        //显示动画
        this.showActionSpecial();
    };
    //显示效果动画
    NN_Result.prototype.showActionSpecial = function () {
        //定义变量
        var num_times;
        //判断赋值
        if (this.num_resout_type == 2) {
            num_times = 3;
            this.img_action2.alpha = 1;
            this.showSpecialPicture("icon_nn_shan0_png");
        }
        else if (this.num_resout_type == 3) {
            num_times = 3;
            this.img_action3.alpha = 1;
            this.showSpecialPicture("icon_nn_shan0_png");
        }
        else {
            num_times = 5;
            this.img_action4.alpha = 1;
            this.showSpecialPicture("icon_nn_bao0_png");
        }
        //显示界面
        this.num_nowaction = 0;
        //显示动画
        this.timer_action = new egret.Timer(60, num_times);
        this.timer_action.addEventListener(egret.TimerEvent.TIMER, this.showActionSpecialTimer, this);
        this.timer_action.addEventListener(egret.TimerEvent.TIMER_COMPLETE, this.showActionSpecialComplete, this);
        this.timer_action.start();
    };
    //动作显示
    NN_Result.prototype.showActionSpecialTimer = function (e) {
        //数据赋值
        this.num_nowaction += 1;
        //判断显示图片
        if (this.num_resout_type == 2 || this.num_resout_type == 3) {
            this.showSpecialPicture("icon_nn_shan" + this.num_nowaction + "_png");
        }
        else {
            this.showSpecialPicture("icon_nn_bao" + this.num_nowaction + "_png");
        }
    };
    //动画结束
    NN_Result.prototype.showActionSpecialComplete = function (e) {
        var _this = this;
        //停止
        if (this.timer_action) {
            this.timer_action.stop();
            this.timer_action.removeEventListener(egret.TimerEvent.TIMER, this.showActionSpecialTimer, this);
            this.timer_action.removeEventListener(egret.TimerEvent.TIMER_COMPLETE, this.showActionSpecialComplete, this);
            this.timer_action = null;
        }
        //消失
        if (this.num_resout_type == 2) {
            this._tween_alpha = egret.Tween.get(this.img_action2).to({ alpha: 0 }, 500).call(function () {
                //播放声音
                basic.SoundManager.instance.playEffect("sound_nn_niu" + _this.num_resout_num + "_mp3");
                //返回函数
                _this.img_action2.source = "";
                if (_this.fun_callback) {
                    _this.fun_callback();
                }
            });
        }
        else if (this.num_resout_type == 3) {
            this._tween_alpha = egret.Tween.get(this.img_action3).to({ alpha: 0 }, 500).call(function () {
                //播放声音
                basic.SoundManager.instance.playEffect("sound_nn_niu" + _this.num_resout_num + "_mp3");
                //返回函数
                _this.img_action3.source = "";
                if (_this.fun_callback) {
                    _this.fun_callback();
                }
            });
        }
        else if (this.num_resout_type == 4) {
            this._tween_alpha = egret.Tween.get(this.img_action4).to({ alpha: 0 }, 500).call(function () {
                _this.img_action4.source = "";
            });
        }
    };
    //显示效果图片
    NN_Result.prototype.showSpecialPicture = function (_source) {
        //判断显示
        if (this.num_resout_type == 2) {
            this.img_action2.source = _source;
        }
        else if (this.num_resout_type == 3) {
            this.img_action3.source = _source;
        }
        else {
            this.img_action4.source = _source;
        }
    };
    //显示效果1
    NN_Result.prototype.showAction1 = function () {
        var _this = this;
        //显示效果
        this.g_niu1.alpha = 0;
        this.g_niutxt.rotation = 0;
        //显示动画
        this.showActionBack(this.rect_back1, function () {
            //显示没牛
            _this._tween_alpha = egret.Tween.get(_this.g_niu1).to({ alpha: 1 }, 400);
            _this._tween_rotation = egret.Tween.get(_this.g_niutxt).wait(500).to({ rotation: 35 }, 200, egret.Ease.backOut).call(function () {
                //播放声音
                basic.SoundManager.instance.playEffect("sound_nn_niu" + _this.num_resout_num + "_mp3");
                //返回函数
                if (_this.fun_callback) {
                    _this.fun_callback();
                }
            });
        });
    };
    //显示效果2
    NN_Result.prototype.showAction2 = function () {
        var _this = this;
        //显示效果
        this.img_niu2.alpha = 0;
        this.img_num2.alpha = 0;
        //显示动画
        this.showActionBack(this.rect_back2, function () {
            //牛效果1
            _this.showActionNiu1(_this.img_niu2, _this.img_num2, _this.g_niu2, _this.g_num2);
        });
    };
    //显示效果3
    NN_Result.prototype.showAction3 = function () {
        var _this = this;
        //显示效果
        this.img_niu3.alpha = 0;
        this.img_num3.alpha = 0;
        //显示动画
        this.showActionBack(this.rect_back3, function () {
            //牛效果1
            _this.showActionNiu1(_this.img_niu3, _this.img_num3, _this.g_niu3, _this.g_num3);
        });
    };
    //显示效果4
    NN_Result.prototype.showAction4 = function () {
        var _this = this;
        //显示效果
        this.img_ndg.alpha = 0;
        this.img_niu4.alpha = 0;
        //显示动画
        this.showActionBack(this.rect_back4, function () {
            //牛效果1
            _this.showActionNiu2(_this.img_niu4);
        });
    };
    //停止动画
    NN_Result.prototype.stopAction = function () {
        //停止缓动
        if (this._tween_back) {
            this._tween_back.setPaused(true);
            this._tween_back = null;
        }
        if (this._tween_alpha) {
            this._tween_alpha.setPaused(true);
            this._tween_alpha = null;
        }
        if (this._tween_rotation) {
            this._tween_rotation.setPaused(true);
            this._tween_rotation = null;
        }
        if (this._tween_niualpha) {
            this._tween_niualpha.setPaused(true);
            this._tween_niualpha = null;
        }
        if (this._tween_numalpha) {
            this._tween_numalpha.setPaused(true);
            this._tween_numalpha = null;
        }
        if (this._tween_ndgalpha) {
            this._tween_ndgalpha.setPaused(true);
            this._tween_ndgalpha = null;
        }
        if (this._tween_niux) {
            this._tween_niux.setPaused(true);
            this._tween_niux = null;
        }
        if (this._tween_niuy) {
            this._tween_niuy.setPaused(true);
            this._tween_niuy = null;
        }
        if (this._tween_numx) {
            this._tween_numx.setPaused(true);
            this._tween_numx = null;
        }
        if (this._tween_numy) {
            this._tween_numy.setPaused(true);
            this._tween_numy = null;
        }
        if (this._tween_numy) {
            this._tween_numy.setPaused(true);
            this._tween_numy = null;
        }
        if (this._tween_niu_scaleX) {
            this._tween_niu_scaleX.setPaused(true);
            this._tween_niu_scaleX = null;
        }
        if (this._tween_niu_scaleY) {
            this._tween_niu_scaleY.setPaused(true);
            this._tween_niu_scaleY = null;
        }
        if (this._tween_num_scaleX) {
            this._tween_num_scaleX.setPaused(true);
            this._tween_num_scaleX = null;
        }
        if (this._tween_num_scaleY) {
            this._tween_num_scaleX.setPaused(true);
            this._tween_num_scaleY = null;
        }
        //停止等待
        if (this.timer_waiting) {
            this.timer_waiting.stop();
            this.timer_waiting.removeEventListener(egret.TimerEvent.TIMER_COMPLETE, this.waitingShowComplete, this);
            this.timer_waiting = null;
        }
        if (this.timer_action) {
            this.timer_action.stop();
            this.timer_action.removeEventListener(egret.TimerEvent.TIMER, this.showActionSpecialTimer, this);
            this.timer_action.removeEventListener(egret.TimerEvent.TIMER_COMPLETE, this.showActionSpecialComplete, this);
            this.timer_action = null;
        }
    };
    return NN_Result;
}(eui.Component));
__reflect(NN_Result.prototype, "NN_Result");
//# sourceMappingURL=NN_Result.js.map