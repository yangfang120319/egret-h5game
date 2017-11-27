/**
 *
 * @等待界面
 *
 */
class SceneWaiting extends basic.SceneBase {
    //定义变量
    private trun_speed: number = 400;
    private com_waiting: eui.Component;
    private _tween_rotation: egret.Tween = null;
    
    //定义界面
    public constructor() {
        super();
        
        //定义界面
        this.skinName = SceneWaitingSkin;
    }
	
    //显示前调用
    beforeShow(): void {
        //开始动画
        this._tween_rotation = egret.Tween.get(this.com_waiting,{ loop: true }).
            to({ rotation: 360 },this.trun_speed);
    }
    
    //隐藏前调用
    onHide():void{
        //结束动画
        if(this._tween_rotation) {
            this._tween_rotation.setPaused(true);
            this._tween_rotation = null;
        }
    }
    
    
}
