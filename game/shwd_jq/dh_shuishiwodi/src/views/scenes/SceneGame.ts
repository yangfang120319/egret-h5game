/**
 *
 * @游戏界面
 *
 */
class SceneGame extends basic.SceneBase {
    //定义变量
    private lizi: GameLiZi;
    private chat: GameChat;
    private vote: GameVote;
    private gametop: GameTop;
    private ready: GameReady;
    
    //定义界面
    public constructor() {
        super();
        
        //定义界面
        this.skinName = SceneGameSkin;
        
        //定义事件
        basic.Dispatcher.addListener(EventNames.GAME_INFO,this.onGameInfo,this);
        basic.Dispatcher.addListener(EventNames.GAME_OVER,this.onGameOver,this);
        basic.Dispatcher.addListener(EventNames.GAME_STATE,this.onGameState,this);
    }

    //显示前调用
    beforeShow(): void{
        //开始粒子效果
        // this.lizi.start();

        //清除聊天
        this.chat.clean();

        //显示界面
        this.vote.visible = false;
        this.ready.visible = true;

        //显示房间号
        this.gametop.showRoom();

        //初始化游戏
        Comm.instance.sendSocket({"type":"gameInfo"});
    }

    //隐藏前调用
    beforeHide(): void{
        //停止离子效果
        // this.lizi.stop();

        //移除界面
        

        //清除聊天
        this.chat.clean();

        //离开房间
        Comm.instance.sendSocket({"type":"leaveRoom"});
    }

    //定义适配
    onShowPlace(): void{
        //定义变量
        var ratezoom: number;

        //判断显示
        if(basic.StageProxy.height > 960){
            //数据赋值
            ratezoom = (basic.StageProxy.height - 960) / 176;

            //显示高度
            this.vote.height = 550 + 50 * ratezoom;
            this.ready.height = 550 + 50 * ratezoom;
            this.lizi.height = 550 + 86 + 50 * ratezoom;
            this.chat.height = basic.StageProxy.height - this.lizi.height;
        }
        else{
            //数据赋值
            ratezoom = (basic.StageProxy.height - 853)/107;

            //显示高度
            this.vote.height = 480 + 70 * ratezoom;
            this.ready.height = 480 + 70 * ratezoom;
            this.lizi.height = 480 + 86 + 70 * ratezoom;
            this.chat.height = basic.StageProxy.height - this.lizi.height;
        }
    }

    //游戏初始化
    private onGameInfo(e: egret.Event): void{
         //显示界面
        this.vote.visible = false;
        this.ready.visible = true;

        //显示房间号
        this.gametop.showRoom();

        //数据赋值
        GameData.Game_State = -1;
        GameData.Player_List = e.data.player;

        //隐藏界面
        Panel_GameWord.instance.funExit();
        Panel_GameDescription.instance.funExit();
    }

    //游戏状态改变
    private onGameState(e: egret.Event): void{
        //显示界面
        this.vote.visible = true;
        this.ready.visible = false;

        //显示文本
        GameData.Game_Word = e.data.terms;

        //显示词语
        this.gametop.showWords();
    }

    //游戏结束事件
    private onGameOver(e: egret.Event): void{
        //显示结束界面
        Panel_GameOver.instance.show(e.data);
    }
}
