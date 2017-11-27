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
var SG_Zhuang = (function (_super) {
    __extends(SG_Zhuang, _super);
    function SG_Zhuang() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.card = [];
        return _this;
    }
    //初始化
    SG_Zhuang.prototype.createChildren = function () {
        _super.prototype.createChildren.call(this);
        //数据赋值
        for (var i = 0; i < 3; i++) {
            //定义变量
            var now_card = this["card" + i];
            //数据赋值
            this.card[i] = now_card;
        }
        //注册事件
        basic.Dispatcher.addListener(EventNames.SG_SHOW_CARD, this.onShowCard, this);
        basic.Dispatcher.addListener(EventNames.SG_HIDE_CARD, this.onHideCard, this);
        basic.Dispatcher.addListener(EventNames.SG_OPEN_CARD, this.onOpenCard, this);
        basic.Dispatcher.addListener(EventNames.SG_SHOW_CARDDETAIL, this.onShowCardDetail, this);
    };
    //初始化界面
    SG_Zhuang.prototype.info = function () {
        //清除界面
        this.clean();
        //判断显示界面
        if (GameData.SG_Game_Status > 1) {
            //显示牌
            this.result.visible = true;
            for (var i = 0; i < 3; i++) {
                this.card[i].openCard();
                this.card[i].visible = true;
            }
            basic.Dispatcher.dispatch(EventNames.SG_SHOW_CARDDETAIL, {
                "table": 5,
                "card": GameData.SG_Poker_Table_Card[5]
            });
            this.result.showResult(GameData.SG_Poker_Table_Type[5]);
        }
    };
    //清除界面
    SG_Zhuang.prototype.clean = function () {
        //隐藏界面
        this.result.visible = false;
        for (var i = 0; i < 3; i++) {
            this.card[i].closeCard();
            this.card[i].visible = false;
        }
    };
    //显示牌
    SG_Zhuang.prototype.onShowCard = function (e) {
        //判断显示
        if (e.data.table == 5) {
            this.card[e.data.cardnum].visible = true;
            if (e.data.cardnum < 2) {
                this.card[e.data.cardnum].openCardAction(0.65);
            }
        }
        else if (e.data.table == -1) {
            //显示界面
            for (var i = 0; i < 3; i++) {
                this.card[i].visible = true;
            }
        }
    };
    //隐藏牌
    SG_Zhuang.prototype.onHideCard = function (e) {
        //隐藏界面
        for (var i = 0; i < 3; i++) {
            this.card[i].visible = false;
        }
    };
    //显示牌内容
    SG_Zhuang.prototype.onShowCardDetail = function (e) {
        //判断显示
        if (e.data.table == 5) {
            for (var i = 0; i < 3; i++) {
                this.card[i].showCard(e.data.card[i]);
            }
        }
    };
    //打开牌
    SG_Zhuang.prototype.onOpenCard = function (e) {
        var _this = this;
        //判断显示
        if (e.data.table == 5) {
            //播放声音
            basic.SoundManager.instance.playEffect("sound_g_cardopen_mp3");
            //显示开牌
            this.card[2].openCardAction(0.65, function () {
                //显示结果
                _this.result.visible = true;
                _this.result.show(GameData.SG_Poker_Table_Type[5]);
            });
        }
    };
    return SG_Zhuang;
}(eui.Component));
__reflect(SG_Zhuang.prototype, "SG_Zhuang");
//# sourceMappingURL=SG_Zhuang.js.map