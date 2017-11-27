var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 *
 * @数据交互
 *
 */
var Comm = (function () {
    function Comm() {
    }
    Object.defineProperty(Comm, "instance", {
        get: function () {
            if (this._instance == undefined) {
                this._instance = new Comm();
            }
            return this._instance;
        },
        enumerable: true,
        configurable: true
    });
    //初始化
    Comm.prototype.init = function () {
        //定义socket
        this.socket = new Socket();
        this._ip = GameConfig.apiIp;
        this._port = GameConfig.apiPort;
        this._address = GameConfig.apiAddress;
        this._namespace = GameConfig.apiNameSpace;
        this.socket.init(this._ip, this._port, this._address, this._namespace, this.onCallBack, this.connectCallBack);
        this.socket.connect();
    };
    //回调函数
    Comm.prototype.onCallBack = function (response, msg) {
        //定义变量
        var ret;
        console.log("收到数据内容：" + msg);
        //判断显示
        switch (response.type) {
            case 'welcome':
                //登陆账号
                Comm.instance.login();
                break;
            case 'login':
                //登陆成功
                basic.Dispatcher.dispatch(EventNames.SHOW_START, response);
                break;
            case 'system':
                //异常消息
                basic.Dispatcher.dispatch(EventNames.SHOW_TIPS, response);
                break;
            case 'joinRoom':
                //加入房间
                basic.Dispatcher.dispatch(EventNames.JOIN_ROOM, response);
                break;
            case 'gameInfo':
                //游戏初始化
                basic.Dispatcher.dispatch(EventNames.GAME_INFO, response);
                break;
            case 'gameState':
                //游戏初始化
                basic.Dispatcher.dispatch(EventNames.GAME_STATE, response);
                break;
            case 'gameOver':
                //游戏结束
                basic.Dispatcher.dispatch(EventNames.GAME_OVER, response);
                break;
            case 'rank':
                //游戏排行榜
                basic.Dispatcher.dispatch(EventNames.SHOW_RANKING, response);
                break;
            case 'chat':
                //聊天
                basic.Dispatcher.dispatch(EventNames.SHOW_CHAT, response);
                break;
        }
    };
    //测试登录
    Comm.prototype.login = function () {
        //登录
        var params = basic.Utils.getUrlParams();
        //判断显示
        if (params.token == "" || params.token == null) {
            //注册事件
            basic.StageProxy.stage.addEventListener(egret.Event.ENTER_FRAME, onlogin, this);
        }
        else {
            //发送消息
            this.socket.sendToken({ "type": "login", "token": params.token });
        }
        //回调函数
        function onlogin(e) {
            params = basic.Utils.getUrlParams();
            if (params.token != "" && params.token != null) {
                //注销事件
                basic.StageProxy.stage.removeEventListener(egret.Event.ENTER_FRAME, onlogin, this);
                //发送消息
                this.socket.sendToken({ "type": "login", "token": params.token });
            }
        }
    };
    //链接关闭界面
    Comm.prototype.connectCallBack = function () {
    };
    //发送消息
    Comm.prototype.sendSocket = function (_lToken) {
        //console.info(555);
        console.info("发送数据内容：" + JSON.stringify(_lToken));
        //发送消息
        this.socket.sendToken(_lToken);
    };
    //判断是否连接
    Comm.prototype.jugeConnect = function () {
        return this.socket.jugeConnect();
    };
    //关闭连接
    Comm.prototype.closeConnect = function () {
        //关闭连接
        this.socket.close();
    };
    return Comm;
}());
__reflect(Comm.prototype, "Comm");
