/**
 *
 * @二八杠
 *
 */
class SceneGame_EBG extends basic.SceneBase {
    //定义变量
    private clock: Game_Clock;
    private choose: Game_Choose;
    private head_user: Game_Head;
    private head_zhuang: Game_Head;
    private chipfly: Game_ChipFly;
    private sendmahjong: EBG_SendMahjong;
    private specialresult: Game_SpecialResult;
    private btn_exit: eui.Button;
    private btn_luzi: eui.Button;
    private btn_paixin: eui.Button;
    private btn_up_zhuang: eui.Button;
    private btn_choosechip: eui.Button;
    private g_room: eui.Group;
    private g_gold: eui.Group;
    private g_zhuang: eui.Group;
    private img_ling1: eui.Image;
    private img_ling2: eui.Image;
    private g_shangzhuang: eui.Group;
    private img_line: eui.Image;
    private txt_roomid: eui.Label;
    private txt_gold_user: eui.Label;
    private txt_gold_zhuang: eui.Label;
    private txt_sz_condition: eui.Label;
    private img_title: eui.Image;
    private img_vip: eui.Image;

    //桌子数据
    private zhuang: EBG_Zhuang;
    private g_tabletotal: eui.Group;
    private g_zhuang_table: eui.Group;
    private table: EBG_Table[] = [];
    private g_table: eui.Group[] = [];
    private btn_table: eui.Button[] = [];
    private timer_openmahjong: basic.Timer = null;
    private open_mahjong_num: number;

    //定义界面
    public constructor() {
        super();

        //定义界面
        this.skinName = SceneGame_EBGSkin;

        //数据赋值
        this.clock.touchEnabled = false;
        this.clock.touchChildren = false;
        for(var i: number = 0;i < 3;i++) {
            //定义变量
            var now_table: EBG_Table = this["table" + i];
            var now_g_table: eui.Group = this["g_table" + i];
            var now_btn_table: eui.Button = this["btn_table" + i];

            //数据赋值
            this.table[i] = now_table;
            this.g_table[i] = now_g_table;
            this.btn_table[i] = now_btn_table;
            this.table[i].table_num = i;

            //注册按钮
            this.btn_table[i].addEventListener(egret.TouchEvent.TOUCH_TAP,this.onTableBtn,this);
        }

        //注册按钮
        this.btn_exit.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onExitBtn,this);
        this.btn_luzi.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onLuZiBtn,this);
        this.btn_paixin.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onPaiXinBtn,this);
        this.head_user.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onChooseHead,this);
        this.btn_up_zhuang.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onUpZhuangBtn,this);
        //this.btn_createroom.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onCreateRoomBtn,this);
        this.btn_choosechip.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onChooseChipBtn,this);
        
        //注册事件
        basic.Dispatcher.addListener(EventNames.GOLD_CHANGE,this.onGoldChange,this);
        basic.Dispatcher.addListener(EventNames.EBG_ERROR,this.onShowTips,this);
        basic.Dispatcher.addListener(EventNames.EBG_SHOWGOLD,this.onShowGold,this);
        basic.Dispatcher.addListener(EventNames.EBG_GAMEOPEN,this.onGameOpen,this);
        basic.Dispatcher.addListener(EventNames.EBG_GAMEINFO,this.onGameInfo,this);
        basic.Dispatcher.addListener(EventNames.EBG_ENTERROOM,this.onEnterRoom,this);
        basic.Dispatcher.addListener(EventNames.EBG_GAMERESULT,this.onGameResult,this);
        basic.Dispatcher.addListener(EventNames.EBG_CHANGEZHUANG,this.onChangeZhuang,this);
        basic.Dispatcher.addListener(EventNames.EBG_CHANGESTATUS,this.onChangeStatus,this);
        basic.Dispatcher.addListener(EventNames.EBG_SEND_MAHJONGOVER,this.onSendMajongOver,this);
        
    }
    
    //显示前调用
    beforeShow(): void {
        //判断显示位置
        this.onShowPlace();

        //数据赋值
        if(GameData.Game_Room_Id == "0") {
            GameData.Game_Id = 4;
        }
        else {
            GameData.Game_Id = 1;
        }
        GameData.Game_Type = 4;
        
        //初始化界面
        this.specialresult.clean();
        
        //清除桌子
        this.clock.info(0);
        this.zhuang.clean();
        for(var i: number = 0;i < 3;i++) {
            this.table[i].clean();
        }
        
        //显示用户信息
        this.txt_gold_user.text = "";
        this.head_user.show(UserData.User_Head,UserData.User_Name);
        
        //初始化游戏
        //Comm_ebg.instance.sendSocket({ "type": "joinRoom","roomId": GameData.Game_Room_Id });
    }

    //隐藏时调用
    onHide(): void {
        //清除界面
        this.clean();
        
        //数据赋值
        GameData.Game_Id = 1;
        GameData.Game_Type = 1;
        
        //发送消息
        //Comm_ebg.instance.sendSocket({ "type": "exitGame" });
    }
    
    //清除界面
    private clean():void{
        //清除界面
        this.zhuang.clean();
        this.chipfly.clean();
        this.clock.stopTimer();
        this.specialresult.clean();
        for(var i: number = 0;i < 3;i++) {
            this.table[i].clean();
        }
        
        //判断停止麻将
        if(this.timer_openmahjong) {
            this.timer_openmahjong.stop()
            this.timer_openmahjong.removeEventListener(basic.TimerEvent.TIMER,this.onOpenMahjong,this);
            this.timer_openmahjong.removeEventListener(basic.TimerEvent.TIMER_COMPLETE,this.onOpenMahjongComplete,this);
            this.timer_openmahjong = null;
        }
        
        //隐藏结算
        basic.Dispatcher.dispatch(EventNames.EBG_HIDEOVER);
    }
    
    //显示金币
    private showGold(): void {
        //定义变量
        var show_gold: number;

        //数据赋值
        show_gold = UserData.User_Gold - GameData.EBG_YaZhu_UserTotal;

        //显示金币
        this.txt_gold_user.text = show_gold.toString();
    }

    //显示时钟
    private showClock(_time: number = 0): void {
        //显示时钟
        if(GameData.EBG_Game_Status == 0) {
            //显示倒计时
            this.clock.startTimer(GameData.EBG_Game_Status,0);
        }
        else if(GameData.EBG_Game_Status == 1) {
            this.clock.startTimer(GameData.EBG_Game_Status,_time - 2,() => {
                //数据赋值
                GameData.EBG_Game_Status = 2;
            });
        }
        else {
            this.clock.startTimer(GameData.EBG_Game_Status);
        }
    }

    //显示房间
    private showRoom(): void {
        //判断显示按钮
        if(GameData.Game_Room_Id == "0") {
            this.img_title.y = 280;
            this.g_room.visible = false;
            this.img_vip.visible = false;
        }
        else {
            this.img_title.y = 255;
            this.g_room.visible = true;
            this.img_vip.visible = true;
            this.txt_roomid.text = GameData.Game_Room_Id.toString();
        }
    }

    //-------------------------定义事件-------------------------
    //显示提示
    private onShowTips(e: egret.Event): void {
        //显示提示
        basic.Dispatcher.dispatch(EventNames.SHOW_TIPS,{ "tips": e.data.msg });
    }
    
    //金币改变
    private onGoldChange(e: egret.Event): void {
        //显示金币
        this.showGold();
    }
    
    //显示金币
    private onShowGold(e:egret.Event):void{
        //显示金币
        this.showGold();
    }
    
    //进入房间
    private onEnterRoom(e: egret.Event): void {
        //数据赋值
        GameData.Game_Room_Id = e.data.roomId;

        //初始化游戏
        //Comm_ebg.instance.sendSocket({ "type": "joinRoom","roomId": GameData.Game_Room_Id });
    
    }
    
    //游戏初始化
    private onGameInfo(e: egret.Event): void {
        //定义变量
        var lefttime: number;
        
        //判断显示
        if(GameData.Game_Room_Id != "0") {
            //清除界面
            this.clean();
        }
        
        //数据赋值
        GameData.Game_Room_Id = e.data.roomId;
        GameData.EBG_Game_Status = e.data.status;
        GameData.EBG_YaZhu_User = e.data.betGolds;
        GameData.EBG_YaZhu_Total = e.data.totalBetGolds;
        for(var i: number = 0;i < GameData.EBG_YaZhu_User.length;i++) {
            GameData.EBG_YaZhu_UserTotal += GameData.EBG_YaZhu_User[i];
        }
        GameData.EBG_Poker_Table_Card = e.data.cards;
        GameData.EBG_Poker_Table_Type = e.data.cardTypes;
        GameData.EBG_Poker_Table_IsWin = e.data.isWins;
        GameData.EBG_UpZhuang_Condition = e.data.callDealerMinGold;
        if(e.data.isDouble == true) {
            GameData.Game_IsDouble = true;
        }
        else {
            GameData.Game_IsDouble = false;
        }
        GameData.EBG_YaZhu_User_Now = [0,0,0];
        GameData.EBG_YaZhu_User_NowDetail = [[],[],[]];

        //显示金币
        this.showGold();

        //显示房间
        this.showRoom();

        //桌子初始化
        this.zhuang.info();
        for(var i: number = 0;i < 3;i++) {
            this.table[i].info();
        }

        //显示时间
        if(GameData.EBG_Game_Status == 1) {
            this.showClock(e.data.leftTime);
        }
        else {
            this.showClock();
        }
        
        //判断显示界面
        if(e.data.status == 2) {
            //显示提示
            this.clock.showWaiting("本局开奖中，等待下一局开始！");
        }
        else if(e.data.status == 3) {
            //显示提示
            this.clock.showWaiting("本局结算中，等待下一局开始！");
        }
        
        //初始化
        this.choose.info();
        
        //初始化筹码
        this.chipfly.infoChip(e.data.totalBetGoldDetails);
    }
    
    //结算事件
    private onGameResult(e:egret.Event):void{
        //数据赋值
        UserData.User_Gold = e.data.gold;
        GameData.Game_Zhuang_Gold = e.data.dealerTotalGold;
    }
    
    //状态改变事件
    private onChangeStatus(e: egret.Event): void {
        //数据赋值
        GameData.EBG_Game_Status = e.data.status;

        //显示时钟
        if(GameData.EBG_Game_Status == 0) {
            //清除桌子
            this.zhuang.clean();
            this.chipfly.clean();
            for(var i: number = 0;i < 3;i++) {
                this.table[i].clean();
            }
            GameData.EBG_YaZhu_UserTotal = 0;
            GameData.EBG_YaZhu_User_Now = [0,0,0];
            GameData.EBG_YaZhu_User_NowDetail = [[],[],[]];
            
            //显示金币
            this.showGold();
            
            //显示金币
            this.txt_gold_zhuang.text = GameData.Game_Zhuang_Gold.toString();
            
            //显示倒计时
            this.clock.startTimer(GameData.EBG_Game_Status,e.data.leftTime);
            
            //隐藏结算
            basic.Dispatcher.dispatch(EventNames.EBG_HIDEOVER);
        }
        else if(GameData.EBG_Game_Status == 1) {
            //显示倒计时
            this.clock.startTimer(GameData.EBG_Game_Status,e.data.leftTime - 2,() => {
                //数据赋值
                GameData.EBG_Game_Status = 2;
            });
            
            //隐藏结算
            basic.Dispatcher.dispatch(EventNames.EBG_HIDEOVER);
        }
        else {
            //显示时钟
            this.clock.startTimer(GameData.EBG_Game_Status);

            //判断显示结果
            if(GameData.EBG_Game_Status == 3) {
                //数据赋值
                if(GameData.EBG_Poker_Table_IsWin[0] == true && GameData.EBG_Poker_Table_IsWin[1] == true && GameData.EBG_Poker_Table_IsWin[2] == true) {
                    //显示通赔
                    this.specialresult.showLose(() => {
                        //显示结算
                        basic.Dispatcher.dispatch(EventNames.EBG_SHOWOVER);
                    });
                }
                else if(GameData.EBG_Poker_Table_IsWin[0] == false && GameData.EBG_Poker_Table_IsWin[1] == false && GameData.EBG_Poker_Table_IsWin[2] == false) {
                    //显示通杀
                    this.specialresult.showWin(() => {
                        //显示结算
                        basic.Dispatcher.dispatch(EventNames.EBG_SHOWOVER);
                    });
                }
                else {
                    //显示结算
                    basic.Dispatcher.dispatch(EventNames.EBG_SHOWOVER);
                }
            }
            else{
                //隐藏结算
                basic.Dispatcher.dispatch(EventNames.EBG_HIDEOVER);
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
        this.sendmahjong.start();
    }

    //改变庄事件
    private onChangeZhuang(e: egret.Event): void {
        //判断显示提示
        if(GameData.Game_Zhuang_Id == 0) {
            if(e.data.dealerId == UserData.User_Id) {
                basic.Dispatcher.dispatch(EventNames.SHOW_TIPS,{ "tips": "您已经上庄" });
            }
            else {
                basic.Dispatcher.dispatch(EventNames.SHOW_TIPS,{ "tips": "“" + e.data.nickName + "”上庄" });
            }
        }
        else {
            if(e.data.dealerId == 0) {
                if(GameData.Game_Zhuang_Id == UserData.User_Id) {
                    basic.Dispatcher.dispatch(EventNames.SHOW_TIPS,{ "tips": "您已经下庄" });
                }
                else {
                    basic.Dispatcher.dispatch(EventNames.SHOW_TIPS,{ "tips": "“" + GameData.Game_Zhuang_name + "”下庄" });
                }
            }
            else {
                if(e.data.dealerId == UserData.User_Id) {
                    basic.Dispatcher.dispatch(EventNames.SHOW_TIPS,{ "tips": "您已经上庄" });
                }
                else {
                    basic.Dispatcher.dispatch(EventNames.SHOW_TIPS,{ "tips": "“" + e.data.nickName + "”上庄" });
                }
            }
        }
        
        //数据赋值
        GameData.Game_Zhuang_Id = e.data.dealerId;
        GameData.Game_Zhuang_name = e.data.nickName;
        GameData.Game_Zhuang_head = e.data.headImgURL;
        GameData.Game_Zhuang_Gold = e.data.gold;

        //显示界面
        this.head_zhuang.show(GameData.Game_Zhuang_head,GameData.Game_Zhuang_name);

        //显示金币
        this.txt_gold_zhuang.text =GameData.Game_Zhuang_Gold.toString();
        
        //判断显示按钮
        if(GameData.Game_Zhuang_Id == UserData.User_Id) {
            this.btn_up_zhuang.icon = "txt_g_sqxz_ch_png";
        }
        else{
            this.btn_up_zhuang.icon = "txt_g_sqsz_ch_png";
        }
    }

    //发送麻将结束
    private onSendMajongOver(e: egret.Event): void {
        //显示麻将
        basic.Dispatcher.dispatch(EventNames.EBG_SHOW_MAHJONG);

        //数据赋值
        this.open_mahjong_num = 0;

        //开始开牌
        this.timer_openmahjong = new basic.Timer(2500,5);
        this.timer_openmahjong.addEventListener(basic.TimerEvent.TIMER,this.onOpenMahjong,this);
        this.timer_openmahjong.addEventListener(basic.TimerEvent.TIMER_COMPLETE,this.onOpenMahjongComplete,this);
        this.timer_openmahjong.start();
    }

    //停止打开麻将
    private stopOpenMahjong(): void {
        //判断停止麻将
        if(this.timer_openmahjong) {
            this.timer_openmahjong.stop()
            this.timer_openmahjong.removeEventListener(basic.TimerEvent.TIMER,this.onOpenMahjong,this);
            this.timer_openmahjong.removeEventListener(basic.TimerEvent.TIMER_COMPLETE,this.onOpenMahjongComplete,this);
            this.timer_openmahjong = null;
        }
    }

    //打开麻将
    private onOpenMahjong(e: basic.TimerEvent): void {
        //发送消息
        if(this.open_mahjong_num < 4) {
            basic.Dispatcher.dispatch(EventNames.EBG_SHOW_MAHJONGDETAIL,{
                "table": this.open_mahjong_num,
                "mahjong": GameData.EBG_Poker_Table_Card[this.open_mahjong_num]
            });
            basic.Dispatcher.dispatch(EventNames.EBG_OPEN_MAHJONG,{
                "table": this.open_mahjong_num
            });
        }
        
        //数据赋值
        this.open_mahjong_num += 1;
    }

    //打开麻将结束
    private onOpenMahjongComplete(e: basic.TimerEvent): void {
        //停止打开麻将
        this.stopOpenMahjong();

        //结果
        for(var i: number = 0;i < 3;i++) {
            this.table[i].showResult();
        }
    }

    //-------------------------定义按钮-------------------------
    //按钮事件
    private onExitBtn(e: egret.TouchEvent) {
        //播放声音
        basic.SoundManager.instance.playEffect("sound_btn_mp3");

        //返回
        basic.SceneManager.back();
    }

    //路子按钮
    private onLuZiBtn(e: egret.TouchEvent) {
        //播放声音
        basic.SoundManager.instance.playEffect("sound_btn_mp3");
        
        //显示界面
        Panel_EBG_LuZi.instance.show();
    }

    //牌型按钮
    private onPaiXinBtn(e: egret.TouchEvent) {
        //播放声音
        basic.SoundManager.instance.playEffect("sound_btn_mp3");
        
        //显示界面
        Panel_EBG_PaiXing.instance.show();
    }
    
    //选择头像
    private onChooseHead(e:egret.TouchEvent):void{
        //显示选择头像
        Panel_ChooseHead.instance.show(()=>{
            //显示头像
            this.head_user.show(UserData.User_Head,UserData.User_Name);
        })
    }
    
    //上庄按钮
    private onUpZhuangBtn(e: egret.TouchEvent) {
        //播放声音
        basic.SoundManager.instance.playEffect("sound_btn_mp3");
        
        //判断显示
        if(GameData.Game_Zhuang_Id == UserData.User_Id) {
            //发送消息
            //Comm_ebg.instance.sendSocket({ "type": "cancelDealer" });
        }
        else {
            //显示界面
            Panel_UpZhuang.instance.show(0);
        }
    }

   
    
    //选择筹码按钮
    private onChooseChipBtn(e: egret.TouchEvent): void {
        //播放声音
        basic.SoundManager.instance.playEffect("sound_btn_mp3");

        //显示界面
        Panel_ChooseChip.instance.show(1,() => {
            //筹码初始化
            this.choose.info();
        });
    }
    
    //桌子按钮
    private onTableBtn(e: egret.TouchEvent): void {
        //定义变量
        var btnnum: number = Number(e.target.name);
        
        //判断显示压住
        if(GameData.EBG_Game_Status == 1 && UserData.User_Id != GameData.Game_Zhuang_Id) {
            //判断显示
            if(GameData.EBG_YaZhu_User[btnnum] + GameData.Game_Chip_Gold[GameData.Game_Chip_Now]>UserData.User_MaxYaZhu){
                //显示提示
                basic.Dispatcher.dispatch(EventNames.SHOW_TIPS,{ "tips": "超过每门可下金币！" });
            }
            else{
                if(GameData.Game_Room_Id != "0" && GameData.EBG_YaZhu_User[btnnum] + GameData.Game_Chip_Gold[GameData.Game_Chip_Now] > 150000) {
                    //显示提示
                    basic.Dispatcher.dispatch(EventNames.SHOW_TIPS,{ "tips": "超过私人房每门可下金币！" });
                }
                else{
                    if(GameData.EBG_YaZhu_UserTotal + GameData.Game_Chip_Gold[GameData.Game_Chip_Now] <= UserData.User_Gold) {
                        //数据赋值
                        GameData.EBG_YaZhu_User[btnnum] += GameData.Game_Chip_Gold[GameData.Game_Chip_Now];
                        GameData.EBG_YaZhu_User_Now[btnnum] += GameData.Game_Chip_Gold[GameData.Game_Chip_Now];
                        GameData.EBG_YaZhu_UserTotal += GameData.Game_Chip_Gold[GameData.Game_Chip_Now];

                        //显示金币
                        this.showGold();

                        //显示界面
                        this.table[btnnum].showGold();

                        //显示动画
                        basic.Dispatcher.dispatch(EventNames.GAME_SHOW_USERYAZHU,{
                            "pos": btnnum,
                            "gold": GameData.Game_Chip_Gold[GameData.Game_Chip_Now]
                        });

                        //提交数据
                        //Comm_ebg.instance.sendSocket({ "type": "bet","pos": btnnum,"gold": GameData.Game_Chip_Gold[GameData.Game_Chip_Now] });
                    }
                    else {
                        //显示提示
                        basic.Dispatcher.dispatch(EventNames.SHOW_TIPS,{ "tips": "您的金币不足，请充值!" });
                    }
                }
            }
        }
    }

    //显示位置
     onShowPlace(): void {
        //定义变量
        var proportion: number;
        var proportion_btn: number;
        var proportion_table: number;
        var choose_show_width: number;
        var proportion_rate1: number;
        var proportion_rate2: number;
        var proportion_gold: number;

        //-------------------------定义按钮----------------------
        console.log(basic.StageProxy.width);

        //判断显示
        if(basic.StageProxy.width >= 1020) {
            //数据赋值
            proportion_rate1 = 1;
            proportion_rate2 = 1;
            proportion_gold = 1;
            proportion = (basic.StageProxy.width - 960) / 176;
            proportion_btn = (basic.StageProxy.width - 1020) / 116;
            choose_show_width = (basic.StageProxy.width - 640 - 50 * proportion_btn) / 0.6;

            //显示按钮位置
            this.g_gold.y = 22;
            this.btn_luzi.y = 555;
            this.img_ling1.x = 340;
            this.btn_choosechip.y = 555;
            this.g_room.x = 185 + 40 * proportion;
            this.btn_paixin.x = 570 + 130 * proportion;
            this.img_ling2.x = basic.StageProxy.width - 310;
            this.btn_luzi.x = basic.StageProxy.width - 150;
            this.btn_choosechip.x = basic.StageProxy.width - 290;
            this.choose.x = 340 + 25 * proportion_btn;
        }
        else if(basic.StageProxy.width >= 960) {
            //数据赋值
            proportion_rate1 = 1;
            proportion = (basic.StageProxy.width - 960) / 176;
            proportion_btn = (basic.StageProxy.width - 960) / 60;
            proportion_rate2 = 0.8 + 0.2 * proportion_btn;
            proportion_gold = 0.9 + 0.1 * proportion_btn;

            //显示按钮位置
            this.g_gold.y = 26 - 4 * proportion_btn;
            this.choose.x = 330 + 10 * proportion_btn;
            this.img_ling1.x = 320 + 20 * proportion_btn;
            this.g_room.x = 185 + 40 * proportion;
            this.btn_paixin.x = 570 + 130 * proportion;
            this.img_ling2.x = 710 + 10 * proportion_btn;
            this.btn_luzi.y = 561 - 6 * proportion_btn;
            this.btn_luzi.x = 836 + 34 * proportion_btn;
            this.btn_choosechip.y = 561 - 6 * proportion_btn;
            this.btn_choosechip.x = 720 + 10 * proportion_btn;
            choose_show_width = (this.img_ling2.x - this.choose.x) / 0.6;
        }
        else {
            //数据赋值
            proportion_rate2 = 0.8;
            proportion_btn = (basic.StageProxy.width - 830) / 130;
            proportion_rate1 = 0.9 + 0.1 * proportion_btn;
            proportion_gold = 0.8 + 0.1 * proportion_btn;

            //显示按钮位置
            this.btn_luzi.y = 535;
            this.btn_choosechip.y = 588;
            this.g_gold.y = 29 - 3 * proportion_btn;
            this.choose.x = 310 + 20 * proportion_btn;
            this.img_ling1.x = 300 + 20 * proportion_btn;
            this.g_room.x = 153 + 9 * proportion_btn;
            this.btn_paixin.x = 485 + 85 * proportion_btn;
            this.img_ling2.x = 690 + 120 * proportion_btn;
            this.btn_luzi.x = basic.StageProxy.width - 130 * proportion_rate2 - 20;
            this.btn_choosechip.x = basic.StageProxy.width - 130 * proportion_rate2 - 20;
            choose_show_width = (this.img_ling2.x - this.choose.x) / 0.6;
        }

        //定义大小
        this.g_gold.scaleX = proportion_gold;
        this.g_gold.scaleY = proportion_gold;
        this.g_room.scaleX = proportion_rate1;
        this.g_room.scaleY = proportion_rate1;
        this.g_zhuang.scaleX = proportion_rate1
        this.g_zhuang.scaleY = proportion_rate1
        this.btn_exit.scaleX = proportion_rate1;
        this.btn_exit.scaleY = proportion_rate1;
        this.btn_paixin.scaleX = proportion_rate1;
        this.btn_paixin.scaleY = proportion_rate1;
        this.btn_luzi.scaleX = proportion_rate2;
        this.btn_luzi.scaleY = proportion_rate2;
        this.btn_choosechip.scaleX = proportion_rate2;
        this.btn_choosechip.scaleY = proportion_rate2;

        //显示选择界面
        this.choose.showPlace(1,choose_show_width);

        //-------------------------定义桌子-------------------------
        //数据赋值
        proportion_table = (basic.StageProxy.width - 830) / 306;

        //定义宽度
        this.g_table[0].width = 235 + 80 * proportion_table;
        this.g_table[1].width = 310 + 100 * proportion_table;
        this.g_table[2].width = 235 + 80 * proportion_table;
        this.table[0].x = (this.g_table[0].width - 200) / 2;
        this.table[2].x = this.width - this.table[0].x - 200;
        this.zhuang.x = (basic.StageProxy.width - this.zhuang.width) / 2;
        this.table[1].x = (basic.StageProxy.width - this.table[1].width) / 2;
        this.btn_table[0].width = this.g_table[0].width;
        this.btn_table[1].width = this.g_table[1].width;
        this.btn_table[2].width = this.g_table[2].width;
        this.btn_table[0].x=0;
        this.btn_table[1].x = (basic.StageProxy.width - this.btn_table[1].width) / 2;
        this.btn_table[2].x = basic.StageProxy.width - this.btn_table[2].width;
        
        //定义变量
        var send_to_x: number[] = [];
        var send_to_y: number[] = [];
        
        //数据赋值
        send_to_x[3] = this.zhuang.x;
        send_to_x[0] = this.table[0].x + 29;
        send_to_x[1] = this.table[1].x + 29;
        send_to_x[2] = this.table[2].x + 29;
        send_to_y[3] = 110 + this.zhuang.y - 20;
        send_to_y[0] = 110 + this.table[0].y - 20 + (this.table[0].height - 108) / 2;
        send_to_y[1] = 110 + this.table[1].y - 20 + (this.table[1].height - 108) / 2;
        send_to_y[2] = 110 + this.table[2].y - 20 + (this.table[2].height - 108) / 2;
        
        //麻将初始化
        this.sendmahjong.info(send_to_x,send_to_y);
        
        //定义变量
        var start_x: number[] = [];
        var start_y: number[] = [];
        var over_x: number[] = [];
        var over_y: number[] = [];
        var over_with: number[] = [];
        var over_height: number[] = [];
        
        //数据赋值
        for(var i1: number = 0;i1 < 4;i1++) {
            start_x[i1] = this.choose.x + this.choose.btn_x[i1] * this.choose.scaleX;
            start_y[i1] = this.choose.y + this.choose.btn_y * this.choose.scaleX;
        }
        for(var i2: number = 0;i2 < 3;i2++) {
            over_with[i2] = 196;
            over_height[i2] = 95;
            over_y[i2] = 110 + this.table[i2].y + (this.table[i2].height - over_height[i2]) / 2;
            if(i2 == 0) {
                over_x[i2] = this.btn_table[i2].x + (this.btn_table[i2].width - over_with[i2]) / 2;
            }
            else if(i2 == 1) {
                over_x[i2] = (basic.StageProxy.width - over_with[i2]) / 2;
            }
            else {
                over_x[i2] = basic.StageProxy.width - this.btn_table[i2].width + (this.btn_table[i2].width - over_with[i2]) / 2;
            }
        }

        //筹码飞行初始化
        this.chipfly.info(this.choose.scaleX,start_x,start_y,over_x,over_y,over_with,over_height);
    }
}
