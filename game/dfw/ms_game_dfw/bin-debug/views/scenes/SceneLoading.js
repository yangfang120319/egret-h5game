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
 * @加载界面
 *
 */
var SceneLoading = (function (_super) {
    __extends(SceneLoading, _super);
    //定义界面
    function SceneLoading() {
        var _this = _super.call(this) || this;
        //定义界面
        _this.skinName = SceneLoadingSkin;
        //清空文本
        _this.txt_loading.text = "";
        return _this;
    }
    //注册侦听
    SceneLoading.prototype.beforeShow = function (params) {
        //判断显示文本
        if (LoaderData.is_Start_LoadEnd == false) {
            this.txt_tips.text = "开始界面资源加载中...";
        }
        else {
            this.txt_tips.text = "游戏界面资源加载中...";
        }
        //注册事件
        basic.Dispatcher.addListener(EventNames.LOADING_PROGRESS, this.onLoadingProgress, this);
    };
    //注销侦听
    SceneLoading.prototype.beforeHide = function () {
        //注销事件
        basic.Dispatcher.removeListener(EventNames.LOADING_PROGRESS, this.onLoadingProgress, this);
    };
    //显示加载进度
    SceneLoading.prototype.onLoadingProgress = function (event) {
        //定义变量
        var now_loader = (event.data.itemsLoaded / event.data.itemsTotal) * 100;
        //显示文本
        this.txt_loading.text = Math.floor(now_loader).toString() + "%";
    };
    return SceneLoading;
}(basic.SceneBase));
__reflect(SceneLoading.prototype, "SceneLoading");
//# sourceMappingURL=SceneLoading.js.map