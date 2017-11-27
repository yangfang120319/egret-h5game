/**
 *
 * @加载动画
 *
 */
class Loading extends eui.Component {
    //定义变量
    private img_ma0: eui.Image;
    private img_ma1: eui.Image;
    private img_ma2: eui.Image;
    private img_star: eui.Image;
    private img_light1: eui.Image;
    private img_light2: eui.Image;
    private img_light3: eui.Image;
    private _tween_ma0: egret.Tween = null;
    private _tween_ma1: egret.Tween = null;
    private _tween_ma2: egret.Tween = null;
    private _tween_star: egret.Tween = null;
    private _tween_light1: egret.Tween = null;
    private _tween_light2: egret.Tween = null;
    private _tween_light3: egret.Tween = null;

    //初始化
    createChildren(): void {
        super.createChildren();
    }

    //开始动画
    startPlay(): void {
        //星星动画
        this.img_star.rotation = 0;
        this._tween_star = egret.Tween.get(this.img_star,{ loop: true }).
            to({ rotation: 360 },1000).
            set({ rotation: 0 });

        //显示灯动画
        this.img_light2.alpha = 1;
        this.img_light3.alpha = 1;
        this.img_light1.alpha = 0.3;
        this._tween_light1 = egret.Tween.get(this.img_light1,{ loop: true }).wait(200).
            set({ alpha: 1 },700).wait(200).
            set({ alpha: 0.3 },700);
        this._tween_light2 = egret.Tween.get(this.img_light2,{ loop: true }).wait(200).
            set({ alpha: 0.3 },700).wait(200).
            set({ alpha: 1 },700);
        this._tween_light3 = egret.Tween.get(this.img_light3,{ loop: true }).wait(200).
            set({ alpha: 0.3 },700).wait(200).
            set({ alpha: 1 },700);

        //显示马动画
        this.img_ma0.y = 236;
        this.img_ma1.y = 225;
        this.img_ma2.y = 214;
        this._tween_ma0 = egret.Tween.get(this.img_ma0,{ loop: true }).wait(100).
            to({ y: 214 },1600).wait(100).
            to({ y: 236 },1600);
        this._tween_ma1 = egret.Tween.get(this.img_ma1,{ loop: true }).
            to({ y: 236 },800).wait(100).
            to({ y: 214 },1600).wait(100).
            to({ y: 225 },800);
        this._tween_ma2 = egret.Tween.get(this.img_ma2,{ loop: true }).wait(100).
            to({ y: 236 },1600).wait(100).
            to({ y: 214 },1600);
    }

    //停止动画
    stopPlay(): void {
        if(this._tween_star) {
            this._tween_star.setPaused(true);
            this._tween_star = null;
        }
        if(this._tween_light1) {
            this._tween_light1.setPaused(true);
            this._tween_light1 = null;
        }
        if(this._tween_light2) {
            this._tween_light2.setPaused(true);
            this._tween_light2 = null;
        }
        if(this._tween_light3) {
            this._tween_light3.setPaused(true);
            this._tween_light3 = null;
        }
        if(this._tween_ma0) {
            this._tween_ma0.setPaused(true);
            this._tween_ma0 = null;
        }
        if(this._tween_ma1) {
            this._tween_ma1.setPaused(true);
            this._tween_ma1 = null;
        }
        if(this._tween_ma2) {
            this._tween_ma2.setPaused(true);
            this._tween_ma2 = null;
        }
    }
}