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
    static gameName: string = 'MS_DFW';
    
    //初始化配置数据
    static init(is_Test:Boolean):void{
         //服务器配置
         if(is_Test) {
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
     }
}
