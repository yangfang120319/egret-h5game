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
        _this.now_data = null;
        //定义界面
        _this.skinName = SceneStartSkin;
        //注册事件
        basic.Dispatcher.addListener(EventNames.LOGIN, _this.onLOgin, _this);
        basic.Dispatcher.addListener(EventNames.JOIN_ROOM, _this.onJoinRoom, _this);
        basic.Dispatcher.addListener(EventNames.GET_ROOMID, _this.onGetRoomId, _this);
        //注册按钮
        _this.btn_exit.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onExitBtn, _this);
        _this.btn_enter.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onEnterBtn, _this);
        _this.btn_create.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onCreateBtn, _this);
        basic.StageProxy.stage.addEventListener(egret.Event.ENTER_FRAME, _this.onCheckRemove, _this);
        return _this;
    }
    //显示前调用
    /*
    beforeShow(params: any): void {
        //定义变量
        var params: any = basic.Utils.getUrlParams();
        
        //数据赋值
        GameData.Room_Id = -1;
        UserData.User_Token = "";

        //判断加入房间
        if(params.roomId != null && GameData.is_start == false){
            if(GameData.Is_Test == true){
                //发送消息
                Comm.instance.sendSocket({
                    "type": "login",
                    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHBpcmVkIjoxNTExMjM1NTQ1Nzc0LCJ1c2VySWQiOjUxNDZ9.1uBbBUIUpD-FBszD9jokJ4AmpgoLSg4gOe-UNtwozg0",
                    "roomId": params.roomId
                });

                //数据赋值
                UserData.User_Token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHBpcmVkIjoxNTExMjM1NTQ1Nzc0LCJ1c2VySWQiOjUxNDZ9.1uBbBUIUpD-FBszD9jokJ4AmpgoLSg4gOe-UNtwozg0";
            }
            else{
                //发送消息
                Comm.instance.sendSocket({
                    "type": "login",
                    "token": params.token,
                    "roomId": params.roomId
                });
                
                //数据赋值
                UserData.User_Token = params.token;
            }
        }
        else{
            //判断赋值
            if(GameData.Is_Test == true){
                params = {"token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHBpcmVkIjoxNTExMjM1NTQ0MjcwLCJ1c2VySWQiOjUwMzF9.Fq4kOivrXuYGgVIjXrV10kVNWSu5k8tC5Hbvi0QyBrQ"};
            }
            
            //判断获取
            if(Comm.instance.jugeConnect() == true){
                //链接数据库
                Comm.instance.sendSocket({"type":"getRoomId","token":params.token});
            }
            else{
                //移除加载界面
                basic.SceneManager.removeTopScene(SceneNames.LOADING);
            }
        }

        //屏蔽分享
        var request = new egret.HttpRequest();
        request.responseType = egret.HttpResponseType.TEXT;
        var url = window.location.href.split('#')[0];
        request.open("https://mp.yile.vip/jsapi/get.json?url=" + encodeURIComponent(url),egret.HttpMethod.GET);
        request.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        request.send();
        request.addEventListener(egret.Event.COMPLETE,this.onGetComplete,this);

        //数据赋值
        GameData.is_start = true;
    }*/
    SceneStart.prototype.onGetComplete = function (event) {
        var request = event.currentTarget;
        var sign = JSON.parse(request.response);
        window['initShare'](sign.appId, sign.timestamp, sign.nonceStr, sign.signature);
    };
    //-----------------------定义事件--------------------
    //检测移除
    SceneStart.prototype.onCheckRemove = function (e) {
    };
    //房间号码
    SceneStart.prototype.onGetRoomId = function (e) {
    };
    //登录函数
    SceneStart.prototype.onLOgin = function (e) {
        //数据赋值
        UserData.User_Gold = e.data.gold;
        UserData.User_Id = e.data.playerId;
        UserData.User_Name = e.data.nickName;
        UserData.User_Head = e.data.headImgURL;
        UserData.User_CardNum = e.data.roomCard;
        if (e.data.agent == false) {
            UserData.User_Is_Dl = false;
        }
        else {
            UserData.User_Is_Dl = true;
        }
    };
    //加入房间
    SceneStart.prototype.onJoinRoom = function (e) {
    };
    //判断显示界面
    SceneStart.prototype.onJugeShowGame = function (e) {
        //判断显示
        if (LoaderData.is_Game_LoadEnd == true) {
            //等待显示
            this.removeEventListener(egret.Event.ENTER_FRAME, this.onJugeShowGame, this);
            //移除界面
            basic.SceneManager.removeTopScene(SceneNames.LOADING);
            //进入游戏
            basic.SceneManager.show(SceneNames.GAME);
        }
    };
    //-----------------------定义按钮--------------------
    //退出按钮
    SceneStart.prototype.onExitBtn = function (e) {
        //播放声音
        basic.SoundManager.instance.playEffect("sound_btn_mp3");
        if (window['isWeiXin']()) {
            window.location.href = "https://mp.yile.vip/yile/game.htm";
        }
        else {
            window['callYlExitFunc']();
        }
    };
    //扫一扫按钮
    SceneStart.prototype.onEnterBtn = function (e) {
        //播放声音
        basic.SoundManager.instance.playEffect("sound_btn_mp3");
        window['callYlScanFunc']();
    };
    //创建按钮
    SceneStart.prototype.onCreateBtn = function (e) {
        basic.SceneManager.show(SceneNames.GAME);
    };
    return SceneStart;
}(basic.SceneBase));
__reflect(SceneStart.prototype, "SceneStart");
//# sourceMappingURL=SceneStart.js.map