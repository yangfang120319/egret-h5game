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
        this.is_showstart = false;
        this.is_start_connect = false;
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
        //判断显示
        if (Comm.instance.is_start_connect == false) {
            //定义socket
            this.socket = new Socket();
            this._ip = GameConfig.apiIp;
            this._port = GameConfig.apiPort;
            this._address = GameConfig.apiAddress;
            this._namespace = GameConfig.apiNameSpace;
            this.socket.init(this._ip, this._port, this._address, this._namespace, this.onCallBack, this.connectCallBack);
            this.socket.connect();
            //数据赋值
            Comm.instance.is_start_connect = true;
        }
    };
    //回调函数
    Comm.prototype.onCallBack = function (response, msg) {
        //定义变量
        var ret;
        console.log("收到数据内容：" + msg);
        //判断显示
        if (response.type == 'welcome') {
            //数据赋值
            GameData.is_connect = true;
            Comm.instance.is_start_connect = false;
            if (Comm.instance.is_showstart == false) {
                Comm.instance.is_showstart = true;
                basic.Dispatcher.dispatch(EventNames.SHOW_START, response);
            }
            else {
                //判断登录
                if (UserData.User_Token != "") {
                    if (GameData.Room_Id != -1) {
                        Comm.instance.sendSocket({
                            "type": "login",
                            "token": UserData.User_Token,
                            "roomId": GameData.Room_Id
                        });
                    }
                    else {
                        //获取房间号
                        Comm.instance.sendSocket({
                            "type": "getRoomId",
                            "token": UserData.User_Token
                        });
                    }
                }
                else {
                    //显示开始界面
                    basic.SceneManager.show(SceneNames.START);
                }
            }
        }
        else if (GameData.is_connect == true) {
            switch (response.type) {
                case 'login':
                    //发送消息
                    basic.Dispatcher.dispatch(EventNames.LOGIN, response);
                    break;
                case 'joinRoom':
                    //发送消息
                    basic.Dispatcher.dispatch(EventNames.JOIN_ROOM, response);
                    break;
                case 'system':
                    //发送消息
                    basic.Dispatcher.dispatch(EventNames.SHOW_TIPS, response);
                    break;
                case 'playerList':
                    //发送消息
                    basic.Dispatcher.dispatch(EventNames.SHOW_PLAYERLIST, response);
                    break;
                case 'startGame':
                    //发送消息
                    basic.Dispatcher.dispatch(EventNames.GAME_START, response);
                    break;
                case 'gameInfo':
                    //发送消息
                    basic.Dispatcher.dispatch(EventNames.GAME_INFO, response);
                    break;
                case 'stop':
                    //发送消息
                    basic.Dispatcher.dispatch(EventNames.PREVENT_ACTION, response);
                    break;
                case 'stop':
                    //发送消息
                    basic.Dispatcher.dispatch(EventNames.PREVENT_ACTION, response);
                    break;
                case 'gameOver':
                    //发送消息
                    basic.Dispatcher.dispatch(EventNames.GAME_OVER, response);
                    break;
                case 'statusChange':
                    //发送消息
                    basic.Dispatcher.dispatch(EventNames.CHANGE_STATUS, response);
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
                    basic.Dispatcher.dispatch(EventNames.SHOW_REMAIN, response);
                    break;
                case 'getRoomId':
                    //发送消息
                    basic.Dispatcher.dispatch(EventNames.GET_ROOMID, response);
                    break;
                case 'dataChange':
                    //金币改变事件
                    basic.Dispatcher.dispatch(EventNames.DATA_CHANGE, response);
                    break;
                case 'heartBeat':
                    //定义变量
                    var now_date = new Date();
                    //数据赋值
                    GameData.heart_beat_time = Number(now_date);
                    break;
            }
        }
    };
    //链接关闭界面
    Comm.prototype.connectCallBack = function () {
        //显示开始界面
        if (GameData.Is_Show_Waiting == false) {
            //进入开始界面
            basic.SceneManager.show(SceneNames.WAITING);
        }
        //数据赋值
        GameData.is_connect = false;
        Comm.instance.is_start_connect = false;
    };
    //发送消息
    Comm.prototype.sendSocket = function (_lToken) {
        console.log(JSON.stringify(_lToken));
        //发送消息
        if (GameData.is_connect == true) {
            this.socket.sendToken(_lToken);
        }
    };
    //判断是否连接
    Comm.prototype.jugeConnect = function () {
        return this.socket.jugeConnect();
    };
    //关闭连接
    Comm.prototype.closeConnect = function () {
        //关闭连接
        this.socket.close();
    };
    return Comm;
}());
__reflect(Comm.prototype, "Comm");
//# sourceMappingURL=Comm.js.map