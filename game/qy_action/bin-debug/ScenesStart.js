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
 * @开始界面
 *
 */
var ScenesStart = (function (_super) {
    __extends(ScenesStart, _super);
    //定义界面
    function ScenesStart() {
        var _this = _super.call(this) || this;
        //定义界面
        _this.skinName = ScenesStartSkin;
        //注册按钮
        _this.btn_pk.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onPkBtn, _this);
        _this.btn_win0.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onWinBtn0, _this);
        _this.btn_win1.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onWinBtn1, _this);
        _this.btn_win2.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onWinBtn2, _this);
        _this.btn_lose0.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onLoseBtn0, _this);
        _this.btn_lose1.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onLoseBtn1, _this);
        _this.btn_start.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onStartBtn, _this);
        return _this;
    }
    //挑战胜利
    ScenesStart.prototype.onWinBtn0 = function (e) {
        //判断显示
        if (this.rect_back.visible == false) {
            basic.SceneManager.removeBottomScene("PK");
        }
        //显示界面
        this.win.start(0);
        this.win.visible = true;
        this.lose.visible = false;
        this.rect_back.visible = true;
        this.startaction.visible = false;
        this.startaction.clean();
    };
    //挑战完成
    ScenesStart.prototype.onWinBtn1 = function (e) {
        //判断显示
        if (this.rect_back.visible == false) {
            basic.SceneManager.removeBottomScene("PK");
        }
        //显示界面
        this.win.start(1);
        this.win.visible = true;
        this.lose.visible = false;
        this.rect_back.visible = true;
        this.startaction.visible = false;
        this.startaction.clean();
    };
    //闯关成功
    ScenesStart.prototype.onWinBtn2 = function (e) {
        //判断显示
        if (this.rect_back.visible == false) {
            basic.SceneManager.removeBottomScene("PK");
        }
        //显示界面
        this.win.start(2);
        this.win.visible = true;
        this.lose.visible = false;
        this.rect_back.visible = true;
        this.startaction.visible = false;
        this.startaction.clean();
    };
    //挑战成功
    ScenesStart.prototype.onLoseBtn0 = function (e) {
        //判断显示
        if (this.rect_back.visible == false) {
            basic.SceneManager.removeBottomScene("PK");
        }
        //显示界面
        this.lose.start(0);
        this.lose.visible = true;
        this.win.visible = false;
        this.rect_back.visible = true;
        this.startaction.visible = false;
        this.startaction.clean();
    };
    //闯关成功
    ScenesStart.prototype.onLoseBtn1 = function (e) {
        //判断显示
        if (this.rect_back.visible == false) {
            basic.SceneManager.removeBottomScene("PK");
        }
        //显示界面
        this.lose.start(1);
        this.lose.visible = true;
        this.win.visible = false;
        this.rect_back.visible = true;
        this.startaction.visible = false;
        this.startaction.clean();
    };
    //PK按钮
    ScenesStart.prototype.onPkBtn = function (e) {
        //判断显示
        if (this.rect_back.visible == false) {
            basic.SceneManager.removeBottomScene("PK");
        }
        //显示界面
        this.win.visible = false;
        this.lose.visible = false;
        this.rect_back.visible = false;
        basic.SceneManager.addBottomScene("PK");
        this.startaction.visible = false;
        this.startaction.clean();
    };
    //开始按钮
    ScenesStart.prototype.onStartBtn = function (e) {
        //判断显示
        if (this.rect_back.visible == false) {
            basic.SceneManager.removeBottomScene("PK");
        }
        //显示界面
        this.win.visible = false;
        this.lose.visible = false;
        this.rect_back.visible = false;
        this.startaction.visible = true;
        this.startaction.info();
    };
    return ScenesStart;
}(basic.SceneBase));
__reflect(ScenesStart.prototype, "ScenesStart");
//# sourceMappingURL=ScenesStart.js.map