var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 *
 * @二八杠
 *
 */
var Comm_ebg = (function () {
    function Comm_ebg() {
        this.juge_init = false;
        this.juge_login = false;
    }
    Object.defineProperty(Comm_ebg, "instance", {
        get: function () {
            if (this._instance == undefined) {
                this._instance = new Comm_ebg();
            }
            return this._instance;
        },
        enumerable: true,
        configurable: true
    });
    //初始化
    Comm_ebg.prototype.init = function () {
        //数据赋值
        Comm_ebg.instance.juge_init = true;
        Comm_ebg.instance.juge_login = false;
        //定义socket
        this.socket = new Socket();
        this._ip = GameConfig.ebg_apiIp;
        this._port = GameConfig.ebg_apiPort;
        this._address = GameConfig.ebg_apiAddress;
        this._namespace = GameConfig.ebg_apiNameSpace;
        this.socket.init(this._ip, this._port, this._address, this._namespace, this.onCallBack);
        this.socket.connect();
    };
    //回调函数
    Comm_ebg.prototype.onCallBack = function (response, msg) {
        //定义变量
        var ret;
        var str_type;
        //数据赋值
        str_type = response.type;
        //打印数据
        console.log("ebg_收到数据：" + msg);
        //判断显示
        switch (str_type) {
            case 'welcome':
                //登录界面
                Comm_ebg.instance.login();
                break;
            case 'login':
                //登录界面
                Comm_ebg.instance.juge_login = true;
                basic.Dispatcher.dispatch(EventNames.GAME_LOGIN, response);
                break;
            case 'system':
                //系统消息
                if (Comm_ebg.instance.juge_login == false) {
                    basic.Dispatcher.dispatch(EventNames.REMOVE_WAITING);
                }
                basic.Dispatcher.dispatch(EventNames.SHOW_TIPS, { "tips": response.msg });
                break;
            case 'gameInfo':
                //初始化界面
                basic.Dispatcher.dispatch(EventNames.EBG_GAMEINFO, response);
                break;
            case 'dealerChange':
                //庄改变界面
                basic.Dispatcher.dispatch(EventNames.EBG_CHANGEZHUANG, response);
                break;
            case 'history':
                //历史记录
                basic.Dispatcher.dispatch(EventNames.EBG_HISTORY, response);
                break;
            case 'gameStatus':
                //游戏状态改变
                basic.Dispatcher.dispatch(EventNames.EBG_CHANGESTATUS, response);
                break;
            case 'betNotify':
                //总压住
                basic.Dispatcher.dispatch(EventNames.EBG_CHANGEYAZHU, response);
                break;
            case 'bet':
                //压住
                basic.Dispatcher.dispatch(EventNames.EBG_USERYAZHU, response);
                break;
            case 'open':
                //开牌
                basic.Dispatcher.dispatch(EventNames.EBG_GAMEOPEN, response);
                break;
            case 'result':
                //结算
                basic.Dispatcher.dispatch(EventNames.EBG_GAMERESULT, response);
                break;
            case 'dealerList':
                //庄列表
                basic.Dispatcher.dispatch(EventNames.EBG_ZHUANGLIST, response);
                break;
            case 'chat':
                //显示聊天
                basic.Dispatcher.dispatch(EventNames.EBG_SHOWCHAT, response);
                break;
        }
    };
    //登陆平台
    Comm_ebg.prototype.login = function () {
        //数据赋值
        var lToken = {
            type: "login",
            "token": UserData.User_Token
        };
        this.sendSocket(lToken);
    };
    //发送消息
    Comm_ebg.prototype.sendSocket = function (_lToken) {
        //打印数据
        console.log("发送数据：" + JSON.stringify(_lToken));
        //发送消息
        this.socket.sendToken(_lToken);
    };
    //判断是否连接
    Comm_ebg.prototype.jugeConnect = function () {
        return this.socket.jugeConnect();
    };
    //关闭连接
    Comm_ebg.prototype.closeConnect = function () {
        //关闭连接
        this.socket.close();
    };
    return Comm_ebg;
}());
__reflect(Comm_ebg.prototype, "Comm_ebg");
