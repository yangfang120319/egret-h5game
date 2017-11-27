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
    
    
     //----------------------马来西亚银行----------------------
    static MLXYYH_Game_Status: number;
    
    //倍率
    static MLXYYH_BeiLv: number = 0;
    
    //压住
    static MLXYYH_IsDouble: Boolean;
    static MLXYYH_IsReturn: Boolean;
    static MLXYYH_AddGold: number = 0;
    static MLXYYH_YaZhu_UserTotal: number;
    static MLXYYH_YaZhu_IsStart: Boolean = false;
    static MLXYYH_YaZhu_User: number[] = [0,0,0,0,0,0,0];
    static MLXYYH_YaZhu_Total: number[] = [0,0,0,0,0,0,0];
    static MLXYYH_YaZhu_NowUser: number[] = [0,0,0,0,0,0,0];
    static MLXYYH_BoxNum_Left:number[] = [6,4,6,2,6,4,6,3,6,5,6,5,3,6,5,6,1,6,4,6,5,4,6,5,6,5];
    static MLXYYH_BoxNum_Right: number[] = [6,4,6,2,6,4,6,5,6,5,6,4,5,6,4,6,0,6,5,6,3,5,6,5,6,3];
    static MLXYYH_RunOver_Left: number;
    static MLXYYH_RunOver_Right: number;
    static MLXYYH_RunOverNum_Left: number;
    static MLXYYH_RunOverNum_Right: number;
    static MLXYYH_RunMiddleNum_Left: number;
    static MLXYYH_RunMiddleNum_Right: number;
    static MLXYYH_RunOver_Luck: number;
    static MLXYYH_RunOver_IsWin_Left: Boolean;
    static MLXYYH_RunOver_IsWin_Right: Boolean;
    static MLXYYH_Box_X: number[] = [];
    static MLXYYH_Box_Y: number[] = [];
    
    
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
