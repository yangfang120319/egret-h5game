/**
 *Created by jq on 2016/1/24
 * @声音管理
 *
 */
module basic {
    export class SoundManager {
        //封装
        private static _instance: SoundManager;
        public static get instance(): SoundManager {
            if(this._instance == undefined) {
                this._instance = new SoundManager();
            }
            return this._instance;
        }
        
        //-----------------播放背景音乐-------------------
        //定义变量
        musicRes: string;
        musicChannel: egret.SoundChannel;
        
        //播放声音
        playMusic(res: string = null,loop: number = 0): void {
            //判断
            if(res) {
                this.musicRes = res;
            }
            
            //判断是否静音
            if(this.musicMute) {
                return;
            }
            
            //停止声音
            this.stopMusic();
            
            //播放声音
            var music: egret.Sound = RES.getRes(this.musicRes);
            if(loop == 0) {
                this.musicChannel = music.play(0);
            }
            else{
                this.musicChannel = music.play(0,loop);
            }
            this.musicChannel.volume = this.musicVolume;
            this.musicChannel.addEventListener(egret.Event.SOUND_COMPLETE,this.onMusicComplete,this);
        }
        
        //设置声音大小
        setVolume(): void {
            if(this.musicChannel) {
                this.musicChannel.volume = this.musicVolume;
            }
        }
        
        //声音播放结束
        onMusicComplete(e: egret.Event): void {
           //停止声音
            this.stopMusic();
        }
        
        //停止声音
        stopMusic(): void {
            //判断停止声音
            if(this.musicChannel) {
                this.musicChannel.stop();
                this.musicChannel.removeEventListener(egret.Event.SOUND_COMPLETE,this.onMusicComplete,this);
                this.musicChannel = null;
            }
        }
        
        //开关音乐
        switchMusic(): void {
            //数据赋值
            this.musicMute = !this.musicMute;
            
            ///判断停止或播放声音
            if(this.musicRes) {
                if(this.musicMute) {
                    this.stopMusic()
                } else {
                    this.playMusic();
                }
            }
        }
        
        //获取音乐声音大小
        get musicVolume():number{
            //定义变量
            var now_volume: number;
            
            //判断显示
            if(basic.localStorage.getItem('musicVolume')){
                now_volume = Number(basic.localStorage.getItem('musicVolume'));
            }
            else{
                now_volume = 1;
            }
            
            return now_volume;
        }
        
        //保存音乐声音大小
        set musicVolume(volume: number) {
            //保存声音
            basic.localStorage.setItem('musicVolume',volume.toString());  
        }
        
        //获取音乐是否播放
        get musicMute(): boolean {
            var mm: string = basic.localStorage.getItem('musicMute');
            return mm ? mm == '1' : false;
        }
        
        //保存音乐是否播放
        set musicMute(value: boolean) {
            basic.localStorage.setItem('musicMute',value ? '1' : '0');
        }
        
        //-----------------播放声效-------------------
        //定义变量
        effectRes: string;
        effectCallBack: Function;
        effectChannel: egret.SoundChannel;
        effectForceRes: string;
        effectForceCallBack: Function;
        effectForceChannel: egret.SoundChannel;
        
        //开始播放声效
        playEffect(res: string = null,loop: number = 1): void {
            //判断
            if(res) {
                this.effectRes = res;
            }
            
            //判断否关闭声效
            if(this.effectMute) {
                return;
            }
            
            //播放生效
            var effect: egret.Sound = RES.getRes(this.effectRes);
            this.effectChannel = effect.play(0,loop);
            this.effectChannel.volume = this.effectVolume;
        }
        
        //停止播放声效
        stopEffect(): void {
            //停止播放声效
            if(this.effectChannel) {
                this.effectChannel.stop();
                this.effectChannel = null;
            }
        }
        
        //开关声效
        switchEffect(): void {
            //数据赋值
            this.effectMute = !this.effectMute;
        }
        
        //获取音效是否播放
        get effectMute(): boolean {
            var mm: string = basic.localStorage.getItem('effectMute');
            return mm ? mm == '1' : false;
        }
        
        //保存音效是否播放
        set effectMute(value: boolean) {
            basic.localStorage.setItem('effectMute',value ? '1' : '0');
        }
        
        //获取音效声音大小
        get effectVolume(): number {
            //定义变量
            var now_volume: number;

            //判断显示
            if(basic.localStorage.getItem('effectVolume')) {
                now_volume = Number(basic.localStorage.getItem('effectVolume'));
            }
            else {
                now_volume = 1;
            }

            return now_volume;
        }

        //保存音效声音大小
        set effectVolume(volume: number) {
            //保存声音
            basic.localStorage.setItem('effectVolume',volume.toString());
        }
        
        //开关音乐音效
        switchAll() {
            this.switchEffect();
            this.switchMusic();
        }
    }
}
