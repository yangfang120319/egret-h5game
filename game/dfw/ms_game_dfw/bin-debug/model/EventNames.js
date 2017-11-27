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
    EventNames.LOGIN = "login";
    EventNames.SHOW_TIPS = "show_tips";
    EventNames.SHOW_START = "show_start";
    EventNames.DATA_CHANGE = "data_change";
    EventNames.LOADING_PROGRESS = "loading_progress";
    //游戏事件
    EventNames.GET_ROOMID = "get_roomid";
    EventNames.JOIN_ROOM = "join_room";
    EventNames.GAME_INFO = "game_info";
    EventNames.GAME_OVER = "game_over";
    EventNames.GAME_START = "game_start";
    EventNames.SHOW_REMAIN = "show_remain";
    EventNames.CHANGE_STATUS = "change_status";
    EventNames.SHOW_TIPSTIMES = "show_tipstimes";
    EventNames.PREVENT_ACTION = "prevent_action";
    EventNames.SHOW_PLAYERLIST = "show_playerlist";
    EventNames.SHOW_PREVENTBTN = 'show_preventbtn';
    EventNames.HIDE_PREVENTBTN = "hide_preventbtn";
    return EventNames;
}());
__reflect(EventNames.prototype, "EventNames");
//# sourceMappingURL=EventNames.js.map