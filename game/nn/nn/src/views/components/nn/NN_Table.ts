/**
 *
 * @牛牛-桌子
 *
 */
class NN_Table extends eui.Component {
    //定义变量
    public table_num: number;
    private result: NN_Result;
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
        for(var i: number = 0;i < 5;i++) {
            //定义变量
            var now_card: Game_Card = this["card" + i];

            //数据赋值
            this.card[i] = now_card;
        }
        
        //注册事件
        basic.Dispatcher.addListener(EventNames.NN_SHOW_CARD,this.onShowCard,this);
        basic.Dispatcher.addListener(EventNames.NN_HIDE_CARD,this.onHideCard,this);
        basic.Dispatcher.addListener(EventNames.NN_OPEN_CARD,this.onOpenCard,this);
        basic.Dispatcher.addListener(EventNames.NN_CHANGEYAZHU,this.onShowYaZhu,this);
        basic.Dispatcher.addListener(EventNames.NN_USERYAZHU,this.onShowUserYaZhu,this);
        basic.Dispatcher.addListener(EventNames.NN_SHOWOTHERTABLE,this.onShowOtherTable,this);
        basic.Dispatcher.addListener(EventNames.NN_SHOW_CARDDETAIL,this.onShowCardDetail,this);
    }
    
    //初始化界面
    info(): void {
        //清除界面
        this.clean();

        //判断显示界面
        if(GameData.NN_Game_Status > 1) {
            //显示牌
            this.result.visible = true;
            for(var i: number = 0;i < 5;i++) {
                this.card[i].openCard();
                this.card[i].visible = true;
                
                //判断显示位置
                if(GameData.NN_Poker_Table_IsNiu[this.table_num][i] == 1) {
                    this.card[i].y = -15;
                }
            }
            basic.Dispatcher.dispatch(EventNames.NN_SHOW_CARDDETAIL,{
                "table": this.table_num,
                "card": GameData.NN_Poker_Table_Card[this.table_num]
            });
            
            //判断牌是否一样
            for(var j: number = 0;j < 5;j++) {
                if(GameData.NN_Poker_Table_NewCard[this.table_num][j] != GameData.NN_Poker_Table_Card[this.table_num][j]) {
                    //显示新牌
                    this.card[j].showNewCard(GameData.NN_Poker_Table_NewCard[this.table_num][j]);
                }
            }
            this.result.showResult(GameData.NN_Poker_Table_Type[this.table_num]);
            
            //显示结果
            this.showResult();
        }
        
        //显示金币
        this.showGold();
    }

    //清除界面
    clean(): void {
        //隐藏界面
        for(var i: number = 0;i < 5;i++) {
            this.card[i].y = 0;
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
        if(GameData.NN_Poker_Table_IsWin[this.table_num] == 1) {
            this.g_result.visible = true;
            this.img_result.visible =  true;

            //判断显示
            if(GameData.NN_Poker_Table_Type[this.table_num] < 10) {
                this.txt_result.text = "x1"
            }
            else if(GameData.NN_Poker_Table_Type[this.table_num] == 10) {
                this.txt_result.text = "x2"
            }
            else if(GameData.NN_Poker_Table_Type[this.table_num] == 14) {
                this.txt_result.text = "x3"
            }
            else if(GameData.NN_Poker_Table_Type[this.table_num] == 15) {
                this.txt_result.text = "x4"
            }
        }
        else if(GameData.NN_Poker_Table_IsWin[this.table_num] == -1) {
            //显示界面
            this.txt_lose.visible = true;
            if(GameData.NN_Poker_Table_Type[5] < 10) {
                this.txt_lose.text = "x1"
            }
            else if(GameData.NN_Poker_Table_Type[5] == 10) {
                this.txt_lose.text = "x2"
            }
            else if(GameData.NN_Poker_Table_Type[5] == 14) {
                this.txt_lose.text = "x3"
            }
            else if(GameData.NN_Poker_Table_Type[5] == 15) {
                this.txt_lose.text = "x4"
            }
        }
        else{
            this.img_he.visible = true;
        }
    }

    //显示金币
    public showGold(): void {
        //显示金币
        this.txt_gold_user.text = GameData.NN_YaZhu_User[this.table_num].toString();
        if(Number(GameData.NN_YaZhu_Total[this.table_num] + GameData.NN_YaZhu_User_Now[this.table_num]) > Number(this.txt_gold_total.text)) {
            this.txt_gold_total.text = Number(GameData.NN_YaZhu_Total[this.table_num] + GameData.NN_YaZhu_User_Now[this.table_num]).toString();
        }
    }

    //显示压住
    private onShowYaZhu(e: egret.Event): void {
        //判断显示
        if(this.table_num == 0) {
            //数据赋值
            GameData.NN_YaZhu_UserTotal = 0;
            GameData.NN_YaZhu_User = e.data.betGolds;
            GameData.NN_YaZhu_Total = e.data.totalBetGolds;
            for(var i: number = 0;i < GameData.NN_YaZhu_User.length;i++) {
                GameData.NN_YaZhu_UserTotal += GameData.NN_YaZhu_User[i];
            }

            //显示其他压住动画
            for(var j: number = 0;j < 5;j++) {
                //定义变量
                var other_yazhu: number[] = [];
                var user_yazhu: number[] = GameData.NN_YaZhu_User_NowDetail[j];
                
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
            GameData.NN_YaZhu_User_Now = [0,0,0,0,0];
            GameData.NN_YaZhu_User_NowDetail = [[],[],[],[],[]];

            //显示金币
            this.showGold();

            //发送消息
            basic.Dispatcher.dispatch(EventNames.NN_SHOWGOLD);

            //显示其他桌子
            basic.Dispatcher.dispatch(EventNames.NN_SHOWOTHERTABLE);
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
            GameData.NN_YaZhu_User[this.table_num] = e.data.totalGold;
            GameData.NN_YaZhu_User_NowDetail[this.table_num][GameData.NN_YaZhu_User_NowDetail[this.table_num].length] = e.data.gold;
        }

        //显示金币
        this.showGold();
    }

    //显示牌
    private onShowCard(e: egret.Event): void {
        //判断显示
        if(e.data.table == this.table_num){
            this.card[e.data.cardnum].visible = true;
            if(e.data.cardnum < 4) {
                this.card[e.data.cardnum].openCardAction(0.65);
            }
        }
        else if(e.data.table == -1){
            //显示界面
            for(var i: number = 0;i < 5;i++) {
                this.card[i].visible = true;
            }
        }
    }

    //隐藏牌
    private onHideCard(e: egret.Event): void {
        //隐藏界面
        for(var i: number = 0;i < 5;i++) {
            this.card[i].visible = false;
        }
    }

    //显示牌内容
    private onShowCardDetail(e: egret.Event): void {
        //判断显示
        if(e.data.table == this.table_num) {
            for(var i: number = 0;i < 5;i++) {
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
            this.card[4].openCardAction(0.65,() => {
                //显示牌动画
                for(var i: number = 0;i < 5;i++) {
                    if(GameData.NN_Poker_Table_IsNiu[this.table_num][i] == 1) {
                        //显示动画
                        var _tween_y: egret.Tween = egret.Tween.get(this.card[i]).to({ y: -15 },100);
                    }
                    
                    //判断牌是否一样
                    if(GameData.NN_Poker_Table_NewCard[this.table_num][i] != GameData.NN_Poker_Table_Card[this.table_num][i]){
                        //显示新牌
                        this.card[i].showNewCard(GameData.NN_Poker_Table_NewCard[this.table_num][i]);
                    }
                }
                
                //显示结果
                this.result.visible = true;
                this.result.show(GameData.NN_Poker_Table_Type[this.table_num]);
            });
        }
    }
}
