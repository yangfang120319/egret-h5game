/**
 *
 * @庄加列表
 *
 */
class Panel_EBG_ZhuangList extends basic.PanelBase {
    //自定义界面
    private static _instance: Panel_EBG_ZhuangList;
    public static get instance(): Panel_EBG_ZhuangList {
        if(this._instance == undefined) {
            this._instance = new Panel_EBG_ZhuangList();
        }
        return this._instance;
    }

    //定义变量
    private list: eui.List;
    private btn_up: eui.Button;
    private btn_down: eui.Button;
    private _data: eui.ArrayCollection;

    //皮肤设置
    protected init(): void {
        this.skinName = Panel_EBG_ZhuangListSkin;
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
        this.list.itemRenderer = ZhuangListItem;

        //注册按钮
        this.btn_up.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onUpBtn,this);
        this.btn_down.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onDownBtn,this);
        basic.Dispatcher.addListener(EventNames.EBG_ZHUANGLIST,this.onGetZhuangList,this);
    }

    //显示界面
    show(callback: Function = null): void {
        //数据赋值
        this._callback = callback;
        basic.PopUpManager.modalMaskAlpha = 0.6;

        //显示界面
        this.popup(this.funExit.bind(this));

        //发送消息
        Comm_ebg.instance.sendSocket({ "type": "dealerList" });
    }

    //庄家数据
    private onGetZhuangList(e: egret.Event): void {
        //定义变量
        var is_upzhuang: Boolean = false;
        
        //数据赋值
        if(GameData.Zhuang_Id == UserData.User_Id) {
            is_upzhuang = true;
        }
        else{
            for(var i: number = 0;i < e.data.data.length;i++) {
                if(UserData.User_Id == e.data.data[i].playerId) {
                    is_upzhuang = true;
                    break;
                }
            }
        }
        
        //数据赋值
        this._data.source = e.data.data;
        this._data.refresh();
        
        //判断显示按钮
        if(is_upzhuang == true) {
            this.btn_up.visible = false;
            this.btn_down.visible = true;
        }
        else{
            this.btn_up.visible = true;
            this.btn_down.visible = false;
        }
    }

    //申请按钮
    private onUpBtn(e: egret.TouchEvent) {
        //播放声音
        basic.SoundManager.instance.playEffect("sound_btn_mp3");

        //发送数据
        Comm_ebg.instance.sendSocket({ "type": "callDealer" });
    }
    
    //下庄按钮
    private onDownBtn(e: egret.TouchEvent): void {
        //播放声音
        basic.SoundManager.instance.playEffect("sound_btn_mp3");

        //发送消息
        Comm_ebg.instance.sendSocket({ "type": "cancelDealer" });
    }
    
    //退出按钮
    private funExit(e: egret.TouchEvent) {
        //播放声音
        basic.SoundManager.instance.playEffect("sound_btn_mp3");

        //退出界面
        this.dealAction();
    }
}

//显示条定义
class ZhuangListItem extends eui.ItemRenderer {
    //定义变量
    private txt_name: eui.Label;
    private img_head: eui.Image;
    private txt_jinbi: eui.BitmapLabel;

    //初始化界面
    dataChanged(): void {
        super.dataChanged();
        
        //显示头像
        this.img_head.source = this.data.headImgURL;

        //显示文本
        this.txt_name.text = this.data.nickName;
        this.txt_jinbi.text = GameData.assGold(2,this.data.gold);
    }
}
