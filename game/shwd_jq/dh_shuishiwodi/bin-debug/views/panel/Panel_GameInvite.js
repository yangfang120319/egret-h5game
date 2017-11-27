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
var Panel_GameInvite = (function (_super) {
    __extends(Panel_GameInvite, _super);
    //定义界面
    function Panel_GameInvite() {
        return _super.call(this, basic.dialogEffect.Scale, {
            withFade: true,
            ease: egret.Ease.backOut
        }, basic.dialogEffect.Scale, { withFade: true, ease: egret.Ease.backIn }) || this;
    }
    Object.defineProperty(Panel_GameInvite, "instance", {
        get: function () {
            if (this._instance == undefined) {
                this._instance = new Panel_GameInvite();
            }
            return this._instance;
        },
        enumerable: true,
        configurable: true
    });
    //初始化界面
    Panel_GameInvite.prototype.createChildren = function () {
        _super.prototype.createChildren.call(this);
        this.skinName = Panel_GameInviteSkin;
        //注册按钮
        this.btn_cancel.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onCancelBtn, this);
        this.btn_enter.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onEnterBtn, this);
    };
    //显示界面
    Panel_GameInvite.prototype.show = function (callback) {
        if (callback === void 0) { callback = null; }
        //显示界面
        this.popup(this.funExit.bind(this));
    };
    //确定按钮
    Panel_GameInvite.prototype.onCancelBtn = function (e) {
        //退出事件
        this.funExit();
    };
    //加入房间
    Panel_GameInvite.prototype.onEnterBtn = function (e) {
        //退出事件
        this.funExit();
        basic.SceneManager.show(SceneNames.GAME);
    };
    //退出函数
    Panel_GameInvite.prototype.funExit = function () {
        //退出事件
        this.dealAction();
    };
    return Panel_GameInvite;
}(basic.PanelBase));
__reflect(Panel_GameInvite.prototype, "Panel_GameInvite");
