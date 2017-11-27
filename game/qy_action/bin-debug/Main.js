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
//青云例子
var Main = (function (_super) {
    __extends(Main, _super);
    function Main() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    //初始化
    Main.prototype.createChildren = function () {
        _super.prototype.createChildren.call(this);
        //初始化数据
        basic.Dispatcher.init();
        basic.StageProxy.init(this.stage, this);
        basic.SceneManager.init(this);
        basic.localStorage.init("qingyun");
        //注入自定义的素材解析器
        var assetAdapter = new AssetAdapter();
        this.stage.registerImplementation("eui.IAssetAdapter", assetAdapter);
        this.stage.registerImplementation("eui.IThemeAdapter", new ThemeAdapter());
        RES.addEventListener(RES.ResourceEvent.CONFIG_COMPLETE, this.onConfigComplete, this);
        RES.loadConfig("resource/default.res.json", "resource/");
    };
    //配置文件加载完成,开始预加载皮肤主题资源和loading资源组
    Main.prototype.onConfigComplete = function (event) {
        //移除事件
        RES.removeEventListener(RES.ResourceEvent.CONFIG_COMPLETE, this.onConfigComplete, this);
        //加载皮肤主题配置文件,可以手动修改这个文件。替换默认皮肤。
        var theme = new eui.Theme("resource/default.thm.json", this.stage);
        theme.addEventListener(eui.UIEvent.COMPLETE, this.onThemeLoadComplete, this);
    };
    //主题文件加载完成,开始预加载
    Main.prototype.onThemeLoadComplete = function () {
        //显示开始界面
        basic.SceneManager.register("PK", ScenePK);
        basic.SceneManager.register("start", ScenesStart);
        basic.SceneManager.show("start");
        //加载资源
        RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onResourceLoadError, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onResourceProgress, this);
        RES.addEventListener(RES.ResourceEvent.ITEM_LOAD_ERROR, this.onItemLoadError, this);
        RES.loadGroup("actionload");
    };
    //preload资源组加载完成
    Main.prototype.onResourceLoadComplete = function (event) {
        //判断显示
        if (event.groupName == "actionload") {
            //注销事件
            RES.removeEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
            RES.removeEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onResourceLoadError, this);
            RES.removeEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onResourceProgress, this);
            RES.removeEventListener(RES.ResourceEvent.ITEM_LOAD_ERROR, this.onItemLoadError, this);
        }
    };
    //资源组加载出错
    Main.prototype.onItemLoadError = function (event) {
        //alert("Url:" + event.resItem.url + " has failed to load");
    };
    //资源组加载出错
    Main.prototype.onResourceLoadError = function (event) {
        //忽略加载失败的项目
        this.onResourceLoadComplete(event);
    };
    //资源组加载进度
    Main.prototype.onResourceProgress = function (event) {
    };
    return Main;
}(eui.UILayer));
__reflect(Main.prototype, "Main");
//# sourceMappingURL=Main.js.map