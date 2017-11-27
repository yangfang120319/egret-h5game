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
 * @二八杠-桌子
 *
 */
var EBG_Table = (function (_super) {
    __extends(EBG_Table, _super);
    function EBG_Table() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    //初始化
    EBG_Table.prototype.createChildren = function () {
        _super.prototype.createChildren.call(this);
        //注册事件
        basic.Dispatcher.addListener(EventNames.EBG_CHANGEYAZHU, this.onShowYaZhu, this);
        basic.Dispatcher.addListener(EventNames.EBG_USERYAZHU, this.onShowUserYaZhu, this);
        basic.Dispatcher.addListener(EventNames.EBG_SHOW_MAHJONG, this.onShowMahjong, this);
        basic.Dispatcher.addListener(EventNames.EBG_HIDE_MAHJONG, this.onHideMahjong, this);
        basic.Dispatcher.addListener(EventNames.EBG_OPEN_MAHJONG, this.onOpenMahjong, this);
        basic.Dispatcher.addListener(EventNames.EBG_SHOWOTHERTABLE, this.onShowOtherTable, this);
        basic.Dispatcher.addListener(EventNames.EBG_SHOW_MAHJONGDETAIL, this.onShowMahjongDetail, this);
    };
    //初始化界面
    EBG_Table.prototype.info = function () {
        //清除界面
        this.clean();
        //判断显示界面
        if (GameData.EBG_Game_Status > 1) {
            //显示牌
            this.result.visible = true;
            this.mahjong0.visible = true;
            this.mahjong1.visible = true;
            basic.Dispatcher.dispatch(EventNames.EBG_SHOW_MAHJONGDETAIL, {
                "table": this.table_num,
                "mahjong": GameData.EBG_Poker_Table_Card[this.table_num]
            });
            this.mahjong0.openMahjong();
            this.mahjong1.openMahjong();
            this.result.showResult(this.table_num);
            //显示结果
            this.showResult();
        }
        //显示金币
        this.showGold();
    };
    //清除界面
    EBG_Table.prototype.clean = function () {
        //隐藏界面
        this.mahjong0.closeMahjong();
        this.mahjong1.closeMahjong();
        this.mahjong0.visible = false;
        this.mahjong1.visible = false;
        this.result.visible = false;
        this.txt_lose.visible = false;
        this.g_result.visible = false;
        this.img_result.visible = false;
        this.txt_gold_user.text = "0";
        this.txt_gold_total.text = "0";
    };
    //显示结果
    EBG_Table.prototype.showResult = function () {
        //判断显示结果
        if (GameData.EBG_Poker_Table_IsWin[this.table_num] == true) {
            this.g_result.visible = true;
            this.img_result.visible = true;
            //判断显示
            this.txt_result.text = "x1";
        }
        else if (GameData.EBG_Poker_Table_IsWin[this.table_num] == false) {
            //显示界面
            this.txt_lose.text = "x1";
            this.txt_lose.visible = true;
        }
    };
    //显示金币
    EBG_Table.prototype.showGold = function () {
        //显示金币
        this.txt_gold_user.text = GameData.EBG_YaZhu_User[this.table_num].toString();
        if (Number(GameData.EBG_YaZhu_Total[this.table_num] + GameData.EBG_YaZhu_User_Now[this.table_num]) > Number(this.txt_gold_total.text)) {
            this.txt_gold_total.text = Number(GameData.EBG_YaZhu_Total[this.table_num] + GameData.EBG_YaZhu_User_Now[this.table_num]).toString();
        }
    };
    //显示压住
    EBG_Table.prototype.onShowYaZhu = function (e) {
        //判断显示
        if (this.table_num == 0) {
            //数据赋值
            GameData.EBG_YaZhu_UserTotal = 0;
            GameData.EBG_YaZhu_User = e.data.betGolds;
            GameData.EBG_YaZhu_Total = e.data.totalBetGolds;
            for (var i = 0; i < GameData.EBG_YaZhu_User.length; i++) {
                GameData.EBG_YaZhu_UserTotal += GameData.EBG_YaZhu_User[i];
            }
            //显示其他压住动画
            for (var j = 0; j < 3; j++) {
                //定义变量
                var other_yazhu = [];
                var user_yazhu = GameData.EBG_YaZhu_User_NowDetail[j];
                if (e.data.newBetGoldDetails[j].length > 0) {
                    console.log(user_yazhu);
                    console.log(e.data.newBetGoldDetails[j]);
                }
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
            GameData.EBG_YaZhu_User_Now = [0, 0, 0];
            GameData.EBG_YaZhu_User_NowDetail = [[], [], []];
            //显示金币
            this.showGold();
            //发送消息
            basic.Dispatcher.dispatch(EventNames.EBG_SHOWGOLD);
            //显示其他桌子
            basic.Dispatcher.dispatch(EventNames.EBG_SHOWOTHERTABLE);
        }
    };
    //显示其他桌子
    EBG_Table.prototype.onShowOtherTable = function (e) {
        //显示金币
        if (this.table_num > 0) {
            this.showGold();
        }
    };
    //显示用户压住
    EBG_Table.prototype.onShowUserYaZhu = function (e) {
        //数据赋值
        if (e.data.pos == this.table_num) {
            GameData.EBG_YaZhu_User[this.table_num] = e.data.totalGold;
            GameData.EBG_YaZhu_User_NowDetail[this.table_num][GameData.EBG_YaZhu_User_NowDetail[this.table_num].length] = e.data.gold;
        }
        //显示金币
        this.showGold();
    };
    //显示麻将
    EBG_Table.prototype.onShowMahjong = function (e) {
        //显示界面
        this.mahjong0.visible = true;
        this.mahjong1.visible = true;
    };
    //隐藏麻将
    EBG_Table.prototype.onHideMahjong = function (e) {
        //显示界面
        this.mahjong0.visible = false;
        this.mahjong1.visible = false;
    };
    //显示麻将内容
    EBG_Table.prototype.onShowMahjongDetail = function (e) {
        //判断显示
        if (e.data.table == this.table_num) {
            this.mahjong0.showMahjong(e.data.mahjong[0]);
            this.mahjong1.showMahjong(e.data.mahjong[1]);
        }
    };
    //打开麻将
    EBG_Table.prototype.onOpenMahjong = function (e) {
        var _this = this;
        //判断显示
        if (e.data.table == this.table_num) {
            this.mahjong0.openMahjongAction(function () {
                _this.mahjong1.openMahjongAction(function () {
                    //显示结果
                    _this.result.visible = true;
                    _this.result.show(_this.table_num);
                });
            });
        }
    };
    return EBG_Table;
}(eui.Component));
__reflect(EBG_Table.prototype, "EBG_Table");
//# sourceMappingURL=EBG_Table.js.map