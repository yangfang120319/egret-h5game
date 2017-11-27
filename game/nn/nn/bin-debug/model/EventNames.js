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
    //牛牛事件
    EventNames.NN_LOGIN = "nn_login";
    EventNames.NN_ERROR = "nn_error";
    EventNames.NN_GAMEINFO = "nn_gameinfo";
    EventNames.NN_CHANGEZHUANG = "nn_changezhuang";
    EventNames.NN_HISTORY = "nn_history";
    EventNames.NN_USERYAZHU = "nn_useryazhu";
    EventNames.NN_GAMEOPEN = "nn_gameopen";
    EventNames.NN_GAMERUNOVER = "nn_gamerunover";
    EventNames.NN_CHANGEYAZHU = "nn_changeyazhu";
    EventNames.NN_GAMERESULT = "nn_gameresult";
    EventNames.NN_CHANGESTATUS = "nn_changestatus";
    EventNames.NN_SHOW_CARD = "nn_show_card";
    EventNames.NN_HIDE_CARD = "nn_hide_card";
    EventNames.NN_OPEN_CARD = "nn_open_card";
    EventNames.NN_SEND_CARDOVER = "nn_send_cardover";
    EventNames.NN_SHOW_CARDDETAIL = "nn_show_carddetail";
    EventNames.NN_SHOWOVER = "nn_showover";
    EventNames.NN_HIDEOVER = "nn_hideover";
    EventNames.NN_SHOWGOLD = "nn_showgold";
    EventNames.NN_SHOWOTHERTABLE = "nn_showothertable";
    EventNames.NN_ENTERROOM = "nn_enterroom";
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