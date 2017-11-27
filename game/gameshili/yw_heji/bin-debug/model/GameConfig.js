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
            //合集
            this.apiIp = "192.168.0.140";
            this.apiPort = 29701;
            this.apiAddress = this.apiIp + ":" + this.apiPort + "/jWebSocket/jWebSocket";
            this.apiNameSpace = "org.jwebsocket.plugins.heji";
            //金鲨银鲨
            this.jsys_apiIp = "192.168.0.140";
            this.jsys_apiPort = 29703;
            this.jsys_apiAddress = this.jsys_apiIp + ":" + this.jsys_apiPort + "/jWebSocket/jWebSocket";
            this.jsys_apiNameSpace = "org.jwebsocket.plugins.jinshayinsha";
            //二八杠
            this.ebg_apiIp = "192.168.0.140";
            this.ebg_apiPort = 29704;
            this.ebg_apiAddress = this.ebg_apiIp + ":" + this.ebg_apiPort + "/jWebSocket/jWebSocket";
            this.ebg_apiNameSpace = "org.jwebsocket.plugins.erbagang";
        }
        else {
            //合集
            this.apiIp = "101.37.203.84";
            this.apiIp = "116.62.62.167";
            this.apiPort = 29701;
            this.apiAddress = this.apiIp + ":" + this.apiPort + "/jWebSocket/jWebSocket";
            this.apiNameSpace = "org.jwebsocket.plugins.heji";
            //水果机
            this.jsys_apiIp = "101.37.203.84";
            this.jsys_apiIp = "116.62.62.167";
            this.jsys_apiPort = 29703;
            this.jsys_apiAddress = this.jsys_apiIp + ":" + this.jsys_apiPort + "/jWebSocket/jWebSocket";
            this.jsys_apiNameSpace = "org.jwebsocket.plugins.jinshayinsha";
            //二八杠
            this.ebg_apiIp = "101.37.203.84";
            this.ebg_apiIp = "116.62.62.167";
            this.ebg_apiPort = 29704;
            this.ebg_apiAddress = this.ebg_apiIp + ":" + this.ebg_apiPort + "/jWebSocket/jWebSocket";
            this.ebg_apiNameSpace = "org.jwebsocket.plugins.erbagang";
        }
    };
    //判断是否是微信环境
    GameConfig.isWeiXin = function () {
        //定义变量
        var ua = navigator.userAgent.toString();
        //判断
        var str = ua.match(/MicroMessenger/i);
        if (str == "MicroMessenger") {
            return true;
        }
        else {
            return false;
        }
    };
    //判断是否App
    GameConfig.isApp = function () {
        if (this.isWeiXin() == false) {
            if (egret.Capabilities.os.indexOf("Windows") >= 0 || egret.Capabilities.os.indexOf("Mac") >= 0) {
                return false;
            }
            else {
                return true;
            }
        }
        else {
            return false;
        }
    };
    GameConfig.gameName = 'HeJi';
    return GameConfig;
}());
__reflect(GameConfig.prototype, "GameConfig");
