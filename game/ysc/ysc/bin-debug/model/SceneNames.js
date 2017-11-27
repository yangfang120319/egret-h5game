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
    SceneNames.SCENEGAME_YSC = "scenegame_ysc"; //夜市场
    SceneNames.WAITING = "waiting"; //夜市场
    return SceneNames;
}());
__reflect(SceneNames.prototype, "SceneNames");
//# sourceMappingURL=SceneNames.js.map