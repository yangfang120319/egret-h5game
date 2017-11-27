/**
 *
 * @游戏卡片
 *
 */
class Start_Card extends eui.Component{
    //显示界面
    private card_num: number;
    private img_box: eui.Image;
    private img_back: eui.Image;
    private img_mask: eui.Image;
    private img_txt: eui.Image;
    private img_icon: eui.Image;
    private img_texiao: eui.Image;
    private img_box_texiao: eui.Image;
    private img_txt_texiao: eui.Image;
    private img_icon_texiao: eui.Image;
    private _tween_alpha: egret.Tween = null;
    private _tween_scaleX: egret.Tween = null;
    private _tween_scaleY: egret.Tween = null;
    private _tween_box_alpha: egret.Tween = null;
    private _tween_box_scaleX: egret.Tween = null;
    private _tween_box_scaleY: egret.Tween = null;
    private _tween_txt_alpha: egret.Tween = null;
    private _tween_txt_scaleX: egret.Tween = null;
    private _tween_txt_scaleY: egret.Tween = null;
    private _tween_icon_alpha: egret.Tween = null;
    private _tween_icon_scaleX: egret.Tween = null;
    private _tween_icon_scaleY: egret.Tween = null;
    private game_name: string[] = [SceneNames.GAME_JSYS,SceneNames.GAME_EBG,""];
    private game_loadname: string[] = ["jsysload","ebgload",""];
    private is_showwaiting: Boolean = false;
    public is_canClick: Boolean;
    private is_login: Boolean;
    
    //定义界面
    public constructor() {
        super();
        
        //定义界面
        this.skinName = Start_CardSkin;
        
        //隐藏界面
        this.img_texiao.visible = false;
        this.img_txt_texiao.visible = false;
        this.img_icon_texiao.visible = false;
        
        //注册事件
        basic.Dispatcher.addListener(EventNames.GAME_LOGIN,this.onGameLogin,this);
        basic.Dispatcher.addListener(EventNames.REMOVE_WAITING,this.onRemoveWaiting,this);
        
        //注册按钮
        this.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onThisBtn,this);
    }
    
    //显示界面
    show(_picture: string,_card_txt: string,_card_icon: string,_cardnum: number): void {
        //显示图片
        this.img_back.source = _picture;
        this.img_texiao.source = _picture;
        this.img_txt.source = _card_txt;
        this.img_icon.source = _card_icon;
        this.img_txt_texiao.source = _card_txt;
        this.img_icon_texiao.source = _card_icon;
        
        //判断显示
        if(_cardnum == 2) {
            this.img_txt.verticalCenter = 13;
            this.img_txt_texiao.verticalCenter = 13;
        }
        
        //数据赋值
        this.card_num = _cardnum;
    }
    
    //显示状态
    showState(_state:string):void{
        //显示状态
        this.currentState = _state;
    }
    
    //显示遮罩透明度
    showMaskAlpha(_alpha:number):void{
        //显示遮罩透明度
        this.img_mask.alpha = _alpha;
    }
    
    //登录事件
    private onGameLogin(e:egret.Event):void{
        //数据赋值
        this.is_login = true;
    }
    
    //定义按钮
    private onThisBtn(e: egret.TouchEvent): void {
        //判断显示
        if(this.is_canClick == true) {
            if(this.currentState == "show") {
                //显示界面
                this.img_texiao.scaleX = 1;
                this.img_texiao.scaleY = 1;
                this.img_texiao.alpha = 0.6;
                this.img_box_texiao.scaleX = 1;
                this.img_box_texiao.scaleY = 1;
                this.img_box_texiao.alpha = 0.6;
                this.img_txt_texiao.scaleX = 0.8;
                this.img_txt_texiao.scaleY = 0.8;
                this.img_txt_texiao.alpha = 0.6;
                this.img_icon_texiao.scaleX = 1;
                this.img_icon_texiao.scaleY = 1;
                this.img_icon_texiao.alpha = 0.6;
                this.img_texiao.visible = true;
                this.img_txt_texiao.visible = true;
                this.img_icon_texiao.visible = true;

                //停止欢动效果
                this.stopTween();

                //显示动画
                this._tween_alpha = egret.Tween.get(this.img_texiao).to({ alpha: 0.1 },300).to({ alpha: 0 },300);
                this._tween_scaleX = egret.Tween.get(this.img_texiao).to({ scaleX: 1.12 },300).to({ scaleX: 1.3 },300);
                this._tween_box_alpha = egret.Tween.get(this.img_box_texiao).to({ alpha: 0.1 },300).to({ alpha: 0 },300);
                this._tween_box_scaleX = egret.Tween.get(this.img_box_texiao).to({ scaleX: 1.12 },300).to({ scaleX: 1.3 },300);
                this._tween_box_scaleY = egret.Tween.get(this.img_box_texiao).to({ scaleY: 1.12 },300).to({ scaleY: 1.3 },300);
                this._tween_txt_alpha = egret.Tween.get(this.img_txt_texiao).to({ alpha: 0.1 },300).to({ alpha: 0 },300);
                this._tween_txt_scaleX = egret.Tween.get(this.img_txt_texiao).to({ scaleX: 0.896 },300).to({ scaleX: 1.04 },300);
                this._tween_txt_scaleY = egret.Tween.get(this.img_txt_texiao).to({ scaleY: 0.896 },300).to({ scaleY: 1.04 },300);
                this._tween_icon_alpha = egret.Tween.get(this.img_icon_texiao).to({ alpha: 0.1 },300).to({ alpha: 0 },300);
                this._tween_icon_scaleX = egret.Tween.get(this.img_icon_texiao).to({ scaleX: 1.12 },300).to({ scaleX: 1.3 },300);
                this._tween_icon_scaleY = egret.Tween.get(this.img_icon_texiao).to({ scaleY: 1.12 },300).to({ scaleY: 1.3 },300);
                this._tween_scaleY = egret.Tween.get(this.img_texiao).to({ scaleY: 1.12 },300).to({ scaleY: 1.3 },300).call(() => {
                    //隐藏界面
                    this.img_texiao.visible = false;
                    this.img_txt_texiao.visible = false;
                    this.img_icon_texiao.visible = false;
                    
                    //进入游戏
                    this.enterGame();
                });
            }
            else {
                //发送消息
                basic.Dispatcher.dispatch(EventNames.SHOW_NOWCARD,{ "nowcardnum": this.card_num });
            }
        }
    }
    
    //进入游戏
    enterGame(): void {
        //判断显示
        if(this.card_num < 2) {
            //数据赋值
            this.is_login = false;
            this.is_showwaiting = true;

            //链接数据库
            if(this.card_num == 0) {
                //初始化界面
                Comm_jsys.instance.init();
            }
            else if(this.card_num == 1) {
                //初始化界面
                Comm_ebg.instance.init();
            }

            //显示等待界面
            basic.SceneManager.addTopScene(SceneNames.WAITING);

            //加载界面
            if(LoaderData.is_Game_LoadEnd[this.card_num] == false) {
                //加载资源
                RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE,this.onResourceLoadComplete,this);
                RES.addEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR,this.onResourceLoadError,this);
                RES.addEventListener(RES.ResourceEvent.GROUP_PROGRESS,this.onResourceProgress,this);
                RES.addEventListener(RES.ResourceEvent.ITEM_LOAD_ERROR,this.onItemLoadError,this);
                RES.loadGroup(this.game_loadname[this.card_num]);
            }

            //注册等待
            this.addEventListener(egret.Event.ENTER_FRAME,this.onShowGame,this);
        }
        else if(this.card_num == 2) {
            //显示开房间对话框
            PanelCreateRoom.instance.show();
        }
        else{
            //发送消息
            basic.Dispatcher.dispatch(EventNames.SHOW_TIPS,{"tips":"游戏开发中，敬请期待"})
        }
    }

    //preload资源组加载完成
    private onResourceLoadComplete(event: RES.ResourceEvent): void {
        //数据赋值
        LoaderData.is_Game_LoadEnd[this.card_num] = true;

        //注销事件
        RES.removeEventListener(RES.ResourceEvent.GROUP_COMPLETE,this.onResourceLoadComplete,this);
        RES.removeEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR,this.onResourceLoadError,this);
        RES.removeEventListener(RES.ResourceEvent.GROUP_PROGRESS,this.onResourceProgress,this);
        RES.removeEventListener(RES.ResourceEvent.ITEM_LOAD_ERROR,this.onItemLoadError,this);
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
        //显示进度条
        basic.Dispatcher.dispatch(EventNames.LOADING_PROGRESS,{
            itemsLoaded: event.itemsLoaded,
            itemsTotal: event.itemsTotal
        });
    }

    //显示游戏
    private onShowGame(e: egret.Event): void {
        //判断显示界面
        if(LoaderData.is_Game_LoadEnd[this.card_num] == true && this.is_login == true) {
            //数据赋值
            this.is_showwaiting = false;

            //移除等待界面
            basic.SceneManager.removeTopScene(SceneNames.WAITING);

            //注销等待
            this.removeEventListener(egret.Event.ENTER_FRAME,this.onShowGame,this);

            //显示游戏
            this.showGame();
        }
    }

    //判断移除界面
    private onRemoveWaiting(e: egret.Event): void {
        //判断移除
        if(this.is_showwaiting == true) {
            //数据赋值
            this.is_showwaiting = false;

            //移除等待界面
            basic.SceneManager.removeTopScene(SceneNames.WAITING);

            //注销等待
            this.removeEventListener(egret.Event.ENTER_FRAME,this.onShowGame,this);

            //判断关闭连接
            if(this.card_num == 0) {
                Comm_jsys.instance.closeConnect();
            }
            else if(this.card_num == 1) {
                Comm_ebg.instance.closeConnect();
            }
        }
    }

    //显示游戏
    private showGame(): void {
        //判断显示游戏
        if(this.card_num < 2) {
            //显示游戏
            basic.SceneManager.show(this.game_name[this.card_num]);
        }
    }
    
    //停止缓动效果
    private stopTween():void{
        //判断停止
        if(this._tween_alpha){
            this._tween_alpha.setPaused(true);
            this._tween_alpha = null;
        }
        if(this._tween_scaleX) {
            this._tween_scaleX.setPaused(true);
            this._tween_scaleX = null;
        }
        if(this._tween_scaleY) {
            this._tween_scaleY.setPaused(true);
            this._tween_scaleY = null;
        }
        if(this._tween_box_alpha) {
            this._tween_box_alpha.setPaused(true);
            this._tween_box_alpha = null;
        }
        if(this._tween_box_scaleX) {
            this._tween_box_scaleX.setPaused(true);
            this._tween_box_scaleX = null;
        }
        if(this._tween_box_scaleY) {
            this._tween_box_scaleY.setPaused(true);
            this._tween_box_scaleY = null;
        }
        if(this._tween_txt_alpha) {
            this._tween_txt_alpha.setPaused(true);
            this._tween_txt_alpha = null;
        }
        if(this._tween_txt_scaleX) {
            this._tween_txt_scaleX.setPaused(true);
            this._tween_txt_scaleX = null;
        }
        if(this._tween_txt_scaleY) {
            this._tween_txt_scaleY.setPaused(true);
            this._tween_txt_scaleY = null;
        }
        if(this._tween_icon_alpha) {
            this._tween_icon_alpha.setPaused(true);
            this._tween_icon_alpha = null;
        }
        if(this._tween_icon_scaleX) {
            this._tween_icon_scaleX.setPaused(true);
            this._tween_icon_scaleX = null;
        }
        if(this._tween_icon_scaleY) {
            this._tween_icon_scaleY.setPaused(true);
            this._tween_icon_scaleY = null;
        }
    }
    
}
