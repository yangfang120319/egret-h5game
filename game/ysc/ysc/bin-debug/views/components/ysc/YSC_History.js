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
 * @夜市场-历史记录
 *
 */
var YSC_History = (function (_super) {
    __extends(YSC_History, _super);
    function YSC_History() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.list_data = [];
        return _this;
    }
    //初始化
    YSC_History.prototype.createChildren = function () {
        _super.prototype.createChildren.call(this);
        //定义List
        this.list.dataProvider = this._data = new eui.ArrayCollection();
        this.list.itemRenderer = YSC_HistoryItem;
        //定义事件
        basic.Dispatcher.addListener(EventNames.YSC_History, this.onShowHistory, this);
    };
    //显示历史记录
    YSC_History.prototype.onShowHistory = function (e) {
        //数据赋值
        this.list_data = [];
        for (var i = 0; i < Math.min(9, e.data.historys.length); i++) {
            //定义变量
            var now_data = {};
            //数据赋值
            now_data["num"] = e.data.historys[i][0];
            now_data["type"] = e.data.historys[i][1];
            this.list_data[i] = now_data;
        }
        this._data.source = this.list_data;
        this._data.refresh();
    };
    return YSC_History;
}(eui.Component));
__reflect(YSC_History.prototype, "YSC_History");
//显示条定义
var YSC_HistoryItem = (function (_super) {
    __extends(YSC_HistoryItem, _super);
    function YSC_HistoryItem() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    //初始化界面
    YSC_HistoryItem.prototype.dataChanged = function () {
        _super.prototype.dataChanged.call(this);
        //显示图片
        this.txt_num.text = String(this.data.num);
        if (this.data.type == 2) {
            this.img_type.source = "icon_ysc_choose_s_3_png";
        }
        else if (this.data.type == 3) {
            this.img_type.source = "icon_ysc_choose_s_2_png";
        }
        else {
            this.img_type.source = "icon_ysc_choose_s_" + this.data.type + "_png";
        }
    };
    return YSC_HistoryItem;
}(eui.ItemRenderer));
__reflect(YSC_HistoryItem.prototype, "YSC_HistoryItem");
//# sourceMappingURL=YSC_History.js.map