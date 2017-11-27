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
 * @压住界面
 *
 */
var JSYS_Choose = (function (_super) {
    __extends(JSYS_Choose, _super);
    function JSYS_Choose() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        //定义变量
        _this.btn_choose = [];
        _this.txt_user = [];
        _this.txt_total = [];
        _this.is_not_equal = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
        _this.now_choose = -1;
        _this.timer_Waiting = null;
        _this.timer_action = null;
        return _this;
    }
    //初始化
    JSYS_Choose.prototype.createChildren = function () {
        _super.prototype.createChildren.call(this);
        //数据赋值
        for (var i = 0; i < 12; i++) {
            //定义变量
            var choose = this["btn_choose" + i];
            var user = this["txt_user" + i];
            var total = this["txt_total" + i];
            //数据赋值
            this.txt_user[i] = user;
            this.txt_total[i] = total;
            this.btn_choose[i] = choose;
            //注册按钮
            this.btn_choose[i].addEventListener(egret.TouchEvent.TOUCH_MOVE, this.onChooseBtn, this);
            this.btn_choose[i].addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onChooseBtn, this);
        }
        //注册事件
        basic.Dispatcher.addListener(EventNames.JSYS_USERYAZHU, this.onUserYaZhu, this);
        basic.Dispatcher.addListener(EventNames.JSYS_CHANGEYAZHU, this.onTotalYaZhu, this);
        //注册按钮
        basic.StageProxy.stage.addEventListener(egret.TouchEvent.TOUCH_END, this.onOverBtn, this);
    };
    //初始化界面
    JSYS_Choose.prototype.info = function () {
        //数据赋值
        this.is_not_equal = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
        //判断显示按钮
        if (GameData.JSYS_State == 1) {
            this.showBtn();
        }
        else {
            this.hideBtn();
        }
        //显示文本
        this.showText();
    };
    //清除界面
    JSYS_Choose.prototype.clean = function () {
        //上局押注赋值
        for (var i = 0; i < 12; i++) {
            GameData.JSYS_YaZhu_User_Old[i] = GameData.JSYS_YaZhu_User[i];
        }
        //数据赋值
        GameData.JSYS_YaZhu_UserTotal = 0;
        this.is_not_equal = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
        GameData.JSYS_YaZhu_User = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
        GameData.JSYS_YaZhu_Total = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
        //显示文本
        this.showText();
    };
    //显示按钮
    JSYS_Choose.prototype.showBtn = function () {
        //显示按钮
        if (UserData.User_Id != GameData.Zhuang_Id) {
            for (var i = 0; i < 12; i++) {
                this.btn_choose[i].enabled = true;
                this.btn_choose[i].currentState = "up";
            }
        }
    };
    //隐藏按钮
    JSYS_Choose.prototype.hideBtn = function () {
        //显示按钮
        for (var i = 0; i < 12; i++) {
            this.btn_choose[i].enabled = false;
            this.btn_choose[i].currentState = "disabled";
        }
        //停止等待
        this.overWaiting();
        //上传数据
        if (this.yazhu_gold > 0) {
            //发送消息
            Comm_jsys.instance.sendSocket({ "type": "bet", "pos": this.now_choose, "gold": this.yazhu_gold });
        }
        //数据赋值
        this.yazhu_gold = 0;
    };
    //显示动画
    JSYS_Choose.prototype.showAction = function () {
        //开始闪动
        this.timer_action = new egret.Timer(500, 6);
        this.timer_action.addEventListener(egret.TimerEvent.TIMER, this.onAction, this);
        this.timer_action.addEventListener(egret.TimerEvent.TIMER_COMPLETE, this.onActionComplete, this);
        this.timer_action.start();
    };
    //确定压住
    JSYS_Choose.prototype.checkOverData = function (_data) {
        //显示文本
        GameData.JSYS_YaZhu_UserTotal = 0;
        for (var i = 0; i < 12; i++) {
            //数据赋值
            GameData.JSYS_YaZhu_User[i] = _data.betGolds[i];
            GameData.JSYS_YaZhu_Total[i] = _data.totalBetGolds[i];
            //显示文本
            GameData.JSYS_YaZhu_UserTotal += GameData.JSYS_YaZhu_User[i];
            this.txt_user[i].text = GameData.assGold(2, GameData.JSYS_YaZhu_User[i]);
            this.txt_total[i].text = GameData.assGold(2, GameData.JSYS_YaZhu_Total[i]);
        }
        //发送消息
        basic.Dispatcher.dispatch(EventNames.JSYS_SHOWGOLD, { "gold": UserData.User_Gold - GameData.JSYS_YaZhu_UserTotal });
    };
    //闪动动画
    JSYS_Choose.prototype.onAction = function (e) {
        //判断显示
        if (this.btn_choose[GameData.JSYS_RunOver_Type].currentState == "up") {
            this.btn_choose[GameData.JSYS_RunOver_Type].currentState = "disabled";
        }
        else {
            this.btn_choose[GameData.JSYS_RunOver_Type].currentState = "up";
        }
        if (GameData.JSYS_RunOver_Family != -1) {
            if (this.btn_choose[GameData.JSYS_RunOver_Family].currentState == "up") {
                this.btn_choose[GameData.JSYS_RunOver_Family].currentState = "disabled";
            }
            else {
                this.btn_choose[GameData.JSYS_RunOver_Family].currentState = "up";
            }
        }
    };
    //闪动结束
    JSYS_Choose.prototype.onActionComplete = function (e) {
        //停止等待
        if (this.timer_action) {
            this.timer_action.stop();
            this.timer_action.removeEventListener(egret.TimerEvent.TIMER, this.onAction, this);
            this.timer_action.removeEventListener(egret.TimerEvent.TIMER_COMPLETE, this.onActionComplete, this);
            this.timer_action = null;
        }
    };
    //用户押注
    JSYS_Choose.prototype.onUserYaZhu = function (e) {
        //数据复制
    };
    //总押注
    JSYS_Choose.prototype.onTotalYaZhu = function (e) {
        //判断显示
        if (GameData.JSYS_State == 1) {
            //数据赋值
            for (var i = 0; i < 12; i++) {
                //数据赋值
                if (e.data.betGolds[i] >= GameData.JSYS_YaZhu_User[i]) {
                    GameData.JSYS_YaZhu_User[i] = e.data.betGolds[i];
                }
                else {
                    if (this.now_choose == i) {
                        if (e.data.betGolds[i] + this.yazhu_gold < GameData.JSYS_YaZhu_User[i]) {
                            this.is_not_equal[i] += 1;
                            if (this.is_not_equal[i] == 2) {
                                //数据赋值
                                this.is_not_equal[i] = 0;
                                //发送消息
                                Comm_jsys.instance.sendSocket({
                                    "type": "bet",
                                    "pos": i,
                                    "gold": GameData.JSYS_YaZhu_User[i] - (e.data.betGolds[i] + this.yazhu_gold)
                                });
                            }
                        }
                    }
                    else {
                        if (e.data.betGolds[i] < GameData.JSYS_YaZhu_User[i]) {
                            this.is_not_equal[i] += 1;
                            if (this.is_not_equal[i] == 2) {
                                //数据赋值
                                this.is_not_equal[i] = 0;
                                //发送消息
                                Comm_jsys.instance.sendSocket({
                                    "type": "bet",
                                    "pos": i,
                                    "gold": GameData.JSYS_YaZhu_User[i] - e.data.betGolds[i]
                                });
                            }
                        }
                    }
                }
                if (e.data.totalBetGolds[i] >= GameData.JSYS_YaZhu_Total[i]) {
                    GameData.JSYS_YaZhu_Total[i] = e.data.totalBetGolds[i];
                }
            }
            //显示文本
            this.showText();
        }
        else {
            //数据赋值
            for (var j = 0; j < 12; j++) {
                if (e.data.betGolds[j] < GameData.JSYS_YaZhu_User[j]) {
                    //发送消息
                    Comm_jsys.instance.sendSocket({
                        "type": "bet",
                        "pos": j,
                        "gold": GameData.JSYS_YaZhu_User[j] - e.data.betGolds[j]
                    });
                }
            }
        }
    };
    //显示文本
    JSYS_Choose.prototype.showText = function () {
        //显示文本
        GameData.JSYS_YaZhu_UserTotal = 0;
        for (var i = 0; i < 12; i++) {
            //显示文本
            GameData.JSYS_YaZhu_UserTotal += GameData.JSYS_YaZhu_User[i];
            this.txt_user[i].text = GameData.assGold(2, GameData.JSYS_YaZhu_User[i]);
            this.txt_total[i].text = GameData.assGold(2, GameData.JSYS_YaZhu_Total[i]);
        }
        //发送消息
        basic.Dispatcher.dispatch(EventNames.JSYS_SHOWGOLD, { "gold": UserData.User_Gold - GameData.JSYS_YaZhu_UserTotal });
    };
    //选择按钮
    JSYS_Choose.prototype.onChooseBtn = function (e) {
        //定义变量
        var btnnum = Number(e.target.name);
        //判断显示
        if (GameData.JSYS_State == 1 && UserData.User_Id != GameData.Zhuang_Id) {
            //判断显示
            if (UserData.User_VIP == 15) {
                //显示提示
                basic.Dispatcher.dispatch(EventNames.SHOW_TIPS, { "tips": "VIP15账号不能再游戏中下注" });
            }
            else {
                //判断显示
                if (e.type == egret.TouchEvent.TOUCH_BEGIN) {
                    //按下函数
                    this.showYaZhu(btnnum);
                }
                else if (egret.TouchEvent.TOUCH_MOVE) {
                    //判断显示
                    if (this.now_choose != btnnum) {
                        //上传数据
                        if (this.yazhu_gold > 0) {
                            //发送消息
                            Comm_jsys.instance.sendSocket({ "type": "bet", "pos": this.now_choose, "gold": this.yazhu_gold });
                        }
                        //按下函数
                        this.showYaZhu(btnnum);
                    }
                }
            }
        }
    };
    //显示押注
    JSYS_Choose.prototype.showYaZhu = function (_btnnum) {
        //结束等待函数
        this.overWaiting();
        //数据赋值
        this.yazhu_gold = 0;
        //显示状态
        for (var i = 0; i < 12; i++) {
            this.btn_choose[i].currentState = "up";
        }
        this.btn_choose[_btnnum].currentState = "down";
        this.now_choose = _btnnum;
        //压住函数
        this.yaZhu(500);
    };
    //结束等待函数
    JSYS_Choose.prototype.overWaiting = function () {
        //停止等待
        if (this.timer_Waiting) {
            this.timer_Waiting.stop();
            this.timer_Waiting.removeEventListener(egret.TimerEvent.TIMER_COMPLETE, this.onWaitingComplete, this);
            this.timer_Waiting = null;
        }
    };
    //等待结束事件
    JSYS_Choose.prototype.onWaitingComplete = function (e) {
        //结束等待函数
        this.overWaiting();
        //压住函数
        this.yaZhu(70);
    };
    //压住函数
    JSYS_Choose.prototype.yaZhu = function (_wait_time) {
        //播放声音
        if (this.now_choose > 1 && this.now_choose < 10) {
            basic.SoundManager.instance.playEffect("sound_jsys_btn" + this.now_choose.toString() + "_mp3");
        }
        else {
            if (this.now_choose == 10) {
                basic.SoundManager.instance.playEffect("sound_jsys_btn2_mp3");
            }
            else if (this.now_choose == 1) {
                basic.SoundManager.instance.playEffect("sound_jsys_btn3_mp3");
            }
            else if (this.now_choose == 0) {
                basic.SoundManager.instance.playEffect("sound_jsys_btn4_mp3");
            }
            else if (this.now_choose == 11) {
                basic.SoundManager.instance.playEffect("sound_jsys_btn5_mp3");
            }
        }
        //判断显示
        if (GameData.JSYS_State == 1 && UserData.User_Id != GameData.Zhuang_Id) {
            if (UserData.User_Gold - GameData.JSYS_YaZhu_UserTotal - GameData.Game_BeiLv >= 0) {
                //数据赋值
                this.yazhu_gold += GameData.Game_BeiLv;
                GameData.JSYS_YaZhu_User[this.now_choose] += GameData.Game_BeiLv;
                GameData.JSYS_YaZhu_Total[this.now_choose] += GameData.Game_BeiLv;
                //显示文本
                this.showText();
                //开始等待
                this.timer_Waiting = new egret.Timer(_wait_time, 1);
                this.timer_Waiting.addEventListener(egret.TimerEvent.TIMER_COMPLETE, this.onWaitingComplete, this);
                this.timer_Waiting.start();
            }
            else {
                //显示提示
                basic.Dispatcher.dispatch(EventNames.SHOW_TIPS, { "tips": "金币不足！" });
            }
        }
    };
    //选择结束
    JSYS_Choose.prototype.onOverBtn = function (e) {
        //显示状态
        if (GameData.JSYS_State == 1) {
            for (var i = 0; i < 12; i++) {
                this.btn_choose[i].currentState = "up";
            }
        }
        //停止等待
        this.overWaiting();
        //上传数据
        if (this.yazhu_gold > 0) {
            //发送消息
            Comm_jsys.instance.sendSocket({ "type": "bet", "pos": this.now_choose, "gold": this.yazhu_gold });
        }
        //数据赋值
        this.yazhu_gold = 0;
    };
    return JSYS_Choose;
}(eui.Component));
__reflect(JSYS_Choose.prototype, "JSYS_Choose");
