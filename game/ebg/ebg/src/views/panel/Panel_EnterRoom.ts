/**
 *
 * @进入房间
 *
 */
class Panel_EnterRoom extends basic.PanelBase {
    //自定义界面
    private static _instance: Panel_EnterRoom;
    public static get instance(): Panel_EnterRoom {
        if(this._instance == undefined) {
            this._instance = new Panel_EnterRoom();
        }
        return this._instance;
    }

    //定义变量
    private btn_close: eui.Button;
    private btn_again: eui.Button;
    private btn_delete: eui.Button;
    private btn_createroom: eui.Button;
    private btn_number: eui.Button[] = [];
    private txt_number: eui.BitmapLabel[] = [];
    private now_entrt_number: number;
    private game_type: number;//游戏类型（0：二八杠，1：牛牛，2：三公）
    
    //皮肤设置
    protected init(): void {
        this.skinName = Panel_EnterRoomSkin;
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
        this.btn_close.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onCloseBtn,this);
        this.btn_again.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onAgainBtn,this);
        this.btn_delete.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onDeleteBtn,this);
        this.btn_createroom.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onCreateRoom,this);
    }

    //显示界面
    show(_type:number,callback: Function = null): void {
        //数据赋值
        this.game_type = _type;
        this._callback = callback;
        
        //数据赋值
        this.now_entrt_number = 0;
        for(var i: number = 0;i < 6;i++) {
            //定义变量
            var txt: eui.BitmapLabel = this["txt_number" + i];

            //数据赋值
            this.txt_number[i] = txt;
            this.txt_number[i].text = "";
        }
        for(var j: number = 0;j < 10;j++) {
            //定义变量
            var btn: eui.Button = this["btn_number" + j];

            //数据赋值
            this.btn_number[j] = btn;
            
            //注册按钮
            this.btn_number[j].addEventListener(egret.TouchEvent.TOUCH_TAP,this.onNumberBtn,this);
        }
        
        //显示界面
        this.popup(this.funExit.bind(this));
    }

    //退出函数
    private funExit(): void {
        //注销按钮
        for(var j: number = 0;j < 10;j++) {
            ///注销按钮
            this.btn_number[j].removeEventListener(egret.TouchEvent.TOUCH_TAP,this.onNumberBtn,this);
        }
        
        //退出事件
        this.dealAction();
    }

    //退出按钮
    private onCloseBtn(e: egret.TouchEvent) {
        //播放声音
        basic.SoundManager.instance.playEffect("sound_btn_mp3");

        //退出设置
        this.funExit();
    }
    
    //重输按钮
    private onAgainBtn(e: egret.TouchEvent) {
        //播放声音
        basic.SoundManager.instance.playEffect("sound_btn_mp3");
        
        //数据赋值
        this.now_entrt_number = 0;
        for(var i: number = 0;i < 6;i++) {
            //显示文本
            this.txt_number[i].text = "";
        }
    }
    
    //删除按钮
    private onDeleteBtn(e: egret.TouchEvent) {
        //播放声音
        basic.SoundManager.instance.playEffect("sound_btn_mp3");

        //判断显示
        if(this.now_entrt_number > 0) {
            //显示文本
            this.txt_number[this.now_entrt_number - 1].text = "";

            //数据赋值
            this.now_entrt_number -= 1;
        }
    }
    
    //数字按钮
    private onNumberBtn(e: egret.TouchEvent) {
        //定义变量
        var btnnum: number = Number(e.target.name);
        
        //显示文本
        this.txt_number[this.now_entrt_number].text = String(btnnum);
        
        //数据赋值
        this.now_entrt_number += 1;
        
        //判断显示
        if(this.now_entrt_number==6){
            //退出设置
            this.funExit();
            
            //数据赋值
            GameData.Game_Room_Id = "";
            for(var i: number = 0;i < 6;i++) {
                GameData.Game_Room_Id += this.txt_number[i].text;
            }

            //初始化游戏
            if(this.game_type == 0) {
                //Comm_ebg.instance.sendSocket({ "type": "joinRoom","roomId": GameData.Game_Room_Id });
            }
            else if(this.game_type == 1){
                //Comm_nn.instance.sendSocket({ "type": "joinRoom","roomId": GameData.Game_Room_Id });
            }
            else if(this.game_type == 2) {
                //Comm_sg.instance.sendSocket({ "type": "joinRoom","roomId": GameData.Game_Room_Id });
            }
        }
        
        //播放声音
        basic.SoundManager.instance.playEffect("sound_btn_mp3");
    }
    
    //创建房间按钮
    private onCreateRoom(e:egret.TouchEvent):void{
        //播放声音
        basic.SoundManager.instance.playEffect("sound_btn_mp3");

        //退出设置
        this.funExit();
        
        //初始化游戏
        if(this.game_type == 0) {
            //Comm_ebg.instance.sendSocket({ "type": "openRoom","roomType": "zuozhuang","roomGold": 0 });
        }
        else if(this.game_type == 1) {
            //Comm_nn.instance.sendSocket({ "type": "openRoom","roomType": "zuozhuang","roomGold": 0 });
        }
        else if(this.game_type == 2) {
            //Comm_sg.instance.sendSocket({ "type": "openRoom","roomType": "zuozhuang","roomGold": 0 });
        }
        
//        //显示界面
//        egret.setTimeout(()=>{
//            //显示创建房间
//            Panel_CreateRoom.instance.show(this.game_type);
//        },this,200);
    }
}