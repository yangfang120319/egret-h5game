/**
 *
 * @财神飞行动画
 *
 */
class CaiShen_Flay extends eui.Component {
    //定义变量
    private caishen: CaiShen;
    private _tween_x: egret.Tween = null;
    private now_speed: number = -10;
    private timer_waiting: egret.Timer;
    private callback: Function;
    
    //定义界面
    public constructor() {
        super();
    }
    
    //初始化界面
    public info(_callback:Function):void{
        //数据赋值
        this.callback=_callback;
        
        //显示财神
        this.caishen = new CaiShen();

        //定义位置
        this.caishen.y = 50;
        this.caishen.x = 1472;
        this.caishen.scaleX = 0.5;
        this.caishen.scaleY = 0.5;
        
        //显示界面
        this.addChild(this.caishen);
        this.caishen.info();
        
        //开始显示动画
        this.showAction();
    }
    
    //开始动画
    public showAction():void{
        //初始化界面
        this.caishen.x = 1472;
        this.caishen.skewY = 0;
        
        //开始显示动画
        this._tween_x = egret.Tween.get(this.caishen).to({ x: 0 },800,egret.Ease.quadOut).call(()=>{
            this.caishen.x = 250;
            this.caishen.skewY = 180;
            this._tween_x = egret.Tween.get(this.caishen).to({ x: 1024 },6000).call(() => {
                this.caishen.x = 1024-250;
                this.caishen.skewY = 0;
                this._tween_x = egret.Tween.get(this.caishen).to({ x: 0 },6000).call(() => {
                    this.caishen.x = 250;
                    this.caishen.skewY = 180;
                    this._tween_x = egret.Tween.get(this.caishen).to({ x: 1472 + 250 },800).call(()=>{
                        //注销事件
                        this.removeEventListener(egret.Event.ENTER_FRAME,this.onShowGold,this);
                        
                        //停止动画
                        this.caishen.clean();
                        
                        //移除界面
                        this.removeChild(this.caishen);
                        
                        //显示回调函数
                        this.callback();
                    });;
                });
            });
        });
        
        //掉金币
        this.addEventListener(egret.Event.ENTER_FRAME,this.onShowGold,this);
    }
    
    //判断显示金币
    private onShowGold(e: egret.Event): void {
       //显示金币
        this.showGold();
    }
    
    //显示金币
    private showGold():void{
        //定义变量
        var img_gold: eui.Image = new eui.Image();
        var now_speed: number = Math.random() * 2000 + 1000;

        //定义金币
        img_gold.y = 200;
        img_gold.alpha = 0;
        img_gold.source = "icon_gold_png";
        if(this.caishen.skewY == 0) {
            img_gold.x = this.caishen.x + Math.random() * 250 - 30;
        }
        else {
            img_gold.x = this.caishen.x - Math.random() * 250;
        }
        this.addChild(img_gold);
        
        var _tween_alpha: egret.Tween = egret.Tween.get(img_gold).to({ alpha: 1 },500).wait(now_speed-1000).to({ alpha: 0 },500)
        var _tween_y: egret.Tween = egret.Tween.get(img_gold).to({ y: 1000 },now_speed).call(()=>{
            this.removeChild(img_gold);
        });
    }
    
    //显示界面
    private onShow(e: egret.TimerEvent):void{
        //判断显示界面
        if(this.now_speed < 0) {
            this.caishen.x = this.caishen.x + this.now_speed;
            
            //判断显示界面
            if(this.caishen.x < 0) {
                this.now_speed = 10;
                this.caishen.x = 250;
                this.caishen.skewY = 180;
            }
        }
        else{
            this.caishen.x = this.caishen.x + this.now_speed;
            
            //判断显示界面
            if(this.caishen.x > 1024) {
                this.now_speed = -10;
                this.caishen.skewY = 0;
                this.caishen.x = 1024 - 250;
            }
        }
    }
}
