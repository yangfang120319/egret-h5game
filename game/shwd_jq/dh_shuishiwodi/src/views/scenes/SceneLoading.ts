/**
 *
 * @加载界面
 *
 */
class SceneLoading extends basic.SceneBase {
    //定义变量
    private pb_loading: eui.ProgressBar;

    //定义界面
    public constructor() {
        super();

        //定义界面
        this.skinName = SceneLoadingSkin;
    }
    
    //注册侦听
    beforeShow(params: any): void {
        //注册事件
        basic.Dispatcher.addListener(EventNames.LOADING_PROGRESS,this.onLoadingProgress,this);
    }
    
    //注销侦听
    beforeHide(): void {
        //注销事件
        basic.Dispatcher.removeListener(EventNames.LOADING_PROGRESS,this.onLoadingProgress,this);
    }
    
    //显示加载进度
    private onLoadingProgress(event: egret.Event): void {
        //定义变量
        var now_loader: number = (event.data.itemsLoaded / event.data.itemsTotal) * 100;
        
        //显示界面
        this.pb_loading.value = now_loader;
    }
}
