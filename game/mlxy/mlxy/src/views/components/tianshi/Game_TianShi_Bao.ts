/**
 *
 * @author 
 *
 */
class Game_TianShi_Bao extends eui.Component {
    //定义变量
    private speed: number;
    private now_show: number;
    private total_show: number;
    private img_bao: eui.Image;
    private timer_waiting: egret.Timer = null;

    //初始化
    createChildren(): void {
        super.createChildren();

        //隐藏界面
        this.visible = false;
    }

    //开始动画
    start(_speed: number,_total_show: number): void {
        //数据赋值
        this.now_show = 0;
        this.speed = _speed;
        this.total_show = _total_show;

        //显示界面
        this.visible = true;

        //显示界面
        this.img_bao.source = "icon_ch_bao" + this.now_show.toString() + "_png";

        //开始动动画
        this.timer_waiting = new egret.Timer(this.speed);
        this.timer_waiting.addEventListener(egret.TimerEvent.TIMER,this.onShowShan,this);
        this.timer_waiting.start();
    }

    //停止动画
    stop(): void {
        //判断停止
        if(this.timer_waiting) {
            this.timer_waiting.stop();
            this.timer_waiting.removeEventListener(egret.TimerEvent.TIMER,this.onShowShan,this);
            this.timer_waiting = null
        }
    }

    //显示闪光
    private onShowShan(e: egret.TimerEvent): void {
        //数据复制
        this.now_show += 1;
        if(this.now_show >= this.total_show) {
            //停止动画
            this.stop();

            //隐藏界面
            this.visible = false;
        }
        else {
            //显示界面
            this.img_bao.source = "icon_ch_bao" + this.now_show.toString() + "_png";
        }
    }
}
