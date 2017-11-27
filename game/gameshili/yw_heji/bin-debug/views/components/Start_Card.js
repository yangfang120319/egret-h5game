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
 * @游戏卡片
 *
 */
var Start_Card = (function (_super) {
    __extends(Start_Card, _super);
    //定义界面
    function Start_Card() {
        var _this = _super.call(this) || this;
        _this._tween_alpha = null;
        _this._tween_scaleX = null;
        _this._tween_scaleY = null;
        _this._tween_box_alpha = null;
        _this._tween_box_scaleX = null;
        _this._tween_box_scaleY = null;
        _this._tween_txt_alpha = null;
        _this._tween_txt_scaleX = null;
        _this._tween_txt_scaleY = null;
        _this._tween_icon_alpha = null;
        _this._tween_icon_scaleX = null;
        _this._tween_icon_scaleY = null;
        _this.game_name = [SceneNames.GAME_JSYS, SceneNames.GAME_EBG, ""];
        _this.game_loadname = ["jsysload", "ebgload", ""];
        _this.is_showwaiting = false;
        //定义界面
        _this.skinName = Start_CardSkin;
        //隐藏界面
        _this.img_texiao.visible = false;
        _this.img_txt_texiao.visible = false;
        _this.img_icon_texiao.visible = false;
        //注册事件
        basic.Dispatcher.addListener(EventNames.GAME_LOGIN, _this.onGameLogin, _this);
        basic.Dispatcher.addListener(EventNames.REMOVE_WAITING, _this.onRemoveWaiting, _this);
        //注册按钮
        _this.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onThisBtn, _this);
        return _this;
    }
    //显示界面
    Start_Card.prototype.show = function (_picture, _card_txt, _card_icon, _cardnum) {
        //显示图片
        this.img_back.source = _picture;
        this.img_texiao.source = _picture;
        this.img_txt.source = _card_txt;
        this.img_icon.source = _card_icon;
        this.img_txt_texiao.source = _card_txt;
        this.img_icon_texiao.source = _card_icon;
        //判断显示
        if (_cardnum == 2) {
            this.img_txt.verticalCenter = 13;
            this.img_txt_texiao.verticalCenter = 13;
        }
        //数据赋值
        this.card_num = _cardnum;
    };
    //显示状态
    Start_Card.prototype.showState = function (_state) {
        //显示状态
        this.currentState = _state;
    };
    //显示遮罩透明度
    Start_Card.prototype.showMaskAlpha = function (_alpha) {
        //显示遮罩透明度
        this.img_mask.alpha = _alpha;
    };
    //登录事件
    Start_Card.prototype.onGameLogin = function (e) {
        //数据赋值
        this.is_login = true;
    };
    //定义按钮
    Start_Card.prototype.onThisBtn = function (e) {
        var _this = this;
        //判断显示
        if (this.is_canClick == true) {
            if (this.currentState == "show") {
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
                this._tween_alpha = egret.Tween.get(this.img_texiao).to({ alpha: 0.1 }, 300).to({ alpha: 0 }, 300);
                this._tween_scaleX = egret.Tween.get(this.img_texiao).to({ scaleX: 1.12 }, 300).to({ scaleX: 1.3 }, 300);
                this._tween_box_alpha = egret.Tween.get(this.img_box_texiao).to({ alpha: 0.1 }, 300).to({ alpha: 0 }, 300);
                this._tween_box_scaleX = egret.Tween.get(this.img_box_texiao).to({ scaleX: 1.12 }, 300).to({ scaleX: 1.3 }, 300);
                this._tween_box_scaleY = egret.Tween.get(this.img_box_texiao).to({ scaleY: 1.12 }, 300).to({ scaleY: 1.3 }, 300);
                this._tween_txt_alpha = egret.Tween.get(this.img_txt_texiao).to({ alpha: 0.1 }, 300).to({ alpha: 0 }, 300);
                this._tween_txt_scaleX = egret.Tween.get(this.img_txt_texiao).to({ scaleX: 0.896 }, 300).to({ scaleX: 1.04 }, 300);
                this._tween_txt_scaleY = egret.Tween.get(this.img_txt_texiao).to({ scaleY: 0.896 }, 300).to({ scaleY: 1.04 }, 300);
                this._tween_icon_alpha = egret.Tween.get(this.img_icon_texiao).to({ alpha: 0.1 }, 300).to({ alpha: 0 }, 300);
                this._tween_icon_scaleX = egret.Tween.get(this.img_icon_texiao).to({ scaleX: 1.12 }, 300).to({ scaleX: 1.3 }, 300);
                this._tween_icon_scaleY = egret.Tween.get(this.img_icon_texiao).to({ scaleY: 1.12 }, 300).to({ scaleY: 1.3 }, 300);
                this._tween_scaleY = egret.Tween.get(this.img_texiao).to({ scaleY: 1.12 }, 300).to({ scaleY: 1.3 }, 300).call(function () {
                    //隐藏界面
                    _this.img_texiao.visible = false;
                    _this.img_txt_texiao.visible = false;
                    _this.img_icon_texiao.visible = false;
                    //进入游戏
                    _this.enterGame();
                });
            }
            else {
                //发送消息
                basic.Dispatcher.dispatch(EventNames.SHOW_NOWCARD, { "nowcardnum": this.card_num });
            }
        }
    };
    //进入游戏
    Start_Card.prototype.enterGame = function () {
        //判断显示
        if (this.card_num < 2) {
            //数据赋值
            this.is_login = false;
            this.is_showwaiting = true;
            //链接数据库
            if (this.card_num == 0) {
                //初始化界面
                Comm_jsys.instance.init();
            }
            else if (this.card_num == 1) {
                //初始化界面
                Comm_ebg.instance.init();
            }
            //显示等待界面
            basic.SceneManager.addTopScene(SceneNames.WAITING);
            //加载界面
            if (LoaderData.is_Game_LoadEnd[this.card_num] == false) {
                //加载资源
                RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
                RES.addEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onResourceLoadError, this);
                RES.addEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onResourceProgress, this);
                RES.addEventListener(RES.ResourceEvent.ITEM_LOAD_ERROR, this.onItemLoadError, this);
                RES.loadGroup(this.game_loadname[this.card_num]);
            }
            //注册等待
            this.addEventListener(egret.Event.ENTER_FRAME, this.onShowGame, this);
        }
        else if (this.card_num == 2) {
            //显示开房间对话框
            PanelCreateRoom.instance.show();
        }
        else {
            //发送消息
            basic.Dispatcher.dispatch(EventNames.SHOW_TIPS, { "tips": "游戏开发中，敬请期待" });
        }
    };
    //preload资源组加载完成
    Start_Card.prototype.onResourceLoadComplete = function (event) {
        //数据赋值
        LoaderData.is_Game_LoadEnd[this.card_num] = true;
        //注销事件
        RES.removeEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
        RES.removeEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onResourceLoadError, this);
        RES.removeEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onResourceProgress, this);
        RES.removeEventListener(RES.ResourceEvent.ITEM_LOAD_ERROR, this.onItemLoadError, this);
    };
    //资源组加载出错
    Start_Card.prototype.onItemLoadError = function (event) {
        //alert("Url:" + event.resItem.url + " has failed to load");
    };
    //资源组加载出错
    Start_Card.prototype.onResourceLoadError = function (event) {
        //忽略加载失败的项目
        this.onResourceLoadComplete(event);
    };
    //资源组加载进度
    Start_Card.prototype.onResourceProgress = function (event) {
        //显示进度条
        basic.Dispatcher.dispatch(EventNames.LOADING_PROGRESS, {
            itemsLoaded: event.itemsLoaded,
            itemsTotal: event.itemsTotal
        });
    };
    //显示游戏
    Start_Card.prototype.onShowGame = function (e) {
        //判断显示界面
        if (LoaderData.is_Game_LoadEnd[this.card_num] == true && this.is_login == true) {
            //数据赋值
            this.is_showwaiting = false;
            //移除等待界面
            basic.SceneManager.removeTopScene(SceneNames.WAITING);
            //注销等待
            this.removeEventListener(egret.Event.ENTER_FRAME, this.onShowGame, this);
            //显示游戏
            this.showGame();
        }
    };
    //判断移除界面
    Start_Card.prototype.onRemoveWaiting = function (e) {
        //判断移除
        if (this.is_showwaiting == true) {
            //数据赋值
            this.is_showwaiting = false;
            //移除等待界面
            basic.SceneManager.removeTopScene(SceneNames.WAITING);
            //注销等待
            this.removeEventListener(egret.Event.ENTER_FRAME, this.onShowGame, this);
            //判断关闭连接
            if (this.card_num == 0) {
                Comm_jsys.instance.closeConnect();
            }
            else if (this.card_num == 1) {
                Comm_ebg.instance.closeConnect();
            }
        }
    };
    //显示游戏
    Start_Card.prototype.showGame = function () {
        //判断显示游戏
        if (this.card_num < 2) {
            //显示游戏
            basic.SceneManager.show(this.game_name[this.card_num]);
        }
    };
    //停止缓动效果
    Start_Card.prototype.stopTween = function () {
        //判断停止
        if (this._tween_alpha) {
            this._tween_alpha.setPaused(true);
            this._tween_alpha = null;
        }
        if (this._tween_scaleX) {
            this._tween_scaleX.setPaused(true);
            this._tween_scaleX = null;
        }
        if (this._tween_scaleY) {
            this._tween_scaleY.setPaused(true);
            this._tween_scaleY = null;
        }
        if (this._tween_box_alpha) {
            this._tween_box_alpha.setPaused(true);
            this._tween_box_alpha = null;
        }
        if (this._tween_box_scaleX) {
            this._tween_box_scaleX.setPaused(true);
            this._tween_box_scaleX = null;
        }
        if (this._tween_box_scaleY) {
            this._tween_box_scaleY.setPaused(true);
            this._tween_box_scaleY = null;
        }
        if (this._tween_txt_alpha) {
            this._tween_txt_alpha.setPaused(true);
            this._tween_txt_alpha = null;
        }
        if (this._tween_txt_scaleX) {
            this._tween_txt_scaleX.setPaused(true);
            this._tween_txt_scaleX = null;
        }
        if (this._tween_txt_scaleY) {
            this._tween_txt_scaleY.setPaused(true);
            this._tween_txt_scaleY = null;
        }
        if (this._tween_icon_alpha) {
            this._tween_icon_alpha.setPaused(true);
            this._tween_icon_alpha = null;
        }
        if (this._tween_icon_scaleX) {
            this._tween_icon_scaleX.setPaused(true);
            this._tween_icon_scaleX = null;
        }
        if (this._tween_icon_scaleY) {
            this._tween_icon_scaleY.setPaused(true);
            this._tween_icon_scaleY = null;
        }
    };
    return Start_Card;
}(eui.Component));
__reflect(Start_Card.prototype, "Start_Card");
