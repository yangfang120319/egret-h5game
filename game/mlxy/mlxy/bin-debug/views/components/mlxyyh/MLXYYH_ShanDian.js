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
 马来西亚银行闪电
 *
 */
var MLXYYH_ShanDian = (function (_super) {
    __extends(MLXYYH_ShanDian, _super);
    function MLXYYH_ShanDian() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.timer_action = null;
        return _this;
    }
    //初始化
    MLXYYH_ShanDian.prototype.createChildren = function () {
        _super.prototype.createChildren.call(this);
    };
    //开始动画
    MLXYYH_ShanDian.prototype.start = function (_times, _sound) {
        if (_times === void 0) { _times = 1; }
        if (_sound === void 0) { _sound = 0; }
        //清空
        this.clean();
        //显示界面
        this.now_times = 0;
        this.now_action = -1;
        this.show_sound = _sound;
        this.play_times = _times;
        //播放声音
        if (this.show_sound == 1) {
            basic.SoundManager.instance.playEffect("sound_mlxyyh_shandian_mp3");
        }
        //显示图片
        this.img_shan.source = "icon_mlxyyh_sd0_png";
        //显示动画
        this.timer_action = new egret.Timer(50, 16);
        this.timer_action.addEventListener(egret.TimerEvent.TIMER, this.showActionSpecialTimer, this);
        this.timer_action.addEventListener(egret.TimerEvent.TIMER_COMPLETE, this.showActionSpecialComplete, this);
        this.timer_action.start();
    };
    //动作显示
    MLXYYH_ShanDian.prototype.showActionSpecialTimer = function (e) {
        //数据赋值
        this.now_action += 1;
        //显示图片
        this.img_shan.source = "icon_mlxyyh_sd" + this.now_action.toString() + "_png";
    };
    //动画结束
    MLXYYH_ShanDian.prototype.showActionSpecialComplete = function (e) {
        //停止
        if (this.timer_action) {
            this.timer_action.stop();
            this.timer_action.removeEventListener(egret.TimerEvent.TIMER, this.showActionSpecialTimer, this);
            this.timer_action.removeEventListener(egret.TimerEvent.TIMER_COMPLETE, this.showActionSpecialComplete, this);
            this.timer_action = null;
        }
        //数据赋值
        this.now_times += 1;
        //判断显示
        if (this.now_times < this.play_times) {
            //显示界面
            this.now_action = -1;
            //显示图片
            this.img_shan.source = "icon_mlxyyh_sd0_png";
            //播放声音
            if (this.show_sound == 1) {
                basic.SoundManager.instance.playEffect("sound_mlxyyh_shandian_mp3");
            }
            //显示动画
            this.timer_action = new egret.Timer(60, 16);
            this.timer_action.addEventListener(egret.TimerEvent.TIMER, this.showActionSpecialTimer, this);
            this.timer_action.addEventListener(egret.TimerEvent.TIMER_COMPLETE, this.showActionSpecialComplete, this);
            this.timer_action.start();
        }
        else {
            //清空
            this.clean();
        }
    };
    //清空
    MLXYYH_ShanDian.prototype.clean = function () {
        this.img_shan.source = "";
    };
    return MLXYYH_ShanDian;
}(eui.Component));
__reflect(MLXYYH_ShanDian.prototype, "MLXYYH_ShanDian");
//# sourceMappingURL=MLXYYH_ShanDian.js.map