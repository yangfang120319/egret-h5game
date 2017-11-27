/**
 *
 * @天使眼睛
 *
 */
class Game_TianShi_Eyes extends eui.Component {
    //定义变量
    private img_eyes: eui.Image;
    private timer_waiting: egret.Timer = null;

    //初始化
    createChildren(): void {
        super.createChildren();
    }
    
    //开始动画
    start(): void {
        //初始化眼睛
        this.img_eyes.source = "icon_ch_eyes0_png";
        
        //开始动画
        this.timer_waiting = new egret.Timer(3000);
        this.timer_waiting.addEventListener(egret.TimerEvent.TIMER,this.onShowEyes,this);
        this.timer_waiting.start();
    }
    
    //停止
    stop(): void {
        //判断停止
        if(this.timer_waiting) {
            this.timer_waiting.stop();
            this.timer_waiting.removeEventListener(egret.TimerEvent.TIMER,this.onShowEyes,this);
            this.timer_waiting = null
        }
    }
    
    //显示眼睛
    private onShowEyes(e:egret.TimerEvent):void{
        //显示眼睛动画
        this.img_eyes.source = "icon_ch_eyes1_png";
        
        //显示闭眼
        egret.setTimeout(()=>{
            //显示眼睛动画
            this.img_eyes.source = "icon_ch_eyes2_png";
            
            //显示开眼
            egret.setTimeout(() => {
                //显示眼睛动画
                this.img_eyes.source = "icon_ch_eyes0_png";  
            },this,200);
        },this,50);
    }
}
