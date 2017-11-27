/**
 *
 * @author 
 *
 */
class EBG_StartTips extends eui.Component {
    //定义变量
    private img_0: eui.Image;
    private img_1: eui.Image;
    private img_2: eui.Image;
    private img_3: eui.Image;
    private rect_back: eui.Rect;
    private _tween_alpha0: egret.Tween = null;
    private _tween_alpha1: egret.Tween = null;
    private _tween_alpha2: egret.Tween = null;
    private _tween_alpha3: egret.Tween = null;

    //初始化
    createChildren(): void {
        super.createChildren();

        //显示界面
        this.visible = false;
    }

    //开始提示
    start(): void {
        //定义变量
        var time: number = 100;

        //隐藏字
        this.img_1.x = 90;
        this.img_2.x = 210;
        this.img_3.x = 330;
        this.img_0.alpha = 0;
        this.img_1.alpha = 0;
        this.img_2.alpha = 0;
        this.img_3.alpha = 0;
        this.visible = true;

        //显示第一个字
        this._tween_alpha0 = egret.Tween.get(this.img_0).to({ alpha: 1 },300).wait(200).call(() => {
            //显示第二个字
            var _tween_alpha1: egret.Tween = egret.Tween.get(this.img_1).to({ x: 210 },time)
            this._tween_alpha1 = egret.Tween.get(this.img_1).wait(time / 2).to({ alpha: 1 },time / 2).wait(200).call(() => {
                //显示第三个字
                var _tween_alpha2: egret.Tween = egret.Tween.get(this.img_2).to({ x: 330 },time)
                this._tween_alpha2 = egret.Tween.get(this.img_2).wait(time / 2).to({ alpha: 1 },time / 2).wait(200).call(() => {
                    //显示第四个字
                    var _tween_alpha3: egret.Tween = egret.Tween.get(this.img_3).to({ x: 450 },time)
                    this._tween_alpha3 = egret.Tween.get(this.img_3).wait(time / 2).to({ alpha: 1 },time / 2).wait(2000).call(() => {
                        //退出界面
                        this.visible = false;
                    });
                });
            });
        });
    }
}
