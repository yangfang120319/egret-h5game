/**
 *
 * @开始界面
 *
 */
class SceneStart extends basic.SceneBase{
    //定义变量
    private start_up: Start_Up;
    private start_chat: Start_Chat;
    private start_cards: Start_Cards;
    private tabbar_menu: eui.TabBar;
    private tabbar_menu0: eui.TabBar;
    private now_show: number = 0;
    private is_startlogin: Boolean = true;
    private show_goldtimes: number;
    private _timer_check: egret.Timer = null;
    private now_showGame_type: number = -1;
    private now_time: number;
    
    //定义界面
    public constructor() {
        super();
        
        //定义界面
        this.skinName = SceneStartSkin;
        
        //注册事件
        basic.Dispatcher.addListener(EventNames.SHOW_FACE,this.onShowFace,this);
        basic.Dispatcher.addListener(EventNames.GOLD_CHANGE,this.onShowGold,this);
        basic.Dispatcher.addListener(EventNames.DATA_CHANGE,this.onDataChange,this);

        //注册按钮
        this.tabbar_menu.addEventListener(egret.Event.CHANGE,this.onMenuBtn,this);
        this.tabbar_menu0.addEventListener(egret.Event.CHANGE,this.onMenuBtn1,this);
    }
    
    //显示前调用
    beforeShow():void{
        //数据赋值
        this.show_goldtimes = 0;
        GameData.Game_Type = -1;
        UserData.User_YaZhu = GameData.JSYS_YaZhu_UserTotal + GameData.EBG_YaZhu_UserTotal;
        
        //判断显示界面
        if(UserData.is_APP == true) {
            this.tabbar_menu.visible = false;
            this.tabbar_menu0.visible = true;
        }
        else {
            this.tabbar_menu.visible = true;
            this.tabbar_menu0.visible = false;
        }
        
        //初始界面
        this.start_up.showGold(UserData.User_Gold - UserData.User_YaZhu);
        this.start_up.showMessage(UserData.User_Head,UserData.User_Id,UserData.User_VIP);

        //播放背景音乐
        basic.SoundManager.instance.playMusic("sound_start_mp3");
        
        //发送消息
        if(this.is_startlogin == false) {
            //发送消息
            Comm.instance.sendSocket({ "type": "dataUpdate" });
        }
        else {
            //定义变量
            var now_date: Date = new Date();
            
            //数据赋值
            this.is_startlogin = false;
            this.now_time = Number(now_date);
            
            //开始检测
            this._timer_check = new egret.Timer(500);
            this._timer_check.addEventListener(egret.TimerEvent.TIMER,this.onCheckBackGame,this);
            this._timer_check.start();
        }
    }
    
    //隐藏前调用
    beforeHide(): void {
        //停止声音
        basic.SoundManager.instance.stopMusic();
    }
    
    //检测游戏
    private onCheckBackGame(e:egret.TimerEvent):void{
        //定义变量
        var now_date: Date = new Date();
        
        //判断显示
        if(Number(now_date) - this.now_time > 1000) {
            //判断显示
            if(GameData.Game_Type != -1) {
                //数据赋值
                this.now_showGame_type = GameData.Game_Type;

                //退出游戏
                basic.SceneManager.instance.back();
            }
        }
        else{
            if(this.now_showGame_type != -1) {
                //进入游戏
                this.start_cards.enterGame(this.now_showGame_type);

                //数据赋值
                this.now_showGame_type = -1;
            }
        }
        
        //数据赋值
        this.now_time = Number(now_date);
    }
    
    //显示界面
    private showFace():void{
        //判断显示
        if(this.now_show == 0) {
            this.start_cards.visible = true;
        }
        else if(this.now_show == 1) {
            //显示商店
            basic.SceneManager.addTopScene(SceneNames.SHOP);
        }
        else if(this.now_show == 2) {
            //显示排行榜
            basic.SceneManager.addTopScene(SceneNames.RANKING);
        }
        else if(this.now_show == 3) {
            //显示保险箱
            basic.SceneManager.addTopScene(SceneNames.SAVEBOX);
        }
        else if(this.now_show == 4){
            //显示关于
            basic.SceneManager.addTopScene(SceneNames.ABOUT);
        }
        else if(this.now_show == 5) {
            //显示客服
            basic.SceneManager.addTopScene(SceneNames.CUSTOM);
        }
        else if(this.now_show == 6) {
            //显示服务条款
            basic.SceneManager.addTopScene(SceneNames.CLAUSE);
        }
    }
    
    //隐藏界面
    private hideFace(): void {
        //判断隐藏
        if(this.now_show == 0) {
            this.start_cards.visible = false;
        }
        else if(this.now_show == 1){
            //隐藏商店
            basic.SceneManager.removeTopScene(SceneNames.SHOP);
        }
        else if(this.now_show == 2){
            //隐藏排行榜
            basic.SceneManager.removeTopScene(SceneNames.RANKING);
        }
        else if(this.now_show == 3) {
            //隐藏保险箱
            basic.SceneManager.removeTopScene(SceneNames.SAVEBOX);
        }
        else if(this.now_show == 4) {
            //隐藏关于
            basic.SceneManager.removeTopScene(SceneNames.ABOUT);
        }
        else if(this.now_show == 5) {
            //隐藏客服
            basic.SceneManager.removeTopScene(SceneNames.CUSTOM);
        }
        else if(this.now_show == 6) {
            //隐藏服务条款
            basic.SceneManager.removeTopScene(SceneNames.CLAUSE);
        }
    }
    
    //显示界面
    private onShowFace(e: egret.Event): void {
        //隐藏界面
        this.hideFace();

        //数据赋值
        this.now_show = e.data.nowshow;
        
        //判断显示
        if(this.now_show < 4) {
            this.tabbar_menu.selectedIndex = this.now_show;
        }
        else{
            this.tabbar_menu.selectedIndex = -1;
        }

        //显示界面
        this.showFace();
    }
    
    //金币改变事件
    private onDataChange(e:egret.Event):void{
        //判断显示
        if(e.data.type =="exchangeGold"){
            //数据赋值
            UserData.User_Gold = e.data.gold;
            UserData.User_SaveGold = e.data.goldReserve;

            //发送消息
            basic.Dispatcher.dispatch(EventNames.GOLD_CHANGE);
            
            //显示金币
            this.start_up.showGold(UserData.User_Gold);
        }
        else if(e.data.type =="dataChange"){
            if(e.data.dataType =="gold"){
                //数据赋值
                this.show_goldtimes += 1;
                UserData.User_Gold = e.data.value;
                
                //判断赋值
                if(this.show_goldtimes == 2 && GameData.Game_Type == -1) {
                    UserData.User_YaZhu = 0;
                    GameData.EBG_YaZhu_UserTotal = 0;
                    GameData.JSYS_YaZhu_UserTotal = 0;
                }
                
                //发送消息
                basic.Dispatcher.dispatch(EventNames.GOLD_CHANGE);

                //显示金币
                this.start_up.showGold(UserData.User_Gold - UserData.User_YaZhu);
            }
        }
    }
    
    //显示金币
    private onShowGold(e:egret.Event):void{
        //初始界面
        this.start_up.showGold(UserData.User_Gold - UserData.User_YaZhu);
    }
    
    //菜单按钮
    private onMenuBtn(e:egret.Event):void{
        //播放声音
        basic.SoundManager.instance.playEffect("sound_btn_mp3");
        
        //发送消息
        basic.Dispatcher.dispatch(EventNames.SHOW_FACE,{
            "nowshow": this.tabbar_menu.selectedIndex
        });
    }
    
    //菜单按钮
    private onMenuBtn1(e: egret.Event): void {
        //播放声音
        basic.SoundManager.instance.playEffect("sound_btn_mp3");
        
        //发送消息
        if(this.tabbar_menu0.selectedIndex == 0) {
            basic.Dispatcher.dispatch(EventNames.SHOW_FACE,{
                "nowshow": this.tabbar_menu0.selectedIndex
            });
        }
        else{
            basic.Dispatcher.dispatch(EventNames.SHOW_FACE,{
                "nowshow": this.tabbar_menu0.selectedIndex+1
            });
        }
    }
}
