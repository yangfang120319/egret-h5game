var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 *
 * @游戏界面
 *
 */
var GameData = (function () {
    function GameData() {
    }
    //保存当前金币
    GameData.saveNowChip = function () {
        //保存数据
        basic.localStorage.setItem('nowChip', GameData.Game_Chip_Now.toString());
    };
    //保存选择筹码
    GameData.saveChooseChip = function () {
        //保存数据
        basic.localStorage.setItem('ChooseChip', GameData.Game_Chip_Gold.toString());
    };
    //显示金币文本
    GameData.assShowGold = function (_gold) {
        //定义变量
        var show_gold;
        //判断显示
        if (_gold % 1000 == 0 && _gold > 0) {
            show_gold = Math.floor(_gold / 1000).toString() + "k";
        }
        else {
            show_gold = _gold.toString();
        }
        return show_gold;
    };
    //定义界面
    GameData.Game_Id = 1;
    GameData.Game_Type = 0;
    GameData.HongBaoRain_Data = [];
    GameData.Game_Chip_Gold = []; //筹码金币
    GameData.Game_Chip = [100, 500, 1000, 2500, 5000, 10000, 25000, 50000, 100000]; //游戏筹码
    //-------------------三公-----------------------
    GameData.SG_YaZhu_UserTotal = 0;
    GameData.SG_Poker_Table_Card = [[38, 5], [6, 41], [18, 4], [24, 55], [24, 55]];
    GameData.SG_Poker_Table_Type = [1, 1, 1, 1, 1];
    GameData.SG_Poker_Table_IsWin = [];
    GameData.SG_YaZhu_User = [];
    GameData.SG_YaZhu_Total = [];
    GameData.SG_YaZhu_User_Now = [];
    GameData.SG_YaZhu_User_NowDetail = [[], [], [], [], []];
    return GameData;
}());
__reflect(GameData.prototype, "GameData");
//# sourceMappingURL=GameData.js.map