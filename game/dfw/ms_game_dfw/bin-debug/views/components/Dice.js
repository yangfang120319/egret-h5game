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
 * @骰子
 *
 */
var Dice = (function (_super) {
    __extends(Dice, _super);
    function Dice() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.action_times = 2;
        _this._timer_action = null;
        return _this;
    }
    //初始化
    Dice.prototype.createChildren = function () {
        _super.prototype.createChildren.call(this);
        //初始化界面
        this.now_dice_num = 1;
        this.img_dice.visible = true;
        this.img_action.visible = false;
        this.img_dice.source = "icon_g_dice" + this.now_dice_num.toString() + "_png";
    };
    //开始动画
    Dice.prototype.start = function (_dice, _callback) {
        //数据赋值
        this.now_action = 0;
        this.now_action_times = 0;
        this.now_dice_num = _dice;
        this.callback = _callback;
        //显示界面
        this.img_dice.visible = false;
        this.img_action.visible = true;
        this.img_dice.source = "icon_g_dice" + this.now_dice_num.toString() + "_png";
        this.img_action.source = "icon_g_diceaction" + this.now_action.toString() + "_png";
        //开始动画
        this._timer_action = new egret.Timer(60);
        this._timer_action.addEventListener(egret.TimerEvent.TIMER, this.onShowAction, this);
        this._timer_action.start();
    };
    //显示动画
    Dice.prototype.onShowAction = function (e) {
        //数据赋值
        this.now_action += 1;
        if (this.now_action >= 15) {
            //数据赋值
            this.now_action_times += 1;
            //判断显示
            if (this.now_action_times < this.action_times) {
                //数据赋值
                this.now_action = 7;
                //显示界面
                this.img_action.source = "icon_g_diceaction" + this.now_action.toString() + "_png";
            }
            else {
                //停止动画
                this.stop();
            }
        }
        else {
            //显示界面
            this.img_action.source = "icon_g_diceaction" + this.now_action.toString() + "_png";
        }
    };
    //显示骰子
    Dice.prototype.show = function (_dice) {
        //数据赋值
        this.now_dice_num = _dice;
        //显示界面
        this.img_dice.visible = true;
        this.img_action.visible = false;
        this.img_dice.source = "icon_g_dice" + this.now_dice_num.toString() + "_png";
    };
    //停止动画
    Dice.prototype.stop = function () {
        //停止动作
        if (this._timer_action) {
            this._timer_action.stop();
            this._timer_action.removeEventListener(egret.TimerEvent.TIMER, this.onShowAction, this);
            this._timer_action = null;
        }
        //显示界面
        this.img_dice.visible = true;
        this.img_action.visible = false;
        this.img_dice.source = "icon_g_dice" + this.now_dice_num.toString() + "_png";
        //显示回调函数
        if (this.callback) {
            this.callback();
        }
    };
    return Dice;
}(eui.Component));
__reflect(Dice.prototype, "Dice");
//# sourceMappingURL=Dice.js.map