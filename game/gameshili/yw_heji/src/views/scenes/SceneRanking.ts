/**
 *
 * @排行榜
 *
 */
class SceneRanking extends basic.SceneBase {
    //定义变量
    private list0: eui.List;
    private list1: eui.List;
    private tabbar_type: eui.TabBar;
    private viewStack: eui.ViewStack;
    private _data0: eui.ArrayCollection;
    private _data1: eui.ArrayCollection;
    private is_get: Boolean[] = [false,false];
    
    //定义界面
    public constructor() {
        super();
        
        //定义界面
        this.skinName = SceneRankingSkin;
        
        //定义Tab按钮
        this.tabbar_type.selectedIndex = 0;
        this.viewStack.selectedIndex = this.tabbar_type.selectedIndex;
        
        //定义List
        this.list0.dataProvider = this._data0 = new eui.ArrayCollection();
        this.list1.dataProvider = this._data1 = new eui.ArrayCollection();
        this.list0.itemRenderer = RankingListItem;
        this.list1.itemRenderer = RankingListItem;
        
        //注册按钮
        this.tabbar_type.addEventListener(egret.Event.CHANGE,this.onTypeBtn,this);
        
        //注册事件
        basic.Dispatcher.addListener(EventNames.SHOW_RANKING,this.onShowRanking,this);
    }
    
    //显示前调用
    beforeShow(): void {
        //获取数据
        this.is_get = [false,false];
        
        //获取数据
        Comm.instance.sendSocket({ "type": "rankingList","rankType": this.tabbar_type.selectedIndex });
    }
    
    //显示排行榜
    private onShowRanking(e: egret.Event): void {
        //数据赋值
        var ranking_data: any[] = [];
        
        //数据赋值
        for(var i: number = 0;i < Math.min(30,e.data.data.length);i++) {
            //定义变量
            var now_data: any = e.data.data[i];

            //数据赋值
            now_data["num"] = i + 1;
            ranking_data[i] = now_data;
        }
        
        //判断赋值
        if(this.tabbar_type.selectedIndex == 0) {
            this._data0.source = ranking_data;
            this._data0.refresh();
        }
        else{
            this._data1.source = ranking_data;
            this._data1.refresh();
        }
        this.is_get[this.tabbar_type.selectedIndex] = true;
    }
    
    //类型按钮
    private onTypeBtn(e: egret.Event) {
        //播放声音
        basic.SoundManager.instance.playEffect("sound_btn_mp3");
        
        //数据赋值
        this.viewStack.selectedIndex = this.tabbar_type.selectedIndex;
        
        //判断获取数据
        if(this.is_get[this.tabbar_type.selectedIndex]==false){
            //获取数据
            Comm.instance.sendSocket({ "type": "rankingList","rankType": this.tabbar_type.selectedIndex });
        }
    }
}

//显示条定义
class RankingListItem extends eui.ItemRenderer {
    //定义变量
    private head: Head;
    private txt_id: eui.Label;
    private img_vip: eui.Image;
    private txt_name: eui.Label;
    private txt_gold: eui.Label;
    private com_ranking: eui.Component;

    //初始化界面
    dataChanged(): void {
        super.dataChanged();
        
        //显示头像
        this.head.show(this.data.headImgURL);
        
        //显示文本
        this.txt_name.text = this.data.nickName;
        this.txt_id.text = "ID:" + this.data.userId;
        this.com_ranking.currentState = this.data.num;
        this.img_vip.source = "txt_s_vip" + this.data.vipLeval + "_png";
        
        //判断显示金币
        if(this.data.gold < 100000000) {
            this.txt_gold.text = Math.floor(this.data.gold / 10000).toString() + "万";
        }
        else {
            this.txt_gold.text = Number(Math.floor(this.data.gold / 1000000)/100).toString() + "亿";
        }
    }
}



