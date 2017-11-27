/**
 *
 * @例子效果
 *
 */
class GameLiZi extends eui.Component {
    //定义变量
    private show_num: number = 0;
    private show_detail: LiZi[] = [];
    private start_show_num: number = 50;
    private timer_action: egret.Timer = null;

    //初始化
    createChildren(): void {
        super.createChildren();
    }

    //开始粒子效果
    start(): void{
        //停止粒子效果
        this.stop();

        //初始化粒子
        for(var i: number = 0;i < this.start_show_num;i++){
            //显示粒子
            this.showLiZi(0,this.show_num);

            //数据赋值
            this.show_num += 1;
        }

        //开始计时
        this.timer_action = new egret.Timer(300);
        this.timer_action.addEventListener(egret.TimerEvent.TIMER,this.onAction,this);
        this.timer_action.start();
    }

    //停止粒子效果
    stop(): void{
        //停止动画
        if(this.timer_action){
            this.timer_action.stop();
            this.timer_action.removeEventListener(egret.TimerEvent.TIMER,this.onAction,this);
            this.timer_action = null;
        }

        //移除所有粒子
        for(var i: number = 0;i < this.show_num;i++){
            //判断移除界面
            if(this.show_detail[i]){
                this.show_detail[i].stop(); 
            }
        }

        //清空数据
        this.show_num = 0;
        this.show_detail = [];
    }

    //显示动画
    private onAction(e: egret.TimerEvent):void{
        //显示粒子
        this.showLiZi(1,this.show_num);

        //数据赋值
        this.show_num += 1;
    }
    
    //显示粒子
    private showLiZi(_type: number,_num: number): void{
        //定义变量
        var lizi: LiZi = new LiZi();

        //判断定义位置
        lizi.x = Math.random() * 640;
        if(_type == 0){
            lizi.y = Math.random() * (this.height - 50);
        }
        else{
            lizi.y = 0;
        }

        //开始动画
        this.show_detail[_num] = lizi;
        this.addChild( this.show_detail[_num]);
        this.show_detail[_num].start(this.height,()=>{
            //移除
            this.removeChild(this.show_detail[_num]);
            this.show_detail[_num] = null;
        });
    }
}

//粒子动画
class LiZi extends eui.Component {
    //定义变量
    private speed_x: number;
    private speed_y: number;
    private callback: Function;
    private speed_rotation: number;
    private _tween_x: egret.Tween = null;
    private _tween_y: egret.Tween = null;
    private _tween_rotation: egret.Tween = null;

    //定义界面
    public constructor() {
        super();

        //定义界面
        this.skinName = LiZiSkin;
    }

    //开始动画
    start(_height: number,_callback: Function): void{
        //定义变量
        var move_to_x: number;
        var move_x_time: number;
        var move_y_time: number;
        var move_distance_x: number;
        var move_distance_y: number;
        var move_to_rotaitio: number;
        var move_rotaition_time: number;

        //数据赋值
        this.callback = _callback;

        //数据赋值
        this.speed_y = Math.random() + 1;
        this.speed_x = 1.5 - Math.random() * 3;
        this.speed_rotation = Math.random() * 2;
        if(this.speed_x < 0){
            move_to_x = 0;
            move_distance_x = this.x;
        }
        else{
            move_to_x = basic.StageProxy.width;
            move_distance_x = basic.StageProxy.width - this.x;
        }
        move_distance_y = _height - this.y;
        if(Math.random() < 0.5){
            move_to_rotaitio = 360;
        }
        else{
            move_to_rotaitio = -360;
        }
        
        //显示界面
        this.currentState = Math.floor(Math.random() * 3).toString();

        //时间数据复制
        move_x_time = (Math.abs(this.speed_x) + 5) * move_distance_x * 30;
        move_y_time = Math.abs(this.speed_y) * move_distance_y * 30;
        move_rotaition_time = (this.speed_rotation + 2) * 360 * 30;

        //显示动画
        this._tween_rotation = egret.Tween.get(this,{loop: true}).to({rotation : move_to_rotaitio},move_rotaition_time);
        this._tween_x = egret.Tween.get(this).to({x : move_to_x},move_x_time).call(()=>{
            //停止动画
            this.stop();
        });
        this._tween_y = egret.Tween.get(this).to({y : _height},move_y_time).call(()=>{
            //停止动画
            this.stop();
        });
    }

    //停止动画
    stop(): void{
        //停止动画
        if(this._tween_x){
            this._tween_x.setPaused(true);
            this._tween_x = null;
        }
        if(this._tween_y){
            this._tween_y.setPaused(true);
            this._tween_y = null;
        }
        if(this._tween_rotation){
            this._tween_rotation.setPaused(true);
            this._tween_rotation = null;
        }

        //显示回调函数
        this.callback();
    }
}