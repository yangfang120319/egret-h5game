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
 * @输入昵称
 *
 */
var PanelNickName = (function (_super) {
    __extends(PanelNickName, _super);
    //定义界面
    function PanelNickName() {
        return _super.call(this, basic.dialogEffect.Scale, {
            withFade: true,
            ease: egret.Ease.backOut
        }, basic.dialogEffect.Scale, { withFade: true, ease: egret.Ease.backIn }) || this;
    }
    Object.defineProperty(PanelNickName, "instance", {
        get: function () {
            if (this._instance == undefined) {
                this._instance = new PanelNickName();
            }
            return this._instance;
        },
        enumerable: true,
        configurable: true
    });
    //皮肤设置
    PanelNickName.prototype.init = function () {
        this.skinName = PanelNickNameSkin;
    };
    //初始化界面
    PanelNickName.prototype.createChildren = function () {
        _super.prototype.createChildren.call(this);
        //注册按钮
        this.btn_yes.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onYesBtn, this);
        this.txt_nickname.addEventListener(egret.FocusEvent.FOCUS_IN, this.onNickNameText, this);
        this.txt_nickname.addEventListener(egret.FocusEvent.FOCUS_OUT, this.onNickNameText, this);
    };
    //显示界面
    PanelNickName.prototype.show = function (callback) {
        if (callback === void 0) { callback = null; }
        //数据赋值
        this._callback = callback;
        //显示界面
        this.popup();
        //显示文本
        this.txt_tips.text = "";
        this.txt_nickname.text = "";
        this.rect_mask.visible = false;
    };
    //昵称文本
    PanelNickName.prototype.onNickNameText = function (e) {
        //判断显示
        if (e.type == egret.FocusEvent.FOCUS_IN) {
            this.rect_mask.visible = true;
        }
        else if (e.type == egret.FocusEvent.FOCUS_OUT) {
            //判断显示
            if (this.txt_nickname.text == "") {
                this.rect_mask.visible = false;
            }
        }
    };
    //确定按钮
    PanelNickName.prototype.onYesBtn = function (e) {
        //播放声音
        basic.SoundManager.instance.playEffect("sound_btn_mp3");
        //判断显示
        if (this.txt_nickname.text == "") {
            //显示提示
            this.txt_tips.text = "昵称不能为空";
        }
        else if (String(this.txt_nickname.text).length > 5) {
            //显示提示
            this.txt_tips.text = "昵称最多5个字";
        }
        else {
            //数据赋值
            UserData.User_Name = this.txt_nickname.text;
            //退出界面
            this.dealAction();
        }
    };
    return PanelNickName;
}(basic.PanelBase));
__reflect(PanelNickName.prototype, "PanelNickName");
//# sourceMappingURL=PanelNickName.js.map