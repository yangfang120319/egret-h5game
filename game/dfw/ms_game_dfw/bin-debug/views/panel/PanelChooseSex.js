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
 * @选择性别
 *
 */
var PanelChooseSex = (function (_super) {
    __extends(PanelChooseSex, _super);
    //定义界面
    function PanelChooseSex() {
        var _this = _super.call(this, basic.dialogEffect.Scale, {
            withFade: true,
            ease: egret.Ease.backOut
        }, basic.dialogEffect.Scale, { withFade: true, ease: egret.Ease.backIn }) || this;
        _this.now_sex = -1;
        _this.is_show = false;
        return _this;
    }
    Object.defineProperty(PanelChooseSex, "instance", {
        get: function () {
            if (this._instance == undefined) {
                this._instance = new PanelChooseSex();
            }
            return this._instance;
        },
        enumerable: true,
        configurable: true
    });
    //皮肤设置
    PanelChooseSex.prototype.init = function () {
        this.skinName = PanelChooseSexSkin;
    };
    //初始化界面
    PanelChooseSex.prototype.createChildren = function () {
        _super.prototype.createChildren.call(this);
        //注册按钮
        this.btn_yes.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onYesBtn, this);
        this.btn_sex0.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onSexBtn, this);
        this.btn_sex1.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onSexBtn, this);
    };
    //显示界面
    PanelChooseSex.prototype.show = function (callback) {
        if (callback === void 0) { callback = null; }
        if (this.is_show == false) {
            //数据赋值
            this.now_sex = -1;
            this.is_show = true;
            this._callback = callback;
            //显示界面
            this.popup();
            //显示按钮状态
            this.btn_sex1.currentState = "up";
            this.btn_sex0.currentState = "up";
        }
    };
    //退出函数
    PanelChooseSex.prototype.funExit = function () {
        //数据赋值
        this.is_show = false;
        //退出事件
        this.dealAction();
    };
    //性别按钮
    PanelChooseSex.prototype.onSexBtn = function (e) {
        //定义变量
        this.now_sex = Number(e.target.name);
        //播放声音
        basic.SoundManager.instance.playEffect("sound_btn_mp3");
        //判断显示按钮
        if (this.now_sex == 0) {
            this.btn_sex1.currentState = "up";
            this.btn_sex0.currentState = "down";
        }
        else {
            this.btn_sex0.currentState = "up";
            this.btn_sex1.currentState = "down";
        }
    };
    //确定按钮
    PanelChooseSex.prototype.onYesBtn = function (e) {
        //播放声音
        basic.SoundManager.instance.playEffect("sound_btn_mp3");
        //判断显示
        if (this.now_sex != -1) {
            //数据赋值
            UserData.User_Sex = this.now_sex;
            //发送消息
            Comm.instance.sendSocket({ "type": "setSex", sex: this.now_sex });
            //退出设置
            this.funExit();
        }
        else {
            basic.Dispatcher.dispatch(EventNames.SHOW_TIPS, { "msg": "请选择性别！" });
        }
    };
    return PanelChooseSex;
}(basic.PanelBase));
__reflect(PanelChooseSex.prototype, "PanelChooseSex");
//# sourceMappingURL=PanelChooseSex.js.map