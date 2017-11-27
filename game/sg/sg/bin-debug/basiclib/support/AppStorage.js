var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 *Created by jq on 2016/1/24
 * @APP数据库
 *
 */
var basic;
(function (basic) {
    var appStorage = (function () {
        function appStorage() {
        }
        //获取文本数据
        appStorage.getItem = function (key) {
            //判断返回
            if (basic.AppNative.AppData[key]) {
                return basic.AppNative.AppData[key];
            }
            else {
                return null;
            }
        };
        //保存文本数据
        appStorage.setItem = function (key, value) {
            if (basic.AppNative.AppData[key] == null) {
                //数据赋值
                basic.AppNative.AppData[key] = value;
                //保存数据
                basic.AppNative.saveData(JSON.stringify(basic.AppNative.AppData));
                //返回
                return false;
            }
            else {
                //数据赋值
                basic.AppNative.AppData[key] = value;
                //保存数据
                basic.AppNative.saveData(JSON.stringify(basic.AppNative.AppData));
                //返回
                return true;
            }
        };
        //获取对象数据
        appStorage.getItemObj = function (key, defaultObj) {
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
        appStorage.setItemObj = function (key, itemObj) {
            return this.setItem(key, JSON.stringify(itemObj));
        };
        return appStorage;
    }());
    basic.appStorage = appStorage;
    __reflect(appStorage.prototype, "basic.appStorage");
})(basic || (basic = {}));
//# sourceMappingURL=AppStorage.js.map