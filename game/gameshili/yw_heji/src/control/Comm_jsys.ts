/**
 *
 * @金鲨银鲨
 *
 */
class Comm_jsys {
    //封装
    private static _instance: Comm_jsys;
    public static get instance(): Comm_jsys {
        if(this._instance == undefined) {
            this._instance = new Comm_jsys();
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
    public juge_login: Boolean = false;
    
    //初始化
    init(): void {
        //定义socket
        this.socket = new Socket();
        this._ip = GameConfig.jsys_apiIp;
        this._port = GameConfig.jsys_apiPort;
        this._address = GameConfig.jsys_apiAddress;
        this._namespace = GameConfig.jsys_apiNameSpace;
        this.socket.init(this._ip,this._port,this._address,this._namespace,this.onCallBack);
        this.socket.connect();

        //数据赋值
        Comm_jsys.instance.juge_init = true;
        Comm_jsys.instance.juge_login = false;
    }
    
    //回调函数
    onCallBack(response,msg): void {
        //定义变量
        var ret: any;
        var str_type: string;

        //数据赋值
        str_type = response.type;
        
        //打印数据
        console.log("mlxyyh_收到数据：" + msg);
        
        //判断显示
        switch(str_type) {
            case 'welcome':
                //链接成功
                Comm_jsys.instance.login();
                break;
            case 'login':
                //登录界面
                Comm_jsys.instance.juge_login = true;
                basic.Dispatcher.dispatch(EventNames.GAME_LOGIN,response);
                break;
            case 'system':
                if(Comm_jsys.instance.juge_login == false) {
                    basic.Dispatcher.dispatch(EventNames.REMOVE_WAITING);
                }
            
                //系统消息
                basic.Dispatcher.dispatch(EventNames.SHOW_TIPS,{ "tips": response.msg});
                break;
            case 'gameInfo':
                //游戏初始化
                basic.Dispatcher.dispatch(EventNames.JSYS_GAMEINFO,response);
                break;
            case 'history':
                //历史记录
                basic.Dispatcher.dispatch(EventNames.JSYS_HISTORY,response);
                break;
            case "dealerChange":
                //庄改变
                basic.Dispatcher.dispatch(EventNames.JSYS_CHANGEZHUANG,response);
                break;
            case 'gameStatus':
                //游戏状态改变
                basic.Dispatcher.dispatch(EventNames.JSYS_CHANGESTATUS,response);
                break;
            case 'betNotify':
                //总下注
                basic.Dispatcher.dispatch(EventNames.JSYS_CHANGEYAZHU,response);
                break;
            case 'bet':
                //个人下注
                basic.Dispatcher.dispatch(EventNames.JSYS_USERYAZHU,response);
                break;
            case 'open':
                //游戏开奖
                basic.Dispatcher.dispatch(EventNames.JSYS_GAMEOPEN,response);
                break;
            case 'result':
                //游戏结果
                basic.Dispatcher.dispatch(EventNames.JSYS_GAMERESULT,response);
                break;
            case 'dealerList':
                //游戏结果
                basic.Dispatcher.dispatch(EventNames.JSYS_ZHUANGLIST,response);
                break;
            case 'bigWinUser':
                //游戏结果
                basic.Dispatcher.dispatch(EventNames.JSYS_SHOWWINBIG,response);
                break;
            case 'chat':
                //显示聊天
                basic.Dispatcher.dispatch(EventNames.JSYS_SHOWCHAT,response);
                break;
            case 'dealerGoldNotEnough':
                //爆庄
                basic.Dispatcher.dispatch(EventNames.JSYS_BAOZHUANG,response);
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
    
    //关闭连接
    closeConnect(): void {
        //关闭连接
        this.socket.close();
    }
}
