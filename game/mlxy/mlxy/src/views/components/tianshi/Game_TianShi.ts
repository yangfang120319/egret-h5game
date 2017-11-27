/**
 *
 * @天使
 *
 */
class Game_TianShi extends eui.Component {
    //定义变量
    private img_body: eui.Image;
    private com_light: eui.Component;
    private eyes: Game_TianShi_Eyes;
    private com_chibang0: eui.Component;
    private com_chibang1: eui.Component;
    private _tween_light_y: egret.Tween = null;
    private _tween_light_scaleX: egret.Tween = null;
    private _tween_light_scaleY: egret.Tween = null;
    private _tween_light_alpha: egret.Tween = null;
    private _tween_chibang_rotation0: egret.Tween = null;
    private _tween_chibang_rotation1: egret.Tween = null;
    private chibang_rotation: number=10;
    private chibang_start_rotation: number=13;
    
    //初始化
    createChildren(): void {
        super.createChildren();
    }
    
    //天使初始化
    info(){
        //停止动画
        this.stop();
        
        //数据赋值
        this.com_chibang0.rotation = -this.chibang_start_rotation;
        this.com_chibang1.rotation = this.chibang_start_rotation;
    }
    
    //开始动画
    start(_time: number):void{
        //开始眨眼睛
        this.eyes.start();
        
        //开始光动画
        this.startLightAction();
        
        //显示翅膀动画
        this.startChiBangAction(_time);
    }
    
    //开始光动画
    private startLightAction():void{
        //定义变量
        var show_time: number = 1200;
        
        //显示光环
        this.com_light.y = 58;
        this.com_light.alpha = 1;
        this.com_light.scaleX = 1;
        this.com_light.scaleY = 1;
        this._tween_light_scaleX = egret.Tween.get(this.com_light,{ loop: true }).
            to({ scaleX: 0.8 },show_time).
            to({ scaleX: 1 },show_time);
        this._tween_light_scaleY = egret.Tween.get(this.com_light,{ loop: true }).
            to({ scaleY: 0.94 },show_time).
            to({ scaleY: 1 },show_time);
        this._tween_light_alpha = egret.Tween.get(this.com_light,{ loop: true }).
            to({ alpha: 0.6 },show_time).
            to({ alpha: 1 },show_time);
        this._tween_light_y = egret.Tween.get(this.com_light,{ loop: true }).
            to({ y: 62 },show_time).
            to({ y: 58 },show_time);
    }
    
    //停止光动画
    private stopLightAction(): void {
        //停止动画
        if(this._tween_light_scaleX) {
            this._tween_light_scaleX.setPaused(true);
            this._tween_light_scaleX = null;
        }
        if(this._tween_light_scaleY) {
            this._tween_light_scaleY.setPaused(true);
            this._tween_light_scaleY = null;
        }
        if(this._tween_light_alpha) {
            this._tween_light_alpha.setPaused(true);
            this._tween_light_alpha = null;
        }
        if(this._tween_light_y) {
            this._tween_light_y.setPaused(true);
            this._tween_light_y = null;
        }
    }
    
    //开始翅膀动画
    startChiBang(_time:number): void {
        //开始动画
        this._tween_chibang_rotation0 = egret.Tween.get(this.com_chibang0).
            to({ rotation: this.chibang_rotation },_time);
        this._tween_chibang_rotation1 = egret.Tween.get(this.com_chibang1).
            to({ rotation: -this.chibang_rotation },_time);
    }
    
    //初始化界面
    infoChiBang():void{
        this.com_chibang0.rotation = this.chibang_rotation;
        this.com_chibang1.rotation = -this.chibang_rotation;
    }
    
    //开始翅膀动画
    private startChiBangAction(_time:number): void {
        //开始动画
        this._tween_chibang_rotation0 = egret.Tween.get(this.com_chibang0,{ loop: true }).
            to({ rotation: -this.chibang_rotation },_time).
            to({ rotation: this.chibang_rotation },_time);
        this._tween_chibang_rotation1 = egret.Tween.get(this.com_chibang1,{ loop: true }).
            to({ rotation: this.chibang_rotation },_time).
            to({ rotation: -this.chibang_rotation },_time);
    }
    
    //停止翅膀动画
    private stopChiBangAction(): void {
        if(this._tween_chibang_rotation0) {
            this._tween_chibang_rotation0.setPaused(true);
            this._tween_chibang_rotation0 = null;
        }
        if(this._tween_chibang_rotation1) {
            this._tween_chibang_rotation1.setPaused(true);
            this._tween_chibang_rotation1 = null;
        }
    }
    
    //停止动画
    stop(): void {
        //停止眨眼睛
        this.eyes.stop();

        //停止光动画
        this.stopLightAction();

        //停止翅膀动画
        this.stopChiBangAction();
    }
}
