/**
 *
 * @选择进入房间
 *
 */
class PanelEnterRoom extends basic.PanelBase {
    //自定义界面
    private static _instance: PanelEnterRoom;
    public static get instance(): PanelEnterRoom {
        if(this._instance == undefined) {
            this._instance = new PanelEnterRoom();
        }
        return this._instance;
    }

    //定义变量
    private btn_no: eui.Button;
    private btn_yes: eui.Button;
	private room_id: number;

    //皮肤设置
    protected init(): void {
        this.skinName = PanelEnterRoomSkin;
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
    show(_room_id: number,callback: Function = null): void {
		//数据赋值
		this.room_id = _room_id;

        //显示界面
        this.popup(this.funExit.bind(this));
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

		//定义变量
        var params: any = basic.Utils.getUrlParams();
        
        //判断加入房间
        Comm.instance.sendSocket({
            "type": "login",
            "token": params.token,
            "roomId": this.room_id
        });

		//退出对话框
		this.funExit();
    }
}