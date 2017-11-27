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
    SceneNames.SHOP = "shop"; //商店
    SceneNames.START = "start"; //开始
    SceneNames.ABOUT = "about"; //关于
    SceneNames.WAITING = "waiting"; //等待
    SceneNames.CUSTOM = "custom"; //客服
    SceneNames.CLAUSE = "clause"; //服务条款
    SceneNames.LOADING = "loading"; //加载
    SceneNames.SAVEBOX = "savebox"; //保险箱
    SceneNames.RANKING = "ranking"; //排行榜
    SceneNames.GUOFEN = "guofen"; //过分游戏
    SceneNames.GAME_EBG = "game_ebg"; //二八杠
    SceneNames.GAME_JSYS = "game_jsys"; //金鲨银沙
    return SceneNames;
}());
__reflect(SceneNames.prototype, "SceneNames");
