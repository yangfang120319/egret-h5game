/**
 *
 * @开始界面
 *
 */
class SceneStart extends basic.SceneBase {
   
   // 定义变量
    private startmsg: StartMsg;
    private btn_ranking: eui.Button;
    private btn_findroom: eui.Button;
    private btn_createroom: eui.Button;
    private btn_quickenter: eui.Button;
    
    //定义界面
    public constructor() {
        super();

        //定义界面
        this.skinName = SceneStartSkin;

        //注册事件
        basic.Dispatcher.addListener(EventNames.JOIN_ROOM,this.onJoinRoom,this);

        //注册按钮
        this.btn_ranking.addEventListener(egret.TouchEvent.TOUCH_TAP,this.rankchange,this);
        this.btn_findroom.addEventListener(egret.TouchEvent.TOUCH_TAP,this.findroomchange,this);
        this.btn_createroom.addEventListener(egret.TouchEvent.TOUCH_TAP,this.buildroomchange,this);
        this.btn_quickenter.addEventListener(egret.TouchEvent.TOUCH_TAP,this.quickenterchange,this);
    }
    
    //显示前调用
    beforeShow(params: any): void {
        //用户信息初始化
        this.startmsg.show();
    }

    //定义界面适配
    onShowPlace(): void{
        //定义变量
        var ratezoom: number;

        //判断显示
        if(basic.StageProxy.height > 960){
            //数据赋值
            ratezoom = (basic.StageProxy.height - 960)/176;

            //定义位置
            this.btn_ranking.y = 45 + 40 * ratezoom;
            this.btn_createroom.y = 150 + 80 * ratezoom;
            this.btn_quickenter.y = 325 + 90 * ratezoom;
            this.btn_findroom.y = 500 + 100 * ratezoom;
        }
        else{
            //数据赋值
            ratezoom = (basic.StageProxy.height - 853)/107;

            //定义位置
            this.btn_ranking.y = 25 + 20 * ratezoom;
            this.btn_createroom.y = 110 + 40 * ratezoom;
            this.btn_quickenter.y = 255 + 70 * ratezoom;
            this.btn_findroom.y = 400 + 100 * ratezoom;
        }
    }

    //-----------------------------定义事件-----------------------
    //加入房间
    private onJoinRoom(e: egret.Event): void{
        //数据赋值
        GameData.Room_Id = e.data.roomId;

        //显示游戏界面
        basic.SceneManager.show(SceneNames.GAME);
    }
    
    //-----------------------------定义按钮-----------------------
    //排名按钮
    private rankchange(e: egret.TouchEvent): void {
        //播放声音
        basic.SoundManager.instance.playEffect("sound_btn_mp3");

        //显示排行榜
        basic.SceneManager.show(SceneNames.RANK);
    }

    //建立房间按钮
    private buildroomchange(e: egret.TouchEvent): void {
        //播放声音
        basic.SoundManager.instance.playEffect("sound_btn_mp3");

        //发送消息
        Comm.instance.sendSocket({"type":"createRoom"});
    }

    //寻找房间按钮
    private findroomchange(e: egret.TouchEvent): void {
        //播放声音
        basic.SoundManager.instance.playEffect("sound_btn_mp3");

        //显示搜索房间
        Panel_SearchRoom.instance.show();
    }

    //快速进入按钮
    private quickenterchange(e: egret.TouchEvent): void {
        //播放声音
        basic.SoundManager.instance.playEffect("sound_btn_mp3");
        
        //发送消息
        Comm.instance.sendSocket({"type":"autoMarry"});
    }
}
