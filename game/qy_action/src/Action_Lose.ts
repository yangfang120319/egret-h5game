/**
 *
 * @失败
 *
 */
class Action_Lose extends eui.Component {
    //定义变量
    private g_title: eui.Group;
    private img_title: eui.Image;
    private img_book: eui.Image;
    private img_renwu: eui.Image;
    private img_xunzhang: eui.Image;
    private com_light: eui.Component;
    private _tween_y: egret.Tween = null;
    private _tween_book_x: egret.Tween = null;
    private _tween_renwu_x: egret.Tween = null;
    private _tween_light_alpha: egret.Tween = null;
    private _tween_light_rotation: egret.Tween = null;
    private _tween_xunzhang_alpha: egret.Tween = null;

    //初始化
    createChildren(): void {
        super.createChildren();
    }

    //开始动画
    start(_type: number): void {
        //清除界面
        this.clean();
        
        //判断显示动画
        if(_type == 1) {
            this.img_title.source = "txt_tzsb_png";
            this._tween_renwu_x = egret.Tween.get(this.img_renwu).wait(300).to({ x: 170 },200);
            this._tween_book_x = egret.Tween.get(this.img_book).wait(500).to({ x: 375 },200,egret.Ease.backOut);
        }
        else {
            this.img_title.source = "txt_cgsb_png";

            //显示动画
            this._tween_xunzhang_alpha = egret.Tween.get(this.img_xunzhang).wait(300).to({ alpha: 1 },500);
        }

        //开始动画
        this._tween_light_alpha = egret.Tween.get(this.com_light).wait(400).to({ alpha: 1 },700);
        this._tween_y = egret.Tween.get(this.g_title).to({ y: 290 },300,egret.Ease.backOut);

        //判断显示光动画
        egret.setTimeout(() => {
            this._tween_light_rotation = egret.Tween.get(this.com_light,{ loop: true }).to({ rotation: 360 },8000);
        },this,400);
    }
    
    //清除
    private clean(): void {
        //隐藏界面
        this.g_title.y = -170;
        this.img_book.x = 650;
        this.img_renwu.x = -230;
        this.com_light.alpha = 0;
        this.com_light.rotation = 0;
        this.img_xunzhang.alpha = 0;

        //停止动画
        if(this._tween_y) {
            this._tween_y.setPaused(true);
            this._tween_y = null;
        }
        if(this._tween_renwu_x) {
            this._tween_renwu_x.setPaused(true);
            this._tween_renwu_x = null;
        }
        if(this._tween_book_x) {
            this._tween_book_x.setPaused(true);
            this._tween_book_x = null;
        }
        if(this._tween_light_alpha) {
            this._tween_light_alpha.setPaused(true);
            this._tween_light_alpha = null;
        }
        if(this._tween_light_rotation) {
            this._tween_light_rotation.setPaused(true);
            this._tween_light_rotation = null;
        }
        if(this._tween_xunzhang_alpha) {
            this._tween_xunzhang_alpha.setPaused(true);
            this._tween_xunzhang_alpha = null;
        }
    }
}
