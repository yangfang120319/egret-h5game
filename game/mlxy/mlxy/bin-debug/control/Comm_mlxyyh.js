var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 *
 * @马来西亚银行
 *
 */
var Comm_mlxyyh = (function () {
    function Comm_mlxyyh() {
        this.juge_init = false;
    }
    Object.defineProperty(Comm_mlxyyh, "instance", {
        get: function () {
            if (this._instance == undefined) {
                this._instance = new Comm_mlxyyh();
            }
            return this._instance;
        },
        enumerable: true,
        configurable: true
    });
    //初始化
    Comm_mlxyyh.prototype.init = function () {
        //定义socket
        this.socket = new Socket();
        this._ip = GameConfig.mlxyyh_apiIp;
        this._port = GameConfig.mlxyyh_apiPort;
        this._address = GameConfig.mlxyyh_apiAddress;
        this._namespace = GameConfig.mlxyyh_apiNameSpace;
        this.socket.init(this._ip, this._port, this._address, this._namespace, this.onCallBack);
        this.socket.connect();
        //数据赋值
        this.juge_init = true;
    };
    //回调函数
    Comm_mlxyyh.prototype.onCallBack = function (response, msg) {
        //定义变量
        var ret;
        var str_type;
        //数据赋值
        str_type = response.type;
        //打印数据
        console.log("mlxyyh_收到数据：" + msg);
        //判断显示
        switch (str_type) {
            case 'welcome':
                //链接成功
                Comm_mlxyyh.instance.login();
                break;
            case 'login':
                //登录界面
                basic.Dispatcher.dispatch(EventNames.MLXYYH_LOGIN, response);
                break;
            case 'system':
                //系统消息
                basic.Dispatcher.dispatch(EventNames.MLXYYH_ERROR, response);
                break;
            case 'gameInfo':
                //游戏初始化
                basic.Dispatcher.dispatch(EventNames.MLXYYH_GAMEINFO, response);
                break;
            case 'history':
                //历史记录
                basic.Dispatcher.dispatch(EventNames.MLXYYH_HISTORY, response);
                break;
            case 'gameStatus':
                //游戏状态改变
                basic.Dispatcher.dispatch(EventNames.MLXYYH_CHANGESTATUS, response);
                break;
            case 'betNotify':
                //总下注
                basic.Dispatcher.dispatch(EventNames.MLXYYH_CHANGEYAZHU, response);
                break;
            case 'bet':
                //个人下注
                basic.Dispatcher.dispatch(EventNames.MLXYYH_USERYAZHU, response);
                break;
            case 'open':
                //游戏开奖
                basic.Dispatcher.dispatch(EventNames.MLXYYH_GAMEOPEN, response);
                break;
            case 'result':
                //游戏结果
                basic.Dispatcher.dispatch(EventNames.MLXYYH_GAMERESULT, response);
                break;
        }
    };
    //登陆平台
    Comm_mlxyyh.prototype.login = function () {
        //数据赋值
        var lToken = {
            type: "login",
            "token": UserData.User_Token
        };
        this.sendSocket(lToken);
    };
    //发送消息
    Comm_mlxyyh.prototype.sendSocket = function (_lToken) {
        //打印数据
        console.log("发送数据：" + JSON.stringify(_lToken));
        //发送消息
        //        this.socket.sendToken(_lToken);
    };
    //判断是否连接
    Comm_mlxyyh.prototype.jugeConnect = function () {
        return this.socket.jugeConnect();
    };
    return Comm_mlxyyh;
}());
__reflect(Comm_mlxyyh.prototype, "Comm_mlxyyh");
//# sourceMappingURL=Comm_mlxyyh.js.map