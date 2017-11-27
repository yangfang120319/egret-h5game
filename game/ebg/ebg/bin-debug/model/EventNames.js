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
    EventNames.SHOW_LOGINTIPS = "show_logintips";
    EventNames.SHOW_START = "show_start";
    EventNames.LOADING_PROGRESS = "loading_progress";
    EventNames.ZHUANG_UP_LIST = "zhuang_up_list";
    EventNames.SHOW_HONGBAORAIN = "show_hongbaorain";
    EventNames.SHOW_HONGBAO = "show_hongbao";
    EventNames.DATA_CHANGE = "data_change";
    EventNames.GOLD_CHANGE = "gold_change";
    EventNames.CHANGE_USERSTATE = "change_userstate";
    EventNames.START_SHUAXIN = "start_shuaxin";
    EventNames.SHOW_USERMESSAGE = "show_usermessage";
    //二八杠事件
    EventNames.EBG_LOGIN = "ebg_login";
    EventNames.EBG_ERROR = "ebg_error";
    EventNames.EBG_GAMEINFO = "ebg_gameinfo";
    EventNames.EBG_CHANGEZHUANG = "ebg_changezhuang";
    EventNames.EBG_HISTORY = "ebg_history";
    EventNames.EBG_USERYAZHU = "ebg_useryazhu";
    EventNames.EBG_GAMEOPEN = "ebg_gameopen";
    EventNames.EBG_GAMERUNOVER = "ebg_gamerunover";
    EventNames.EBG_CHANGEYAZHU = "ebg_changeyazhu";
    EventNames.EBG_GAMERESULT = "ebg_gameresult";
    EventNames.EBG_CHANGESTATUS = "ebg_changestatus";
    EventNames.EBG_SHOW_MAHJONG = "ebg_show_mahjong";
    EventNames.EBG_HIDE_MAHJONG = "ebg_hide_mahjong";
    EventNames.EBG_OPEN_MAHJONG = "ebg_open_mahjong";
    EventNames.EBG_SEND_MAHJONGOVER = "ebg_send_mahjongover";
    EventNames.EBG_SHOW_MAHJONGDETAIL = "ebg_show_mahjongdetail";
    EventNames.EBG_SHOWOVER = "ebg_showover";
    EventNames.EBG_HIDEOVER = "ebg_hideover";
    EventNames.EBG_SHOWGOLD = "ebg_showgold";
    EventNames.EBG_SHOWOTHERTABLE = "ebg_showothertable";
    EventNames.EBG_ENTERROOM = "ebg_enterroom";
    //游戏事件
    EventNames.GAME_SHOW_USERYAZHU = "game_show_useryazhu";
    EventNames.GAME_SHOW_OHTERYAZHU = "game_show_otheryazhu";
    EventNames.GAME_SHOW_WAITING = "game_show_waiting";
    EventNames.GAME_Hide_WAITING = "game_hide_waiting";
    EventNames.GAME_SHOW_COUNTDOWN = "game_show_countdown";
    return EventNames;
}());
__reflect(EventNames.prototype, "EventNames");
//# sourceMappingURL=EventNames.js.map