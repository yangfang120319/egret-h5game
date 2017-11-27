/**
 *
 * @搜索房间
 *
 */
class Panel_SearchRoom extends basic.PanelBase {
    //自定义界面
    private static _instance: Panel_SearchRoom;
    public static get instance(): Panel_SearchRoom {
        if(this._instance == undefined) {
            this._instance = new Panel_SearchRoom();
        }
        return this._instance;
    }
    
    //定义变量
    private g_detail: eui.Group;
    private btn_enter: eui.Button;
    private btn_repeat: eui.Button;
    private bl_num: eui.BitmapLabel;
    private btn_num: eui.Button[] = [];
    
    //数据变量
    private btnnum: string[] = [];
    
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

        //定义皮肤
        this.skinName = Panel_SearchRoomSkin;

        //数据赋值
        for(var j: number = 0;j < 10;j++) {
            //定义变量
            var now_btn: eui.Button = this["btn_num" + j];

            //数据赋值
            this.btn_num[j] = now_btn;

            //注册按钮
            this.btn_num[j].addEventListener(egret.TouchEvent.TOUCH_TAP,this.onChooseBtn,this);

        }

        //定义按钮
        this.btn_enter.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onEnterBtn,this);
        this.btn_repeat.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onRepeatBtn,this);
    }
    
    //显示界面
    show(): void {
        //定义变量
        var ratezoom: number;

        //显示界面
        this.popup(this.funExit.bind(this));

        //初始化数据
        this.btnnum = [];

        //显示文本
        this.blChange();

        //判断显示大小
        if(basic.StageProxy.height < 880){
            ratezoom = (basic.StageProxy.height - 30) / 850;
        }
        else{
            ratezoom = 1;
        }
        
        //显示大小
        this.g_detail.scaleX = ratezoom;
        this.g_detail.scaleY = ratezoom;
    }
    
    //退出函数
    private funExit():void{
        //退出事件
        this.dealAction();
    }

    //数字按钮变化
    private onChooseBtn(e: egret.TouchEvent): void {
        //定义变量
        var btn_num: string = String(e.target.name);

        //播放声音
        basic.SoundManager.instance.playEffect("sound_btn_mp3");

        //数据赋值
        if(this.btnnum.length < 6) {
            this.btnnum.push(btn_num);
        }
        
        //显示文本
        this.blChange();
    }
    
    //进入房间
    private onEnterBtn(e: egret.TouchEvent): void {
        //播放声音
        basic.SoundManager.instance.playEffect("sound_btn_mp3");

        //判断进入
        if(this.btnnum.length == 6){
            //数据复制
            GameData.Room_Id = this.btnnum.join(""); 
            
            //发送消息
            Comm.instance.sendSocket({"type": "joinRoom","roomId": GameData.Room_Id});

            //退出函数
            this.funExit();
        }
        else{
            //显示提示
            basic.Dispatcher.dispatch(EventNames.SHOW_TIPS,{"msg":"需要输入六位房间号"});
        }
    }
    
    //重输
    private onRepeatBtn(e: egret.TouchEvent): void {
        //播放声音
        basic.SoundManager.instance.playEffect("sound_btn_mp3");

        //初始化数据
        this.btnnum = [];

        //显示文本
        this.blChange();
    }
    
    //输入数组变化
    private blChange(): void {
        //判断显示
        this.bl_num.text = this.btnnum.join(""); 
    }
}
