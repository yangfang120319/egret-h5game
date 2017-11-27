/**
 *
 * @提示
 *
 */
class Tips extends eui.Component {
    //定义界面
    public constructor() {
        super();

        //定义界面
        this.skinName = TipsSkin;

        //隐藏界面
        this.visible = false;
    }

    //定义变量
    private txt_tips: eui.Label;
    private is_show: Boolean = false;
    private _tween_y: egret.Tween = null;
    private _tween_alpha: egret.Tween = null;

    //显示提示
    public show(_tips: string): void {
        //判断移除
        if(this.is_show == true) {
            //数据赋值
            this.is_show = false;

            //停止欢动
            if(this._tween_y) {
                this._tween_y.setPaused(true);
                this._tween_y = null;
            }
            if(this._tween_alpha) {
                this._tween_alpha.setPaused(true);
                this._tween_alpha = null;
            }
        }

        //显示文本
        this.txt_tips.text = _tips;

        //显示位置
        this.alpha = 1;
        this.visible = true;
        this.y = basic.StageProxy.height;
        this.x = (basic.StageProxy.width - this.width) / 2;

        //显示界面
        this.is_show = true;
        this._tween_alpha = egret.Tween.get(this).wait(1600).to({ alpha: 0 },300);
        this._tween_y = egret.Tween.get(this).to({ y: (basic.StageProxy.height - this.height)/2 },300).wait(1500).to({ y: -this.height },300).call(() => {
            //数据赋值
            this.is_show = false;

            //停止欢动
            if(this._tween_y) {
                this._tween_y.setPaused(true);
                this._tween_y = null;
            }
            if(this._tween_alpha) {
                this._tween_alpha.setPaused(true);
                this._tween_alpha = null;
            }

            //隐藏界面
            this.visible = false;
        });
    }
}