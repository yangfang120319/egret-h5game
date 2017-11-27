/**
 *
 * @桌子界面
 *
 */
class EBG_Table extends eui.Component {
    //定义变量
    private g_zhuang: eui.Group;
    private chipfly: EBG_ChipFly;
    private user_mahjong: any[] = [];
    private g_table: eui.Group[] = [];
    private btn_choose:eui.Button[]=[];
    private zhuang_mahjong: EBG_Mahjong[] = [];
    private result_zhuang: EBG_Result;
    private result_table: EBG_Result[] = [];
    private user_gold: eui.Label[] = [];
    private user_totalgold: eui.BitmapLabel[] = [];
    private user_result: eui.Component[] = [];
    private timer_openmahjong: basic.Timer = null;
    private open_mahjong_num: number;
    
    //发麻将动画
    private g_mahjong: eui.Group[] = [];
    private img_mahjong: eui.Image[] = [];

    //初始化
    createChildren(): void {
        super.createChildren();
        
        //用户麻将
        for(var i: number = 0;i < 3;i++) {
            //定义变量
            var mahjong: EBG_Mahjong[] = [];
            var group_t: eui.Group = this["g_table"+i];
            var btn: eui.Button = this["btn_choose" + i];
            var txt_gold: eui.Label = this["txt_user" + i];
            var result: EBG_Result = this["result_table" + i];
            var com_result: eui.Component = this["com_result" + i];
            var txt_totalgold: eui.BitmapLabel = this["txt_total" + i];

            //数据赋值
            for(var j: number = 0;j < 2;j++) {
                //定义变量
                var mahjong_user: EBG_Mahjong = this["user_mahjong" + i + "_" + j];

                //数据赋值
                mahjong[j] = mahjong_user;
            }

            //数据赋值
            result.info(i);
            this.btn_choose[i] = btn;
            this.g_table[i] = group_t;
            this.user_gold[i] = txt_gold;
            this.user_mahjong[i] = mahjong;
            this.result_table[i] = result;
            this.user_result[i] = com_result;
            this.user_totalgold[i] = txt_totalgold;
            
            //注册按钮
            this.btn_choose[i].addEventListener(egret.TouchEvent.TOUCH_TAP,this.onChooseBtn,this);
        }
        
        //庄麻将
        for(var k: number = 0;k < 2;k++) {
            //定义变量
            var mahjong_zhuang: EBG_Mahjong = this["zhuang_mahjong" + k];

            //数据赋值
            this.zhuang_mahjong[k] = mahjong_zhuang;
        }
        this.result_zhuang.info(3);
        
        //数据赋值
        for(var p: number = 0;p < 4;p++) {
            //定义变量
            var g_mah: eui.Group = this["g_mahjong" + p];
            var img_mah: eui.Image = this["img_mahjong" + p];

            //数据赋值
            this.g_mahjong[p] = g_mah;
            this.img_mahjong[p] = img_mah;
        }
        
        //注册事件
        basic.Dispatcher.addListener(EventNames.EBG_CHANGEYAZHU,this.onChangeYaZhu,this);
    }
    
    //桌子初始化
    info(): void {
        //清空桌子
        this.clean();

        //判断显示牌
        if(GameData.EBG_State > 0) {
            //初始化筹码
            this.infoChip();

            //显示金币
            for(var i: number = 0;i < 3;i++) {
                //数据赋值
                this.user_gold[i].text = GameData.assGold1(2,GameData.EBG_YaZhu_User[i]);
                this.user_totalgold[i].text = GameData.assGold(2,GameData.EBG_YaZhu_Total[i]);
            }
            
            //判断显示麻将
            if(GameData.EBG_State > 1) {
                //显示麻将
                this.showMahjong();

                //显示麻将内容
                this.showMahjongDetail();

                //开牌
                this.openMahjong(0,0);
                this.openMahjong(0,1);
                this.openMahjong(0,2);
                this.openMahjong(0,3);

                //显示庄结果
                this.result_zhuang.visible = true;
                this.result_zhuang.showResult();

                //显示桌子结果
                for(var k: number = 0;k < 3;k++) {
                    //显示桌子结果
                    this.result_table[k].visible = true;
                    this.result_table[k].showResult();
                }

                //判断开牌
                if(GameData.EBG_State > 2) {
                    //显示结果
                    this.showResult();
                }
            }
        }
    }
    
    //开始发牌
    startSendMahjong(): void {
        //播放声音
        basic.SoundManager.instance.playEffect("sound_ebg_sendmahjong1_mp3");

        //开始动画
        var _tween_x0: egret.Tween = egret.Tween.get(this.g_mahjong[0]).to({ x: 20 + 33 * 0 },300);
        var _tween_x1: egret.Tween = egret.Tween.get(this.g_mahjong[1]).to({ x: 20 + 33 * 1 },300);
        var _tween_x2: egret.Tween = egret.Tween.get(this.g_mahjong[2]).to({ x: 20 + 33 * 2 },300);
        var _tween_x3: egret.Tween = egret.Tween.get(this.g_mahjong[3]).to({ x: 20 + 33 * 3 },300).wait(300).call(() => {
            if(GameData.EBG_State != 2) {
                //清除发送麻将
                this.cleanSendMahjong();
            }
            else {
                //发送第一张
                this.sendMahjong(0);
            }
        });
    }
    
    //显示麻将内容
    showMahjongDetail(): void {
        //显示用户麻将内容
        for(var i1: number = 0;i1 < 3;i1++) {
            for(var j1: number = 0;j1 < 2;j1++) {
                this.user_mahjong[i1][j1].showMahjong(GameData.EBG_Poker_Table_Card[i1][j1]);
            }
        }

        //显示庄麻将内容
        for(var i2: number = 0;i2 < 2;i2++) {
            this.zhuang_mahjong[i2].showMahjong(GameData.EBG_Poker_Table_Card[3][i2]);
        }
    }
    
    //按顺序打开麻将
    startOpenMahjong(): void {
        //数据赋值
        this.open_mahjong_num = 0;

        //显示牌
        this.showMahjong();
        
        //显示麻将内容
        this.showMahjongDetail();

        //判断显示
        this.openMahjong(1,this.open_mahjong_num,() => {
            //显示桌子结果
            this.result_table[this.open_mahjong_num].show();
            this.result_table[this.open_mahjong_num].visible = true;
        });

        //注册事件
        this.timer_openmahjong = new basic.Timer(2500,4);
        this.timer_openmahjong.addEventListener(basic.TimerEvent.TIMER,this.onOpenMahjong,this);
        this.timer_openmahjong.addEventListener(basic.TimerEvent.TIMER_COMPLETE,this.onOpenMahjongComplete,this);
        this.timer_openmahjong.start();
    }
    
    //显示结果
    showResult(): void {
        //显示结果
        for(var i: number = 0;i < 3;i++) {
            this.user_result[i].visible = true;
            if(GameData.EBG_Poker_Table_IsWin[i] == true) {
                this.user_result[i].currentState = "1";
            }
            else {
                this.user_result[i].currentState = "0";
            }
        }
    }
    
    //改变压住状态
    private onChangeYaZhu(e: egret.Event): void {
        //定义变量
        var is_other: Boolean = false;
        
        //数据赋值
        GameData.EBG_YaZhu_UserTotal = 0;
        GameData.EBG_YaZhu_OtherTotal = 0;
        GameData.EBG_YaZhu_User = e.data.betGolds;
        GameData.EBG_YaZhu_Total = e.data.totalBetGolds;
        for(var i: number = 0;i < GameData.EBG_YaZhu_User.length;i++) {
            GameData.EBG_YaZhu_UserTotal += GameData.EBG_YaZhu_User[i];
            GameData.EBG_YaZhu_OtherTotal += GameData.EBG_YaZhu_Total[i];
        }

        //显示其他压住动画
        for(var j: number = 0;j < 3;j++) {
            //定义变量
            var other_yazhu: number[] = [];
            var user_yazhu: number[] = GameData.EBG_YaZhu_User_NowDetail[j];
            
            //数据赋值
            for(var k1: number = 0;k1 < e.data.newBetGoldDetails[j].length;k1++) {
                //定义变量
                var juge_yazhu: Boolean = true;

                //数据赋值
                for(var p1: number = 0;p1 < user_yazhu.length;p1++) {
                    if(e.data.newBetGoldDetails[j][k1] == user_yazhu[p1]) {
                        //数据赋值
                        juge_yazhu = false;
                        user_yazhu[p1] = -1;
                        break;
                    }
                }

                //判断赋值
                if(juge_yazhu == true) {
                    other_yazhu[other_yazhu.length] = e.data.newBetGoldDetails[j][k1];
                }
            }

            //显示其他压注动画
            for(var j1: number = 0;j1 < other_yazhu.length;j1++) {
                is_other = true;
                this.chipfly.sendChip(1,String(Math.floor(other_yazhu[j1] / 10000)).length - 1,j);
            }
        } 
        
        //播放声音
        if(is_other) {
            basic.SoundManager.instance.playEffect("sound_ebg_yazhu_mp3");
        }
        
        //数据赋值
        GameData.EBG_YaZhu_User_NowDetail = [[],[],[]];

        //显示金币
        this.showGold();

        //发送消息
        basic.Dispatcher.dispatch(EventNames.EBG_SHOWGOLD);
    }
    
    //显示金币
    private showGold():void{
        //显示金币
        for(var i: number = 0;i < 3;i++) {
            //数据赋值
            this.user_gold[i].text = GameData.assGold1(2,GameData.EBG_YaZhu_User[i]);
            this.user_totalgold[i].text = GameData.assGold(2,GameData.EBG_YaZhu_Total[i]);
        }
    }
    
    //显示麻将
    private showMahjong():void{
        //显示庄麻将
        for(var i1: number = 0;i1 < 2;i1++) {
            this.zhuang_mahjong[i1].visible = true;
        }

        //显示用户麻将
        for(var i2: number = 0;i2 < 3;i2++) {
            for(var j2: number = 0;j2 < 2;j2++) {
                this.user_mahjong[i2][j2].visible = true;
            }
        }
    }
    
    //开麻将
    private openMahjong(_type: number,_table_num: number,_callback: Function = null) {
        //显示牌
        if(_table_num == 3) {
            if(_type == 0) {
                this.zhuang_mahjong[0].openMahjong();
                this.zhuang_mahjong[1].openMahjong();
            }
            else {
                this.zhuang_mahjong[0].openMahjongAction(() => {
                    this.zhuang_mahjong[1].openMahjongAction(() => {
                        //判断结束
                        if(_callback) {
                            _callback();
                        }
                    });
                });
            }
        }
        else {
            for(var i2: number = 0;i2 < 2;i2++) {
                if(_type == 0) {
                    this.user_mahjong[_table_num][0].openMahjong();
                    this.user_mahjong[_table_num][1].openMahjong();
                }
                else {
                    this.user_mahjong[_table_num][0].openMahjongAction(() => {
                        this.user_mahjong[_table_num][1].openMahjongAction(() => {
                            //判断结束
                            if(_callback) {
                                _callback();
                            }
                        });
                    });
                }
            }
        }
    }
    
    //停止打开麻将
    private stopOpenMahjong(): void {
        //判断停止麻将
        if(this.timer_openmahjong) {
            this.timer_openmahjong.stop()
            this.timer_openmahjong.removeEventListener(basic.TimerEvent.TIMER,this.onOpenMahjong,this);
            this.timer_openmahjong.removeEventListener(basic.TimerEvent.TIMER_COMPLETE,this.onOpenMahjongComplete,this);
            this.timer_openmahjong = null;
        }
    }

    //打开麻将
    private onOpenMahjong(e: basic.TimerEvent): void {
        //数据赋值
        this.open_mahjong_num += 1;

        //显示牌
        this.showMahjong();

        //判断显示
        if(this.open_mahjong_num < 4) {
            this.openMahjong(1,this.open_mahjong_num,() => {
                //显示结束事件
                if(this.open_mahjong_num < 3) {
                    //显示桌子结果
                    this.result_table[this.open_mahjong_num].show();
                    this.result_table[this.open_mahjong_num].visible = true;
                }
                else {
                    //显示庄结果
                    this.result_zhuang.show();
                    this.result_zhuang.visible = true;
                }
            });
        }
    }

    //打开麻将结束
    private onOpenMahjongComplete(e: basic.TimerEvent): void {
        //停止打开麻将
        this.stopOpenMahjong();
    }
    
    //初始化筹码
    private infoChip():void{
        //显示筹码初始化
        this.chipfly.info();
    }
    
    //选择按钮
    private onChooseBtn(e:egret.TouchEvent):void{
        //定义变量
        var btnnum: number = Number(e.target.name);
        
        //判断显示压住
        if(UserData.User_VIP == 15) {
            //显示提示
            basic.Dispatcher.dispatch(EventNames.SHOW_TIPS,{ "tips": "VIP15账号不能再游戏中下注" });
        }
        else {
            if(GameData.Zhuang_Id != 0 && GameData.EBG_YaZhu_OtherTotal + GameData.Game_BeiLv > GameData.Zhuang_Gold) {
                //显示提示
                basic.Dispatcher.dispatch(EventNames.SHOW_TIPS,{ "tips": "庄可赔金币不足，压住失败" });
            }
            else {
                if(GameData.EBG_State == 1 && UserData.User_Id != GameData.Zhuang_Id) {
                    //判断显示
                    if(GameData.EBG_YaZhu_UserTotal + GameData.Game_BeiLv <= UserData.User_Gold) {
                        //数据赋值
                        GameData.EBG_YaZhu_UserTotal += GameData.Game_BeiLv;
                        GameData.EBG_YaZhu_User[btnnum] += GameData.Game_BeiLv;
                        GameData.EBG_YaZhu_Total[btnnum] += GameData.Game_BeiLv;
                        GameData.EBG_YaZhu_User_NowDetail[btnnum][GameData.EBG_YaZhu_User_NowDetail[btnnum].length] = GameData.Game_BeiLv;

                        //显示金币
                        this.showGold();

                        //播放声音
                        basic.SoundManager.instance.playEffect("sound_ebg_yazhu_mp3");

                        //发送消息
                        basic.Dispatcher.dispatch(EventNames.EBG_SHOWGOLD);

                        //显示动画
                        this.chipfly.sendChip(0,String(Math.floor(GameData.Game_BeiLv / 10000)).length - 1,btnnum);

                        //提交数据
                        Comm_ebg.instance.sendSocket({ "type": "bet","pos": btnnum,"gold": GameData.Game_BeiLv });
                    }
                    else {
                        //显示提示
                        basic.Dispatcher.dispatch(EventNames.SHOW_TIPS,{ "tips": "您的金币不足，请充值!" });
                    }
                }
            }
        }
    }
    
    //清楚麻将
    private cleanSendMahjong():void{
        //初始化麻将
        for(var i: number = 0;i < 4;i++) {
            this.img_mahjong[i].x = 0;
            this.img_mahjong[i].y = 0;
            this.g_mahjong[i].scaleX = 0.5;
            this.g_mahjong[i].scaleY = 0.5;
            this.g_mahjong[i].visible = true;
            this.g_mahjong[i].x = -160 + i * 33;
            this.g_mahjong[i].y = -20;
        }
    }
    
    //清除桌子
    clean(): void {
        //停止打开麻将
        this.stopOpenMahjong();

        //隐藏用户麻将
        for(var i1: number = 0;i1 < 3;i1++) {
            for(var j1: number = 0;j1 < 2;j1++) {
                this.user_mahjong[i1][j1].visible = false;
                this.user_mahjong[i1][j1].currentState = "close";
            }
        }

        //隐藏庄麻将
        for(var i2: number = 0;i2 < 2;i2++) {
            this.zhuang_mahjong[i2].visible = false;
            this.zhuang_mahjong[i2].currentState = "close";
        }

        //清除金币
        for(var i3: number = 0;i3 < 3;i3++) {
            //数据赋值
            this.user_gold[i3].text = "0";
            GameData.EBG_YaZhu_User[i3] = 0
        }
        GameData.EBG_YaZhu_UserTotal = 0;
        GameData.EBG_YaZhu_OtherTotal = 0;
        
        //清除总金币
        for(var i4: number = 0;i4 < 3;i4++) {
            //数据赋值
            this.user_totalgold[i4].text = "0"
            GameData.EBG_YaZhu_Total[i4] = 0;
        }
        GameData.EBG_YaZhu_User_NowDetail = [[],[],[]];

        //隐藏结束
        this.result_zhuang.visible = false;
        for(var i5: number = 0;i5 < 3;i5++) {
            this.result_table[i5].visible = false;
            this.user_result[i5].visible = false;
        }
        
        //清除发送麻将
        this.cleanSendMahjong();
        
        //清除筹码
        this.chipfly.clean();
    }
    
    //发送第一张桌子
    private sendMahjong(_table:number): void {
        //定义位置
        var to_x: number;
        var to_y: number;

        //数据赋值
        if(_table < 3) {
            to_x = this.g_table[_table].x + this.user_mahjong[_table][0].x;
            to_y = this.g_table[_table].y + this.user_mahjong[_table][0].y - 20;
        }
        else {
            to_x = this.g_zhuang.x + this.zhuang_mahjong[0].x;
            to_y = this.g_zhuang.y + this.zhuang_mahjong[0].y - 20;
        }

        //显示最上层
        this.setChildIndex(this.g_mahjong[3-_table],this.numChildren - 1);

        //播放声音
        basic.SoundManager.instance.playEffect("sound_ebg_sendmahjong2_mp3");

        //开始动画
        var _tween_x: egret.Tween = egret.Tween.get(this.g_mahjong[3 - _table]).to({ x: to_x },400);
        var _tween_y: egret.Tween = egret.Tween.get(this.g_mahjong[3 - _table]).to({ y: to_y },400);
        var _tween_scaleX: egret.Tween = egret.Tween.get(this.g_mahjong[3 - _table]).to({ scaleX: 1 },400);
        var _tween_scaleY: egret.Tween = egret.Tween.get(this.g_mahjong[3 - _table]).to({ scaleY: 1 },400).wait(100).call(() => {
            //播放声音
            basic.SoundManager.instance.playEffect("sound_ebg_downmahjong_mp3");

            //显示动画
            var _tween_img_x: egret.Tween = egret.Tween.get(this.img_mahjong[_table]).to({ x: 68 },150).call(() => {
                var _tween_img_y: egret.Tween = egret.Tween.get(this.img_mahjong[_table]).to({ y: 20 },80).wait(300).call(() => {
                    if(GameData.EBG_State != 2) {
                        //清除发送麻将
                        this.cleanSendMahjong();
                    }
                    else {
                        //判断发送
                        if(_table<3){
                            //发送麻将
                            this.sendMahjong(_table + 1);
                        }
                        else{
                            //清除发送麻将
                            this.cleanSendMahjong();
                            
                            //按顺序打开麻将
                            this.startOpenMahjong()
                        }
                    }
                });
            });
        });
    }
}
