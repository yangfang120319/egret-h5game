/**
 *
 * @author 
 *
 */
class ScenePK extends basic.SceneBase {
    //定义变量
    private g_cd: eui.Group;
    private g_title: eui.Group;
    private img_xunzhang: eui.Image;
    private com_jian0: eui.Component;
    private com_jian1: eui.Component;
    private _tween_y: egret.Tween = null;
    private _tween_xunzhang_alpha: egret.Tween = null;
    private _tween_jian_alpha0: egret.Tween = null;
    private _tween_jian_rotation0: egret.Tween = null;
    private _tween_jian_alpha1: egret.Tween = null;
    private _tween_jian_rotation1: egret.Tween = null;
    private _tween_jian_x0: egret.Tween = null;
    private _tween_jian_x1: egret.Tween = null;
    private _timer_cd: egret.Timer = null;
    private cd_num: number = 0;
    private cd_image: eui.Image[] = [];
    private _tween_cd_x: egret.Tween[] = [];
    private _tween_cd_y: egret.Tween[] = [];
    private _tween_cd_alpha: egret.Tween[] = [];
    private _tween_cd_rotation: egret.Tween[] = [];
    
    //定义界面
    public constructor() {
        super();

        //定义界面
        this.skinName = ScenePKSkin;
	}
	
    //显示前
    beforeShow(params: any = null): void {
        //清除界面
        this.clean();
        
        //开始动画
        this.start();
    }

    //隐藏前
    beforeHide(params: any = null): void {
        //清除界面
        this.clean();
    }
	
    //开始动画
    private start(): void {
        //判断显示动画
        this._tween_y = egret.Tween.get(this.g_title).to({ y: 280 },300,egret.Ease.backOut);
        this._tween_xunzhang_alpha = egret.Tween.get(this.img_xunzhang).wait(200).to({ alpha: 1 },500);
        this._tween_jian_alpha0 = egret.Tween.get(this.com_jian0).wait(500).to({ alpha: 1 },400);
        this._tween_jian_alpha1 = egret.Tween.get(this.com_jian1).wait(500).to({ alpha: 1 },400);
        this._tween_jian_x0 = egret.Tween.get(this.com_jian0).wait(700).to({ x: 230 },500,egret.Ease.backOut);
        this._tween_jian_x1 = egret.Tween.get(this.com_jian1).wait(700).to({ x: 415 },500,egret.Ease.backOut);
        this._tween_jian_rotation0 = egret.Tween.get(this.com_jian0).wait(700).to({ rotation: 0 },500,egret.Ease.backOut);
        this._tween_jian_rotation1 = egret.Tween.get(this.com_jian1).wait(700).to({ rotation: 0 },500,egret.Ease.backOut);
        
        //显示彩带动画
        for(var i: number = 0;i < 6;i++) {
            //显示彩带动画
            this.showCaiDaiAction(this.cd_num);
            this.cd_num += 1;
        }
        
        //开始掉落
        this._timer_cd=new egret.Timer(600);
        this._timer_cd.addEventListener(egret.TimerEvent.TIMER,this.onShowCD,this);
        this._timer_cd.start();
    }
    
    //显示彩带
    private onShowCD(e:egret.TimerEvent):void{
        //显示彩带动画
        this.showCaiDaiAction(this.cd_num);
        this.cd_num += 1;
    }
    
    //显示彩带动画
    private showCaiDaiAction(_num:number):void{
        //定义变量
        var img_cd: eui.Image = new eui.Image();
        var move_time: number = 9000 + Math.random() * 5000;
        
        //定义彩带
        img_cd.y = -30;
        img_cd.rotation = 0;
        img_cd.x = Math.random() * 750 - 300;
        img_cd.source = "icon_caipian" + Math.floor(Math.random() * 13).toString() + "_png";
            
        //显示界面
        this.cd_image[_num] = img_cd;
        this.g_cd.addChild(this.cd_image[_num]);
         
        //显示动画
        this._tween_cd_y[_num] = egret.Tween.get(this.cd_image[_num]).to({ y: this.height },move_time);
        this._tween_cd_rotation[_num] = egret.Tween.get(this.cd_image[_num],{ loop: true }).to({ rotation: 360 },20000)
        this._tween_cd_alpha[_num] = egret.Tween.get(this.cd_image[_num]).wait(move_time - 4000).to({ alpha: 0 },1000);
        this._tween_cd_x[_num] = egret.Tween.get(this.cd_image[_num]).
            to({ x: img_cd.x + 250 },move_time - 5000).
            to({ x: img_cd.x + 300 + Math.random() * 100 },5000);
    }
    
    //清除
    private clean(): void {
        //隐藏界面
        this.g_title.y = -170;
        this.img_xunzhang.alpha = 0;
        this.com_jian0.alpha = 0;
        this.com_jian1.alpha = 0;
        this.com_jian0.rotation = -30;
        this.com_jian1.rotation = 30;
        this.com_jian0.x = 180;
        this.com_jian1.x = 465;

        //停止动画
        if(this._tween_y) {
            this._tween_y.setPaused(true);
            this._tween_y = null;
        }
        if(this._tween_xunzhang_alpha) {
            this._tween_xunzhang_alpha.setPaused(true);
            this._tween_xunzhang_alpha = null;
        }
        if(this._tween_jian_alpha0) {
            this._tween_jian_alpha0.setPaused(true);
            this._tween_jian_alpha0 = null;
        }
        if(this._tween_jian_rotation0) {
            this._tween_jian_rotation0.setPaused(true);
            this._tween_jian_rotation0 = null;
        }
        if(this._tween_jian_alpha1) {
            this._tween_jian_alpha1.setPaused(true);
            this._tween_jian_alpha1 = null;
        }
        if(this._tween_jian_rotation1) {
            this._tween_jian_rotation1.setPaused(true);
            this._tween_jian_rotation1 = null;
        }
        if(this._tween_jian_x0) {
            this._tween_jian_x0.setPaused(true);
            this._tween_jian_x0 = null;
        }
        if(this._tween_jian_x1) {
            this._tween_jian_x1.setPaused(true);
            this._tween_jian_x1 = null;
        }
        
        //停止动画
        if(this._timer_cd){
            this._timer_cd.stop();
            this._timer_cd.removeEventListener(egret.TimerEvent.TIMER,this.onShowCD,this);
            this._timer_cd = null;
        }
        
        //停止动画
        for(var i:number=0;i<this.cd_num;i++){
            if(this._tween_cd_y[i]) {
                this._tween_cd_y[i].setPaused(true);
                this._tween_cd_y[i] = null;
            }
            if(this._tween_cd_x[i]) {
                this._tween_cd_x[i].setPaused(true);
                this._tween_cd_x[i] = null;
            }
            if(this._tween_cd_rotation[i]) {
                this._tween_cd_rotation[i].setPaused(true);
                this._tween_cd_rotation[i] = null;
            }
            if(this._tween_cd_alpha[i]) {
                this._tween_cd_alpha[i].setPaused(true);
                this._tween_cd_alpha[i] = null;
            }
            this.g_cd.removeChild(this.cd_image[i]);
        }
        this.cd_num = 0;
        this.cd_image = [];
        this._tween_cd_x = [];
        this._tween_cd_y = [];
        this._tween_cd_alpha = [];
        this._tween_cd_rotation = [];
    }
}
