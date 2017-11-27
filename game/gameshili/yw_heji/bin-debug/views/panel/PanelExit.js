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
 * @退出提示
 *
 */
var PanelExit = (function (_super) {
    __extends(PanelExit, _super);
    //定义界面
    function PanelExit() {
        return _super.call(this, basic.dialogEffect.Scale, {
            withFade: true,
            ease: egret.Ease.backOut
        }, basic.dialogEffect.Scale, { withFade: true, ease: egret.Ease.backIn }) || this;
    }
    Object.defineProperty(PanelExit, "instance", {
        get: function () {
            if (this._instance == undefined) {
                this._instance = new PanelExit();
            }
            return this._instance;
        },
        enumerable: true,
        configurable: true
    });
    //初始化
    PanelExit.prototype.createChildren = function () {
        _super.prototype.createChildren.call(this);
        //定义界面
        this.skinName = PanelExitSkin;
        //注册按钮
        this.btn_jixu.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onJiXuBtn, this);
        this.btn_tuichu.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTuiChuBtn, this);
    };
    //显示界面
    PanelExit.prototype.show = function (callback) {
        if (callback === void 0) { callback = null; }
        //显示界面
        this.popup(this.funExit.bind(this));
    };
    //退出对话框
    PanelExit.prototype.funExit = function () {
        //退出界面
        this.dealAction();
    };
    //继续按钮
    PanelExit.prototype.onJiXuBtn = function (e) {
        //播放声音
        basic.SoundManager.instance.playEffect("sound_btn_mp3");
        //退出对话框
        this.funExit();
    };
    //退出按钮
    PanelExit.prototype.onTuiChuBtn = function (e) {
        //播放声音
        basic.SoundManager.instance.playEffect("sound_btn_mp3");
        //退出对话框
        this.funExit();
        //退出游戏
        if (GameData.Game_Type == -1) {
            //调用退出函数
            window["AndroidexitGame"]("");
        }
        else {
            basic.SceneManager.back();
        }
    };
    return PanelExit;
}(basic.PanelBase));
__reflect(PanelExit.prototype, "PanelExit");
