/**
 *
 * @牛牛结算界面
 *
 */
class NN_Over extends eui.Component {
    //定义变量
    private g_back: eui.Group;
    private txt_total: eui.Label;
    private img_name: eui.Image[] = [];
    private txt_yazhu: eui.Label[] = [];
    private beishu: number[] = [1,1,1,1,1,1,1,1,1,1,2,,,,3,4];
    private g_light: eui.Group;
    private img_title: eui.Image;
    private img_star: eui.Image[] = [];
    private com_star: eui.Component[] = [];
    private _tween_alpha: egret.Tween[] = [];
    private _tween_scaleX: egret.Tween[] = [];
    private _tween_scaleY: egret.Tween[] = [];
    private _tween_rotation: egret.Tween[] = [];
    private _tween_scaleX_title: egret.Tween = null;
    private _tween_scaleY_title: egret.Tween = null;
    private _tween_rotation_light: egret.Tween = null;

    //初始化
    //初始化
    createChildren(): void {
        super.createChildren();
        
        //隐藏界面
        this.visible = false;

        //数据赋值
        for(var i: number = 0;i < 5;i++) {
            //定义变量
            var img: eui.Image = this["img_name" + i];
            var txt: eui.Label = this["txt_yazhu" + i];

            //数据赋值
            this.img_name[i] = img;
            this.txt_yazhu[i] = txt;
        }
        
        //星星数据赋值
        for(var j: number = 0;j < 5;j++) {
            //定义变量
            var now_img_star: eui.Image = this["img_star" + j];

            //数据赋值
            this.img_star[j] = now_img_star;
            this._tween_alpha[j] = null;
            this._tween_scaleX[j] = null;
            this._tween_scaleY[j] = null;
        }
        for(var k: number = 0;k < 4;k++) {
            //定义变量
            var now_com_star: eui.Component = this["com_star" + k];

            //数据赋值
            this.com_star[k] = now_com_star;
            this._tween_rotation[k] = null;
        }
        
        //注册事件
        basic.Dispatcher.addListener(EventNames.NN_SHOWOVER,this.onShowOver,this);
        basic.Dispatcher.addListener(EventNames.NN_HIDEOVER,this.onHideOver,this);
    }
    
    //显示结算界面
    private onShowOver(e: egret.Event): void {
        //定义变量
        var win_gold: number = 0;

        //显示界面
        this.visible = true;
        
        //判断显示
        if(GameData.Game_Zhuang_Id == UserData.User_Id) {
            //显示文本
            for(var i2: number = 0;i2 < 5;i2++) {
                //判断赋值
                if(GameData.NN_Poker_Table_IsWin[i2] == 1) {
                    this.txt_yazhu[i2].text = "-" + GameData.assShowGold(GameData.NN_YaZhu_Total[i2] * this.beishu[GameData.NN_Poker_Table_Type[i2]]);
                    win_gold -= GameData.NN_YaZhu_Total[i2] * this.beishu[GameData.NN_Poker_Table_Type[i2]];
                }
                else if(GameData.NN_Poker_Table_IsWin[i2] == -1) {
                    this.txt_yazhu[i2].text = "+" + GameData.assShowGold(GameData.NN_YaZhu_Total[i2] * this.beishu[GameData.NN_Poker_Table_Type[5]]);
                    win_gold += GameData.NN_YaZhu_Total[i2] * this.beishu[GameData.NN_Poker_Table_Type[5]];
                }
                else {
                    this.txt_yazhu[i2].text = "0";
                }
            }

            //显示文本
            if(win_gold == 0) {
                this.txt_total.text = "0";
            }
            else if(win_gold > 0) {
                win_gold = win_gold * 0.99;
                this.txt_total.text = "+" + GameData.assShowGold(win_gold);
            }
            else {
                this.txt_total.text = "-" + GameData.assShowGold(-win_gold);
            }

            //判断显示胜负
            if(GameData.NN_Poker_Table_IsWin[0] == -1) {
                this.img_name[0].source = "txt_nn_weizhi1_png";
            }
            else if(GameData.NN_Poker_Table_IsWin[0] == 1) {
                this.img_name[0].source = "txt_nn_weizhi_hui1_png";
            }
            else if(GameData.NN_Poker_Table_IsWin[0] == 0) {
                this.img_name[0].source = "txt_nn_weizhi_lv1_png";
            }
            if(GameData.NN_Poker_Table_IsWin[1] == -1) {
                this.img_name[1].source = "txt_nn_weizhi2_png";
            }
            else if(GameData.NN_Poker_Table_IsWin[1] == 1) {
                this.img_name[1].source = "txt_nn_weizhi_hui2_png";
            }
            else if(GameData.NN_Poker_Table_IsWin[1] == 0) {
                this.img_name[1].source = "txt_nn_weizhi_lv2_png";
            }
            if(GameData.NN_Poker_Table_IsWin[2] == -1) {
                this.img_name[2].source = "txt_nn_weizhi3_png";
            }
            else if(GameData.NN_Poker_Table_IsWin[2] == 1) {
                this.img_name[2].source = "txt_nn_weizhi_hui3_png";
            }
            else if(GameData.NN_Poker_Table_IsWin[2] == 0) {
                this.img_name[2].source = "txt_nn_weizhi_lv3_png";
            }
            if(GameData.NN_Poker_Table_IsWin[3] == -1) {
                this.img_name[3].source = "txt_nn_weizhi5_png";
            }
            else if(GameData.NN_Poker_Table_IsWin[3] == 1) {
                this.img_name[3].source = "txt_nn_weizhi_hui5_png";
            }
            else if(GameData.NN_Poker_Table_IsWin[3] == 0) {
                this.img_name[3].source = "txt_nn_weizhi_lv5_png";
            }
            if(GameData.NN_Poker_Table_IsWin[4] == -1) {
                this.img_name[4].source = "txt_nn_weizhi6_png";
            }
            else if(GameData.NN_Poker_Table_IsWin[4] == 1) {
                this.img_name[4].source = "txt_nn_weizhi_hui6_png";
            }
            else if(GameData.NN_Poker_Table_IsWin[4] == 0) {
                this.img_name[4].source = "txt_nn_weizhi_lv6_png";
            }
        }
        else{
            //显示文本
            for(var i1: number = 0;i1 < 5;i1++) {
                //判断赋值
                if(GameData.NN_Poker_Table_IsWin[i1] == 1) {
                    this.txt_yazhu[i1].text = "+" + GameData.assShowGold(GameData.NN_YaZhu_User[i1] * this.beishu[GameData.NN_Poker_Table_Type[i1]]);
                    win_gold += GameData.NN_YaZhu_User[i1] * this.beishu[GameData.NN_Poker_Table_Type[i1]];
                }
                else if(GameData.NN_Poker_Table_IsWin[i1] == -1) {
                    this.txt_yazhu[i1].text = "-" + GameData.assShowGold(GameData.NN_YaZhu_User[i1] * this.beishu[GameData.NN_Poker_Table_Type[5]]);
                    win_gold -= GameData.NN_YaZhu_User[i1] * this.beishu[GameData.NN_Poker_Table_Type[5]];
                }
                else{
                    this.txt_yazhu[i1].text = "0";
                }
            }
            
            //显示文本
            if(win_gold == 0) {
                this.txt_total.text = "0";
            }
            else if(win_gold > 0) {
                this.txt_total.text = "+" + GameData.assShowGold(win_gold);
            }
            else {
                this.txt_total.text = "-" + GameData.assShowGold(-win_gold);
            }

            //判断显示胜负
            if(GameData.NN_Poker_Table_IsWin[0] == 1) {
                this.img_name[0].source = "txt_nn_weizhi1_png";
            }
            else if(GameData.NN_Poker_Table_IsWin[0] == -1) {
                this.img_name[0].source = "txt_nn_weizhi_hui1_png";
            }
            else if(GameData.NN_Poker_Table_IsWin[0] == 0) {
                this.img_name[0].source = "txt_nn_weizhi_lv1_png";
            }
            if(GameData.NN_Poker_Table_IsWin[1] == 1) {
                this.img_name[1].source = "txt_nn_weizhi2_png";
            }
            else if(GameData.NN_Poker_Table_IsWin[1] == -1) {
                this.img_name[1].source = "txt_nn_weizhi_hui2_png";
            }
            else if(GameData.NN_Poker_Table_IsWin[1] == 0) {
                this.img_name[1].source = "txt_nn_weizhi_lv2_png";
            }
            if(GameData.NN_Poker_Table_IsWin[2] == 1) {
                this.img_name[2].source = "txt_nn_weizhi3_png";
            }
            else if(GameData.NN_Poker_Table_IsWin[2] == -1) {
                this.img_name[2].source = "txt_nn_weizhi_hui3_png";
            }
            else if(GameData.NN_Poker_Table_IsWin[2] == 0) {
                this.img_name[2].source = "txt_nn_weizhi_lv3_png";
            }
            if(GameData.NN_Poker_Table_IsWin[3] == 1) {
                this.img_name[3].source = "txt_nn_weizhi5_png";
            }
            else if(GameData.NN_Poker_Table_IsWin[3] == -1) {
                this.img_name[3].source = "txt_nn_weizhi_hui5_png";
            }
            else if(GameData.NN_Poker_Table_IsWin[3] == 0) {
                this.img_name[3].source = "txt_nn_weizhi_lv5_png";
            }
            if(GameData.NN_Poker_Table_IsWin[4] == 1) {
                this.img_name[4].source = "txt_nn_weizhi6_png";
            }
            else if(GameData.NN_Poker_Table_IsWin[4] == -1) {
                this.img_name[4].source = "txt_nn_weizhi_hui6_png";
            }
            else if(GameData.NN_Poker_Table_IsWin[4] == 0) {
                this.img_name[4].source = "txt_nn_weizhi_lv6_png";
            }
        }
        
        //判断播放是声音
        if(win_gold < 0) {
            //播放声音
            this.g_back.visible = false;
            basic.SoundManager.instance.playEffect("sound_g_fail_mp3");
        }
        else {
            //播放声音
            this.g_back.visible = true;
            basic.SoundManager.instance.playEffect("sound_g_win" + Math.floor(Math.random() * 2 + 1).toString() + "_mp3");
        }
        
        //开始动画
        this.startAction();
    }

    //开始动画
    private startAction(): void {
        //背景动画
        this.img_title.scaleX = 4;
        this.img_title.scaleY = 4;
        this.g_light.visible = false;
        this._tween_scaleX_title = egret.Tween.get(this.img_title).
            to({ scaleX: 1.5 },400);
        this._tween_scaleY_title = egret.Tween.get(this.img_title).
            to({ scaleY: 1.5 },400).call(() => {
                this.g_light.visible = true;
                this._tween_rotation_light = egret.Tween.get(this.g_light,{ loop: true }).
                    to({ rotation: 360 },5000);
            });

        //显示星星动画
        for(var i: number = 0;i < 4;i++) {
            //显示动画
            this.showStarAction1(i);
        }
        for(var j: number = 0;j < 5;j++) {
            //显示动画
            this.showStarAction2(j);
        }
    }

    //显示星星动画1
    private showStarAction1(_num: number): void {
        //定义变量
        var now_rotation: number = Math.floor(Math.random() * 360);

        //显示的那个话
        this.com_star[_num].rotation = now_rotation;
        this._tween_rotation[_num] = egret.Tween.get(this.com_star[_num],{ loop: true }).
            to({ rotation: now_rotation + 360 },3000);
    }

    //星星动画
    private showStarAction2(_num: number): void {
        //定义变量
        var play_time: number = 800;
        var start_alpha: number = Math.random() * 1;

        //定义动画
        this.img_star[_num].alpha = start_alpha;
        this.img_star[_num].scaleX = start_alpha;
        this.img_star[_num].scaleY = start_alpha;
        this._tween_alpha[_num] = egret.Tween.get(this.img_star[_num],{ loop: true }).
            to({ alpha: 1 },play_time * (1 - start_alpha)).
            to({ alpha: 0 },play_time).
            to({ alpha: start_alpha },play_time * start_alpha);
        this._tween_scaleX[_num] = egret.Tween.get(this.img_star[_num],{ loop: true }).
            to({ scaleX: 1 },play_time * (1 - start_alpha)).
            to({ scaleX: 0 },play_time).
            to({ scaleX: start_alpha },play_time * start_alpha);
        this._tween_scaleY[_num] = egret.Tween.get(this.img_star[_num],{ loop: true }).
            to({ scaleY: 1 },play_time * (1 - start_alpha)).
            to({ scaleY: 0 },play_time).
            to({ scaleY: start_alpha },play_time * start_alpha);
    }

    //停止动画
    private stopAction(): void {
        //判断停止
        if(this._tween_rotation_light) {
            this._tween_rotation_light.setPaused(true);
            this._tween_rotation_light = null;
        }
        if(this._tween_scaleX_title) {
            this._tween_scaleX_title.setPaused(true);
            this._tween_scaleX_title = null;
        }
        if(this._tween_scaleY_title) {
            this._tween_scaleY_title.setPaused(true);
            this._tween_scaleY_title = null;
        }
        for(var i: number = 0;i < 4;i++) {
            if(this._tween_rotation[i]) {
                this._tween_rotation[i].setPaused(true);
                this._tween_rotation[i] = null;
            }
        }
        for(var j: number = 0;j < 5;j++) {
            if(this._tween_alpha[j]) {
                this._tween_alpha[j].setPaused(true);
                this._tween_alpha[j] = null;
            }
            if(this._tween_scaleX[j]) {
                this._tween_scaleX[j].setPaused(true);
                this._tween_scaleX[j] = null;
            }
            if(this._tween_scaleY[j]) {
                this._tween_scaleY[j].setPaused(true);
                this._tween_scaleY[j] = null;
            }
        }
    }

    //影藏结算界面
    private onHideOver(e: egret.Event): void {
        //隐藏界面
        this.visible = false;

        //停止动画
        this.stopAction();
    }
}
