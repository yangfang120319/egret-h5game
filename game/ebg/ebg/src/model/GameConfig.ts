/**
 *
 * @游戏配置
 *
 */
class GameConfig {
    //定义数据
    static apiIp: string;
    static apiPort: number;
    static apiAddress: string;
    static apiNameSpace: string;
    static gameName: string = 'YZ_BASIC';
    
    //初始化配置数据
    static init(is_Test:Boolean):void{
         //服务器配置
         if(is_Test) {
             //易赚测试
             this.apiPort = 33701;
             this.apiIp = "192.168.0.153";
             this.apiAddress = this.apiIp + ":" + this.apiPort + "/jWebSocket/jWebSocket";
             this.apiNameSpace = "org.jwebsocket.plugins.heji";
         }
         else {
             //易赚测试
             this.apiPort = 33701;
             this.apiIp = "101.37.203.84";
             this.apiIp = "yx.duozhuan9.com";
             this.apiAddress = this.apiIp + ":" + this.apiPort + "/jWebSocket/jWebSocket";
             this.apiNameSpace = "org.jwebsocket.plugins.heji";
         }
     }
}