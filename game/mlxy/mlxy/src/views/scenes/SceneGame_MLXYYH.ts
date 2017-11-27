/**
 *
 * @游戏-马来西亚银行
 *
 */
class SceneGame_MLXYYH extends basic.SceneBase {
    //定义变量
    private PK: MLXYYH_PK;
    private over: MLXYYH_Over;
    private show: MLXYYH_Show;
    private rect_back: eui.Rect;
    private menu_top:MLXYYH_Top;
    private run_left: MLXYYH_Run;
    private run_right: MLXYYH_Run;
    private choose: MLXYYH_Choose;
    private history: MLXYYH_History;
    private countdown: Game_CountDown;
    private tianshi: Game_TianShiTotal;//彩虹
    private caishen_fly: CaiShen_Flay;//财神
    private is_show_caishen: Boolean = false;
    private is_show_tisnshi: Boolean = false;
    
    //数据变量
    private rate_zoom: number;
    private _tween_top_y: egret.Tween = null;
    private _tween_choose_y: egret.Tween = null;
    
    //定义界面
    public constructor() {
        super();

        //定义界面
        this.skinName = SceneGame_MLXYYHSkin;
        
        //显示界面
        this.countdown.touchEnabled = false;
        this.countdown.touchChildren = false;
        
        //注册事件
        basic.Dispatcher.addListener(EventNames.MLXYYH_RUNOVER,this.onRunOver,this);
        basic.Dispatcher.addListener(EventNames.MLXYYH_HIDEMENU,this.onHideMenu,this);
        basic.Dispatcher.addListener(EventNames.MLXYYH_GAMEINFO,this.onGameInfo,this);
        basic.Dispatcher.addListener(EventNames.MLXYYH_GAMEOPEN,this.onShowGameOpen,this);
        basic.Dispatcher.addListener(EventNames.MLXYYH_CHANGESTATUS,this.onChangeStatus,this);
    }
    
    //显示前调用
    beforeShow(): void {
        //判断显示位置
        this.onShowPlace();
        
        //数据赋值
        GameData.Game_Id = 3;
        GameData.Game_Type = 3
        
        //游戏初始化
        Comm_mlxyyh.instance.sendSocket({ "type": "gameInfo" });
    }
    
    //影藏时调用
    onHide(): void {
        //清除界面
        this.history.clean();
        this.run_left.clean();
        this.run_right.clean();
        
        //数据赋值
        GameData.Game_Id = 1;
        GameData.Game_Type = 1;

        //发送消息
        Comm_mlxyyh.instance.sendSocket({ "type": "exitGame" });
    }
    
    //显示菜单
    private showMenu():void{
        //判断停止
        if(this._tween_top_y) {
            this._tween_top_y.setPaused(true);
            this._tween_top_y = null;
        }
        if(this._tween_choose_y) {
            this._tween_choose_y.setPaused(true);
            this._tween_choose_y = null;
        }
        
        //显示选择界面
        this._tween_choose_y = egret.Tween.get(this.choose).
            to({ y: 640 - this.choose.height * this.choose.scaleY },300);

        //显示Top
        if(basic.StageProxy.width > 1000) {
            //显示选择界面
            this._tween_top_y = egret.Tween.get(this.menu_top).to({ y: 0 },300);
        }
        
        //注册按钮
        this.choose.registerBtn();
    }
    
    //隐藏菜单
    private hideMenu():void{
        //判断停止
        if(this._tween_top_y) {
            this._tween_top_y.setPaused(true);
            this._tween_top_y = null;
        }
        if(this._tween_choose_y) {
            this._tween_choose_y.setPaused(true);
            this._tween_choose_y = null;
        }

        //显示选择界面
        this._tween_choose_y = egret.Tween.get(this.choose).to({ y: 640 },300);

        //显示Top
        if(basic.StageProxy.width > 1000) {
            //显示选择界面
            this._tween_top_y = egret.Tween.get(this.menu_top).to({ y: -this.menu_top.height * this.menu_top.scaleX },300);
        }
    }
    
    //购买按钮
    private playTianShiAction(_callback:Function): void {
        //判断显示
        if(this.is_show_tisnshi == false) {
            //数据赋值
            this.is_show_tisnshi = true;

            //显示天使
            this.tianshi = new Game_TianShiTotal();
            this.addChild(this.tianshi);

            //初始化天使动画
            this.tianshi.start(() => {
                if(this.is_show_tisnshi == true) {
                    //数据赋值
                    this.is_show_tisnshi = false;

                    //移除天使
                    this.removeChild(this.tianshi);
                    
                    //显示回调函数
                    _callback();
                }
            });
        }
    }
    
    //播放财神动画
    private playCaiShenAction(_callback: Function): void {
        //判断显示
        if(this.is_show_caishen == false) {
            //数据赋值
            this.is_show_caishen = true;

            //播放是声音
            basic.SoundManager.instance.playMusic("sound_caishen_mp3",1);

            //显示财神动画
            this.caishen_fly = new CaiShen_Flay();
            this.addChild(this.caishen_fly);

            //初始化财神动画
            this.caishen_fly.info(() => {
                if(this.is_show_caishen==true){
                    //数据赋值
                    this.is_show_caishen = false;

                    //移除财神动画
                    this.removeChild(this.caishen_fly);
                    
                    //显示回调函数
                    _callback();
                }
            });
        }
    }
    
    //----------------------------定时事件----------------------
    //游戏初始化
    private onGameInfo(e: egret.Event): void {
        //倍率数据
        GameData.MLXYYH_BeiLv = GameData.Game_Chip_Gold[GameData.Game_Chip_Now];

        //压住
        GameData.MLXYYH_YaZhu_IsStart = false;
        GameData.MLXYYH_YaZhu_User = e.data.betGolds;
        GameData.MLXYYH_YaZhu_Total = e.data.totalBetGolds;
        GameData.MLXYYH_YaZhu_NowUser = [0,0,0,0,0,0,0];
        GameData.MLXYYH_IsDouble = e.data.isDouble;
        GameData.MLXYYH_RunOver_Luck = -1;
        
        //显示历史记录
        this.history.info(e.data.status,e.data.leftTime);
        
        //判断显示
        if(e.data.status == 1) {
            //显示界面
            this.showMenu();
        }
        else if(e.data.status == 2) {
            //显示提示
            this.countdown.showWaiting("本局开奖中，等待下一局开始！");
        }
        else if(e.data.status == 3){
            //显示结算界面
            this.over.visible = true;
            
            //显示内容
            this.over.showDetail();
            
            //显示提示
            this.countdown.showWaiting("本局结算中，等待下一局开始！");
        }
        
        //初始化界面
        this.choose.info();
        this.run_left.showNow(e.data.pos[0]);
        this.run_right.showNow(e.data.pos[1]);
    }

    //跑结束
    private onRunOver(e: egret.Event): void {
        //判断显示界面
        if(GameData.MLXYYH_IsDouble == true) {
            //显示彩虹
            this.playTianShiAction(() => {
                //显示PK
                this.PK.start();
            });
        }
        else if(GameData.MLXYYH_IsReturn == true) {
            //显示财神
            this.playCaiShenAction(()=>{
                //显示PK
                this.PK.start();
            });
        }
        else {
            //显示PK
            this.PK.start();
        }
    }
    
    //显示游戏开始
    private onShowGameOpen(e: egret.Event): void {
        //核对答案
        this.choose.checkYaZhu(e.data);
        
        //数据赋值
        if(e.data.isDouble == true) {
            GameData.MLXYYH_IsDouble = true;
        }
        else{
            GameData.MLXYYH_IsDouble = false;
        }
        if(e.data.isReturn == true) {
            GameData.MLXYYH_IsReturn = true;
        }
        else{
            GameData.MLXYYH_IsReturn = false;
        }
        if(e.data.pos.length == 3) {
            GameData.MLXYYH_RunOver_Luck = e.data.pos[2].pos;
        }
        else {
            GameData.MLXYYH_RunOver_Luck = -1;
        }
        
        //判断显示
        this.run_left.startPlay(e.data.pos[0]);
        this.run_right.startPlay(e.data.pos[1]);
    }
    
    //隐藏菜单界面
    private onHideMenu(e: egret.Event): void {
        //隐藏界面
        this.hideMenu();
    }
    
    //改变状态
    private onChangeStatus(e: egret.Event): void {
        //数据赋值
        if(e.data.status == 0) {
            //清空数据
            GameData.MLXYYH_AddGold = 0;
            GameData.MLXYYH_YaZhu_IsStart = false;
            GameData.MLXYYH_YaZhu_User = [0,0,0,0,0,0,0];
            GameData.MLXYYH_YaZhu_Total = [0,0,0,0,0,0,0];
            GameData.MLXYYH_YaZhu_NowUser = [0,0,0,0,0,0,0];

            //清除界面
            this.choose.clean();
            this.run_left.clean();
            this.run_right.clean();
            
            //隐藏结算界面
            this.over.visible = false;
            
            //隐藏PK
            basic.Dispatcher.dispatch(EventNames.MLXYYH_HIDEPK);
        }
        else if(e.data.status == 1) {
            //显示界面
            this.showMenu();
            
            //隐藏结算界面
            this.over.visible = false;
            
            //隐藏PK
            basic.Dispatcher.dispatch(EventNames.MLXYYH_HIDEPK);
        }
        else if(e.data.status == 2) {
            //隐藏结算界面
            this.over.visible = false;
        }
        else if(e.data.status == 3){
            //显示结算界面
            this.over.visible = true;

            //显示内容
            this.over.showDetail();
            
            //隐藏PK
            basic.Dispatcher.dispatch(EventNames.MLXYYH_HIDEPK);
        }
    }
    
   //显示位置
     onShowPlace(): void {
        //定义变量
        var rate: number;
        var over_rate: number;
        
        //定义大小
        this.choose.y = 640;
        this.choose.visible = true;
        this.choose.scaleX = basic.StageProxy.width / 1138;
        this.choose.scaleY = basic.StageProxy.width / 1138;
        this.menu_top.scaleX = basic.StageProxy.width / 1138;
        this.menu_top.scaleY = basic.StageProxy.width / 1138;
        
        //判断显示位置
        if(basic.StageProxy.width > 1136) {
            //数据赋值
            over_rate = 1;
            rate = Math.min(1,(basic.StageProxy.width - 1136) / 164);
            this.rate_zoom = Math.min(1,basic.StageProxy.width / 1138);
            
            //定义大小
            this.show.scaleX = this.rate_zoom;
            this.show.scaleY = this.rate_zoom;
            this.history.scaleX = this.rate_zoom;
            this.history.scaleY = this.rate_zoom;
            this.run_left.scaleX = this.rate_zoom;
            this.run_left.scaleY = this.rate_zoom;
            this.run_right.scaleX = this.rate_zoom;
            this.run_right.scaleY = this.rate_zoom;
            this.rect_back.height = this.run_left.height * this.rate_zoom;
            
            //定义位置
            this.run_left.y = 4;
            this.run_right.y = 4;
            this.run_left.x = 9 + rate * 64 + Math.max(0,(basic.StageProxy.width - 1300)/2);
            this.run_right.x = 572 + rate * 101 + Math.max(0,(basic.StageProxy.width - 1300) / 2);
            this.history.x = this.run_left.x + 80 * this.rate_zoom;
            this.history.y = this.run_left.y + 80 * this.rate_zoom;
            this.show.x = this.run_right.x + 80 * this.rate_zoom;
            this.show.y = this.run_right.y + 80 * this.rate_zoom;
            this.rect_back.y = this.run_left.y;
            
            //隐藏界面
            this.menu_top.y = -this.menu_top.height * this.menu_top.scaleX;
        }
        else if(basic.StageProxy.width > 1000) {
            //数据赋值
            over_rate = 1;
            rate = (basic.StageProxy.width - 1000) / 136;
            this.rate_zoom = 0.88 + 0.12 * rate;
            
            //定义大小
            this.show.scaleX = this.rate_zoom;
            this.show.scaleY = this.rate_zoom;
            this.history.scaleX = this.rate_zoom;
            this.history.scaleY = this.rate_zoom;
            this.run_left.scaleX = this.rate_zoom;
            this.run_left.scaleY = this.rate_zoom;
            this.run_right.scaleX = this.rate_zoom;
            this.run_right.scaleY = this.rate_zoom;
            this.rect_back.height = this.run_left.height * this.rate_zoom;
            
            //定义位置
            this.run_left.y = 41 - 37 * rate;
            this.run_right.y = 41 - 37 * rate;
            this.run_left.x = 9 + rate * 1;
            this.run_right.x = 503 + rate * 69;
            this.rect_back.y = this.run_left.y;
            this.show.x = this.run_right.x + 80 * this.rate_zoom;
            this.show.y = this.run_right.y + 80 * this.rate_zoom;
            this.history.x = this.run_left.x + 80 * this.rate_zoom;
            this.history.y = this.run_left.y + 80 * this.rate_zoom;
            
            //隐藏界面
            this.menu_top.y = -this.menu_top.height * this.menu_top.scaleX;
        }
        else {
            //数据赋值
            rate = (basic.StageProxy.width - 830) / 170;
            this.rate_zoom = 0.72 + 0.15 * rate;
            over_rate = 0.8 + 0.2 * rate;

            //定义大小
            this.show.scaleX = this.rate_zoom;
            this.show.scaleY = this.rate_zoom;
            this.history.scaleX = this.rate_zoom;
            this.history.scaleY = this.rate_zoom;
            this.run_left.scaleX = this.rate_zoom;
            this.run_left.scaleY = this.rate_zoom;
            this.run_right.scaleX = this.rate_zoom;
            this.run_right.scaleY = this.rate_zoom;
            this.rect_back.height = this.run_left.height * this.rate_zoom;

            //定义位置
            this.run_left.y = 110 - 40 * rate;
            this.run_right.y = 110 - 40 * rate;
            this.run_left.x = 9 + rate * 3;
            this.run_right.x = 420 + rate * 85;
            this.rect_back.y = this.run_left.y;
            this.show.x = this.run_right.x + 80 * this.rate_zoom;
            this.show.y = this.run_right.y + 80 * this.rate_zoom;
            this.history.x = this.run_left.x + 80 * this.rate_zoom;
            this.history.y = this.run_left.y + 80 * this.rate_zoom;
            
            //显示界面
            this.menu_top.y = 0;
        }
        
        //初始化界面
        this.run_left.info(0);
        this.run_right.info(1);
        this.over.info(over_rate);
        this.over.visible = false;
        this.PK.info(this.rate_zoom,this.run_left.x,this.run_left.y,this.run_right.x,this.run_right.y);
    }
}