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
 * @从链接提示
 *
 */
var PanelConnectTips = (function (_super) {
    __extends(PanelConnectTips, _super);
    //定义界面
    function PanelConnectTips() {
        return _super.call(this, basic.dialogEffect.Scale, {
            withFade: true,
            ease: egret.Ease.backOut
        }, basic.dialogEffect.Scale, { withFade: true, ease: egret.Ease.backIn }) || this;
    }
    Object.defineProperty(PanelConnectTips, "instance", {
        get: function () {
            if (this._instance == undefined) {
                this._instance = new PanelConnectTips();
            }
            return this._instance;
        },
        enumerable: true,
        configurable: true
    });
    //皮肤设置
    PanelConnectTips.prototype.init = function () {
        this.skinName = PanelConnectTipsSkin;
    };
    //初始化界面
    PanelConnectTips.prototype.createChildren = function () {
        _super.prototype.createChildren.call(this);
        //注册按钮
        this.btn_yes.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onYesBtn, this);
    };
    //显示界面
    PanelConnectTips.prototype.show = function (callback) {
        if (callback === void 0) { callback = null; }
        //显示界面
        this.popup();
    };
    //退出函数
    PanelConnectTips.prototype.funExit = function () {
        //退出事件
        this.dealAction();
    };
    //确定按钮
    PanelConnectTips.prototype.onYesBtn = function (e) {
        //播放声音
        basic.SoundManager.instance.playEffect("sound_btn_mp3");
        //链接服务器
        Comm.instance.init();
    };
    return PanelConnectTips;
}(basic.PanelBase));
__reflect(PanelConnectTips.prototype, "PanelConnectTips");
//# sourceMappingURL=PanelConnectTips.js.map