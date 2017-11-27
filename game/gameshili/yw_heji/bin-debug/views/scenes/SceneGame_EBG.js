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
 * @二八杠
 *
 */
var SceneGame_EBG = (function (_super) {
    __extends(SceneGame_EBG, _super);
    //定义界面
    function SceneGame_EBG() {
        var _this = _super.call(this) || this;
        _this.timer_goldflay = null;
        //定义界面
        _this.skinName = SceneGame_EBGSkin;
        //注册事件
        basic.Dispatcher.addListener(EventNames.EBG_SHOWGOLD, _this.onShowGold, _this);
        basic.Dispatcher.addListener(EventNames.EBG_GAMEOPEN, _this.onGameOpen, _this);
        basic.Dispatcher.addListener(EventNames.EBG_GAMEINFO, _this.onGameInfo, _this);
        basic.Dispatcher.addListener(EventNames.EBG_GAMERESULT, _this.onGameResult, _this);
        basic.Dispatcher.addListener(EventNames.EBG_CHANGEZHUANG, _this.onChangeZhuang, _this);
        basic.Dispatcher.addListener(EventNames.EBG_ZHUANGLIST, _this.onGetZhuangList, _this);
        basic.Dispatcher.addListener(EventNames.EBG_CHANGEZHUANG, _this.onChangeZhuang, _this);
        basic.Dispatcher.addListener(EventNames.EBG_CHANGESTATUS, _this.onChangeStatus, _this);
        return _this;
    }
    //显示前调用
    SceneGame_EBG.prototype.beforeShow = function () {
        //初始化界面
        this.over.hide();
        this.ebg_down.info();
        //数据赋值
        GameData.Game_Type = 1;
        //播放背景音乐
        basic.SoundManager.instance.playMusic("back_ebg_mp3");
        //初始化游戏
        Comm_ebg.instance.sendSocket({ "type": "joinRoom", "roomId": 0 });
    };
    //隐藏前调用
    SceneGame_EBG.prototype.beforeHide = function () {
        //清除界面
        this.clean();
        //停止声音
        basic.SoundManager.instance.stopMusic();
        //发送消息
        Comm_ebg.instance.sendSocket({ "type": "exitGame" });
    };
    //清除界面
    SceneGame_EBG.prototype.clean = function () {
        //时间停止
        this.clock.stop();
        //清楚桌子
        this.ebg_table.clean();
        //清除界面
        this.ebg_chat.clean();
        //隐藏结算
        this.over.hide();
        //停止
        if (this.timer_goldflay) {
            this.timer_goldflay.stop();
            this.timer_goldflay.removeEventListener(basic.TimerEvent.TIMER, this.onGoldFlay, this);
            this.timer_goldflay.removeEventListener(basic.TimerEvent.TIMER_COMPLETE, this.onGoldFlayComplete, this);
            this.timer_goldflay = null;
        }
    };
    //开始金币动画
    SceneGame_EBG.prototype.startGoldAction = function () {
        //数据赋值
        this.gold_now_action = 0;
        //金币动画
        this.goldAction();
        //开始等待
        this.timer_goldflay = new basic.Timer(1000, 2);
        this.timer_goldflay.addEventListener(basic.TimerEvent.TIMER, this.onGoldFlay, this);
        this.timer_goldflay.addEventListener(basic.TimerEvent.TIMER_COMPLETE, this.onGoldFlayComplete, this);
        this.timer_goldflay.start();
    };
    //金币飞行中
    SceneGame_EBG.prototype.onGoldFlay = function (e) {
        //数据赋值
        this.gold_now_action += 1;
        //金币动画
        this.goldAction();
    };
    //金币飞行结束
    SceneGame_EBG.prototype.onGoldFlayComplete = function (e) {
        //停止
        if (this.timer_goldflay) {
            this.timer_goldflay.stop();
            this.timer_goldflay.removeEventListener(basic.TimerEvent.TIMER, this.onGoldFlay, this);
            this.timer_goldflay.removeEventListener(basic.TimerEvent.TIMER_COMPLETE, this.onGoldFlayComplete, this);
            this.timer_goldflay = null;
        }
        //显示结算
        this.over.show();
    };
    //金币动画
    SceneGame_EBG.prototype.goldAction = function () {
        //判断显示
        if (GameData.EBG_Poker_Table_IsWin[this.gold_now_action] == true) {
            //金币飞回在线玩家
            this.goldflay.startFlay(2, 0, this.gold_now_action);
            //金币飞回用户
            if (GameData.EBG_YaZhu_User[this.gold_now_action] > 0) {
                this.goldflay.startFlay(0, 0, this.gold_now_action);
            }
        }
        else {
            //金币飞回庄家
            this.goldflay.startFlay(1, 0, this.gold_now_action);
        }
    };
    //--------------------定义事件-------------------
    //游戏初始化
    SceneGame_EBG.prototype.onGameInfo = function (e) {
        //定义变量
        var lefttime;
        //数据赋值
        GameData.EBG_YaZhu_UserTotal = 0;
        GameData.EBG_State = e.data.status;
        GameData.EBG_YaZhu_User = e.data.betGolds;
        GameData.EBG_YaZhu_Total = e.data.totalBetGolds;
        for (var i = 0; i < GameData.EBG_YaZhu_User.length; i++) {
            GameData.EBG_YaZhu_UserTotal += GameData.EBG_YaZhu_User[i];
            GameData.EBG_YaZhu_OtherTotal += GameData.EBG_YaZhu_Total[i];
        }
        GameData.EBG_Poker_Table_InfoChip = e.data.totalBetGoldDetails;
        GameData.EBG_Poker_Table_Type = e.data.cardTypes;
        GameData.EBG_Poker_Table_IsWin = e.data.isWins;
        GameData.EBG_Poker_Table_Card = e.data.cards;
        GameData.EBG_YaZhu_User_NowDetail = [[], [], []];
        //显示金币
        this.ebg_down.showGold(UserData.User_Gold - GameData.EBG_YaZhu_UserTotal);
        //桌子初始化
        this.ebg_table.info();
        //显示时间
        if (GameData.EBG_State == 1) {
            this.clock.start(e.data.leftTime);
        }
        else {
            this.clock.visible = false;
        }
        //庄加列表
        Comm_ebg.instance.sendSocket({ "type": "dealerList" });
    };
    //结算事件
    SceneGame_EBG.prototype.onGameResult = function (e) {
        //数据赋值
        UserData.User_Gold = e.data.gold;
        GameData.Zhuang_Gold = e.data.dealerTotalGold;
        GameData.EBG_OverData = e.data;
        GameData.EBG_YaZhu_UserTotal = 0;
    };
    //状态改变事件
    SceneGame_EBG.prototype.onChangeStatus = function (e) {
        var _this = this;
        //数据赋值
        GameData.EBG_State = e.data.status;
        //显示时钟
        if (GameData.EBG_State == 0) {
            //清除桌子
            this.over.hide();
            this.ebg_table.clean();
            //显示金币
            this.ebg_up.show();
            this.ebg_down.showGold(UserData.User_Gold - GameData.EBG_YaZhu_UserTotal);
            //显示开始压住提示
            this.starttips.start();
        }
        else if (GameData.EBG_State == 1) {
            //显示倒计时
            this.over.hide();
            this.clock.start(e.data.leftTime);
        }
        else {
            this.over.hide();
            //判断显示结果
            if (GameData.EBG_State == 3) {
                //数据赋值
                if (GameData.EBG_Poker_Table_IsWin[0] == true && GameData.EBG_Poker_Table_IsWin[1] == true && GameData.EBG_Poker_Table_IsWin[2] == true) {
                    //显示通赔
                    this.specialresult.showLose(function () {
                        //显示结果
                        _this.ebg_table.showResult();
                        //开始金币动画
                        egret.setTimeout(function () {
                            _this.startGoldAction();
                        }, _this, 500);
                    });
                }
                else if (GameData.EBG_Poker_Table_IsWin[0] == false && GameData.EBG_Poker_Table_IsWin[1] == false && GameData.EBG_Poker_Table_IsWin[2] == false) {
                    //显示通杀
                    this.specialresult.showWin(function () {
                        //显示结果
                        _this.ebg_table.showResult();
                        //开始金币动画
                        egret.setTimeout(function () {
                            _this.startGoldAction();
                        }, _this, 500);
                    });
                }
                else {
                    //显示结果
                    this.ebg_table.showResult();
                    //开始金币动画
                    egret.setTimeout(function () {
                        _this.startGoldAction();
                    }, this, 500);
                }
            }
        }
    };
    //游戏开牌
    SceneGame_EBG.prototype.onGameOpen = function (e) {
        //数据赋值
        GameData.EBG_Poker_Table_Card = e.data.cards;
        GameData.EBG_Poker_Table_Type = e.data.cardTypes;
        GameData.EBG_Poker_Table_IsWin = e.data.isWins;
        //开始动画
        this.ebg_table.startSendMahjong();
    };
    //庄加列表
    SceneGame_EBG.prototype.onGetZhuangList = function (e) {
    };
    //改变庄事件
    SceneGame_EBG.prototype.onChangeZhuang = function (e) {
        //数据赋值
        GameData.Zhuang_Id = e.data.dealerId;
        GameData.Zhuang_Name = e.data.nickName;
        GameData.Zhuang_Head = e.data.headImgURL;
        GameData.Zhuang_Gold = e.data.gold;
        //显示界面
        this.ebg_up.show();
    };
    //显示金币
    SceneGame_EBG.prototype.onShowGold = function (e) {
        //显示金币
        this.ebg_down.showGold(UserData.User_Gold - GameData.EBG_YaZhu_UserTotal);
    };
    return SceneGame_EBG;
}(basic.SceneBase));
__reflect(SceneGame_EBG.prototype, "SceneGame_EBG");
