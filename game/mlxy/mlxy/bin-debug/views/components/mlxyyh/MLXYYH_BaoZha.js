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
 * @马来西亚银行
 *
 */
var MLXYYH_BaoZha = (function (_super) {
    __extends(MLXYYH_BaoZha, _super);
    function MLXYYH_BaoZha() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.timer_action = null;
        return _this;
    }
    //初始化
    MLXYYH_BaoZha.prototype.createChildren = function () {
        _super.prototype.createChildren.call(this);
    };
    //开始动画
    MLXYYH_BaoZha.prototype.start = function () {
        //清空
        this.clean();
        //显示界面
        this.now_action = 0;
        //播放声音
        basic.SoundManager.instance.playEffect("sound_mlxyyh_zha_mp3");
        //显示图片
        this.img_bao1.source = "icon_mlxyyh_bz" + this.now_action.toString() + "_png";
        //显示动画
        this.timer_action = new egret.Timer(70, 7);
        this.timer_action.addEventListener(egret.TimerEvent.TIMER, this.showActionSpecialTimer, this);
        this.timer_action.addEventListener(egret.TimerEvent.TIMER_COMPLETE, this.showActionSpecialComplete, this);
        this.timer_action.start();
    };
    //动作显示
    MLXYYH_BaoZha.prototype.showActionSpecialTimer = function (e) {
        //数据赋值
        this.now_action += 1;
        //判断显示图片
        if (this.now_action < 5) {
            //显示图片
            this.img_bao1.source = "icon_mlxyyh_bz" + this.now_action.toString() + "_png";
        }
        if (this.now_action >= 2 && this.now_action < 8) {
            //显示图片
            this.img_bao2.source = "icon_mlxyyh_bao" + Number(this.now_action - 2).toString() + "_png";
        }
    };
    //动画结束
    MLXYYH_BaoZha.prototype.showActionSpecialComplete = function (e) {
        //停止
        if (this.timer_action) {
            this.timer_action.stop();
            this.timer_action.removeEventListener(egret.TimerEvent.TIMER, this.showActionSpecialTimer, this);
            this.timer_action.removeEventListener(egret.TimerEvent.TIMER_COMPLETE, this.showActionSpecialComplete, this);
            this.timer_action = null;
        }
        //清空
        this.clean();
    };
    //清空
    MLXYYH_BaoZha.prototype.clean = function () {
        //清空图片
        this.img_bao1.source = "";
        this.img_bao2.source = "";
    };
    return MLXYYH_BaoZha;
}(eui.Component));
__reflect(MLXYYH_BaoZha.prototype, "MLXYYH_BaoZha");
//# sourceMappingURL=MLXYYH_BaoZha.js.map