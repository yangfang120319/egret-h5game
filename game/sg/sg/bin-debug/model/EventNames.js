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
    //三公事件
    EventNames.SG_LOGIN = "sg_login";
    EventNames.SG_ERROR = "sg_error";
    EventNames.SG_GAMEINFO = "sg_gameinfo";
    EventNames.SG_CHANGEZHUANG = "sg_changezhuang";
    EventNames.SG_HISTORY = "sg_history";
    EventNames.SG_USERYAZHU = "sg_useryazhu";
    EventNames.SG_GAMEOPEN = "sg_gameopen";
    EventNames.SG_GAMERUNOVER = "sg_gamerunover";
    EventNames.SG_CHANGEYAZHU = "sg_changeyazhu";
    EventNames.SG_GAMERESULT = "sg_gameresult";
    EventNames.SG_CHANGESTATUS = "sg_changestatus";
    EventNames.SG_SHOW_CARD = "sg_show_card";
    EventNames.SG_HIDE_CARD = "sg_hide_card";
    EventNames.SG_OPEN_CARD = "sg_open_card";
    EventNames.SG_SEND_CARDOVER = "sg_send_cardover";
    EventNames.SG_SHOW_CARDDETAIL = "sg_show_carddetail";
    EventNames.SG_SHOWOVER = "sg_showover";
    EventNames.SG_HIDEOVER = "sg_hideover";
    EventNames.SG_SHOWGOLD = "sg_showgold";
    EventNames.SG_SHOWOTHERTABLE = "sg_showothertable";
    EventNames.SG_ENTERROOM = "sg_enterroom";
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