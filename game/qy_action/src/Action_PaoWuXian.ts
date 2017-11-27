/**
 *
 * @author 
 *
 */
class Action_PaoWuXian extends eui.Component {
    //定义变量
    private speed_x: number;
    private speed_y: number;
    private speed_add_y: number;
    private img_star: eui.Image;
    private timer_action: egret.Timer = null;
    private _tween_alpha: egret.Tween = null;
    private callback: Function;
    private scale_rate: number;
    
    //初始化
    createChildren(): void {
        super.createChildren();
	}
	
    //开始动画
    start(_callback: Function): void {
        //定义变量
        this.scale_rate = Math.random() * 0.6 + 0.3;
        
        //开始动画
        this.callback = _callback;
        this.img_star = new eui.Image();
        this.img_star.source = "icon_star1_png";
        this.addChild(this.img_star);
        
        //定义位置
        this.img_star.x = -this.scale_rate * this.img_star.width / 2;
        this.img_star.y = -this.scale_rate * this.img_star.height / 2;
        
        //判断显示
        if(Math.random() < 0.5) {
            this.speed_x = 10 + Math.random() * 5; 
        }
        else{
            this.speed_x = -10 - Math.random() * 5; 
        }
        this.speed_y = -20 - Math.random() * 10;
        this.speed_add_y = 1 + Math.random() * 1.2;
        
        //判断显示
        this.img_star.scaleX = this.scale_rate;
        this.img_star.scaleY = this.scale_rate;
        
        //开始移动
        this.timer_action = new egret.Timer(50);
        this.timer_action.addEventListener(egret.TimerEvent.TIMER,this.onAction,this);
        this.timer_action.start();
    }
	
    //开始动画
    private onAction(e:egret.TimerEvent):void{
        //数据复制
        this.speed_y += this.speed_add_y;
        
        //显示位置
        this.img_star.x = this.img_star.x + this.speed_x;
        this.img_star.y = this.img_star.y + this.speed_y;
        
        //判断消失
        if(this._tween_alpha == null && this.speed_y > 0) {
            this._tween_alpha = egret.Tween.get(this.img_star).to({ alpha: 0 },400);
        }
        
        //判断停止
        if(this.img_star.x + this.x < -this.scale_rate * this.img_star.width || this.img_star.x + this.x > 640 + this.scale_rate * this.img_star.width) {
            //开始移动
            if(this.timer_action){
                this.timer_action.stop();
                this.timer_action.removeEventListener(egret.TimerEvent.TIMER,this.onAction,this);
                this.timer_action = null;
            }
            
            //显示回调函数
            if(this.callback){
                this.callback();
            }
        }
    }
	
}
