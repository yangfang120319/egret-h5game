/**
 *
 * @退出提示
 *
 */
class PanelExit extends basic.PanelBase {
    //自定义界面
    private static _instance: PanelExit;
    public static get instance(): PanelExit {
        if(this._instance == undefined) {
            this._instance = new PanelExit();
        }
        return this._instance;
    }

    //定义变量
    private btn_no: eui.Button;
    private btn_yes: eui.Button;
    private txt_tips: eui.Label;

    //皮肤设置
    protected init(): void {
        this.skinName = PanelExitSkin;
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
        this.btn_no.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onNoBtn,this);
        this.btn_yes.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onYesBtn,this);
    }

    //显示界面
    show(callback: Function = null): void {
        //显示界面
        this.popup(this.funExit.bind(this));

        //判断显示界面
        if(UserData.User_Id == GameData.Room_Owner_Id){
            this.txt_tips.visible = true;
        }
        else{
            this.txt_tips.visible = false;
        }
    }

    //退出函数
    private funExit(): void {
        //退出事件
        this.dealAction();
    }

    //取消按钮
    private onNoBtn(e:egret.TouchEvent): void{
        //播放声音
        basic.SoundManager.instance.playEffect("sound_btn_mp3");

		//退出对话框
		this.funExit();
    }

    //确定按钮
    private onYesBtn(e: egret.TouchEvent): void{
        //播放声音
        basic.SoundManager.instance.playEffect("sound_btn_mp3");

		//发送消息
		Comm.instance.sendSocket({"type":"closeRoom"});

		//退出对话框
		this.funExit();
    }
}