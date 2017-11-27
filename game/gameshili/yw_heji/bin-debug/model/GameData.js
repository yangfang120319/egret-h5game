var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 *
 * @游戏数据
 *
 */
var GameData = (function () {
    function GameData() {
    }
    //金币赋值
    GameData.assGold = function (_type, _gold) {
        //定义变量
        var show_gold = "";
        var gold = _gold;
        //数据赋值
        if (_gold != null) {
            if (_type == 0) {
                if (gold < 1000000) {
                    show_gold = gold.toString();
                }
                else {
                    gold = Math.floor(gold / 1000);
                    show_gold = Number(gold / 10).toString() + "w";
                }
            }
            else if (_type == 1) {
                if (gold < 100000000) {
                    show_gold = this.assGold(0, gold);
                }
                else {
                    gold = Math.floor(gold / 1000000);
                    show_gold = Number(gold / 100).toString() + "y";
                }
            }
            else if (_type == 2) {
                if (gold == 0) {
                    show_gold = "0";
                }
                else if (gold < 100000000) {
                    gold = Math.floor(gold / 10000);
                    show_gold = gold.toString() + "w";
                }
                else {
                    gold = Math.floor(gold / 1000000);
                    show_gold = Number(gold / 100).toString() + "y";
                }
            }
            else if (_type == 3) {
                if (gold == 0) {
                    show_gold = "0";
                }
                else if (gold < 100000000) {
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
    };
    GameData.assGold1 = function (_type, _gold) {
        //定义变量
        var show_gold = "";
        var gold = _gold;
        //数据赋值
        if (_gold != null) {
            if (_type == 0) {
                if (gold < 1000000) {
                    show_gold = gold.toString();
                }
                else {
                    gold = Math.floor(gold / 1000);
                    show_gold = Number(gold / 10).toString() + "万";
                }
            }
            else if (_type == 1) {
                if (gold < 100000000) {
                    show_gold = this.assGold(0, gold);
                }
                else {
                    gold = Math.floor(gold / 1000000);
                    show_gold = Number(gold / 100).toString() + "亿";
                }
            }
            else if (_type == 2) {
                if (gold == 0) {
                    show_gold = "0";
                }
                else if (gold < 100000000) {
                    gold = Math.floor(gold / 10000);
                    show_gold = gold.toString() + "万";
                }
                else {
                    gold = Math.floor(gold / 1000000);
                    show_gold = Number(gold / 100).toString() + "亿";
                }
            }
            else if (_type == 3) {
                if (gold == 0) {
                    show_gold = "0";
                }
                else if (gold < 100000000) {
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
    };
    //定义变量
    GameData.Game_Num = 6;
    GameData.Game_Type = -1;
    GameData.GameCard_NowShow = 0;
    GameData.Game_BeiLv = 10000;
    //过分游戏
    GameData.GF_RoomId = "";
    //庄数据
    GameData.Zhuang_Id = 0;
    GameData.Zhuang_VIP = 15;
    GameData.Zhuang_Name = "系统";
    GameData.Zhuang_Gold = 10000000000;
    GameData.Zhuang_Head = "icon_zhuanghead_png";
    GameData.JSYS_ZhuangList = [];
    GameData.Zhuang_Times = -1;
    GameData.JSYS_YaZhu_UserTotal = 0;
    GameData.JSYS_YaZhu_User = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    GameData.JSYS_YaZhu_Total = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    GameData.JSYS_YaZhu_User_Old = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    GameData.JSYS_Box_Beilv = [48, 24, 12, 8, 8, 6, 12, 8, 8, 6, 2, 2];
    GameData.JSYS_GenZhu_Detail = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    GameData.JSYS_GenZhu_Num = 0;
    GameData.EBG_YaZhu_UserTotal = 0;
    GameData.EBG_YaZhu_OtherTotal = 0;
    GameData.EBG_Poker_Table_IsWin = [];
    GameData.EBG_Poker_Table_Type = [1, 1, 1, 1];
    GameData.EBG_Poker_Table_InfoChip = [[], [], []];
    GameData.EBG_Poker_Table_Card = [[38, 5], [6, 41], [18, 4], [24, 55]];
    GameData.EBG_YaZhu_User_NowDetail = [[], [], []];
    GameData.EBG_YaZhu_User = [];
    GameData.EBG_YaZhu_Total = [];
    return GameData;
}());
__reflect(GameData.prototype, "GameData");
