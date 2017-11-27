/**
 *
 * @二八杠
 *
 */
class SceneGame_EBG extends basic.SceneBase {
    //定义变量
    private over: EBG_Over;
    private ebg_up: EBG_Up;
    private clock: EBG_Clock;
    private ebg_down: EBG_Down;
    private ebg_chat: EBG_Chat;
    private ebg_table: EBG_Table;
    private goldflay: EBG_GoldFlay;
    private starttips:EBG_StartTips;
    private specialresult: EBG_SpecialResult;
    private timer_goldflay: basic.Timer = null;
    private gold_now_action: number;
    
    //定义界面
    public constructor() {
        super();
        
        //定义界面
        this.skinName = SceneGame_EBGSkin;
        
        //注册事件
        basic.Dispatcher.addListener(EventNames.EBG_SHOWGOLD,this.onShowGold,this);
        basic.Dispatcher.addListener(EventNames.EBG_GAMEOPEN,this.onGameOpen,this);
        basic.Dispatcher.addListener(EventNames.EBG_GAMEINFO,this.onGameInfo,this);
        basic.Dispatcher.addListener(EventNames.EBG_GAMERESULT,this.onGameResult,this);
        basic.Dispatcher.addListener(EventNames.EBG_CHANGEZHUANG,this.onChangeZhuang,this);
        basic.Dispatcher.addListener(EventNames.EBG_ZHUANGLIST,this.onGetZhuangList,this);
        basic.Dispatcher.addListener(EventNames.EBG_CHANGEZHUANG,this.onChangeZhuang,this);
        basic.Dispatcher.addListener(EventNames.EBG_CHANGESTATUS,this.onChangeStatus,this);
    }

    //显示前调用
    beforeShow(): void {
        //初始化界面
        this.over.hide();
        this.ebg_down.info();
        
        //数据赋值
        GameData.Game_Type = 1;
        
        //播放背景音乐
        basic.SoundManager.instance.playMusic("back_ebg_mp3");
        
        //初始化游戏
        Comm_ebg.instance.sendSocket({ "type": "joinRoom","roomId": 0 });
    }

    //隐藏前调用
    beforeHide() {
        //清除界面
        this.clean();
        
        //停止声音
        basic.SoundManager.instance.stopMusic();
        
        //发送消息
        Comm_ebg.instance.sendSocket({ "type": "exitGame" });
    }
    
    //清除界面
    private clean():void{
        //时间停止
        this.clock.stop();
        
        //清楚桌子
        this.ebg_table.clean();
        
        //清除界面
        this.ebg_chat.clean();
        
        //隐藏结算
        this.over.hide();
        
        //停止
        if(this.timer_goldflay) {
            this.timer_goldflay.stop();
            this.timer_goldflay.removeEventListener(basic.TimerEvent.TIMER,this.onGoldFlay,this);
            this.timer_goldflay.removeEventListener(basic.TimerEvent.TIMER_COMPLETE,this.onGoldFlayComplete,this);
            this.timer_goldflay = null;
        }
    }
    
    //开始金币动画
    private startGoldAction(): void {
        //数据赋值
        this.gold_now_action = 0;

        //金币动画
        this.goldAction();

        //开始等待
        this.timer_goldflay = new basic.Timer(1000,2);
        this.timer_goldflay.addEventListener(basic.TimerEvent.TIMER,this.onGoldFlay,this);
        this.timer_goldflay.addEventListener(basic.TimerEvent.TIMER_COMPLETE,this.onGoldFlayComplete,this);
        this.timer_goldflay.start();
    }

    //金币飞行中
    private onGoldFlay(e: basic.TimerEvent): void {
        //数据赋值
        this.gold_now_action += 1;

        //金币动画
        this.goldAction();
    }
    
    //金币飞行结束
    private onGoldFlayComplete(e: basic.TimerEvent): void {
        //停止
        if(this.timer_goldflay) {
            this.timer_goldflay.stop();
            this.timer_goldflay.removeEventListener(basic.TimerEvent.TIMER,this.onGoldFlay,this);
            this.timer_goldflay.removeEventListener(basic.TimerEvent.TIMER_COMPLETE,this.onGoldFlayComplete,this);
            this.timer_goldflay = null;
        }
        
        //显示结算
        this.over.show();
    }
    
    //金币动画
    private goldAction(): void {
        //判断显示
        if(GameData.EBG_Poker_Table_IsWin[this.gold_now_action] == true) {
            //金币飞回在线玩家
            this.goldflay.startFlay(2,0,this.gold_now_action);
            
            //金币飞回用户
            if(GameData.EBG_YaZhu_User[this.gold_now_action] > 0) {
                this.goldflay.startFlay(0,0,this.gold_now_action);
            }
        }
        else {
            //金币飞回庄家
            this.goldflay.startFlay(1,0,this.gold_now_action);
        }
    }
    
    //--------------------定义事件-------------------
    //游戏初始化
    private onGameInfo(e: egret.Event): void {
        //定义变量
        var lefttime: number;
        
        //数据赋值
        GameData.EBG_YaZhu_UserTotal = 0;
        GameData.EBG_State = e.data.status;
        GameData.EBG_YaZhu_User = e.data.betGolds;
        GameData.EBG_YaZhu_Total = e.data.totalBetGolds;
        for(var i: number = 0;i < GameData.EBG_YaZhu_User.length;i++) {
            GameData.EBG_YaZhu_UserTotal += GameData.EBG_YaZhu_User[i];
            GameData.EBG_YaZhu_OtherTotal += GameData.EBG_YaZhu_Total[i];
        }
        GameData.EBG_Poker_Table_InfoChip = e.data.totalBetGoldDetails;
        GameData.EBG_Poker_Table_Type = e.data.cardTypes;
        GameData.EBG_Poker_Table_IsWin = e.data.isWins;
        GameData.EBG_Poker_Table_Card = e.data.cards;
        GameData.EBG_YaZhu_User_NowDetail = [[],[],[]];
       
        //显示金币
        this.ebg_down.showGold(UserData.User_Gold - GameData.EBG_YaZhu_UserTotal);
        
        //桌子初始化
        this.ebg_table.info();
        
        //显示时间
        if(GameData.EBG_State == 1) {
            this.clock.start(e.data.leftTime);
        }
        else {
            this.clock.visible = false;
        }
        
        //庄加列表
        Comm_ebg.instance.sendSocket({ "type": "dealerList" });
    }

    //结算事件
    private onGameResult(e: egret.Event): void {
        //数据赋值
        UserData.User_Gold = e.data.gold;
        GameData.Zhuang_Gold = e.data.dealerTotalGold;
        GameData.EBG_OverData = e.data;
        GameData.EBG_YaZhu_UserTotal = 0;
    }

    //状态改变事件
    private onChangeStatus(e: egret.Event): void {
        //数据赋值
        GameData.EBG_State = e.data.status;
        
        //显示时钟
        if(GameData.EBG_State == 0) {
            //清除桌子
            this.over.hide();
            this.ebg_table.clean();
            
            //显示金币
            this.ebg_up.show();
            this.ebg_down.showGold(UserData.User_Gold - GameData.EBG_YaZhu_UserTotal);

            //显示开始压住提示
            this.starttips.start();
        }
        else if(GameData.EBG_State == 1) {
            //显示倒计时
            this.over.hide();
            this.clock.start(e.data.leftTime);
        }
        else {
            this.over.hide();
            //判断显示结果
            if(GameData.EBG_State == 3) {
                //数据赋值
                if(GameData.EBG_Poker_Table_IsWin[0] == true && GameData.EBG_Poker_Table_IsWin[1] == true && GameData.EBG_Poker_Table_IsWin[2] == true) {
                    //显示通赔
                    this.specialresult.showLose(() => {
                        //显示结果
                        this.ebg_table.showResult();

                        //开始金币动画
                        egret.setTimeout(() => {
                            this.startGoldAction();
                        },this,500);
                    });
                }
                else if(GameData.EBG_Poker_Table_IsWin[0] == false && GameData.EBG_Poker_Table_IsWin[1] == false && GameData.EBG_Poker_Table_IsWin[2] == false) {
                    //显示通杀
                    this.specialresult.showWin(() => {
                        //显示结果
                        this.ebg_table.showResult();

                        //开始金币动画
                        egret.setTimeout(() => {
                            this.startGoldAction();
                        },this,500);
                    });
                }
                else {
                    //显示结果
                    this.ebg_table.showResult();

                    //开始金币动画
                    egret.setTimeout(() => {
                        this.startGoldAction();
                    },this,500);
                }
            }
        }
    }

    //游戏开牌
    private onGameOpen(e: egret.Event): void {
        //数据赋值
        GameData.EBG_Poker_Table_Card = e.data.cards;
        GameData.EBG_Poker_Table_Type = e.data.cardTypes;
        GameData.EBG_Poker_Table_IsWin = e.data.isWins;
        
        //开始动画
        this.ebg_table.startSendMahjong();
    }
    
    //庄加列表
    private onGetZhuangList(e:egret.Event):void{
        
    }
    
    //改变庄事件
    private onChangeZhuang(e: egret.Event): void {
        //数据赋值
        GameData.Zhuang_Id = e.data.dealerId;
        GameData.Zhuang_Name = e.data.nickName;
        GameData.Zhuang_Head = e.data.headImgURL;
        GameData.Zhuang_Gold = e.data.gold;
        
        //显示界面
        this.ebg_up.show();
    }
    
    //显示金币
    private onShowGold(e:egret.Event):void{
        //显示金币
        this.ebg_down.showGold(UserData.User_Gold-GameData.EBG_YaZhu_UserTotal);
    }
}
