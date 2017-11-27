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
 * @通杀通赔
 *
 */
var EBG_SpecialResult = (function (_super) {
    __extends(EBG_SpecialResult, _super);
    function EBG_SpecialResult() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._tween_scaleY = null;
        _this._tween_alpha = null;
        return _this;
    }
    //初始化
    EBG_SpecialResult.prototype.createChildren = function () {
        _super.prototype.createChildren.call(this);
        //隐藏界面
        this.visible = false;
    };
    //显示通杀
    EBG_SpecialResult.prototype.showWin = function (_callback) {
        var _this = this;
        //显示界面
        this.visible = true;
        this.img_win.alpha = 0;
        this.img_win_add.alpha = 0;
        this.img_win_add.scaleX = 1;
        this.img_win_add.scaleY = 1;
        this.img_win.visible = true;
        this.img_win_add.visible = true;
        //显示状态
        this.currentState = "win";
        //播放声音
        basic.SoundManager.instance.playEffect("sound_ebg_tongsha_mp3");
        //开始显示
        var _tween_alpha1 = egret.Tween.get(this.img_win).to({ alpha: 1 }, 50);
        var _tween_alpha2 = egret.Tween.get(this.img_win_add).wait(20).to({ alpha: 1 }, 30).call(function () {
            //显示动画
            var _tween_alpha3 = egret.Tween.get(_this.img_win_add).to({ alpha: 0.15 }, 150).to({ alpha: 0 }, 300);
            var _tween_scaleX = egret.Tween.get(_this.img_win_add).to({ scaleX: 1.25 }, 150).to({ scaleX: 2 }, 300);
            _this._tween_scaleY = egret.Tween.get(_this.img_win_add).to({ scaleY: 1.25 }, 150).to({ scaleY: 2 }, 300).wait(1000).call(function () {
                //回调函数
                _callback();
                //清除
                _this.clean();
            });
        });
    };
    //显示通赔
    EBG_SpecialResult.prototype.showLose = function (_callback) {
        var _this = this;
        //显示界面
        this.visible = true;
        this.img_lose.alpha = 0;
        this.img_lose.visible = true;
        //显示状态
        this.currentState = "lose";
        //播放声音
        basic.SoundManager.instance.playEffect("sound_ebg_tongpei_mp3");
        //开始显示
        this._tween_alpha = egret.Tween.get(this.img_lose).to({ alpha: 1 }, 1000).wait(500).call(function () {
            //回调函数
            _callback();
            //清除
            _this.clean();
        });
    };
    //清除界面
    EBG_SpecialResult.prototype.clean = function () {
        //判断停止缓动
        if (this._tween_scaleY) {
            this._tween_scaleY.setPaused(true);
        }
        if (this._tween_alpha) {
            this._tween_alpha.setPaused(true);
        }
        //隐藏界面
        this.visible = false;
    };
    return EBG_SpecialResult;
}(eui.Component));
__reflect(EBG_SpecialResult.prototype, "EBG_SpecialResult");
