/**
 *
 * @加载界面
 *
 */
class SceneLoading extends basic.SceneBase {
    //定义变量
    private loading: Loading;
    private txt_loading: eui.Label;

    //定义界面
    public constructor() {
        super();
        
        //定义界面
        this.skinName = SceneLoadingSkin;
        this.loading.startPlay();
        //清空文本
        this.txt_loading.text = "";
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
        //console.info(33);
        //定义变量
        var now_loader: number = (event.data.itemsLoaded / event.data.itemsTotal) * 100;
        //显示文本
        this.txt_loading.text = Math.floor(now_loader).toString() + "%";
    }
}
