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
//易赚----基础代码
var Main = (function (_super) {
    __extends(Main, _super);
    function Main() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    //定义变量
    //private tips: Tips;
    //初始化
    Main.prototype.createChildren = function () {
        _super.prototype.createChildren.call(this);
        //初始化数据
        GameConfig.init(false);
        // Comm.instance.init();
        basic.Dispatcher.init();
        basic.StageProxy.init(this.stage, this);
        basic.SceneManager.init(this);
        basic.ScaleMode.setLandscape();
        basic.localStorage.init(GameConfig.gameName);
        basic.Dispatcher.addListener(EventNames.SHOW_TIPS, this.onShowTips, this);
        basic.Dispatcher.addListener(EventNames.SHOW_START, this.onShowStart, this);
        LoaderData.is_LoginEnd = true;
        //返回提示函数赋值
        window["showBackTips"] = this.showBackTips.bind(this);
        //App函数初始化
        basic.AppNative.init();
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
        var theme = new eui.Theme("resource/default.thm.json?v=2017091201", this.stage);
        theme.addEventListener(eui.UIEvent.COMPLETE, this.onThemeLoadComplete, this);
    };
    //主题文件加载完成,开始预加载
    Main.prototype.onThemeLoadComplete = function () {
        //数据赋值
        LoaderData.is_ThemeLoadEnd = true;
        //显示提示
        //数据赋值
        LoaderData.is_Loading_LoadEnd = true;
        //显示加载界面
        this.checkShowLoading();
        //加载资源
        RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onResourceLoadError, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onResourceProgress, this);
        RES.addEventListener(RES.ResourceEvent.ITEM_LOAD_ERROR, this.onItemLoadError, this);
        RES.loadGroup("loading");
    };
    //preload资源组加载完成
    Main.prototype.onResourceLoadComplete = function (event) {
        //判断显示
        if (event.groupName == "loading") {
            //数据赋值
            LoaderData.is_Loading_LoadEnd = true;
            //显示加载界面
            this.checkShowLoading();
            //开始加载开始资源
            RES.loadGroup("nnload");
        }
        else if (event.groupName == "nnload") {
            //数据赋值
            LoaderData.is_Start_LoadEnd = true;
            //显示界面
            this.createScene();
            RES.removeEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
            RES.removeEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onResourceLoadError, this);
            RES.removeEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onResourceProgress, this);
            RES.removeEventListener(RES.ResourceEvent.ITEM_LOAD_ERROR, this.onItemLoadError, this);
        }
    };
    //显示加载界面
    Main.prototype.checkShowLoading = function () {
        //注册场景
        basic.SceneManager.register(SceneNames.LOADING, SceneLoading);
        basic.SceneManager.register(SceneNames.SCENEGAME_NN, SceneGame_NN);
        //basic.SceneManager.register(SceneNames. WAITING,SceneWaiting);
        //判断显示加载界面
        if (LoaderData.is_ThemeLoadEnd) {
            //显示加载界面
            basic.SceneManager.addTopScene(SceneNames.LOADING);
            //调用已准备
            basic.AppNative.isAlready();
            //返回按钮设置
            window["getHistory"]();
            window["is_can_back"] = true;
        }
    };
    //创建场景
    Main.prototype.createScene = function () {
        //判断显示
        if (LoaderData.is_ThemeLoadEnd && LoaderData.is_Start_LoadEnd && LoaderData.is_LoginEnd) {
            //console.info(33);
            this.startCreateScene();
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
        //console.info(333);
        //判断显示进度条
        if (event.groupName == "nnload") {
            basic.Dispatcher.dispatch(EventNames.LOADING_PROGRESS, {
                itemsLoaded: event.itemsLoaded,
                itemsTotal: event.itemsTotal
            });
        }
    };
    //返回提示
    Main.prototype.showBackTips = function () {
        //显示界面
        if (LoaderData.is_ThemeLoadEnd == true) {
            console.log("返回按钮");
        }
    };
    //显示提示
    Main.prototype.onShowTips = function (e) {
        //显示界面
        if (LoaderData.is_ThemeLoadEnd == true) {
            //this.tips.show(e.data.msg);
        }
    };
    //显示界面
    Main.prototype.onShowStart = function (e) {
        //数据赋值
        LoaderData.is_LoginEnd = true;
        //判断显示
        if (LoaderData.is_Start_LoadEnd) {
            //创建场景
            this.createScene();
        }
    };
    //创建场景
    Main.prototype.startCreateScene = function () {
        //移除加载界面
        basic.SceneManager.removeTopScene(SceneNames.LOADING);
        //判断显示
        if (LoaderData.is_Start_Show == false) {
            //显示开始界面
            basic.SceneManager.show(SceneNames.SCENEGAME_NN, null, basic.sceneEffect.Fade);
        }
        //数据赋值
        LoaderData.is_Start_Show = true;
    };
    return Main;
}(eui.UILayer));
__reflect(Main.prototype, "Main");
//# sourceMappingURL=Main.js.map