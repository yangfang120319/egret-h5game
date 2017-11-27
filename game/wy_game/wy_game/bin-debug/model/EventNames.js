var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 *
 * @事件名称
 *
 */
var EventNames = (function () {
    function EventNames() {
    }
    //界面事件
    EventNames.LOAD_PART = "load_part";
    EventNames.LOADING_PROGRESS = "loading_progress";
    return EventNames;
}());
__reflect(EventNames.prototype, "EventNames");
//# sourceMappingURL=EventNames.js.map