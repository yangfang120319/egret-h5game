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
 * @天使所有动画
 *
 */
var Game_TianShiTotal = (function (_super) {
    __extends(Game_TianShiTotal, _super);
    //定义界面
    function Game_TianShiTotal() {
        var _this = _super.call(this) || this;
        _this.shan = [];
        _this._tween_shan_y = [];
        _this._tween_tianshi_y = null;
        _this._tween_tianshi_alpha = null;
        _this._tween_caihong_alpha = null;
        _this._tween_tianshi_left_y = null;
        _this._tween_tianshi_left_alpha = null;
        _this._tween_tianshi_right_y = null;
        _this._tween_tianshi_right_alpha = null;
        //定义界面
        _this.skinName = Game_TianShiTotalSkin;
        //数据赋值
        for (var i = 0; i < 9; i++) {
            //定义变量
            var now_shan = _this["shan" + i];
            //数据赋值
            _this.shan[i] = now_shan;
            _this._tween_shan_y[i] = null;
        }
        //显示宽度
        _this.width = basic.StageProxy.width;
        return _this;
    }
    //开始动画
    Game_TianShiTotal.prototype.start = function (_callback) {
        var _this = this;
        //数据赋值
        this.callback = _callback;
        //停止动画
        this.stop();
        //显示彩虹动画
        this.img_caihong.alpha = 0;
        this._tween_caihong_alpha = egret.Tween.get(this.img_caihong).
            to({ alpha: 1 }, 2000);
        //显示闪光动画
        this.startShan();
        //显示天使动画
        this.tianshi.info();
        this.tianshi.y = -200;
        this.tianshi.alpha = 0;
        this._tween_tianshi_alpha = egret.Tween.get(this.tianshi).wait(900).to({ alpha: 1 }, 900);
        this._tween_tianshi_y = egret.Tween.get(this.tianshi).to({ y: 10 }, 1800).call(function () {
            _this.tianshi.startChiBang(1200);
            _this._tween_tianshi_y = egret.Tween.get(_this.tianshi).to({ y: -40 }, 1200).call(function () {
                _this.tianshi.start(1800);
                _this._tween_tianshi_y = egret.Tween.get(_this.tianshi, { loop: true }).
                    to({ y: -20 }, 1800).to({ y: -40 }, 1800);
            });
        });
        egret.setTimeout(function () {
            //播放声音
            basic.SoundManager.instance.playEffect("sound_ch_mp3");
        }, this, 1000);
        //显示左边天使
        egret.setTimeout(function () {
            //显示爆炸动画
            _this.bao_left.start(60, 8);
            //播放声音
            basic.SoundManager.instance.playEffect("sound_ch_tx_mp3");
            //显示天使
            _this.tianshi_left.y = 62;
            _this.tianshi_left.infoChiBang();
            _this._tween_tianshi_left_alpha = egret.Tween.get(_this.tianshi_left).wait(350).to({ alpha: 1 }, 700).call(function () {
                _this.tianshi_left.start(1200);
                _this._tween_tianshi_left_y = egret.Tween.get(_this.tianshi_left, { loop: true }).
                    to({ y: 85 }, 1200).
                    to({ y: 62 }, 1200);
            });
        }, this, 3000);
        //显示右边天使
        egret.setTimeout(function () {
            //显示爆炸动画
            _this.bao_right.start(60, 8);
            //播放声音
            basic.SoundManager.instance.playEffect("sound_ch_tx_mp3");
            //显示天使
            _this.tianshi_right.y = 52;
            _this.tianshi_right.infoChiBang();
            _this._tween_tianshi_right_alpha = egret.Tween.get(_this.tianshi_right).wait(350).to({ alpha: 1 }, 700).call(function () {
                _this.tianshi_right.start(1200);
                _this._tween_tianshi_right_y = egret.Tween.get(_this.tianshi_right, { loop: true }).
                    to({ y: 75 }, 1200).
                    to({ y: 52 }, 1200);
            });
        }, this, 4000);
        //退出函数
        egret.setTimeout(function () {
            //停止动画
            _this.stop();
            //显示回调函数
            _this.callback();
        }, this, 10000);
    };
    //显示闪光动画
    Game_TianShiTotal.prototype.startShan = function () {
        //显示闪光动画
        for (var i = 0; i < 9; i++) {
            this.shan[i].y = 18;
            this.showShanAction(i);
        }
    };
    //显示闪光动画
    Game_TianShiTotal.prototype.showShanAction = function (_num) {
        var _this = this;
        //显示界面
        this._tween_shan_y[_num] = egret.Tween.get(this.shan[_num]).wait(Math.random() * 500 + 500).call(function () {
            _this.shan[_num].visible = true;
            _this.shan[_num].start(_num % 2, 60);
            _this._tween_shan_y[_num] = egret.Tween.get(_this.shan[_num]).
                to({ y: 200 + Math.random() * 50 }, 1200 + Math.random() * 600).call(function () {
                //隐藏闪光
                _this.shan[_num].stop();
                _this.shan[_num].visible = false;
            });
        });
    };
    //停止动画
    Game_TianShiTotal.prototype.stop = function () {
        //停止彩虹
        this.img_caihong.alpha = 0;
        if (this._tween_caihong_alpha) {
            this._tween_caihong_alpha.setPaused(true);
            this._tween_caihong_alpha = null;
        }
        //隐藏闪光
        for (var i = 0; i < 9; i++) {
            this.shan[i].visible = false;
            if (this._tween_shan_y[i]) {
                this._tween_shan_y[i].setPaused(true);
                this._tween_shan_y[i] = null;
            }
        }
        //停止天使
        this.tianshi.stop();
        this.tianshi.y = -200;
        this.tianshi.alpha = 0;
        if (this._tween_tianshi_alpha) {
            this._tween_tianshi_alpha.setPaused(true);
            this._tween_tianshi_alpha = null;
        }
        if (this._tween_tianshi_y) {
            this._tween_tianshi_y.setPaused(true);
            this._tween_tianshi_y = null;
        }
        if (this._tween_tianshi_left_alpha) {
            this._tween_tianshi_left_alpha.setPaused(true);
            this._tween_tianshi_left_alpha = null;
        }
        if (this._tween_tianshi_left_y) {
            this._tween_tianshi_left_y.setPaused(true);
            this._tween_tianshi_left_y = null;
        }
        if (this._tween_tianshi_right_alpha) {
            this._tween_tianshi_right_alpha.setPaused(true);
            this._tween_tianshi_right_alpha = null;
        }
        if (this._tween_tianshi_right_y) {
            this._tween_tianshi_right_y.setPaused(true);
            this._tween_tianshi_right_y = null;
        }
        this.tianshi_left.stop();
        this.tianshi_right.stop();
        this.tianshi_left.alpha = 0;
        this.tianshi_right.alpha = 0;
    };
    return Game_TianShiTotal;
}(eui.Component));
__reflect(Game_TianShiTotal.prototype, "Game_TianShiTotal");
//# sourceMappingURL=Game_TianShiTotal.js.map