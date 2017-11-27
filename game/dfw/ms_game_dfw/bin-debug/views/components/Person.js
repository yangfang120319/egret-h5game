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
 * @人物
 *
 */
var Person = (function (_super) {
    __extends(Person, _super);
    function Person() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.show_x = [];
        _this.show_y = [];
        _this._timer_action = null;
        return _this;
    }
    //初始化
    Person.prototype.createChildren = function () {
        _super.prototype.createChildren.call(this);
        //定义遮罩
        this.rect_mask.visible = true;
        this.img_head.mask = this.rect_mask;
        this.img_light.visible = false;
        this.img_light_add.visible = false;
    };
    //人物初始化
    Person.prototype.info = function (_index, _head, _place, _show_x, _show_y) {
        //数据复制
        this.index = _index;
        this.show_x = _show_x;
        this.show_y = _show_y;
        this.now_place = _place;
        //显示头像
        if (_head != "" && _head != null) {
            this.img_head.source = _head;
        }
        else {
            this.img_head.source = "";
        }
        //显示底
        this.img_back.source = "icon_g_head" + _index.toString() + "_png";
        //停止动画
        if (this._timer_action) {
            this._timer_action.stop();
            this._timer_action.removeEventListener(egret.TimerEvent.TIMER, this.onAction, this);
            this._timer_action.removeEventListener(egret.TimerEvent.TIMER_COMPLETE, this.onActionComplete, this);
            this._timer_action = null;
        }
    };
    //清楚界面
    Person.prototype.clean = function () {
        //数据赋值
        this.now_place = 0;
        //显示位置
        this.x = this.show_x[this.now_place];
        this.y = this.show_y[this.now_place];
        //停止动画
        if (this._timer_action) {
            this._timer_action.stop();
            this._timer_action.removeEventListener(egret.TimerEvent.TIMER, this.onAction, this);
            this._timer_action.removeEventListener(egret.TimerEvent.TIMER_COMPLETE, this.onActionComplete, this);
            this._timer_action = null;
        }
    };
    //开始人移动动画
    Person.prototype.startMove = function (_move_to, _callback) {
        //定义变量
        var action_times;
        //停止动画
        if (this._timer_action) {
            this._timer_action.stop();
            this._timer_action.removeEventListener(egret.TimerEvent.TIMER, this.onAction, this);
            this._timer_action.removeEventListener(egret.TimerEvent.TIMER_COMPLETE, this.onActionComplete, this);
            this._timer_action = null;
        }
        //数据赋值
        this.callback = _callback;
        this.move_to_place = Math.min(22, _move_to);
        action_times = Math.abs(_move_to - this.now_place) + 1;
        //开始动画
        this._timer_action = new egret.Timer(700, action_times);
        this._timer_action.addEventListener(egret.TimerEvent.TIMER, this.onAction, this);
        this._timer_action.addEventListener(egret.TimerEvent.TIMER_COMPLETE, this.onActionComplete, this);
        this._timer_action.start();
    };
    //显示光
    Person.prototype.showLight = function (_type) {
        if (_type == 0) {
            this.img_light.visible = false;
            this.img_light_add.visible = false;
        }
        else {
            this.img_light.visible = true;
            this.img_light_add.visible = true;
        }
    };
    //停止移动
    Person.prototype.stopMove = function () {
        //停止动画
        if (this._timer_action) {
            this._timer_action.stop();
            this._timer_action.removeEventListener(egret.TimerEvent.TIMER, this.onAction, this);
            this._timer_action.removeEventListener(egret.TimerEvent.TIMER_COMPLETE, this.onActionComplete, this);
            this._timer_action = null;
        }
        //判断赋值
        this.now_place = this.move_to_place;
        //显示位置
        this.x = this.show_x[this.now_place];
        this.y = this.show_y[this.now_place];
        //显示回调函数
        if (this.callback) {
            this.callback();
        }
    };
    //显示状态
    Person.prototype.showStatus = function (_status) {
        //显示界面
        if (_status == 0) {
            this.img_mask.visible = false;
        }
        else {
            this.img_mask.visible = true;
        }
    };
    //动画函数
    Person.prototype.onAction = function (e) {
        //定义变量
        var is_show_action = false;
        //数据赋值
        if (this.now_place > this.move_to_place) {
            this.now_place -= 1;
            is_show_action = true;
        }
        else if (this.now_place < this.move_to_place) {
            this.now_place += 1;
            is_show_action = true;
        }
        //判断显示动画
        if (is_show_action == true) {
            //显示位置
            if (this.now_place > 21) {
                this.x = this.show_x[0];
                this.y = this.show_y[0];
            }
            else {
                this.x = this.show_x[this.now_place];
                this.y = this.show_y[this.now_place];
            }
            //显示动画
            var _tween_scaleY = egret.Tween.get(this)
                .to({ scaleY: 0.7 }, 200, egret.Ease.backInOut)
                .to({ scaleY: 0.8 }, 200, egret.Ease.backInOut);
        }
    };
    //动画结束
    Person.prototype.onActionComplete = function (e) {
        //停止移动
        this.stopMove();
    };
    return Person;
}(eui.Component));
__reflect(Person.prototype, "Person");
//# sourceMappingURL=Person.js.map