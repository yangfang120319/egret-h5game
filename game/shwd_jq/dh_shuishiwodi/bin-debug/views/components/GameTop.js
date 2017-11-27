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
 * @标题
 *
 */
var GameTop = (function (_super) {
    __extends(GameTop, _super);
    function GameTop() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.countiu_time = 30000;
        return _this;
    }
    //初始化
    GameTop.prototype.createChildren = function () {
        _super.prototype.createChildren.call(this);
        //注册事件
        basic.Dispatcher.addListener(EventNames.START_TIME, this.onStartTime, this);
        //注册按钮
        this.btn_exit.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onExitBtn, this);
    };
    //显示房间
    GameTop.prototype.showRoom = function () {
        //隐藏界面
        this.g_time.visible = false;
        this.btn_exit.visible = false;
        this.txt_exit_title.visible = false;
        //显示文本
        this.txt_title.text = "你的房间";
        this.txt_name.text = GameData.Room_Id;
    };
    //显示词语
    GameTop.prototype.showWords = function () {
        //隐藏界面
        this.g_time.visible = true;
        this.btn_exit.visible = true;
        this.txt_exit_title.visible = true;
        //显示文本
        this.txt_title.text = "你的词语";
        this.txt_name.text = GameData.Game_Word;
    };
    //开始计时
    GameTop.prototype.onStartTime = function (e) {
        //结束计时
        this.stopTime();
        //定义变量
        var now_date = new Date();
        //数据赋值
        this.start_time = Number(now_date);
        //显示文本
        this.txt_time.text = Math.floor(this.countiu_time / 1000).toString();
        //开始计时
        basic.StageProxy.stage.addEventListener(egret.Event.ENTER_FRAME, this.onShowTime, this);
    };
    //显示计时
    GameTop.prototype.onShowTime = function (e) {
        //定义变量
        var now_time;
        var now_date = new Date();
        //数据赋值
        now_time = this.countiu_time - (Number(now_date) - this.start_time);
        //判断结束
        if (now_time < 0) {
            //停止计时
            this.stopTime();
            //判断发送消息
            if (GameData.Game_State == 0) {
                //判断当前状态
                if (GameData.Player_State == 0) {
                    Comm.instance.sendSocket({ "type": "gameDescribe", "describe": " " });
                }
            }
            else if (GameData.Game_State == 1) {
                //发送消息
                if (GameData.Player_State == 2) {
                    Comm.instance.sendSocket({ "type": "gameVote", "playerId": 0 });
                }
            }
        }
        else {
            //显示文本
            this.txt_time.text = Math.floor(now_time / 1000).toString();
        }
    };
    //结束计时
    GameTop.prototype.stopTime = function () {
        //停止计时
        basic.StageProxy.stage.removeEventListener(egret.Event.ENTER_FRAME, this.onShowTime, this);
        //显示文本
        this.txt_time.text = "0";
    };
    //退出按钮
    GameTop.prototype.onExitBtn = function (e) {
        //播放声音
        basic.SoundManager.instance.playEffect("sound_btn_mp3");
        //退出游戏
        basic.SceneManager.back();
    };
    return GameTop;
}(eui.Component));
__reflect(GameTop.prototype, "GameTop");
