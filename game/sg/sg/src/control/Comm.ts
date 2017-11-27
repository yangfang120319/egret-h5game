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
        this.socket.init(this._ip,this._port,this._address,this._namespace,this.onCallBack);
        this.socket.connect();
    }
    
    //回调函数
    onCallBack(response,msg): void {
        //定义变量
        var str_type: string;

        //数据赋值
        str_type = response.type;
        
        //打印数据
        console.log("dt_收到数据：" + msg);
        
        //判断显示
        switch(str_type) {
            case 'welcome':
                //登录界面
                Comm.instance.login();
                break;
            case 'login':
                //登录界面
                basic.Dispatcher.dispatch(EventNames.SHOW_START,response);
                break;
            case 'hbRain':
                //登录界面
                basic.Dispatcher.dispatch(EventNames.SHOW_HONGBAORAIN,response);
                break;
            case 'hbRainGrab':
                //登录界面
                basic.Dispatcher.dispatch(EventNames.SHOW_HONGBAO,response);
                break;
            case 'dataChange':
                //登录界面
                basic.Dispatcher.dispatch(EventNames.DATA_CHANGE,response);
                break;
            case 'system':
                //登录界面
                basic.Dispatcher.dispatch(EventNames.SHOW_LOGINTIPS,response);
                break;
            case 'userStatus':
                //登录界面
                basic.Dispatcher.dispatch(EventNames.CHANGE_USERSTATE,response);
                break;
                
        }
    }
    
    //登陆平台
    login(): void {
        //登录
        var params: any = basic.Utils.getUrlParams();
        if(params.account == "" || params.account == null) {
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
    }
    
    //发送消息
    sendSocket(_lToken: any): void {
        //打印数据
        console.log("dt_发送数据：" + JSON.stringify(_lToken));
        
        //发送消息
        this.socket.sendToken(_lToken);
    }
    
    //判断是否连接
    jugeConnect():Boolean{
        return this.socket.jugeConnect();
    }
    
    //关闭连接
    public closeConnect(): void {
        //关闭连接
        this.socket.closeConnect();
    }
}
