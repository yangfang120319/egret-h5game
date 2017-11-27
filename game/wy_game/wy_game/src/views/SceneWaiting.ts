/**
 *
 * @等待界面
 *
 */
class SceneWaiting extends basic.SceneBase {
    //定义变量
    private txt_progress: eui.Label;
    private com_loading: eui.Component;
    private _tween_rotation: egret.Tween = null;
    private trun_speed: number = 400;

    //定义界面
    public constructor() {
        super();
        
        //定义界面
        this.skinName = SceneWaitingSkin;
    }

    //显示前调用
    beforeShow(params: any): void {
        //显示界面
        this.txt_progress.text = "0%";

        //开始转圈
        this._tween_rotation = egret.Tween.get(this.com_loading,{ loop: true })
            .to({ rotation: 360 },this.trun_speed);

        //注册事件
        basic.Dispatcher.addListener(EventNames.LOADING_PROGRESS,this.onLoadingProgress,this);
    }

    //隐藏前调用
    beforeHide(params: any): void {
        //判断停止
        if(this._tween_rotation) {
            this._tween_rotation.setPaused(true);
            this._tween_rotation = null;
        }

        //注销事件
        basic.Dispatcher.removeListener(EventNames.LOADING_PROGRESS,this.onLoadingProgress,this);
    }
    
    //显示加载进度
    public onLoadingProgress(event: egret.Event): void {
        //定义变量
        var num_now_loader: number = (event.data.itemsLoaded / event.data.itemsTotal) * 100;

        //显示文本
        this.txt_progress.text = Math.floor(num_now_loader).toString() + "%";
    }
}
