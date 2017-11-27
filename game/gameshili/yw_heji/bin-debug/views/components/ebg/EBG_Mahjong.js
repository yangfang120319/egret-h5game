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
 * @二八杠麻将
 *
 */
var EBG_Mahjong = (function (_super) {
    __extends(EBG_Mahjong, _super);
    function EBG_Mahjong() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.boo_isShow = false;
        return _this;
    }
    //初始化
    EBG_Mahjong.prototype.createChildren = function () {
        _super.prototype.createChildren.call(this);
        //显示界面
        this.showMahjongFace();
    };
    //显示牌
    EBG_Mahjong.prototype.showMahjong = function (_mahjongnum) {
        //数据赋值
        this.num_Mahjong_huase = 1;
        this.num_Mahjong_num = _mahjongnum;
        this.num_Mahjong_value = this.num_Mahjong_num % 16;
        //显示牌
        this.img_mahjong.source = "icon_mahjong" + this.num_Mahjong_huase + "_" + this.num_Mahjong_value + "_png";
    };
    //打开麻将
    EBG_Mahjong.prototype.openMahjong = function () {
        //数据赋值
        this.boo_isShow = true;
        //显示界面
        this.showMahjongFace();
    };
    //开牌动画
    EBG_Mahjong.prototype.openMahjongAction = function (_callback) {
        var _this = this;
        if (_callback === void 0) { _callback = null; }
        //定义变量
        var num_doudong_fudu = 1;
        //定义位置
        this.img_back.x = 0;
        this.img_back.y = 0;
        //播放声音
        basic.SoundManager.instance.playEffect("sound_ebg_openmahjong_mp3");
        //显示动作
        this._tween_Mahjong = egret.Tween.get(this.img_back).to({ y: 5 }, 100).call(function () {
            //打开麻将
            _this.openMahjong();
            //定义位置
            _this.img_back.y = 0;
            //显示返回函数
            if (_callback) {
                egret.setTimeout(_callback, _this, 500);
            }
        });
    };
    //停止动画
    EBG_Mahjong.prototype.stopAction = function () {
        //停止缓动
        if (this._tween_Mahjong) {
            this._tween_Mahjong.setPaused(true);
            this._tween_Mahjong = null;
        }
    };
    //关闭麻将
    EBG_Mahjong.prototype.closeMahjong = function () {
        //数据赋值
        this.boo_isShow = false;
        //显示界面
        this.showMahjongFace();
    };
    //显示状态
    EBG_Mahjong.prototype.showMahjongFace = function () {
        //判断显示界面
        if (this.boo_isShow == true) {
            this.currentState = "open";
        }
        else if (this.boo_isShow == false) {
            this.currentState = "close";
        }
    };
    return EBG_Mahjong;
}(eui.Component));
__reflect(EBG_Mahjong.prototype, "EBG_Mahjong");
