/**
 *
 * @Socket连接
 *
 */
class Socket {
    private webSocket: egret.WebSocket;
    private NS = "org.jwebsocket.plugins.bugwar";
    private ip:string;
    private port: number;
    private address: string;
    private callback: Function;
    
    //定义连接
	public constructor() {
        this.webSocket = new egret.WebSocket();
        this.webSocket.addEventListener(egret.ProgressEvent.SOCKET_DATA,this.onReceiveMessage,this);
        this.webSocket.addEventListener(egret.Event.CONNECT,this.onSocketOpen,this);
        this.webSocket.addEventListener(egret.Event.CLOSE,this.onSocketClose,this);
	}
	
	//初始化
    public init(ip: string,port: number,address: string,nameSpace: string,callback:Function){
	    this.ip = ip;
	    this.port = port;
	    this.address = address;
        this.NS = nameSpace;
        this.callback = callback;
	}
	
	///连接
    public connect(): void {
        this.webSocket.connect(this.address,this.port);
    }
    
    //连接成功
    private onSocketOpen(): void {
        console.log("连接成功onSocketOpen");
    }
    
    //关闭Socket
    private onSocketClose(): void {
        console.log("连接关闭onSocketClose");
    }
    
    //判断是否连接
    public jugeConnect():Boolean{
        return this.webSocket.connected;
    }
    
    //关闭连接
    public closeConnect():void{
        //关闭连接
        this.webSocket.close();
    }
    
    //发送数据
    public sendToken(token) {
        token.ns = GameConfig.apiNameSpace;
        var request: any = JSON.stringify(token);
        this.webSocket.writeUTF(request);
    }
    
    //收到数据
    private onReceiveMessage(e: egret.Event): void {
        var msg = this.webSocket.readUTF();
        var response: any = JSON.parse(msg);
        
        //调用回调函数
        if(this.callback){
            this.callback(response,msg);
        }
    }
    
    
    
    
}
