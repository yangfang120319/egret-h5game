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
 * @天使闪光
 *
 */
var Game_TianShi_Shan = (function (_super) {
    __extends(Game_TianShi_Shan, _super);
    function Game_TianShi_Shan() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.total_show = 9;
        _this.timer_waiting = null;
        return _this;
    }
    //初始化
    Game_TianShi_Shan.prototype.createChildren = function () {
        _super.prototype.createChildren.call(this);
        //隐藏界面
        this.visible = false;
    };
    //开始动画
    Game_TianShi_Shan.prototype.start = function (_type, _speed) {
        //数据赋值
        this.now_show = 0;
        this.type = _type;
        this.speed = _speed;
        //显示界面
        this.visible = true;
        //显示界面
        this.img_shan.source = "icon_ch_shan" + this.type.toString() + "_" + this.now_show.toString() + "_png";
        //开始动动画
        this.timer_waiting = new egret.Timer(this.speed);
        this.timer_waiting.addEventListener(egret.TimerEvent.TIMER, this.onShowShan, this);
        this.timer_waiting.start();
    };
    //停止动画
    Game_TianShi_Shan.prototype.stop = function () {
        //判断停止
        if (this.timer_waiting) {
            this.timer_waiting.stop();
            this.timer_waiting.removeEventListener(egret.TimerEvent.TIMER, this.onShowShan, this);
            this.timer_waiting = null;
        }
    };
    //显示闪光
    Game_TianShi_Shan.prototype.onShowShan = function (e) {
        //数据复制
        this.now_show += 1;
        if (this.now_show >= this.total_show) {
            //停止动画
            this.stop();
            //判断显示
            if (this.type == 0) {
                this.start(1, this.speed);
            }
            else {
                this.start(0, this.speed);
            }
        }
        else {
            //显示界面
            this.img_shan.source = "icon_ch_shan" + this.type.toString() + "_" + this.now_show.toString() + "_png";
        }
    };
    return Game_TianShi_Shan;
}(eui.Component));
__reflect(Game_TianShi_Shan.prototype, "Game_TianShi_Shan");
//# sourceMappingURL=Game_TianShi_Shan.js.map