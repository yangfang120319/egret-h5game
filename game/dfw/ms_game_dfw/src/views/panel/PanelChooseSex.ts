/**
 *
 * @选择性别
 *
 */
class PanelChooseSex extends basic.PanelBase {
    //自定义界面
    private static _instance: PanelChooseSex;
    public static get instance(): PanelChooseSex {
        if(this._instance == undefined) {
            this._instance = new PanelChooseSex();
        }
        return this._instance;
    }

    //定义变量
    private btn_yes: eui.Button;
    private btn_sex0: eui.Button;
    private btn_sex1: eui.Button;
    private now_sex: number = -1;
    private is_show: boolean = false;

    //皮肤设置
    protected init(): void {
        this.skinName = PanelChooseSexSkin;
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

        //注册按钮
        this.btn_yes.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onYesBtn,this);
        this.btn_sex0.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onSexBtn,this);
        this.btn_sex1.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onSexBtn,this);
    }

    //显示界面
    show(callback: Function = null): void {
        if(this.is_show == false){
            //数据赋值
            this.now_sex = -1;
            this.is_show = true;
            this._callback = callback;

            //显示界面
            this.popup();

            //显示按钮状态
            this.btn_sex1.currentState = "up";
            this.btn_sex0.currentState = "up";
        }
    }

    //退出函数
    private funExit(): void {
        //数据赋值
        this.is_show = false;
        
        //退出事件
        this.dealAction();
    }

    //性别按钮
    private onSexBtn(e:egret.TouchEvent): void{
        //定义变量
        this.now_sex = Number(e.target.name);
        
        //播放声音
        basic.SoundManager.instance.playEffect("sound_btn_mp3");

        //判断显示按钮
        if(this.now_sex == 0){
            this.btn_sex1.currentState = "up";
            this.btn_sex0.currentState = "down";
        }
        else{
            this.btn_sex0.currentState = "up";
            this.btn_sex1.currentState = "down";
        }
    }

    //确定按钮
    private onYesBtn(e: egret.TouchEvent): void{
        //播放声音
        basic.SoundManager.instance.playEffect("sound_btn_mp3");

        //判断显示
        if(this.now_sex != -1){
            //数据赋值
            UserData.User_Sex = this.now_sex;

            //发送消息
            Comm.instance.sendSocket({"type":"setSex",sex: this.now_sex});

            //退出设置
            this.funExit();
        }
        else{
            basic.Dispatcher.dispatch(EventNames.SHOW_TIPS,{"msg":"请选择性别！"});
        }
    }
}