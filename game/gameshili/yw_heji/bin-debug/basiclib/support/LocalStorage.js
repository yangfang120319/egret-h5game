var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 *Created by jq on 2016/1/24
 * @本地数据库
 *
 */
var basic;
(function (basic) {
    var localStorage = (function () {
        function localStorage() {
        }
        //初始化
        localStorage.init = function (ID) {
            this.ID = ID;
        };
        //获取文本数据
        localStorage.getItem = function (key) {
            return egret.localStorage.getItem(this.ID && this.ID != '' ? this.ID + '_' + key : key);
        };
        //保存文本数据
        localStorage.setItem = function (key, value) {
            return egret.localStorage.setItem(this.ID && this.ID != '' ? this.ID + '_' + key : key, value);
        };
        //获取对象数据
        localStorage.getItemObj = function (key, defaultObj) {
            if (defaultObj === void 0) { defaultObj = null; }
            var result;
            try {
                result = JSON.parse(this.getItem(key));
            }
            catch (e) {
            }
            if (!result) {
                result = defaultObj;
            }
            return result;
        };
        //保存对象数据
        localStorage.setItemObj = function (key, itemObj) {
            return this.setItem(key, JSON.stringify(itemObj));
        };
        return localStorage;
    }());
    basic.localStorage = localStorage;
    __reflect(localStorage.prototype, "basic.localStorage");
})(basic || (basic = {}));
