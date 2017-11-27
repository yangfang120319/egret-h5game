/**
 *
 * @关于
 *
 */
class SceneAbout extends basic.SceneBase {
    //定义变量
    private btn_close: eui.Button;

    //定义界面
    public constructor() {
        super();

        //定义界面
        this.skinName = SceneAboutSkin;

        //注册按钮
        this.btn_close.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onCloseBtn,this);
    }

    //显示前调用
    beforeShow(): void {

    }

    //关闭按钮
    private onCloseBtn(e: egret.TouchEvent): void {
        //播放声音
        basic.SoundManager.instance.playEffect("sound_btn_mp3");
        
        //发送消息
        basic.Dispatcher.dispatch(EventNames.SHOW_FACE,{ "nowshow": 0 });
    }
}
