/**
 *
 * @数据交互
 *
 */
class Comm {
    //封装
    private static _instance: Comm;
    public static get instance(): Comm {
        if(this._instance == undefined) {
            this._instance = new Comm();
        }
        return this._instance;
    }
    
    //定义变量
    private _ip: string;
    private _port: number;
    private _address: string;
    private _namespace: string;
    private socket: Socket;
    private is_connect: Boolean = false;
    
    
    //初始化
    init():void{
        //定义socket
        this.socket = new Socket();
        this._ip = GameConfig.apiIp;
        this._port = GameConfig.apiPort;
        this._address = GameConfig.apiAddress;
        this._namespace = GameConfig.apiNameSpace;
        this.socket.init(this._ip,this._port,this._address,this._namespace,this.onCallBack);
        this.socket.connect();
    }
    
    //回调函数
    onCallBack(response,msg): void {
        //定义变量
        var ret:any;
        
        console.log("收到数据内容：" + msg);
        
        //判断显示
        switch(response.type) {
            case 'welcome':
                //登录界面
                this.is_connect = true;
                break;
            case 'login':
                //发送消息
                basic.Dispatcher.dispatch(EventNames.SHOW_START,response);
                break;
            case 'rankingList':
                //发送消息
                basic.Dispatcher.dispatch(EventNames.SHOW_RANKING,response);
                break;
            case 'dataChange':
                //发送消息
                basic.Dispatcher.dispatch(EventNames.DATA_CHANGE,response);
                break;
            case 'exchangeGold':
                //发送消息
                basic.Dispatcher.dispatch(EventNames.DATA_CHANGE,response);
                break;
            case 'joinRoom':
                //发送消息
                basic.Dispatcher.dispatch(EventNames.GF_JOINROOM,response);
                break;
            case 'infoRoom':
                //发送消息
                basic.Dispatcher.dispatch(EventNames.GF_GAMEINFO,response);
                break;
            case 'system':
                //发送消息
                basic.Dispatcher.dispatch(EventNames.SHOW_TIPS,{ "tips": response.msg });
                break;
            case 'result':
                //发送消息
                basic.Dispatcher.dispatch(EventNames.GF_GAMEOVER,response);
                break;
            case 'leaveRoom':
                //发送消息
                basic.Dispatcher.dispatch(EventNames.GF_LEAVEROOM,response);
                break;
            case 'newAccount':
                //发送消息
                basic.Dispatcher.dispatch(EventNames.SHOW_NEWACCOUNT,response);
                break;
            case 'chatList':
                //发送消息
                basic.Dispatcher.dispatch(EventNames.SHOW_TOTALCHAT,response);
                break;
            case 'chat':
                //发送消息
                basic.Dispatcher.dispatch(EventNames.SHOW_CHAT,response);
                break;
        }
    }
    
    //发送消息
    sendSocket(_lToken:any):void{
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
