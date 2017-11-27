var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 *
 * @加载数据
 *
 */
var LoaderData = (function () {
    function LoaderData() {
    }
    //定义变量
    LoaderData.is_ThemeLoadEnd = false;
    LoaderData.is_loading_LoadEnd = false;
    //分步加载
    LoaderData.is_part_LoadEnd = [, false, false, false];
    return LoaderData;
}());
__reflect(LoaderData.prototype, "LoaderData");
//# sourceMappingURL=LoaderData.js.map