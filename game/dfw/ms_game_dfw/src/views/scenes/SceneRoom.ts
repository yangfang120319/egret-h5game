/**
 *
 * @房间界面
 *
 */
class SceneRoom extends basic.SceneBase {
    //定义变量
    private chat: Chat;
    private user: StartUser;
    private txt_tips: eui.Label;
	private g_detail: eui.Group;
	private img_back: eui.Image;
	private scroller: eui.Scroller;
    private btn_start: eui.Button;
	private btn_invitaion: eui.Button;
    private head: Head[] = [];
    
    //房间信息变量
	private img_dqcode: eui.Image;
    private sp_qrcode: egret.Sprite;
	private txt_roomname: eui.Label;
	private txt_roomname_back: eui.Label;

    //定义数据变量
    private owner_id: number;
    private owner_name: string;
    private player_num: number;
    
    //定义界面
    public constructor() {
        super();

        //定义界面
        this.skinName = SceneRoomSkin;

        //数据赋值
        for(var i: number = 0;i < 8;i++){
            //定义变量
            var now_head: Head = this["head" + i];

            //数据赋值
            this.head[i] = now_head;
        }

        //注册事件
        basic.Dispatcher.addListener(EventNames.GAME_START,this.onGameStart,this);
		basic.Dispatcher.addListener(EventNames.CHANGE_STATUS,this.onChangeStatus,this);
        basic.Dispatcher.addListener(EventNames.SHOW_PLAYERLIST,this.onShowPlayerList,this);

        //注册按钮
        this.btn_start.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onStartBtn,this);
	    this.btn_invitaion.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onInvitaionBtn,this);
    }

    //显示前调用
    beforeShow(params: any): void {
        //显示基本信息
        this.user.show();
        
        //开始消息
        this.chat.start();

        //隐藏按钮
        this.txt_tips.visible = false;
        this.btn_start.visible = false;

        //显示二维码
        this.sp_qrcode = qr.QRCode.create(GameData.Room_Url,250,250);
        this.g_detail.addChild( this.sp_qrcode);
        this.sp_qrcode.x = this.img_dqcode.x + 5;
        this.sp_qrcode.y = this.img_dqcode.y + 5;
    }

    //隐藏前调用
    beforeHide(): void {
        //停止消息
        this.chat.stop();

        //隐藏按钮
        this.txt_tips.visible = false;
        this.btn_start.visible = false;
        
        //移除二维码
        this.g_detail.removeChild( this.sp_qrcode);
    }

    //定义适配
    onShowPlace():void{
        
    }
    
    //-----------------------定义事件--------------------
    //游戏开始
    private onGameStart(e:egret.Event):void{
        //显示游戏
        basic.SceneManager.show(SceneNames.GAME);
    }

    //改变状态
	private onChangeStatus(e:egret.Event):void{
		//判断显示界面
		for(var i: number = 0;i<e.data.data.length;i++){
			this.head[i].showStatus(e.data.data[i].status);
		}
	}

    //显示用户列表
    private onShowPlayerList(e:egret.Event): void{
        //显示头像
        for(var i: number = 0;i <8;i++){
            if(i < e.data.data.length){
                //显示头像和头像
                if(e.data.data[i].sex >= 0){
                    this.head[i].showSex(e.data.data[i].sex);
                }
                this.head[i].show(e.data.data[i].headImgURL);
                this.head[i].showStatus(e.data.data[i].isleave);
                this.head[i].showName(e.data.data[i].nickName);

                //判断赋值
                if(e.data.data[i].playerId == e.data.ownerId){
                    this.owner_id = e.data.data[i].playerId;
                    this.owner_name = e.data.data[i].nickName;
                }

                //判断赋值
                if(Number(e.data.data[i].playerId) == UserData.User_Id){
                    UserData.User_Sex = e.data.data[i].sex;
                }
            }
            else{
                this.head[i].hide();
            }
        }
        this.player_num = e.data.data.length;
        GameData.Room_Owner_Id = Number(e.data.ownerId);

        //判断显示按钮
        if(UserData.User_Id == this.owner_id){
            this.btn_start.visible = true;
        }
        else{
            this.txt_tips.visible = true;
        }

        //显示选择新别
        if(UserData.User_Sex == -1){
            egret.setTimeout(()=>{
                if(UserData.User_Sex == -1){
                    PanelChooseSex.instance.show();
                }
            },this,400);
        }
        
        //隐藏房间名称
        this.txt_roomname.text = this.owner_name + "的天仙配局";
        this.txt_roomname_back.text = this.owner_name + "的天仙配局";
    }

    //-----------------------定义按钮--------------------
    //开始按钮
    private onStartBtn(e:egret.TouchEvent): void{
        //播放声音
        basic.SoundManager.instance.playEffect("sound_btn_mp3");

        //判断显示
        if(this.player_num < 2){
            //显示提示
            basic.Dispatcher.dispatch(EventNames.SHOW_TIPS,{"msg":"人数小于2个，不能开始游戏！"})
        }
        else{
            //发送消息
            Comm.instance.sendSocket({"type":"startGame"});
        }
    }

    //邀请按钮
	private onInvitaionBtn(e:egret.TouchEvent): void{
        //播放声音
        basic.SoundManager.instance.playEffect("sound_btn_mp3");


        
    }
}