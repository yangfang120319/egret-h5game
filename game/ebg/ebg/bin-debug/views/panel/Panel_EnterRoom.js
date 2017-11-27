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
 * @进入房间
 *
 */
var Panel_EnterRoom = (function (_super) {
    __extends(Panel_EnterRoom, _super);
    //定义界面
    function Panel_EnterRoom() {
        var _this = _super.call(this, basic.dialogEffect.Scale, {
            withFade: true,
            ease: egret.Ease.backOut
        }, basic.dialogEffect.Scale, { withFade: true, ease: egret.Ease.backIn }) || this;
        _this.btn_number = [];
        _this.txt_number = [];
        return _this;
    }
    Object.defineProperty(Panel_EnterRoom, "instance", {
        get: function () {
            if (this._instance == undefined) {
                this._instance = new Panel_EnterRoom();
            }
            return this._instance;
        },
        enumerable: true,
        configurable: true
    });
    //皮肤设置
    Panel_EnterRoom.prototype.init = function () {
        this.skinName = Panel_EnterRoomSkin;
    };
    //初始化界面
    Panel_EnterRoom.prototype.createChildren = function () {
        _super.prototype.createChildren.call(this);
        //注册按钮
        this.btn_close.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onCloseBtn, this);
        this.btn_again.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onAgainBtn, this);
        this.btn_delete.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onDeleteBtn, this);
        this.btn_createroom.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onCreateRoom, this);
    };
    //显示界面
    Panel_EnterRoom.prototype.show = function (_type, callback) {
        if (callback === void 0) { callback = null; }
        //数据赋值
        this.game_type = _type;
        this._callback = callback;
        //数据赋值
        this.now_entrt_number = 0;
        for (var i = 0; i < 6; i++) {
            //定义变量
            var txt = this["txt_number" + i];
            //数据赋值
            this.txt_number[i] = txt;
            this.txt_number[i].text = "";
        }
        for (var j = 0; j < 10; j++) {
            //定义变量
            var btn = this["btn_number" + j];
            //数据赋值
            this.btn_number[j] = btn;
            //注册按钮
            this.btn_number[j].addEventListener(egret.TouchEvent.TOUCH_TAP, this.onNumberBtn, this);
        }
        //显示界面
        this.popup(this.funExit.bind(this));
    };
    //退出函数
    Panel_EnterRoom.prototype.funExit = function () {
        //注销按钮
        for (var j = 0; j < 10; j++) {
            ///注销按钮
            this.btn_number[j].removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onNumberBtn, this);
        }
        //退出事件
        this.dealAction();
    };
    //退出按钮
    Panel_EnterRoom.prototype.onCloseBtn = function (e) {
        //播放声音
        basic.SoundManager.instance.playEffect("sound_btn_mp3");
        //退出设置
        this.funExit();
    };
    //重输按钮
    Panel_EnterRoom.prototype.onAgainBtn = function (e) {
        //播放声音
        basic.SoundManager.instance.playEffect("sound_btn_mp3");
        //数据赋值
        this.now_entrt_number = 0;
        for (var i = 0; i < 6; i++) {
            //显示文本
            this.txt_number[i].text = "";
        }
    };
    //删除按钮
    Panel_EnterRoom.prototype.onDeleteBtn = function (e) {
        //播放声音
        basic.SoundManager.instance.playEffect("sound_btn_mp3");
        //判断显示
        if (this.now_entrt_number > 0) {
            //显示文本
            this.txt_number[this.now_entrt_number - 1].text = "";
            //数据赋值
            this.now_entrt_number -= 1;
        }
    };
    //数字按钮
    Panel_EnterRoom.prototype.onNumberBtn = function (e) {
        //定义变量
        var btnnum = Number(e.target.name);
        //显示文本
        this.txt_number[this.now_entrt_number].text = String(btnnum);
        //数据赋值
        this.now_entrt_number += 1;
        //判断显示
        if (this.now_entrt_number == 6) {
            //退出设置
            this.funExit();
            //数据赋值
            GameData.Game_Room_Id = "";
            for (var i = 0; i < 6; i++) {
                GameData.Game_Room_Id += this.txt_number[i].text;
            }
            //初始化游戏
            if (this.game_type == 0) {
                //Comm_ebg.instance.sendSocket({ "type": "joinRoom","roomId": GameData.Game_Room_Id });
            }
            else if (this.game_type == 1) {
                //Comm_nn.instance.sendSocket({ "type": "joinRoom","roomId": GameData.Game_Room_Id });
            }
            else if (this.game_type == 2) {
                //Comm_sg.instance.sendSocket({ "type": "joinRoom","roomId": GameData.Game_Room_Id });
            }
        }
        //播放声音
        basic.SoundManager.instance.playEffect("sound_btn_mp3");
    };
    //创建房间按钮
    Panel_EnterRoom.prototype.onCreateRoom = function (e) {
        //播放声音
        basic.SoundManager.instance.playEffect("sound_btn_mp3");
        //退出设置
        this.funExit();
        //初始化游戏
        if (this.game_type == 0) {
            //Comm_ebg.instance.sendSocket({ "type": "openRoom","roomType": "zuozhuang","roomGold": 0 });
        }
        else if (this.game_type == 1) {
            //Comm_nn.instance.sendSocket({ "type": "openRoom","roomType": "zuozhuang","roomGold": 0 });
        }
        else if (this.game_type == 2) {
            //Comm_sg.instance.sendSocket({ "type": "openRoom","roomType": "zuozhuang","roomGold": 0 });
        }
        //        //显示界面
        //        egret.setTimeout(()=>{
        //            //显示创建房间
        //            Panel_CreateRoom.instance.show(this.game_type);
        //        },this,200);
    };
    return Panel_EnterRoom;
}(basic.PanelBase));
__reflect(Panel_EnterRoom.prototype, "Panel_EnterRoom");
//# sourceMappingURL=Panel_EnterRoom.js.map