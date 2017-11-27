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
 * @夜市场-路子
 *
 */
var YSC_LuZi = (function (_super) {
    __extends(YSC_LuZi, _super);
    function YSC_LuZi() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        //定义变量
        _this.point_num = 0;
        _this.point_picture = [];
        return _this;
    }
    //初始化
    YSC_LuZi.prototype.createChildren = function () {
        _super.prototype.createChildren.call(this);
        //定义事件
        basic.Dispatcher.addListener(EventNames.YSC_History, this.onShowLuZi, this);
    };
    //显示历史记录
    YSC_LuZi.prototype.onShowLuZi = function (e) {
        //定义变量
        var row_num = 0;
        //判断清除点
        for (var i = 0; i < this.point_num; i++) {
            this.removeChild(this.point_picture[i]);
        }
        this.point_num = 0;
        this.point_picture = [];
        //显示界面
        for (var i = 0; i < e.data.historysColor.length; i++) {
            //判断显示
            if (row_num >= 12) {
                break;
            }
            else {
                for (var j = 0; j < e.data.historysColor[i][1]; j++) {
                    //定义变量
                    var img = new eui.Image();
                    //判断赋值
                    if (j == 8) {
                        row_num += 1;
                    }
                    //定义图片颜色
                    if (e.data.historysColor[i][0] == 0) {
                        img.source = "icon_ysc_luzi_red_png";
                    }
                    else {
                        img.source = "icon_ysc_luzi_blue_png";
                    }
                    //定义位置
                    img.x = 12 + 31 * row_num;
                    img.y = 7 + 24 * (j % 8);
                    //数据赋值
                    this.point_picture[this.point_num] = img;
                    //显示界面
                    this.addChild(this.point_picture[this.point_num]);
                    this.point_num += 1;
                }
                row_num += 1;
            }
        }
    };
    return YSC_LuZi;
}(eui.Component));
__reflect(YSC_LuZi.prototype, "YSC_LuZi");
//# sourceMappingURL=YSC_LuZi.js.map