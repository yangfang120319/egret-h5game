/**
 *
 * @设置界面
 *
 */
class PanelSet extends basic.PanelBase {
    //自定义界面
    private static _instance: PanelSet;
    public static get instance(): PanelSet {
        if(this._instance == undefined) {
            this._instance = new PanelSet();
        }
        return this._instance;
    }

    //定义变量
    private btn_exit: eui.Button;
    private tabbar_language: eui.TabBar;
    private btn_music: eui.ToggleSwitch;
    private btn_sound: eui.ToggleSwitch;

    //皮肤设置
    protected init(): void {
        this.skinName = PanelSetSkin;
    }

    //定义界面
    constructor() {
        super(basic.dialogEffect.Scale,{
            withFade: true,
            ease: egret.Ease.backOut
        },basic.dialogEffect.Scale,{ withFade: true,ease: egret.Ease.backIn });
    }

    //初始化界面
    createChildren(): void {
        super.createChildren();

        //显示界面
        this.btn_music.selected = basic.SoundManager.instance.musicMute;
        this.btn_sound.selected = basic.SoundManager.instance.effectMute;
        this.tabbar_language.selectedIndex = basic.LanguageManager.instance.getLanguageMute();

        //注册按钮
        this.btn_exit.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onExitBtn,this);
        this.btn_music.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onMusicBtn,this);
        this.btn_sound.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onSoundBtn,this);
        this.tabbar_language.addEventListener(egret.Event.CHANGE,this.onChangeLanguage,this);
    }

    //显示界面
    show(callback: Function = null): void {
        //数据赋值
        this._callback = callback;

        //显示界面
        this.popup(this.funExit.bind(this));
    }

    //退出函数
    private funExit(): void {
        //退出事件
        this.dealAction();
    }

    //退出按钮
    private onExitBtn(e: egret.TouchEvent) {
        //播放声音
        basic.SoundManager.instance.playEffect("sound_btn_mp3");

        //退出设置
        this.funExit();
    }

    //音效按钮
    private onSoundBtn(e: egret.TouchEvent) {
        //数据赋值
        basic.SoundManager.instance.switchEffect();
    }

    //音乐按钮
    private onMusicBtn(e: egret.TouchEvent) {
        //数据赋值
        basic.SoundManager.instance.switchMusic();
    }

    //语言
    private onChangeLanguage(e: egret.Event): void {
        //播放声音
        basic.SoundManager.instance.playEffect("sound_btn_mp3");

        //保存语言
        basic.LanguageManager.instance.setLanguageMute(this.tabbar_language.selectedIndex);
    }
}
