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
//网易游戏
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
        basic.localStorage.init("wy_game");
        //注册事件
        basic.Dispatcher.addListener(EventNames.LOAD_PART, this.onLoadPart, this);
        //注入自定义的素材解析器
        var assetAdapter = new AssetAdapter();
        this.stage.registerImplementation("eui.IAssetAdapter", assetAdapter);
        this.stage.registerImplementation("eui.IThemeAdapter", new ThemeAdapter());
        RES.addEventListener(RES.ResourceEvent.CONFIG_COMPLETE, this.onConfigComplete, this);
        RES.loadConfig("resource/default.res.json?v=2017101302", "resource/");
    };
    //配置文件加载完成,开始预加载皮肤主题资源和loading资源组
    Main.prototype.onConfigComplete = function (event) {
        //移除事件
        RES.removeEventListener(RES.ResourceEvent.CONFIG_COMPLETE, this.onConfigComplete, this);
        //加载皮肤主题配置文件,可以手动修改这个文件。替换默认皮肤。
        var theme = new eui.Theme("resource/default.thm.json?v=2017101302", this.stage);
        theme.addEventListener(eui.UIEvent.COMPLETE, this.onThemeLoadComplete, this);
    };
    //主题文件加载完成,开始预加载
    Main.prototype.onThemeLoadComplete = function () {
        //数据赋值
        LoaderData.is_ThemeLoadEnd = true;
        //加载资源
        RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onResourceLoadError, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onResourceProgress, this);
        RES.addEventListener(RES.ResourceEvent.ITEM_LOAD_ERROR, this.onItemLoadError, this);
        RES.loadGroup("loading");
    };
    //加载步骤
    Main.prototype.onLoadPart = function (e) {
        //定义变量
        var load_name = "partload" + String(e.data.part_num);
        //加载资源
        RES.loadGroup(load_name);
    };
    //preload资源组加载完成
    Main.prototype.onResourceLoadComplete = function (event) {
        //判断显示
        if (event.groupName == "loading") {
            //数据赋值
            LoaderData.is_loading_LoadEnd = true;
            //显示加载界面
            this.checkShowLoading();
        }
        else {
            //定义变量
            var part_num = Number(String(event.groupName).substring(8, String(event.groupName).length));
            //数据赋值
            LoaderData.is_part_LoadEnd[part_num] = true;
        }
    };
    //显示加载界面
    Main.prototype.checkShowLoading = function () {
        //注册场景
        basic.SceneManager.register(SceneNames.OVER, SceneOver);
        basic.SceneManager.register(SceneNames.STEP1, SceneStep1);
        basic.SceneManager.register(SceneNames.STEP2, SceneStep2);
        basic.SceneManager.register(SceneNames.STEP3, SceneStep3);
        basic.SceneManager.register(SceneNames.STEP4, SceneStep4);
        basic.SceneManager.register(SceneNames.STEP5, SceneStep5);
        basic.SceneManager.register(SceneNames.STEP6, SceneStep6);
        basic.SceneManager.register(SceneNames.STEP7, SceneStep7);
        basic.SceneManager.register(SceneNames.STEP8, SceneStep8);
        basic.SceneManager.register(SceneNames.STEP9, SceneStep9);
        basic.SceneManager.register(SceneNames.STEP10, SceneStep10);
        basic.SceneManager.register(SceneNames.STEP11, SceneStep11);
        basic.SceneManager.register(SceneNames.STEP12, SceneStep12);
        basic.SceneManager.register(SceneNames.STEP13, SceneStep13);
        basic.SceneManager.register(SceneNames.STEP14, SceneStep14);
        basic.SceneManager.register(SceneNames.STEP15, SceneStep15);
        basic.SceneManager.register(SceneNames.STEP16, SceneStep16);
        basic.SceneManager.register(SceneNames.STEP17, SceneStep17);
        basic.SceneManager.register(SceneNames.STEP18, SceneStep18);
        basic.SceneManager.register(SceneNames.STEP19, SceneStep19);
        basic.SceneManager.register(SceneNames.STEP20, SceneStep20);
        basic.SceneManager.register(SceneNames.STEP21, SceneStep21);
        basic.SceneManager.register(SceneNames.STEP22, SceneStep22);
        basic.SceneManager.register(SceneNames.STEP23, SceneStep23);
        basic.SceneManager.register(SceneNames.STEP24, SceneStep24);
        basic.SceneManager.register(SceneNames.STEP25, SceneStep25);
        basic.SceneManager.register(SceneNames.LOADING, SceneLoading);
        basic.SceneManager.register(SceneNames.WAITING, SceneWaiting);
        //显示加载界面
        basic.SceneManager.show(SceneNames.OVER);
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
        //判断显示进度条
        if (event.groupName != "loading") {
            basic.Dispatcher.dispatch(EventNames.LOADING_PROGRESS, {
                itemsLoaded: event.itemsLoaded,
                itemsTotal: event.itemsTotal
            });
        }
    };
    return Main;
}(eui.UILayer));
__reflect(Main.prototype, "Main");
//# sourceMappingURL=Main.js.map