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
 * @创建房间
 *
 */
var PanelCreateRoom = (function (_super) {
    __extends(PanelCreateRoom, _super);
    //定义界面
    function PanelCreateRoom() {
        var _this = _super.call(this) || this;
        _this.btn_num = [];
        _this.room_id = "";
        return _this;
    }
    Object.defineProperty(PanelCreateRoom, "instance", {
        get: function () {
            if (this._instance == undefined) {
                this._instance = new PanelCreateRoom();
            }
            return this._instance;
        },
        enumerable: true,
        configurable: true
    });
    //初始化
    PanelCreateRoom.prototype.createChildren = function () {
        _super.prototype.createChildren.call(this);
        //定义界面
        this.skinName = PanelCreateRoomSkin;
        //数据赋值
        for (var i = 0; i < 10; i++) {
            //定义变量
            var btn = this["btn_num" + i];
            //数据赋值
            this.btn_num[i] = btn;
            //注册按钮
            this.btn_num[i].addEventListener(egret.TouchEvent.TOUCH_TAP, this.onNumBtn, this);
        }
        //注册事件
        basic.Dispatcher.addListener(EventNames.GF_JOINROOM, this.onJoinRoom, this);
        //注册按钮
        this.btn_again.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onAgainBtn, this);
        this.btn_create.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onCreateBtn, this);
        this.btn_delete.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onDeleteBtn, this);
    };
    //显示界面
    PanelCreateRoom.prototype.show = function (callback) {
        if (callback === void 0) { callback = null; }
        //显示背景
        basic.PopUpManager.modalMaskAlpha = 0;
        //显示界面
        this.popup(this.funExit.bind(this));
        //显示文本
        this.room_id = "";
        this.txt_roomid.text = "";
    };
    //加入房间
    PanelCreateRoom.prototype.onJoinRoom = function (e) {
        //退出对话框
        this.funExit();
        //数据赋值
        GameData.GF_RoomId = e.data.roomId;
        //显示界面
        basic.SceneManager.addTopScene(SceneNames.GUOFEN);
    };
    //退出对话框
    PanelCreateRoom.prototype.funExit = function () {
        //显示背景
        basic.PopUpManager.modalMaskAlpha = 0.6;
        //退出界面
        this.dealAction();
        //播放声音
        basic.SoundManager.instance.playEffect("sound_btn_mp3");
    };
    //数字按钮
    PanelCreateRoom.prototype.onNumBtn = function (e) {
        //定义变量
        var btnnum = Number(e.target.name);
        //数据赋值
        this.room_id = this.room_id + btnnum.toString();
        //显示文本
        this.txt_roomid.text = this.room_id;
        //判断进入房间
        if (this.room_id.length == 6) {
            //发送消息
            Comm.instance.sendSocket({ "type": "joinRoom", "roomId": this.room_id });
            //清空文本
            this.room_id = "";
            this.txt_roomid.text = "";
        }
    };
    //重输按钮
    PanelCreateRoom.prototype.onAgainBtn = function (e) {
        //清空文本
        this.room_id = "";
        this.txt_roomid.text = "";
    };
    //删除按钮
    PanelCreateRoom.prototype.onDeleteBtn = function (e) {
        //删除文本
        if (this.room_id.length > 0) {
            this.room_id = this.room_id.substring(0, this.room_id.length - 1);
        }
        //显示文本
        this.txt_roomid.text = this.room_id;
    };
    //创建按钮
    PanelCreateRoom.prototype.onCreateBtn = function (e) {
        //发送消息
        Comm.instance.sendSocket({ "type": "openRoom" });
    };
    return PanelCreateRoom;
}(basic.PanelBase));
__reflect(PanelCreateRoom.prototype, "PanelCreateRoom");
