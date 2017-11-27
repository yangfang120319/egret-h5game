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
var Game_TianShi_Bao = (function (_super) {
    __extends(Game_TianShi_Bao, _super);
    function Game_TianShi_Bao() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.timer_waiting = null;
        return _this;
    }
    //初始化
    Game_TianShi_Bao.prototype.createChildren = function () {
        _super.prototype.createChildren.call(this);
        //隐藏界面
        this.visible = false;
    };
    //开始动画
    Game_TianShi_Bao.prototype.start = function (_speed, _total_show) {
        //数据赋值
        this.now_show = 0;
        this.speed = _speed;
        this.total_show = _total_show;
        //显示界面
        this.visible = true;
        //显示界面
        this.img_bao.source = "icon_ch_bao" + this.now_show.toString() + "_png";
        //开始动动画
        this.timer_waiting = new egret.Timer(this.speed);
        this.timer_waiting.addEventListener(egret.TimerEvent.TIMER, this.onShowShan, this);
        this.timer_waiting.start();
    };
    //停止动画
    Game_TianShi_Bao.prototype.stop = function () {
        //判断停止
        if (this.timer_waiting) {
            this.timer_waiting.stop();
            this.timer_waiting.removeEventListener(egret.TimerEvent.TIMER, this.onShowShan, this);
            this.timer_waiting = null;
        }
    };
    //显示闪光
    Game_TianShi_Bao.prototype.onShowShan = function (e) {
        //数据复制
        this.now_show += 1;
        if (this.now_show >= this.total_show) {
            //停止动画
            this.stop();
            //隐藏界面
            this.visible = false;
        }
        else {
            //显示界面
            this.img_bao.source = "icon_ch_bao" + this.now_show.toString() + "_png";
        }
    };
    return Game_TianShi_Bao;
}(eui.Component));
__reflect(Game_TianShi_Bao.prototype, "Game_TianShi_Bao");
//# sourceMappingURL=Game_TianShi_Bao.js.map