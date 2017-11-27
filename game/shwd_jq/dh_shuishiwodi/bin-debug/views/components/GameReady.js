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
 * @准备
 *
 */
var GameReady = (function (_super) {
    __extends(GameReady, _super);
    function GameReady() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.player_num = 0;
        _this.player_head = [];
        return _this;
    }
    //初始化
    GameReady.prototype.createChildren = function () {
        _super.prototype.createChildren.call(this);
        //定义事件
        basic.Dispatcher.addListener(EventNames.GAME_INFO, this.onGameInfo, this);
        //注册按钮
        this.btn_exit.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onExitBtn, this);
        this.btn_ready.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onReadyBtn, this);
        this.btn_share.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onShareBtn, this);
    };
    //移除头像
    GameReady.prototype.clean = function () {
        //移除头像
        for (var i = 0; i < this.player_num; i++) {
            //移除头像
            this.g_head.removeChild(this.player_head[i]);
        }
        //清空数据
        this.player_num = 0;
        this.player_head = [];
    };
    //游戏初始化
    GameReady.prototype.onGameInfo = function (e) {
        //移除头像
        this.clean();
        //显示按钮
        this.btn_ready.enabled = true;
        //数据赋值
        this.player_num = e.data.player.length;
        for (var i = 0; i < this.player_num; i++) {
            //定义变量
            var now_head = new Head_Add();
            //显示头像
            now_head.show(e.data.player[i].headImgURL);
            //判断显示状态
            if (e.data.player[i].playerState == 1) {
                //显示已准备
                now_head.showHook();
                //判断显示按钮
                if (UserData.User_Id == e.data.player[i].playerId) {
                    //隐藏按钮
                    this.btn_ready.enabled = false;
                }
            }
            //显示头像
            this.player_head[i] = now_head;
            this.g_head.addChild(this.player_head[i]);
        }
    };
    //退出按钮
    GameReady.prototype.onExitBtn = function (e) {
        //播放声音
        basic.SoundManager.instance.playEffect("sound_btn_mp3");
        //退出游戏
        basic.SceneManager.back();
    };
    //准备按钮
    GameReady.prototype.onReadyBtn = function (e) {
        //播放声音
        basic.SoundManager.instance.playEffect("sound_btn_mp3");
        //发送消息
        Comm.instance.sendSocket({ "type": "gameStart" });
    };
    //分享按钮
    GameReady.prototype.onShareBtn = function (e) {
        //播放声音
        basic.SoundManager.instance.playEffect("sound_btn_mp3");
        //显示分享界面
    };
    return GameReady;
}(eui.Component));
__reflect(GameReady.prototype, "GameReady");
