var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 *
 * @游戏配置
 *
 */
var GameConfig = (function () {
    function GameConfig() {
    }
    //初始化配置数据
    GameConfig.init = function (is_Test) {
        //服务器配置
        if (is_Test) {
            //易赚测试
            this.apiPort = 9797;
            this.apiIp = "192.168.0.100";
            this.apiAddress = this.apiIp + ":" + this.apiPort + "/jWebSocket/jWebSocket";
            this.apiNameSpace = "org.jwebsocket.plugins.dfw";
        }
        else {
            //  //易赚测试
            //  this.apiPort = 9797;
            //  this.apiIp = "dfws1.yile.vip";
            //  this.apiAddress = this.apiIp + ":" + this.apiPort + "/jWebSocket/jWebSocket";
            //  this.apiNameSpace = "org.jwebsocket.plugins.dfw";
            //  //易赚测试
            //  this.apiPort = 36720;
            //  this.apiIp = "101.37.203.84";
            //  this.apiAddress = this.apiIp + ":" + this.apiPort + "/jWebSocket/jWebSocket";
            //  this.apiNameSpace = "org.jwebsocket.plugins.dfw";
            this.apiPort = 9797;
            this.apiIp = "wss://dfws1.yile.vip";
            this.apiAddress = this.apiIp + ":" + this.apiPort;
            this.apiNameSpace = "org.jwebsocket.plugins.dfw";
        }
    };
    GameConfig.gameName = 'MS_DFW';
    return GameConfig;
}());
__reflect(GameConfig.prototype, "GameConfig");
//# sourceMappingURL=GameConfig.js.map