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
    
    //牛牛
    static nn_apiIp: string;
    static nn_apiPort: number;
    static nn_apiAddress: string;
    static nn_apiNameSpace: string;
    
  
    //初始化配置数据
    static init(is_Test: Boolean): void {
        //判断复制
        if(is_Test) {
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
        setTimeout(() => {
            this.assChipData();
        },this,200);
    }
    
    //筹码数据赋值
    static assChipData(): void {
        console.log(basic.localStorage.getItem('nowChip'));
        
        //数据赋值
        if(basic.localStorage.getItem('nowChip') == null) {
            //数据赋值
            GameData.Game_Chip_Now = 0;

            //保存数据
            basic.localStorage.setItem('nowChip',GameData.Game_Chip_Now.toString());
        }
        else {
            GameData.Game_Chip_Now = Number(basic.localStorage.getItem('nowChip'));
        }
        if(basic.localStorage.getItem('ChooseChip') == null) {
            //数据赋值
            GameData.Game_Chip_Gold = [100,500,1000,2500];
            
            //保存数据
            basic.localStorage.setItem('ChooseChip',GameData.Game_Chip_Gold.toString());
        }
        else {
            var now_chip: string[] = basic.localStorage.getItem('ChooseChip').split(",");
            
            //数据赋值
            for(var i: number = 0;i < 4;i++) {
                GameData.Game_Chip_Gold[i] = Number(now_chip[i])
            }
        }
    }



    //判断是否是微信环境
     static isWeiXin(): boolean {
         //定义变量
         var ua: string = navigator.userAgent.toString();
        
         //判断
         var str: any = ua.match(/MicroMessenger/i);
         if(str == "MicroMessenger") {
             return true;
         } else {
             return false;
         }
     }
     
     //判断是否App
     static isApp(): Boolean {
         if(this.isWeiXin() == false) {
             if(egret.Capabilities.os.indexOf("Windows") >= 0 || egret.Capabilities.os.indexOf("Mac") >= 0) {
                 return false;
             }
             else {
                 return true
             }
         }
         else {
             return false;
         }
     }
}
