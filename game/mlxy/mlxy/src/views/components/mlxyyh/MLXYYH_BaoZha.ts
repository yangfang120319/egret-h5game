/**
 *
 * @马来西亚银行
 *
 */
class MLXYYH_BaoZha extends eui.Component {
    //定义变量
    private img_bao1: eui.Image;
    private img_bao2: eui.Image;
    private now_action: number;
    private timer_action: egret.Timer = null;
    
    //初始化
    createChildren(): void {
        super.createChildren();
    }
    
    //开始动画
    start():void{
        //清空
        this.clean();
        
        //显示界面
        this.now_action = 0;
        
        //播放声音
        basic.SoundManager.instance.playEffect("sound_mlxyyh_zha_mp3");
        
        //显示图片
        this.img_bao1.source = "icon_mlxyyh_bz" + this.now_action.toString() + "_png";

        //显示动画
        this.timer_action = new egret.Timer(70,7);
        this.timer_action.addEventListener(egret.TimerEvent.TIMER,this.showActionSpecialTimer,this);
        this.timer_action.addEventListener(egret.TimerEvent.TIMER_COMPLETE,this.showActionSpecialComplete,this);
        this.timer_action.start();
    }
    
    //动作显示
    private showActionSpecialTimer(e: egret.TimerEvent): void {
        //数据赋值
        this.now_action += 1;

        //判断显示图片
        if(this.now_action < 5) {
            //显示图片
            this.img_bao1.source = "icon_mlxyyh_bz" + this.now_action.toString() + "_png";
        }
        if(this.now_action >= 2 && this.now_action < 8) {
            //显示图片
            this.img_bao2.source = "icon_mlxyyh_bao" + Number(this.now_action-2).toString() + "_png";
        }
    }

    //动画结束
    private showActionSpecialComplete(e: egret.TimerEvent): void {
        //停止
        if(this.timer_action) {
            this.timer_action.stop();
            this.timer_action.removeEventListener(egret.TimerEvent.TIMER,this.showActionSpecialTimer,this);
            this.timer_action.removeEventListener(egret.TimerEvent.TIMER_COMPLETE,this.showActionSpecialComplete,this);
            this.timer_action = null;
        }
        
        //清空
        this.clean();
    }
    
    //清空
    clean(): void {
        //清空图片
        this.img_bao1.source = "";
        this.img_bao2.source = "";
    }
}
