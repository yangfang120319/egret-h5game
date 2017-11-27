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
    static gameName: string = 'KAYA118';
    
    //夜市场
    static ysc_apiIp: string;
    static ysc_apiPort: number;
    static ysc_apiAddress: string;
    static ysc_apiNameSpace: string;
    
   
    
    //初始化配置数据
    static init(is_Test: Boolean): void {
        //判断复制
        if(is_Test) {
            //大厅数据
            this.apiIp = "192.168.0.8";
            this.apiPort = 21701;
            this.apiAddress = this.apiIp + ":" + this.apiPort + "/jWebSocket/jWebSocket";
            this.apiNameSpace = "org.jwebsocket.plugins.kaya118";
            
            //夜市场数据
            this.ysc_apiIp = "192.168.0.8";
            this.ysc_apiPort = 21702;
            this.ysc_apiAddress = this.ysc_apiIp + ":" + this.ysc_apiPort + "/jWebSocket/jWebSocket";
            this.ysc_apiNameSpace = "org.jwebsocket.plugins.ysc";
            
           
        }
        else {
            //大厅数据
            this.apiIp = "101.37.203.84";
            this.apiIp = "114.215.171.127";
            this.apiPort = 21701;
            this.apiAddress = this.apiIp + ":" + this.apiPort + "/jWebSocket/jWebSocket";
            this.apiNameSpace = "org.jwebsocket.plugins.kaya118";
            
            //夜市场数据
            this.ysc_apiIp = "101.37.203.84";
            this.ysc_apiIp = "114.215.171.127";
            this.ysc_apiPort = 21702;
            this.ysc_apiAddress = this.ysc_apiIp + ":" + this.ysc_apiPort + "/jWebSocket/jWebSocket";
            this.ysc_apiNameSpace = "org.jwebsocket.plugins.ysc";
            
            
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
