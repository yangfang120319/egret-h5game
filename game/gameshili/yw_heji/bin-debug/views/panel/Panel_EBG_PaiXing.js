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
 * @
 *
 */
var Panel_EBG_PaiXing = (function (_super) {
    __extends(Panel_EBG_PaiXing, _super);
    //定义界面
    function Panel_EBG_PaiXing() {
        return _super.call(this, basic.dialogEffect.Flew, {
            duration: 400,
            direction: 'left',
            withFade: true
        }, basic.dialogEffect.Flew, { duration: 400, direction: 'left', withFade: true }) || this;
    }
    Object.defineProperty(Panel_EBG_PaiXing, "instance", {
        get: function () {
            if (this._instance == undefined) {
                this._instance = new Panel_EBG_PaiXing();
            }
            return this._instance;
        },
        enumerable: true,
        configurable: true
    });
    //皮肤设置
    Panel_EBG_PaiXing.prototype.init = function () {
        this.skinName = Panel_EBG_PaiXingSkin;
    };
    //初始化界面
    Panel_EBG_PaiXing.prototype.createChildren = function () {
        _super.prototype.createChildren.call(this);
        //判断显示
        this.width = basic.StageProxy.width;
        this.height = basic.StageProxy.height;
        //注册按钮
        this.rect_back.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onCloseBtn, this);
    };
    //显示界面
    Panel_EBG_PaiXing.prototype.show = function (callback) {
        if (callback === void 0) { callback = null; }
        //数据赋值
        this._callback = callback;
        basic.PopUpManager.modalMaskAlpha = 0;
        //显示界面
        this.popup();
    };
    //退出按钮
    Panel_EBG_PaiXing.prototype.onCloseBtn = function (e) {
        //播放声音
        basic.SoundManager.instance.playEffect("sound_btn_mp3");
        //显示透明度
        basic.PopUpManager.modalMaskAlpha = 0.6;
        //退出界面
        this.dealAction();
    };
    return Panel_EBG_PaiXing;
}(basic.PanelBase));
__reflect(Panel_EBG_PaiXing.prototype, "Panel_EBG_PaiXing");
