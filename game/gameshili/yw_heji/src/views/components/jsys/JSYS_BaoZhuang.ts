/**
 *
 * @爆庄
 *
 */
class JSYS_BaoZhuang extends eui.Component {
    //定义变量
    private img_bao: eui.Image;
    private img_back: eui.Image;
    private _tween_alpha: egret.Tween = null;
    private _tween_scaleX: egret.Tween = null;
    private _tween_scaleY: egret.Tween = null;
    private _timer_action: egret.Timer = null;
    private _tween_alpha_bao: egret.Tween = null;
    private now_action: number = 0;
    
    //初始化
    createChildren(): void {
        super.createChildren();
        
        //清除界面
        this.clean();
        
        //注册事件
        basic.Dispatcher.addListener(EventNames.JSYS_BAOZHUANG,this.onBaoZhuang,this);
	}
	
    //显示爆庄效果
    private onBaoZhuang(e:egret.Event): void {
        //清除界面
        this.clean();
        
        //显示界面
        this.visible = true;
        
        //显示动画
        this._tween_alpha = egret.Tween.get(this.img_back).wait(100).to({ alpha: 1 },200);
        this._tween_scaleX = egret.Tween.get(this.img_back).wait(100).to({ scaleX: 0.7 },200);
        this._tween_scaleY = egret.Tween.get(this.img_back).wait(100).to({ scaleY: 0.7 },200);
        
        //开始动画
        this._timer_action = new egret.Timer(100,5);
        this._timer_action.addEventListener(egret.TimerEvent.TIMER,this.onAction,this);
        this._timer_action.addEventListener(egret.TimerEvent.TIMER_COMPLETE,this.onActionComplete,this);
        this._timer_action.start();
    }
	
    //开始动画
    private onAction(e:egret.TimerEvent):void{
        //显示动画
        this.now_action += 1;
        this.img_bao.source = "icon_jsys_bao" + this.now_action.toString() + "_png";
    }
    
    //动画结束
    private onActionComplete(e:egret.TimerEvent):void{
        //停止
        if(this._timer_action){
            this._timer_action.stop();
            this._timer_action.removeEventListener(egret.TimerEvent.TIMER,this.onAction,this);
            this._timer_action.removeEventListener(egret.TimerEvent.TIMER_COMPLETE,this.onActionComplete,this);
            this._timer_action = null;
        }
        
        //显示动画
        this._tween_alpha_bao = egret.Tween.get(this.img_bao).to({ alpha: 0 },100).wait(3000).call(()=>{
            //清除界面
            this.clean();
        });
    }
    
	//清除界面
	clean():void{
        //显示界面
        this.now_action = 0;
        this.visible = false;
        this.img_bao.alpha = 1;
        this.img_back.alpha = 0;
        this.img_back.scaleX = 0;
        this.img_back.scaleY = 0;
        this.img_bao.source = "icon_jsys_bao" + this.now_action.toString()+"_png";
        
        //判断停止
        if(this._tween_alpha) {
            this._tween_alpha.setPaused(true);
            this._tween_alpha = null;
        }
        if(this._tween_scaleX) {
            this._tween_scaleX.setPaused(true);
            this._tween_scaleX = null;
        }
        if(this._tween_scaleY) {
            this._tween_scaleY.setPaused(true);
            this._tween_scaleY = null;
        }
        if(this._tween_alpha_bao) {
            this._tween_alpha_bao.setPaused(true);
            this._tween_alpha_bao = null;
        }
        
        //判断显示
        if(this._timer_action) {
            this._timer_action.stop();
            this._timer_action.removeEventListener(egret.TimerEvent.TIMER,this.onAction,this);
            this._timer_action.removeEventListener(egret.TimerEvent.TIMER,this.onActionComplete,this);
            this._timer_action = null;
        }
	}
}
