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
var EBG_BiaoQing = (function (_super) {
    __extends(EBG_BiaoQing, _super);
    function EBG_BiaoQing() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.btn_biaoqing = [];
        _this._tween_y = null;
        _this.is_show = false;
        return _this;
    }
    //初始化
    EBG_BiaoQing.prototype.createChildren = function () {
        _super.prototype.createChildren.call(this);
        //隐藏界面
        this.y = 1136;
        this.visible = true;
        //数据赋值
        for (var i = 1; i < 28; i++) {
            //定义变量
            var btn = this["btn_biaoqing" + i];
            //数据赋值
            this.btn_biaoqing[i] = btn;
            //注册按钮
            this.btn_biaoqing[i].addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBiaoQingBtn, this);
        }
        //注册事件
        basic.Dispatcher.addListener(EventNames.EBG_SHOWBIAOQING, this.onShowFace, this);
        //定义按钮
        this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onThisBtn, this);
        this.btn_delete.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onDeleteBtn, this);
    };
    //删除按钮
    EBG_BiaoQing.prototype.onDeleteBtn = function (e) {
        //播放声音
        basic.SoundManager.instance.playEffect("sound_btn_mp3");
        //发送消息
        basic.Dispatcher.dispatch(EventNames.EBG_DELETECHAT);
    };
    //表情按钮
    EBG_BiaoQing.prototype.onBiaoQingBtn = function (e) {
        //定义变量
        var btnnum = Number(e.target.name);
        //播放声音
        basic.SoundManager.instance.playEffect("sound_btn_mp3");
        //发送消息
        basic.Dispatcher.dispatch(EventNames.EBG_ADDBIAOQING, { "num": btnnum });
    };
    //显示界面
    EBG_BiaoQing.prototype.onShowFace = function (e) {
        var _this = this;
        //显示界面
        if (this.is_show == false) {
            //数据赋值
            this.is_show = true;
            //显示界面
            this._tween_y = egret.Tween.get(this).to({ y: 1136 - this.height }, 200).call(function () {
                //注册按钮
                basic.StageProxy.stage.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onHideFace, _this);
            });
        }
    };
    //当前按钮
    EBG_BiaoQing.prototype.onThisBtn = function (e) {
        var _this = this;
        //数据赋值
        egret.setTimeout(function () {
            _this.is_click = true;
        }, this, 20);
    };
    //隐藏按钮
    EBG_BiaoQing.prototype.onHideFace = function (e) {
        var _this = this;
        //数据赋值
        this.is_click = false;
        //判断隐藏界面
        egret.setTimeout(function () {
            if (_this.is_click == false) {
                //数据赋值
                _this.is_show = false;
                //隐藏界面
                _this._tween_y = egret.Tween.get(_this).to({ y: 1136 }, 200);
                //注销按钮
                basic.StageProxy.stage.removeEventListener(egret.TouchEvent.TOUCH_TAP, _this.onHideFace, _this);
            }
        }, this, 50);
    };
    return EBG_BiaoQing;
}(eui.Component));
__reflect(EBG_BiaoQing.prototype, "EBG_BiaoQing");
