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
    //初始化
    PanelSet.prototype.createChildren = function () {
        _super.prototype.createChildren.call(this);
        //定义界面
        this.skinName = PanelSetSkin;
        //注册按钮
        this.btn_close.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onCloseBtn, this);
        this.btn_about.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onAboutBtn, this);
        this.btn_clause.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClauseBtn, this);
        this.btn_sound.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onSoundMoveStart, this);
        this.btn_music.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onMusicMoveStart, this);
    };
    //显示界面
    PanelSet.prototype.show = function (callback) {
        if (callback === void 0) { callback = null; }
        //显示界面
        this.popup(this.funExit.bind(this));
        //初始化显示界面
        this.btn_music.x = 260 * basic.SoundManager.instance.musicVolume - 1;
        this.btn_sound.x = 260 * basic.SoundManager.instance.effectVolume - 1;
        this.img_music.width = this.btn_music.x + 31;
        this.img_sound.width = this.btn_sound.x + 31;
    };
    //退出对话框
    PanelSet.prototype.funExit = function () {
        //退出界面
        this.dealAction();
    };
    //退出界面
    PanelSet.prototype.onCloseBtn = function (e) {
        //播放声音
        basic.SoundManager.instance.playEffect("sound_btn_mp3");
        //退出对话框
        this.funExit();
    };
    //关于按钮
    PanelSet.prototype.onAboutBtn = function (e) {
        //播放声音
        basic.SoundManager.instance.playEffect("sound_btn_mp3");
        //发送消息
        basic.Dispatcher.dispatch(EventNames.SHOW_FACE, { "nowshow": 4 });
        //退出对话框
        this.funExit();
    };
    //服务条款按钮
    PanelSet.prototype.onClauseBtn = function (e) {
        //播放声音
        basic.SoundManager.instance.playEffect("sound_btn_mp3");
        //发送消息
        basic.Dispatcher.dispatch(EventNames.SHOW_FACE, { "nowshow": 6 });
        //退出对话框
        this.funExit();
    };
    //滑动按钮
    PanelSet.prototype.onSoundMoveStart = function (e) {
        //计算距离
        this.offset_Sound_X = e.stageX - this.btn_sound.x;
        this.start_Move_Sound_X = this.btn_sound.x;
        //注册事件
        this.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.onSoundMove, this);
        this.addEventListener(egret.TouchEvent.TOUCH_END, this.onSoundMoveOver, this);
    };
    //滑动按钮
    PanelSet.prototype.onMusicMoveStart = function (e) {
        //计算距离
        this.offset_Music_X = e.stageX - this.btn_music.x;
        this.start_Move_Music_X = this.btn_music.x;
        //注册事件
        this.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.onMusicMove, this);
        this.addEventListener(egret.TouchEvent.TOUCH_END, this.onMusicMoveOver, this);
    };
    //移动事件
    PanelSet.prototype.onSoundMove = function (e) {
        //定义变量
        var int_Now_Time; //当前时间
        var num_Now_X; //当前X坐标
        //定义位置
        this.btn_sound.x = e.stageX - this.offset_Sound_X;
        //判断显示
        if (this.btn_sound.x < -1) {
            this.btn_sound.x = -1;
        }
        if (this.btn_sound.x > 260) {
            this.btn_sound.x = 260;
        }
        this.img_sound.width = this.btn_sound.x + 31;
    };
    //移动事件
    PanelSet.prototype.onMusicMove = function (e) {
        //定义变量
        var int_Now_Time; //当前时间
        var num_Now_X; //当前X坐标
        //定义位置
        this.btn_music.x = e.stageX - this.offset_Music_X;
        //判断显示
        if (this.btn_music.x < -1) {
            this.btn_music.x = -1;
        }
        if (this.btn_music.x > 260) {
            this.btn_music.x = 260;
        }
        this.img_music.width = this.btn_music.x + 31;
        //保存数据
        basic.SoundManager.instance.musicVolume = Number((this.btn_music.x + 1) / 260);
        //设置音量
        basic.SoundManager.instance.setVolume();
    };
    //停止移动
    PanelSet.prototype.onSoundMoveOver = function (e) {
        //注销事件
        this.removeEventListener(egret.TouchEvent.TOUCH_MOVE, this.onSoundMove, this);
        this.removeEventListener(egret.TouchEvent.TOUCH_END, this.onSoundMoveOver, this);
        //显示位置
        this.img_sound.width = this.btn_sound.x + 31;
        //保存数据
        basic.SoundManager.instance.effectVolume = Number((this.btn_sound.x + 1) / 260);
    };
    //停止移动
    PanelSet.prototype.onMusicMoveOver = function (e) {
        //注销事件
        this.removeEventListener(egret.TouchEvent.TOUCH_MOVE, this.onMusicMove, this);
        this.removeEventListener(egret.TouchEvent.TOUCH_END, this.onMusicMoveOver, this);
        //显示位置
        this.img_music.width = this.btn_music.x + 31;
        //保存数据
        basic.SoundManager.instance.musicVolume = Number((this.btn_music.x + 1) / 260);
        //设置音量
        basic.SoundManager.instance.setVolume();
    };
    return PanelSet;
}(basic.PanelBase));
__reflect(PanelSet.prototype, "PanelSet");
