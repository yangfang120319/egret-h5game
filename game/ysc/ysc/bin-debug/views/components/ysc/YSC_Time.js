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
 * @夜市场-倒计时
 *
 */
var YSC_Time = (function (_super) {
    __extends(YSC_Time, _super);
    function YSC_Time() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.timer_timing = null;
        return _this;
    }
    //初始化
    YSC_Time.prototype.createChildren = function () {
        _super.prototype.createChildren.call(this);
        //注册事件
        basic.Dispatcher.addListener(EventNames.YSC_CHANGESTATUS, this.onChangeStatus, this);
    };
    //初始化
    YSC_Time.prototype.info = function (_status, _time) {
        if (_time === void 0) { _time = 0; }
        //数据赋值
        this.now_time = _time;
        GameData.YSC_Game_Status = _status;
        //显示界面
        this.jugeShowFace();
    };
    //清除
    YSC_Time.prototype.clean = function () {
        //判断结束
        if (this.timer_timing) {
            this.timer_timing.stop();
            this.timer_timing.removeEventListener(basic.TimerEvent.TIMER, this.onTiming, this);
            this.timer_timing.removeEventListener(basic.TimerEvent.TIMER_COMPLETE, this.onTimingComplete, this);
            this.timer_timing = null;
        }
    };
    //改变状态
    YSC_Time.prototype.onChangeStatus = function (e) {
        //数据赋值
        this.now_time = e.data.leftTime;
        GameData.YSC_Game_Status = e.data.status;
        //显示界面
        this.jugeShowFace();
    };
    //显示界面
    YSC_Time.prototype.jugeShowFace = function () {
        //判断显示界面
        if (GameData.YSC_Game_Status == 0) {
            //显示图片
            this.img_name.x = 10;
            this.txt_time.visible = true;
            this.img_name.source = "txt_ysc_ddsj_ch_png";
            //开始计时
            this.startTime();
            //注销按钮
            basic.Dispatcher.dispatch(EventNames.YSC_REMOVEBTN);
        }
        else if (GameData.YSC_Game_Status == 1) {
            //数据赋值
            this.now_time = this.now_time - 2;
            //显示图片
            this.img_name.x = 10;
            this.txt_time.visible = true;
            this.img_name.source = "txt_ysc_xzsj_ch_png";
            //开始计时
            this.startTime();
            //注册按钮
            basic.Dispatcher.dispatch(EventNames.YSC_REGISTERBTN);
        }
        else if (GameData.YSC_Game_Status == 2) {
            //显示图片
            this.img_name.x = 90;
            this.txt_time.visible = false;
            this.img_name.source = "txt_ysc_kjz_ch_png";
            //注销按钮
            basic.Dispatcher.dispatch(EventNames.YSC_REMOVEBTN);
        }
        else if (GameData.YSC_Game_Status == 3) {
            //显示图片
            this.img_name.x = 90;
            this.txt_time.visible = false;
            this.img_name.source = "txt_ysc_jsz_ch_png";
            //注销按钮
            basic.Dispatcher.dispatch(EventNames.YSC_REMOVEBTN);
        }
    };
    //开始计时
    YSC_Time.prototype.startTime = function () {
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
    YSC_Time.prototype.onTiming = function (e) {
        //数据赋值
        this.now_time -= 1;
        //显示时间
        this.txt_time.text = this.assShowTime(this.now_time);
        //判断播放声音
        if (GameData.YSC_Game_Status == 1 && this.now_time == 0) {
            //数据赋值
            GameData.YSC_Game_Status = 2;
            //注销按钮
            basic.Dispatcher.dispatch(EventNames.YSC_REMOVEBTN);
            //播放声音
            basic.SoundManager.instance.playEffect("sound_g_yazhuover_mp3");
        }
    };
    //计时结束
    YSC_Time.prototype.onTimingComplete = function (e) {
        //判断结束
        if (this.timer_timing) {
            this.timer_timing.stop();
            this.timer_timing.removeEventListener(basic.TimerEvent.TIMER, this.onTiming, this);
            this.timer_timing.removeEventListener(basic.TimerEvent.TIMER_COMPLETE, this.onTimingComplete, this);
            this.timer_timing = null;
        }
    };
    //时间显示文本赋值
    YSC_Time.prototype.assShowTime = function (_time) {
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
    return YSC_Time;
}(eui.Component));
__reflect(YSC_Time.prototype, "YSC_Time");
//# sourceMappingURL=YSC_Time.js.map