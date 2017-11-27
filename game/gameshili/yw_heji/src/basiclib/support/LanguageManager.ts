/**
 *Created by jq on 2016/10/11
 * @语言管理
 *
 */
module basic {
    export class LanguageManager {
        //封装
        private static _instance: LanguageManager;
        public static get instance(): LanguageManager {
            if(this._instance == undefined) {
                this._instance = new LanguageManager();
            }
            return this._instance;
        }
        
        //获取音乐是否播放
        getLanguageMute(): number {
            //获取数据
            var languageType: number = Number(basic.localStorage.getItem('languageMute'));
            return languageType;
        }
        
        //保存音乐是否播放
        setLanguageMute(value: number) {
            //保存数据
            basic.localStorage.setItem('languageMute',value.toString());
        }
    }
}
