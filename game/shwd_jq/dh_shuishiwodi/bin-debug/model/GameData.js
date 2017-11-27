var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 *
 * @游戏全局变量
 *
 */
var GameData = (function () {
    function GameData() {
    }
    GameData.Player_List = [];
    GameData.Is_Show_Word = false;
    return GameData;
}());
__reflect(GameData.prototype, "GameData");
