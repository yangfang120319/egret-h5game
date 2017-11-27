/**
 *
 * @准备
 *
 */
class GameReady extends eui.Component {
	//定义变量
    private g_head: eui.Group;
    private btn_exit: eui.Button;
    private btn_ready: eui.Button;
    private btn_share: eui.Button;
    private player_num: number = 0;
    private player_head: Head_Add[] = [];

    //初始化
    createChildren(): void {
        super.createChildren();
        
        //定义事件
        basic.Dispatcher.addListener(EventNames.GAME_INFO,this.onGameInfo,this);

        //注册按钮
        this.btn_exit.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onExitBtn,this);
        this.btn_ready.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onReadyBtn,this);
        this.btn_share.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onShareBtn,this);
    }

    //移除头像
    clean(): void{
        //移除头像
        for(var i: number = 0;i < this.player_num;i++){
            //移除头像
            this.g_head.removeChild(this.player_head[i]);
        }

        //清空数据
        this.player_num = 0;
        this.player_head = [];
    }

    //游戏初始化
    private onGameInfo(e: egret.Event): void{
        //移除头像
        this.clean();

        //显示按钮
        this.btn_ready.enabled = true;
        
        //数据赋值
        this.player_num = e.data.player.length;
        for(var i: number = 0;i < this.player_num;i++){
            //定义变量
            var now_head: Head_Add = new Head_Add();

            //显示头像
            now_head.show(e.data.player[i].headImgURL);

            //判断显示状态
            if(e.data.player[i].playerState == 1){
                //显示已准备
                now_head.showHook();

                //判断显示按钮
                if(UserData.User_Id == e.data.player[i].playerId){
                    //隐藏按钮
                    this.btn_ready.enabled = false;
                }
            }

            //显示头像
            this.player_head[i] = now_head;
            this.g_head.addChild(this.player_head[i]);
        }
    }

    //退出按钮
    private onExitBtn(e: egret.TouchEvent): void{
        //播放声音
        basic.SoundManager.instance.playEffect("sound_btn_mp3");

        //退出游戏
        basic.SceneManager.back();
    }

    //准备按钮
    private onReadyBtn(e: egret.TouchEvent): void{
        //播放声音
        basic.SoundManager.instance.playEffect("sound_btn_mp3");

        //发送消息
        Comm.instance.sendSocket({"type":"gameStart"});
    }

    //分享按钮
    private onShareBtn(e: egret.TouchEvent): void{
        //播放声音
        basic.SoundManager.instance.playEffect("sound_btn_mp3");

        //显示分享界面

    }
}