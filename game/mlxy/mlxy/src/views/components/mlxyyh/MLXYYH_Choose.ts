/**
 *
 * @马来西亚银行-选择界面
 *
 */
class MLXYYH_Choose extends eui.Component {
    //定义变量
    private txt_gold: eui.Label;
    private btn_beilv: eui.Button;
    private img_beilvlight: eui.Image;
    private btn_choose: eui.Button[] = [];
    private txt_usergold: eui.BitmapLabel[] = [];
    private txt_totalgold: eui.BitmapLabel[] = [];
    private peilv: number[] = [48,48,24,12,6,4,2];

    //动画
    private now_show: number = 0;
    private waiting_time: number = 150;
    private img_light_left: eui.Image[] = [];
    private img_light_right: eui.Image[] = [];
    private timer_lightwaiting: basic.Timer = null;
    private play_fangxiang: number = 0;

    //数据变量
    private add_gold: number;
    private choose_num: number;
    private timer_waiting: egret.Timer = null;
    private timer_addgold: egret.Timer = null;
    private now_user_gold: number = -1;
    private now_add_gold: number;
    
    //初始化
    createChildren(): void {
        super.createChildren();
        
        //数据赋值
        for(var j: number = 0;j < 14;j++) {
            //定义变量
            var light_left: eui.Image = this["img_light_left" + j];
            var light_right: eui.Image = this["img_light_right" + j];

            //数据赋值
            this.img_light_left[j] = light_left;
            this.img_light_right[j] = light_right;
        }

        //数据赋值
        for(var i: number = 0;i < 7;i++) {
            //定义变量
            var btn: eui.Button = this["btn_choose" + i];
            var txt_user: eui.BitmapLabel = this["txt_usergold" + i];
            var txt_total: eui.BitmapLabel = this["txt_totalgold" + i];

            //数据赋值
            this.btn_choose[i] = btn;
            this.txt_usergold[i] = txt_user;
            this.txt_totalgold[i] = txt_total;

            //注册按钮
            this.btn_choose[i].addEventListener(egret.TouchEvent.TOUCH_BEGIN,this.onChooseBtn,this);
        }

        //开始动画
        this.startPlay();

        //注册按钮
        this.btn_beilv.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onBeiLvBtn,this);

        //定义事件
        basic.Dispatcher.addListener(EventNames.GOLD_CHANGE,this.onGoldChange,this);
        basic.Dispatcher.addListener(EventNames.MLXYYH_REMOVEBTN,this.onRemoveBtn,this);
        basic.Dispatcher.addListener(EventNames.MLXYYH_GAMERESULT,this.onShowResult,this);
        basic.Dispatcher.addListener(EventNames.MLXYYH_USERYAZHU,this.onShowUserYaZhu,this);
        basic.Dispatcher.addListener(EventNames.MLXYYH_CHANGEYAZHU,this.onShowTotalYaZhu,this);
    }
    
    //初始化界面
    info(): void {
        //显示金币
        this.onShowGold();
        
        //显示倍率
        this.btn_beilv.label = GameData.assShowGold(GameData.MLXYYH_BeiLv);

        //发送消息
        basic.Dispatcher.dispatch(EventNames.MLXYYH_SHOW_BOXLIGHT);
    }
    
    //注册按钮事件
    registerBtn(): void {
        for(var i: number = 0;i < 7;i++) {
            this.btn_choose[i].enabled = true;
        }
    }
    
    //清除界面
    clean(): void {
        //数据赋值
        if(this.now_user_gold != -1) {
            UserData.User_Gold = this.now_user_gold;
            this.now_user_gold = -1;
        }
        GameData.MLXYYH_AddGold = 0;
        GameData.MLXYYH_YaZhu_UserTotal = 0;
        
        //显示文本
        for(var i: number = 0;i < 7;i++) {
            //显示文本
            this.txt_usergold[i].text = "0";
            this.txt_totalgold[i].text = "0";
        }

        //显示金币
        this.txt_gold.text = UserData.User_Gold.toString();

        //发送消息
        basic.Dispatcher.dispatch(EventNames.MLXYYH_CHANGE_GOLD);
    }

    //核对压住
    checkYaZhu(_data: any): void {
        //定义变量
        var is_right: Boolean = true;

        //判断赋值
        GameData.MLXYYH_YaZhu_UserTotal = 0;
        for(var i: number = 0;i < 7;i++) {
            if(GameData.MLXYYH_YaZhu_User[i] != _data.betGolds[i]) {
                GameData.MLXYYH_YaZhu_User[i] = _data.betGolds[i];
                is_right = false;
            }
            if(GameData.MLXYYH_YaZhu_Total[i] != _data.totalBetGolds[i]) {
                GameData.MLXYYH_YaZhu_Total[i] = _data.totalBetGolds[i];
                is_right = false;
            }
            GameData.MLXYYH_YaZhu_UserTotal += GameData.MLXYYH_YaZhu_User[i];

            //显示文本
            this.txt_usergold[i].text = GameData.assShowGold(GameData.MLXYYH_YaZhu_User[i])
            this.txt_totalgold[i].text = GameData.assShowGold(GameData.MLXYYH_YaZhu_Total[i] + GameData.MLXYYH_YaZhu_NowUser[i]);
        }

        //显示金币
        this.txt_gold.text = Number(UserData.User_Gold - GameData.MLXYYH_YaZhu_UserTotal).toString();

        //发送消息
        basic.Dispatcher.dispatch(EventNames.MLXYYH_CHANGE_GOLD);

        //判断显示提示
        if(is_right == false) {
            basic.Dispatcher.dispatch(EventNames.SHOW_TIPS,{ "tips": "部分压住失败，以实际显示为准" });
        }
    }
    
    //金币改变
    private onGoldChange(e: egret.Event): void {
        //显示金币
        GameData.MLXYYH_YaZhu_UserTotal = 0;
        for(var i: number = 0;i < 7;i++) {
            //显示文本
            this.txt_usergold[i].text = GameData.assShowGold(GameData.MLXYYH_YaZhu_User[i]);
            if(GameData.MLXYYH_YaZhu_Total[i] + GameData.MLXYYH_YaZhu_NowUser[i] > this.assShowNum(this.txt_totalgold[i].text)) {
                this.txt_totalgold[i].text = GameData.assShowGold(GameData.MLXYYH_YaZhu_Total[i] + GameData.MLXYYH_YaZhu_NowUser[i]);
            }
            GameData.MLXYYH_YaZhu_UserTotal += GameData.MLXYYH_YaZhu_User[i];
        }

        //显示金币
        this.txt_gold.text = Number(UserData.User_Gold - GameData.MLXYYH_YaZhu_UserTotal).toString();

        //发送消息
        basic.Dispatcher.dispatch(EventNames.MLXYYH_CHANGE_GOLD);
    }
    
    //显示金币
    private onShowGold(): void {
        //显示金币
        GameData.MLXYYH_YaZhu_UserTotal = 0;
        for(var i: number = 0;i < 7;i++) {
            //显示文本
            this.txt_usergold[i].text = GameData.assShowGold(GameData.MLXYYH_YaZhu_User[i]);
            if(GameData.MLXYYH_YaZhu_Total[i] + GameData.MLXYYH_YaZhu_NowUser[i] > this.assShowNum(this.txt_totalgold[i].text)) {
                this.txt_totalgold[i].text = GameData.assShowGold(GameData.MLXYYH_YaZhu_Total[i] + GameData.MLXYYH_YaZhu_NowUser[i]);
            }
            GameData.MLXYYH_YaZhu_UserTotal += GameData.MLXYYH_YaZhu_User[i];
        }

        //显示金币
        this.now_user_gold = UserData.User_Gold;
        this.txt_gold.text = Number(UserData.User_Gold - GameData.MLXYYH_YaZhu_UserTotal).toString();
        
        //发送消息
        basic.Dispatcher.dispatch(EventNames.MLXYYH_CHANGE_GOLD);
    }
    
    //数据复制
    private assShowNum(_show: string): number {
        //定义变量
        var show_num: number;

        //数据赋值
        if(_show.charAt(_show.length - 1) == "k") {
            show_num = Number(_show.substring(0,_show.length - 1)) * 1000;
        }
        else {
            show_num = Number(_show)
        }

        return show_num;
    }
    
    //注销按钮事件
    private onRemoveBtn(e: egret.Event): void {
        for(var i: number = 0;i < 7;i++) {
            this.btn_choose[i].enabled = false;
        }
    }

    //显示总压住
    private onShowTotalYaZhu(e: egret.Event): void {
        //数据赋值
        GameData.MLXYYH_YaZhu_NowUser = [0,0,0,0,0,0,0];
        GameData.MLXYYH_YaZhu_User = e.data.betGolds;
        GameData.MLXYYH_YaZhu_Total = e.data.totalBetGolds;

        //显示金币
        this.onShowGold();
    }

    //用户押注
    private onShowUserYaZhu(e: egret.Event): void {
        //数据赋值
        GameData.MLXYYH_YaZhu_User[e.data.pos] = e.data.totalGold;
        
        //显示金币
        this.onShowGold();
    }

    //显示结果
    private onShowResult(e: egret.Event): void {
        //数据赋值
        this.now_user_gold = e.data.gold;
    }

    //选择结束事件
    private chooseOver(): void {
        //判断结束
        if(this.timer_waiting) {
            //注销事件
            basic.StageProxy.stage.removeEventListener(egret.TouchEvent.TOUCH_END,this.onChooseOver,this);

            //停止
            this.timer_waiting.stop();
            this.timer_waiting.removeEventListener(egret.TimerEvent.TIMER,this.onTimer,this);
            this.timer_waiting.removeEventListener(egret.TimerEvent.TIMER_COMPLETE,this.onTimerComplete,this);
            this.timer_waiting = null;
        }
    }

    //计时中
    private onTimer(e: egret.TimerEvent): void {
        //判断显示金币是否足够
        if(GameData.MLXYYH_Game_Status == 1) {
            if(UserData.User_Gold - GameData.MLXYYH_YaZhu_UserTotal - GameData.MLXYYH_BeiLv >= 0) {
                //判断显示
                if(GameData.MLXYYH_YaZhu_User[this.choose_num] + GameData.MLXYYH_BeiLv > UserData.User_MaxYaZhu) {
                    //停止
                    this.chooseOver();

                    //发送消息
                    Comm_mlxyyh.instance.sendSocket({ "type": "bet","pos": this.choose_num,"gold": this.add_gold });

                    //数据赋值
                    this.add_gold = 0;
                    GameData.MLXYYH_YaZhu_IsStart = false;

                    //显示提示金  
                    basic.Dispatcher.dispatch(EventNames.MLXYYH_SHOW_BOXLIGHT);
                    
                    //显示金币不足提示
                    basic.Dispatcher.dispatch(EventNames.SHOW_TIPS,{ "tips": "超过每门可下金币！" });
                }
                else {
                    //数据赋值
                    GameData.MLXYYH_YaZhu_User[this.choose_num] += GameData.MLXYYH_BeiLv;
                    GameData.MLXYYH_YaZhu_NowUser[this.choose_num] += GameData.MLXYYH_BeiLv;
                    GameData.MLXYYH_YaZhu_UserTotal += GameData.MLXYYH_BeiLv;
                    this.add_gold += GameData.MLXYYH_BeiLv;

                    //显示总金币
                    this.onShowGold();

                    //播放声音
                    basic.SoundManager.instance.playEffect("sound_mlxyyh_btn" + this.choose_num + "_mp3");
                }
            }
            else {
                //停止
                this.chooseOver();

                //发送消息
                Comm_mlxyyh.instance.sendSocket({ "type": "bet","pos": this.choose_num,"gold": this.add_gold });

                //数据赋值
                this.add_gold = 0;
                GameData.MLXYYH_YaZhu_IsStart = false;

                //显示提示金  
                basic.Dispatcher.dispatch(EventNames.MLXYYH_SHOW_BOXLIGHT);

                //显示金币不足提示
                basic.Dispatcher.dispatch(EventNames.SHOW_TIPS,{ "tips": "金币不足，请充值" });
            }
        }
        else {
            //停止
            this.chooseOver();

            //发送消息
            Comm_mlxyyh.instance.sendSocket({ "type": "bet","pos": this.choose_num,"gold": this.add_gold });

            //数据赋值
            this.add_gold = 0;
            GameData.MLXYYH_YaZhu_IsStart = false;

            //显示提示金  
            basic.Dispatcher.dispatch(EventNames.MLXYYH_SHOW_BOXLIGHT);
        }
    }

    //计时结束
    private onTimerComplete(e: egret.TimerEvent): void {
        //停止
        if(this.timer_waiting) {
            this.timer_waiting.stop();
            this.timer_waiting.removeEventListener(egret.TimerEvent.TIMER,this.onTimer,this);
            this.timer_waiting.removeEventListener(egret.TimerEvent.TIMER_COMPLETE,this.onTimerComplete,this);
            this.timer_waiting = null;
        }
        
        //判断显示
        if(GameData.MLXYYH_YaZhu_User[this.choose_num] + GameData.MLXYYH_BeiLv > UserData.User_MaxYaZhu) {
            //显示金币不足提示
            basic.Dispatcher.dispatch(EventNames.SHOW_TIPS,{ "tips": "超过每门可下金币！" });
        }
        else {
            //判断显示
            if(GameData.MLXYYH_YaZhu_User[this.choose_num] + GameData.MLXYYH_BeiLv > UserData.User_MaxYaZhu) {
                //显示金币不足提示
                basic.Dispatcher.dispatch(EventNames.SHOW_TIPS,{ "tips": "超过每门可下金币！" });
            }
            else{
                //数据赋值
                GameData.MLXYYH_YaZhu_IsStart = true;
                GameData.MLXYYH_YaZhu_User[this.choose_num] += GameData.MLXYYH_BeiLv;
                GameData.MLXYYH_YaZhu_NowUser[this.choose_num] += GameData.MLXYYH_BeiLv;
                GameData.MLXYYH_YaZhu_UserTotal += GameData.MLXYYH_BeiLv;
                this.add_gold += GameData.MLXYYH_BeiLv;

                //显示总金币
                this.onShowGold();

                //开始计时
                this.timer_waiting = new egret.Timer(70);
                this.timer_waiting.addEventListener(egret.TimerEvent.TIMER,this.onTimer,this);
                this.timer_waiting.addEventListener(egret.TimerEvent.TIMER_COMPLETE,this.onTimerComplete,this);
                this.timer_waiting.start();
            }
        }
    }

    //---------------------------定义按钮-------------------------
    //倍率按钮
    private onBeiLvBtn(e: egret.TouchEvent): void {
        //播放声音
        basic.SoundManager.instance.playEffect("sound_btn_mp3");
        
        //显示提示界面
        Panel_MLXYYH_ChooseChip.instance.show(()=>{
            //显示倍率
            this.btn_beilv.label = GameData.assShowGold(GameData.MLXYYH_BeiLv);
        });
    }

    //选择按钮
    private onChooseBtn(e: egret.TouchEvent): void {
        //数据赋值
        var btnnum: number = Number(e.target.name);

        //判断显示金币是否足够
        if(GameData.MLXYYH_Game_Status == 1) {
            if(UserData.User_Gold - GameData.MLXYYH_YaZhu_UserTotal - GameData.MLXYYH_BeiLv >= 0) {
                //选择结束事件
                this.chooseOver();
                
                //判断显示
                if(GameData.MLXYYH_YaZhu_User[btnnum] + GameData.MLXYYH_BeiLv > UserData.User_MaxYaZhu) {
                    //显示金币不足提示
                    basic.Dispatcher.dispatch(EventNames.SHOW_TIPS,{ "tips": "超过每门可下金币！" });
                }
                else {
                    //数据赋值
                    this.add_gold = 0;
                    this.choose_num = btnnum;
                    GameData.MLXYYH_YaZhu_User[this.choose_num] += GameData.MLXYYH_BeiLv;
                    GameData.MLXYYH_YaZhu_NowUser[this.choose_num] += GameData.MLXYYH_BeiLv;
                    GameData.MLXYYH_YaZhu_UserTotal += GameData.MLXYYH_BeiLv;
                    this.add_gold += GameData.MLXYYH_BeiLv;

                    //显示总金币
                    this.onShowGold();

                    //播放声音
                    basic.SoundManager.instance.playEffect("sound_mlxyyh_btn" + this.choose_num + "_mp3");

                    //开始计时
                    this.timer_waiting = new egret.Timer(500,1);
                    this.timer_waiting.addEventListener(egret.TimerEvent.TIMER,this.onTimer,this);
                    this.timer_waiting.addEventListener(egret.TimerEvent.TIMER_COMPLETE,this.onTimerComplete,this);
                    this.timer_waiting.start();

                    //注册按钮
                    basic.StageProxy.stage.addEventListener(egret.TouchEvent.TOUCH_END,this.onChooseOver,this);
                }
            }
            else {
                //显示金币不足提示
                basic.Dispatcher.dispatch(EventNames.SHOW_TIPS,{ "tips": "金币不足，请充值" });
            }
        }
    }

    //按钮结束事件
    private onChooseOver(e: egret.TouchEvent): void {
        //停止
        this.chooseOver();

        //发送消息
        Comm_mlxyyh.instance.sendSocket({ "type": "bet","pos": this.choose_num,"gold": this.add_gold });

        //数据赋值
        this.add_gold = 0;
        GameData.MLXYYH_YaZhu_IsStart = false;

        //显示提示金  
        basic.Dispatcher.dispatch(EventNames.MLXYYH_SHOW_BOXLIGHT);
    }
    
    //-------------------------灯动画----------------------
    //开始动画
    private startPlay(): void {
        //判断停止
        if(this.timer_lightwaiting) {
            this.timer_lightwaiting.stop();
            this.timer_lightwaiting.removeEventListener(basic.TimerEvent.TIMER_COMPLETE,this.onWaitingComplete,this);
            this.timer_lightwaiting = null;
        }

        //开始等待
        this.timer_lightwaiting = new basic.Timer(this.waiting_time,1);
        this.timer_lightwaiting.addEventListener(basic.TimerEvent.TIMER_COMPLETE,this.onWaitingComplete,this);
        this.timer_lightwaiting.start();
    }

    //等待结束
    private onWaitingComplete(e: basic.TimerEvent): void {
        //判断停止
        if(this.timer_lightwaiting) {
            this.timer_lightwaiting.stop();
            this.timer_lightwaiting.removeEventListener(basic.TimerEvent.TIMER_COMPLETE,this.onWaitingComplete,this);
            this.timer_lightwaiting = null;
        }

        //数据赋值
        if(this.play_fangxiang == 0) {
            this.now_show += 1;
            if(this.now_show >= 14) {
                this.now_show = 13;
                this.play_fangxiang = 1;
            }
        }
        else {
            this.now_show -= 1;
            if(this.now_show < 0) {
                this.now_show = 0;
                this.play_fangxiang = 0;
            }
        }

        //当前显示
        this.nowShowFace();

        //开始动画
        this.startPlay();
    }

    //当前显示
    private nowShowFace(): void {
        //判断显示
        for(var i: number = 0;i < 14;i++) {
            //判断显示
            if(i == this.now_show) {
                this.img_light_left[i].alpha = 1;
                this.img_light_right[i].alpha = 1;
            }
            else {
                //判断显示
                if(this.play_fangxiang == 0) {
                    if(i < this.now_show) {
                        this.img_light_left[i].alpha = Math.max(0.3,1 - (this.now_show - i) * 0.25);
                        this.img_light_right[i].alpha = Math.max(0.3,1 - (this.now_show - i) * 0.25);
                    }
                    else {
                        this.img_light_left[i].alpha = 0.3;
                        this.img_light_right[i].alpha = 0.3;
                    }
                }
                else {
                    if(i > this.now_show) {
                        this.img_light_left[i].alpha = Math.max(0.3,1 - (i - this.now_show) * 0.25);
                        this.img_light_right[i].alpha = Math.max(0.3,1 - (i - this.now_show) * 0.25);
                    }
                    else {
                        this.img_light_left[i].alpha = 0.3;
                        this.img_light_right[i].alpha = 0.3;
                    }
                }
            }
        }
    }
}
