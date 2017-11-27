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
    //皮肤设置
    PanelExit.prototype.init = function () {
        this.skinName = PanelExitSkin;
    };
    //初始化界面
    PanelExit.prototype.createChildren = function () {
        _super.prototype.createChildren.call(this);
        //注册按钮
        this.btn_no.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onNoBtn, this);
        this.btn_yes.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onYesBtn, this);
    };
    //显示界面
    PanelExit.prototype.show = function (callback) {
        if (callback === void 0) { callback = null; }
        //显示界面
        this.popup(this.funExit.bind(this));
        //判断显示界面
        if (UserData.User_Id == GameData.Room_Owner_Id) {
            this.txt_tips.visible = true;
        }
        else {
            this.txt_tips.visible = false;
        }
    };
    //退出函数
    PanelExit.prototype.funExit = function () {
        //退出事件
        this.dealAction();
    };
    //取消按钮
    PanelExit.prototype.onNoBtn = function (e) {
        //播放声音
        basic.SoundManager.instance.playEffect("sound_btn_mp3");
        //退出对话框
        this.funExit();
    };
    //确定按钮
    PanelExit.prototype.onYesBtn = function (e) {
        //播放声音
        basic.SoundManager.instance.playEffect("sound_btn_mp3");
        //发送消息
        Comm.instance.sendSocket({ "type": "closeRoom" });
        //退出对话框
        this.funExit();
    };
    return PanelExit;
}(basic.PanelBase));
__reflect(PanelExit.prototype, "PanelExit");
//# sourceMappingURL=PanelExit.js.map