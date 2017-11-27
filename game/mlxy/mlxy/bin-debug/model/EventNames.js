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
    //马来西亚银行事件
    EventNames.MLXYYH_LOGIN = "mlxyyh_login";
    EventNames.MLXYYH_ERROR = "mlxyyh_error";
    EventNames.MLXYYH_GAMEINFO = "mlxyyh_gameinfo";
    EventNames.MLXYYH_HISTORY = "mlxyyh_history";
    EventNames.MLXYYH_USERYAZHU = "mlxyyh_useryazhu";
    EventNames.MLXYYH_GAMEOPEN = "mlxyyh_gameopen";
    EventNames.MLXYYH_CHANGEYAZHU = "mlxyyh_changeyazhu";
    EventNames.MLXYYH_GAMERESULT = "mlxyyh_gameresult";
    EventNames.MLXYYH_CHANGESTATUS = "mlxyyh_changestatus";
    EventNames.MLXYYH_REMOVEBTN = "mlxyyh_removebtn";
    EventNames.MLXYYH_SHOW_BOXLIGHT = "mlxyyh_show_boxlight";
    EventNames.MLXYYH_CHANGE_GOLD = "mlxyyh_change_gold";
    EventNames.MLXYYH_RUNOVER = "mlxyyh_runover";
    EventNames.MLXYYH_HIDEPK = "mlxyyh_hidepk";
    EventNames.MLXYYH_HIDEMENU = "mlxyyh_hidemenu";
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