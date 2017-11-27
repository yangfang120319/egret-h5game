var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
/**
 *
 * @马来西亚银行-历史记录+时间
 *
 */
var MLXYYH_History = (function (_super) {
    __extends(MLXYYH_History, _super);
    function MLXYYH_History() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.timer_timing = null;
        _this.history = [];
        return _this;
    }
    //初始化
    MLXYYH_History.prototype.createChildren = function () {
        _super.prototype.createChildren.call(this);
        //数据复制
        for (var i = 0; i < 20; i++) {
            //定义变量
            var img = this["history" + i];
            //数据赋值
            this.history[i] = img;
            this.history[i].source = "";
        }
        //注册事件
        basic.Dispatcher.addListener(EventNames.MLXYYH_HISTORY, this.onShowHistory, this);
        basic.Dispatcher.addListener(EventNames.MLXYYH_CHANGESTATUS, this.onChangeStatus, this);
    };
    //初始化
    MLXYYH_History.prototype.info = function (_status, _time) {
        //判断显示界面
        this.now_time = _time;
        GameData.MLXYYH_Game_Status = _status;
        //显示界面
        this.jugeShowFace();
    };
    //清除
    MLXYYH_History.prototype.clean = function () {
        //判断结束
        if (this.timer_timing) {
            this.timer_timing.stop();
            this.timer_timing.removeEventListener(basic.TimerEvent.TIMER, this.onTiming, this);
            this.timer_timing.removeEventListener(basic.TimerEvent.TIMER_COMPLETE, this.onTimingComplete, this);
            this.timer_timing = null;
        }
    };
    //显示历史记录
    MLXYYH_History.prototype.onShowHistory = function (e) {
        //清除界面
        for (var j = 0; j < 20; j++) {
            this.history[j].source = "";
        }
        //显示界面
        for (var i = 0; i < Math.min(20, e.data.historys.length); i++) {
            //显示图片
            this.history[i].source = "icon_mlxyyh_" + e.data.historys[i] + "_0_png";
        }
    };
    //改变状态
    MLXYYH_History.prototype.onChangeStatus = function (e) {
        //数据赋值
        this.now_time = e.data.leftTime;
        GameData.MLXYYH_Game_Status = e.data.status;
        //显示界面
        this.jugeShowFace();
    };
    //显示界面
    MLXYYH_History.prototype.jugeShowFace = function () {
        //判断显示
        if (GameData.MLXYYH_Game_Status == 0) {
            this.txt_time.visible = false;
            this.img_type.visible = true;
            this.img_type.source = "txt_mlxyyh_ddxz_ch_png";
            //发送消息
            basic.Dispatcher.dispatch(EventNames.GAME_SHOW_WAITING);
        }
        else if (GameData.MLXYYH_Game_Status == 1) {
            //数据赋值
            this.now_time = this.now_time - 2;
            //显示界面
            this.txt_time.visible = true;
            this.img_type.visible = false;
            //开始计时
            this.startTime();
            //发送消息
            basic.Dispatcher.dispatch(EventNames.GAME_Hide_WAITING);
        }
        else if (GameData.MLXYYH_Game_Status == 2) {
            this.txt_time.visible = false;
            this.img_type.visible = true;
            this.img_type.source = "txt_mlxyyh_kjz_ch_png";
            //发送消息
            basic.Dispatcher.dispatch(EventNames.GAME_Hide_WAITING);
        }
        else if (GameData.MLXYYH_Game_Status == 3) {
            //显示界面
            this.txt_time.visible = false;
            this.img_type.visible = true;
            this.img_type.source = "txt_mlxyyh_jsz_ch_png";
            //发送消息
            basic.Dispatcher.dispatch(EventNames.GAME_Hide_WAITING);
        }
    };
    //开始计时
    MLXYYH_History.prototype.startTime = function () {
        //判断结束
        if (this.timer_timing) {
            this.timer_timing.stop();
            this.timer_timing.removeEventListener(basic.TimerEvent.TIMER, this.onTiming, this);
            this.timer_timing.removeEventListener(basic.TimerEvent.TIMER_COMPLETE, this.onTimingComplete, this);
            this.timer_timing = null;
        }
        //显示时间
        this.txt_time.text = this.assShowTime(this.now_time);
        //开始计时
        this.timer_timing = new basic.Timer(1000, this.now_time);
        this.timer_timing.addEventListener(basic.TimerEvent.TIMER, this.onTiming, this);
        this.timer_timing.addEventListener(basic.TimerEvent.TIMER_COMPLETE, this.onTimingComplete, this);
        this.timer_timing.start();
    };
    //计时中
    MLXYYH_History.prototype.onTiming = function (e) {
        //数据赋值
        this.now_time -= 1;
        //发送消息
        if (this.now_time < 6 && GameData.MLXYYH_Game_Status == 1) {
            basic.Dispatcher.dispatch(EventNames.GAME_SHOW_COUNTDOWN, { "nownum": this.now_time });
        }
        //显示时间
        this.txt_time.text = this.assShowTime(this.now_time);
        //判断播放声音
        if (GameData.MLXYYH_Game_Status == 1 && this.now_time == 0) {
            //数据赋值
            GameData.MLXYYH_Game_Status = 2;
            //隐藏菜单
            basic.Dispatcher.dispatch(EventNames.MLXYYH_HIDEMENU);
            //注销按钮
            basic.Dispatcher.dispatch(EventNames.MLXYYH_REMOVEBTN);
        }
    };
    //计时结束
    MLXYYH_History.prototype.onTimingComplete = function (e) {
        //判断结束
        if (this.timer_timing) {
            this.timer_timing.stop();
            this.timer_timing.removeEventListener(basic.TimerEvent.TIMER, this.onTiming, this);
            this.timer_timing.removeEventListener(basic.TimerEvent.TIMER_COMPLETE, this.onTimingComplete, this);
            this.timer_timing = null;
        }
    };
    //时间显示文本赋值
    MLXYYH_History.prototype.assShowTime = function (_time) {
        //定义变量
        var showtime;
        var time_minute;
        var time_second;
        //数据赋值
        time_second = _time % 60;
        time_minute = Math.floor(_time / 60);
        if (time_minute < 10) {
            showtime = "0" + time_minute.toString();
        }
        else {
            showtime = time_minute.toString();
        }
        if (time_second < 10) {
            showtime += "&0" + time_second.toString();
        }
        else {
            showtime += "&" + time_second.toString();
        }
        return showtime;
    };
    return MLXYYH_History;
}(eui.Component));
__reflect(MLXYYH_History.prototype, "MLXYYH_History");
//# sourceMappingURL=MLXYYH_History.js.map