/**
 *
 * @过分游戏
 *
 */
class SceneGuoFen extends basic.SceneBase {
    //定义变量
    private head: Head;
    private txt_name: eui.Label;
    private img_vip: eui.Image;
    private txt_gold: eui.Label;
    private txt_roomid: eui.Label;
    private btn_exit: eui.Button;
    private g_user_choose:eui.Group;
    private com_choose:eui.Component[]=[];
    
    //其他用户
    private head_other: Head;
    private txt_name_other: eui.Label;
    private img_vip_other: eui.Image;
    private txt_gold_other: eui.Label;
    private com_other_choose: eui.Component;
    private _timer_action: egret.Timer = null;
    
    //设置数据
    private g_set: eui.Group;
    private g_over: eui.Group;
    private btn_yes: eui.Button;
    private btn_again: eui.Button;
    private btn_delete: eui.Button;
    private txt_exchangegold: eui.Label;
    private btn_num: eui.Button[] = [];
    private txt_exchangegold_over: eui.Label;
    private now_exchangegold: number = 0;
    private now_choose_user: number;
    private now_choose_other: number;
    private room_homeid: number;
    
    //定义界面
    public constructor() {
        super();
        
        //定义界面
        this.skinName = SceneGuoFenSkin;
        
        //数据赋值
        for(var i: number = 0;i < 10;i++) {
            //定义变量
            var btn: eui.Button = this["btn_num" + i];

            //数据赋值
            this.btn_num[i] = btn;

            //注册按钮
            this.btn_num[i].addEventListener(egret.TouchEvent.TOUCH_TAP,this.onNumBtn,this);
        }
        
        //数据赋值
        for(var j: number = 0;j < 3;j++) {
            //定义变量
            var com: eui.Component = this["com_choose" + j];

            //数据赋值
            this.com_choose[j] = com;
        }
        
        //注册事件
        basic.Dispatcher.addListener(EventNames.GF_GAMEINFO,this.onGameInfo,this);
        basic.Dispatcher.addListener(EventNames.GF_GAMEOVER,this.onGameOver,this);
        basic.Dispatcher.addListener(EventNames.GF_LEAVEROOM,this.onGameleaveroom,this);
        
        //注册按钮
        this.btn_yes.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onYesBtn,this);
        this.btn_exit.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onExitBtn,this);
        this.btn_again.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onAgainBtn,this);
        this.btn_delete.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onDeleteBtn,this);
        this.com_choose[0].addEventListener(egret.TouchEvent.TOUCH_TAP,this.onChooseBtn0,this);
        this.com_choose[1].addEventListener(egret.TouchEvent.TOUCH_TAP,this.onChooseBtn1,this);
        this.com_choose[2].addEventListener(egret.TouchEvent.TOUCH_TAP,this.onChooseBtn2,this);
    }

    //显示前调用
    beforeShow(): void {
        //开始显示界面
        this.txt_exchangegold.text = "0";
        this.head.show(UserData.User_Head);
        this.txt_exchangegold_over.text = "0";
        this.txt_name.text = UserData.User_Name;
        this.txt_roomid.text = GameData.GF_RoomId;
        this.txt_gold.text = UserData.User_Gold.toString();
        this.img_vip.source = "txt_s_vip" + UserData.User_VIP.toString() + "_png";
        
        //发送消息
        Comm.instance.sendSocket({ "type": "infoRoom","roomId": GameData.GF_RoomId });
    }
    
    //开始动画
    private startAction():void{
        //开始动画
        this._timer_action=new egret.Timer(200);
        this._timer_action.addEventListener(egret.TimerEvent.TIMER,this.onAction,this);
        this._timer_action.start();
    }
    
    //动画中
    private onAction(e:egret.TimerEvent):void{
        //定义变量
        var now: number = Number(this.com_other_choose.currentState);
        
        //数据赋值
        now += 1;
        if(now > 2) {
            now = 0;
        }
        
        //显示状态
        this.com_other_choose.currentState = now.toString();
    }
    
    //停止动画
    private stopAction():void{
        if(this._timer_action){
            this._timer_action.stop();
            this._timer_action.removeEventListener(egret.TimerEvent.TIMER,this.onAction,this);
            this._timer_action = null;
        }
    }
    
    //游戏初始化
    private onGameInfo(e: egret.Event): void {
        //定义变量
        var is_showother: Boolean = false;
        this.room_homeid = e.data.dealerUserId;
        
        //停止动画
        this.stopAction();
        
        //显示用户金币
        this.txt_gold.text = UserData.User_Gold.toString();
        
        //判断显示
        if(e.data.exchangegold == 0) {
            this.now_choose_user = -1;
            this.now_choose_other = -1;
            if(e.data.dealerUserId == UserData.User_Id) {
                //显示界面
                this.g_set.visible = true;
                this.g_over.visible = false;
                this.g_user_choose.visible = false;
                this.com_other_choose.visible = false;
            }
            else {
                //显示界面
                this.g_set.visible = false;
                this.g_over.visible = true;
                this.g_user_choose.visible = false;
                this.com_other_choose.visible = false;
            }
            
            //显示文本
            this.txt_exchangegold_over.text = "0";
        }
        else {
            //显示界面
            this.g_set.visible = false;
            this.g_over.visible = true;
            this.g_user_choose.visible = false;
            this.com_other_choose.visible = false;
            
            //数据赋值
            this.now_exchangegold = e.data.exchangegold;

            //显示文本
            this.txt_exchangegold_over.text = Math.floor(this.now_exchangegold / 100000000).toString() + "亿";
            
            //判断开始动画
            if(e.data.player.length == 2) {
                //显示界面
                this.g_user_choose.visible = true;
                this.com_other_choose.visible = true;
                
                //判断显示界面
                for(var j: number = 0;j < 2;j++) {
                    if(UserData.User_Id == e.data.player[j].userId) {
                        this.now_choose_user = e.data.player[j].choose;
                    }
                    else{
                        this.now_choose_other = e.data.player[j].choose;
                    }
                }
                
                //显示界面
                if(this.now_choose_user == -1) {
                    //判断显示
                    if(e.data.dealerUserId == UserData.User_Id) {
                        this.com_choose[0].visible = true;
                        this.com_choose[1].visible = false;
                        this.com_choose[2].visible = true;
                    }
                    else {
                        this.com_choose[0].visible = false;
                        this.com_choose[1].visible = true;
                        this.com_choose[2].visible = false;
                        
                        //发送消息
                        Comm.instance.sendSocket({ "type": "bet","choose": 1 });
                        
                    }
                    this.com_choose[0].currentState = "0";
                    this.com_choose[1].currentState = "1";
                    this.com_choose[2].currentState = "2";
                    
                    //开始动画
                    this.startAction();
                }
                else{
                    this.com_choose[0].visible = false;
                    this.com_choose[1].visible = true;
                    this.com_choose[2].visible = false;
                    this.com_choose[1].currentState = this.now_choose_user.toString();
                    if(this.now_choose_other == -1) {
                        //开始动画
                        this.startAction();
                    }
                    else {
                        this.com_other_choose.currentState = this.now_choose_other.toString();
                    }
                }
            }
        }
        
        //显示其他用户信息
        if(e.data.player.length == 2) {
            //数据赋值
            for(var i: number = 0;i < 2;i++) {
                //判断显示
                if(UserData.User_Id != e.data.player[i].userId) {
                    is_showother = true;
                    this.head_other.show(e.data.player[i].headImgURL);
                    this.txt_name_other.text = e.data.player[i].nickName;
                    this.txt_gold_other.text = e.data.player[i].gold.toString();
                    this.img_vip_other.source = "txt_s_vip" + e.data.player[i].vipLevel.toString() + "_png";
                    break;
                }
            }
        }
        
        //判断清除界面
        if(is_showother == false) {
            this.head_other.show("");
            this.txt_name_other.text = "";
            this.txt_gold_other.text = "";
            this.img_vip_other.source = "";
        }
    }
    
    //判断显示
    private onGameOver(e: egret.Event): void {
        //判断显示
        if(e.data.win==true){
            //发送消息
            basic.Dispatcher.dispatch(EventNames.SHOW_TIPS,{ "tips": "本局胜利，赢得" + Number(e.data.winGold).toString()+"金币"});
        }
        else{
            //发送消息
            basic.Dispatcher.dispatch(EventNames.SHOW_TIPS,{ "tips": "本局失败，输掉" + Number(-e.data.winGold).toString() + "金币" });
        }

        //数据赋值
        UserData.User_Gold = e.data.gold;
        
        //发送消息
        basic.Dispatcher.dispatch(EventNames.GOLD_CHANGE);
        
        //数据清空
        this.now_exchangegold = 0;
        this.txt_exchangegold.text = "0";
        this.txt_exchangegold_over.text = "0";
        
        //判断发送消息
        egret.setTimeout(()=>{
            if(this.room_homeid == UserData.User_Id) {
                //发送消息
                Comm.instance.sendSocket({ "type": "infoRoom","roomId": GameData.GF_RoomId });
            }
        },this,3000);
    }
    
    //确定按钮
    private onYesBtn(e: egret.TouchEvent): void {
        //判断发送消息
        if(this.now_exchangegold > 0) {
            //发送消息
            Comm.instance.sendSocket({ "gold": this.now_exchangegold,"type": "setexchangegold" });
        }
    }
    
    //判断选择按钮
    private onChooseBtn0(e: egret.TouchEvent) {
        //判断显示
        if(this.now_choose_user == -1) {
            //发送消息
            Comm.instance.sendSocket({ "type": "bet","choose": 0 });
        }
    }
    private onChooseBtn1(e: egret.TouchEvent) {
        //判断显示
        if(this.now_choose_user == -1) {
            //发送消息
            Comm.instance.sendSocket({ "type": "bet","choose": 1 });
        }
    }
    private onChooseBtn2(e: egret.TouchEvent) {
        //判断显示
        if(this.now_choose_user == -1) {
            //发送消息
            Comm.instance.sendSocket({ "type": "bet","choose": 2 });
        }
    }
    
    //数字按钮
    private onNumBtn(e: egret.TouchEvent) {
        //定义变量
        var btnnum: number = Number(e.target.name);

        //数据赋值
        this.now_exchangegold = Number(Math.floor(this.now_exchangegold / 100000000).toString() + btnnum.toString()) * 100000000;
        
        //显示文本
        this.txt_exchangegold.text = Math.floor(this.now_exchangegold / 100000000).toString() + "亿";
    }

    //重输按钮
    private onAgainBtn(e: egret.TouchEvent) {
        //清空文本
        this.now_exchangegold = 0;
        this.txt_exchangegold.text = "0";
    }

    //删除按钮
    private onDeleteBtn(e: egret.TouchEvent) {
        //删除文本
        if(this.now_exchangegold.toString().length >= 9) {
            this.now_exchangegold = Number(this.now_exchangegold.toString().substring(0,this.now_exchangegold.toString().length - 9)) * 100000000;
        }
        
        //显示文本
        if(this.now_exchangegold > 0) {
            this.txt_exchangegold.text = Math.floor(this.now_exchangegold / 100000000).toString() + "亿";
        }
        else{
            this.txt_exchangegold.text = "0";
        }
    }
    
    //退出界面
    private onExitBtn(e: egret.TouchEvent): void {
        //退出界面
        basic.SceneManager.removeTopScene(SceneNames.GUOFEN);
        
        //发送消息
        Comm.instance.sendSocket({ "type": "leaveRoom" });
    }
    
    //离开房间
    private onGameleaveroom(e:egret.Event):void{
        //退出界面
        basic.SceneManager.removeTopScene(SceneNames.GUOFEN);
    }
}
