var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 *
 * @author
 *
 */
var Comm_nn = (function () {
    function Comm_nn() {
        this.juge_init = false;
    }
    Object.defineProperty(Comm_nn, "instance", {
        get: function () {
            if (this._instance == undefined) {
                this._instance = new Comm_nn();
            }
            return this._instance;
        },
        enumerable: true,
        configurable: true
    });
    //初始化
    Comm_nn.prototype.init = function () {
        //定义socket
        this.socket = new Socket();
        this._ip = GameConfig.nn_apiIp;
        this._port = GameConfig.nn_apiPort;
        this._address = GameConfig.nn_apiAddress;
        this._namespace = GameConfig.nn_apiNameSpace;
        this.socket.init(this._ip, this._port, this._address, this._namespace, this.onCallBack);
        this.socket.connect();
        //数据赋值
        this.juge_init = true;
    };
    //回调函数
    Comm_nn.prototype.onCallBack = function (response, msg) {
        //定义变量
        var ret;
        var str_type;
        //数据赋值
        str_type = response.type;
        //打印数据
        console.log("nn_收到数据：" + msg);
        //判断显示
        switch (str_type) {
            case 'welcome':
                //登录界面
                Comm_nn.instance.login();
                break;
            case 'login':
                //登录界面
                basic.Dispatcher.dispatch(EventNames.NN_LOGIN, response);
                break;
            case 'system':
                //登录界面
                basic.Dispatcher.dispatch(EventNames.NN_ERROR, response);
                break;
            case 'gameInfo':
                //初始化界面
                basic.Dispatcher.dispatch(EventNames.NN_GAMEINFO, response);
                break;
            case 'dealerChange':
                //庄改变界面
                basic.Dispatcher.dispatch(EventNames.NN_CHANGEZHUANG, response);
                break;
            case 'history':
                //登录界面
                basic.Dispatcher.dispatch(EventNames.NN_HISTORY, response);
                break;
            case 'gameStatus':
                //登录界面
                basic.Dispatcher.dispatch(EventNames.NN_CHANGESTATUS, response);
                break;
            case 'betNotify':
                //登录界面
                basic.Dispatcher.dispatch(EventNames.NN_CHANGEYAZHU, response);
                break;
            case 'bet':
                //登录界面
                basic.Dispatcher.dispatch(EventNames.NN_USERYAZHU, response);
                break;
            case 'open':
                //登录界面
                basic.Dispatcher.dispatch(EventNames.NN_GAMEOPEN, response);
                break;
            case 'result':
                //登录界面
                basic.Dispatcher.dispatch(EventNames.NN_GAMERESULT, response);
                break;
            case 'dealerList':
                //登录界面
                basic.Dispatcher.dispatch(EventNames.ZHUANG_UP_LIST, response);
                break;
            case 'openRoom':
                //进入房间
                basic.Dispatcher.dispatch(EventNames.NN_ENTERROOM, response);
                break;
        }
    };
    //登陆平台
    Comm_nn.prototype.login = function () {
        //数据赋值
        var lToken = {
            type: "login",
            "token": UserData.User_Token
        };
        this.sendSocket(lToken);
    };
    //发送消息
    Comm_nn.prototype.sendSocket = function (_lToken) {
        //打印数据
        console.log("发送数据：" + JSON.stringify(_lToken));
        //发送消息
        this.socket.sendToken(_lToken);
    };
    //判断是否连接
    Comm_nn.prototype.jugeConnect = function () {
        return this.socket.jugeConnect();
    };
    return Comm_nn;
}());
__reflect(Comm_nn.prototype, "Comm_nn");
//# sourceMappingURL=Comm_nn.js.map