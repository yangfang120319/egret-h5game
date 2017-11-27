var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 *
 * @Socket连接
 *
 */
var Socket = (function () {
    //定义连接
    function Socket() {
        this.NS = "org.jwebsocket.plugins.bugwar";
        this.webSocket = new egret.WebSocket();
        this.webSocket.addEventListener(egret.ProgressEvent.SOCKET_DATA, this.onReceiveMessage, this);
        this.webSocket.addEventListener(egret.Event.CONNECT, this.onSocketOpen, this);
        this.webSocket.addEventListener(egret.Event.CLOSE, this.onSocketClose, this);
    }
    //初始化
    Socket.prototype.init = function (ip, port, address, nameSpace, callback, _connectCallBack) {
        if (_connectCallBack === void 0) { _connectCallBack = null; }
        this.ip = ip;
        this.port = port;
        this.address = address;
        this.NS = nameSpace;
        this.callback = callback;
        this.connectCallBack = _connectCallBack;
    };
    //连接
    Socket.prototype.connect = function () {
        this.webSocket.connect(this.address, this.port);
    };
    //关闭
    Socket.prototype.close = function () {
        this.webSocket.close();
    };
    //连接成功
    Socket.prototype.onSocketOpen = function () {
        console.log("连接成功_" + this.NS);
    };
    //关闭Socket
    Socket.prototype.onSocketClose = function () {
        console.log("连接关闭_" + this.NS);
        //判断回调
        if (this.connectCallBack) {
            this.connectCallBack();
        }
    };
    //发送数据
    Socket.prototype.sendToken = function (token) {
        token.ns = this.NS;
        var request = JSON.stringify(token);
        this.webSocket.writeUTF(request);
    };
    //收到数据
    Socket.prototype.onReceiveMessage = function (e) {
        var msg = this.webSocket.readUTF();
        var response = JSON.parse(msg);
        //调用回调函数
        if (this.callback) {
            this.callback(response, msg);
        }
    };
    //判断是否连接
    Socket.prototype.jugeConnect = function () {
        return this.webSocket.connected;
    };
    return Socket;
}());
__reflect(Socket.prototype, "Socket");
//# sourceMappingURL=Socket.js.map