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
 * @游戏麻将
 *
 */
var Game_Mahjong = (function (_super) {
    __extends(Game_Mahjong, _super);
    function Game_Mahjong() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.boo_isShow = false;
        return _this;
    }
    //初始化
    Game_Mahjong.prototype.createChildren = function () {
        _super.prototype.createChildren.call(this);
        //显示界面
        this.showMahjongFace();
    };
    //显示牌
    Game_Mahjong.prototype.showMahjong = function (_mahjongnum) {
        //数据赋值
        this.num_Mahjong_huase = 1;
        this.num_Mahjong_num = _mahjongnum;
        this.num_Mahjong_value = this.num_Mahjong_num % 16;
        //显示牌
        this.img_mahjong.source = "icon_mahjong" + this.num_Mahjong_huase + "_" + this.num_Mahjong_value + "_png";
    };
    //打开麻将
    Game_Mahjong.prototype.openMahjong = function () {
        //数据赋值
        this.boo_isShow = true;
        //显示界面
        this.showMahjongFace();
    };
    //开牌动画
    Game_Mahjong.prototype.openMahjongAction = function (_callback) {
        var _this = this;
        if (_callback === void 0) { _callback = null; }
        //定义变量
        var num_doudong_fudu = 1;
        //定义位置
        this.img_back.x = 0;
        this.img_back.y = 0;
        //显示动作
        this._tween_Mahjong = egret.Tween.get(this.img_back).to({ y: 5 }, 100).call(function () {
            //打开麻将
            _this.openMahjong();
            //定义位置
            _this.img_back.y = 0;
            //显示返回函数
            if (_callback) {
                //egret.setTimeout(_callback,this,500);
            }
        });
    };
    //停止动画
    Game_Mahjong.prototype.stopAction = function () {
        //停止缓动
        if (this._tween_Mahjong) {
            this._tween_Mahjong.setPaused(true);
            this._tween_Mahjong = null;
        }
    };
    //关闭麻将
    Game_Mahjong.prototype.closeMahjong = function () {
        //数据赋值
        this.boo_isShow = false;
        //显示界面
        this.showMahjongFace();
    };
    //显示状态
    Game_Mahjong.prototype.showMahjongFace = function () {
        //判断显示界面
        if (this.boo_isShow == true) {
            this.currentState = "open";
        }
        else if (this.boo_isShow == false) {
            this.currentState = "close";
        }
    };
    return Game_Mahjong;
}(eui.Component));
__reflect(Game_Mahjong.prototype, "Game_Mahjong");
//# sourceMappingURL=Game_Mahjong.js.map