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
 * @设置界面
 *
 */
var PanelSet = (function (_super) {
    __extends(PanelSet, _super);
    //定义界面
    function PanelSet() {
        return _super.call(this, basic.dialogEffect.Scale, {
            withFade: true,
            ease: egret.Ease.backOut
        }, basic.dialogEffect.Scale, { withFade: true, ease: egret.Ease.backIn }) || this;
    }
    Object.defineProperty(PanelSet, "instance", {
        get: function () {
            if (this._instance == undefined) {
                this._instance = new PanelSet();
            }
            return this._instance;
        },
        enumerable: true,
        configurable: true
    });
    //皮肤设置
    PanelSet.prototype.init = function () {
        this.skinName = PanelSetSkin;
    };
    //初始化界面
    PanelSet.prototype.createChildren = function () {
        _super.prototype.createChildren.call(this);
        //显示界面
        this.btn_music.selected = basic.SoundManager.instance.musicMute;
        this.btn_sound.selected = basic.SoundManager.instance.effectMute;
        this.tabbar_language.selectedIndex = basic.LanguageManager.instance.getLanguageMute();
        //注册按钮
        this.btn_exit.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onExitBtn, this);
        this.btn_music.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onMusicBtn, this);
        this.btn_sound.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onSoundBtn, this);
        this.tabbar_language.addEventListener(egret.Event.CHANGE, this.onChangeLanguage, this);
    };
    //显示界面
    PanelSet.prototype.show = function (callback) {
        if (callback === void 0) { callback = null; }
        //数据赋值
        this._callback = callback;
        //显示界面
        this.popup(this.funExit.bind(this));
    };
    //退出函数
    PanelSet.prototype.funExit = function () {
        //退出事件
        this.dealAction();
    };
    //退出按钮
    PanelSet.prototype.onExitBtn = function (e) {
        //播放声音
        basic.SoundManager.instance.playEffect("sound_btn_mp3");
        //退出设置
        this.funExit();
    };
    //音效按钮
    PanelSet.prototype.onSoundBtn = function (e) {
        //数据赋值
        basic.SoundManager.instance.switchEffect();
    };
    //音乐按钮
    PanelSet.prototype.onMusicBtn = function (e) {
        //数据赋值
        basic.SoundManager.instance.switchMusic();
    };
    //语言
    PanelSet.prototype.onChangeLanguage = function (e) {
        //播放声音
        basic.SoundManager.instance.playEffect("sound_btn_mp3");
        //保存语言
        basic.LanguageManager.instance.setLanguageMute(this.tabbar_language.selectedIndex);
    };
    return PanelSet;
}(basic.PanelBase));
__reflect(PanelSet.prototype, "PanelSet");
//# sourceMappingURL=PanelSet.js.map