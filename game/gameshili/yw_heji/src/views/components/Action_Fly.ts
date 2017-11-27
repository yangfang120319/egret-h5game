/**
 *
 * @飞机飞行
 *
 */
class Action_Fly extends eui.Component {
    //定义变量
    private g_tips: eui.Group;
    private img_fly: eui.Image;
    private txt_name: eui.Label;
    private img_head: eui.Image;
    private txt_gold: eui.Label;

    //定义动画变量
    private _tween_x0: egret.Tween = null;
    private _tween_x1: egret.Tween = null;
    private _tween_y0: egret.Tween = null;
    private _tween_y1: egret.Tween = null;
    private _tween_rotation: egret.Tween = null;
    private start_fly_y: number = 378;
    private start_fly_x: number = -1000;
    private start_tips_y: number = 450;
    private start_tips_x: number = -1305;
    private funcallback: Function;

    //定义界面
    public constructor() {
        super();

        //定义界面
        this.skinName = Action_FlySkin;
    }

    //初始化界面
    public info(): void {
        //定义旋转弧度
        this.g_tips.rotation = 0;

        //定义位置
        this.g_tips.y = this.start_tips_y;
        this.g_tips.x = this.start_tips_x;
        this.img_fly.y = this.start_fly_y;
        this.img_fly.x = this.start_fly_x;
    }

    //开始动画
    public start(_name: string,_head: string,_gold: number,_callback: Function): void {
        //定义变量
        var move_y: number = 10;
        var move_x: number = 1360;
        var move_time_in: number = 1200;
        var move_time_out: number = 800;
        var move_time_y: number = 800;
        var waiting_time: number = 3000;
        
        //初始化
        this.info();

        //显示头像
        this.img_head.source = _head;

        //数据赋值
        this.funcallback = _callback;

        //显示名字
        this.txt_name.text = _name;

        //判断显文字
        if(_gold < 100000000) {
            this.txt_gold.text = String(_gold).substring(0,String(_gold).length - 4) + "万";
        }
        else {
            this.txt_gold.text = Number(Math.floor(_gold / 1000000) / 100).toString() + "亿";
        }
        
        //循环播放
        this._tween_y0 = egret.Tween.get(this.img_fly,{ loop: true }).to({ y: this.start_fly_y + move_y },move_time_y).wait(50).
            to({ y: this.start_fly_y },move_time_y).wait(50);
        this._tween_y1 = egret.Tween.get(this.g_tips,{ loop: true }).to({ y: this.start_tips_y + move_y },move_time_y).wait(50).
            to({ y: this.start_tips_y },move_time_y).wait(50);

        //飞机移动
        this._tween_x0 = egret.Tween.get(this.img_fly).to({ x: this.start_fly_x + move_x },move_time_in,egret.Ease.circOut).
            wait(waiting_time).to({ x: this.start_fly_x + move_x * 2 },move_time_out,egret.Ease.circIn);
        this._tween_x1 = egret.Tween.get(this.g_tips).to({ x: this.start_tips_x + move_x },move_time_in,egret.Ease.circOut).
            wait(waiting_time).to({ x: this.start_tips_x + move_x * 2 },move_time_out,egret.Ease.circIn).call(() => {
                //停止动画
                this._tween_y0.setPaused(true);
                this._tween_y1.setPaused(true);

                //显示界面
                if(this.funcallback) {
                    this.funcallback();
                }
            });
    }
}
