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
 * @选择按钮
 *
 */
var ChooseBtn = (function (_super) {
    __extends(ChooseBtn, _super);
    //初始化
    function ChooseBtn() {
        var _this = _super.call(this) || this;
        _this.now_choose = -1;
        _this.btn_choose = [];
        //定义界面
        _this.skinName = ChooseBtnSkin;
        //数据赋值
        for (var i = 0; i < 3; i++) {
            //定义变量
            var now_btn = _this["btn_choose" + i];
            //数据赋值
            _this.btn_choose[i] = now_btn;
            _this.btn_choose[i].visible = false;
            _this.btn_choose[i].currentState = "up";
            //注册按钮
            _this.btn_choose[i].addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onChooseBtn, _this);
        }
        return _this;
    }
    //初始化界面
    ChooseBtn.prototype.info = function (_btn_detail, _callback) {
        if (_callback === void 0) { _callback = null; }
        //数据赋值
        this.callback = _callback;
        //初始化按钮
        for (var i = 0; i < _btn_detail.length; i++) {
            //显示按钮
            this.btn_choose[i].visible = true;
            this.btn_choose[i].label = _btn_detail[i];
        }
        //判断显示高度
        if (_btn_detail.length == 2) {
            this.height = 210;
        }
        else if (_btn_detail.length == 3) {
            this.height = 310;
        }
    };
    //显示当前选项
    ChooseBtn.prototype.showChoose = function (_choose) {
        //数据赋值
        this.now_choose = _choose;
        //显示按钮
        for (var i = 0; i < 3; i++) {
            //判断显示
            if (i == this.now_choose) {
                this.btn_choose[i].currentState = "down";
            }
            else {
                this.btn_choose[i].currentState = "up";
            }
        }
    };
    //选择按钮
    ChooseBtn.prototype.onChooseBtn = function (e) {
        //定义变量
        var btnnum = Number(e.target.name);
        //数据赋值
        this.now_choose = btnnum;
        //播放声音
        basic.SoundManager.instance.playEffect("sound_btn_mp3");
        //显示按钮
        for (var i = 0; i < 3; i++) {
            //判断显示
            if (i == this.now_choose) {
                this.btn_choose[i].currentState = "down";
            }
            else {
                this.btn_choose[i].currentState = "up";
            }
        }
        //显示回调函数
        if (this.callback) {
            this.callback(this.now_choose);
        }
    };
    return ChooseBtn;
}(eui.Component));
__reflect(ChooseBtn.prototype, "ChooseBtn");
//# sourceMappingURL=ChooseBtn.js.map