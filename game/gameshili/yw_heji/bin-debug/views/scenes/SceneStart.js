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
 * @开始界面
 *
 */
var SceneStart = (function (_super) {
    __extends(SceneStart, _super);
    //定义界面
    function SceneStart() {
        var _this = _super.call(this) || this;
        _this.now_show = 0;
        _this.is_startlogin = true;
        _this._timer_check = null;
        _this.now_showGame_type = -1;
        //定义界面
        _this.skinName = SceneStartSkin;
        //注册事件
        basic.Dispatcher.addListener(EventNames.SHOW_FACE, _this.onShowFace, _this);
        basic.Dispatcher.addListener(EventNames.GOLD_CHANGE, _this.onShowGold, _this);
        basic.Dispatcher.addListener(EventNames.DATA_CHANGE, _this.onDataChange, _this);
        //注册按钮
        _this.tabbar_menu.addEventListener(egret.Event.CHANGE, _this.onMenuBtn, _this);
        _this.tabbar_menu0.addEventListener(egret.Event.CHANGE, _this.onMenuBtn1, _this);
        return _this;
    }
    //显示前调用
    SceneStart.prototype.beforeShow = function () {
        //数据赋值
        this.show_goldtimes = 0;
        GameData.Game_Type = -1;
        UserData.User_YaZhu = GameData.JSYS_YaZhu_UserTotal + GameData.EBG_YaZhu_UserTotal;
        //判断显示界面
        if (UserData.is_APP == true) {
            this.tabbar_menu.visible = false;
            this.tabbar_menu0.visible = true;
        }
        else {
            this.tabbar_menu.visible = true;
            this.tabbar_menu0.visible = false;
        }
        //初始界面
        this.start_up.showGold(UserData.User_Gold - UserData.User_YaZhu);
        this.start_up.showMessage(UserData.User_Head, UserData.User_Id, UserData.User_VIP);
        //播放背景音乐
        basic.SoundManager.instance.playMusic("sound_start_mp3");
        //发送消息
        if (this.is_startlogin == false) {
            //发送消息
            Comm.instance.sendSocket({ "type": "dataUpdate" });
        }
        else {
            //定义变量
            var now_date = new Date();
            //数据赋值
            this.is_startlogin = false;
            this.now_time = Number(now_date);
            //开始检测
            this._timer_check = new egret.Timer(500);
            this._timer_check.addEventListener(egret.TimerEvent.TIMER, this.onCheckBackGame, this);
            this._timer_check.start();
        }
    };
    //隐藏前调用
    SceneStart.prototype.beforeHide = function () {
        //停止声音
        basic.SoundManager.instance.stopMusic();
    };
    //检测游戏
    SceneStart.prototype.onCheckBackGame = function (e) {
        //定义变量
        var now_date = new Date();
        //判断显示
        if (Number(now_date) - this.now_time > 1000) {
            //判断显示
            if (GameData.Game_Type != -1) {
                //数据赋值
                this.now_showGame_type = GameData.Game_Type;
                //退出游戏
                basic.SceneManager.instance.back();
            }
        }
        else {
            if (this.now_showGame_type != -1) {
                //进入游戏
                this.start_cards.enterGame(this.now_showGame_type);
                //数据赋值
                this.now_showGame_type = -1;
            }
        }
        //数据赋值
        this.now_time = Number(now_date);
    };
    //显示界面
    SceneStart.prototype.showFace = function () {
        //判断显示
        if (this.now_show == 0) {
            this.start_cards.visible = true;
        }
        else if (this.now_show == 1) {
            //显示商店
            basic.SceneManager.addTopScene(SceneNames.SHOP);
        }
        else if (this.now_show == 2) {
            //显示排行榜
            basic.SceneManager.addTopScene(SceneNames.RANKING);
        }
        else if (this.now_show == 3) {
            //显示保险箱
            basic.SceneManager.addTopScene(SceneNames.SAVEBOX);
        }
        else if (this.now_show == 4) {
            //显示关于
            basic.SceneManager.addTopScene(SceneNames.ABOUT);
        }
        else if (this.now_show == 5) {
            //显示客服
            basic.SceneManager.addTopScene(SceneNames.CUSTOM);
        }
        else if (this.now_show == 6) {
            //显示服务条款
            basic.SceneManager.addTopScene(SceneNames.CLAUSE);
        }
    };
    //隐藏界面
    SceneStart.prototype.hideFace = function () {
        //判断隐藏
        if (this.now_show == 0) {
            this.start_cards.visible = false;
        }
        else if (this.now_show == 1) {
            //隐藏商店
            basic.SceneManager.removeTopScene(SceneNames.SHOP);
        }
        else if (this.now_show == 2) {
            //隐藏排行榜
            basic.SceneManager.removeTopScene(SceneNames.RANKING);
        }
        else if (this.now_show == 3) {
            //隐藏保险箱
            basic.SceneManager.removeTopScene(SceneNames.SAVEBOX);
        }
        else if (this.now_show == 4) {
            //隐藏关于
            basic.SceneManager.removeTopScene(SceneNames.ABOUT);
        }
        else if (this.now_show == 5) {
            //隐藏客服
            basic.SceneManager.removeTopScene(SceneNames.CUSTOM);
        }
        else if (this.now_show == 6) {
            //隐藏服务条款
            basic.SceneManager.removeTopScene(SceneNames.CLAUSE);
        }
    };
    //显示界面
    SceneStart.prototype.onShowFace = function (e) {
        //隐藏界面
        this.hideFace();
        //数据赋值
        this.now_show = e.data.nowshow;
        //判断显示
        if (this.now_show < 4) {
            this.tabbar_menu.selectedIndex = this.now_show;
        }
        else {
            this.tabbar_menu.selectedIndex = -1;
        }
        //显示界面
        this.showFace();
    };
    //金币改变事件
    SceneStart.prototype.onDataChange = function (e) {
        //判断显示
        if (e.data.type == "exchangeGold") {
            //数据赋值
            UserData.User_Gold = e.data.gold;
            UserData.User_SaveGold = e.data.goldReserve;
            //发送消息
            basic.Dispatcher.dispatch(EventNames.GOLD_CHANGE);
            //显示金币
            this.start_up.showGold(UserData.User_Gold);
        }
        else if (e.data.type == "dataChange") {
            if (e.data.dataType == "gold") {
                //数据赋值
                this.show_goldtimes += 1;
                UserData.User_Gold = e.data.value;
                //判断赋值
                if (this.show_goldtimes == 2 && GameData.Game_Type == -1) {
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
    };
    //显示金币
    SceneStart.prototype.onShowGold = function (e) {
        //初始界面
        this.start_up.showGold(UserData.User_Gold - UserData.User_YaZhu);
    };
    //菜单按钮
    SceneStart.prototype.onMenuBtn = function (e) {
        //播放声音
        basic.SoundManager.instance.playEffect("sound_btn_mp3");
        //发送消息
        basic.Dispatcher.dispatch(EventNames.SHOW_FACE, {
            "nowshow": this.tabbar_menu.selectedIndex
        });
    };
    //菜单按钮
    SceneStart.prototype.onMenuBtn1 = function (e) {
        //播放声音
        basic.SoundManager.instance.playEffect("sound_btn_mp3");
        //发送消息
        if (this.tabbar_menu0.selectedIndex == 0) {
            basic.Dispatcher.dispatch(EventNames.SHOW_FACE, {
                "nowshow": this.tabbar_menu0.selectedIndex
            });
        }
        else {
            basic.Dispatcher.dispatch(EventNames.SHOW_FACE, {
                "nowshow": this.tabbar_menu0.selectedIndex + 1
            });
        }
    };
    return SceneStart;
}(basic.SceneBase));
__reflect(SceneStart.prototype, "SceneStart");
