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
 * @结束界面
 *
 */
var SceneOver = (function (_super) {
    __extends(SceneOver, _super);
    //定义界面
    function SceneOver() {
        var _this = _super.call(this) || this;
        console.info(_this);
        //定义界面
        _this.skinName = SceneOverSkin;
        //注册按钮
        _this.btn_next.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onNextBtn, _this);
        _this.btn_over.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onOverBtn, _this);
        _this.btn_share.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onShareBtn, _this);
        _this.btn_again.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onAgainBtn, _this);
        return _this;
    }
    //注册侦听
    SceneOver.prototype.beforeShow = function (params) {
        //初始化遮罩 
        this.g_over.visible = false;
        this.img_mask.visible = true;
        this.txt_tips.visible = true;
        this.btn_next.visible = true;
        this.btn_over.visible = true;
        this.mask_action = new Action_Mask(this.img_mask);
        //显示界面
        this.txt_name.text = UserData.User_Name;
        if (UserData.User_Choose[4] == 0) {
            if (UserData.User_Choose[5] == 0) {
                this.img_over.source = "txt_sjz_png";
            }
            else {
                this.img_over.source = "txt_yr_png";
            }
        }
        else if (UserData.User_Choose[4] == 1) {
            if (UserData.User_Choose[5] == 0) {
                this.img_over.source = "txt_yr_png";
            }
            else {
                this.img_over.source = "txt_jz_png";
            }
        }
        else if (UserData.User_Choose[4] == 2) {
            if (UserData.User_Choose[3] == 0) {
                this.img_over.source = "txt_kf_png";
            }
            else {
                this.img_over.source = "txt_wq_png";
            }
        }
    };
    //注销侦听
    SceneOver.prototype.beforeHide = function () {
    };
    //按钮
    SceneOver.prototype.onNextBtn = function (e) {
        //播放声音
        basic.SoundManager.instance.playEffect("sound_btn_mp3");
        //隐藏界面
        this.btn_next.visible = false;
        this.txt_tips.visible = false;
        this.mask_action.hide();
    };
    //结束按钮
    SceneOver.prototype.onOverBtn = function (e) {
        //隐藏按钮
        this.btn_over.visible = false;
        //显示结束界面
        this.g_over.visible = true;
    };
    //分享按钮
    SceneOver.prototype.onShareBtn = function (e) {
        window["shareyang"]();
    };
    //重来按钮
    SceneOver.prototype.onAgainBtn = function (e) {
        //停止声音
        basic.SoundManager.instance.stopMusic();
        //显示加载界面
        basic.SceneManager.show(SceneNames.LOADING);
    };
    return SceneOver;
}(basic.SceneBase));
__reflect(SceneOver.prototype, "SceneOver");
//# sourceMappingURL=SceneOver.js.map