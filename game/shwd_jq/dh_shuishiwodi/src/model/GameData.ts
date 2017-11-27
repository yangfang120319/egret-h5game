/**
 *
 * @游戏全局变量
 *
 */
class GameData {
	static Room_Id: string;
	static Game_Word: string;
	static Game_State: number;
	static Player_List: any[] = [];
	static Is_Show_Word: boolean = false;
	static Player_State: number;//游戏状态：0：描述，1：描述完成，2：投票，3：投票完成，4：出局
}