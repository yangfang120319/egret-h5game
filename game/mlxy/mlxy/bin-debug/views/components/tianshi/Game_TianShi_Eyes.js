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
 * @天使眼睛
 *
 */
var Game_TianShi_Eyes = (function (_super) {
    __extends(Game_TianShi_Eyes, _super);
    function Game_TianShi_Eyes() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.timer_waiting = null;
        return _this;
    }
    //初始化
    Game_TianShi_Eyes.prototype.createChildren = function () {
        _super.prototype.createChildren.call(this);
    };
    //开始动画
    Game_TianShi_Eyes.prototype.start = function () {
        //初始化眼睛
        this.img_eyes.source = "icon_ch_eyes0_png";
        //开始动画
        this.timer_waiting = new egret.Timer(3000);
        this.timer_waiting.addEventListener(egret.TimerEvent.TIMER, this.onShowEyes, this);
        this.timer_waiting.start();
    };
    //停止
    Game_TianShi_Eyes.prototype.stop = function () {
        //判断停止
        if (this.timer_waiting) {
            this.timer_waiting.stop();
            this.timer_waiting.removeEventListener(egret.TimerEvent.TIMER, this.onShowEyes, this);
            this.timer_waiting = null;
        }
    };
    //显示眼睛
    Game_TianShi_Eyes.prototype.onShowEyes = function (e) {
        var _this = this;
        //显示眼睛动画
        this.img_eyes.source = "icon_ch_eyes1_png";
        //显示闭眼
        egret.setTimeout(function () {
            //显示眼睛动画
            _this.img_eyes.source = "icon_ch_eyes2_png";
            //显示开眼
            egret.setTimeout(function () {
                //显示眼睛动画
                _this.img_eyes.source = "icon_ch_eyes0_png";
            }, _this, 200);
        }, this, 50);
    };
    return Game_TianShi_Eyes;
}(eui.Component));
__reflect(Game_TianShi_Eyes.prototype, "Game_TianShi_Eyes");
//# sourceMappingURL=Game_TianShi_Eyes.js.map