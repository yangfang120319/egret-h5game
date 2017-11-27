//麦斯----大富翁
class Main extends eui.UILayer {
    //定义变量
    private tips: Tips;
    
    //初始化
    protected createChildren(): void {
        super.createChildren();
        
        //初始化数据
       // GameConfig.init(false);
        //Comm.instance.init();
        basic.Dispatcher.init();
        basic.StageProxy.init(this.stage,this);
        basic.SceneManager.init(this);
        basic.ScaleMode.setPortrait();
        basic.localStorage.init(GameConfig.gameName);
        basic.Dispatcher.addListener(EventNames.SHOW_TIPS,this.onShowTips,this);
        GameData.Is_Test = false;
        
        
        
        //App函数初始化
        basic.AppNative.init(false);
        
        //注入自定义的素材解析器
        var assetAdapter = new AssetAdapter();
        this.stage.registerImplementation("eui.IAssetAdapter",assetAdapter);
        this.stage.registerImplementation("eui.IThemeAdapter",new ThemeAdapter());
        RES.addEventListener(RES.ResourceEvent.CONFIG_COMPLETE,this.onConfigComplete,this);
        RES.loadConfig("resource/default.res.json?v=2017111401","resource/");
    }
    
    //配置文件加载完成,开始预加载皮肤主题资源和loading资源组
    private onConfigComplete(event: RES.ResourceEvent): void {
        //移除事件
        RES.removeEventListener(RES.ResourceEvent.CONFIG_COMPLETE,this.onConfigComplete,this);

        //加载皮肤主题配置文件,可以手动修改这个文件。替换默认皮肤。
        var theme = new eui.Theme("resource/default.thm.json?v=2017111401",this.stage);
        theme.addEventListener(eui.UIEvent.COMPLETE,this.onThemeLoadComplete,this);
    }

    //主题文件加载完成,开始预加载
    private onThemeLoadComplete(): void {
        //数据赋值
        LoaderData.is_ThemeLoadEnd = true;
        
        //显示提示
        this.tips = new Tips();
        basic.SceneManager.instance.root.addChild(this.tips);

        //加载资源
        RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE,this.onResourceLoadComplete,this);
        RES.addEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR,this.onResourceLoadError,this);
        RES.addEventListener(RES.ResourceEvent.GROUP_PROGRESS,this.onResourceProgress,this);
        RES.addEventListener(RES.ResourceEvent.ITEM_LOAD_ERROR,this.onItemLoadError,this);
        RES.loadGroup("loading");
    }

    //preload资源组加载完成
    private onResourceLoadComplete(event: RES.ResourceEvent): void {
        //判断显示
        if(event.groupName == "loading"){
            //数据赋值
            LoaderData.is_Loading_LoadEnd = true;

            //显示加载界面
            this.checkShowLoading();

            //加载开始资源
            RES.loadGroup("startload");
        }
        else if(event.groupName == "startload") {
            //数据赋值
            LoaderData.is_Start_LoadEnd = true;

            //显示界面
            this.createScene();
            
            //加载游戏资源
            RES.loadGroup("gameload");
        }
        else if(event.groupName == "gameload") {
            //数据赋值
            LoaderData.is_Game_LoadEnd = true;

            //注销事件
            RES.removeEventListener(RES.ResourceEvent.GROUP_COMPLETE,this.onResourceLoadComplete,this);
            RES.removeEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR,this.onResourceLoadError,this);
            RES.removeEventListener(RES.ResourceEvent.GROUP_PROGRESS,this.onResourceProgress,this);
            RES.removeEventListener(RES.ResourceEvent.ITEM_LOAD_ERROR,this.onItemLoadError,this);
        }
    }

    //显示加载界面
    private checkShowLoading() {
        //注册场景
        basic.SceneManager.register(SceneNames.ROOM,SceneRoom);
        basic.SceneManager.register(SceneNames.GAME,SceneGame);
        basic.SceneManager.register(SceneNames.START,SceneStart);
        basic.SceneManager.register(SceneNames.START,SceneStart);
        basic.SceneManager.register(SceneNames.OVER,PanelGameOver);
        basic.SceneManager.register(SceneNames.WAITING,SceneWaiting);
        basic.SceneManager.register(SceneNames.LOADING,SceneLoading);
        
        //判断显示加载界面
        if(LoaderData.is_ThemeLoadEnd) {
            //定义变量
            var params: any = basic.Utils.getUrlParams();

            //显示加载界面
            basic.SceneManager.addTopScene(SceneNames.LOADING);
            
            //判断显示
            if(params.subscribe == "true"){
                 
            }
            else{
                //返回按钮设置
                window["getHistory"]();
                window["is_can_back"] = true;
            }
        }
    }
    
    //创建场景
    private createScene() {
        //判断显示
        //if(LoaderData.is_ThemeLoadEnd && LoaderData.is_Start_LoadEnd && LoaderData.is_ConnectEnd) {
            this.startCreateScene();
        //}
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
        //判断显示进度条
        if(event.groupName == "startload") {
            basic.Dispatcher.dispatch(EventNames.LOADING_PROGRESS,{
                itemsLoaded: event.itemsLoaded,
                itemsTotal: event.itemsTotal
            });
        }
        else if(event.groupName == "gameload") {
            basic.Dispatcher.dispatch(EventNames.LOADING_PROGRESS,{
                itemsLoaded: event.itemsLoaded,
                itemsTotal: event.itemsTotal
            });
        }
    }
    
  
    //显示提示
    private onShowTips(e: egret.Event): void {
        //显示界面
        if(LoaderData.is_ThemeLoadEnd == true) {
            this.tips.show(e.data.msg);
        }
    }
    
  

    //显示开始界面
    private onShowStart(e:egret.Event): void{
        //数据赋值
        LoaderData.is_ConnectEnd = true;

        //显示界面
        this.createScene();
    }

    //创建场景
    private startCreateScene() {
        //移除加载界面
        basic.SceneManager.removeTopScene(SceneNames.LOADING);

        //显示开始界面
        basic.SceneManager.show(SceneNames.START);
    }
}
