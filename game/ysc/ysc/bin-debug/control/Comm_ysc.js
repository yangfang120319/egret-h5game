var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 *
 * @夜市场
 *
 */
var Comm_ysc = (function () {
    function Comm_ysc() {
    }
    Object.defineProperty(Comm_ysc, "instance", {
        get: function () {
            if (this._instance == undefined) {
                this._instance = new Comm_ysc();
            }
            return this._instance;
        },
        enumerable: true,
        configurable: true
    });
    //初始化
    Comm_ysc.prototype.init = function () {
        //定义socket
        this.socket = new Socket();
        this._ip = GameConfig.ysc_apiIp;
        this._port = GameConfig.ysc_apiPort;
        this._address = GameConfig.ysc_apiAddress;
        this._namespace = GameConfig.ysc_apiNameSpace;
        this.socket.init(this._ip, this._port, this._address, this._namespace, this.onCallBack);
        this.socket.connect();
    };
    //回调函数
    Comm_ysc.prototype.onCallBack = function (response, msg) {
        //定义变量
        var str_type;
        //数据赋值
        str_type = response.type;
        //打印数据
        console.log("ysc_收到数据：" + msg);
        //判断显示
        switch (str_type) {
            case 'welcome':
                //链接成功
                Comm_ysc.instance.login();
                break;
            case 'login':
                //登录界面
                basic.Dispatcher.dispatch(EventNames.YSC_LOGIN, response);
                break;
            case 'system':
                //系统消息
                basic.Dispatcher.dispatch(EventNames.YSC_ERROR, response);
                break;
            case 'gameInfo':
                //游戏初始化
                basic.Dispatcher.dispatch(EventNames.YSC_GAMEINFO, response);
                break;
            case 'history':
                //历史记录
                basic.Dispatcher.dispatch(EventNames.YSC_History, response);
                break;
            case 'gameStatus':
                //游戏改变状态
                basic.Dispatcher.dispatch(EventNames.YSC_CHANGESTATUS, response);
                break;
            case 'betNotify':
                //总下注
                basic.Dispatcher.dispatch(EventNames.YSC_CHANGEYAZHU, response);
                break;
            case 'bet':
                //个人下注
                basic.Dispatcher.dispatch(EventNames.YSC_USERYAZHU, response);
                break;
            case 'grab':
                //个人抢注
                basic.Dispatcher.dispatch(EventNames.YSC_USERQIANGZHU, response);
                break;
            case 'open':
                //游戏开奖
                basic.Dispatcher.dispatch(EventNames.YSC_GAMEOPEN, response);
                break;
            case 'result':
                //游戏结果
                basic.Dispatcher.dispatch(EventNames.YSC_GAMERESULT, response);
                break;
        }
    };
    //登陆平台
    Comm_ysc.prototype.login = function () {
        //数据赋值
        var lToken = {
            type: "login",
            "token": UserData.User_Token
        };
        this.sendSocket(lToken);
    };
    //发送消息
    Comm_ysc.prototype.sendSocket = function (_lToken) {
        //打印数据
        console.log("ysc_发送数据：" + JSON.stringify(_lToken));
        //发送消息
        this.socket.sendToken(_lToken);
    };
    //判断是否连接
    Comm_ysc.prototype.jugeConnect = function () {
        return this.socket.jugeConnect();
    };
    return Comm_ysc;
}());
__reflect(Comm_ysc.prototype, "Comm_ysc");
//# sourceMappingURL=Comm_ysc.js.map