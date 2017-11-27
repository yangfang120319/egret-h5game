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
 * @房间
 *
 */
var PanelRoom = (function (_super) {
    __extends(PanelRoom, _super);
    //定义界面
    function PanelRoom() {
        return _super.call(this, basic.dialogEffect.Scale, {
            withFade: true,
            ease: egret.Ease.backOut
        }, basic.dialogEffect.Scale, { withFade: true, ease: egret.Ease.backIn }) || this;
    }
    Object.defineProperty(PanelRoom, "instance", {
        get: function () {
            if (this._instance == undefined) {
                this._instance = new PanelRoom();
            }
            return this._instance;
        },
        enumerable: true,
        configurable: true
    });
    //皮肤设置
    PanelRoom.prototype.init = function () {
        this.skinName = PanelRoomSkin;
    };
    //初始化界面
    PanelRoom.prototype.createChildren = function () {
        _super.prototype.createChildren.call(this);
        //关闭按钮
        this.btn_close.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onCloseBtn, this);
    };
    //显示界面
    PanelRoom.prototype.show = function (_url, _type, callback) {
        if (callback === void 0) { callback = null; }
        //显示界面
        this.popup(this.funExit.bind(this));
        //显示二维码
        this.sp_qrcode = qr.QRCode.create(_url, 250, 250);
        this.addChild(this.sp_qrcode);
        this.sp_qrcode.scaleX = 1.1;
        this.sp_qrcode.scaleY = 1.1;
        this.sp_qrcode.x = 185;
        this.sp_qrcode.y = 85;
        //判断显示
        if (_type == 0) {
            this.img_tips.visible = true;
            this.img_title.visible = false;
            this.img_title.source = "txt_g_fj_png";
        }
        else {
            this.img_tips.visible = false;
            this.img_title.visible = true;
            this.img_title.source = "txt_s_fz_png";
        }
    };
    //退出函数
    PanelRoom.prototype.funExit = function () {
        //退出事件
        this.dealAction();
        //移除二维码
        this.removeChild(this.sp_qrcode);
    };
    //关闭按钮
    PanelRoom.prototype.onCloseBtn = function (e) {
        //播放声音
        basic.SoundManager.instance.playEffect("sound_btn_mp3");
        //退出函数
        this.funExit();
    };
    return PanelRoom;
}(basic.PanelBase));
__reflect(PanelRoom.prototype, "PanelRoom");
//# sourceMappingURL=PanelRoom.js.map