/**
 *
 * @游戏界面
 *
 */
class GameData {
    //定义界面
    static Game_Id: number = 1;
    static Game_Type: number = 0;
    static HongBaoRain_Data: string[] = [];
    
    //-------------------游戏公共-----------------------
    //游戏数据
    static Game_Room_Id: string;
    static Game_IsDouble: Boolean;
    static Game_Chip_Now: number;//当前选择筹码
    static Game_Chip_Gold: number[] = [];//筹码金币
    static Game_Chip: number[] = [100,500,1000,2500,5000,10000,25000,50000,100000];//游戏筹码
    
    //庄数据
    static Game_Zhuang_Id: number;
    static Game_Zhuang_name: string;
    static Game_Zhuang_head: string;
    static Game_Zhuang_Gold: number;
    
    
    //-------------------三公-----------------------
    static SG_YaZhu_UserTotal: number = 0;
    static SG_Game_Status: number;//游戏状态(0：等待下注，1：下注时间，2：开奖时间，3：结算时间)
    static SG_Poker_Table_Card: any[] = [[38,5],[6,41],[18,4],[24,55],[24,55]];
    static SG_Poker_Table_Type: number[] = [1,1,1,1,1];
    static SG_Poker_Table_IsWin: number[] = [];
    static SG_YaZhu_User: number[] = [];
    static SG_YaZhu_Total: number[] = [];
    static SG_YaZhu_User_Now: number[] = [];
    static SG_YaZhu_User_NowDetail: any[] = [[],[],[],[],[]];
    static SG_UpZhuang_Condition: number;
    
    
    //保存当前金币
    static saveNowChip():void{
        //保存数据
        basic.localStorage.setItem('nowChip',GameData.Game_Chip_Now.toString());
    }
    
    //保存选择筹码
    static saveChooseChip():void{
        //保存数据
        basic.localStorage.setItem('ChooseChip',GameData.Game_Chip_Gold.toString());
    }
    
    //显示金币文本
    static assShowGold(_gold:number):string{
        //定义变量
        var show_gold:string;
        
        //判断显示
        if(_gold % 1000 == 0 && _gold > 0) {
            show_gold = Math.floor(_gold / 1000).toString() + "k";
        }
        else {
            show_gold = _gold.toString();
        }
        
        return show_gold;
    }
}
