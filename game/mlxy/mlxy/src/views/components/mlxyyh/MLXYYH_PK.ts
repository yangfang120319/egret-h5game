/**
 *
 * @马来西亚银行-PK
 *
 */
class MLXYYH_PK extends eui.Component {
    //定义变量
    private img_pk: eui.Image;
    private g_light: eui.Group;
    private img_luck: eui.Image;
    private rect_back: eui.Rect;
    private img_left: eui.Image;
    private img_right: eui.Image;
    private img_pk_add: eui.Image;
    private baozha: MLXYYH_BaoZha;
    private shandian1: MLXYYH_ShanDian;
    private shandian2: MLXYYH_ShanDian;
    
    //数据变量
    private run_rate: number;
    private left_run_x: number;
    private left_run_y: number;
    private right_run_x: number;
    private right_run_y: number;
    private left_moveover_x: number;
    private left_moveover_y: number;
    private right_moveover_x: number;
    private right_moveover_y: number;
    private _tween_X_Left: egret.Tween = null;
    private _tween_Y_Left: egret.Tween = null;
    private _tween_alpha_Left: egret.Tween = null;
    private _tween_scaleX_Left: egret.Tween = null;
    private _tween_scaleY_Left: egret.Tween = null;
    private _tween_X_Right: egret.Tween = null;
    private _tween_Y_Right: egret.Tween = null;
    private _tween_alpha_Right: egret.Tween = null;
    private _tween_scaleX_Right: egret.Tween = null;
    private _tween_scaleY_Right: egret.Tween = null;
    private _tween_alpha_Back: egret.Tween = null;
    private _tween_pk_alpha: egret.Tween = null;
    private _tween_pk_scaleX: egret.Tween = null;
    private _tween_pk_scaleY: egret.Tween = null;
    private _tween_pk_add_alpha: egret.Tween = null;
    private _tween_pk_add_scaleX: egret.Tween = null;
    private _tween_pk_add_scaleY: egret.Tween = null;
    private _tween_light_alpha: egret.Tween = null;
    private _tween_pk_add_rotation: egret.Tween = null;
    private _tween_Y_Luck: egret.Tween = null;
    private timer_doudong: egret.Timer = null;
    private timer_waiting1: egret.Timer = null;
    private timer_waiting2: egret.Timer = null;
    
    //初始化
    createChildren(): void {
        super.createChildren();
        
        //隐藏界面
        this.visible = false;
        this.baozha.clean();
        this.shandian1.clean();
        this.shandian2.clean();
        this.baozha.visible = true;
        this.shandian1.visible = true;
        this.shandian2.visible = true;
        
        //注册事件
        basic.Dispatcher.addListener(EventNames.MLXYYH_HIDEPK,this.onHidePK,this);
    }
    
    //初始化界面
    info(_run_rate: number,_left_run_x: number,_left_run_y: number,_rightt_run_x: number,_rightt_run_y: number):void{
        //定义变量
        var rate: number = (basic.StageProxy.width - 830) / 306;
        
        //数据赋值
        this.run_rate = _run_rate;
        this.left_run_x = _left_run_x;
        this.left_run_y = _left_run_y;
        this.right_run_x = _rightt_run_x;
        this.right_run_y = _rightt_run_y;
        
        //数据赋值
        this.left_moveover_y = 207;
        this.right_moveover_y = 207;
        this.left_moveover_x = 30 + 130 * rate;
        this.right_moveover_x = 567 + 176 * rate;
    }
    
    //开始
    start():void{
        //显示左边
        this.img_left.alpha = 0;
        this.img_left.scaleX = 0.28 * this.run_rate;
        this.img_left.scaleY = 0.28 * this.run_rate;
        this.img_left.x = this.left_run_x + GameData.MLXYYH_Box_X[GameData.MLXYYH_RunOver_Left] * this.run_rate + 5;
        this.img_left.y = this.left_run_y + GameData.MLXYYH_Box_Y[GameData.MLXYYH_RunOver_Left] * this.run_rate + 5;
        
        //显示右边
        this.img_right.alpha = 0;
        this.img_right.scaleX = 0.28 * this.run_rate;
        this.img_right.scaleY = 0.28 * this.run_rate;
        this.img_right.x = this.right_run_x + GameData.MLXYYH_Box_X[GameData.MLXYYH_RunOver_Right] * this.run_rate + 5;
        this.img_right.y = this.right_run_y + GameData.MLXYYH_Box_Y[GameData.MLXYYH_RunOver_Right] * this.run_rate + 5;
        
        //开始动画
        egret.setTimeout(() => {
            this.startAction();
        },this,100);
    }
    
    //开始动画
    private startAction(): void {
        //显示界面
        this.visible = true;
        this.baozha.clean();
        this.shandian1.clean();
        this.shandian2.clean();
        this.g_light.alpha = 0;
        this.rect_back.alpha = 0;
        this.g_type.visible = false;
        this.img_left.visible = true;
        this.img_right.visible = true;
        this.img_luck.visible = false;
        this.img_left.source = "icon_mlxyyh_" + GameData.MLXYYH_BoxNum_Left[GameData.MLXYYH_RunOver_Left] + "_2_png";
        this.img_right.source = "icon_mlxyyh_" + GameData.MLXYYH_BoxNum_Right[GameData.MLXYYH_RunOver_Right] + "_2_png";
        
        //判断显示
        if(GameData.MLXYYH_RunOver_Luck != -1) {
            this.img_luck.y = this.left_moveover_y;
            this.img_luck.x = (basic.StageProxy.width - this.img_luck.width) / 2;
            this.img_luck.source = "icon_mlxyyh_" + GameData.MLXYYH_BoxNum_Left[GameData.MLXYYH_RunOver_Luck] + "_2_png";
        }
        
        //显示背景动画
        this._tween_alpha_Back = egret.Tween.get(this.rect_back).
            to({ alpha: 1 },300);
        
        //显示左边动画
        this._tween_alpha_Left = egret.Tween.get(this.img_left).
            to({ alpha: 1 },300);
        this._tween_X_Left = egret.Tween.get(this.img_left).wait(300).
            to({ x: this.left_moveover_x },400);
        this._tween_Y_Left = egret.Tween.get(this.img_left).wait(300).
            to({ y: this.left_moveover_y },400);
        this._tween_scaleX_Left = egret.Tween.get(this.img_left).wait(300).
            to({ scaleX: 1 },400);
        this._tween_scaleY_Left = egret.Tween.get(this.img_left).wait(300).
            to({ scaleY: 1 },400);
        
        //显示右边动画
        this._tween_alpha_Right = egret.Tween.get(this.img_right).
            to({ alpha: 1 },300);
        this._tween_X_Right = egret.Tween.get(this.img_right).wait(300).
            to({ x: this.right_moveover_x },400);
        this._tween_Y_Right = egret.Tween.get(this.img_right).wait(300).
            to({ y: this.right_moveover_y },400);
        this._tween_scaleX_Right = egret.Tween.get(this.img_right).wait(300).
            to({ scaleX: 1 },400);
        this._tween_scaleY_Right = egret.Tween.get(this.img_right).wait(300).
            to({ scaleY: 1 },400).call(()=>{
                //显示界面
                this.img_left.alpha = 1;
                this.img_right.alpha = 1;
                this.img_left.visible = true;
                this.img_right.visible = true;
                this.img_left.source = "icon_mlxyyh_" + GameData.MLXYYH_BoxNum_Left[GameData.MLXYYH_RunOver_Left] + "_2_png";
                this.img_right.source = "icon_mlxyyh_" + GameData.MLXYYH_BoxNum_Right[GameData.MLXYYH_RunOver_Right] + "_2_png";
                
                //显示图表抖动
                this.startDouDong();
            });
        
        //显示PK动画
        this.img_pk.visible = false;
        this.img_pk_add.visible = false;
        this.timer_waiting1 = new egret.Timer(1000,1);
        this.timer_waiting1.addEventListener(egret.TimerEvent.TIMER_COMPLETE,this.onShowWaitingComplete1,this);
        this.timer_waiting1.start();
        
        //显示碰撞动画
        this.timer_waiting2 = new egret.Timer(3300,1);
        this.timer_waiting2.addEventListener(egret.TimerEvent.TIMER_COMPLETE,this.onShowWaitingComplete2,this);
        this.timer_waiting2.start();
    }
    
    //等待结束1
    private onShowWaitingComplete1(e:egret.TimerEvent):void{
        //判断停止
        if(this.timer_waiting1) {
            this.timer_waiting1.stop();
            this.timer_waiting1.removeEventListener(egret.TimerEvent.TIMER_COMPLETE,this.onShowWaitingComplete1,this);
            this.timer_waiting1 = null;
        }
        
        //显示动画
        this.img_pk.alpha = 1;
        this.img_pk.scaleX = 4;
        this.img_pk.scaleY = 4;
        this.img_pk_add.alpha = 1;
        this.img_pk_add.scaleX = 4;
        this.img_pk_add.scaleY = 4;
        this.img_pk.visible = true;
        this.img_pk_add.visible = true;
        this._tween_pk_alpha = egret.Tween.get(this.img_pk).wait(2200).to({ alpha: 0 },200);
        this._tween_pk_scaleX = egret.Tween.get(this.img_pk).to({ scaleX: 1.5 },200).
            wait(2000).to({ scaleX: 2.5 },200);
        this._tween_pk_scaleY = egret.Tween.get(this.img_pk).to({ scaleY: 1.5 },200).
            wait(2000).to({ scaleY: 2.5 },200);
        this._tween_pk_add_scaleX = egret.Tween.get(this.img_pk_add).to({ scaleX: 1.5 },200).
            wait(2000).to({ scaleX: 3.5 },200);
        this._tween_pk_add_scaleY = egret.Tween.get(this.img_pk_add).to({ scaleY: 1.5 },200).
            wait(2000).to({ scaleY: 3.5 },200);
        this._tween_pk_add_alpha = egret.Tween.get(this.img_pk_add).to({ alpha: 0 },200).call(() => {
            //隐藏
            this._tween_pk_add_alpha = egret.Tween.get(this.img_pk_add).wait(1800).
                to({ alpha: 1 },200).
                to({ alpha: 0 },200);

            //显示闪电
            this.shandian1.start(2,1);
            this.shandian2.start(2,0);
        });
    }
    
    //等待结束2
    private onShowWaitingComplete2(e: egret.TimerEvent): void {
        //判断停止
        if(this.timer_waiting2) {
            this.timer_waiting2.stop();
            this.timer_waiting2.removeEventListener(egret.TimerEvent.TIMER_COMPLETE,this.onShowWaitingComplete2,this);
            this.timer_waiting2 = null;
        }
        
        //定义变量
        var move_overX: number = (basic.StageProxy.width - this.img_left.width) / 2;

        //停止抖动
        this.stopDouDong();
        
        //显示移动动画
        this._tween_X_Left = egret.Tween.get(this.img_left).
            to({ x: move_overX - this.img_left.width / 2 + 30 },100);
        this._tween_X_Right = egret.Tween.get(this.img_right).
            to({ x: move_overX + this.img_left.width / 2 - 30 },100).call(() => {
                //显示爆炸
                this.baozha.start();

                //继续运动
                this._tween_X_Left = egret.Tween.get(this.img_left).
                    to({ x: move_overX },50);
                this._tween_X_Right = egret.Tween.get(this.img_right).
                    to({ x: move_overX },50).wait(100).call(() => {
                        //判断显示结束动画
                        this.showOverAction();
                    });
            });
    }
    

    private g_type: eui.Group;
    private img_type: eui.Image;
    private img_type_add: eui.Image;
    
    //显示结束动画
    private showOverAction():void{
        //判断显示动画
        if(GameData.MLXYYH_RunOver_IsWin_Left == true && GameData.MLXYYH_RunOver_IsWin_Right == false) {
            //显示界面
            this.img_left.visible = true;
            this.img_right.visible = false;
            
            //显示发光动画
            this.showLightAction();
        }
        else if(GameData.MLXYYH_RunOver_IsWin_Left == false && GameData.MLXYYH_RunOver_IsWin_Right == true) {
            //显示界面
            this.img_left.visible = false;
            this.img_right.visible = true;
            
            //显示发光动画
            this.showLightAction();
        }
        else if(GameData.MLXYYH_RunOver_IsWin_Left == true && GameData.MLXYYH_RunOver_IsWin_Right == true){
            if(GameData.MLXYYH_RunOver_Luck == -1) {
                //显示小双喜
                this.g_type.visible = true;
                this.img_type.source = "txt_mlxyyh_xsx_png";
                this.img_type_add.source = "txt_mlxyyh_xsx_png";
                
                //显示动画
                this._tween_X_Left = egret.Tween.get(this.img_left).
                    to({ x: this.left_moveover_x },100);
                this._tween_X_Right = egret.Tween.get(this.img_right).
                    to({ x: this.right_moveover_x },100);
                
                //显示发光动画
                this.showLightAction();
            }
            else {
                //显示小双喜
                this.g_type.visible = true;
                this.img_type.source = "txt_mlxyyh_dsy_png";
                this.img_type_add.source = "txt_mlxyyh_dsy_png";
                
                //显示动画
                this._tween_X_Left = egret.Tween.get(this.img_left).
                    to({ x: this.left_moveover_x },100);
                this._tween_Y_Left = egret.Tween.get(this.img_left).
                    to({ x: this.left_moveover_y-100 },100);
                this._tween_X_Right = egret.Tween.get(this.img_right).
                    to({ x: this.right_moveover_x },100);
                this._tween_Y_Right = egret.Tween.get(this.img_right).
                    to({ x: this.right_moveover_y - 100 },100);
                
                //显示幸运
                this.img_luck.visible = true;
                this._tween_Y_Luck = egret.Tween.get(this.img_luck).
                    to({ y: 400 },100);
                    
                //显示发光动画
                this.showLightAction();
            }
        }
        
    }
    
    
    
    //开始抖动
    private startDouDong(): void {
        //开始抖动
        this.timer_doudong = new egret.Timer(60);
        this.timer_doudong.addEventListener(egret.TimerEvent.TIMER,this.onShowDouDong,this);
        this.timer_doudong.start();
    }
    
    //抖动中
    private onShowDouDong(e: egret.TimerEvent): void {
        //判断显示移动Left
        var over_left_x: number = this.left_moveover_x + (15 - Math.random() * 30);
        var over_left_y: number = this.left_moveover_y + (15 - Math.random() * 30);
        
        //显示移动
        this._tween_X_Left = egret.Tween.get(this.img_left).
            to({ x: over_left_x },60);
        this._tween_Y_Left = egret.Tween.get(this.img_left).
            to({ y: over_left_y },60);
        
        //判断显示移动Right
        var over_right_x: number = this.right_moveover_x + (30 - Math.random() * 60);
        var over_right_y: number = this.right_moveover_y + (30 - Math.random() * 60);
        
        //显示移动
        this._tween_X_Right = egret.Tween.get(this.img_right).
            to({ x: over_right_x },60);
        this._tween_Y_Right = egret.Tween.get(this.img_right).
            to({ y: over_right_y },60);
    }
    
    //结束抖动
    private stopDouDong(): void {
        //判断停止
        if(this.timer_doudong) {
            this.timer_doudong.stop();
            this.timer_doudong.removeEventListener(egret.TimerEvent.TIMER,this.onShowDouDong,this);
            this.timer_doudong=null;
        }
    }
    
    //显示发光动画
    private showLightAction():void{
        //显示界面
        this.g_light.rotation = 0;
        this.g_light.visible = true;
        this._tween_light_alpha=egret.Tween.get(this.g_light).to({alpha:1},200).call(()=>{
            this._tween_pk_add_rotation = egret.Tween.get(this.g_light,{loop:true}).
                to({ rotation: 360 },5000);
        });
    }
    
    //隐藏PK
    private onHidePK(e: egret.Event): void {
        //隐藏界面
        this.visible = false;

        //停止动画
        this.stopAction();
    }

    //停止动画 
    private stopAction(): void {
        if(this._tween_X_Left) {
            this._tween_X_Left.setPaused(true);
            this._tween_X_Left = null;
        }
        if(this._tween_Y_Left) {
            this._tween_Y_Left.setPaused(true);
            this._tween_Y_Left = null;
        }
        if(this._tween_alpha_Left) {
            this._tween_alpha_Left.setPaused(true);
            this._tween_alpha_Left = null;
        }
        if(this._tween_scaleX_Left) {
            this._tween_scaleX_Left.setPaused(true);
            this._tween_scaleX_Left = null;
        }
        if(this._tween_scaleY_Left) {
            this._tween_scaleY_Left.setPaused(true);
            this._tween_scaleY_Left = null;
        }
        if(this._tween_X_Right) {
            this._tween_X_Right.setPaused(true);
            this._tween_X_Right = null;
        }
        if(this._tween_Y_Right) {
            this._tween_Y_Right.setPaused(true);
            this._tween_Y_Right = null;
        }
        if(this._tween_alpha_Right) {
            this._tween_alpha_Right.setPaused(true);
            this._tween_alpha_Right = null;
        }
        if(this._tween_scaleX_Right) {
            this._tween_scaleX_Right.setPaused(true);
            this._tween_scaleX_Right = null;
        }
        if(this._tween_scaleY_Right) {
            this._tween_scaleY_Right.setPaused(true);
            this._tween_scaleY_Right = null;
        }
        if(this._tween_alpha_Back) {
            this._tween_alpha_Back.setPaused(true);
            this._tween_alpha_Back = null;
        }
        if(this._tween_pk_alpha) {
            this._tween_pk_alpha.setPaused(true);
            this._tween_pk_alpha = null;
        }
        if(this._tween_pk_scaleX) {
            this._tween_pk_scaleX.setPaused(true);
            this._tween_pk_scaleX = null;
        }
        if(this._tween_pk_scaleY) {
            this._tween_pk_scaleY.setPaused(true);
            this._tween_pk_scaleY = null;
        }
        if(this._tween_pk_add_alpha) {
            this._tween_pk_add_alpha.setPaused(true);
            this._tween_pk_add_alpha = null;
        }
        if(this._tween_pk_add_scaleX) {
            this._tween_pk_add_scaleX.setPaused(true);
            this._tween_pk_add_scaleX = null;
        }
        if(this._tween_pk_add_scaleY) {
            this._tween_pk_add_scaleY.setPaused(true);
            this._tween_pk_add_scaleY = null;
        }
        if(this._tween_light_alpha) {
            this._tween_light_alpha.setPaused(true);
            this._tween_light_alpha = null;
        }
        if(this._tween_pk_add_rotation) {
            this._tween_pk_add_rotation.setPaused(true);
            this._tween_pk_add_rotation = null;
        }
        if(this._tween_Y_Luck) {
            this._tween_Y_Luck.setPaused(true);
            this._tween_Y_Luck = null;
        }
        
        //判断停止
        if(this.timer_waiting1) {
            this.timer_waiting1.stop();
            this.timer_waiting1.removeEventListener(egret.TimerEvent.TIMER_COMPLETE,this.onShowWaitingComplete1,this);
            this.timer_waiting1 = null;
        }
        
        //判断停止
        if(this.timer_waiting2) {
            this.timer_waiting2.stop();
            this.timer_waiting2.removeEventListener(egret.TimerEvent.TIMER_COMPLETE,this.onShowWaitingComplete2,this);
            this.timer_waiting2 = null;
        }
        
        //判断停止
        if(this.timer_doudong) {
            this.timer_doudong.stop();
            this.timer_doudong.removeEventListener(egret.TimerEvent.TIMER,this.onShowDouDong,this);
            this.timer_doudong = null;
        }
    }
}
