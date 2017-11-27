/**
 *
 * @天使所有动画
 *
 */
class Game_TianShiTotal extends eui.Component {
    //定义变量
    private tianshi: Game_TianShi;
    private tianshi_left: Game_TianShi;
    private tianshi_right: Game_TianShi;
    private bao_left: Game_TianShi_Bao;
    private bao_right: Game_TianShi_Bao;
    private shan: Game_TianShi_Shan[] = [];
    private _tween_shan_y: egret.Tween[] = [];
    private _tween_tianshi_y: egret.Tween = null;
    private _tween_tianshi_alpha: egret.Tween = null;
    private _tween_caihong_alpha: egret.Tween = null;
    private _tween_tianshi_left_y: egret.Tween = null;
    private _tween_tianshi_left_alpha: egret.Tween = null;
    private _tween_tianshi_right_y: egret.Tween = null;
    private _tween_tianshi_right_alpha: egret.Tween = null;
    private img_caihong: eui.Image;
    private callback: Function;
    
    //定义界面
    public constructor() {
        super();
        
        //定义界面
        this.skinName = Game_TianShiTotalSkin;
        
        //数据赋值
        for(var i: number = 0;i < 9;i++) {
            //定义变量
            var now_shan: Game_TianShi_Shan = this["shan" + i];
            
            //数据赋值
            this.shan[i] = now_shan;
            this._tween_shan_y[i] = null;
        }
        
        //显示宽度
        this.width = basic.StageProxy.width;
    }
    
    //开始动画
    start(_callback:Function):void{
        //数据赋值
        this.callback = _callback;

        //停止动画
        this.stop();
        
        //显示彩虹动画
        this.img_caihong.alpha = 0;
        this._tween_caihong_alpha = egret.Tween.get(this.img_caihong).
            to({ alpha: 1 },2000);
        
        //显示闪光动画
        this.startShan();
        
        //显示天使动画
        this.tianshi.info();
        this.tianshi.y = -200;
        this.tianshi.alpha = 0;
        this._tween_tianshi_alpha = egret.Tween.get(this.tianshi).wait(900).to({ alpha: 1 },900);
        this._tween_tianshi_y = egret.Tween.get(this.tianshi).to({ y: 10 },1800).call(()=>{
            this.tianshi.startChiBang(1200);
            this._tween_tianshi_y = egret.Tween.get(this.tianshi).to({ y: -40 },1200).call(() => {
                this.tianshi.start(1800);
                this._tween_tianshi_y = egret.Tween.get(this.tianshi,{ loop: true }).
                    to({ y: -20 },1800).to({ y: -40 },1800)
            });
        });
        
        egret.setTimeout(() => {
            //播放声音
            basic.SoundManager.instance.playEffect("sound_ch_mp3");
        },this,1000);
        
        //显示左边天使
        egret.setTimeout(() => {
            //显示爆炸动画
            this.bao_left.start(60,8);
            
            //播放声音
            basic.SoundManager.instance.playEffect("sound_ch_tx_mp3");
            
            //显示天使
            this.tianshi_left.y = 62;
            this.tianshi_left.infoChiBang();
            this._tween_tianshi_left_alpha = egret.Tween.get(this.tianshi_left).wait(350).to({ alpha: 1 },700).call(()=>{
                this.tianshi_left.start(1200);
                this._tween_tianshi_left_y = egret.Tween.get(this.tianshi_left,{ loop: true }).
                    to({ y: 85 },1200).
                    to({ y: 62 },1200);
            });
        },this,3000);
        
        //显示右边天使
        egret.setTimeout(() => {
            //显示爆炸动画
            this.bao_right.start(60,8);
            
            //播放声音
            basic.SoundManager.instance.playEffect("sound_ch_tx_mp3");
            
            //显示天使
            this.tianshi_right.y = 52;
            this.tianshi_right.infoChiBang();
            this._tween_tianshi_right_alpha = egret.Tween.get(this.tianshi_right).wait(350).to({ alpha: 1 },700).call(() => {
                this.tianshi_right.start(1200);
                this._tween_tianshi_right_y = egret.Tween.get(this.tianshi_right,{ loop: true }).
                    to({ y: 75 },1200).
                    to({ y: 52 },1200);
            });
        },this,4000);
        
        //退出函数
        egret.setTimeout(() => {
            //停止动画
            this.stop();
            
            //显示回调函数
            this.callback();
        },this,10000);
    }
    
     //显示闪光动画
    private startShan():void{
        //显示闪光动画
        for(var i: number = 0;i < 9;i++) {
            this.shan[i].y = 18;
            this.showShanAction(i);
        }
    }
    
    //显示闪光动画
    private showShanAction(_num:number):void{
        //显示界面
        this._tween_shan_y[_num] = egret.Tween.get(this.shan[_num]).wait(Math.random() * 500 + 500).call(() => {
            this.shan[_num].visible = true;
            this.shan[_num].start(_num % 2,60);
            this._tween_shan_y[_num] = egret.Tween.get(this.shan[_num]).
            to({ y: 200 + Math.random() * 50 },1200 + Math.random() * 600).call(() => {
                //隐藏闪光
                this.shan[_num].stop();
                this.shan[_num].visible = false;
            });
        })
        
    }
    
    //停止动画
    stop():void{
        //停止彩虹
        this.img_caihong.alpha = 0;
        if(this._tween_caihong_alpha){
            this._tween_caihong_alpha.setPaused(true);
            this._tween_caihong_alpha = null;
        }
        
        //隐藏闪光
        for(var i: number = 0;i < 9;i++) {
            this.shan[i].visible = false;
            if(this._tween_shan_y[i]) {
                this._tween_shan_y[i].setPaused(true);
                this._tween_shan_y[i] = null;
            }
        }
        
        //停止天使
        this.tianshi.stop();
        this.tianshi.y = -200;
        this.tianshi.alpha = 0;
        if(this._tween_tianshi_alpha) {
            this._tween_tianshi_alpha.setPaused(true);
            this._tween_tianshi_alpha = null;
        }
        if(this._tween_tianshi_y) {
            this._tween_tianshi_y.setPaused(true);
            this._tween_tianshi_y = null;
        }
        if(this._tween_tianshi_left_alpha) {
            this._tween_tianshi_left_alpha.setPaused(true);
            this._tween_tianshi_left_alpha = null;
        }
        if(this._tween_tianshi_left_y) {
            this._tween_tianshi_left_y.setPaused(true);
            this._tween_tianshi_left_y = null;
        }
        if(this._tween_tianshi_right_alpha) {
            this._tween_tianshi_right_alpha.setPaused(true);
            this._tween_tianshi_right_alpha = null;
        }
        if(this._tween_tianshi_right_y) {
            this._tween_tianshi_right_y.setPaused(true);
            this._tween_tianshi_right_y = null;
        }
        this.tianshi_left.stop();
        this.tianshi_right.stop();
        this.tianshi_left.alpha = 0;
        this.tianshi_right.alpha = 0;
    }
}
