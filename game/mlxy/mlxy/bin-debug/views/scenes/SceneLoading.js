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
        return _this;
    }
    //显示加载进度
    SceneLoading.prototype.onLoadingProgress = function (event) {
        //定义变量
        var num_now_loader = Math.floor((event.data.itemsLoaded / event.data.itemsTotal) * 100);
        //显示进度
        this.txt_loading.text = num_now_loader.toString() + "%";
    };
    //注册侦听
    SceneLoading.prototype.beforeShow = function (params) {
        //注册事件
        basic.Dispatcher.addListener(EventNames.LOADING_PROGRESS, this.onLoadingProgress, this);
        //开始动画
        this.loading.startPlay();
        //判断显示登录
        var params = basic.Utils.getUrlParams();
        if (params.account == "" || params.account == null) {
            //this.login.visible = true;
        }
        else {
            //this.login.visible = false;
        }
        // this.login.info();
    };
    //注销侦听
    SceneLoading.prototype.beforeHide = function () {
        //注销事件
        basic.Dispatcher.removeListener(EventNames.LOADING_PROGRESS, this.onLoadingProgress, this);
        //停止动画
        //this.login.clean();
        this.loading.stopPlay();
    };
    return SceneLoading;
}(basic.SceneBase));
__reflect(SceneLoading.prototype, "SceneLoading");
//# sourceMappingURL=SceneLoading.js.map