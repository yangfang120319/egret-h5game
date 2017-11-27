/**
 *
 * @二八杠麻将 
 *
 */
class EBG_Mahjong extends eui.Component {
    //定义变量
    private num_Mahjong_num: number;
    private num_Mahjong_value: number;
    private num_Mahjong_huase: number;
    private boo_isShow: Boolean = false;
    private img_mahjong: eui.Image;
    private img_back: eui.Image;

    //缓动事件
    private _tween_Mahjong: egret.Tween;

    //初始化
    createChildren(): void {
        super.createChildren();

        //显示界面
        this.showMahjongFace();
    }

    //显示牌
    public showMahjong(_mahjongnum: number) {
        //数据赋值
        this.num_Mahjong_huase = 1;
        this.num_Mahjong_num = _mahjongnum;
        this.num_Mahjong_value = this.num_Mahjong_num % 16;

        //显示牌
        this.img_mahjong.source = "icon_mahjong" + this.num_Mahjong_huase + "_" + this.num_Mahjong_value + "_png";
    }

    //打开麻将
    public openMahjong() {
        //数据赋值
        this.boo_isShow = true;

        //显示界面
        this.showMahjongFace();
    }

    //开牌动画
    public openMahjongAction(_callback: Function = null): void {
        //定义变量
        var num_doudong_fudu: number = 1;

        //定义位置
        this.img_back.x = 0;
        this.img_back.y = 0;
        
        //播放声音
        basic.SoundManager.instance.playEffect("sound_ebg_openmahjong_mp3");
        
        //显示动作
        this._tween_Mahjong = egret.Tween.get(this.img_back).to({ y: 5 },100).call(() => {
            //打开麻将
            this.openMahjong();

            //定义位置
            this.img_back.y = 0;

            //显示返回函数
            if(_callback) {
                egret.setTimeout(_callback,this,500);
            }
        });
    }

    //停止动画
    public stopAction(): void {
        //停止缓动
        if(this._tween_Mahjong) {
            this._tween_Mahjong.setPaused(true);
            this._tween_Mahjong = null;
        }
    }

    //关闭麻将
    public closeMahjong() {
        //数据赋值
        this.boo_isShow = false;

        //显示界面
        this.showMahjongFace();
    }

    //显示状态
    private showMahjongFace() {
        //判断显示界面
        if(this.boo_isShow == true) {
            this.currentState = "open";
        }
        else if(this.boo_isShow == false) {
            this.currentState = "close";
        }
    }
}
