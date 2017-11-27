//青云例子
class Main extends eui.UILayer {
    //初始化
    protected createChildren(): void {
        super.createChildren();

        //初始化数据
        basic.Dispatcher.init();
        basic.StageProxy.init(this.stage,this);
        basic.SceneManager.init(this);
        basic.localStorage.init("qingyun");
        
        //注入自定义的素材解析器
        var assetAdapter = new AssetAdapter();
        this.stage.registerImplementation("eui.IAssetAdapter",assetAdapter);
        this.stage.registerImplementation("eui.IThemeAdapter",new ThemeAdapter());
        RES.addEventListener(RES.ResourceEvent.CONFIG_COMPLETE,this.onConfigComplete,this);
        RES.loadConfig("resource/default.res.json","resource/");
    }

    //配置文件加载完成,开始预加载皮肤主题资源和loading资源组
    private onConfigComplete(event: RES.ResourceEvent): void {
        //移除事件
        RES.removeEventListener(RES.ResourceEvent.CONFIG_COMPLETE,this.onConfigComplete,this);

        //加载皮肤主题配置文件,可以手动修改这个文件。替换默认皮肤。
        var theme = new eui.Theme("resource/default.thm.json",this.stage);
        theme.addEventListener(eui.UIEvent.COMPLETE,this.onThemeLoadComplete,this);
    }

    //主题文件加载完成,开始预加载
    private onThemeLoadComplete(): void {
        //显示开始界面
        basic.SceneManager.register("PK",ScenePK);
        basic.SceneManager.register("start",ScenesStart);
        basic.SceneManager.show("start");
        
        //加载资源
        RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE,this.onResourceLoadComplete,this);
        RES.addEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR,this.onResourceLoadError,this);
        RES.addEventListener(RES.ResourceEvent.GROUP_PROGRESS,this.onResourceProgress,this);
        RES.addEventListener(RES.ResourceEvent.ITEM_LOAD_ERROR,this.onItemLoadError,this);
        RES.loadGroup("actionload");
    }

    //preload资源组加载完成
    private onResourceLoadComplete(event: RES.ResourceEvent): void {
        //判断显示
        if(event.groupName == "actionload") {
            //注销事件
            RES.removeEventListener(RES.ResourceEvent.GROUP_COMPLETE,this.onResourceLoadComplete,this);
            RES.removeEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR,this.onResourceLoadError,this);
            RES.removeEventListener(RES.ResourceEvent.GROUP_PROGRESS,this.onResourceProgress,this);
            RES.removeEventListener(RES.ResourceEvent.ITEM_LOAD_ERROR,this.onItemLoadError,this);
        }
    }
    
    //资源组加载出错
    private onItemLoadError(event: RES.ResourceEvent): void {
        //alert("Url:" + event.resItem.url + " has failed to load");
    }

    //资源组加载出错
    private onResourceLoadError(event: RES.ResourceEvent): void {
        //忽略加载失败的项目
        this.onResourceLoadComplete(event);
    }

    //资源组加载进度
    private onResourceProgress(event: RES.ResourceEvent): void {
        
    }
    
}
