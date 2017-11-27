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
 * @author
 *
 */
var Game_Card = (function (_super) {
    __extends(Game_Card, _super);
    //初始化
    function Game_Card() {
        var _this = _super.call(this) || this;
        _this.boo_isShow = false;
        _this.num_opencard_speed = 200;
        //定义皮肤
        _this.skinName = Game_CardSkin;
        //显示界面
        _this.showCardFace();
        return _this;
    }
    //显示牌
    Game_Card.prototype.showCard = function (cardnum) {
        try {
            //隐藏界面
            this.rect_delete.visible = false;
            this.img_value_new.visible = false;
            this.img_huasexiao.visible = true;
            //数据赋值
            this.num_cardnum = cardnum;
            //显示界面
            if (this.num_cardnum < 62) {
                //数据赋值
                this.num_card_huase = 3 - Math.floor(this.num_cardnum / 16);
                this.num_card_value = Math.floor(this.num_cardnum % 16);
                //判断显示
                if (this.num_card_huase % 2 == 0) {
                    this.img_value.source = "num_g_b_" + this.num_card_value + "_png";
                }
                else {
                    this.img_value.source = "num_g_r_" + this.num_card_value + "_png";
                }
                this.img_huaseda.source = "icon_g_da_pai" + this.num_card_huase + "_png";
                this.img_huasexiao.source = "icon_g_xiao_pai" + this.num_card_huase + "_png";
                //定义位置
                this.img_value.x = 6;
                this.img_huaseda.y = 65;
            }
            else if (this.num_cardnum == 62) {
                //数据复制
                this.num_card_huase = 4;
                this.num_card_value = 14;
                //显示图片
                this.img_huasexiao.source = "";
                this.img_value.source = "num_g_b_14_png";
                this.img_huaseda.source = "icon_g_da_pai4_png";
                //定义位置
                this.img_value.x = 10;
                this.img_huaseda.y = 20;
            }
            else if (this.num_cardnum == 63) {
                //数据赋值
                this.num_card_huase = 5;
                this.num_card_value = 14;
                //显示图片
                this.img_huasexiao.source = "";
                this.img_value.source = "num_g_r_14_png";
                this.img_huaseda.source = "icon_g_da_pai5_png";
                //定义位置
                this.img_value.x = 10;
                this.img_huaseda.y = 20;
            }
        }
        catch (error) {
        }
    };
    //显示新牌
    Game_Card.prototype.showNewCard = function (cardnum) {
        try {
            //隐藏界面
            this.rect_delete.visible = true;
            this.img_value_new.visible = true;
            this.img_huasexiao.visible = false;
            //数据赋值
            this.num_cardnum = cardnum;
            //显示界面
            if (this.num_cardnum < 62) {
                //数据赋值
                this.num_card_value = Math.floor(this.num_cardnum % 16);
                //判断显示
                if (this.num_card_huase % 2 == 0) {
                    this.img_value_new.source = "num_g_b_" + this.num_card_value + "_png";
                }
                else {
                    this.img_value_new.source = "num_g_r_" + this.num_card_value + "_png";
                }
                //定义位置
                this.img_value.x = 6;
                this.img_huaseda.y = 65;
            }
        }
        catch (error) {
        }
    };
    //打开牌
    Game_Card.prototype.openCard = function () {
        //数据赋值
        this.boo_isShow = true;
        //显示界面
        this.showCardFace();
    };
    //开牌动画
    Game_Card.prototype.openCardAction = function (_zoomrate, _callback) {
        var _this = this;
        if (_callback === void 0) { _callback = null; }
        //显示动作
        this._tween_card = egret.Tween.get(this).to({ scaleX: 0 }, this.num_opencard_speed).call(function () {
            _this.openCard();
            _this._tween_card = egret.Tween.get(_this).to({ scaleX: _zoomrate }, _this.num_opencard_speed).call(function () {
                if (_callback) {
                    _callback();
                }
            });
        });
    };
    //停止动画
    Game_Card.prototype.stopAction = function () {
        //停止缓动
        if (this._tween_card) {
            this._tween_card.setPaused(true);
            this._tween_card = null;
        }
    };
    //关闭牌
    Game_Card.prototype.closeCard = function () {
        //数据赋值
        this.boo_isShow = false;
        //显示界面
        this.showCardFace();
    };
    //显示牌状态
    Game_Card.prototype.showCardFace = function () {
        //判断显示界面
        if (this.boo_isShow == true) {
            this.currentState = "open";
        }
        else if (this.boo_isShow == false) {
            this.currentState = "close";
        }
    };
    return Game_Card;
}(eui.Component));
__reflect(Game_Card.prototype, "Game_Card");
//# sourceMappingURL=Game_Card.js.map