var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 *Created by jq on 2016/10/11
 * @语言管理
 *
 */
var basic;
(function (basic) {
    var LanguageManager = (function () {
        function LanguageManager() {
        }
        Object.defineProperty(LanguageManager, "instance", {
            get: function () {
                if (this._instance == undefined) {
                    this._instance = new LanguageManager();
                }
                return this._instance;
            },
            enumerable: true,
            configurable: true
        });
        //获取音乐是否播放
        LanguageManager.prototype.getLanguageMute = function () {
            //获取数据
            var languageType = Number(basic.localStorage.getItem('languageMute'));
            return languageType;
        };
        //保存音乐是否播放
        LanguageManager.prototype.setLanguageMute = function (value) {
            //保存数据
            basic.localStorage.setItem('languageMute', value.toString());
        };
        return LanguageManager;
    }());
    basic.LanguageManager = LanguageManager;
    __reflect(LanguageManager.prototype, "basic.LanguageManager");
})(basic || (basic = {}));
