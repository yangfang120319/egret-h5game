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
        var _this = this;
        //判断复制
        if (is_Test) {
            //大厅数据
            this.apiIp = "192.168.0.8";
            this.apiPort = 21701;
            this.apiAddress = this.apiIp + ":" + this.apiPort + "/jWebSocket/jWebSocket";
            this.apiNameSpace = "org.jwebsocket.plugins.kaya118";
            //牛牛数据
            this.nn_apiIp = "192.168.0.8";
            this.nn_apiPort = 21705;
            this.nn_apiAddress = this.nn_apiIp + ":" + this.nn_apiPort + "/jWebSocket/jWebSocket";
            this.nn_apiNameSpace = "org.jwebsocket.plugins.nn";
        }
        else {
            //大厅数据
            this.apiIp = "101.37.203.84";
            //            this.apiIp = "114.215.171.127";
            this.apiPort = 21701;
            this.apiAddress = this.apiIp + ":" + this.apiPort + "/jWebSocket/jWebSocket";
            this.apiNameSpace = "org.jwebsocket.plugins.kaya118";
            //牛牛数据
            this.nn_apiIp = "101.37.203.84";
            //            this.nn_apiIp = "114.215.171.127";
            this.nn_apiPort = 21705;
            this.nn_apiAddress = this.nn_apiIp + ":" + this.nn_apiPort + "/jWebSocket/jWebSocket";
            this.nn_apiNameSpace = "org.jwebsocket.plugins.nn";
        }
        //筹码数据赋值
        setTimeout(function () {
            _this.assChipData();
        }, this, 200);
    };
    //筹码数据赋值
    GameConfig.assChipData = function () {
        console.log(basic.localStorage.getItem('nowChip'));
        //数据赋值
        if (basic.localStorage.getItem('nowChip') == null) {
            //数据赋值
            GameData.Game_Chip_Now = 0;
            //保存数据
            basic.localStorage.setItem('nowChip', GameData.Game_Chip_Now.toString());
        }
        else {
            GameData.Game_Chip_Now = Number(basic.localStorage.getItem('nowChip'));
        }
        if (basic.localStorage.getItem('ChooseChip') == null) {
            //数据赋值
            GameData.Game_Chip_Gold = [100, 500, 1000, 2500];
            //保存数据
            basic.localStorage.setItem('ChooseChip', GameData.Game_Chip_Gold.toString());
        }
        else {
            var now_chip = basic.localStorage.getItem('ChooseChip').split(",");
            //数据赋值
            for (var i = 0; i < 4; i++) {
                GameData.Game_Chip_Gold[i] = Number(now_chip[i]);
            }
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
    GameConfig.gameName = 'YZ_BASIC';
    return GameConfig;
}());
__reflect(GameConfig.prototype, "GameConfig");
//# sourceMappingURL=GameConfig.js.map