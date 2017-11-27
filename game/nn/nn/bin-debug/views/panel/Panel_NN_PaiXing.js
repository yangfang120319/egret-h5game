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
var Panel_NN_PaiXing = (function (_super) {
    __extends(Panel_NN_PaiXing, _super);
    //定义界面
    function Panel_NN_PaiXing() {
        return _super.call(this, basic.dialogEffect.Flew, {
            duration: 400,
            direction: 'left',
            withFade: true
        }, basic.dialogEffect.Flew, { duration: 400, direction: 'left', withFade: true }) || this;
    }
    Object.defineProperty(Panel_NN_PaiXing, "instance", {
        get: function () {
            if (this._instance == undefined) {
                this._instance = new Panel_NN_PaiXing();
            }
            return this._instance;
        },
        enumerable: true,
        configurable: true
    });
    //皮肤设置
    Panel_NN_PaiXing.prototype.init = function () {
        this.skinName = Panel_NN_PaiXingSkin;
    };
    //初始化界面
    Panel_NN_PaiXing.prototype.createChildren = function () {
        _super.prototype.createChildren.call(this);
        //注册按钮
        this.rect_back.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onCloseBtn, this);
    };
    //显示界面
    Panel_NN_PaiXing.prototype.show = function (callback) {
        if (callback === void 0) { callback = null; }
        //显示宽度
        this.width = basic.StageProxy.width;
        //数据赋值
        basic.PopUpManager.modalMaskAlpha = 0;
        //显示界面
        this.popup(this.funExit.bind(this));
    };
    //退出函数
    Panel_NN_PaiXing.prototype.funExit = function () {
        //播放声音
        basic.SoundManager.instance.playEffect("sound_btn_mp3");
        //数据赋值
        basic.PopUpManager.modalMaskAlpha = 0.6;
        //退出界面
        this.dealAction();
    };
    //退出按钮
    Panel_NN_PaiXing.prototype.onCloseBtn = function (e) {
        //退出函数
        this.funExit();
    };
    return Panel_NN_PaiXing;
}(basic.PanelBase));
__reflect(Panel_NN_PaiXing.prototype, "Panel_NN_PaiXing");
//# sourceMappingURL=Panel_NN_PaiXing.js.map