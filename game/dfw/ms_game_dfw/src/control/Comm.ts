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
    private socket: Socket;
    private _address: string;
    private _namespace: string;
    public is_showstart: boolean = false;
    public is_start_connect: boolean = false;
    
    //初始化
    init():void{
        //判断显示
        if(Comm.instance.is_start_connect == false){
            //定义socket
            this.socket = new Socket();
            this._ip = GameConfig.apiIp;
            this._port = GameConfig.apiPort;
            this._address = GameConfig.apiAddress;
            this._namespace = GameConfig.apiNameSpace;
            this.socket.init(this._ip,this._port,this._address,this._namespace,this.onCallBack,this.connectCallBack);
            this.socket.connect();

            //数据赋值
            Comm.instance.is_start_connect = true;
        }
    }
    
    //回调函数
    onCallBack(response,msg): void {
        //定义变量
        var ret:any;
        
        console.log("收到数据内容：" + msg);
        
        //判断显示
        if(response.type == 'welcome'){
            //数据赋值
            GameData.is_connect = true;
            Comm.instance.is_start_connect = false;
            if(Comm.instance.is_showstart == false){
                Comm.instance.is_showstart = true;
                basic.Dispatcher.dispatch(EventNames.SHOW_START,response);
            }
            else{
                //判断登录
                if(UserData.User_Token != ""){
                    if(GameData.Room_Id != -1){
                        Comm.instance.sendSocket({
                            "type": "login",
                            "token": UserData.User_Token,
                            "roomId": GameData.Room_Id
                        });
                    }
                    else{
                        //获取房间号
                        Comm.instance.sendSocket({
                             "type":"getRoomId",
                             "token":UserData.User_Token
                        });
                    }
                }
                else{
                    //显示开始界面
                    basic.SceneManager.show(SceneNames.START);
                }
            }
        }
        else if(GameData.is_connect == true){
            switch(response.type) {
                case 'login':
                    //发送消息
                    basic.Dispatcher.dispatch(EventNames.LOGIN,response);
                    break;
                case 'joinRoom':
                    //发送消息
                    basic.Dispatcher.dispatch(EventNames.JOIN_ROOM,response);
                    break;
                case 'system':
                    //发送消息
                    basic.Dispatcher.dispatch(EventNames.SHOW_TIPS,response); 
                    break;
                case 'playerList':
                    //发送消息
                    basic.Dispatcher.dispatch(EventNames.SHOW_PLAYERLIST,response); 
                    break;
                case 'startGame':
                    //发送消息
                    basic.Dispatcher.dispatch(EventNames.GAME_START,response); 
                    break;
                case 'gameInfo':
                    //发送消息
                    basic.Dispatcher.dispatch(EventNames.GAME_INFO,response); 
                    break;
                case 'stop':
                    //发送消息
                    basic.Dispatcher.dispatch(EventNames.PREVENT_ACTION,response); 
                    break;
                case 'stop':
                    //发送消息
                    basic.Dispatcher.dispatch(EventNames.PREVENT_ACTION,response); 
                    break;
                case 'gameOver':
                    //发送消息
                    basic.Dispatcher.dispatch(EventNames.GAME_OVER,response); 
                    break;
                case 'statusChange':
                    //发送消息
                    basic.Dispatcher.dispatch(EventNames.CHANGE_STATUS,response); 
                    break;
                case 'closeRoom':
                    //数据赋值
                    GameData.Room_Id = -1;
                    GameData.over_type = 1;
                    GameData.over_tips = response.msg;

                    //显示游戏结束界面
                    basic.SceneManager.addTopScene(SceneNames.OVER);
                    break;
                case 'remain':
                    //发送消息
                    basic.Dispatcher.dispatch(EventNames.SHOW_REMAIN,response); 
                    break;
                case 'getRoomId':
                    //发送消息
                    basic.Dispatcher.dispatch(EventNames.GET_ROOMID,response); 
                    break;
                case 'dataChange':
                    //金币改变事件
                    basic.Dispatcher.dispatch(EventNames.DATA_CHANGE,response); 
                    break;
                case 'heartBeat':
                    //定义变量
                    var now_date: Date = new Date();

                    //数据赋值
                    GameData.heart_beat_time =  Number(now_date);
                    break;
                    
            }
        }
        
    }
    
    //链接关闭界面
    connectCallBack(): void {
        //显示开始界面
        if(GameData.Is_Show_Waiting == false){
            //进入开始界面
            basic.SceneManager.show(SceneNames.WAITING);
        }

        //数据赋值
        GameData.is_connect = false;
        Comm.instance.is_start_connect = false;
    }
    
    //发送消息
    sendSocket(_lToken:any):void{
        console.log(JSON.stringify(_lToken));
        //发送消息
        if(GameData.is_connect == true){
            this.socket.sendToken(_lToken);
        }
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
