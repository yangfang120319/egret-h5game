/**
 *
 * @加载界面
 *
 */
class SceneLoading extends basic.SceneBase {
    //定义变量
    //private login: Login;
    private loading: Loading;
    private txt_loading: eui.Label;

    //定义界面
    public constructor() {
        super();

        //定义界面
        this.skinName = SceneLoadingSkin;
    }

    //显示加载进度
    public onLoadingProgress(event: egret.Event): void {
        //定义变量
        var num_now_loader: number = Math.floor((event.data.itemsLoaded / event.data.itemsTotal) * 100);

        //显示进度
        this.txt_loading.text = num_now_loader.toString() + "%";
    }

    //注册侦听
    beforeShow(params: any): void {
        //注册事件
        basic.Dispatcher.addListener(EventNames.LOADING_PROGRESS,this.onLoadingProgress,this);

        //开始动画
        this.loading.startPlay();
        
        //判断显示登录
        var params: any = basic.Utils.getUrlParams();
        if(params.account == "" || params.account == null) {
            //this.login.visible = true;
        }
        else{
            //this.login.visible = false;
        }
       // this.login.info();
    }

    //注销侦听
    beforeHide(): void {
        //注销事件
        basic.Dispatcher.removeListener(EventNames.LOADING_PROGRESS,this.onLoadingProgress,this);

        //停止动画
        //this.login.clean();
        this.loading.stopPlay();
    }
}
