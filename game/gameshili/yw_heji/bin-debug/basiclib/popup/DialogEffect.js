/**
 * Created by jq on 2016/2/8.
 */
var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/*
 * Blind 刷出来
 * Bounce 跳动
 * Clip 横向收缩
 * Scale 纵向收缩
 * Drop 单向收缩+fade
 * Slide 单向收缩
 * Explode 八方向爆炸
 * Fade 渐进
 * Fold 抽屉收缩
 * Puff 放大+Fade
 * Pulsate 闪烁
 * Shake 抖动
 * */
var basic;
(function (basic) {
    var dialogEffect;
    (function (dialogEffect) {
        var Utils = (function () {
            function Utils() {
            }
            //水平垂直居中
            Utils.centerPopUp = function (popUp) {
                popUp.horizontalCenter = popUp.verticalCenter = 0;
            };
            //水平居中
            Utils.centerHorizontal = function (popUp) {
                popUp.horizontalCenter = 0;
            };
            //垂直居中
            Utils.centerVertical = function (popUp) {
                popUp.verticalCenter = 0;
            };
            //不设置居中
            Utils.notCenterPopUp = function (popUp) {
                popUp.horizontalCenter = popUp.verticalCenter = NaN;
            };
            //返回对话框居中位置
            Utils.getCenterPos = function (popUp) {
                //定义变量
                var x = 0;
                var y = 0;
                //对话框父级容器
                var parent = popUp.parent;
                //数据赋值
                if (parent) {
                    x = (parent.width - popUp.width) * 0.5;
                    y = (parent.height - popUp.height) * 0.5;
                }
                return { x: x, y: y };
            };
            //返回位置
            Utils.transDirection = function (dStr) {
                var d;
                switch (dStr) {
                    case "up":
                        d = 0;
                        break;
                    case "right":
                        d = 1;
                        break;
                    case "bottom":
                        d = 2;
                        break;
                    case "left":
                        d = 3;
                        break;
                }
                return d;
            };
            return Utils;
        }());
        dialogEffect.Utils = Utils;
        __reflect(Utils.prototype, "basic.dialogEffect.Utils");
        /***
         * 无效果
         */
        var None = (function () {
            function None() {
            }
            None.prototype.show = function (target, parent, callback, thisObj, params) {
                parent.addChild(target);
                Utils.centerPopUp(target);
            };
            None.prototype.hide = function (target, parent, callback, thisObj, params) {
                parent.removeChild(target);
            };
            return None;
        }());
        dialogEffect.None = None;
        __reflect(None.prototype, "basic.dialogEffect.None", ["basic.dialogEffect.IDialogEffect"]);
        /***
         * 渐进渐出
         */
        var Fade = (function () {
            function Fade() {
            }
            Fade.prototype.show = function (target, parent, callback, thisObj, params) {
                target.alpha = 0;
                parent.addChild(target);
                Utils.centerPopUp(target);
                var duration = (params && params.duration) || Fade.DEFAULT_DURATION;
                egret.Tween.get(target).to({ alpha: 1 }, duration);
            };
            Fade.prototype.hide = function (target, parent, callback, thisObj, params) {
                var duration = (params && params.duration) || Fade.DEFAULT_DURATION;
                egret.Tween.get(target).to({ alpha: 0 }, duration).call(function () {
                    parent.removeChild(target);
                }, this);
            };
            Fade.DEFAULT_DURATION = 200;
            return Fade;
        }());
        dialogEffect.Fade = Fade;
        __reflect(Fade.prototype, "basic.dialogEffect.Fade", ["basic.dialogEffect.IDialogEffect"]);
        /**
         * 飞入
         * duration: 时间
         * direction: 方向(up, bottom, left, right)
         * withFade: 是否伴随渐进渐出
         */
        var Flew = (function () {
            function Flew() {
            }
            Flew.prototype.show = function (target, parent, callback, thisObj, params) {
                if (!Flew.outPos) {
                    Flew.outPos = [[0, -basic.StageProxy.height], [basic.StageProxy.width, 0], [0, basic.StageProxy.height], [-basic.StageProxy.width, 0]];
                }
                parent.addChild(target);
                Utils.notCenterPopUp(target);
                parent.width = basic.StageProxy.width;
                var startPos = Flew.outPos[Utils.transDirection(params.direction)];
                var centerPos = Utils.getCenterPos(target);
                target.x = startPos[0] == 0 ? centerPos.x : startPos[0];
                target.y = startPos[1] == 0 ? centerPos.y : startPos[1];
                var duration = (params && params.duration) || Flew.DEFAULT_DURATION;
                var state = { x: centerPos.x, y: centerPos.y };
                egret.Tween.get(target).to(state, duration, params ? params.ease : null);
                if (params && params.withFade) {
                    egret.Tween.get(target).to({ alpha: 1 }, duration);
                }
            };
            Flew.prototype.hide = function (target, parent, callback, thisObj, params) {
                var endPos = Flew.outPos[Utils.transDirection(params.direction)];
                var duration = (params && params.duration) || Flew.DEFAULT_DURATION;
                var centerPos = Utils.getCenterPos(target);
                var state = {
                    x: (endPos[0] == 0 ? centerPos.x : endPos[0]),
                    y: endPos[1] == 0 ? centerPos.y : endPos[1]
                };
                egret.Tween.get(target).to(state, duration, params ? params.ease : null).call(function () {
                    parent.removeChild(target);
                    Utils.centerPopUp(target);
                }, this);
                if (params && params.withFade) {
                    egret.Tween.get(target).to({ alpha: 0 }, duration);
                }
            };
            Flew.DEFAULT_DURATION = 500;
            return Flew;
        }());
        dialogEffect.Flew = Flew;
        __reflect(Flew.prototype, "basic.dialogEffect.Flew", ["basic.dialogEffect.IDialogEffect"]);
        /***
         * 缩放
         * duration: 时间
         * withFade: 是否伴随渐进渐出
         */
        var Scale = (function () {
            function Scale() {
            }
            Scale.prototype.show = function (target, parent, callback, thisObj, params) {
                var duration = (params && params.duration) || Scale.DEFAULT_DURATION;
                target.scaleX = target.scaleY = 0;
                var state = { scaleX: 1, scaleY: 1 };
                parent.addChild(target);
                Utils.centerPopUp(target);
                egret.Tween.get(target).to(state, duration, params ? params.ease : null);
                if (params && params.withFade) {
                    egret.Tween.get(target).to({ alpha: 1 }, duration);
                }
            };
            Scale.prototype.hide = function (target, parent, callback, thisObj, params) {
                var duration = (params && params.duration) || Scale.DEFAULT_DURATION;
                target.scaleX = target.scaleY = 1;
                var state = { scaleX: 0, scaleY: 0 };
                egret.Tween.get(target).to(state, duration, params ? params.ease : null).call(function () {
                    parent.removeChild(target);
                    target.scaleX = target.scaleY = 1;
                }, this);
                if (params && params.withFade) {
                    egret.Tween.get(target).to({ alpha: 0 }, duration);
                }
            };
            Scale.DEFAULT_DURATION = 200;
            return Scale;
        }());
        dialogEffect.Scale = Scale;
        __reflect(Scale.prototype, "basic.dialogEffect.Scale", ["basic.dialogEffect.IDialogEffect"]);
    })(dialogEffect = basic.dialogEffect || (basic.dialogEffect = {}));
})(basic || (basic = {}));
