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
    //夜市场事件
    EventNames.YSC_LOGIN = "ysc_login";
    EventNames.YSC_ERROR = "ysc_error";
    EventNames.YSC_History = "ysc_history";
    EventNames.YSC_GAMEINFO = "ysc_gameinfo";
    EventNames.YSC_USERYAZHU = "ysc_useryazhu";
    EventNames.YSC_GAMEOPEN = "ysc_gameopen";
    EventNames.YSC_GAMERESULT = "ysc_gameresult";
    EventNames.YSC_USERQIANGZHU = "ysc_userqiangzhu";
    EventNames.YSC_CHANGEYAZHU = "ysc_changeyazhu";
    EventNames.YSC_CHANGESTATUS = "ysc_changestatus";
    EventNames.YSC_SHOWGOLD = "ysc_showgold";
    EventNames.YSC_REMOVEBTN = "ysc_removebtn";
    EventNames.YSC_REGISTERBTN = "ysc_registerbtn";
    EventNames.YSC_SHOWOVERFACE = "ysc_show_overface";
    EventNames.YSC_HIDEOVERFACE = "ysc_hide_overface";
    EventNames.YSC_YAZHU_USER = "ysc_yazhu_user";
    EventNames.YSC_YAZHU_OTHER = "ysc_yazhu_other";
    EventNames.YSC_QIANGZHU_USER = "ysc_qiangzhu_user";
    EventNames.YSC_QIANGZHU_OTHER = "ysc_qiangzhu_Other";
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