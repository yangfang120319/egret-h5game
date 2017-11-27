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
    GameData.Room_Id = -1;
    GameData.Shop_Url = "https://mp.yile.vip/yile/my/payment.htm";
    GameData.Is_Show_Waiting = false;
    GameData.Is_Test = false;
    GameData.is_connect = false;
    GameData.heart_beat_time = null;
    GameData.is_start = false;
    GameData.is_first_activate = true;
    GameData.player_num = 8;
    GameData.player_id = [1, 2, 3, 4, 5, 6, 7, 8];
    GameData.player_sex = [0, 1, 0, 1, 0, 1, 0, 1];
    GameData.player_name = ["测试1", "测试2", "测试3", "测试4", "测试5", "测试6", "测试7", "测试8"];
    GameData.player_head = ["", "", "", "", "", "", "", ""];
    GameData.player_place = [0, 0, 0, 0, 0, 0, 0, 0];
    GameData.player_now = 0;
    GameData.tips_num = [0, 0, 0];
    GameData.jl_dj_num = 0;
    GameData.rate_num = 3;
    return GameData;
}());
__reflect(GameData.prototype, "GameData");
//# sourceMappingURL=GameData.js.map