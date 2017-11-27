var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 *
 * @场景名称
 *
 */
var SceneNames = (function () {
    function SceneNames() {
    }
    SceneNames.START = "start"; //开始
    SceneNames.LOADING = "loading"; //加载
    SceneNames.RANK = "rank"; //排行榜
    SceneNames.GAME = "game"; //游戏
    return SceneNames;
}());
__reflect(SceneNames.prototype, "SceneNames");
