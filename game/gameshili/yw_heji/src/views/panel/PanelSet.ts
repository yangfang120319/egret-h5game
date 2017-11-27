/**
 *
 * @设置界面
 *
 */
class PanelSet extends basic.PanelBase {
    private static _instance: PanelSet;
    public static get instance(): PanelSet {
        if(this._instance == undefined) {
            this._instance = new PanelSet();
        }
        return this._instance;
    }

    //定义变量
    private g_music: eui.Group;
    private g_sound: eui.Group;
    private btn_close: eui.Button;
    private img_sound: eui.Image;
    private img_music: eui.Image;
    private btn_sound: eui.Button;
    private btn_music: eui.Button;
    private btn_about: eui.Button;
    private btn_clause: eui.Button;
    
    //定义界面
    constructor() {
        super(basic.dialogEffect.Scale,{
            withFade: true,
            ease: egret.Ease.backOut
        },basic.dialogEffect.Scale,{ withFade: true,ease: egret.Ease.backIn });
    }

    //初始化
    createChildren(): void {
        super.createChildren();

        //定义界面
        this.skinName = PanelSetSkin;
        
        //注册按钮
        this.btn_close.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onCloseBtn,this);
        this.btn_about.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onAboutBtn,this);
        this.btn_clause.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onClauseBtn,this);
        this.btn_sound.addEventListener(egret.TouchEvent.TOUCH_BEGIN,this.onSoundMoveStart,this);
        this.btn_music.addEventListener(egret.TouchEvent.TOUCH_BEGIN,this.onMusicMoveStart,this);
    }

    //显示界面
    show(callback: Function = null): void {
        //显示界面
        this.popup(this.funExit.bind(this));

        //初始化显示界面
        this.btn_music.x = 260 * basic.SoundManager.instance.musicVolume - 1;
        this.btn_sound.x = 260 * basic.SoundManager.instance.effectVolume - 1;
        this.img_music.width = this.btn_music.x + 31;
        this.img_sound.width = this.btn_sound.x + 31;
    }

    //退出对话框
    private funExit(): void {
        //退出界面
        this.dealAction();
    }
    
    //退出界面
    private onCloseBtn(e: egret.TouchEvent) {
        //播放声音
        basic.SoundManager.instance.playEffect("sound_btn_mp3");
        
        //退出对话框
        this.funExit();
    }
    
    //关于按钮
    private onAboutBtn(e: egret.TouchEvent) {
        //播放声音
        basic.SoundManager.instance.playEffect("sound_btn_mp3");
        
        //发送消息
        basic.Dispatcher.dispatch(EventNames.SHOW_FACE,{ "nowshow": 4 });
        
        //退出对话框
        this.funExit();
    }
    
    //服务条款按钮
    private onClauseBtn(e: egret.TouchEvent) {
        //播放声音
        basic.SoundManager.instance.playEffect("sound_btn_mp3");
        
        //发送消息
        basic.Dispatcher.dispatch(EventNames.SHOW_FACE,{ "nowshow": 6 });
        
        //退出对话框
        this.funExit();
    }
    
    //----------------------------定义滑动------------------------
    //定义变量
    private offset_Sound_X: number;
    private start_Move_Sound_X: number;
    private offset_Music_X: number;
    private start_Move_Music_X: number;

    //滑动按钮
    private onSoundMoveStart(e: egret.TouchEvent) {
        //计算距离
        this.offset_Sound_X = e.stageX - this.btn_sound.x;
        this.start_Move_Sound_X = this.btn_sound.x;

        //注册事件
        this.addEventListener(egret.TouchEvent.TOUCH_MOVE,this.onSoundMove,this);
        this.addEventListener(egret.TouchEvent.TOUCH_END,this.onSoundMoveOver,this);
    }

    //滑动按钮
    private onMusicMoveStart(e: egret.TouchEvent) {
        //计算距离
        this.offset_Music_X = e.stageX - this.btn_music.x;
        this.start_Move_Music_X = this.btn_music.x;

        //注册事件
        this.addEventListener(egret.TouchEvent.TOUCH_MOVE,this.onMusicMove,this);
        this.addEventListener(egret.TouchEvent.TOUCH_END,this.onMusicMoveOver,this);
    }

    //移动事件
    private onSoundMove(e: egret.TouchEvent): void {
        //定义变量
        var int_Now_Time: number;//当前时间
        var num_Now_X: number;//当前X坐标

        //定义位置
        this.btn_sound.x = e.stageX - this.offset_Sound_X;

        //判断显示
        if(this.btn_sound.x < -1) {
            this.btn_sound.x = -1;
        }
        if(this.btn_sound.x > 260) {
            this.btn_sound.x = 260;
        }
        this.img_sound.width = this.btn_sound.x + 31;
    }

    //移动事件
    private onMusicMove(e: egret.TouchEvent): void {
        //定义变量
        var int_Now_Time: number;//当前时间
        var num_Now_X: number;//当前X坐标

        //定义位置
        this.btn_music.x = e.stageX - this.offset_Music_X;

        //判断显示
        if(this.btn_music.x < -1) {
            this.btn_music.x = -1;
        }
        if(this.btn_music.x > 260) {
            this.btn_music.x = 260;
        }
        this.img_music.width = this.btn_music.x + 31;
        
        //保存数据
        basic.SoundManager.instance.musicVolume = Number((this.btn_music.x + 1) / 260);

        //设置音量
        basic.SoundManager.instance.setVolume();
    }

    //停止移动
    private onSoundMoveOver(e: egret.TouchEvent) {
        //注销事件
        this.removeEventListener(egret.TouchEvent.TOUCH_MOVE,this.onSoundMove,this);
        this.removeEventListener(egret.TouchEvent.TOUCH_END,this.onSoundMoveOver,this);

        //显示位置
        this.img_sound.width = this.btn_sound.x + 31;

        //保存数据
        basic.SoundManager.instance.effectVolume = Number((this.btn_sound.x + 1) / 260);
    }

    //停止移动
    private onMusicMoveOver(e: egret.TouchEvent) {
        //注销事件
        this.removeEventListener(egret.TouchEvent.TOUCH_MOVE,this.onMusicMove,this);
        this.removeEventListener(egret.TouchEvent.TOUCH_END,this.onMusicMoveOver,this);

        //显示位置
        this.img_music.width = this.btn_music.x + 31;

        //保存数据
        basic.SoundManager.instance.musicVolume = Number((this.btn_music.x + 1) / 260);
        
        //设置音量
        basic.SoundManager.instance.setVolume();
    }
}