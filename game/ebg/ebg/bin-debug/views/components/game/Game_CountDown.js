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
var Game_CountDown = (function (_super) {
    __extends(Game_CountDown, _super);
    function Game_CountDown() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._tween_scaleX = null;
        _this._tween_scaleY = null;
        _this._tween_alpha = null;
        _this._tween_scaleX_add = null;
        _this._tween_scaleY_add = null;
        _this._tween_alpha_add = null;
        return _this;
    }
    //初始化
    Game_CountDown.prototype.createChildren = function () {
        _super.prototype.createChildren.call(this);
        //隐藏界面
        this.visible = false;
        this.g_waiting.visible = false;
        this.img_countdown.visible = false;
        this.img_countdown_add.visible = false;
        //注册事件
        basic.Dispatcher.addListener(EventNames.GAME_SHOW_WAITING, this.onShowWaiting, this);
        basic.Dispatcher.addListener(EventNames.GAME_Hide_WAITING, this.onHideWaiting, this);
        basic.Dispatcher.addListener(EventNames.GAME_SHOW_COUNTDOWN, this.onShowCountDown, this);
    };
    //显示等待界面
    Game_CountDown.prototype.showWaiting = function (_tips) {
        this.visible = true;
        this.txt_tips.text = _tips;
        this.g_waiting.visible = true;
        this.img_countdown.visible = false;
        this.img_countdown_add.visible = false;
    };
    //显示等待界面
    Game_CountDown.prototype.onShowWaiting = function (e) {
        //显示界面
        this.visible = true;
        this.g_waiting.visible = true;
        this.img_countdown.visible = false;
        this.img_countdown_add.visible = false;
        this.txt_tips.text = "本局马上开始，等待开始下注！";
    };
    //显示等待界面
    Game_CountDown.prototype.onHideWaiting = function (e) {
        //显示界面
        this.visible = false;
        this.g_waiting.visible = false;
        this.img_countdown.visible = false;
        this.img_countdown_add.visible = false;
    };
    //显示倒计时
    Game_CountDown.prototype.onShowCountDown = function (e) {
        var _this = this;
        //数据赋值
        var num_now = e.data.nownum;
        //判断显示
        if (num_now < 6) {
            //显示界面
            this.visible = true;
            this.g_waiting.visible = false;
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
                    _this.visible = false;
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
                this._tween_alpha_add = egret.Tween.get(this.img_countdown_add).wait(200).to({ alpha: 1 }, 300).to({ alpha: 0 }, 200).call(function () {
                    _this.visible = false;
                });
            }
        }
    };
    return Game_CountDown;
}(eui.Component));
__reflect(Game_CountDown.prototype, "Game_CountDown");
//# sourceMappingURL=Game_CountDown.js.map