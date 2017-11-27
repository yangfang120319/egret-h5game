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
            this.apiPort = 33701;
            this.apiIp = "192.168.0.153";
            this.apiAddress = this.apiIp + ":" + this.apiPort + "/jWebSocket/jWebSocket";
            this.apiNameSpace = "org.jwebsocket.plugins.heji";
            //马来西亚银行数据
            this.mlxyyh_apiIp = "192.168.0.8";
            this.mlxyyh_apiPort = 21703;
            this.mlxyyh_apiAddress = this.mlxyyh_apiIp + ":" + this.mlxyyh_apiPort + "/jWebSocket/jWebSocket";
            this.mlxyyh_apiNameSpace = "org.jwebsocket.plugins.mlxyyh";
        }
        else {
            //易赚测试
            this.apiPort = 33701;
            this.apiIp = "101.37.203.84";
            this.apiIp = "yx.duozhuan9.com";
            this.apiAddress = this.apiIp + ":" + this.apiPort + "/jWebSocket/jWebSocket";
            this.apiNameSpace = "org.jwebsocket.plugins.heji";
            //马来西亚银行数据
            this.mlxyyh_apiIp = "101.37.203.84";
            //            this.mlxyyh_apiIp = "114.215.171.127";
            this.mlxyyh_apiPort = 21703;
            this.mlxyyh_apiAddress = this.mlxyyh_apiIp + ":" + this.mlxyyh_apiPort + "/jWebSocket/jWebSocket";
            this.mlxyyh_apiNameSpace = "org.jwebsocket.plugins.mlxyyh";
        }
    };
    GameConfig.gameName = 'YZ_BASIC';
    return GameConfig;
}());
__reflect(GameConfig.prototype, "GameConfig");
//# sourceMappingURL=GameConfig.js.map