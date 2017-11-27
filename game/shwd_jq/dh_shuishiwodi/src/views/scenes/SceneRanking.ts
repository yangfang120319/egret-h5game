/**
 *
 * @排行榜界面
 *
 */
class SceneRanking extends basic.SceneBase {
    //定义变量
    private list0: eui.List;
    private list1: eui.List;
    private tabbar: eui.TabBar;
    private btn_return: eui.Button;
    private viewstack: eui.ViewStack;
    private _data0: eui.ArrayCollection;
    private _data1: eui.ArrayCollection;
    private is_get: boolean[] = [false,false];
    private user_win: string[] =["",""];
    private user_level: number[] =[0,0];
    private user_totalnum: number[] =[0,0];

    //用户数据
    private head: Head;
    private txt_win: eui.Label;
    private img_vip: eui.Image;
    private img_star: eui.Image;
    private txt_name: eui.Label;
    private txt_totalnum: eui.Label;
    
    //初始化
	public constructor() {
        super();
        
        //定义界面
        this.skinName = SceneRankingSkin;
        
        //定义List
        this.list0.dataProvider = this._data0 = new eui.ArrayCollection();
        this.list1.dataProvider = this._data1 = new eui.ArrayCollection();
        this.list0.itemRenderer = RankingListItem;
        this.list1.itemRenderer = RankingListItem;

        //注册事件
        basic.Dispatcher.addListener(EventNames.SHOW_RANKING,this.onShowRanking,this);
        
        //注册按钮
        this.tabbar.selectedIndex = 0;
        this.tabbar.addEventListener(egret.Event.CHANGE,this.onTabBarChange,this);
        this.btn_return.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onExitBtn,this)
	}
	
    //显示前调用
    beforeShow(): void {
        //数据赋值
        this.is_get = [false,false];
        this.viewstack.selectedIndex = this.tabbar.selectedIndex;

        //显示头像
        this.head.show(UserData.User_Head);
        this.txt_name.text = UserData.User_Name;

        //发送消息
        if(this.tabbar.selectedIndex == 0){
            Comm.instance.sendSocket({"type":"rank", "rankType":"rankByWeek"});
        }
        else{
            Comm.instance.sendSocket({"type":"rank", "rankType":"rankByLevel"});
        }
    }
    
    //显示排行榜
    private onShowRanking(e: egret.Event): void{
        //判断显示排行榜
        if(e.data.rankType == "rankByWeek"){
            //数据赋值
            this.is_get[0] = true;
            this.user_win[0] = e.data.playerRank.rate;
            this.user_level[0] = Math.max(0,e.data.playerRank.level);
            this.user_totalnum[0] = e.data.playerRank.count;
            
            //显示界面
            this._data0.source = e.data.rankList;
            this._data0.refresh();

            //显示用户信息
            this.showUserRanking(0);
        }
        else{
            //数据赋值
            this.is_get[1] = true;
            this.user_win[1] = e.data.playerRank.rate;
            this.user_level[1] = Math.max(0,e.data.playerRank.level);
            this.user_totalnum[1] = e.data.playerRank.count;
            
            //显示界面
            this._data1.source = e.data.rankList;
            this._data1.refresh();

            //显示用户信息
            this.showUserRanking(1);
        }
    }

    //显示用户信息
    private showUserRanking(_type: number): void{
        //显示文本
        this.txt_win.text = this.user_win[_type];
        this.txt_totalnum.text = String(this.user_totalnum[_type]);
        
        //显示等级
        this.img_star.source = "icon_star" + Number(this.user_level[_type] % 10).toString() + "_png";
        this.img_vip.source = "icon_vip" + Math.floor(this.user_level[_type] / 10).toString() + "_png";
    }

    //TabBar修改事件
    private onTabBarChange(e: egret.Event) {
        //播放声音
        basic.SoundManager.instance.playEffect("sound_btn_mp3");

        //显示界面
        this.viewstack.selectedIndex = this.tabbar.selectedIndex;

        //发送消息
        if(this.tabbar.selectedIndex == 0){
            if(this.is_get[0] == false){
                Comm.instance.sendSocket({"type":"rank", "rankType":"rankByWeek"});
            }
            else{
                //显示用户信息
                this.showUserRanking(0);
            }
        }
        else{
            if(this.is_get[1] == false){
                Comm.instance.sendSocket({"type":"rank", "rankType":"rankByLevel"});
            }
            else{
                //显示用户信息
                this.showUserRanking(1);
            }
        }
    }

    //退出按钮
    private onExitBtn(e: egret.TouchEvent):void{
        //播放声音
        basic.SoundManager.instance.playEffect("sound_btn_mp3");

        //退出游戏
        basic.SceneManager.back();
    }
}

//显示条定义
class RankingListItem extends eui.ItemRenderer {
    //定义变量
    private head: Head;
    private txt_win: eui.Label;
    private img_vip: eui.Image;
    private img_star: eui.Image;
    private txt_name: eui.Label;
    private txt_totalnum: eui.Label;
    
    //初始化界面
    dataChanged(): void {
        super.dataChanged();
        
        //显示头像
        this.txt_win.text = this.data.rate;
        this.head.show(this.data.headImgURL);
        this.txt_name.text = this.data.nickName;
        this.txt_totalnum.text = String(this.data.count);
        
        //显示等级
        this.img_star.source = "icon_star" + Number(this.data.level % 10).toString() + "_png";
        this.img_vip.source = "icon_vip" + Math.floor(this.data.level / 10).toString() + "_png";
    }
}