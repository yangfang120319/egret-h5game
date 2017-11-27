/**
 *
 * @申请上庄
 *
 */
class Panel_UpZhuang extends basic.PanelBase {
    //自定义界面
    private static _instance: Panel_UpZhuang;
    public static get instance(): Panel_UpZhuang {
        if(this._instance == undefined) {
            this._instance = new Panel_UpZhuang();
        }
        return this._instance;
    }

    //定义变量
    private list: eui.List;
    private btn_yes: eui.Button;
    private btn_close: eui.Button;
    private _data: eui.ArrayCollection;
    private game_type: number;//游戏类型（0：二八杠，1：牛牛，2：三公）

    //皮肤设置
    protected init(): void {
        this.skinName = Panel_UpZhuangSkin;
    }

    //定义界面
    constructor() {
        super(basic.dialogEffect.Scale,{
            withFade: true,
            ease: egret.Ease.backOut
        },basic.dialogEffect.Scale,{ withFade: true,ease: egret.Ease.backIn });
    }

    //初始化界面
    createChildren(): void {
        super.createChildren();
        
        //定义List
        this.list.dataProvider = this._data = new eui.ArrayCollection();
        this.list.itemRenderer = UpZhuangItem;
        
        //注册按钮
        basic.Dispatcher.addListener(EventNames.ZHUANG_UP_LIST,this.onShowList,this);
        this.btn_yes.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onYesBtn,this);
        this.btn_close.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onCloseBtn,this);
    }

    //显示界面
    show(_type: number,callback: Function = null): void {
        //数据赋值
        this.game_type = _type;
        this._callback = callback;

        //显示界面
        this.popup(this.funExit.bind(this));
        
        //判断显示
        if(this.game_type == 0) {
            //Comm_ebg.instance.sendSocket({ "type": "dealerList" });
        }
        else if(this.game_type == 1) {
            //Comm_nn.instance.sendSocket({ "type": "dealerList" });
        }
        else if(this.game_type == 2) {
            //Comm_sg.instance.sendSocket({ "type": "dealerList" });
        }
    }
    
    //显示界面
    private onShowList(e: egret.Event): void {
        //定义变量
        var now_data: any[] = [];
        
        //数据赋值
        for(var i:number=0;i<e.data.data.length;i++){
            //数据赋值
            now_data[i] = e.data.data[i];
            now_data[i].ranking = i+1;
        }
        
        //数据赋值
        this._data.source = now_data;
        this._data.refresh();
    }
    
    //退出函数
    private funExit(): void {
        //退出事件
        this.dealAction();
    }
    
    //确定按钮
    private onYesBtn(e:egret.TouchEvent):void{
        //播放声音
        basic.SoundManager.instance.playEffect("sound_btn_mp3");
        
        //判断显示
        if(this.game_type == 0) {
            //Comm_ebg.instance.sendSocket({ "type": "callDealer" });
        }
        else if(this.game_type == 1) {
            //Comm_nn.instance.sendSocket({ "type": "callDealer" });
        }
        else if(this.game_type == 2) {
            //Comm_sg.instance.sendSocket({ "type": "callDealer" });
        }
    }
    
    //退出按钮
    private onCloseBtn(e: egret.TouchEvent) {
        //播放声音
        basic.SoundManager.instance.playEffect("sound_btn_mp3");

        //退出设置
        this.funExit();
    }
}

//显示条定义
class UpZhuangItem extends eui.ItemRenderer {
    //定义变量
    private head:Game_Head;
    private txt_name: eui.Label;
    private txt_gold: eui.Label
    private img_ranking:eui.Image;
    
    //初始化界面
    dataChanged(): void {
        super.dataChanged();

        //显示头像
        this.head.show(this.data.headImgURL);
        
        //显示文本
        this.txt_gold.text = this.data.gold;
        this.txt_name.text = this.data.nickName;
        
        //判断显示
        this.img_ranking.source = "icon_g_upzhuang" + Math.min(4,this.data.ranking).toString()+"_png";
    }
}
