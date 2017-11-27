/**
 *
 * @通杀通赔
 *
 */
class EBG_SpecialResult extends eui.Component {
    //定义变量
    private img_win: eui.Image;
    private img_win_add: eui.Image;
    private img_lose: eui.Image;
    private _tween_scaleY: egret.Tween = null;
    private _tween_alpha: egret.Tween = null;

    //初始化
    createChildren(): void {
        super.createChildren();
        
        //隐藏界面
        this.visible = false;
    }
    
    //显示通杀
    public showWin(_callback: Function): void {
        //显示界面
        this.visible = true;
        this.img_win.alpha = 0;
        this.img_win_add.alpha = 0;
        this.img_win_add.scaleX = 1;
        this.img_win_add.scaleY = 1;
        this.img_win.visible = true;
        this.img_win_add.visible = true;

        //显示状态
        this.currentState = "win";

        //播放声音
        basic.SoundManager.instance.playEffect("sound_ebg_tongsha_mp3");

        //开始显示
        var _tween_alpha1: egret.Tween = egret.Tween.get(this.img_win).to({ alpha: 1 },50);
        var _tween_alpha2: egret.Tween = egret.Tween.get(this.img_win_add).wait(20).to({ alpha: 1 },30).call(() => {
            //显示动画
            var _tween_alpha3: egret.Tween = egret.Tween.get(this.img_win_add).to({ alpha: 0.15 },150).to({ alpha: 0 },300);
            var _tween_scaleX: egret.Tween = egret.Tween.get(this.img_win_add).to({ scaleX: 1.25 },150).to({ scaleX: 2 },300);
            this._tween_scaleY = egret.Tween.get(this.img_win_add).to({ scaleY: 1.25 },150).to({ scaleY: 2 },300).wait(1000).call(() => {
                //回调函数
                _callback();

                //清除
                this.clean();
            });
        });
    }

    //显示通赔
    public showLose(_callback: Function): void {
        //显示界面
        this.visible = true;
        this.img_lose.alpha = 0;
        this.img_lose.visible = true;

        //显示状态
        this.currentState = "lose";

        //播放声音
        basic.SoundManager.instance.playEffect("sound_ebg_tongpei_mp3");

        //开始显示
        this._tween_alpha = egret.Tween.get(this.img_lose).to({ alpha: 1 },1000).wait(500).call(() => {
            //回调函数
            _callback();
            
            //清除
            this.clean();
        });
    }
    
    //清除界面
    private clean(): void {
        //判断停止缓动
        if(this._tween_scaleY) {
            this._tween_scaleY.setPaused(true);
        }
        if(this._tween_alpha) {
            this._tween_alpha.setPaused(true);
        }

        //隐藏界面
        this.visible = false;
    }
}
