/**
 马来西亚银行闪电 
 *
 */
class MLXYYH_ShanDian extends eui.Component {
    //定义变量
    private img_shan: eui.Image;
    private now_times: number;
    private play_times: number;
    private now_action: number;
    private timer_action: egret.Timer = null;
    private show_sound:number;
    
    //初始化
    createChildren(): void {
        super.createChildren();
    }
    
    //开始动画
    start(_times: number = 1,_sound:number=0): void {
        //清空
        this.clean();

        //显示界面
        this.now_times = 0;
        this.now_action = -1;
        this.show_sound = _sound;
        this.play_times = _times;
        
        //播放声音
        if(this.show_sound == 1) {
            basic.SoundManager.instance.playEffect("sound_mlxyyh_shandian_mp3");
        }
        
        //显示图片
        this.img_shan.source = "icon_mlxyyh_sd0_png";

        //显示动画
        this.timer_action = new egret.Timer(50,16);
        this.timer_action.addEventListener(egret.TimerEvent.TIMER,this.showActionSpecialTimer,this);
        this.timer_action.addEventListener(egret.TimerEvent.TIMER_COMPLETE,this.showActionSpecialComplete,this);
        this.timer_action.start();
    }
    
    //动作显示
    private showActionSpecialTimer(e: egret.TimerEvent): void {
        //数据赋值
        this.now_action += 1;
        
        //显示图片
        this.img_shan.source = "icon_mlxyyh_sd" + this.now_action.toString() + "_png";
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
        
        //数据赋值
        this.now_times += 1;
        
        //判断显示
        if(this.now_times < this.play_times) {
            //显示界面
            this.now_action = -1;

            //显示图片
            this.img_shan.source = "icon_mlxyyh_sd0_png";
            
            //播放声音
            if(this.show_sound == 1) {
                basic.SoundManager.instance.playEffect("sound_mlxyyh_shandian_mp3");
            }
            
            //显示动画
            this.timer_action = new egret.Timer(60,16);
            this.timer_action.addEventListener(egret.TimerEvent.TIMER,this.showActionSpecialTimer,this);
            this.timer_action.addEventListener(egret.TimerEvent.TIMER_COMPLETE,this.showActionSpecialComplete,this);
            this.timer_action.start();
        }
        else {
            //清空
            this.clean();
        }
    }
    
    //清空
    clean(): void {
        this.img_shan.source = "";
    }
}
