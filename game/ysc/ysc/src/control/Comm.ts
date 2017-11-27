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
                console.log("服务器连接成功");
                break;
        }
    }
    
    //链接关闭界面
    connectCallBack(): void {
        
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
