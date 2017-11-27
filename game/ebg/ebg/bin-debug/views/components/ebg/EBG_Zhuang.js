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
 * @二八杠-庄
 *
 */
var EBG_Zhuang = (function (_super) {
    __extends(EBG_Zhuang, _super);
    function EBG_Zhuang() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    //初始化
    EBG_Zhuang.prototype.createChildren = function () {
        _super.prototype.createChildren.call(this);
        //注册事件
        basic.Dispatcher.addListener(EventNames.EBG_SHOW_MAHJONG, this.onShowMahjong, this);
        basic.Dispatcher.addListener(EventNames.EBG_HIDE_MAHJONG, this.onHideMahjong, this);
        basic.Dispatcher.addListener(EventNames.EBG_OPEN_MAHJONG, this.onOpenMahjong, this);
        basic.Dispatcher.addListener(EventNames.EBG_SHOW_MAHJONGDETAIL, this.onShowMahjongDetail, this);
    };
    //初始化界面
    EBG_Zhuang.prototype.info = function () {
        //清除界面
        this.clean();
        //判断显示界面
        if (GameData.EBG_Game_Status > 1) {
            //显示牌
            this.result.visible = true;
            this.mahjong0.visible = true;
            this.mahjong1.visible = true;
            basic.Dispatcher.dispatch(EventNames.EBG_SHOW_MAHJONGDETAIL, {
                "table": 3,
                "mahjong": GameData.EBG_Poker_Table_Card[3]
            });
            this.result.showResult(3);
            this.mahjong0.openMahjong();
            this.mahjong1.openMahjong();
        }
    };
    //清除界面
    EBG_Zhuang.prototype.clean = function () {
        //隐藏界面
        this.mahjong0.closeMahjong();
        this.mahjong1.closeMahjong();
        this.result.visible = false;
        this.mahjong0.visible = false;
        this.mahjong1.visible = false;
    };
    //显示麻将
    EBG_Zhuang.prototype.onShowMahjong = function (e) {
        //显示界面
        this.mahjong0.visible = true;
        this.mahjong1.visible = true;
    };
    //隐藏麻将
    EBG_Zhuang.prototype.onHideMahjong = function (e) {
        //显示界面
        this.mahjong0.visible = false;
        this.mahjong1.visible = false;
    };
    //显示麻将内容
    EBG_Zhuang.prototype.onShowMahjongDetail = function (e) {
        //判断显示
        if (e.data.table == 3) {
            this.mahjong0.showMahjong(e.data.mahjong[0]);
            this.mahjong1.showMahjong(e.data.mahjong[1]);
        }
    };
    //打开麻将
    EBG_Zhuang.prototype.onOpenMahjong = function (e) {
        var _this = this;
        //判断显示
        if (e.data.table == 3) {
            this.mahjong0.openMahjongAction(function () {
                _this.mahjong1.openMahjongAction(function () {
                    //显示结果
                    _this.result.show(3);
                    _this.result.visible = true;
                });
            });
        }
    };
    return EBG_Zhuang;
}(eui.Component));
__reflect(EBG_Zhuang.prototype, "EBG_Zhuang");
//# sourceMappingURL=EBG_Zhuang.js.map