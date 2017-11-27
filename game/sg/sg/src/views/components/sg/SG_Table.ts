/**
 *
 * @桌子界面
 *
 */
class SG_Table extends eui.Component {
    //定义变量
    public table_num: number;
    private result: SG_Result;
    private g_result: eui.Group;
    private card: Game_Card[] = [];
    private txt_gold_user: eui.Label;
    private txt_gold_total: eui.Label;
    private txt_result: eui.BitmapLabel;
    private txt_lose: eui.BitmapLabel;
    private img_result: eui.Image;
    private img_he: eui.Image;

    //初始化
    createChildren(): void {
        super.createChildren();
        
        //数据赋值
        for(var i: number = 0;i < 3;i++) {
            //定义变量
            var now_card: Game_Card = this["card" + i];

            //数据赋值
            this.card[i] = now_card;
        }

        //注册事件
        basic.Dispatcher.addListener(EventNames.SG_SHOW_CARD,this.onShowCard,this);
        basic.Dispatcher.addListener(EventNames.SG_HIDE_CARD,this.onHideCard,this);
        basic.Dispatcher.addListener(EventNames.SG_OPEN_CARD,this.onOpenCard,this);
        basic.Dispatcher.addListener(EventNames.SG_CHANGEYAZHU,this.onShowYaZhu,this);
        basic.Dispatcher.addListener(EventNames.SG_USERYAZHU,this.onShowUserYaZhu,this);
        basic.Dispatcher.addListener(EventNames.SG_SHOWOTHERTABLE,this.onShowOtherTable,this);
        basic.Dispatcher.addListener(EventNames.SG_SHOW_CARDDETAIL,this.onShowCardDetail,this);
    }
    
    //初始化界面
    info(): void {
        //清除界面
        this.clean();

        //判断显示界面
        if(GameData.SG_Game_Status > 1) {
            //显示牌
            this.result.visible = true;
            for(var i: number = 0;i < 3;i++) {
                this.card[i].openCard();
                this.card[i].visible = true;
            }
            basic.Dispatcher.dispatch(EventNames.SG_SHOW_CARDDETAIL,{
                "table": this.table_num,
                "card": GameData.SG_Poker_Table_Card[this.table_num]
            });
            this.result.showResult(GameData.SG_Poker_Table_Type[this.table_num]);
            
             //显示结果
            this.showResult();
        }
        
        //显示金币
        this.showGold();
    }

    //清除界面
    clean(): void {
        //隐藏界面
        for(var i: number = 0;i < 3;i++) {
            this.card[i].closeCard();
            this.card[i].visible = false;
        }
        this.img_he.visible = false;
        this.result.visible = false;
        this.txt_lose.visible = false;
        this.g_result.visible = false;
        this.img_result.visible = false;
        this.txt_gold_user.text = "0";
        this.txt_gold_total.text = "0";
    }

    //显示结果
    showResult(): void {
        //判断显示结果
        if(GameData.SG_Poker_Table_IsWin[this.table_num] == 1) {
            this.g_result.visible = true;
            this.img_result.visible = true;

            //判断显示
            if(GameData.SG_Poker_Table_Type[this.table_num] < 7) {
                this.txt_result.text = "x1"
            }
            else if(GameData.SG_Poker_Table_Type[this.table_num] < 11) {
                this.txt_result.text = "x2"
            }
            else if(GameData.SG_Poker_Table_Type[this.table_num] == 11) {
                this.txt_result.text = "x3"
            }
        }
        else if(GameData.SG_Poker_Table_IsWin[this.table_num] == -1){
            //显示界面
            this.txt_lose.visible = true;
            if(GameData.SG_Poker_Table_Type[5] < 7) {
                this.txt_lose.text = "x1"
            }
            else if(GameData.SG_Poker_Table_Type[5] < 11) {
                this.txt_lose.text = "x2"
            }
            else if(GameData.SG_Poker_Table_Type[5] == 11) {
                this.txt_lose.text = "x3"
            }
        }
        else{
            this.img_he.visible = true;
        }
    }

    //显示金币
    public showGold(): void {
        //显示金币
        this.txt_gold_user.text = GameData.SG_YaZhu_User[this.table_num].toString();
        if(Number(GameData.SG_YaZhu_Total[this.table_num] + GameData.SG_YaZhu_User_Now[this.table_num]) > Number(this.txt_gold_total.text)) {
            this.txt_gold_total.text = Number(GameData.SG_YaZhu_Total[this.table_num] + GameData.SG_YaZhu_User_Now[this.table_num]).toString();
        }
    }

    //显示压住
    private onShowYaZhu(e: egret.Event): void {
        //判断显示
        if(this.table_num == 0) {
            //数据赋值
            GameData.SG_YaZhu_UserTotal = 0;
            GameData.SG_YaZhu_User = e.data.betGolds;
            GameData.SG_YaZhu_Total = e.data.totalBetGolds;
            for(var i: number = 0;i < GameData.SG_YaZhu_User.length;i++) {
                GameData.SG_YaZhu_UserTotal += GameData.SG_YaZhu_User[i];
            }

            //显示其他压住动画
            for(var j: number = 0;j < 5;j++) {
                //定义变量
                var other_yazhu: number[] = [];
                var user_yazhu: number[] = GameData.SG_YaZhu_User_NowDetail[j];

                //数据赋值
                for(var k1: number = 0;k1 < e.data.newBetGoldDetails[j].length;k1++) {
                    //定义变量
                    var juge_yazhu: Boolean = true;

                    //数据赋值
                    for(var p1: number = 0;p1 < user_yazhu.length;p1++) {
                        if(e.data.newBetGoldDetails[j][k1] == user_yazhu[p1]) {
                            //数据赋值
                            juge_yazhu = false;
                            user_yazhu[p1] = -1;
                            break;
                        }
                    }

                    //判断赋值
                    if(juge_yazhu == true) {
                        other_yazhu[other_yazhu.length] = e.data.newBetGoldDetails[j][k1];
                    }
                }

                //显示其他压注动画
                for(var j1: number = 0;j1 < other_yazhu.length;j1++) {
                    basic.Dispatcher.dispatch(EventNames.GAME_SHOW_OHTERYAZHU,{
                        "pos": j,
                        "gold": other_yazhu[j1]
                    });
                }
            }

            //数据赋值
            GameData.SG_YaZhu_User_Now = [0,0,0,0,0];
            GameData.SG_YaZhu_User_NowDetail = [[],[],[],[],[]];

            //显示金币
            this.showGold();

            //发送消息
            basic.Dispatcher.dispatch(EventNames.SG_SHOWGOLD);

            //显示其他桌子
            basic.Dispatcher.dispatch(EventNames.SG_SHOWOTHERTABLE);
        }
    }

    //显示其他桌子
    private onShowOtherTable(e: egret.Event): void {
        //显示金币
        if(this.table_num > 0) {
            this.showGold();
        }
    }

    //显示用户压住
    private onShowUserYaZhu(e: egret.Event): void {
        //数据赋值
        if(e.data.pos == this.table_num) {
            GameData.SG_YaZhu_User[this.table_num] = e.data.totalGold;
            GameData.SG_YaZhu_User_NowDetail[this.table_num][GameData.SG_YaZhu_User_NowDetail[this.table_num].length] = e.data.gold;
        }

        //显示金币
        this.showGold();
    }

    //显示牌
    private onShowCard(e: egret.Event): void {
        //判断显示
        if(e.data.table == this.table_num) {
            this.card[e.data.cardnum].visible = true;
            if(e.data.cardnum < 2) {
                this.card[e.data.cardnum].openCardAction(0.65);
            }
        }
        else if(e.data.table == -1) {
            //显示界面
            for(var i: number = 0;i < 3;i++) {
                this.card[i].visible = true;
            }
        }
    }

    //隐藏牌
    private onHideCard(e: egret.Event): void {
        //隐藏界面
        for(var i: number = 0;i < 3;i++) {
            this.card[i].visible = false;
        }
    }

    //显示牌内容
    private onShowCardDetail(e: egret.Event): void {
        //判断显示
        if(e.data.table == this.table_num) {
            for(var i: number = 0;i < 3;i++) {
                this.card[i].showCard(e.data.card[i]);
            }
        }
    }

    //打开牌
    private onOpenCard(e: egret.Event): void {
        //判断显示
        if(e.data.table == this.table_num) {
            //播放声音
            basic.SoundManager.instance.playEffect("sound_g_cardopen_mp3");
            
            //显示界面
            this.card[2].openCardAction(0.65,() => {
                //显示结果
                this.result.visible = true;
                this.result.show(GameData.SG_Poker_Table_Type[this.table_num]);
            });
        }
    }
}
