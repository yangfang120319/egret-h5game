var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 *Created by jq on 2016/1/24
 * @声音管理
 *
 */
var basic;
(function (basic) {
    var SoundManager = (function () {
        function SoundManager() {
        }
        Object.defineProperty(SoundManager, "instance", {
            get: function () {
                if (this._instance == undefined) {
                    this._instance = new SoundManager();
                }
                return this._instance;
            },
            enumerable: true,
            configurable: true
        });
        //播放声音
        SoundManager.prototype.playMusic = function (res, loop) {
            if (res === void 0) { res = null; }
            if (loop === void 0) { loop = 1; }
            //判断
            if (res) {
                this.musicRes = res;
            }
            //判断是否静音
            if (this.musicMute) {
                return;
            }
            //停止声音
            this.stopMusic();
            //播放声音
            var music = RES.getRes(this.musicRes);
            this.musicChannel = music.play(0, loop);
            this.musicChannel.volume = this.musicVolume;
            this.musicChannel.addEventListener(egret.Event.SOUND_COMPLETE, this.onMusicComplete, this);
        };
        //声音播放结束
        SoundManager.prototype.onMusicComplete = function (e) {
            //停止声音
            this.stopMusic();
        };
        //停止声音
        SoundManager.prototype.stopMusic = function () {
            //判断停止声音
            if (this.musicChannel) {
                this.musicChannel.stop();
                this.musicChannel.removeEventListener(egret.Event.SOUND_COMPLETE, this.onMusicComplete, this);
                this.musicChannel = null;
            }
        };
        //开关音乐
        SoundManager.prototype.switchMusic = function () {
            //数据赋值
            this.musicMute = !this.musicMute;
            ///判断停止或播放声音
            if (this.musicRes) {
                if (this.musicMute) {
                    this.stopMusic();
                }
                else {
                    this.playMusic();
                }
            }
        };
        Object.defineProperty(SoundManager.prototype, "musicVolume", {
            //获取音乐声音大小
            get: function () {
                //定义变量
                var now_volume;
                //判断显示
                if (basic.localStorage.getItem('musicVolume')) {
                    now_volume = Number(basic.localStorage.getItem('musicVolume'));
                }
                else {
                    now_volume = 1;
                }
                return now_volume;
            },
            //保存音乐声音大小
            set: function (volume) {
                //保存声音
                basic.localStorage.setItem('musicVolume', volume.toString());
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(SoundManager.prototype, "musicMute", {
            //获取音乐是否播放
            get: function () {
                var mm = basic.localStorage.getItem('musicMute');
                return mm ? mm == '1' : false;
            },
            //保存音乐是否播放
            set: function (value) {
                basic.localStorage.setItem('musicMute', value ? '1' : '0');
            },
            enumerable: true,
            configurable: true
        });
        //开始播放声效
        SoundManager.prototype.playEffect = function (res, loop) {
            if (res === void 0) { res = null; }
            if (loop === void 0) { loop = 1; }
            //判断
            if (res) {
                this.effectRes = res;
            }
            //判断否关闭声效
            if (this.effectMute) {
                return;
            }
            //播放生效
            var effect = RES.getRes(this.effectRes);
            this.effectChannel = effect.play(0, loop);
            this.effectChannel.volume = this.effectVolume;
        };
        //停止播放声效
        SoundManager.prototype.stopEffect = function () {
            //停止播放声效
            if (this.effectChannel) {
                this.effectChannel.stop();
                this.effectChannel = null;
            }
        };
        //开关声效
        SoundManager.prototype.switchEffect = function () {
            //数据赋值
            this.effectMute = !this.effectMute;
        };
        Object.defineProperty(SoundManager.prototype, "effectMute", {
            //获取音效是否播放
            get: function () {
                var mm = basic.localStorage.getItem('effectMute');
                return mm ? mm == '1' : false;
            },
            //保存音效是否播放
            set: function (value) {
                basic.localStorage.setItem('effectMute', value ? '1' : '0');
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(SoundManager.prototype, "effectVolume", {
            //获取音效声音大小
            get: function () {
                //定义变量
                var now_volume;
                //判断显示
                if (basic.localStorage.getItem('effectVolume')) {
                    now_volume = Number(basic.localStorage.getItem('effectVolume'));
                }
                else {
                    now_volume = 1;
                }
                return now_volume;
            },
            //保存音效声音大小
            set: function (volume) {
                //保存声音
                basic.localStorage.setItem('effectVolume', volume.toString());
            },
            enumerable: true,
            configurable: true
        });
        //开关音乐音效
        SoundManager.prototype.switchAll = function () {
            this.switchEffect();
            this.switchMusic();
        };
        return SoundManager;
    }());
    basic.SoundManager = SoundManager;
    __reflect(SoundManager.prototype, "basic.SoundManager");
})(basic || (basic = {}));
//# sourceMappingURL=SoundManager.js.map