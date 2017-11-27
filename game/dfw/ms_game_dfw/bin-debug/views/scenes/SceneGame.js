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
 * @游戏界面
 *
 */
var SceneGame = (function (_super) {
    __extends(SceneGame, _super);
    //定义界面
    function SceneGame() {
        var _this = _super.call(this) || this;
        _this._tween_dice_y = null;
        _this._tween_stop_y = null;
        _this._tween_prevent_y = null;
        //定义界面
        _this.skinName = SceneGameSkin;
        //注册按钮
        _this.btn_tsz.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onTszBtn, _this);
        _this.btn_blz.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onBlzBtn, _this);
        return _this;
    }
    //投骰子
    SceneGame.prototype.onTszBtn = function (e) {
    };
    //避雷针
    SceneGame.prototype.onBlzBtn = function (e) {
    };
    //定义适配
    SceneGame.prototype.onShowPlace = function () {
        //定义变量
        var ratezoom;
        //判断显示
        if (basic.StageProxy.height > 1334) {
            //定义大小
            this.run.scaleX = 0.96;
            this.run.scaleY = 0.9;
            this.user.scaleX = 1;
            this.user.scaleY = 1;
            this.btn_tsz.scaleX = 1;
            this.btn_tsz.scaleY = 1;
            this.btn_blz.scaleX = 1;
            this.btn_blz.scaleY = 1;
            //定义大小和位置
            this.user.y = 0;
            this.user.width = 750;
            //this.run.y = 130 + (basic.StageProxy.height - 1334)/2;
        }
        else if (basic.StageProxy.height > 1250) {
            //数据赋值
            ratezoom = (basic.StageProxy.height - 1250) / 84;
            //定义大小
            this.run.scaleX = 0.9 + 0.06 * ratezoom;
            this.run.scaleY = 0.8 + 0.1 * ratezoom;
            this.user.scaleX = 0.9 + 0.1 * ratezoom;
            this.user.scaleY = 0.9 + 0.1 * ratezoom;
            this.btn_tsz.scaleX = 0.9 + 0.1 * ratezoom;
            this.btn_tsz.scaleY = 0.9 + 0.1 * ratezoom;
            this.btn_blz.scaleX = 0.9 + 0.1 * ratezoom;
            this.btn_blz.scaleY = 0.9 + 0.1 * ratezoom;
            //定义大小和位置
            this.user.y = -4 + 4 * ratezoom;
            //this.run.y = 115 + 15 * ratezoom;
            this.user.width = 750 / this.user.scaleX;
        }
        else if (basic.StageProxy.height > 1136) {
            //数据赋值
            ratezoom = (basic.StageProxy.height - 1136) / 114;
            //定义大小
            this.run.scaleX = 0.84 + 0.1 * ratezoom;
            this.run.scaleY = 0.7 + 0.1 * ratezoom;
            this.user.scaleX = 0.9 + 0.1 * ratezoom;
            this.user.scaleY = 0.9 + 0.1 * ratezoom;
            this.btn_tsz.scaleX = 0.9 + 0.1 * ratezoom;
            this.btn_tsz.scaleY = 0.9 + 0.1 * ratezoom;
            this.btn_blz.scaleX = 0.9 + 0.1 * ratezoom;
            this.btn_blz.scaleY = 0.9 + 0.1 * ratezoom;
            //定义大小和位置
            this.user.y = -4 + 4 * ratezoom;
        }
        else if (basic.StageProxy.height > 960) {
            //数据赋值
            ratezoom = (basic.StageProxy.height - 960) / 176;
            //定义大小
            this.run.scaleX = 0.8 + 0.04 * ratezoom;
            this.run.scaleY = 0.55 + 0.15 * ratezoom;
            this.user.scaleX = 0.9 + 0.1 * ratezoom;
            this.user.scaleY = 0.9 + 0.1 * ratezoom;
            this.btn_tsz.scaleX = 0.9 + 0.1 * ratezoom;
            this.btn_tsz.scaleY = 0.9 + 0.1 * ratezoom;
            this.btn_blz.scaleX = 0.9 + 0.1 * ratezoom;
            this.btn_blz.scaleY = 0.9 + 0.1 * ratezoom;
            //定义大小和位置
            this.user.y = -4 + 4 * ratezoom;
        }
        else {
            //定义大小
            this.run.scaleX = 0.95;
            this.user.scaleX = 0.9;
            this.user.scaleY = 0.9;
            this.btn_tsz.scaleX = 0.9;
            this.btn_tsz.scaleY = 0.9;
            this.btn_blz.scaleX = 0.9;
            this.btn_blz.scaleY = 0.9;
            this.run.scaleY = (basic.StageProxy.height - 225) / 1080;
            //定义大小和位置
            this.user.y = -4;
            this.run.y = 115;
            this.user.width = 750 / this.user.scaleX;
        }
        //显示遮罩位置
        //this.run.showMaskPlace();
        //显示位置
        this.user.showPlace(this.user.width);
    };
    return SceneGame;
}(basic.SceneBase));
__reflect(SceneGame.prototype, "SceneGame");
//# sourceMappingURL=SceneGame.js.map