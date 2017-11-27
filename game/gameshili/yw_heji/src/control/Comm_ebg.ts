/**
 *
 * @二八杠
 *
 */
class Comm_ebg {
    //封装
    private static _instance: Comm_ebg;
    public static get instance(): Comm_ebg {
        if(this._instance == undefined) {
            this._instance = new Comm_ebg();
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
        //数据赋值
        Comm_ebg.instance.juge_init = true;
        Comm_ebg.instance.juge_login = false;
        
        //定义socket
        this.socket = new Socket();
        this._ip = GameConfig.ebg_apiIp;
        this._port = GameConfig.ebg_apiPort;
        this._address = GameConfig.ebg_apiAddress;
        this._namespace = GameConfig.ebg_apiNameSpace;
        this.socket.init(this._ip,this._port,this._address,this._namespace,this.onCallBack);
        this.socket.connect();
    }

    //回调函数
    onCallBack(response,msg): void {
        //定义变量
        var ret: any;
        var str_type: string;

        //数据赋值
        str_type = response.type;

        //打印数据
        console.log("ebg_收到数据：" + msg);

        //判断显示
        switch(str_type) {
            case 'welcome':
                //登录界面
                Comm_ebg.instance.login();
                break;
            case 'login':
                //登录界面
                Comm_ebg.instance.juge_login = true;
                basic.Dispatcher.dispatch(EventNames.GAME_LOGIN,response);
                break;
            case 'system':
                //系统消息
                if(Comm_ebg.instance.juge_login == false) {
                    basic.Dispatcher.dispatch(EventNames.REMOVE_WAITING);
                }
                basic.Dispatcher.dispatch(EventNames.SHOW_TIPS,{ "tips": response.msg });
                break;
            case 'gameInfo':
                //初始化界面
                basic.Dispatcher.dispatch(EventNames.EBG_GAMEINFO,response);
                break;
            case 'dealerChange':
                //庄改变界面
                basic.Dispatcher.dispatch(EventNames.EBG_CHANGEZHUANG,response);
                break;
            case 'history':
                //历史记录
                basic.Dispatcher.dispatch(EventNames.EBG_HISTORY,response);
                break;
            case 'gameStatus':
                //游戏状态改变
                basic.Dispatcher.dispatch(EventNames.EBG_CHANGESTATUS,response);
                break;
            case 'betNotify':
                //总压住
                basic.Dispatcher.dispatch(EventNames.EBG_CHANGEYAZHU,response);
                break;
            case 'bet':
                //压住
                basic.Dispatcher.dispatch(EventNames.EBG_USERYAZHU,response);
                break;
            case 'open':
                //开牌
                basic.Dispatcher.dispatch(EventNames.EBG_GAMEOPEN,response);
                break;
            case 'result':
                //结算
                basic.Dispatcher.dispatch(EventNames.EBG_GAMERESULT,response);
                break;
            case 'dealerList':
                //庄列表
                basic.Dispatcher.dispatch(EventNames.EBG_ZHUANGLIST,response);
                break;
            case 'chat':
                //显示聊天
                basic.Dispatcher.dispatch(EventNames.EBG_SHOWCHAT,response);
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
    closeConnect():void{
        //关闭连接
        this.socket.close();
    }
}
