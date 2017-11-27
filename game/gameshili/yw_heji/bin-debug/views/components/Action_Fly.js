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
 * @飞机飞行
 *
 */
var Action_Fly = (function (_super) {
    __extends(Action_Fly, _super);
    //定义界面
    function Action_Fly() {
        var _this = _super.call(this) || this;
        //定义动画变量
        _this._tween_x0 = null;
        _this._tween_x1 = null;
        _this._tween_y0 = null;
        _this._tween_y1 = null;
        _this._tween_rotation = null;
        _this.start_fly_y = 378;
        _this.start_fly_x = -1000;
        _this.start_tips_y = 450;
        _this.start_tips_x = -1305;
        //定义界面
        _this.skinName = Action_FlySkin;
        return _this;
    }
    //初始化界面
    Action_Fly.prototype.info = function () {
        //定义旋转弧度
        this.g_tips.rotation = 0;
        //定义位置
        this.g_tips.y = this.start_tips_y;
        this.g_tips.x = this.start_tips_x;
        this.img_fly.y = this.start_fly_y;
        this.img_fly.x = this.start_fly_x;
    };
    //开始动画
    Action_Fly.prototype.start = function (_name, _head, _gold, _callback) {
        var _this = this;
        //定义变量
        var move_y = 10;
        var move_x = 1360;
        var move_time_in = 1200;
        var move_time_out = 800;
        var move_time_y = 800;
        var waiting_time = 3000;
        //初始化
        this.info();
        //显示头像
        this.img_head.source = _head;
        //数据赋值
        this.funcallback = _callback;
        //显示名字
        this.txt_name.text = _name;
        //判断显文字
        if (_gold < 100000000) {
            this.txt_gold.text = String(_gold).substring(0, String(_gold).length - 4) + "万";
        }
        else {
            this.txt_gold.text = Number(Math.floor(_gold / 1000000) / 100).toString() + "亿";
        }
        //循环播放
        this._tween_y0 = egret.Tween.get(this.img_fly, { loop: true }).to({ y: this.start_fly_y + move_y }, move_time_y).wait(50).
            to({ y: this.start_fly_y }, move_time_y).wait(50);
        this._tween_y1 = egret.Tween.get(this.g_tips, { loop: true }).to({ y: this.start_tips_y + move_y }, move_time_y).wait(50).
            to({ y: this.start_tips_y }, move_time_y).wait(50);
        //飞机移动
        this._tween_x0 = egret.Tween.get(this.img_fly).to({ x: this.start_fly_x + move_x }, move_time_in, egret.Ease.circOut).
            wait(waiting_time).to({ x: this.start_fly_x + move_x * 2 }, move_time_out, egret.Ease.circIn);
        this._tween_x1 = egret.Tween.get(this.g_tips).to({ x: this.start_tips_x + move_x }, move_time_in, egret.Ease.circOut).
            wait(waiting_time).to({ x: this.start_tips_x + move_x * 2 }, move_time_out, egret.Ease.circIn).call(function () {
            //停止动画
            _this._tween_y0.setPaused(true);
            _this._tween_y1.setPaused(true);
            //显示界面
            if (_this.funcallback) {
                _this.funcallback();
            }
        });
    };
    return Action_Fly;
}(eui.Component));
__reflect(Action_Fly.prototype, "Action_Fly");
