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
 * @马来西亚银行-显示
 *
 */
var MLXYYH_Show = (function (_super) {
    __extends(MLXYYH_Show, _super);
    function MLXYYH_Show() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    //初始化
    MLXYYH_Show.prototype.createChildren = function () {
        _super.prototype.createChildren.call(this);
        //发送消息
        basic.Dispatcher.addListener(EventNames.MLXYYH_HISTORY, this.onShowHistory, this);
        basic.Dispatcher.addListener(EventNames.MLXYYH_CHANGE_GOLD, this.onShowGold, this);
    };
    //显示金币
    MLXYYH_Show.prototype.onShowGold = function (e) {
        //显示金币
        this.txt_gold.text = Number(UserData.User_Gold - GameData.MLXYYH_YaZhu_UserTotal + GameData.MLXYYH_AddGold).toString();
    };
    //显示历史记录
    MLXYYH_Show.prototype.onShowHistory = function (e) {
        //清除界面
        if (e.data.historys.length > 0) {
            this.img_icon.source = "icon_mlxyyh_" + e.data.historys[0] + "_2_png";
        }
        else {
            this.img_icon.source = "";
        }
    };
    return MLXYYH_Show;
}(eui.Component));
__reflect(MLXYYH_Show.prototype, "MLXYYH_Show");
//# sourceMappingURL=MLXYYH_Show.js.map