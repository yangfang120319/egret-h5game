/**
 *
 * @夜市场-历史记录
 *
 */
class YSC_History extends eui.Component {
    //定义变量
    private list:eui.List;
    private _data: eui.ArrayCollection;
    private list_data:any[]=[];
    
    //初始化
    createChildren(): void {
        super.createChildren();

        //定义List
        this.list.dataProvider = this._data = new eui.ArrayCollection();
        this.list.itemRenderer = YSC_HistoryItem;

        //定义事件
        basic.Dispatcher.addListener(EventNames.YSC_History,this.onShowHistory,this);
    }

    //显示历史记录
    private onShowHistory(e:egret.TouchEvent):void{
        //数据赋值
        this.list_data=[];
        for(var i:number=0;i<Math.min(9,e.data.historys.length);i++){
            //定义变量
            var now_data:any={};

            //数据赋值
            now_data["num"] = e.data.historys[i][0];
            now_data["type"] = e.data.historys[i][1];
            this.list_data[i]=now_data;
        }
        this._data.source = this.list_data;
        this._data.refresh();
    }
}

//显示条定义
class YSC_HistoryItem extends eui.ItemRenderer {
    //定义变量
    private txt_num:eui.Label;
    private img_type:eui.Image;

    //初始化界面
    dataChanged(): void {
        super.dataChanged();
        
        //显示图片
        this.txt_num.text=String(this.data.num);
        if(this.data.type==2){
            this.img_type.source = "icon_ysc_choose_s_3_png";
        }
        else if(this.data.type ==3){

            this.img_type.source = "icon_ysc_choose_s_2_png";
        }
        else{
            this.img_type.source = "icon_ysc_choose_s_" + this.data.type + "_png";
        }
    }
}