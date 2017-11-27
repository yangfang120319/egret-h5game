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
 * @游戏界面
 *
 */
var SceneGame = (function (_super) {
    __extends(SceneGame, _super);
    //定义界面
    function SceneGame() {
        var _this = _super.call(this) || this;
        //定义界面
        _this.skinName = SceneGameSkin;
        //定义事件
        basic.Dispatcher.addListener(EventNames.GAME_INFO, _this.onGameInfo, _this);
        basic.Dispatcher.addListener(EventNames.GAME_OVER, _this.onGameOver, _this);
        basic.Dispatcher.addListener(EventNames.GAME_STATE, _this.onGameState, _this);
        return _this;
    }
    //显示前调用
    SceneGame.prototype.beforeShow = function () {
        //开始粒子效果
        // this.lizi.start();
        //清除聊天
        this.chat.clean();
        //显示界面
        this.vote.visible = false;
        this.ready.visible = true;
        //显示房间号
        this.gametop.showRoom();
        //初始化游戏
        Comm.instance.sendSocket({ "type": "gameInfo" });
    };
    //隐藏前调用
    SceneGame.prototype.beforeHide = function () {
        //停止离子效果
        // this.lizi.stop();
        //移除界面
        //清除聊天
        this.chat.clean();
        //离开房间
        Comm.instance.sendSocket({ "type": "leaveRoom" });
    };
    //定义适配
    SceneGame.prototype.onShowPlace = function () {
        //定义变量
        var ratezoom;
        //判断显示
        if (basic.StageProxy.height > 960) {
            //数据赋值
            ratezoom = (basic.StageProxy.height - 960) / 176;
            //显示高度
            this.vote.height = 550 + 50 * ratezoom;
            this.ready.height = 550 + 50 * ratezoom;
            this.lizi.height = 550 + 86 + 50 * ratezoom;
            this.chat.height = basic.StageProxy.height - this.lizi.height;
        }
        else {
            //数据赋值
            ratezoom = (basic.StageProxy.height - 853) / 107;
            //显示高度
            this.vote.height = 480 + 70 * ratezoom;
            this.ready.height = 480 + 70 * ratezoom;
            this.lizi.height = 480 + 86 + 70 * ratezoom;
            this.chat.height = basic.StageProxy.height - this.lizi.height;
        }
    };
    //游戏初始化
    SceneGame.prototype.onGameInfo = function (e) {
        //显示界面
        this.vote.visible = false;
        this.ready.visible = true;
        //显示房间号
        this.gametop.showRoom();
        //数据赋值
        GameData.Game_State = -1;
        GameData.Player_List = e.data.player;
        //隐藏界面
        Panel_GameWord.instance.funExit();
        Panel_GameDescription.instance.funExit();
    };
    //游戏状态改变
    SceneGame.prototype.onGameState = function (e) {
        //显示界面
        this.vote.visible = true;
        this.ready.visible = false;
        //显示文本
        GameData.Game_Word = e.data.terms;
        //显示词语
        this.gametop.showWords();
    };
    //游戏结束事件
    SceneGame.prototype.onGameOver = function (e) {
        //显示结束界面
        Panel_GameOver.instance.show(e.data);
    };
    return SceneGame;
}(basic.SceneBase));
__reflect(SceneGame.prototype, "SceneGame");
