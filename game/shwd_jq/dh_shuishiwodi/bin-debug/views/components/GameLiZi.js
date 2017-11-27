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
 * @例子效果
 *
 */
var GameLiZi = (function (_super) {
    __extends(GameLiZi, _super);
    function GameLiZi() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        //定义变量
        _this.show_num = 0;
        _this.show_detail = [];
        _this.start_show_num = 50;
        _this.timer_action = null;
        return _this;
    }
    //初始化
    GameLiZi.prototype.createChildren = function () {
        _super.prototype.createChildren.call(this);
    };
    //开始粒子效果
    GameLiZi.prototype.start = function () {
        //停止粒子效果
        this.stop();
        //初始化粒子
        for (var i = 0; i < this.start_show_num; i++) {
            //显示粒子
            this.showLiZi(0, this.show_num);
            //数据赋值
            this.show_num += 1;
        }
        //开始计时
        this.timer_action = new egret.Timer(300);
        this.timer_action.addEventListener(egret.TimerEvent.TIMER, this.onAction, this);
        this.timer_action.start();
    };
    //停止粒子效果
    GameLiZi.prototype.stop = function () {
        //停止动画
        if (this.timer_action) {
            this.timer_action.stop();
            this.timer_action.removeEventListener(egret.TimerEvent.TIMER, this.onAction, this);
            this.timer_action = null;
        }
        //移除所有粒子
        for (var i = 0; i < this.show_num; i++) {
            //判断移除界面
            if (this.show_detail[i]) {
                this.show_detail[i].stop();
            }
        }
        //清空数据
        this.show_num = 0;
        this.show_detail = [];
    };
    //显示动画
    GameLiZi.prototype.onAction = function (e) {
        //显示粒子
        this.showLiZi(1, this.show_num);
        //数据赋值
        this.show_num += 1;
    };
    //显示粒子
    GameLiZi.prototype.showLiZi = function (_type, _num) {
        var _this = this;
        //定义变量
        var lizi = new LiZi();
        //判断定义位置
        lizi.x = Math.random() * 640;
        if (_type == 0) {
            lizi.y = Math.random() * (this.height - 50);
        }
        else {
            lizi.y = 0;
        }
        //开始动画
        this.show_detail[_num] = lizi;
        this.addChild(this.show_detail[_num]);
        this.show_detail[_num].start(this.height, function () {
            //移除
            _this.removeChild(_this.show_detail[_num]);
            _this.show_detail[_num] = null;
        });
    };
    return GameLiZi;
}(eui.Component));
__reflect(GameLiZi.prototype, "GameLiZi");
//粒子动画
var LiZi = (function (_super) {
    __extends(LiZi, _super);
    //定义界面
    function LiZi() {
        var _this = _super.call(this) || this;
        _this._tween_x = null;
        _this._tween_y = null;
        _this._tween_rotation = null;
        //定义界面
        _this.skinName = LiZiSkin;
        return _this;
    }
    //开始动画
    LiZi.prototype.start = function (_height, _callback) {
        var _this = this;
        //定义变量
        var move_to_x;
        var move_x_time;
        var move_y_time;
        var move_distance_x;
        var move_distance_y;
        var move_to_rotaitio;
        var move_rotaition_time;
        //数据赋值
        this.callback = _callback;
        //数据赋值
        this.speed_y = Math.random() + 1;
        this.speed_x = 1.5 - Math.random() * 3;
        this.speed_rotation = Math.random() * 2;
        if (this.speed_x < 0) {
            move_to_x = 0;
            move_distance_x = this.x;
        }
        else {
            move_to_x = basic.StageProxy.width;
            move_distance_x = basic.StageProxy.width - this.x;
        }
        move_distance_y = _height - this.y;
        if (Math.random() < 0.5) {
            move_to_rotaitio = 360;
        }
        else {
            move_to_rotaitio = -360;
        }
        //显示界面
        this.currentState = Math.floor(Math.random() * 3).toString();
        //时间数据复制
        move_x_time = (Math.abs(this.speed_x) + 5) * move_distance_x * 30;
        move_y_time = Math.abs(this.speed_y) * move_distance_y * 30;
        move_rotaition_time = (this.speed_rotation + 2) * 360 * 30;
        //显示动画
        this._tween_rotation = egret.Tween.get(this, { loop: true }).to({ rotation: move_to_rotaitio }, move_rotaition_time);
        this._tween_x = egret.Tween.get(this).to({ x: move_to_x }, move_x_time).call(function () {
            //停止动画
            _this.stop();
        });
        this._tween_y = egret.Tween.get(this).to({ y: _height }, move_y_time).call(function () {
            //停止动画
            _this.stop();
        });
    };
    //停止动画
    LiZi.prototype.stop = function () {
        //停止动画
        if (this._tween_x) {
            this._tween_x.setPaused(true);
            this._tween_x = null;
        }
        if (this._tween_y) {
            this._tween_y.setPaused(true);
            this._tween_y = null;
        }
        if (this._tween_rotation) {
            this._tween_rotation.setPaused(true);
            this._tween_rotation = null;
        }
        //显示回调函数
        this.callback();
    };
    return LiZi;
}(eui.Component));
__reflect(LiZi.prototype, "LiZi");
