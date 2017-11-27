//显示界面
class Main extends eui.UILayer {
    //定义变量
    private tips: Tips;
    
    //初始化
    protected createChildren(): void {
        super.createChildren();
        
        //初始化数据
        GameConfig.init(false);
        Comm.instance.init();
        basic.Dispatcher.init();
        basic.StageProxy.init(this.stage,this);
        basic.SceneManager.init(this);
        basic.localStorage.init(GameConfig.gameName);
        basic.Dispatcher.addListener(EventNames.SHOW_TIPS,this.onShowTips,this);
        basic.Dispatcher.addListener(EventNames.SHOW_START,this.onShowStart,this);
        UserData.is_APP = true;
        
        //注册回调
        if(GameConfig.isApp() == true) {
            if(egret.Capabilities.os == "iOS") {
                window["funRegister"](this.IOScallBack.bind(this));
            }
            else if(egret.Capabilities.os == "Android"){
                window["AndroidshowExitTips"] = this.AndroidshowExitTips;
            }
        }
        else{
            this.stage.scaleMode = egret.StageScaleMode.SHOW_ALL;
            this.stage.orientation = egret.OrientationMode.AUTO;
        }
        
        //注入自定义的素材解析器
        var assetAdapter = new AssetAdapter();
        this.stage.registerImplementation("eui.IAssetAdapter",assetAdapter);
        this.stage.registerImplementation("eui.IThemeAdapter",new ThemeAdapter());
        RES.addEventListener(RES.ResourceEvent.CONFIG_COMPLETE,this.onConfigComplete,this);
        RES.loadConfig("resource/default.res.json","resource/");
    }
    
    //安卓退出提示
    private AndroidshowExitTips(_data:any):void{
        //显示提示对话框
        PanelExit.instance.show();
    }
    
    //IOS回调
    private IOScallBack(_name: string,_data: string): void {
        //判断显示
        if(_name == "onGetAccount") {
            //数据赋值
            UserData.User_Account = _data;
            
            //发送消息
            basic.Dispatcher.dispatch(EventNames.SHOW_USERMESSAGE,{ "showtype": 0 });
        }
        else if(_name == "onGetPassword") {
            //数据赋值
            UserData.User_Password = _data;
            
            //发送消息
            basic.Dispatcher.dispatch(EventNames.SHOW_USERMESSAGE,{ "showtype": 1 });
        }
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
        if(event.groupName == "loading") {
            //数据赋值
            LoaderData.is_loading_LoadEnd = true;

            //显示加载界面
            this.checkShowLoading();

            //开始加载开始资源
            RES.loadGroup("startload");
        }
        else if(event.groupName == "startload") {
            //数据赋值
            LoaderData.is_start_LoadEnd = true;

            //显示界面
            this.createScene();

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
        basic.SceneManager.register(SceneNames.SHOP,SceneShop);
        basic.SceneManager.register(SceneNames.START,SceneStart);
        basic.SceneManager.register(SceneNames.ABOUT,SceneAbout);
        basic.SceneManager.register(SceneNames.CUSTOM,SceneCustom);
        basic.SceneManager.register(SceneNames.CLAUSE,SceneClause);
        basic.SceneManager.register(SceneNames.GUOFEN,SceneGuoFen);
        basic.SceneManager.register(SceneNames.LOADING,SceneLoading);
        basic.SceneManager.register(SceneNames.RANKING,SceneRanking);
        basic.SceneManager.register(SceneNames.SAVEBOX,SceneSaveBox);
        basic.SceneManager.register(SceneNames.WAITING,SceneWaiting);
        basic.SceneManager.register(SceneNames.GAME_EBG,SceneGame_EBG);
        basic.SceneManager.register(SceneNames.GAME_JSYS,SceneGame_JSYS);
        
        //判断显示加载界面
        if(LoaderData.is_ThemeLoadEnd) {
            //显示加载界面
            basic.SceneManager.addTopScene(SceneNames.LOADING);
            
            //判断影藏界面
            if(GameConfig.isApp() == true) {
                if(egret.Capabilities.os == "iOS") {
                    window["IOShidePicture"]("");
                }
                else if(egret.Capabilities.os == "Android") {
                    window["AndroidhidePicture"]("");
                }
            }
        }
    }
    
    //创建场景
    private createScene() {
        //判断显示
        if(LoaderData.is_ThemeLoadEnd && LoaderData.is_start_LoadEnd && LoaderData.is_LoginEnd) {
            this.startCreateScene();
        }
    }

    //资源组加载出错
    private onItemLoadError(event: RES.ResourceEvent): void {
        //        alert("Url:" + event.resItem.url + " has failed to load");
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
    }
    
    //显示提示
    private onShowTips(e: egret.Event): void {
        //显示界面
        if(LoaderData.is_ThemeLoadEnd == true) {
            this.tips.show(e.data.tips);
        }
    }
    
    //显示界面
    private onShowStart(e: egret.Event): void {
        //数据赋值
        LoaderData.is_LoginEnd = true;
        UserData.User_Gold = e.data.gold;
        UserData.User_Id = e.data.playerId;
        UserData.User_Phone = e.data.phone;
        UserData.User_Name = e.data.nickName;
        UserData.User_VIP = e.data.vipLevel;
        UserData.User_Head = e.data.headImgURL;
        UserData.User_Token = e.data.token;
        UserData.User_SaveGold = e.data.goldReserve;
        
        //判断保存数据
        if(GameConfig.isApp() == true) {
            if(egret.Capabilities.os == "iOS") {
                window["IOSsaveAccount"](UserData.User_Account);
                window["IOSsavePassword"](UserData.User_Password);
            }
            else if(egret.Capabilities.os == "Android") {
                basic.localStorage.setItem('account',UserData.User_Account);
                basic.localStorage.setItem('password',UserData.User_Password);
            }
        }
        else {
            basic.localStorage.setItem('account',UserData.User_Account);
            basic.localStorage.setItem('password',UserData.User_Password);
        }
        
        //判断显示
        if(LoaderData.is_start_LoadEnd) {
            //创建场景
            this.createScene();
        } 
    }

    //创建场景
    private startCreateScene() {
        //移除加载界面
        basic.SceneManager.removeTopScene(SceneNames.LOADING);

        //显示开始界面
        basic.SceneManager.show(SceneNames.START,null,basic.sceneEffect.Fade);
    }
}
