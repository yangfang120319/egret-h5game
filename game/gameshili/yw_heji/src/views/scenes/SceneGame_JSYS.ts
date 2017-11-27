/**
 *
 * @游戏界面
 *
 */
class SceneGame_JSYS extends basic.SceneBase {
    //定义变量
    private jsys_up: JSYS_Up;
    private jsys_btn: JSYS_Btn;
    private jsys_box: JSYS_Box;
    private jsys_chat: JSYS_Chat;
    private jsys_time: JSYS_Time;
    private jsys_zhuang: JSYS_Zhuang;
    private jsys_choose: JSYS_Choose;
    private jsys_history: JSYS_History;
    private jsys_biaoqing: JSYS_BiaoQing;
    private txt_beilv: eui.Label;
    private btn_change: eui.Button;
    private txt_gold: eui.BitmapLabel;
    private txt_wingold: eui.BitmapLabel;
    private win_gold: number = 0;
    
    //跟注数据
    private btn_no: eui.Button;
    private g_genzhu: eui.Group;
    private txt_tips: eui.Label;
    
    //定义界面
    public constructor() {
        super();
        
        //定义界面
        this.skinName = SceneGame_JSYSSkin;
        
        //显示界面
        this.jsys_box.touchEnabled = false;
        this.jsys_box.touchChildren = false;
        
        //注册事件
        basic.Dispatcher.addListener(EventNames.JSYS_GAMEOPEN,this.onGameOpen,this);
        basic.Dispatcher.addListener(EventNames.JSYS_SHOWGOLD,this.onShowGold,this);
        basic.Dispatcher.addListener(EventNames.JSYS_GAMEINFO,this.onGameInfo,this);
        basic.Dispatcher.addListener(EventNames.JSYS_HISTORY,this.onShowHistory,this);
        basic.Dispatcher.addListener(EventNames.JSYS_GAMERESULT,this.onGameResult,this);
        basic.Dispatcher.addListener(EventNames.JSYS_SHOWWINBIG,this.onShowWinBig,this);
        basic.Dispatcher.addListener(EventNames.JSYS_STARTGENZHU,this.onStartGenZhu,this);
        basic.Dispatcher.addListener(EventNames.JSYS_CHANGEZHUANG,this.onChangeZhuang,this);
        basic.Dispatcher.addListener(EventNames.JSYS_CHANGESTATUS,this.onChangeStatus,this);
        basic.Dispatcher.addListener(EventNames.JSYS_ZHUANGLIST,this.onShowZhuangList,this);
        
        //注册按钮
        this.btn_no.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onNoBtn,this);
        this.btn_change.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onChangeBtn,this);
    }

    //显示前调用
    beforeShow(): void {
        //数据赋值
        this.win_gold = 0;
        GameData.Game_Type = 0;
        GameData.Zhuang_Id = 0;
        
        //显示倍率
        this.showBeiLv();
        
        //显示按钮
        this.jsys_btn.showZhuangBtn();
        
        //显示界面
        this.jsys_up.info();
        this.txt_wingold.text = "0";
        
        //初始化游戏
        Comm_jsys.instance.sendSocket({ "type":"gameInfo"});
        
        //播放背景音乐
        basic.SoundManager.instance.playMusic("sound_jsys_back_mp3");
    }

    //隐藏前调用
    beforeHide() {
        //清除
        this.clean();
        
        //停止声音
        basic.SoundManager.instance.stopMusic();
        
        //发送消息
        Comm_jsys.instance.sendSocket({ "type": "exitGame" });
    }
    
    //显示金币
    private showGold(): void {
        //显示文本
        this.jsys_up.showGold(UserData.User_Gold - this.win_gold);
        this.txt_gold.text = GameData.assGold(2,UserData.User_Gold - this.win_gold);
    }
    
    //清除界面
    private clean():void{
        //隐藏跟注
        this.hideGenZhu();
        
        //清除界面
        this.jsys_box.clean();
        this.jsys_chat.clean();
        this.jsys_time.clean();
    }
    
    //显示赢得金币
    private showWinGold():void{
        //判断显示
        if(GameData.Zhuang_Id != UserData.User_Id) {
            //显示赢得金币
            this.win_gold = GameData.JSYS_Now_UserWinGold + GameData.JSYS_YaZhu_UserTotal;
            console.log(GameData.JSYS_Now_UserWinGold);
            console.log(GameData.JSYS_YaZhu_UserTotal);
            
            //显示赢得金币
            this.txt_wingold.font = "font_jsys_gold_fnt";
            this.txt_wingold.text = GameData.assGold(2,this.win_gold);
        }
        else {
            //显示赢得金币
            this.win_gold = GameData.JSYS_Now_DearGold - GameData.Zhuang_Gold;

            //判断显示
            if(this.win_gold >= 0) {
                this.txt_wingold.font = "font_jsys_gold_fnt";
                if(this.win_gold < 100000000) {
                    this.txt_wingold.text = Math.floor(this.win_gold / 10000).toString() + "w";
                }
                else {
                    this.txt_wingold.text = Number(Math.floor(this.win_gold / 1000000) / 100).toString() + "y";
                }
            }
            else {
                this.win_gold = -this.win_gold;
                this.txt_wingold.font = "font_jsys_goldlose_fnt";
                if(this.win_gold < 100000000) {
                    this.txt_wingold.text = "-" + Math.floor(this.win_gold / 10000).toString() + "w";
                }
                else {
                    this.txt_wingold.text = "-" + Number(Math.floor(this.win_gold / 1000000) / 100).toString() + "y";
                }
            }
        }
    }
    
    //隐藏跟注
    private hideGenZhu():void{
        //数据赋值
        GameData.JSYS_GenZhu_Num = 0;
        GameData.JSYS_GenZhu_Detail = [0,0,0,0,0,0,0,0,0,0,0,0];
        
        //隐藏界面
        this.g_genzhu.visible = false;
    }
    
    //开始跟注
    private onStartGenZhu(e: egret.Event): void {
        //显示界面
        this.g_genzhu.visible = true;
        
        //显示文本
        this.txt_tips.text = "自动跟注中，剩余" + Number(GameData.JSYS_GenZhu_Num-1).toString() + "轮";
    }
    
    //取消按钮
    private onNoBtn(e: egret.TouchEvent): void {
        //播放声音
        basic.SoundManager.instance.playEffect("sound_btn_mp3");
        
        //隐藏跟注
        this.hideGenZhu();
    }
    
    //-----------------------定义按钮--------------------------
    //显示金币
    private onShowGold(e: egret.Event): void {
        //显示金币
        this.jsys_up.showGold(e.data.gold);
        this.txt_gold.text = GameData.assGold(2,e.data.gold);
    }
    
    //游戏初始化
    private onGameInfo(e:egret.Event):void{
        //数据赋值
        GameData.JSYS_State = e.data.status;
        GameData.JSYS_YaZhu_User = e.data.betGolds;
        GameData.JSYS_YaZhu_Total = e.data.totalBetGolds;
        
        //初始化界面
        this.jsys_box.info(e.data.pos[0].pos);
        
        //选择按钮初始化
        this.jsys_choose.info();
        
        //判断显示按钮
        if(GameData.JSYS_State == 1) {
            //显示按钮
            this.jsys_btn.showBtn();

            //显示倒计时
            this.jsys_time.start(e.data.leftTime - 3,() => {
                //注销按钮
                this.jsys_btn.hideBtn();
                this.jsys_choose.hideBtn();
                
                //倒计时结束
                GameData.JSYS_State = 2;
            });
        }
        else {
            //隐藏按钮
            this.jsys_btn.hideBtn();
        }
        
        //判断显示
        if(GameData.JSYS_State > 1) {
            //显示赢得金币
//            this.showWinGold();
        }
        
        //显示金币
        this.showGold();
    }
    
    //庄列表
    private onShowZhuangList(e:egret.Event):void{
        //显示庄列表
        this.jsys_zhuang.showZhuangList(e.data.data);
        
        //显示按钮
        this.jsys_btn.showZhuangBtn();
    }
    
    //显示飞机动画
    private onShowWinBig(e: egret.Event): void {
        //显示飞机动画
        var actionfly: Action_Fly = new Action_Fly();
        
        //播放声音
        basic.SoundManager.instance.playEffect("sound_fly_mp3");
        
        //定义动画
        actionfly.info();
        actionfly.start(e.data.nickName,e.data.headImgURL,e.data.winGold,() => {
            //显示界面
            this.removeChild(actionfly);
        });

        //显示界面
        this.addChild(actionfly);

        //定义飞机大小
        actionfly.scaleX = 0.8;
        actionfly.scaleY = 0.8;
    }
    
    //游戏状态改变
    private onChangeStatus(e:egret.Event):void{
        //数据赋值
        GameData.JSYS_State = e.data.status;
        
        //判断显示
        if(GameData.JSYS_State == 0) {
            //注销按钮
            this.jsys_time.clean();
            this.jsys_btn.hideBtn();
            this.jsys_choose.hideBtn();

            //数据清除
            this.jsys_choose.clean();
            
            //清除文本
            this.win_gold = 0; 
            this.txt_wingold.font = "font_jsys_gold_fnt";
            this.txt_wingold.text = "0";
            this.jsys_zhuang.showGold();
        }
        else if(GameData.JSYS_State == 1){
            //显示按钮
            this.jsys_btn.showBtn();
            this.jsys_choose.showBtn();
            
            //判断是否跟注
            if(GameData.JSYS_GenZhu_Num > 0) {
                //数据赋值
                GameData.JSYS_GenZhu_Num -= 1;
                
                //显示文本
                this.txt_tips.text = "自动跟注中，剩余" + Number(GameData.JSYS_GenZhu_Num - 1).toString() + "轮";

                //判断结束
                if(GameData.JSYS_GenZhu_Num == 0) {
                    //数据赋值
                    this.hideGenZhu();
                }
                else {
                    //自动押注
                    for(var i: number = 0;i < 12;i++) {
                        //判断发送
                        if(GameData.JSYS_GenZhu_Detail[i] > 0) {//发送消息
                            Comm_jsys.instance.sendSocket({ "type": "bet","pos": i,"gold": GameData.JSYS_GenZhu_Detail[i] });
                        }
                    }
                }
            }
            
            //开始计时
            this.jsys_time.start(e.data.leftTime - 3,() => {
                //注销按钮
                this.jsys_btn.hideBtn();
                this.jsys_choose.hideBtn();

                //倒计时结束
                GameData.JSYS_State = 2;
            });
        }
        else if(GameData.JSYS_State == 2){
            //注销按钮
            this.jsys_time.clean();
            this.jsys_btn.hideBtn();
            this.jsys_choose.hideBtn();
        }
        else if(GameData.JSYS_State == 3) {
            //注销按钮
            this.jsys_time.clean();
            this.jsys_btn.hideBtn();
            this.jsys_choose.hideBtn();
        }
    }
    
    //游戏开奖
    private onGameOpen(e: egret.Event): void {
        //数据最后显示
        this.jsys_choose.checkOverData(e.data);
        GameData.JSYS_Now_UserWinGold = e.data.winGold;
        GameData.JSYS_Now_DearGold = e.data.dealerTotalGold;
        
        //显示游戏开奖
        this.jsys_box.start(e.data.pos[0].pos,()=>{
            //显示赢得金币
            this.showWinGold();
            
            //显示闪动动画
            this.jsys_choose.showAction();

            //显示历史
            egret.setTimeout(() => {
                this.jsys_history.addShow();
            },this,3500);
        });
    }
    
    //游戏结算
    private onGameResult(e:egret.Event):void{
        //判断显示
        if(GameData.Zhuang_Id != 0){
            //定义变量
            var showchat: string = "本局庄家";

            //数据赋值
            showchat += "<font color='#dbea26'>" + GameData.Zhuang_Name + "</font>";
            if(GameData.Zhuang_Gold <= e.data.dealerTotalGold) {
                showchat += "赢了";
                GameData.Zhuang_WinGold = e.data.dealerTotalGold - GameData.Zhuang_Gold;
                if(GameData.Zhuang_WinGold < 100000000) {
                    showchat += "<font color='#56bd47'>" + Math.floor(GameData.Zhuang_WinGold / 10000).toString() + "万" + "</font>";
                }
                else {
                    showchat += "<font color='#56bd47'>" + Number(Math.floor(GameData.Zhuang_WinGold / 1000000) / 100).toString() + "亿" + "</font>";
                }
                
                //判断显示
                if(UserData.User_Id == GameData.Zhuang_Id) {
                    this.txt_wingold.font ="font_jsys_gold_fnt";
                    if(GameData.Zhuang_WinGold < 100000000) {
                        this.txt_wingold.text = Math.floor(GameData.Zhuang_WinGold / 10000).toString() + "w";
                    }
                    else {
                        this.txt_wingold.text = Number(Math.floor(GameData.Zhuang_WinGold / 1000000) / 100).toString() + "y";
                    }
                }
            }
            else {
                showchat += "输了";
                GameData.Zhuang_WinGold = GameData.Zhuang_Gold - e.data.dealerTotalGold;
                if(GameData.Zhuang_WinGold < 100000000) {
                    showchat += "<font color='#882f2c'>" + Math.floor(GameData.Zhuang_WinGold / 10000).toString() + "万" + "</font>";
                }
                else {
                    showchat += "<font color='#882f2c'>" + Number(Math.floor(GameData.Zhuang_WinGold / 1000000) / 100).toString() + "亿" + "</font>";
                }
                
                //判断显示
                if(UserData.User_Id == GameData.Zhuang_Id) {
                    this.txt_wingold.font = "font_jsys_goldlose_fnt";
                    if(GameData.Zhuang_WinGold < 100000000) {
                        this.txt_wingold.text = "-"+Math.floor(GameData.Zhuang_WinGold / 10000).toString() + "w";
                    }
                    else {
                        this.txt_wingold.text = "-" + Number(Math.floor(GameData.Zhuang_WinGold / 1000000) / 100).toString() + "y";
                    }
                }
            }
            showchat += "金币";

            //发送消息
            basic.Dispatcher.dispatch(EventNames.JSYS_SHOWCHAT,{
                "account": "0",
                "chatType": 1,
                "headImgURL": "",
                "msg": showchat,
                "nickName": "系统",
                "type": "chat",
                "vipLevel": "15"
            });
        }
        
        //数据赋值
        UserData.User_Gold = e.data.gold;
        GameData.Zhuang_Gold = e.data.dealerTotalGold;
        GameData.JSYS_YaZhu_UserTotal = 0;
    }
    
    //显示历史记录
    private onShowHistory(e: egret.Event): void {
        //显示历史记录
        this.jsys_history.show(e.data.historys);
        
        //隐藏结束
        this.jsys_box.hideOver();
    }
    
    //显示庄
    private onChangeZhuang(e: egret.Event): void {
        //判断显示
        if(GameData.Zhuang_Id != e.data.dealerId){
            if(GameData.Zhuang_Id != 0) {
                //定义变量
                var xiazhuang_chat: string = "";

                //数据赋值
                xiazhuang_chat += "<font color='#dbea26'>" + GameData.Zhuang_Name + "</font>";
                xiazhuang_chat += "下庄！"

                //发送消息
                basic.Dispatcher.dispatch(EventNames.JSYS_SHOWCHAT,{
                    "account": "0",
                    "chatType": 1,
                    "headImgURL": "",
                    "msg": xiazhuang_chat,
                    "nickName": "",
                    "type": "chat",
                    "vipLevel": "15"
                });
            }
            
            //判断显示
            if(e.data.dealerId != 0) {
                //定义变量
                var shangzhuang_chat: string = "";

                //数据赋值
                shangzhuang_chat += "<font color='#dbea26'>" + e.data.nickName + "</font>";
                shangzhuang_chat += "开始坐庄！"

                //发送消息
                basic.Dispatcher.dispatch(EventNames.JSYS_SHOWCHAT,{
                    "account": "0",
                    "chatType": 1,
                    "headImgURL": "",
                    "msg": shangzhuang_chat,
                    "nickName": "",
                    "type": "chat",
                    "vipLevel": "15"
                });
            }
        }
        
        //数据赋值
        GameData.Zhuang_Gold = e.data.gold;
        GameData.Zhuang_Id = e.data.dealerId;
        GameData.Zhuang_Name = e.data.nickName;
        GameData.Zhuang_Head = e.data.headImgURL;
        GameData.Zhuang_VIP = e.data.vipLevel;
        GameData.Zhuang_Times = e.data.dealerCount;
        
        //显示庄
        this.jsys_zhuang.show();
        
        //显示按钮
        this.jsys_btn.showZhuangBtn();
    }
    
    //-----------------------定义按钮--------------------------
    //改变按钮
    private onChangeBtn(e: egret.TouchEvent): void {
        //播放声音
        basic.SoundManager.instance.playEffect("sound_btn_mp3");

        //数据赋值
        GameData.Game_BeiLv = Number(GameData.Game_BeiLv.toString() + "0");
        if(GameData.Game_BeiLv > 100000000) {
            GameData.Game_BeiLv = 10000;
        }

        //显示倍率
        this.showBeiLv();
    }
    
    //显示倍率
    private showBeiLv(): void {
        //判断显示
        if(GameData.Game_BeiLv == 10000) {
            this.txt_beilv.text = "x10000";
        }
        else if(GameData.Game_BeiLv < 100000000) {
            this.txt_beilv.text = "x" + String(GameData.Game_BeiLv).substring(0,String(GameData.Game_BeiLv).length - 4) + "万";
        }
        else {
            this.txt_beilv.text = "x1亿"
        }
    }
}
