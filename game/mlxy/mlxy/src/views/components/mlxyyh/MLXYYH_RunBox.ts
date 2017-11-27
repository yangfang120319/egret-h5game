/**
 *
 * @Box
 *
 */
class MLXYYH_RunBox extends eui.Component {
    //定义变量
    public box_num: number;
    private img_box: eui.Image;
    private rect_mask: eui.Rect;
    private img_icon: eui.Image;
    private img_light: eui.Image;
    private _tween_alpha1: egret.Tween = null;
    private _tween_alpha2: egret.Tween = null;
    private _tween_scaleX: egret.Tween = null;
    private _tween_scaleY: egret.Tween = null;
    
    //初始化
    createChildren(): void {
        super.createChildren();
    }
    
    //初始化
    info(_box_num:number):void{
        //数据赋值
        this.box_num = _box_num;
        
        //显示界面
        this.img_box.alpha = 0;
        this.rect_mask.alpha = 1;
        this.img_box.visible = true;
        this.img_icon.visible = true;
        this.rect_mask.visible = true;
        this.img_light.visible = false;
        this.img_light.blendMode = "add";
        this.img_icon.source = "icon_mlxyyh_" + this.box_num.toString() + "_0_png";
        this.img_light.source = "icon_mlxyyh_" + this.box_num.toString() + "_1_png";
    }
    
    //显示界面
    showBox(_time: number): void {
        //显示框
        if(_time == 0) {
            this.img_box.alpha = 1;
            this.rect_mask.alpha = 0;
            this.img_icon.scaleX = 0.93;
            this.img_icon.scaleY = 0.93;
            this.img_light.scaleX = 0.93;
            this.img_light.scaleY = 0.93;
        }
        else {
            this.img_icon.scaleX = 0.93;
            this.img_icon.scaleY = 0.93;
            this.img_light.scaleX = 0.93;
            this.img_light.scaleY = 0.93;
            var tween_alpha11: egret.Tween = egret.Tween.get(this.img_box).
                to({ alpha: 1 },_time);
            var tween_alpha2: egret.Tween = egret.Tween.get(this.rect_mask).
                to({ alpha: 0 },_time);
        }
    }
    
    //隐藏Box
    hideBox(_time: number): void {
        if(_time == 0) {
            this.img_box.alpha = 0;
            this.rect_mask.alpha = 0.83;
            this.img_icon.scaleX = 0.83;
            this.img_icon.scaleY = 0.83;
            this.img_light.scaleX = 0.83;
            this.img_light.scaleY = 0.83;
        }
        else {
            //显示框
            this.img_icon.scaleX = 0.83;
            this.img_icon.scaleY = 0.83;
            this.img_light.scaleX = 0.83;
            this.img_light.scaleY = 0.83;
            var tween_alpha1: egret.Tween = egret.Tween.get(this.img_box).
                to({ alpha: 0 },_time);
            var tween_alpha2: egret.Tween = egret.Tween.get(this.rect_mask).
                to({ alpha: 1 },_time);
        }
    }

    //显示遮罩宽度
    showMaskWidth(_width: number): void {
        //显示宽度
        this.rect_mask.width = _width;
    }

    //显示遮罩高度
    showMaskHeight(_height: number): void {
        //显示高度
        this.rect_mask.height = _height;
    }

    //显示遮罩Y
    showMaskY(_Y: number): void {
        //显示高度
        this.rect_mask.y = _Y;
    }
    
    //显示闪灯
    startLight(): void {
        //停止发光
        this.stopLight();

        //显示
        this.img_light.alpha = 0;
        this.img_light.visible = true;

        //显示发光
        this._tween_alpha1 = egret.Tween.get(this.img_light,{ loop: true }).
            to({ alpha: 0.6 },800).wait(300).
            to({ alpha: 0 },800).wait(300);
    }
    
    //清除界面
    clean():void{
        //判断开始发光
        if(this.img_light.visible == true) {
            if(this._tween_alpha1) {
                this._tween_alpha1.setPaused(true);
                this._tween_alpha1 = null;
            }
            if(this._tween_alpha2) {
                this._tween_alpha2.setPaused(true);
                this._tween_alpha2 = null;
            }
            this.img_light.visible = false;
        }
        this.rect_mask.alpha = 0;
    }
    
    //显示遮罩
    showMask(): void {
        this.rect_mask.alpha = 1;
    }
    
    //隐藏遮罩
    hideMask(): void {
        this.rect_mask.alpha = 0;
    }
    
    //停止闪灯
    stopLight(): void {
        //判断开始发光
        if(this.img_light.visible == true) {
            if(this._tween_alpha1) {
                this._tween_alpha1.setPaused(true);
                this._tween_alpha1 = null;
            }
            if(this._tween_alpha2) {
                this._tween_alpha2.setPaused(true);
                this._tween_alpha2 = null;
            }
            this.img_light.visible = false;
        }
    }
}
