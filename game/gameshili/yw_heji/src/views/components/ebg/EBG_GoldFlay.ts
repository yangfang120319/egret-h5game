/**
 *
 * @金币飞行动画
 *
 */
class EBG_GoldFlay extends eui.Component {
    //初始化
    createChildren(): void {
        super.createChildren();
	}
	
    //开始飞行
    startFlay(_type: number,_direction: number,_table: number): void {
        //定义变量
        var action_data: any = {};

        /**
        *
        * type
        * 0:用户
        * 1:庄
        * 2:在线玩家
        *
        * direction
        * 0:飞向用户
        * 1:飞向桌子
        * 
        */
        
        //判断显示
        if(_type == 0) {
            //定义变量
            var place_user: any = this.assUserPlace();
            var place_table1: any = this.assUserTablePlace(_table);
 
            //判断数据赋值
            if(_direction == 0) {
                action_data["to_x"] = place_user._x;
                action_data["to_y"] = place_user._y;
                action_data["start_x"] = place_table1._x;
                action_data["start_y"] = place_table1._y;
                action_data["to_ratewidth"] = place_user._ratewidth;
                action_data["to_rateheight"] = place_user._rateheight;
                action_data["start_ratewidth"] = place_table1._ratewidth;
                action_data["start_rateheight"] = place_table1._rateheight;
            }
            else if(_direction == 1) {
                action_data["to_x"] = place_table1._x;
                action_data["to_y"] = place_table1._y;
                action_data["start_x"] = place_user._x;
                action_data["start_y"] = place_user._y;
                action_data["to_ratewidth"] = place_table1._ratewidth;
                action_data["to_rateheight"] = place_table1._rateheight;
                action_data["start_ratewidth"] = place_user._ratewidth;
                action_data["start_rateheight"] = place_user._ratewidth;
            }
        }
        else if(_type == 1) {
            //定义变量
            var place_zhuang: any = this.assZhuangPlace();
            var place_table2: any = this.assTablePlace(_table);

            //数据复制
            if(_direction == 0) {
                action_data["to_x"] = place_zhuang._x;
                action_data["to_y"] = place_zhuang._y;
                action_data["start_x"] = place_table2._x;
                action_data["start_y"] = place_table2._y;
                action_data["to_ratewidth"] = place_zhuang._ratewidth;
                action_data["to_rateheight"] = place_zhuang._rateheight;
                action_data["start_ratewidth"] = place_table2._ratewidth;
                action_data["start_rateheight"] = place_table2._rateheight;
            }
            else if(_direction == 1) {
                action_data["to_x"] = place_table2._x;
                action_data["to_y"] = place_table2._y;
                action_data["start_x"] = place_zhuang._x;
                action_data["start_y"] = place_zhuang._y;
                action_data["to_ratewidth"] = place_table2._ratewidth;
                action_data["to_rateheight"] = place_table2._rateheight;
                action_data["start_ratewidth"] = place_zhuang._ratewidth;
                action_data["start_rateheight"] = place_zhuang._ratewidth;
            }
        }
        else if(_type == 2) {
            //定义变量
            var place_online: any = this.assOnLinePlace();
            var place_table3: any = this.assTablePlace(_table);

            //数据赋值
            if(_direction == 0) {
                action_data["to_x"] = place_online._x;
                action_data["to_y"] = place_online._y;
                action_data["start_x"] = place_table3._x;
                action_data["start_y"] = place_table3._y;
                action_data["to_ratewidth"] = place_online._ratewidth;
                action_data["to_rateheight"] = place_online._rateheight;
                action_data["start_ratewidth"] = place_table3._ratewidth;
                action_data["start_rateheight"] = place_table3._rateheight;
            }
            else if(_direction == 1) {
                action_data["to_x"] = place_table3._x;
                action_data["to_y"] = place_table3._y;
                action_data["start_x"] = place_online._x;
                action_data["start_y"] = place_online._y;
                action_data["to_ratewidth"] = place_table3._ratewidth;
                action_data["to_rateheight"] = place_table3._rateheight;
                action_data["start_ratewidth"] = place_online._ratewidth;
                action_data["start_rateheight"] = place_online._ratewidth;
            }
        }
        
        //播放声音
        basic.SoundManager.instance.playEffect("sound_ebg_goldflay_mp3");
        
        //数据赋值
        action_data["parent"] = this;

        //开始动画
        var flayaction: GoldFlayAction = new GoldFlayAction();
        flayaction.startFlay(action_data);
    }

    //用户数据赋值
    private assUserPlace(): any {
        //定义变量
        var place: any = {};

        //数据赋值
        place["_x"] = 4;
        place["_y"] = basic.StageProxy.height - 131;
        place["_ratewidth"] = 83;
        place["_rateheight"] = 83;

        return place;
    }

    //庄数据赋值
    private assZhuangPlace(): any {
        //定义变量
        var place: any = {};

        //数据赋值
        place["_y"] = 80;
        place["_x"] = 166;
        place["_ratewidth"] = 78 - 40;
        place["_rateheight"] = 78 - 40;

        return place;
    }

    //在线玩家复制
    private assOnLinePlace(): any {
        //定义变量
        var place: any = {};

        //数据赋值
        place["_x"] = 577;
        place["_y"] = 380;
        place["_ratewidth"] = 63 - 45;
        place["_rateheight"] = 77 - 45;

        return place;
    }
    
    //桌子赋值
    private assUserTablePlace(_table: number): any {
        //定义变量
        var place: any = {};
        
        //数据赋值
        if(_table == 0) {
            place["_x"] = 26;
            place["_y"] = 452 + 126 + 167;
            place["_ratewidth"] = 0;
            place["_rateheight"] = 0;
        }
        else if(_table == 1) {
            place["_x"] = 220 + 26;
            place["_y"] = 452 + 317 + 267
            place["_ratewidth"] = 0;
            place["_rateheight"] = 0;
        }
        else if(_table == 2) {
            place["_x"] = 440 + 26;
            place["_y"] = 452 + 126 + 167;
            place["_ratewidth"] = 0;
            place["_rateheight"] = 0;
        }

        return place;
    }

    //桌子赋值
    private assTablePlace(_table: number): any {
        //定义变量
        var place: any = {};

        //数据赋值
        if(_table == 0) {
            place["_x"] = 33;
            place["_y"] = 452 + 126 + 45;
            place["_ratewidth"] = 90;
            place["_rateheight"] = 70;
        }
        else if(_table == 1) {
            place["_x"] = 220 + 33;
            place["_y"] = 452 + 317 + 45;
            place["_ratewidth"] = 90;
            place["_rateheight"] = 70;
        }
        else if(_table == 2) {
            place["_x"] = 440 + 33;
            place["_y"] = 452 + 126 + 45;
            place["_ratewidth"] = 90;
            place["_rateheight"] = 70;
        }

        return place;
    }
}

class GoldFlayAction {
    //定义变量
    private num_to_x: number;
    private num_to_y: number;
    private num_start_x: number;
    private num_start_y: number;
    private num_to_ratewidth: number;
    private num_to_rateheight: number;
    private num_start_ratewidth: number;
    private num_start_rateheight: number;
    private com_parent: eui.Component;
    private timer_goldflay: egret.Timer = null;

    //初始化
    public constructor() {

    }

    //开始飞行
    public startFlay(action_data: any): void {
        //数据赋值
        this.num_to_x = action_data.to_x;
        this.num_to_y = action_data.to_y;
        this.num_start_x = action_data.start_x;
        this.num_start_y = action_data.start_y;
        this.num_to_ratewidth = action_data.to_ratewidth;
        this.num_to_rateheight = action_data.to_rateheight;
        this.num_start_ratewidth = action_data.start_ratewidth;
        this.num_start_rateheight = action_data.start_rateheight;
        this.com_parent = action_data.parent;

        //开始飞行动画
        if(egret.Capabilities.os != "Android") {
            this.timer_goldflay = new egret.Timer(10,6);
        }
        else {
            this.timer_goldflay = new egret.Timer(15,25);
        }
        this.timer_goldflay.addEventListener(egret.TimerEvent.TIMER,this.onGoldFlay,this);
        this.timer_goldflay.addEventListener(egret.TimerEvent.TIMER_COMPLETE,this.onGoldFlayComplete,this);
        this.timer_goldflay.start();
    }

    //金币飞行中
    private onGoldFlay(e: egret.TimerEvent): void {
        //定义变量
        var _to_x: number;
        var _to_y: number;
        var _start_x: number;
        var _start_y: number;
        var img_gold: eui.Image = new eui.Image();

        //数据赋值
        _to_x = this.num_to_x + Math.random() * this.num_to_ratewidth;
        _to_y = this.num_to_y + Math.random() * this.num_to_rateheight;
        _start_x = this.num_start_x + Math.random() * this.num_start_ratewidth;
        _start_y = this.num_start_y + Math.random() * this.num_start_rateheight;

        //定义图片
        img_gold.x = _start_x;
        img_gold.y = _start_y;
        img_gold.source = "icon_s_gold_png";

        //显示图片
        this.com_parent.addChild(img_gold);

        //显示动画
        var _tween_flay_alpha: egret.Tween = egret.Tween.get(img_gold).to({ alpha: 0.9 },50).wait(350).to({ alpha: 0 },50);
        var _tween_flay_x: egret.Tween = egret.Tween.get(img_gold).to({ x: _to_x },450);
        var _tween_flay_y: egret.Tween = egret.Tween.get(img_gold).to({ y: _to_y },450).call(() => {
            //移除图片
            this.com_parent.removeChild(img_gold);
        });
    }

    //筹码发放结束
    private onGoldFlayComplete(e: egret.TimerEvent): void {
        //停止等待
        if(this.timer_goldflay) {
            this.timer_goldflay.stop()
            this.timer_goldflay.removeEventListener(egret.TimerEvent.TIMER,this.onGoldFlay,this);
            this.timer_goldflay.removeEventListener(egret.TimerEvent.TIMER_COMPLETE,this.onGoldFlayComplete,this);
            this.timer_goldflay = null;
        }
    }
}
