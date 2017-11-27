/**
 * Created by lenovo on 2014/6/26.
 */
var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var basic;
(function (basic) {
    var sceneEffect;
    (function (sceneEffect) {
        //普通显示界面
        var None = (function () {
            function None() {
            }
            None.prototype.handover = function (scene1, scene2, parent, callback) {
                if (callback === void 0) { callback = null; }
                //判断隐藏上一个场景
                if (scene1) {
                    scene1.visible = false;
                    parent.removeChild(scene1);
                }
                //显示场景
                scene2.alpha = 1;
                scene2.visible = true;
                parent.addChild(scene2);
                //判断显示callback
                if (callback) {
                    callback();
                }
            };
            return None;
        }());
        sceneEffect.None = None;
        __reflect(None.prototype, "basic.sceneEffect.None", ["basic.sceneEffect.ISceneEffect"]);
        //同时隐藏上一个场景显示下一个场景
        var Fade = (function () {
            function Fade() {
            }
            Fade.prototype.handover = function (scene1, scene2, parent, callback) {
                if (callback === void 0) { callback = null; }
                //上一个场景变透明
                egret.Tween.get(scene1).to({ alpha: 0 }, 500);
                //透明显示下一个场景
                scene2.alpha = 0;
                scene2.visible = true;
                parent.addChild(scene2);
                //下一个场景显示
                egret.Tween.get(scene2).to({ alpha: 1 }, 500).call(function () {
                    //移除上一个场景
                    parent.removeChild(scene1);
                    //判断显示callback
                    if (callback) {
                        callback();
                    }
                });
            };
            return Fade;
        }());
        sceneEffect.Fade = Fade;
        __reflect(Fade.prototype, "basic.sceneEffect.Fade", ["basic.sceneEffect.ISceneEffect"]);
        //影藏上一个场景---->显示下一个场景
        var FadeBlack = (function () {
            function FadeBlack() {
            }
            FadeBlack.prototype.handover = function (scene1, scene2, parent, callback) {
                if (callback === void 0) { callback = null; }
                //透明显示上一场景
                scene2.alpha = 0;
                scene2.visible = true;
                parent.addChild(scene2);
                //判断隐藏上一场景
                if (scene1) {
                    egret.Tween.get(scene1).to({ alpha: 0 }, 500).call(function () {
                        //移除上一界面
                        parent.removeChild(scene1);
                        //显示下一场景
                        showScene2();
                    }, this);
                }
                else {
                    //显示下一场景
                    showScene2();
                }
                //显示下一场景
                function showScene2() {
                    egret.Tween.get(scene2).to({ alpha: 1 }, 500).call(function () {
                        //判断显示callback
                        if (callback) {
                            callback();
                        }
                    }, this);
                }
            };
            return FadeBlack;
        }());
        sceneEffect.FadeBlack = FadeBlack;
        __reflect(FadeBlack.prototype, "basic.sceneEffect.FadeBlack", ["basic.sceneEffect.ISceneEffect"]);
        //向上移动
        var Up = (function () {
            function Up() {
            }
            Up.prototype.handover = function (scene1, scene2, parent, callback) {
                if (callback === void 0) { callback = null; }
                //上一个场景变透明
                egret.Tween.get(scene1).to({ y: -basic.StageProxy.height }, 500);
                //显示下一个场景
                scene2.visible = true;
                parent.addChild(scene2);
                scene2.y = basic.StageProxy.height;
                //下一个场景显示
                egret.Tween.get(scene2).to({ y: 0 }, 500).call(function () {
                    //移除上一个场景
                    parent.removeChild(scene1);
                    //判断显示callback
                    if (callback) {
                        callback();
                    }
                });
            };
            return Up;
        }());
        sceneEffect.Up = Up;
        __reflect(Up.prototype, "basic.sceneEffect.Up", ["basic.sceneEffect.ISceneEffect"]);
        //向下移动
        var Down = (function () {
            function Down() {
            }
            Down.prototype.handover = function (scene1, scene2, parent, callback) {
                if (callback === void 0) { callback = null; }
                //上一个场景变透明
                egret.Tween.get(scene1).to({ y: basic.StageProxy.height }, 500);
                //显示下一个场景
                scene2.visible = true;
                parent.addChild(scene2);
                scene2.y = -basic.StageProxy.height;
                //下一个场景显示
                egret.Tween.get(scene2).to({ y: 0 }, 500).call(function () {
                    //移除上一个场景
                    parent.removeChild(scene1);
                    //判断显示callback
                    if (callback) {
                        callback();
                    }
                });
            };
            return Down;
        }());
        sceneEffect.Down = Down;
        __reflect(Down.prototype, "basic.sceneEffect.Down", ["basic.sceneEffect.ISceneEffect"]);
        //向左移动
        var Left = (function () {
            function Left() {
            }
            Left.prototype.handover = function (scene1, scene2, parent, callback) {
                if (callback === void 0) { callback = null; }
                //上一个场景变透明
                egret.Tween.get(scene1).to({ x: -basic.StageProxy.width }, 500);
                //显示下一个场景
                scene2.visible = true;
                parent.addChild(scene2);
                scene2.x = basic.StageProxy.width;
                //下一个场景显示
                egret.Tween.get(scene2).to({ x: 0 }, 500).call(function () {
                    //移除上一个场景
                    parent.removeChild(scene1);
                    //判断显示callback
                    if (callback) {
                        callback();
                    }
                });
            };
            return Left;
        }());
        sceneEffect.Left = Left;
        __reflect(Left.prototype, "basic.sceneEffect.Left", ["basic.sceneEffect.ISceneEffect"]);
        //向右移动
        var Right = (function () {
            function Right() {
            }
            Right.prototype.handover = function (scene1, scene2, parent, callback) {
                if (callback === void 0) { callback = null; }
                //上一个场景变透明
                egret.Tween.get(scene1).to({ x: basic.StageProxy.width }, 500);
                //显示下一个场景
                scene2.visible = true;
                parent.addChild(scene2);
                scene2.x = -basic.StageProxy.width;
                //下一个场景显示
                egret.Tween.get(scene2).to({ x: 0 }, 500).call(function () {
                    //移除上一个场景
                    parent.removeChild(scene1);
                    //判断显示callback
                    if (callback) {
                        callback();
                    }
                });
            };
            return Right;
        }());
        sceneEffect.Right = Right;
        __reflect(Right.prototype, "basic.sceneEffect.Right", ["basic.sceneEffect.ISceneEffect"]);
    })(sceneEffect = basic.sceneEffect || (basic.sceneEffect = {}));
})(basic || (basic = {}));
//# sourceMappingURL=SceneeEffect.js.map