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
var Action_PaoWuXian = (function (_super) {
    __extends(Action_PaoWuXian, _super);
    function Action_PaoWuXian() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.timer_action = null;
        _this._tween_alpha = null;
        return _this;
    }
    //初始化
    Action_PaoWuXian.prototype.createChildren = function () {
        _super.prototype.createChildren.call(this);
    };
    //开始动画
    Action_PaoWuXian.prototype.start = function (_callback) {
        //定义变量
        this.scale_rate = Math.random() * 0.6 + 0.3;
        //开始动画
        this.callback = _callback;
        this.img_star = new eui.Image();
        this.img_star.source = "icon_star1_png";
        this.addChild(this.img_star);
        //定义位置
        this.img_star.x = -this.scale_rate * this.img_star.width / 2;
        this.img_star.y = -this.scale_rate * this.img_star.height / 2;
        //判断显示
        if (Math.random() < 0.5) {
            this.speed_x = 10 + Math.random() * 5;
        }
        else {
            this.speed_x = -10 - Math.random() * 5;
        }
        this.speed_y = -20 - Math.random() * 10;
        this.speed_add_y = 1 + Math.random() * 1.2;
        //判断显示
        this.img_star.scaleX = this.scale_rate;
        this.img_star.scaleY = this.scale_rate;
        //开始移动
        this.timer_action = new egret.Timer(50);
        this.timer_action.addEventListener(egret.TimerEvent.TIMER, this.onAction, this);
        this.timer_action.start();
    };
    //开始动画
    Action_PaoWuXian.prototype.onAction = function (e) {
        //数据复制
        this.speed_y += this.speed_add_y;
        //显示位置
        this.img_star.x = this.img_star.x + this.speed_x;
        this.img_star.y = this.img_star.y + this.speed_y;
        //判断消失
        if (this._tween_alpha == null && this.speed_y > 0) {
            this._tween_alpha = egret.Tween.get(this.img_star).to({ alpha: 0 }, 400);
        }
        //判断停止
        if (this.img_star.x + this.x < -this.scale_rate * this.img_star.width || this.img_star.x + this.x > 640 + this.scale_rate * this.img_star.width) {
            //开始移动
            if (this.timer_action) {
                this.timer_action.stop();
                this.timer_action.removeEventListener(egret.TimerEvent.TIMER, this.onAction, this);
                this.timer_action = null;
            }
            //显示回调函数
            if (this.callback) {
                this.callback();
            }
        }
    };
    return Action_PaoWuXian;
}(eui.Component));
__reflect(Action_PaoWuXian.prototype, "Action_PaoWuXian");
//# sourceMappingURL=Action_PaoWuXian.js.map