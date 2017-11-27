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
        this.socket.init(this._ip, this._port, this._address, this._namespace, this.onCallBack);
        this.socket.connect();
    };
    //回调函数
    Comm.prototype.onCallBack = function (response, msg) {
        //定义变量
        var str_type;
        //数据赋值
        str_type = response.type;
        //打印数据
        console.log("dt_收到数据：" + msg);
        //判断显示
        switch (str_type) {
            case 'welcome':
                //登录界面
                Comm.instance.login();
                break;
            case 'login':
                //登录界面
                basic.Dispatcher.dispatch(EventNames.SHOW_START, response);
                break;
            case 'hbRain':
                //登录界面
                basic.Dispatcher.dispatch(EventNames.SHOW_HONGBAORAIN, response);
                break;
            case 'hbRainGrab':
                //登录界面
                basic.Dispatcher.dispatch(EventNames.SHOW_HONGBAO, response);
                break;
            case 'dataChange':
                //登录界面
                basic.Dispatcher.dispatch(EventNames.DATA_CHANGE, response);
                break;
            case 'system':
                //登录界面
                basic.Dispatcher.dispatch(EventNames.SHOW_LOGINTIPS, response);
                break;
            case 'userStatus':
                //登录界面
                basic.Dispatcher.dispatch(EventNames.CHANGE_USERSTATE, response);
                break;
        }
    };
    //登陆平台
    Comm.prototype.login = function () {
        //登录
        var params = basic.Utils.getUrlParams();
        if (params.account == "" || params.account == null) {
            //            if(basic.localStorage.getItem('account') != null && basic.localStorage.getItem('account')!=""){
            //                if(basic.localStorage.getItem('password') != null && basic.localStorage.getItem('password') != "") {
            //                    //数据赋值
            //                    UserData.User_Account = basic.localStorage.getItem('account');
            //                    UserData.User_Password = basic.localStorage.getItem('password');
            //
            //                    //发送消息
            //                    this.socket.sendToken({ 
            //                        "type": "login",
            //                        "account": basic.localStorage.getItem('account'),
            //                        "password": basic.localStorage.getItem('password')
            //                    });
            //                }
            //            }
        }
        else {
            //数据赋值
            UserData.User_Account = params.account;
            UserData.User_Password = params.password;
            //发送消息
            this.socket.sendToken({
                "type": "login",
                "account": params.account,
                "password": params.password
            });
        }
    };
    //发送消息
    Comm.prototype.sendSocket = function (_lToken) {
        //打印数据
        console.log("dt_发送数据：" + JSON.stringify(_lToken));
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
        this.socket.closeConnect();
    };
    return Comm;
}());
__reflect(Comm.prototype, "Comm");
//# sourceMappingURL=Comm.js.map