/**
 *
 * @游戏数据
 *
 */
class GameData {
	//定义变量
	static Room_Url: string;
	static Room_Id: number = -1;
	static over_type: number;
	static over_tips: string;
	static Room_Owner_Id: number;
	static Shop_Url: string = "https://mp.yile.vip/yile/my/payment.htm";
	static Is_Show_Waiting: boolean = false;
	static Is_Test: boolean = false;
	static Over_Data: any;
	static FJ_Num: number;
	static is_connect: boolean = false;
	static heart_beat_time: number = null; 
	static is_start: boolean = false;
	static DJ_Gold_Dice: number;
	static DJ_Gold_Stop: number;
	static DJ_Gold_Prevent: number;
	static is_first_activate: boolean = true;

	//游戏数据
	static owner_id: number;
	static player_num: number = 8;
	static player_id: number[] = [1,2,3,4,5,6,7,8];
	static player_sex: number[] = [0,1,0,1,0,1,0,1];
	static player_name: string[] = ["测试1","测试2","测试3","测试4","测试5","测试6","测试7","测试8"];
	static player_head: string[] = ["","","","","","","",""];
	static player_place: number[] = [0,0,0,0,0,0,0,0];
	static player_now: number = 0;
	static tips_num: number[] = [0,0,0];
	static jl_dj_num: number = 0;
	static rate_num: number = 3;
}