/**
 *
 * @author 
 *
 */
class Comm_nn {
    //封装
    private static _instance: Comm_nn;
    public static get instance(): Comm_nn {
        if(this._instance == undefined) {
            this._instance = new Comm_nn();
        }
        return this._instance;
    }

    //定义变量
    private _ip: string;
    private _port: number;
    private _address: string;
    private _namespace: string;
    private socket: Socket;
    public juge_init: Boolean = false;

    //初始化
    init(): void {
        //定义socket
        this.socket = new Socket();
        this._ip = GameConfig.nn_apiIp;
        this._port = GameConfig.nn_apiPort;
        this._address = GameConfig.nn_apiAddress;
        this._namespace = GameConfig.nn_apiNameSpace;
        this.socket.init(this._ip,this._port,this._address,this._namespace,this.onCallBack);
        this.socket.connect();

        //数据赋值
        this.juge_init = true;
    }

    //回调函数
    onCallBack(response,msg): void {
        //定义变量
        var ret: any;
        var str_type: string;

        //数据赋值
        str_type = response.type;

        //打印数据
        console.log("nn_收到数据：" + msg);

        //判断显示
        switch(str_type) {
            case 'welcome':
                //登录界面
                Comm_nn.instance.login();
                break;
            case 'login':
                //登录界面
                basic.Dispatcher.dispatch(EventNames.NN_LOGIN,response);
                break;
            case 'system':
                //登录界面
                basic.Dispatcher.dispatch(EventNames.NN_ERROR,response);
                break;
            case 'gameInfo':
                //初始化界面
                basic.Dispatcher.dispatch(EventNames.NN_GAMEINFO,response);
                break;
            case 'dealerChange':
                //庄改变界面
                basic.Dispatcher.dispatch(EventNames.NN_CHANGEZHUANG,response);
                break;
            case 'history':
                //登录界面
                basic.Dispatcher.dispatch(EventNames.NN_HISTORY,response);
                break;
            case 'gameStatus':
                //登录界面
                basic.Dispatcher.dispatch(EventNames.NN_CHANGESTATUS,response);
                break;
            case 'betNotify':
                //登录界面
                basic.Dispatcher.dispatch(EventNames.NN_CHANGEYAZHU,response);
                break;
            case 'bet':
                //登录界面
                basic.Dispatcher.dispatch(EventNames.NN_USERYAZHU,response);
                break;
            case 'open':
                //登录界面
                basic.Dispatcher.dispatch(EventNames.NN_GAMEOPEN,response);
                break;
            case 'result':
                //登录界面
                basic.Dispatcher.dispatch(EventNames.NN_GAMERESULT,response);
                break;
            case 'dealerList':
                //登录界面
                basic.Dispatcher.dispatch(EventNames.ZHUANG_UP_LIST,response);
                break;
            case 'openRoom':
                //进入房间
                basic.Dispatcher.dispatch(EventNames.NN_ENTERROOM,response);
                break;
        }
    }

    //登陆平台
    login(): void {
        //数据赋值
        var lToken = {
            type: "login",
            "token": UserData.User_Token
        };
        this.sendSocket(lToken);
    }

    //发送消息
    sendSocket(_lToken: any): void {
        //打印数据
        console.log("发送数据：" + JSON.stringify(_lToken));

        //发送消息
        this.socket.sendToken(_lToken);
    }

    //判断是否连接
    jugeConnect(): Boolean {
        return this.socket.jugeConnect();
    }
}
