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
 * @桌子界面
 *
 */
var SG_Table = (function (_super) {
    __extends(SG_Table, _super);
    function SG_Table() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.card = [];
        return _this;
    }
    //初始化
    SG_Table.prototype.createChildren = function () {
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
        basic.Dispatcher.addListener(EventNames.SG_CHANGEYAZHU, this.onShowYaZhu, this);
        basic.Dispatcher.addListener(EventNames.SG_USERYAZHU, this.onShowUserYaZhu, this);
        basic.Dispatcher.addListener(EventNames.SG_SHOWOTHERTABLE, this.onShowOtherTable, this);
        basic.Dispatcher.addListener(EventNames.SG_SHOW_CARDDETAIL, this.onShowCardDetail, this);
    };
    //初始化界面
    SG_Table.prototype.info = function () {
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
                "table": this.table_num,
                "card": GameData.SG_Poker_Table_Card[this.table_num]
            });
            this.result.showResult(GameData.SG_Poker_Table_Type[this.table_num]);
            //显示结果
            this.showResult();
        }
        //显示金币
        this.showGold();
    };
    //清除界面
    SG_Table.prototype.clean = function () {
        //隐藏界面
        for (var i = 0; i < 3; i++) {
            this.card[i].closeCard();
            this.card[i].visible = false;
        }
        this.img_he.visible = false;
        this.result.visible = false;
        this.txt_lose.visible = false;
        this.g_result.visible = false;
        this.img_result.visible = false;
        this.txt_gold_user.text = "0";
        this.txt_gold_total.text = "0";
    };
    //显示结果
    SG_Table.prototype.showResult = function () {
        //判断显示结果
        if (GameData.SG_Poker_Table_IsWin[this.table_num] == 1) {
            this.g_result.visible = true;
            this.img_result.visible = true;
            //判断显示
            if (GameData.SG_Poker_Table_Type[this.table_num] < 7) {
                this.txt_result.text = "x1";
            }
            else if (GameData.SG_Poker_Table_Type[this.table_num] < 11) {
                this.txt_result.text = "x2";
            }
            else if (GameData.SG_Poker_Table_Type[this.table_num] == 11) {
                this.txt_result.text = "x3";
            }
        }
        else if (GameData.SG_Poker_Table_IsWin[this.table_num] == -1) {
            //显示界面
            this.txt_lose.visible = true;
            if (GameData.SG_Poker_Table_Type[5] < 7) {
                this.txt_lose.text = "x1";
            }
            else if (GameData.SG_Poker_Table_Type[5] < 11) {
                this.txt_lose.text = "x2";
            }
            else if (GameData.SG_Poker_Table_Type[5] == 11) {
                this.txt_lose.text = "x3";
            }
        }
        else {
            this.img_he.visible = true;
        }
    };
    //显示金币
    SG_Table.prototype.showGold = function () {
        //显示金币
        this.txt_gold_user.text = GameData.SG_YaZhu_User[this.table_num].toString();
        if (Number(GameData.SG_YaZhu_Total[this.table_num] + GameData.SG_YaZhu_User_Now[this.table_num]) > Number(this.txt_gold_total.text)) {
            this.txt_gold_total.text = Number(GameData.SG_YaZhu_Total[this.table_num] + GameData.SG_YaZhu_User_Now[this.table_num]).toString();
        }
    };
    //显示压住
    SG_Table.prototype.onShowYaZhu = function (e) {
        //判断显示
        if (this.table_num == 0) {
            //数据赋值
            GameData.SG_YaZhu_UserTotal = 0;
            GameData.SG_YaZhu_User = e.data.betGolds;
            GameData.SG_YaZhu_Total = e.data.totalBetGolds;
            for (var i = 0; i < GameData.SG_YaZhu_User.length; i++) {
                GameData.SG_YaZhu_UserTotal += GameData.SG_YaZhu_User[i];
            }
            //显示其他压住动画
            for (var j = 0; j < 5; j++) {
                //定义变量
                var other_yazhu = [];
                var user_yazhu = GameData.SG_YaZhu_User_NowDetail[j];
                //数据赋值
                for (var k1 = 0; k1 < e.data.newBetGoldDetails[j].length; k1++) {
                    //定义变量
                    var juge_yazhu = true;
                    //数据赋值
                    for (var p1 = 0; p1 < user_yazhu.length; p1++) {
                        if (e.data.newBetGoldDetails[j][k1] == user_yazhu[p1]) {
                            //数据赋值
                            juge_yazhu = false;
                            user_yazhu[p1] = -1;
                            break;
                        }
                    }
                    //判断赋值
                    if (juge_yazhu == true) {
                        other_yazhu[other_yazhu.length] = e.data.newBetGoldDetails[j][k1];
                    }
                }
                //显示其他压注动画
                for (var j1 = 0; j1 < other_yazhu.length; j1++) {
                    basic.Dispatcher.dispatch(EventNames.GAME_SHOW_OHTERYAZHU, {
                        "pos": j,
                        "gold": other_yazhu[j1]
                    });
                }
            }
            //数据赋值
            GameData.SG_YaZhu_User_Now = [0, 0, 0, 0, 0];
            GameData.SG_YaZhu_User_NowDetail = [[], [], [], [], []];
            //显示金币
            this.showGold();
            //发送消息
            basic.Dispatcher.dispatch(EventNames.SG_SHOWGOLD);
            //显示其他桌子
            basic.Dispatcher.dispatch(EventNames.SG_SHOWOTHERTABLE);
        }
    };
    //显示其他桌子
    SG_Table.prototype.onShowOtherTable = function (e) {
        //显示金币
        if (this.table_num > 0) {
            this.showGold();
        }
    };
    //显示用户压住
    SG_Table.prototype.onShowUserYaZhu = function (e) {
        //数据赋值
        if (e.data.pos == this.table_num) {
            GameData.SG_YaZhu_User[this.table_num] = e.data.totalGold;
            GameData.SG_YaZhu_User_NowDetail[this.table_num][GameData.SG_YaZhu_User_NowDetail[this.table_num].length] = e.data.gold;
        }
        //显示金币
        this.showGold();
    };
    //显示牌
    SG_Table.prototype.onShowCard = function (e) {
        //判断显示
        if (e.data.table == this.table_num) {
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
    SG_Table.prototype.onHideCard = function (e) {
        //隐藏界面
        for (var i = 0; i < 3; i++) {
            this.card[i].visible = false;
        }
    };
    //显示牌内容
    SG_Table.prototype.onShowCardDetail = function (e) {
        //判断显示
        if (e.data.table == this.table_num) {
            for (var i = 0; i < 3; i++) {
                this.card[i].showCard(e.data.card[i]);
            }
        }
    };
    //打开牌
    SG_Table.prototype.onOpenCard = function (e) {
        var _this = this;
        //判断显示
        if (e.data.table == this.table_num) {
            //播放声音
            basic.SoundManager.instance.playEffect("sound_g_cardopen_mp3");
            //显示界面
            this.card[2].openCardAction(0.65, function () {
                //显示结果
                _this.result.visible = true;
                _this.result.show(GameData.SG_Poker_Table_Type[_this.table_num]);
            });
        }
    };
    return SG_Table;
}(eui.Component));
__reflect(SG_Table.prototype, "SG_Table");
//# sourceMappingURL=SG_Table.js.map