/**
 *
 * @马来西亚银行-顶部
 *
 */
class MLXYYH_Top extends eui.Component {
    //定义变量
    private btn_set: eui.Button;
    private btn_back: eui.Button;

    //初始化
    createChildren(): void {
        super.createChildren();

        //注册按钮
        this.btn_set.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onSetBtn,this);
        this.btn_back.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onBackBtn,this);
    }

    //-----------------定义按钮-----------------
    //设置按钮
    private onSetBtn(e: egret.TouchEvent): void {
        //播放声音
        basic.SoundManager.instance.playEffect("sound_btn_mp3");

        //显示设置界面
        PanelSet.instance.show();
    }

    //返回按钮
    private onBackBtn(e: egret.TouchEvent): void {
        //播放声音
        basic.SoundManager.instance.playEffect("sound_btn_mp3");

        //退出到主界面
        basic.SceneManager.back();
    }
}
