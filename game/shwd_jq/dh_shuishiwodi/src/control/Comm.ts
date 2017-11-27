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
    
    
    //初始化
    init():void{
        //定义socket
        this.socket = new Socket();
        this._ip = GameConfig.apiIp;
        this._port = GameConfig.apiPort;
        this._address = GameConfig.apiAddress;
        this._namespace = GameConfig.apiNameSpace;
        this.socket.init(this._ip,this._port,this._address,this._namespace,this.onCallBack,this.connectCallBack);
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
                //登陆账号
                Comm.instance.login();
                break;
            case 'login':
                //登陆成功
                basic.Dispatcher.dispatch(EventNames.SHOW_START,response);
                break;
            case 'system':
                //异常消息
                basic.Dispatcher.dispatch(EventNames.SHOW_TIPS,response);
                break;
            case 'joinRoom':
                //加入房间
                basic.Dispatcher.dispatch(EventNames.JOIN_ROOM,response);
                break;
            case 'gameInfo':
                //游戏初始化
                basic.Dispatcher.dispatch(EventNames.GAME_INFO,response);
                break;
            case 'gameState':
                //游戏初始化
                basic.Dispatcher.dispatch(EventNames.GAME_STATE,response);
                break;
            case 'gameOver':
                //游戏结束
                basic.Dispatcher.dispatch(EventNames.GAME_OVER,response);
                break;
            case 'rank':
                //游戏排行榜
                basic.Dispatcher.dispatch(EventNames.SHOW_RANKING,response);
                break;
            case 'chat':
                //聊天
                basic.Dispatcher.dispatch(EventNames.SHOW_CHAT,response);
                break;
        }
    }
    
    //测试登录
    login(): void {
        //登录
        var params: any = basic.Utils.getUrlParams();

        //判断显示
        if(params.token == "" || params.token == null) {
            //注册事件
            basic.StageProxy.stage.addEventListener(egret.Event.ENTER_FRAME,onlogin,this);
        }
        else {
            //发送消息
            this.socket.sendToken({ "type": "login","token":params.token });
        }

        //回调函数
        function onlogin(e: egret.Event) {
            params = basic.Utils.getUrlParams();
            if(params.token != "" && params.token != null) {
                //注销事件
                basic.StageProxy.stage.removeEventListener(egret.Event.ENTER_FRAME,onlogin,this);

                //发送消息
                this.socket.sendToken({ "type": "login","token":params.token });
            }
        }
    }

    //链接关闭界面
    connectCallBack(): void {
        
    }
    
    //发送消息
    sendSocket(_lToken:any):void{
        //console.info(555);
        console.info("发送数据内容：" + JSON.stringify(_lToken));
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
