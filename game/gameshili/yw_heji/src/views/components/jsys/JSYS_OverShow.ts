/**
 *
 * @结束显示
 *
 */
class JSYS_OverShow extends eui.Component {
    //定义变量
    private g_show: eui.Group;
    private img_box: eui.Image;
    private img_tiao: eui.Image;
    private img_beilv: eui.Image;
    private com_light: eui.Component;
    private _tween_rotation: egret.Tween = null;
    private box_y: number[] = [0,0,27,27,27,27,27,27,27,27];
    
    //初始化
    createChildren(): void {
        super.createChildren();
        this.rotation
        //显示界面
        this.visible = false;
	}
	
    //开始动画
    start(_box: number): void {
        //显示图片
        this.visible = true;
        this.img_beilv.scaleX = 0;
        this.img_beilv.scaleY = 0;
        this.com_light.scaleX = 0;
        this.com_light.scaleY = 0;
        this.img_box.y = this.box_y[_box];
        this.img_box.source = "icon_jsys_box_big" + _box.toString() + "_png";
        this.img_beilv.source = "txt_sjys_x" + GameData.JSYS_Box_Beilv[_box]+"_png";
        
        //初始化界面
        this.g_show.alpha = 0;
        this.img_tiao.y = -150;
        this.img_tiao.alpha = 0;
        this.g_show.scaleX = 0.2;
        this.g_show.scaleY = 0.2;
        
        //显示动画
        this.com_light.rotation = 0;
        this._tween_rotation = egret.Tween.get(this.com_light,{ loop: true }).to({ rotation: 360 },4000);
        var _tween_scaleX_light: egret.Tween = egret.Tween.get(this.com_light).wait(600).to({ scaleX: 1.8 },200).wait(3300).to({ scaleX: 0 },200);
        var _tween_scaleY_light: egret.Tween = egret.Tween.get(this.com_light).wait(600).to({ scaleY: 1.8 },200).wait(3300).to({ scaleY: 0 },200);
        var _tween_scaleX_beilv: egret.Tween = egret.Tween.get(this.img_beilv).wait(300).to({ scaleX: 1 },200).wait(3400).to({ scaleX: 0 },200);
        var _tween_scaleY_beilv: egret.Tween = egret.Tween.get(this.img_beilv).wait(300).to({ scaleY: 1 },200).wait(3400).to({ scaleY: 0 },200);
        var _tween_scaleX_show: egret.Tween = egret.Tween.get(this.g_show).wait(600).to({ scaleX: 1 },300).wait(3300).to({ scaleX: 0.2 },300);
        var _tween_scaleY_show: egret.Tween = egret.Tween.get(this.g_show).wait(600).to({ scaleY: 1 },300).wait(3300).to({ scaleY: 0.2 },300);
        var _tween_alpha_show: egret.Tween = egret.Tween.get(this.g_show).wait(600).to({ alpha: 1 },200).wait(3500).to({ alpha: 0 },200);
        var _tween_alpha: egret.Tween = egret.Tween.get(this.img_tiao).to({ alpha: 1 },300).wait(4200).to({ alpha: 0 },300);
        var _tween_y: egret.Tween = egret.Tween.get(this.img_tiao).to({ y: 150 },300).wait(4200).to({ y: -150 },300).call(() => {
            //显示界面
            this.visible = false;
            if(this._tween_rotation) {
                this._tween_rotation.setPaused(true);
                this._tween_rotation = null;
            }
        });
        
    }
}
