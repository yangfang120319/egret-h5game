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
        //定义界面
        _this.skinName = SceneStartSkin;
        //注册事件
        basic.Dispatcher.addListener(EventNames.JOIN_ROOM, _this.onJoinRoom, _this);
        //注册按钮
        _this.btn_ranking.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.rankchange, _this);
        _this.btn_findroom.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.findroomchange, _this);
        _this.btn_createroom.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.buildroomchange, _this);
        _this.btn_quickenter.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.quickenterchange, _this);
        return _this;
    }
    //显示前调用
    SceneStart.prototype.beforeShow = function (params) {
        //用户信息初始化
        this.startmsg.show();
    };
    //定义界面适配
    SceneStart.prototype.onShowPlace = function () {
        //定义变量
        var ratezoom;
        //判断显示
        if (basic.StageProxy.height > 960) {
            //数据赋值
            ratezoom = (basic.StageProxy.height - 960) / 176;
            //定义位置
            this.btn_ranking.y = 45 + 40 * ratezoom;
            this.btn_createroom.y = 150 + 80 * ratezoom;
            this.btn_quickenter.y = 325 + 90 * ratezoom;
            this.btn_findroom.y = 500 + 100 * ratezoom;
        }
        else {
            //数据赋值
            ratezoom = (basic.StageProxy.height - 853) / 107;
            //定义位置
            this.btn_ranking.y = 25 + 20 * ratezoom;
            this.btn_createroom.y = 110 + 40 * ratezoom;
            this.btn_quickenter.y = 255 + 70 * ratezoom;
            this.btn_findroom.y = 400 + 100 * ratezoom;
        }
    };
    //-----------------------------定义事件-----------------------
    //加入房间
    SceneStart.prototype.onJoinRoom = function (e) {
        //数据赋值
        GameData.Room_Id = e.data.roomId;
        //显示游戏界面
        basic.SceneManager.show(SceneNames.GAME);
    };
    //-----------------------------定义按钮-----------------------
    //排名按钮
    SceneStart.prototype.rankchange = function (e) {
        //播放声音
        basic.SoundManager.instance.playEffect("sound_btn_mp3");
        //显示排行榜
        basic.SceneManager.show(SceneNames.RANK);
    };
    //建立房间按钮
    SceneStart.prototype.buildroomchange = function (e) {
        //播放声音
        basic.SoundManager.instance.playEffect("sound_btn_mp3");
        //发送消息
        Comm.instance.sendSocket({ "type": "createRoom" });
    };
    //寻找房间按钮
    SceneStart.prototype.findroomchange = function (e) {
        //播放声音
        basic.SoundManager.instance.playEffect("sound_btn_mp3");
        //显示搜索房间
        Panel_SearchRoom.instance.show();
    };
    //快速进入按钮
    SceneStart.prototype.quickenterchange = function (e) {
        //播放声音
        basic.SoundManager.instance.playEffect("sound_btn_mp3");
        //发送消息
        Comm.instance.sendSocket({ "type": "autoMarry" });
    };
    return SceneStart;
}(basic.SceneBase));
__reflect(SceneStart.prototype, "SceneStart");
