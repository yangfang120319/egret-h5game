/**
 *
 * @庄界面
 *
 */
class JSYS_Zhuang extends eui.Component {
    //定义变量
    private head: Head;
    private list: eui.List;
    private btn: eui.Button;
    private img_vip: eui.Image;
    private txt_num: eui.Label;
    private txt_name: eui.Label;
    private rect_mask: eui.Rect;
    private g_zhuanglist: eui.Group;
    private txt_gold: eui.BitmapLabel;
    private txt_zhuang_times: eui.Label;
    private _tween_y: egret.Tween = null;
    private is_show: Boolean = false;
    private _data: eui.ArrayCollection;
    
    //初始化
    createChildren(): void {
        super.createChildren();
        
        //显示界面76   
        this.g_zhuanglist.y = -255;
        
        //显示遮罩
        this.rect_mask.visible = true;
        this.g_zhuanglist.visible = true;
        this.g_zhuanglist.mask = this.rect_mask;
        
        //定义List
        this.list.dataProvider = this._data = new eui.ArrayCollection();
        this.list.itemRenderer = JSTS_ZhuangListItem;
        
        //注册按钮
        this.btn.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onThisBtn,this);
    }
    
    //显示界面
    show():void{
        //显示庄金币
        this.showGold();
        
        //显示当庄次数
        this.showZhuangTimes();
        
        //判断显示
        if(GameData.Zhuang_Id == 0) {
            //清空文本
            this.txt_zhuang_times.text = "";
            this.head.show("icon_zhuanghead_jpg");
        }
        else {
            this.head.show(GameData.Zhuang_Head);
        }
        
        //显示信息
        this.txt_name.text = GameData.Zhuang_Name;
        this.img_vip.source = "txt_s_vip" + GameData.Zhuang_VIP.toString() + "_png";
    }
    
    //显示庄金币
    showGold(): void {
        //判断显示
        if(GameData.Zhuang_Id == 0) {
            //显示金币
            this.txt_gold.text = "88888y";
            this.txt_zhuang_times.text = "";
        }
        else {
            //判断显示
            this.txt_gold.text = Number(Math.floor(GameData.Zhuang_Gold / 1000000)/100).toString()+"y";
        }
    }
    
    //显示庄列表
    showZhuangList(_data:Array<any>):void{
        //定义变量
        var mingci: number = 0;
        
        //数据赋值
        GameData.JSYS_ZhuangList = [];
        
        //清空文本
        this.txt_zhuang_times.text = "";
        
        //数据赋值
        for(var i: number = 0;i < _data.length;i++){
            //定义变量
            var now_data:any=_data[i];
            
            //数据赋值
            now_data["num"] = i + 1;
            GameData.JSYS_ZhuangList[i] = now_data;
            
            //判断显示
            if(UserData.User_Id == now_data.playerId){
                mingci = i + 1;
            }
        }
        
        //判断显示文本
        if(mingci > 0) {
            this.txt_zhuang_times.text = "排庄名次:" + mingci.toString();
        }
        
        //显示将诶面
        this._data.source = GameData.JSYS_ZhuangList;
        this._data.refresh();
    }
    
    //显示当庄次数
    private showZhuangTimes():void{
        //判断显示
        if(GameData.Zhuang_Times == -1){
            this.txt_num.text = "";
        }
        else{
            this.txt_num.text = "剩余局数:" + GameData.Zhuang_Times.toString();
        }
    }
    
    //当前按钮
    private onThisBtn(e:egret.TouchEvent):void{
        //播放声音
        basic.SoundManager.instance.playEffect("sound_btn_mp3");
        
        //判断显示
        if(this.is_show == false) {
            //数据赋值
            this.is_show = true;

            //停止移动
            if(this._tween_y) {
                this._tween_y.setPaused(true);
                this._tween_y = null;
            }

            //开始移动
            this._tween_y = egret.Tween.get(this.g_zhuanglist).to({ y: 76 },400,egret.Ease.backOut).call(()=>{
                //注册按钮
                basic.StageProxy.stage.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onRemoveBtn,this);
            });
        }
    }
    
    //移除按钮
    private onRemoveBtn(e:egret.TouchEvent):void{
        //数据赋值
        this.is_show = false;
        
        //停止移动
        if(this._tween_y) {
            this._tween_y.setPaused(true);
            this._tween_y = null;
        }
        
        //播放声音
        basic.SoundManager.instance.playEffect("sound_btn_mp3");
        
        //开始移动
        this._tween_y = egret.Tween.get(this.g_zhuanglist).to({ y: -255 },400,egret.Ease.backIn);
         
        //注销按钮
        basic.StageProxy.stage.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.onRemoveBtn,this);
    }
}

//显示条定义
class JSTS_ZhuangListItem extends eui.ItemRenderer {
    //定义变量
    private txt_num: eui.Label;
    private txt_name: eui.Label;
    private txt_gold: eui.Label;
    private txt_vip: eui.BitmapLabel;
    
    //初始化界面
    dataChanged(): void {
        super.dataChanged();
        
        //显示文本
        this.txt_num.text = this.data.num+".";
        this.txt_name.text = this.data.nickName;

        //判断显示金币
        this.txt_gold.text = Number(Math.floor(this.data.gold / 1000000) / 100).toString() + "亿";
    }
}

