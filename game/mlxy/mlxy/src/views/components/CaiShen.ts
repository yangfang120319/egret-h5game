/**
 *
 * @财神动画
 *
 */
class CaiShen extends eui.Component {
    //定义变量
    private img_yun: eui.Image;
    private img_meimao: eui.Image;
    private com_left: eui.Component;
    private com_right: eui.Component;
    private _tween_left: egret.Tween = null;
    private _tween_right: egret.Tween = null;
    private _tween_yun_x: egret.Tween = null;
    private _tween_yun_y: egret.Tween = null;
    private _tween_meimao: egret.Tween = null;

    //定义界面
    public constructor() {
        super();

        //定义界面
        this.skinName = CaiShenSkin;
    }
    
    //初始化界面
    public info(): void {
        //帽子动画
        this._tween_left = egret.Tween.get(this.com_left,{ loop: true }).to({ rotation: 10 },500).to({ rotation: 0 },500);
        this._tween_right = egret.Tween.get(this.com_right,{ loop: true }).to({ rotation: -10 },500).to({ rotation: 0 },500);
        
        //云动画
        this._tween_yun_x = egret.Tween.get(this.img_yun,{ loop: true }).to({ scaleX: 1.35 },1000).to({ scaleX: 1.5 },1000)
        this._tween_yun_y = egret.Tween.get(this.img_yun,{ loop: true }).to({ scaleY: 1.35 },1000).to({ scaleY: 1.5 },1000)
        
        //眉毛动画
        this._tween_meimao = egret.Tween.get(this.img_meimao,{ loop: true }).
            to({ y: 85 },60).to({ y: 95 },100).wait(100).
            to({ y: 85 },60).to({ y: 95 },100).wait(100).
            to({ y: 85 },60).to({ y: 95 },100).wait(2000);
    }
    
    //清除界面
    public clean():void{
        //判断停止
        if(this._tween_left) {
            this._tween_left.setPaused(true);
            this._tween_left = null;
        } 
        if(this._tween_right) {
            this._tween_right.setPaused(true);
            this._tween_right = null;
        } 
        if(this._tween_yun_x) {
            this._tween_yun_x.setPaused(true);
            this._tween_yun_x = null;
        } 
        if(this._tween_yun_y) {
            this._tween_yun_y.setPaused(true);
            this._tween_yun_y = null;
        }
        if(this._tween_meimao) {
            this._tween_meimao.setPaused(true);
            this._tween_meimao = null;
        }
    }
    
    
    
    
}
