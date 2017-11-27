/**
 *
 * @二八杠-桌子
 *
 */
class EBG_Table extends eui.Component {
    //定义变量
    public table_num: number;
    private result: EBG_Result;
    private mahjong0: Game_Mahjong;
    private mahjong1: Game_Mahjong;
    private g_result: eui.Group;
    private txt_gold_user: eui.Label;
    private txt_gold_total: eui.Label;
    private txt_result: eui.BitmapLabel;
    private txt_lose: eui.BitmapLabel;
    private img_result: eui.Image;

    //初始化
    createChildren(): void {
        super.createChildren();

        //注册事件
        basic.Dispatcher.addListener(EventNames.EBG_CHANGEYAZHU,this.onShowYaZhu,this);
        basic.Dispatcher.addListener(EventNames.EBG_USERYAZHU,this.onShowUserYaZhu,this);
        basic.Dispatcher.addListener(EventNames.EBG_SHOW_MAHJONG,this.onShowMahjong,this);
        basic.Dispatcher.addListener(EventNames.EBG_HIDE_MAHJONG,this.onHideMahjong,this);
        basic.Dispatcher.addListener(EventNames.EBG_OPEN_MAHJONG,this.onOpenMahjong,this);
        basic.Dispatcher.addListener(EventNames.EBG_SHOWOTHERTABLE,this.onShowOtherTable,this);
        basic.Dispatcher.addListener(EventNames.EBG_SHOW_MAHJONGDETAIL,this.onShowMahjongDetail,this);
    }

    //初始化界面
    info(): void {
        //清除界面
        this.clean();

        //判断显示界面
        if(GameData.EBG_Game_Status > 1) {
            //显示牌
            this.result.visible = true;
            this.mahjong0.visible = true;
            this.mahjong1.visible = true;
            basic.Dispatcher.dispatch(EventNames.EBG_SHOW_MAHJONGDETAIL,{
                "table": this.table_num,
                "mahjong": GameData.EBG_Poker_Table_Card[this.table_num]
            });
            this.mahjong0.openMahjong();
            this.mahjong1.openMahjong();
            this.result.showResult(this.table_num);
            
            //显示结果
            this.showResult();
        }
        
        //显示金币
        this.showGold();
    }

    //清除界面
    clean(): void {
        //隐藏界面
        this.mahjong0.closeMahjong();
        this.mahjong1.closeMahjong();
        this.mahjong0.visible = false;
        this.mahjong1.visible = false;
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
        if(GameData.EBG_Poker_Table_IsWin[this.table_num] == true) {
            this.g_result.visible = true;
            this.img_result.visible = true;

            //判断显示
            this.txt_result.text = "x1"
        }
        else if(GameData.EBG_Poker_Table_IsWin[this.table_num] == false) {
            //显示界面
            this.txt_lose.text = "x1";
            this.txt_lose.visible = true;
        }
    }

    //显示金币
    public showGold(): void {
        //显示金币
        this.txt_gold_user.text = GameData.EBG_YaZhu_User[this.table_num].toString();
        if(Number(GameData.EBG_YaZhu_Total[this.table_num] + GameData.EBG_YaZhu_User_Now[this.table_num]) > Number(this.txt_gold_total.text)) {
            this.txt_gold_total.text = Number(GameData.EBG_YaZhu_Total[this.table_num] + GameData.EBG_YaZhu_User_Now[this.table_num]).toString();
        }
    }

    //显示压住
    private onShowYaZhu(e: egret.Event): void {
        //判断显示
        if(this.table_num == 0) {
            //数据赋值
            GameData.EBG_YaZhu_UserTotal = 0;
            GameData.EBG_YaZhu_User = e.data.betGolds;
            GameData.EBG_YaZhu_Total = e.data.totalBetGolds;
            for(var i: number = 0;i < GameData.EBG_YaZhu_User.length;i++) {
                GameData.EBG_YaZhu_UserTotal += GameData.EBG_YaZhu_User[i];
            }
            
            //显示其他压住动画
            for(var j:number=0;j<3;j++){
                //定义变量
                var other_yazhu: number[] = [];
                var user_yazhu: number[] = GameData.EBG_YaZhu_User_NowDetail[j];
                if(e.data.newBetGoldDetails[j].length > 0) {
                    console.log(user_yazhu);
                    console.log(e.data.newBetGoldDetails[j]);
                }

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
            GameData.EBG_YaZhu_User_Now = [0,0,0];
            GameData.EBG_YaZhu_User_NowDetail = [[],[],[]];

            //显示金币
            this.showGold();

            //发送消息
            basic.Dispatcher.dispatch(EventNames.EBG_SHOWGOLD);
            
            //显示其他桌子
            basic.Dispatcher.dispatch(EventNames.EBG_SHOWOTHERTABLE);
        }
    }
    
    //显示其他桌子
    private onShowOtherTable(e:egret.Event):void{
        //显示金币
        if(this.table_num > 0) {
            this.showGold();
        } 
    }
    
    //显示用户压住
    private onShowUserYaZhu(e: egret.Event): void {
        //数据赋值
        if(e.data.pos == this.table_num) {
            GameData.EBG_YaZhu_User[this.table_num] = e.data.totalGold;
            GameData.EBG_YaZhu_User_NowDetail[this.table_num][GameData.EBG_YaZhu_User_NowDetail[this.table_num].length] = e.data.gold;
        }

        //显示金币
        this.showGold();
    }
    
    //显示麻将
    private onShowMahjong(e: egret.Event): void {
        //显示界面
        this.mahjong0.visible = true;
        this.mahjong1.visible = true;
    }

    //隐藏麻将
    private onHideMahjong(e: egret.Event): void {
        //显示界面
        this.mahjong0.visible = false;
        this.mahjong1.visible = false;
    }

    //显示麻将内容
    private onShowMahjongDetail(e: egret.Event): void {
        //判断显示
        if(e.data.table == this.table_num) {
            this.mahjong0.showMahjong(e.data.mahjong[0]);
            this.mahjong1.showMahjong(e.data.mahjong[1]);
        }
    }

    //打开麻将
    private onOpenMahjong(e: egret.Event): void {
        //判断显示
        if(e.data.table == this.table_num) {
            this.mahjong0.openMahjongAction(() => {
                this.mahjong1.openMahjongAction(() => {
                    //显示结果
                    this.result.visible = true;
                    this.result.show(this.table_num);
                });
            });
        }
    }
}
