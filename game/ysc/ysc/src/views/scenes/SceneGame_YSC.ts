/**
 *
 * @夜市场
 *
 */
class SceneGame_YSC extends basic.SceneBase {
    //定义变量
    private over: YSC_Over;
    private time: YSC_Time;
    private play: YSC_Play;
    private luzi: YSC_LuZi;
    private yazhu: YSC_YaZhu;
    private choose: YSC_Choose;
    private history1: YSC_History;
    private history2: YSC_History;
    private usergold: YSC_UserGold;
    private overshow: YSC_OverShow;
    private chipfly: YSC_ChipFly;
    private img_title: eui.Image;
    private btn_exit: eui.Button;
    private countdown: Game_CountDown;
    
    //定义界面
    public constructor() {
        super();

       
        //定义界面 
        this.skinName = SceneGame_YSCSkin;
        
        //显示界面
        this.countdown.touchEnabled = false;
        this.countdown.touchChildren = false;
        
        //注册按钮
        this.btn_exit.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onExitBtn,this);
        //this.onGameOpen(this);
        
        //注册事件
        basic.Dispatcher.addListener(EventNames.GOLD_CHANGE,this.onGoldChange,this);
        basic.Dispatcher.addListener(EventNames.YSC_GAMEOPEN,this.onGameOpen,this);
        basic.Dispatcher.addListener(EventNames.YSC_GAMEINFO,this.onGameInfo,this);
        basic.Dispatcher.addListener(EventNames.YSC_GAMERESULT,this.onShowGameResult,this);
        basic.Dispatcher.addListener(EventNames.YSC_CHANGESTATUS,this.onChangeStatus,this);
    }

    //显示前调用
    beforeShow(): void {

       
        //初始化界面
        this.play.playLight();
        this.play.startPlay(1,10);
        
        //判断显示位置
        this.onShowPlace();
        
        //数据赋值
        GameData.Game_Id = 2;
        GameData.Game_Type = 2;
        
        //this.time.info(2,20);
        //初始化游戏
        //Comm_ysc.instance.sendSocket({ "type": "gameInfo" });
        
        //开始声音
        //basic.SoundManager.instance.playMusic("sound_ysc_back_mp3",0,0.2);
    }
    
    //隐藏时调用
    onHide(): void {
        //清除界面
        this.chipfly.clean();
        this.play.stopLight();
        
        //数据赋值
        GameData.Game_Id = 1;
        GameData.Game_Type = 1;
        
        //停止声音
        basic.SoundManager.instance.stopMusic();

        //发送消息
        Comm_ysc.instance.sendSocket({ "type": "exitGame" });
    }
    
    //退出按钮
    private onExitBtn(e: egret.TouchEvent): void {
        //播放声音
        basic.SoundManager.instance.playEffect("sound_btn_mp3");

        //退出到主界面
        basic.SceneManager.back();
    }
    
    //-------------------------定义事件-------------------------
    //游戏初始化
    private onGameInfo(e: egret.Event): void {
        //判断显示界面显示
        if(e.data.status >= 2) {
            this.yazhu.alpha = 0;
            this.chipfly.alpha = 0;
        }
        else {
            this.yazhu.alpha = 1;
            this.chipfly.alpha = 1;
        }
        
        //时间初始化
        if(e.data.status == 1) {
            this.time.info(e.data.status,e.data.leftTime);
        }
        else {
            this.time.info(e.data.status);
        }

        //判断显示界面
        if(e.data.status == 2) {
            //显示提示
            this.countdown.showWaiting("本局开奖中，等待下一局开始！");
        }
        else if(e.data.status == 3) {
            //显示提示
            this.countdown.showWaiting("本局结算中，等待下一局开始！");
        }
        
        //初始化界面
        if(e.data.status > 1) {
            //初始化
            this.play.info(e.data.pos);
            GameData.YSC_RUN_OVER = e.data.pos;
        }
        
        //初始化
        this.choose.info();
        this.yazhu.info(e.data);
        
        //显示结算界面
        if(e.data.status == 3) {
            this.over.info();
            this.over.visible = true;
        }
        else {
            this.over.visible = false;
        }
        
        //显示压住筹码
        for(var i1:number=0;i1<4;i1++){
            for(var j1: number = 0;j1 < e.data.totalBetGoldDetails[i1].length;j1++){
                basic.Dispatcher.dispatch(EventNames.YSC_YAZHU_OTHER,{
                    "pos":i1,
                    "gold": e.data.totalBetGoldDetails[i1][j1]
                });
            }
        }
        
        //显示抢注筹码
        for(var i2: number = 0;i2 < 4;i2++) {
            for(var j2: number = 0;j2 < e.data.totalGrabGoldDetails[i2].length;j2++) {
                basic.Dispatcher.dispatch(EventNames.YSC_QIANGZHU_OTHER,{
                    "pos": i2,
                    "gold": e.data.totalGrabGoldDetails[i2][j2]
                });
            }
        }
    }

    //改变状态事件
    private onChangeStatus(e: egret.Event): void {
        //判断显示
        if(e.data.status == 0) {
            //清除界面
            this.play.clean();
            this.yazhu.clean();
            this.chipfly.clean();
            
            //显示界面
            this.yazhu.alpha = 1;
            this.chipfly.alpha = 1;
            
            //隐藏结算界面
            this.over.visible = false;
            
            //打开声音
           // basic.SoundManager.instance.openVolume();
            
            //移除结束
            basic.Dispatcher.dispatch(EventNames.YSC_HIDEOVERFACE);
        }
        else if(e.data.status == 1){
            //显示界面
            this.yazhu.alpha = 1;
            this.chipfly.alpha = 1;
            
            //隐藏结算界面
            this.over.visible = false;
            
            //移除结束
            basic.Dispatcher.dispatch(EventNames.YSC_HIDEOVERFACE);
        }
        else if(e.data.status == 2){
            //隐藏结算界面
            this.over.visible = false;
            
            //关闭声音
            //basic.SoundManager.instance.closeVolume();
            
            //移除结束
            basic.Dispatcher.dispatch(EventNames.YSC_HIDEOVERFACE);
        }
        else if(e.data.status == 3) {
            //显示结算界面
            this.over.info();
            this.over.visible = true;

            //显示界面
            this.yazhu.alpha = 0;
            this.chipfly.alpha = 0;

            //移除结束
            basic.Dispatcher.dispatch(EventNames.YSC_HIDEOVERFACE);
        }
    }
    
    //用户结果
    private onShowGameResult(e: egret.Event): void {
        //数据赋值
        UserData.User_Gold = e.data.gold;
    }

    //游戏开始
    private onGameOpen(e: egret.Event): void {
        //最后核对数据
        this.yazhu.checkData(e.data);

        //显示界面
        var _tween_alpha1: egret.Tween = egret.Tween.get(this.yazhu).to({ alpha: 0 },600);
        var _tween_alpha2: egret.Tween = egret.Tween.get(this.chipfly).to({ alpha: 0 },600);

        //开始游戏
        GameData.YSC_RUN_OVER = e.data.pos;
        this.play.startPlay(e.data.pos,600);
    }
    
    //金币改变
    private onGoldChange(e: egret.Event): void {
        //显示总金币
        basic.Dispatcher.dispatch(EventNames.YSC_SHOWGOLD,{ "gold": UserData.User_Gold - GameData.YSC_YaZhu_UserTotal + GameData.YSC_QiangZhu_UserTotal });
    }
    
    //---------------------------显示位置------------------------
    onShowPlace(): void {
        //定义变量
        var rate: number;
        var zoom: number;

        //判断显示
        if(basic.StageProxy.width >= 1136) {
            //判断显示历史记录
            this.history1.visible = true;
            this.history2.visible = false;

            //显示大小
            this.time.scaleX = 1;
            this.time.scaleY = 1;
            this.play.scaleX = 1;
            this.play.scaleY = 1;
            this.luzi.scaleX = 1;
            this.luzi.scaleY = 1;
            this.choose.scaleX = 1;
            this.choose.scaleY = 1;
            this.history1.scaleX = 1;
            this.history1.scaleY = 1;
            this.history2.scaleX = 1;
            this.history2.scaleY = 1;
            this.usergold.scaleX = 1;
            this.usergold.scaleY = 1;
            this.img_title.scaleX = 1;
            this.img_title.scaleY = 1;
            this.btn_exit.scaleX = 1;
            this.btn_exit.scaleY = 1;
            this.yazhu.scaleX = 1;
            this.yazhu.scaleY = 1;

            //判断定义位置
            this.time.y = 11;
            this.play.y = 74;
            this.luzi.y = 432 + 5 * this.luzi.scaleY;
            this.choose.y = 74 - + 5 * this.choose.scaleY;
            this.usergold.y = 0;
            this.img_title.y = 0;
            this.btn_exit.y = 9;
            this.history1.y = 74;
            this.play.x = 2 * (basic.StageProxy.width - 1136) / 7 + 6;
            this.choose.x = this.play.x + this.play.width + 1 + (basic.StageProxy.width - 1136) / 7;
            this.history1.x = this.choose.x + this.choose.width - 5 + 2 * (basic.StageProxy.width - 1136) / 7;
            this.img_title.x = this.play.x + (this.play.width - this.img_title.width) / 2;
            this.usergold.x = basic.StageProxy.width - this.usergold.width;
            this.time.x = this.img_title.x + this.img_title.width + 20;
            this.time.x = this.time.x + (this.usergold.x - this.time.x - this.time.width) / 2;
            this.luzi.x = this.choose.x;
            this.yazhu.x = this.play.x;
            this.yazhu.y = this.play.y;
        }
        else if(basic.StageProxy.width >= 1000) {
            //数据变量
            rate = (1136 - basic.StageProxy.width) / 136;
            zoom = 1 - 0.13 * rate;

            //判断显示历史记录
            this.history1.visible = true;
            this.history2.visible = false;

            //显示大小
            this.time.scaleX = zoom;
            this.time.scaleY = zoom;
            this.play.scaleX = zoom;
            this.play.scaleY = zoom;
            this.luzi.scaleX = zoom;
            this.luzi.scaleY = zoom;
            this.choose.scaleX = zoom;
            this.choose.scaleY = zoom;
            this.history1.scaleX = zoom;
            this.history1.scaleY = zoom;
            this.history2.scaleX = zoom;
            this.history2.scaleY = zoom;
            this.usergold.scaleX = zoom;
            this.usergold.scaleY = zoom;
            this.img_title.scaleX = zoom;
            this.img_title.scaleY = zoom;
            this.btn_exit.scaleX = zoom;
            this.btn_exit.scaleY = zoom;
            this.yazhu.scaleX = zoom;
            this.yazhu.scaleY = zoom;

            //判断定义位置
            this.time.y = 11 + 24 * rate;
            this.play.y = 74 + 36 * rate;
            this.luzi.y = 432 - 11 * rate + 5 * this.luzi.scaleY;
            this.choose.y = 74 + 36 * rate - 5 * this.choose.scaleY;
            this.usergold.y = 23 * rate;
            this.img_title.y = 25 * rate;
            this.btn_exit.y = 9 + 18 * rate;
            this.history1.y = 74 + 36 * rate;
            this.play.x = 6 + 2 * rate;
            this.choose.x = 616 - 76 * rate;
            this.history1.x = 990 - 120 * rate;
            this.img_title.x = this.play.x + (this.play.width * zoom - this.img_title.width * zoom) / 2;
            this.usergold.x = basic.StageProxy.width - this.usergold.width * zoom;
            this.time.x = this.img_title.x + this.img_title.width * zoom + 20 * zoom;
            this.time.x = this.time.x + (this.usergold.x - this.time.x - this.time.width * zoom) / 2;
            this.luzi.x = this.choose.x;
            this.yazhu.x = this.play.x;
            this.yazhu.y = this.play.y;
        }
        else if(basic.StageProxy.width >= 870) {
            //判断显示历史记录
            this.history2.visible = true;
            this.history1.visible = false;

            //显示大小
            this.time.scaleX = 0.8;
            this.time.scaleY = 0.8;
            this.play.scaleX = 0.85;
            this.play.scaleY = 0.85;
            this.luzi.scaleX = 0.85;
            this.luzi.scaleY = 0.85;
            this.choose.scaleX = 0.85;
            this.choose.scaleY = 0.85;
            this.history1.scaleX = 0.85;
            this.history1.scaleY = 0.85;
            this.history2.scaleX = 0.85;
            this.history2.scaleY = 0.85;
            this.usergold.scaleX = 0.8;
            this.usergold.scaleY = 0.8;
            this.img_title.scaleX = 0.8;
            this.img_title.scaleY = 0.8;
            this.btn_exit.scaleX = 0.85;
            this.btn_exit.scaleY = 0.85;
            this.yazhu.scaleX = 0.85;
            this.yazhu.scaleY = 0.85;

            //判断定义位置
            this.time.y = 9;
            this.play.y = 65;
            this.luzi.y = 370 + 5 * this.luzi.scaleY;
            this.choose.y = 65 - 5 * this.choose.scaleY;
            this.usergold.y = 0;
            this.img_title.y = 1;
            this.btn_exit.y = 5;
            this.history2.y = 556;
            this.play.x = 10 + (basic.StageProxy.width - 870) / 2;
            this.choose.x = 530 + (basic.StageProxy.width - 870) / 2;
            this.img_title.x = 97 + (basic.StageProxy.width - 870) / 2;
            this.usergold.x = 580 + (basic.StageProxy.width - 870) / 2;
            this.time.x = 420 + (basic.StageProxy.width - 870) / 2;
            this.history2.x = this.play.x;
            this.luzi.x = this.choose.x;
            this.yazhu.x = this.play.x;
            this.yazhu.y = this.play.y;
        }
        else {
            //数据变量
            rate = (basic.StageProxy.width - 830) / 40;
            zoom = 0.82 + 0.03 * rate;
            console.log(zoom);
            //判断显示历史记录
            this.history2.visible = true;
            this.history1.visible = false;

            //显示大小
            this.play.scaleX = zoom;
            this.play.scaleY = zoom;
            this.luzi.scaleX = zoom;
            this.luzi.scaleY = zoom;
            this.choose.scaleX = zoom;
            this.choose.scaleY = zoom;
            this.history1.scaleX = zoom;
            this.history1.scaleY = zoom;
            this.history2.scaleX = zoom;
            this.history2.scaleY = zoom;
            this.btn_exit.scaleX = zoom;
            this.btn_exit.scaleY = zoom;
            this.time.scaleX = 0.7 + 0.1 * rate;
            this.time.scaleY = 0.7 + 0.1 * rate;
            this.usergold.scaleX = 0.7 + 0.1 * rate;
            this.usergold.scaleY = 0.7 + 0.1 * rate;
            this.img_title.scaleX = 0.7 + 0.1 * rate;
            this.img_title.scaleY = 0.7 + 0.1 * rate;
            this.yazhu.scaleX = zoom;
            this.yazhu.scaleY = zoom;

            //判断定义位置
            this.luzi.y = 370 + 5 * this.luzi.scaleY;
            this.time.x = 420;
            this.time.y = 20 - 11 * rate;
            this.play.y = 76 - 11 * rate;
            this.choose.y = 76 - 11 * rate - 5 * this.choose.scaleY;
            this.usergold.y = 13 - 13 * rate;
            this.img_title.y = 12 - 11 * rate;
            this.btn_exit.y = 9 - 8 * rate;
            this.history2.y = 556;
            this.play.x = 10 - 1 * rate;
            this.choose.x = 510 + 20 * rate;
            this.img_title.x = 97 + 10 * rate;
            this.usergold.x = 580 - 3 * rate;
            this.history2.x = this.play.x;
            this.luzi.x = this.choose.x;
            this.yazhu.x = this.play.x;
            this.yazhu.y = this.play.y;
        }
        
        //初始化界面
        this.overshow.info(this.play.x,this.play.y,this.play.scaleX);
        this.chipfly.info(
            this.play.scaleX,
            this.play.x,this.play.y,
            this.choose.x,this.choose.y,
            this.usergold.x,this.usergold.y
        );
    }
}
