/**
 *
 * @标题
 *
 */
class GameTop extends eui.Component {
	//定义变量
    private g_time: eui.Group;
    private txt_time: eui.Label;
    private txt_name: eui.Label;
    private btn_exit: eui.Button;
    private txt_title: eui.Label;
    private txt_exit_title: eui.Label;
    private countiu_time: number = 30000;
    private start_time: number;
    
    //初始化
    createChildren(): void {
        super.createChildren();

        //注册事件
        basic.Dispatcher.addListener(EventNames.START_TIME,this.onStartTime,this);

        //注册按钮
        this.btn_exit.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onExitBtn,this);
    }

    //显示房间
    showRoom(): void{
        //隐藏界面
        this.g_time.visible = false;
        this.btn_exit.visible = false;
        this.txt_exit_title.visible = false;

        //显示文本
        this.txt_title.text = "你的房间";
        this.txt_name.text = GameData.Room_Id;
    }

    //显示词语
    showWords(): void{
         //隐藏界面
        this.g_time.visible = true;
        this.btn_exit.visible = true;
        this.txt_exit_title.visible = true;

        //显示文本
        this.txt_title.text = "你的词语";
        this.txt_name.text = GameData.Game_Word;
    }

    //开始计时
    private onStartTime(e: egret.Event): void{
        //结束计时
        this.stopTime();

        //定义变量
        var now_date: Date = new Date();

        //数据赋值
        this.start_time = Number(now_date);

        //显示文本
        this.txt_time.text = Math.floor(this.countiu_time/1000).toString();

        //开始计时
        basic.StageProxy.stage.addEventListener(egret.Event.ENTER_FRAME,this.onShowTime,this);
    }

    //显示计时
    private onShowTime(e: egret.Event): void{
        //定义变量
        var now_time: number;
        var now_date: Date = new Date();

        //数据赋值
        now_time = this.countiu_time - (Number(now_date) - this.start_time)

        //判断结束
        if(now_time < 0){
            //停止计时
            this.stopTime();

            //判断发送消息
            if(GameData.Game_State == 0){
                //判断当前状态
                if(GameData.Player_State == 0){
                    Comm.instance.sendSocket({"type":"gameDescribe","describe":" "});
                }
            }
            else if(GameData.Game_State == 1){
                //发送消息
                if(GameData.Player_State == 2){
                    Comm.instance.sendSocket({"type":"gameVote","playerId":0});
                }
            }
        }
        else{
            //显示文本
            this.txt_time.text = Math.floor(now_time/1000).toString();
        }
    }

    //结束计时
    stopTime(): void{
        //停止计时
        basic.StageProxy.stage.removeEventListener(egret.Event.ENTER_FRAME,this.onShowTime,this);

        //显示文本
        this.txt_time.text = "0";
    }
    
    //退出按钮
    private onExitBtn(e: egret.TouchEvent): void{
        //播放声音
        basic.SoundManager.instance.playEffect("sound_btn_mp3");

        //退出游戏
        basic.SceneManager.back();
    }
}