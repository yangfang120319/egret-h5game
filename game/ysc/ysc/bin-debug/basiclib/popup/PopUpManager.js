/**
 * Created by jq on 2014/12/10.
 */
var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var basic;
(function (basic) {
    var PopUpManager = (function () {
        //初始化
        function PopUpManager() {
            this._pupUpStack = [];
            this._popLayer = basic.SceneManager.instance.popLayer;
        }
        Object.defineProperty(PopUpManager, "instance", {
            get: function () {
                if (PopUpManager._instance == undefined) {
                    PopUpManager._instance = new PopUpManager();
                }
                return PopUpManager._instance;
            },
            enumerable: true,
            configurable: true
        });
        //显示对话框
        PopUpManager.addPopUp = function (target, effectClazz, effectParams, modalTouchFun, modal) {
            if (effectClazz === void 0) { effectClazz = null; }
            if (effectParams === void 0) { effectParams = null; }
            if (modalTouchFun === void 0) { modalTouchFun = null; }
            if (modal === void 0) { modal = true; }
            PopUpManager.instance.addPopUp(target, effectClazz, effectParams, modalTouchFun, modal);
        };
        //移除对话框
        PopUpManager.removePopUp = function (target, effectClazz, effectParams) {
            if (effectClazz === void 0) { effectClazz = null; }
            if (effectParams === void 0) { effectParams = null; }
            PopUpManager.instance.removePopUp(target, effectClazz, effectParams);
        };
        //显示对话框
        PopUpManager.prototype.addPopUp = function (target, effectClazz, effectParams, modalTouchFun, modal) {
            if (effectClazz === void 0) { effectClazz = null; }
            if (effectParams === void 0) { effectParams = null; }
            if (modalTouchFun === void 0) { modalTouchFun = null; }
            if (modal === void 0) { modal = true; }
            //判断是否显示
            if (target.parent) {
                return;
            }
            //数据赋值
            this._pupUpStack.unshift({ target: target, modalTouchFun: modalTouchFun, modal: modal });
            //显示遮罩
            this.updateModalMask(this._pupUpStack[0]);
            //显示界面
            var effect = this.createEffectInstance(effectClazz);
            effect.show(target, this._popLayer, function () {
            }, this, effectParams);
        };
        //移除界面
        PopUpManager.prototype.removePopUp = function (target, effectClazz, effectParams) {
            if (effectClazz === void 0) { effectClazz = null; }
            if (effectParams === void 0) { effectParams = null; }
            //判断是否显示
            if (!target.parent) {
                return;
            }
            this.getInStack(target, true);
            var aimItem;
            this._pupUpStack.some(function (item) {
                if (item.modal) {
                    aimItem = item;
                    return true;
                }
            });
            if (aimItem) {
                this.updateModalMask(aimItem);
            }
            else {
                this.setModalMaskVisible(false);
            }
            var effect = this.createEffectInstance(effectClazz);
            effect.hide(target, this._popLayer, function () {
            }, this, effectParams);
        };
        PopUpManager.prototype.removeTopPupUp = function () {
            if (this._popLayer.numChildren > 0) {
                var top = this._popLayer.getChildAt(this._popLayer.numChildren - 1);
                top['close']();
                return true;
            }
            return false;
        };
        PopUpManager.prototype.getInStack = function (target, del) {
            if (del === void 0) { del = false; }
            var data;
            this._pupUpStack.some(function (item, index) {
                if (item.target == target) {
                    data = { item: item, index: index };
                    return true;
                }
            });
            if (data && del) {
                this._pupUpStack.splice(data.index, 1);
            }
            return data;
        };
        PopUpManager.prototype.createEffectInstance = function (effectClazz) {
            if (effectClazz === void 0) { effectClazz = null; }
            var effect;
            if (effectClazz) {
                effect = new effectClazz();
            }
            else {
                effect = new basic.dialogEffect.None();
            }
            return effect;
        };
        //判断调用函数
        PopUpManager.prototype.onModalMaskTap = function (event) {
            var item = this._pupUpStack[0];
            if (item && item.modal && item.modalTouchFun) {
                item.modalTouchFun();
            }
        };
        PopUpManager.prototype.updateModalMask = function (item) {
            var maskIndex = this._popLayer.getChildIndex(this._modalMask);
            var index = this._popLayer.getChildIndex(item.target);
            if (maskIndex != index - 1) {
                this.setModalMaskVisible(true, index);
            }
        };
        //设置遮罩显示
        PopUpManager.prototype.setModalMaskVisible = function (visible, index) {
            if (index === void 0) { index = -1; }
            //判断显示
            if (visible) {
                //设置遮罩颜色和透明度
                this.modalMask.fillColor = PopUpManager.modalMaskColor;
                this.modalMask.fillAlpha = PopUpManager.modalMaskAlpha;
                this.modalMask.alpha = 0;
                //判断显示遮罩
                if (PopUpManager.modalMaskIsShow == false) {
                    this.modalMask.visible = false;
                }
                else {
                    this.modalMask.visible = true;
                }
                //判断显示
                if (index >= 0) {
                    this.setModalMaskVisible(true);
                    this._popLayer.addChildAt(this.modalMask, index);
                }
                else {
                    this._popLayer.addChild(this.modalMask);
                }
                //显示遮罩
                egret.Tween.get(this.modalMask).to({ alpha: 1 }, PopUpManager.modalMaskDuration);
            }
            else {
                if (this.modalMask.parent) {
                    //隐藏遮罩
                    egret.Tween.get(this.modalMask).to({ alpha: 0 }, PopUpManager.modalMaskDuration).call(function (modalMask) {
                        //移除遮罩
                        this._popLayer.removeChild(modalMask);
                    }, this, [this.modalMask]);
                }
            }
        };
        Object.defineProperty(PopUpManager.prototype, "modalMask", {
            //定义遮罩
            get: function () {
                if (!this._modalMask) {
                    //定义遮罩
                    this._modalMask = new eui.Rect();
                    this._modalMask.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onModalMaskTap, this);
                }
                this._modalMask.width = basic.StageProxy.width;
                this._modalMask.height = basic.StageProxy.height;
                return this._modalMask;
            },
            enumerable: true,
            configurable: true
        });
        //定义变量
        PopUpManager.modalMaskColor = 0;
        PopUpManager.modalMaskAlpha = 0.6;
        PopUpManager.modalMaskDuration = 200;
        PopUpManager.modalMaskIsShow = true;
        return PopUpManager;
    }());
    basic.PopUpManager = PopUpManager;
    __reflect(PopUpManager.prototype, "basic.PopUpManager");
})(basic || (basic = {}));
//# sourceMappingURL=PopUpManager.js.map