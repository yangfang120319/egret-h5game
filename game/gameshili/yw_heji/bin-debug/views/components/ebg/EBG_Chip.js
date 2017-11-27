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
 * @筹码
 *
 */
var EBG_Chip = (function (_super) {
    __extends(EBG_Chip, _super);
    function EBG_Chip() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        //定义变量
        _this.arr_Chip = [];
        _this._tween_alpha = null;
        return _this;
    }
    //初始化
    EBG_Chip.prototype.createChildren = function () {
        _super.prototype.createChildren.call(this);
        //数据赋值
        for (var i = 0; i < 5; i++) {
            //定义变量
            var btn_chip = this["btn_chip" + i];
            //数据赋值
            this.arr_Chip[i] = btn_chip;
        }
        //注册按钮
        this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onThisBtn, this);
    };
    //初始化
    EBG_Chip.prototype.info = function () {
        //显示筹码
        this.showBtn();
        //开始动画
        if (this._tween_alpha) {
            this._tween_alpha.setPaused(false);
            this._tween_alpha = null;
        }
        else {
            this._tween_alpha = egret.Tween.get(this.img_choose, { loop: true }).
                wait(500).to({ alpha: 0.2 }, 1000).
                to({ alpha: 1 }, 500);
        }
    };
    //清除
    EBG_Chip.prototype.clean = function () {
        if (this._tween_alpha) {
            this._tween_alpha.setPaused(true);
        }
    };
    //显示按钮
    EBG_Chip.prototype.showBtn = function () {
        //当前显示
        var show_num = String(GameData.Game_BeiLv).length - 5;
        //判断显示按钮
        this.img_choose.x = -12.5 + 84 * show_num;
    };
    //按钮
    EBG_Chip.prototype.onThisBtn = function (e) {
        //数据赋值
        if (e.target.name != "") {
            //播放声音
            basic.SoundManager.instance.playEffect("sound_btn_mp3");
            //当前显示
            var show_num = String(GameData.Game_BeiLv).length - 5;
            //数据赋值
            if (show_num != Math.floor(e.target.name)) {
                //定义变量
                var now_beilv = "1";
                //数据赋值
                for (var i = 0; i < Math.floor(e.target.name) + 4; i++) {
                    now_beilv += "0";
                }
                GameData.Game_BeiLv = Number(now_beilv);
                //显示按钮
                this.showBtn();
            }
        }
    };
    return EBG_Chip;
}(eui.Component));
__reflect(EBG_Chip.prototype, "EBG_Chip");
