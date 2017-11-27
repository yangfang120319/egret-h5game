/**
 *
 * @创建房间
 *
 */
class PanelCreateRoom extends basic.PanelBase {
    private static _instance: PanelCreateRoom;
    public static get instance(): PanelCreateRoom {
        if(this._instance == undefined) {
            this._instance = new PanelCreateRoom();
        }
        return this._instance;
    }
    
    //定义变量
    private txt_roomid: eui.Label;
    private btn_again: eui.Button;
    private btn_create: eui.Button;
    private btn_delete: eui.Button;
    private btn_num: eui.Button[] = [];
    private room_id: string = "";
    
    //定义界面
    constructor() {
        super();
    }

    //初始化
    createChildren(): void {
        super.createChildren();

        //定义界面
        this.skinName = PanelCreateRoomSkin;

        //数据赋值
        for(var i: number = 0;i < 10;i++) {
            //定义变量
            var btn: eui.Button = this["btn_num" + i];

            //数据赋值
            this.btn_num[i] = btn;

            //注册按钮
            this.btn_num[i].addEventListener(egret.TouchEvent.TOUCH_TAP,this.onNumBtn,this);
        }
        
        //注册事件
        basic.Dispatcher.addListener(EventNames.GF_JOINROOM,this.onJoinRoom,this);
        
        //注册按钮
        this.btn_again.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onAgainBtn,this);
        this.btn_create.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onCreateBtn,this);
        this.btn_delete.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onDeleteBtn,this);
    }

    //显示界面
    show(callback: Function = null): void {
        //显示背景
        basic.PopUpManager.modalMaskAlpha = 0;
        
        //显示界面
        this.popup(this.funExit.bind(this));
        
        //显示文本
        this.room_id = "";
        this.txt_roomid.text = "";
    }
    
    //加入房间
    private onJoinRoom(e:egret.Event):void{
        //退出对话框
        this.funExit();
        
        //数据赋值
        GameData.GF_RoomId = e.data.roomId;
        
        //显示界面
        basic.SceneManager.addTopScene(SceneNames.GUOFEN);
    }
    
    //退出对话框
    private funExit(): void {
        //显示背景
        basic.PopUpManager.modalMaskAlpha = 0.6;
        
        //退出界面
        this.dealAction();

        //播放声音
        basic.SoundManager.instance.playEffect("sound_btn_mp3");
    }
    
    //数字按钮
    private onNumBtn(e: egret.TouchEvent) {
        //定义变量
        var btnnum: number = Number(e.target.name);
        
        //数据赋值
        this.room_id = this.room_id + btnnum.toString();
        
        //显示文本
        this.txt_roomid.text = this.room_id;
        
        //判断进入房间
        if(this.room_id.length == 6) {
            //发送消息
            Comm.instance.sendSocket({ "type": "joinRoom","roomId": this.room_id });
            
            //清空文本
            this.room_id = "";
            this.txt_roomid.text = "";
        }
    }
    
    //重输按钮
    private onAgainBtn(e: egret.TouchEvent) {
        //清空文本
        this.room_id = "";
        this.txt_roomid.text = "";
    }
    
    //删除按钮
    private onDeleteBtn(e: egret.TouchEvent) {
        //删除文本
        if(this.room_id.length > 0) {
            this.room_id = this.room_id.substring(0,this.room_id.length - 1);
        }
        
        //显示文本
        this.txt_roomid.text = this.room_id;
    }
    
    //创建按钮
    private onCreateBtn(e: egret.TouchEvent) {
        //发送消息
        Comm.instance.sendSocket({"type":"openRoom"});
    }
}
