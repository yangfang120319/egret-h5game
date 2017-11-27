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

     //三公
    static sg_apiIp: string;
    static sg_apiPort: number;
    static sg_apiAddress: string;
    static sg_apiNameSpace: string;
    
    //初始化配置数据
    static init(is_Test:Boolean):void{
         //服务器配置
         if(is_Test) {
             //易赚测试
             this.apiPort = 33701;
             this.apiIp = "192.168.0.153";
             this.apiAddress = this.apiIp + ":" + this.apiPort + "/jWebSocket/jWebSocket";
             this.apiNameSpace = "org.jwebsocket.plugins.heji";

             //三公数据
            this.sg_apiIp = "192.168.0.8";
            this.sg_apiPort = 21706;
            this.sg_apiAddress = this.sg_apiIp + ":" + this.sg_apiPort + "/jWebSocket/jWebSocket";
            this.sg_apiNameSpace = "org.jwebsocket.plugins.sg";
         }
         else {
             //易赚测试
             this.apiPort = 33701;
             this.apiIp = "101.37.203.84";
             this.apiIp = "yx.duozhuan9.com";
             this.apiAddress = this.apiIp + ":" + this.apiPort + "/jWebSocket/jWebSocket";
             this.apiNameSpace = "org.jwebsocket.plugins.heji";

             //三公数据
            this.sg_apiIp = "101.37.203.84";
//            this.sg_apiIp = "114.215.171.127";
            this.sg_apiPort = 21706;
            this.sg_apiAddress = this.sg_apiIp + ":" + this.sg_apiPort + "/jWebSocket/jWebSocket";
            this.sg_apiNameSpace = "org.jwebsocket.plugins.sg";
         }
     }
}
