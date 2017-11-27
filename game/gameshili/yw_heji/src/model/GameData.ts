/**
 *
 * @游戏数据
 *
 */
class GameData {
    //定义变量
    static Game_Num: number = 6;
    static Game_Type: number = -1;
    static GameCard_NowShow: number = 0;
    static Game_BeiLv: number = 10000;
    
    //过分游戏
    static GF_RoomId: string = "";
    
    //庄数据
    static Zhuang_Id: number = 0;
    static Zhuang_VIP: number = 15;
    static Zhuang_Name: string = "系统";
    static Zhuang_Gold: number = 10000000000;
    static Zhuang_WinGold: number;
    static Zhuang_Head: string = "icon_zhuanghead_png";
    static JSYS_ZhuangList: any[] = [];
    static Zhuang_Times: number = -1;
    
    //0:等待时间,1:押注时间,2:开奖时间,3:结算时间
    //金鲨银沙
    static JSYS_State: number;
    static JSYS_RunOver_Type: number;
    static JSYS_RunOver_Family: number;
    static JSYS_YaZhu_UserTotal: number = 0;
    static JSYS_YaZhu_User: number[] = [0,0,0,0,0,0,0,0,0,0,0,0];
    static JSYS_YaZhu_Total: number[] = [0,0,0,0,0,0,0,0,0,0,0,0];
    static JSYS_YaZhu_User_Old: number[] = [0,0,0,0,0,0,0,0,0,0,0,0]
    static JSYS_Box_Beilv: number[] = [48,24,12,8,8,6,12,8,8,6,2,2];
    static JSYS_GenZhu_Detail: number[] = [0,0,0,0,0,0,0,0,0,0,0,0];
    static JSYS_GenZhu_Num: number = 0;
    static JSYS_Now_DearGold:number;
    static JSYS_Now_UserWinGold: number;
    
    //二八杠
    static EBG_State: number;
    static EBG_YaZhu_UserTotal: number = 0;
    static EBG_YaZhu_OtherTotal: number = 0;
    static EBG_Poker_Table_IsWin: Boolean[] = [];
    static EBG_Poker_Table_Type: number[] = [1,1,1,1];
    static EBG_Poker_Table_InfoChip: any[] = [[],[],[]];
    static EBG_Poker_Table_Card: any[] = [[38,5],[6,41],[18,4],[24,55]];
    static EBG_YaZhu_User_NowDetail: any[] = [[],[],[]];
    static EBG_YaZhu_User: number[] = [];
    static EBG_YaZhu_Total: number[] = [];
    static EBG_OverData: any;
    
    //金币赋值
    static assGold(_type: number,_gold: number): string {
        //定义变量
        var show_gold: string="";
        var gold: number = _gold;
        
        //数据赋值
        if(_gold!=null){
            if(_type == 0) {
                if(gold < 1000000) {
                    show_gold = gold.toString();
                }
                else {
                    gold = Math.floor(gold / 1000);
                    show_gold = Number(gold / 10).toString() + "w";
                }
            }
            else if(_type == 1) {
                if(gold < 100000000) {
                    show_gold = this.assGold(0,gold);
                }
                else {
                    gold = Math.floor(gold / 1000000);
                    show_gold = Number(gold / 100).toString() + "y";
                }
            }
            else if(_type == 2) {
                if(gold == 0) {
                    show_gold = "0";
                }
                else if(gold < 100000000) {
                    gold = Math.floor(gold / 10000);
                    show_gold = gold.toString() + "w";
                }
                else {
                    gold = Math.floor(gold / 1000000);
                    show_gold = Number(gold / 100).toString() + "y";
                }
            }
            else if(_type == 3) {
                if(gold == 0) {
                    show_gold = "0";
                }
                else if(gold < 100000000) {
                    gold = Math.floor(gold / 10000);
                    show_gold = gold.toString() + "w";
                }
                else {
                    gold = Math.floor(gold / 100000000);
                    show_gold = gold.toString() + "y";
                }
            }
        }
        
        return show_gold;
    }
    
    static assGold1(_type: number,_gold: number): string {
        //定义变量
        var show_gold: string = "";
        var gold: number = _gold;

        //数据赋值
        if(_gold != null) {
            if(_type == 0) {
                if(gold < 1000000) {
                    show_gold = gold.toString();
                }
                else {
                    gold = Math.floor(gold / 1000);
                    show_gold = Number(gold / 10).toString() + "万";
                }
            }
            else if(_type == 1) {
                if(gold < 100000000) {
                    show_gold = this.assGold(0,gold);
                }
                else {
                    gold = Math.floor(gold / 1000000);
                    show_gold = Number(gold / 100).toString() + "亿";
                }
            }
            else if(_type == 2) {
                if(gold == 0) {
                    show_gold = "0";
                }
                else if(gold < 100000000) {
                    gold = Math.floor(gold / 10000);
                    show_gold = gold.toString() + "万";
                }
                else {
                    gold = Math.floor(gold / 1000000);
                    show_gold = Number(gold / 100).toString() + "亿";
                }
            }
            else if(_type == 3) {
                if(gold == 0) {
                    show_gold = "0";
                }
                else if(gold < 100000000) {
                    gold = Math.floor(gold / 10000);
                    show_gold = gold.toString() + "万";
                }
                else {
                    gold = Math.floor(gold / 100000000);
                    show_gold = gold.toString() + "亿";
                }
            }
        }

        return show_gold;
    }
    
    
}
