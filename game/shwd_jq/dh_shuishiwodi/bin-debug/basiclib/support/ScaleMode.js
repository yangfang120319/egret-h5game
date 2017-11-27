var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 *Created by jq on 2016/1/24
 * @设置适配模式
 *
 */
var basic;
(function (basic) {
    var ScaleMode = (function () {
        function ScaleMode() {
        }
        //设置竖屏模式
        ScaleMode.setPortrait = function () {
            //设置屏幕适配
            basic.StageProxy.stage.scaleMode = egret.StageScaleMode.FIXED_WIDTH;
            basic.StageProxy.stage.orientation = egret.OrientationMode.PORTRAIT;
        };
        //设置横屏模式
        ScaleMode.setLandscape = function () {
            //设置屏幕适配
            basic.StageProxy.stage.scaleMode = egret.StageScaleMode.FIXED_HEIGHT;
            basic.StageProxy.stage.orientation = egret.OrientationMode.LANDSCAPE;
        };
        return ScaleMode;
    }());
    basic.ScaleMode = ScaleMode;
    __reflect(ScaleMode.prototype, "basic.ScaleMode");
})(basic || (basic = {}));
