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
 * @夜市场-结算
 *
 */
var YSC_Over = (function (_super) {
    __extends(YSC_Over, _super);
    function YSC_Over() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.txt_yazhu = [];
        _this.txt_qiang = [];
        return _this;
    }
    //初始化
    YSC_Over.prototype.createChildren = function () {
        _super.prototype.createChildren.call(this);
        //数据赋值
        for (var i = 0; i < 4; i++) {
            //定义变量
            var yazhu = this["txt_yazhu" + i];
            var qiang = this["txt_qiang" + i];
            //数据赋值
            this.txt_yazhu[i] = yazhu;
            this.txt_qiang[i] = qiang;
        }
    };
    //初始化界面
    YSC_Over.prototype.info = function () {
        //定义变量
        var win_gold = 0;
        var rate_zoom = 1;
        if (basic.StageProxy.width < 1000) {
            rate_zoom = 0.8 + 0.2 * (basic.StageProxy.width - 830) / 170;
        }
        //显示界面
        this.g_detail.scaleX = rate_zoom;
        this.g_detail.scaleY = rate_zoom;
        //显示文本
        for (var i = 0; i < 4; i++) {
            //判断数据赋值
            if (i == GameData.YSC_RUN_OVER) {
                win_gold += GameData.YSC_YaZhu_User[i] * 3 - GameData.YSC_QiangZhu_User[i] * 3;
            }
            else {
                win_gold += GameData.YSC_QiangZhu_User[i] * 0.99 - GameData.YSC_YaZhu_User[i];
            }
            //判断显示
            this.txt_yazhu[i].text = GameData.assShowGold(GameData.YSC_YaZhu_User[i]);
            this.txt_qiang[i].text = GameData.assShowGold(GameData.YSC_QiangZhu_User[i]);
        }
        //判断显示
        if (win_gold < 0) {
            this.txt_total.text = "-" + GameData.assShowGold(-win_gold);
        }
        else {
            this.txt_total.text = GameData.assShowGold(win_gold);
        }
        //显示钩子
        this.com_hook.alpha = 0;
        this.com_hook.scaleX = 5;
        this.com_hook.scaleY = 5;
        this.com_hook.x = 205 + GameData.YSC_RUN_OVER * 190;
        //显示动画
        var _tween_alpha = egret.Tween.get(this.com_hook).to({ alpha: 1 }, 200);
        var _tween_scaleX = egret.Tween.get(this.com_hook).wait(200).to({ scaleX: 1 }, 200);
        var _tween_scaleY = egret.Tween.get(this.com_hook).wait(200).to({ scaleY: 1 }, 200);
        //判断播放是声音
        if (win_gold < 0) {
            //播放声音
            basic.SoundManager.instance.playEffect("sound_g_fail_mp3");
        }
        else {
            //播放声音
            basic.SoundManager.instance.playEffect("sound_g_win" + Math.floor(Math.random() * 2 + 1).toString() + "_mp3");
        }
    };
    return YSC_Over;
}(eui.Component));
__reflect(YSC_Over.prototype, "YSC_Over");
//# sourceMappingURL=YSC_Over.js.map