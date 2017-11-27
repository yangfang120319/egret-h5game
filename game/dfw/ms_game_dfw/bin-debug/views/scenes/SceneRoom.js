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
 * @房间界面
 *
 */
var SceneRoom = (function (_super) {
    __extends(SceneRoom, _super);
    //定义界面
    function SceneRoom() {
        var _this = _super.call(this) || this;
        _this.head = [];
        //定义界面
        _this.skinName = SceneRoomSkin;
        //数据赋值
        for (var i = 0; i < 8; i++) {
            //定义变量
            var now_head = _this["head" + i];
            //数据赋值
            _this.head[i] = now_head;
        }
        //注册事件
        basic.Dispatcher.addListener(EventNames.GAME_START, _this.onGameStart, _this);
        basic.Dispatcher.addListener(EventNames.CHANGE_STATUS, _this.onChangeStatus, _this);
        basic.Dispatcher.addListener(EventNames.SHOW_PLAYERLIST, _this.onShowPlayerList, _this);
        //注册按钮
        _this.btn_start.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onStartBtn, _this);
        _this.btn_invitaion.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onInvitaionBtn, _this);
        return _this;
    }
    //显示前调用
    SceneRoom.prototype.beforeShow = function (params) {
        //显示基本信息
        this.user.show();
        //开始消息
        this.chat.start();
        //隐藏按钮
        this.txt_tips.visible = false;
        this.btn_start.visible = false;
        //显示二维码
        this.sp_qrcode = qr.QRCode.create(GameData.Room_Url, 250, 250);
        this.g_detail.addChild(this.sp_qrcode);
        this.sp_qrcode.x = this.img_dqcode.x + 5;
        this.sp_qrcode.y = this.img_dqcode.y + 5;
    };
    //隐藏前调用
    SceneRoom.prototype.beforeHide = function () {
        //停止消息
        this.chat.stop();
        //隐藏按钮
        this.txt_tips.visible = false;
        this.btn_start.visible = false;
        //移除二维码
        this.g_detail.removeChild(this.sp_qrcode);
    };
    //定义适配
    SceneRoom.prototype.onShowPlace = function () {
    };
    //-----------------------定义事件--------------------
    //游戏开始
    SceneRoom.prototype.onGameStart = function (e) {
        //显示游戏
        basic.SceneManager.show(SceneNames.GAME);
    };
    //改变状态
    SceneRoom.prototype.onChangeStatus = function (e) {
        //判断显示界面
        for (var i = 0; i < e.data.data.length; i++) {
            this.head[i].showStatus(e.data.data[i].status);
        }
    };
    //显示用户列表
    SceneRoom.prototype.onShowPlayerList = function (e) {
        //显示头像
        for (var i = 0; i < 8; i++) {
            if (i < e.data.data.length) {
                //显示头像和头像
                if (e.data.data[i].sex >= 0) {
                    this.head[i].showSex(e.data.data[i].sex);
                }
                this.head[i].show(e.data.data[i].headImgURL);
                this.head[i].showStatus(e.data.data[i].isleave);
                this.head[i].showName(e.data.data[i].nickName);
                //判断赋值
                if (e.data.data[i].playerId == e.data.ownerId) {
                    this.owner_id = e.data.data[i].playerId;
                    this.owner_name = e.data.data[i].nickName;
                }
                //判断赋值
                if (Number(e.data.data[i].playerId) == UserData.User_Id) {
                    UserData.User_Sex = e.data.data[i].sex;
                }
            }
            else {
                this.head[i].hide();
            }
        }
        this.player_num = e.data.data.length;
        GameData.Room_Owner_Id = Number(e.data.ownerId);
        //判断显示按钮
        if (UserData.User_Id == this.owner_id) {
            this.btn_start.visible = true;
        }
        else {
            this.txt_tips.visible = true;
        }
        //显示选择新别
        if (UserData.User_Sex == -1) {
            egret.setTimeout(function () {
                if (UserData.User_Sex == -1) {
                    PanelChooseSex.instance.show();
                }
            }, this, 400);
        }
        //隐藏房间名称
        this.txt_roomname.text = this.owner_name + "的天仙配局";
        this.txt_roomname_back.text = this.owner_name + "的天仙配局";
    };
    //-----------------------定义按钮--------------------
    //开始按钮
    SceneRoom.prototype.onStartBtn = function (e) {
        //播放声音
        basic.SoundManager.instance.playEffect("sound_btn_mp3");
        //判断显示
        if (this.player_num < 2) {
            //显示提示
            basic.Dispatcher.dispatch(EventNames.SHOW_TIPS, { "msg": "人数小于2个，不能开始游戏！" });
        }
        else {
            //发送消息
            Comm.instance.sendSocket({ "type": "startGame" });
        }
    };
    //邀请按钮
    SceneRoom.prototype.onInvitaionBtn = function (e) {
        //播放声音
        basic.SoundManager.instance.playEffect("sound_btn_mp3");
    };
    return SceneRoom;
}(basic.SceneBase));
__reflect(SceneRoom.prototype, "SceneRoom");
//# sourceMappingURL=SceneRoom.js.map