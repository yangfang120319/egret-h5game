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
    EventNames.SHOW_FACE = "show_face";
    EventNames.SHOW_TIPS = "show_tips";
    EventNames.SHOW_START = "show_start";
    EventNames.GAME_LOGIN = "game_login";
    EventNames.GOLD_CHANGE = "gold_change";
    EventNames.DATA_CHANGE = "data_change";
    EventNames.SHOW_RANKING = "show_ranking";
    EventNames.SHOW_NOWCARD = "show_nowcard";
    EventNames.REMOVE_WAITING = "remove_waiting";
    EventNames.LOADING_PROGRESS = "loading_progress";
    EventNames.SHOW_USERMESSAGE = "show_usermessage";
    EventNames.SHOW_NEWACCOUNT = "show_newaccount";
    EventNames.SHOW_TOTALCHAT = "show_totalchat";
    EventNames.SHOW_CHAT = "show_chat";
    //过分游戏
    EventNames.GF_JOINROOM = "gf_joinroom";
    EventNames.GF_GAMEINFO = "gf_gameinfo";
    EventNames.GF_GAMEOVER = "gf_gameover";
    EventNames.GF_LEAVEROOM = "gf_leaveroom";
    //-----------金鲨银沙事件---------
    EventNames.JSYS_SHOWCHAT = "jsys_showchat";
    EventNames.JSYS_SHOWGOLD = "jsys_showgold";
    EventNames.JSYS_DELETECHAT = "jsys_deletechat";
    EventNames.JSYS_ADDBIAOQING = "jsys_addbiaoqing";
    EventNames.JSYS_SHOWBIAOQING = "jsys_showbiaoqing";
    //接口事件
    EventNames.JSYS_ERROR = "jsys_error";
    EventNames.JSYS_GAMEINFO = "jsys_gameinfo";
    EventNames.JSYS_HISTORY = "jsys_history";
    EventNames.JSYS_CHANGEZHUANG = "jsys_changezhuang";
    EventNames.JSYS_CHANGESTATUS = "jsys_changestatus";
    EventNames.JSYS_CHANGEYAZHU = "jsys_changeyazhu";
    EventNames.JSYS_USERYAZHU = "jsys_useryazhu";
    EventNames.JSYS_GAMEOPEN = "jsys_gameopen";
    EventNames.JSYS_GAMERESULT = "jsys_gameresult";
    EventNames.JSYS_ZHUANGLIST = "jsys_zhuanglist";
    EventNames.JSYS_SHOWWINBIG = "jsys_showwinbig";
    EventNames.JSYS_STARTGENZHU = "jsys_startgenzhu";
    EventNames.JSYS_BAOZHUANG = "jsys_baozhuang";
    //----------------二八杠----------------------
    //定义变量
    EventNames.EBG_SHOWGOLD = "ebg_showgold";
    EventNames.EBG_SHOWCHAT = "ebg_showchat";
    EventNames.EBG_DELETECHAT = "ebg_deletechat";
    EventNames.EBG_ADDBIAOQING = "ebg_addbiaoqing";
    EventNames.EBG_SHOWBIAOQING = "ebg_showbiaoqing";
    //接口事件
    EventNames.EBG_ERROR = "ebg_error";
    EventNames.EBG_GAMEINFO = "ebg_gameinfo";
    EventNames.EBG_CHANGEZHUANG = "ebg_changezhuang";
    EventNames.EBG_HISTORY = "ebg_history";
    EventNames.EBG_CHANGESTATUS = "ebg_changestatus";
    EventNames.EBG_CHANGEYAZHU = "ebg_changeyazhu";
    EventNames.EBG_USERYAZHU = "ebg_useryazhu";
    EventNames.EBG_GAMEOPEN = "ebg_gameopen";
    EventNames.EBG_GAMERESULT = "ebg_gameresult";
    EventNames.EBG_ZHUANGLIST = "ebg_zhuanglist";
    return EventNames;
}());
__reflect(EventNames.prototype, "EventNames");
