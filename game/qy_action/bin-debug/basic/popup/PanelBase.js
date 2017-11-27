/**
 * Created by jq 2016/2/8.
 */
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
var basic;
(function (basic) {
    var PanelBase = (function (_super) {
        __extends(PanelBase, _super);
        //初始化
        function PanelBase(showEffect, showEffectParams, closeEffect, closeEffectParams, popupShowBanner) {
            if (showEffect === void 0) { showEffect = null; }
            if (showEffectParams === void 0) { showEffectParams = null; }
            if (closeEffect === void 0) { closeEffect = null; }
            if (closeEffectParams === void 0) { closeEffectParams = null; }
            if (popupShowBanner === void 0) { popupShowBanner = true; }
            var _this = _super.call(this) || this;
            _this._excludeActionsClose = [];
            //显示数据赋值
            _this.showEffect = showEffect || basic.dialogEffect.None;
            _this.showEffectParams = showEffectParams;
            //关闭数据赋值
            _this.closeEffect = closeEffect || basic.dialogEffect.None;
            _this.closeEffectParams = closeEffectParams;
            //数据赋值
            _this.popupShowBanner = popupShowBanner;
            //初始化
            _this.init();
            return _this;
        }
        //初始化
        PanelBase.prototype.init = function () {
        };
        //添加不用关闭的动作
        PanelBase.prototype.addExcludeForClose = function (actions) {
            //数据赋值
            this._excludeActionsClose = this._excludeActionsClose.concat(actions);
        };
        //退出函数
        PanelBase.prototype.dealAction = function (action, data) {
            if (action === void 0) { action = null; }
            if (data === void 0) { data = null; }
            //判断是否调用callback
            if (this._callback) {
                this._callback(action || 'close', data);
            }
            //判断退出
            if (this._excludeActionsClose.indexOf(action) < 0) {
                this.close();
            }
        };
        //显示对话框
        PanelBase.prototype.popup = function (modalTouchFun, modal) {
            if (modalTouchFun === void 0) { modalTouchFun = null; }
            if (modal === void 0) { modal = true; }
            basic.PopUpManager.addPopUp(this, this.showEffect, this.showEffectParams, modalTouchFun, modal);
        };
        //关闭对话框
        PanelBase.prototype.close = function () {
            basic.PopUpManager.removePopUp(this, this.closeEffect, this.closeEffectParams);
        };
        return PanelBase;
    }(eui.Component));
    basic.PanelBase = PanelBase;
    __reflect(PanelBase.prototype, "basic.PanelBase");
})(basic || (basic = {}));
//# sourceMappingURL=PanelBase.js.map