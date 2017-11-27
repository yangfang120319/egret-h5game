/**
 *
 * @筹码 
 *
 */
class EBG_Chip extends eui.Component {
    //定义变量
    private arr_Chip: eui.Button[] = [];
    private img_choose: eui.Image;
    private _tween_alpha: egret.Tween = null;
    
    //初始化
    createChildren(): void {
        super.createChildren();
        
        //数据赋值
        for(var i: number = 0;i < 5;i++) {
            //定义变量
            var btn_chip: eui.Button = this["btn_chip" + i];

            //数据赋值
            this.arr_Chip[i] = btn_chip;
        }

        //注册按钮
        this.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onThisBtn,this)
    }
    
    //初始化
    info():void{
        //显示筹码
        this.showBtn();
        
        //开始动画
        if(this._tween_alpha) {
            this._tween_alpha.setPaused(false);
            this._tween_alpha = null;
        }
        else {
            this._tween_alpha = egret.Tween.get(this.img_choose,{ loop: true }).
                wait(500).to({ alpha: 0.2 },1000).
                to({ alpha: 1 },500);
        }
    }
    
    //清除
    clean(): void {
        if(this._tween_alpha) {
            this._tween_alpha.setPaused(true);
        }
    }
    
    //显示按钮
    private showBtn(): void {
        //当前显示
        var show_num: number = String(GameData.Game_BeiLv).length - 5;
        
        //判断显示按钮
        this.img_choose.x = -12.5 + 84 * show_num;
    }

    //按钮
    private onThisBtn(e: egret.TouchEvent): void {
        //数据赋值
        if(e.target.name != "") {
            //播放声音
            basic.SoundManager.instance.playEffect("sound_btn_mp3");
            
            //当前显示
            var show_num: number = String(GameData.Game_BeiLv).length - 5;
            
            //数据赋值
            if(show_num != Math.floor(e.target.name)) {
                //定义变量
                var now_beilv: string = "1";
                
                //数据赋值
                for(var i: number = 0;i < Math.floor(e.target.name) + 4;i++) {
                    now_beilv += "0";
                }
                GameData.Game_BeiLv = Number(now_beilv);

                //显示按钮
                this.showBtn();
            }
        }
    }
}
