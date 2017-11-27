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
 * @过分游戏
 *
 */
var SceneGuoFen = (function (_super) {
    __extends(SceneGuoFen, _super);
    //定义界面
    function SceneGuoFen() {
        var _this = _super.call(this) || this;
        _this.com_choose = [];
        _this._timer_action = null;
        _this.btn_num = [];
        _this.now_exchangegold = 0;
        //定义界面
        _this.skinName = SceneGuoFenSkin;
        //数据赋值
        for (var i = 0; i < 10; i++) {
            //定义变量
            var btn = _this["btn_num" + i];
            //数据赋值
            _this.btn_num[i] = btn;
            //注册按钮
            _this.btn_num[i].addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onNumBtn, _this);
        }
        //数据赋值
        for (var j = 0; j < 3; j++) {
            //定义变量
            var com = _this["com_choose" + j];
            //数据赋值
            _this.com_choose[j] = com;
        }
        //注册事件
        basic.Dispatcher.addListener(EventNames.GF_GAMEINFO, _this.onGameInfo, _this);
        basic.Dispatcher.addListener(EventNames.GF_GAMEOVER, _this.onGameOver, _this);
        basic.Dispatcher.addListener(EventNames.GF_LEAVEROOM, _this.onGameleaveroom, _this);
        //注册按钮
        _this.btn_yes.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onYesBtn, _this);
        _this.btn_exit.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onExitBtn, _this);
        _this.btn_again.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onAgainBtn, _this);
        _this.btn_delete.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onDeleteBtn, _this);
        _this.com_choose[0].addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onChooseBtn0, _this);
        _this.com_choose[1].addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onChooseBtn1, _this);
        _this.com_choose[2].addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onChooseBtn2, _this);
        return _this;
    }
    //显示前调用
    SceneGuoFen.prototype.beforeShow = function () {
        //开始显示界面
        this.txt_exchangegold.text = "0";
        this.head.show(UserData.User_Head);
        this.txt_exchangegold_over.text = "0";
        this.txt_name.text = UserData.User_Name;
        this.txt_roomid.text = GameData.GF_RoomId;
        this.txt_gold.text = UserData.User_Gold.toString();
        this.img_vip.source = "txt_s_vip" + UserData.User_VIP.toString() + "_png";
        //发送消息
        Comm.instance.sendSocket({ "type": "infoRoom", "roomId": GameData.GF_RoomId });
    };
    //开始动画
    SceneGuoFen.prototype.startAction = function () {
        //开始动画
        this._timer_action = new egret.Timer(200);
        this._timer_action.addEventListener(egret.TimerEvent.TIMER, this.onAction, this);
        this._timer_action.start();
    };
    //动画中
    SceneGuoFen.prototype.onAction = function (e) {
        //定义变量
        var now = Number(this.com_other_choose.currentState);
        //数据赋值
        now += 1;
        if (now > 2) {
            now = 0;
        }
        //显示状态
        this.com_other_choose.currentState = now.toString();
    };
    //停止动画
    SceneGuoFen.prototype.stopAction = function () {
        if (this._timer_action) {
            this._timer_action.stop();
            this._timer_action.removeEventListener(egret.TimerEvent.TIMER, this.onAction, this);
            this._timer_action = null;
        }
    };
    //游戏初始化
    SceneGuoFen.prototype.onGameInfo = function (e) {
        //定义变量
        var is_showother = false;
        this.room_homeid = e.data.dealerUserId;
        //停止动画
        this.stopAction();
        //显示用户金币
        this.txt_gold.text = UserData.User_Gold.toString();
        //判断显示
        if (e.data.exchangegold == 0) {
            this.now_choose_user = -1;
            this.now_choose_other = -1;
            if (e.data.dealerUserId == UserData.User_Id) {
                //显示界面
                this.g_set.visible = true;
                this.g_over.visible = false;
                this.g_user_choose.visible = false;
                this.com_other_choose.visible = false;
            }
            else {
                //显示界面
                this.g_set.visible = false;
                this.g_over.visible = true;
                this.g_user_choose.visible = false;
                this.com_other_choose.visible = false;
            }
            //显示文本
            this.txt_exchangegold_over.text = "0";
        }
        else {
            //显示界面
            this.g_set.visible = false;
            this.g_over.visible = true;
            this.g_user_choose.visible = false;
            this.com_other_choose.visible = false;
            //数据赋值
            this.now_exchangegold = e.data.exchangegold;
            //显示文本
            this.txt_exchangegold_over.text = Math.floor(this.now_exchangegold / 100000000).toString() + "亿";
            //判断开始动画
            if (e.data.player.length == 2) {
                //显示界面
                this.g_user_choose.visible = true;
                this.com_other_choose.visible = true;
                //判断显示界面
                for (var j = 0; j < 2; j++) {
                    if (UserData.User_Id == e.data.player[j].userId) {
                        this.now_choose_user = e.data.player[j].choose;
                    }
                    else {
                        this.now_choose_other = e.data.player[j].choose;
                    }
                }
                //显示界面
                if (this.now_choose_user == -1) {
                    //判断显示
                    if (e.data.dealerUserId == UserData.User_Id) {
                        this.com_choose[0].visible = true;
                        this.com_choose[1].visible = false;
                        this.com_choose[2].visible = true;
                    }
                    else {
                        this.com_choose[0].visible = false;
                        this.com_choose[1].visible = true;
                        this.com_choose[2].visible = false;
                        //发送消息
                        Comm.instance.sendSocket({ "type": "bet", "choose": 1 });
                    }
                    this.com_choose[0].currentState = "0";
                    this.com_choose[1].currentState = "1";
                    this.com_choose[2].currentState = "2";
                    //开始动画
                    this.startAction();
                }
                else {
                    this.com_choose[0].visible = false;
                    this.com_choose[1].visible = true;
                    this.com_choose[2].visible = false;
                    this.com_choose[1].currentState = this.now_choose_user.toString();
                    if (this.now_choose_other == -1) {
                        //开始动画
                        this.startAction();
                    }
                    else {
                        this.com_other_choose.currentState = this.now_choose_other.toString();
                    }
                }
            }
        }
        //显示其他用户信息
        if (e.data.player.length == 2) {
            //数据赋值
            for (var i = 0; i < 2; i++) {
                //判断显示
                if (UserData.User_Id != e.data.player[i].userId) {
                    is_showother = true;
                    this.head_other.show(e.data.player[i].headImgURL);
                    this.txt_name_other.text = e.data.player[i].nickName;
                    this.txt_gold_other.text = e.data.player[i].gold.toString();
                    this.img_vip_other.source = "txt_s_vip" + e.data.player[i].vipLevel.toString() + "_png";
                    break;
                }
            }
        }
        //判断清除界面
        if (is_showother == false) {
            this.head_other.show("");
            this.txt_name_other.text = "";
            this.txt_gold_other.text = "";
            this.img_vip_other.source = "";
        }
    };
    //判断显示
    SceneGuoFen.prototype.onGameOver = function (e) {
        var _this = this;
        //判断显示
        if (e.data.win == true) {
            //发送消息
            basic.Dispatcher.dispatch(EventNames.SHOW_TIPS, { "tips": "本局胜利，赢得" + Number(e.data.winGold).toString() + "金币" });
        }
        else {
            //发送消息
            basic.Dispatcher.dispatch(EventNames.SHOW_TIPS, { "tips": "本局失败，输掉" + Number(-e.data.winGold).toString() + "金币" });
        }
        //数据赋值
        UserData.User_Gold = e.data.gold;
        //发送消息
        basic.Dispatcher.dispatch(EventNames.GOLD_CHANGE);
        //数据清空
        this.now_exchangegold = 0;
        this.txt_exchangegold.text = "0";
        this.txt_exchangegold_over.text = "0";
        //判断发送消息
        egret.setTimeout(function () {
            if (_this.room_homeid == UserData.User_Id) {
                //发送消息
                Comm.instance.sendSocket({ "type": "infoRoom", "roomId": GameData.GF_RoomId });
            }
        }, this, 3000);
    };
    //确定按钮
    SceneGuoFen.prototype.onYesBtn = function (e) {
        //判断发送消息
        if (this.now_exchangegold > 0) {
            //发送消息
            Comm.instance.sendSocket({ "gold": this.now_exchangegold, "type": "setexchangegold" });
        }
    };
    //判断选择按钮
    SceneGuoFen.prototype.onChooseBtn0 = function (e) {
        //判断显示
        if (this.now_choose_user == -1) {
            //发送消息
            Comm.instance.sendSocket({ "type": "bet", "choose": 0 });
        }
    };
    SceneGuoFen.prototype.onChooseBtn1 = function (e) {
        //判断显示
        if (this.now_choose_user == -1) {
            //发送消息
            Comm.instance.sendSocket({ "type": "bet", "choose": 1 });
        }
    };
    SceneGuoFen.prototype.onChooseBtn2 = function (e) {
        //判断显示
        if (this.now_choose_user == -1) {
            //发送消息
            Comm.instance.sendSocket({ "type": "bet", "choose": 2 });
        }
    };
    //数字按钮
    SceneGuoFen.prototype.onNumBtn = function (e) {
        //定义变量
        var btnnum = Number(e.target.name);
        //数据赋值
        this.now_exchangegold = Number(Math.floor(this.now_exchangegold / 100000000).toString() + btnnum.toString()) * 100000000;
        //显示文本
        this.txt_exchangegold.text = Math.floor(this.now_exchangegold / 100000000).toString() + "亿";
    };
    //重输按钮
    SceneGuoFen.prototype.onAgainBtn = function (e) {
        //清空文本
        this.now_exchangegold = 0;
        this.txt_exchangegold.text = "0";
    };
    //删除按钮
    SceneGuoFen.prototype.onDeleteBtn = function (e) {
        //删除文本
        if (this.now_exchangegold.toString().length >= 9) {
            this.now_exchangegold = Number(this.now_exchangegold.toString().substring(0, this.now_exchangegold.toString().length - 9)) * 100000000;
        }
        //显示文本
        if (this.now_exchangegold > 0) {
            this.txt_exchangegold.text = Math.floor(this.now_exchangegold / 100000000).toString() + "亿";
        }
        else {
            this.txt_exchangegold.text = "0";
        }
    };
    //退出界面
    SceneGuoFen.prototype.onExitBtn = function (e) {
        //退出界面
        basic.SceneManager.removeTopScene(SceneNames.GUOFEN);
        //发送消息
        Comm.instance.sendSocket({ "type": "leaveRoom" });
    };
    //离开房间
    SceneGuoFen.prototype.onGameleaveroom = function (e) {
        //退出界面
        basic.SceneManager.removeTopScene(SceneNames.GUOFEN);
    };
    return SceneGuoFen;
}(basic.SceneBase));
__reflect(SceneGuoFen.prototype, "SceneGuoFen");
