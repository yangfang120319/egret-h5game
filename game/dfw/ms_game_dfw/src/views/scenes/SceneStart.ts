/**
 *
 * @开始界面
 *
 */
class SceneStart extends basic.SceneBase {
    //定义变量
	private btn_exit: eui.Button;
    private btn_enter: eui.Button;
    private btn_create: eui.Button;
	private scroller: eui.Scroller;
    private now_data: number = null;
    
    //定义界面
    public constructor() {
        super();

        //定义界面
        this.skinName = SceneStartSkin;
        
        //注册事件
        basic.Dispatcher.addListener(EventNames.LOGIN,this.onLOgin,this);
        basic.Dispatcher.addListener(EventNames.JOIN_ROOM,this.onJoinRoom,this)
        basic.Dispatcher.addListener(EventNames.GET_ROOMID,this.onGetRoomId,this); 

        //注册按钮
        this.btn_exit.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onExitBtn,this);
        this.btn_enter.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onEnterBtn,this);
        this.btn_create.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onCreateBtn,this);
        basic.StageProxy.stage.addEventListener(egret.Event.ENTER_FRAME,this.onCheckRemove,this);
    }
    
    //显示前调用
    /*
    beforeShow(params: any): void {
        //定义变量
        var params: any = basic.Utils.getUrlParams();
        
        //数据赋值
        GameData.Room_Id = -1;
        UserData.User_Token = "";

        //判断加入房间
        if(params.roomId != null && GameData.is_start == false){
            if(GameData.Is_Test == true){
                //发送消息
                Comm.instance.sendSocket({
                    "type": "login",
                    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHBpcmVkIjoxNTExMjM1NTQ1Nzc0LCJ1c2VySWQiOjUxNDZ9.1uBbBUIUpD-FBszD9jokJ4AmpgoLSg4gOe-UNtwozg0",
                    "roomId": params.roomId
                });

                //数据赋值
                UserData.User_Token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHBpcmVkIjoxNTExMjM1NTQ1Nzc0LCJ1c2VySWQiOjUxNDZ9.1uBbBUIUpD-FBszD9jokJ4AmpgoLSg4gOe-UNtwozg0";
            }
            else{
                //发送消息
                Comm.instance.sendSocket({
                    "type": "login",
                    "token": params.token,
                    "roomId": params.roomId
                });
                
                //数据赋值
                UserData.User_Token = params.token;
            }
        }
        else{
            //判断赋值
            if(GameData.Is_Test == true){
                params = {"token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHBpcmVkIjoxNTExMjM1NTQ0MjcwLCJ1c2VySWQiOjUwMzF9.Fq4kOivrXuYGgVIjXrV10kVNWSu5k8tC5Hbvi0QyBrQ"};
            }
            
            //判断获取
            if(Comm.instance.jugeConnect() == true){
                //链接数据库
                Comm.instance.sendSocket({"type":"getRoomId","token":params.token});
            }
            else{
                //移除加载界面
                basic.SceneManager.removeTopScene(SceneNames.LOADING);
            }
        }

        //屏蔽分享
        var request = new egret.HttpRequest();
        request.responseType = egret.HttpResponseType.TEXT;
        var url = window.location.href.split('#')[0];
        request.open("https://mp.yile.vip/jsapi/get.json?url=" + encodeURIComponent(url),egret.HttpMethod.GET);
        request.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        request.send();
        request.addEventListener(egret.Event.COMPLETE,this.onGetComplete,this);

        //数据赋值
        GameData.is_start = true;
    }*/

    private onGetComplete(event:egret.Event):void {
        var request = <egret.HttpRequest>event.currentTarget;
        var sign = JSON.parse(request.response);
        window['initShare'](sign.appId, sign.timestamp, sign.nonceStr, sign.signature);
    }

    //-----------------------定义事件--------------------
    //检测移除
    private onCheckRemove(e:egret.Event): void{
       
    }
    
    //房间号码
    private onGetRoomId(e:egret.Event): void{
       
    }

    //登录函数
    private onLOgin(e: egret.Event):void{
        //数据赋值
        UserData.User_Gold = e.data.gold;
        UserData.User_Id = e.data.playerId;
        UserData.User_Name = e.data.nickName;
        UserData.User_Head = e.data.headImgURL;
        UserData.User_CardNum = e.data.roomCard;
        if(e.data.agent == false){
            UserData.User_Is_Dl = false;
        }
        else{
            UserData.User_Is_Dl = true;
        }
    }

    //加入房间
    private onJoinRoom(e:egret.Event): void{
       
    }

    //判断显示界面
    private onJugeShowGame(e:egret.Event):void{
        //判断显示
        if(LoaderData.is_Game_LoadEnd == true){
            //等待显示
            this.removeEventListener(egret.Event.ENTER_FRAME,this.onJugeShowGame,this);

            //移除界面
            basic.SceneManager.removeTopScene(SceneNames.LOADING);

            //进入游戏
            basic.SceneManager.show(SceneNames.GAME);
        }
    }

    //-----------------------定义按钮--------------------
    //退出按钮
    private onExitBtn(e:egret.TouchEvent): void{
        //播放声音
        basic.SoundManager.instance.playEffect("sound_btn_mp3");

        if(window['isWeiXin']()){
            window.location.href = "https://mp.yile.vip/yile/game.htm";
        }else{
            window['callYlExitFunc']();
        }
    }
    
    //扫一扫按钮
    private onEnterBtn(e:egret.TouchEvent): void{
        //播放声音
        basic.SoundManager.instance.playEffect("sound_btn_mp3");

        window['callYlScanFunc']();
    }
    
    //创建按钮
    private onCreateBtn(e:egret.TouchEvent): void{
        basic.SceneManager.show(SceneNames.GAME);
      
    }
}
