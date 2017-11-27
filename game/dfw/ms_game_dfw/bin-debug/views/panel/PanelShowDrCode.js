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
 * @关注公众号
 *
 */
var PanelShowDrCode = (function (_super) {
    __extends(PanelShowDrCode, _super);
    //定义界面
    function PanelShowDrCode() {
        return _super.call(this, basic.dialogEffect.Scale, {
            withFade: true,
            ease: egret.Ease.backOut
        }, basic.dialogEffect.Scale, { withFade: true, ease: egret.Ease.backIn }) || this;
    }
    Object.defineProperty(PanelShowDrCode, "instance", {
        get: function () {
            if (this._instance == undefined) {
                this._instance = new PanelShowDrCode();
            }
            return this._instance;
        },
        enumerable: true,
        configurable: true
    });
    //皮肤设置
    PanelShowDrCode.prototype.init = function () {
        this.skinName = PanelShowDrCodeSkin;
    };
    //初始化界面
    PanelShowDrCode.prototype.createChildren = function () {
        _super.prototype.createChildren.call(this);
    };
    //显示界面
    PanelShowDrCode.prototype.show = function (callback) {
        if (callback === void 0) { callback = null; }
        //显示界面
        this.popup(this.funExit.bind(this));
        //显示二维码
        this.showCode();
    };
    //退出函数
    PanelShowDrCode.prototype.funExit = function () {
        //退出事件
        this.dealAction();
        //移除二维码
        hideQrCode();
    };
    //显示二维码
    PanelShowDrCode.prototype.showCode = function () {
        //定义变量
        var top_px;
        var img_url;
        var top_show;
        var height_px;
        var show_height = 300;
        //判断显示
        img_url = "https://game.yile.vip/h5/erweima.jpg";
        height_px = window.innerWidth * show_height / basic.StageProxy.width;
        top_px = window.innerHeight - (basic.StageProxy.height * 0.57 + 125) * (window.innerWidth / basic.StageProxy.width);
        //显示关注微信公众号
        showQrCode(img_url, top_px, height_px);
    };
    return PanelShowDrCode;
}(basic.PanelBase));
__reflect(PanelShowDrCode.prototype, "PanelShowDrCode");
//# sourceMappingURL=PanelShowDrCode.js.map