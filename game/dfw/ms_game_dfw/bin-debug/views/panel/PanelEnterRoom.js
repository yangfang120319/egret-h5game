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
 * @选择进入房间
 *
 */
var PanelEnterRoom = (function (_super) {
    __extends(PanelEnterRoom, _super);
    //定义界面
    function PanelEnterRoom() {
        return _super.call(this, basic.dialogEffect.Scale, {
            withFade: true,
            ease: egret.Ease.backOut
        }, basic.dialogEffect.Scale, { withFade: true, ease: egret.Ease.backIn }) || this;
    }
    Object.defineProperty(PanelEnterRoom, "instance", {
        get: function () {
            if (this._instance == undefined) {
                this._instance = new PanelEnterRoom();
            }
            return this._instance;
        },
        enumerable: true,
        configurable: true
    });
    //皮肤设置
    PanelEnterRoom.prototype.init = function () {
        this.skinName = PanelEnterRoomSkin;
    };
    //初始化界面
    PanelEnterRoom.prototype.createChildren = function () {
        _super.prototype.createChildren.call(this);
        //注册按钮
        this.btn_no.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onNoBtn, this);
        this.btn_yes.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onYesBtn, this);
    };
    //显示界面
    PanelEnterRoom.prototype.show = function (_room_id, callback) {
        if (callback === void 0) { callback = null; }
        //数据赋值
        this.room_id = _room_id;
        //显示界面
        this.popup(this.funExit.bind(this));
    };
    //退出函数
    PanelEnterRoom.prototype.funExit = function () {
        //退出事件
        this.dealAction();
    };
    //取消按钮
    PanelEnterRoom.prototype.onNoBtn = function (e) {
        //播放声音
        basic.SoundManager.instance.playEffect("sound_btn_mp3");
        //退出对话框
        this.funExit();
    };
    //确定按钮
    PanelEnterRoom.prototype.onYesBtn = function (e) {
        //播放声音
        basic.SoundManager.instance.playEffect("sound_btn_mp3");
        //定义变量
        var params = basic.Utils.getUrlParams();
        //判断加入房间
        Comm.instance.sendSocket({
            "type": "login",
            "token": params.token,
            "roomId": this.room_id
        });
        //退出对话框
        this.funExit();
    };
    return PanelEnterRoom;
}(basic.PanelBase));
__reflect(PanelEnterRoom.prototype, "PanelEnterRoom");
//# sourceMappingURL=PanelEnterRoom.js.map