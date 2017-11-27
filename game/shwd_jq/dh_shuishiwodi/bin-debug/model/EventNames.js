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
    EventNames.SHOW_TIPS = "show_tips";
    EventNames.SHOW_START = "show_start";
    EventNames.SHOW_RANKING = "show_ranking";
    EventNames.LOADING_PROGRESS = "loading_progress";
    EventNames.GAME_CONTENTSHOW = "game_contentshow";
    //游戏事件
    EventNames.SHOW_CHAT = "show_chat";
    EventNames.JOIN_ROOM = "join_room";
    EventNames.GAME_INFO = "game_info";
    EventNames.GAME_OVER = "game_over";
    EventNames.GAME_STATE = "game_state";
    EventNames.START_TIME = "start_time";
    return EventNames;
}());
__reflect(EventNames.prototype, "EventNames");
