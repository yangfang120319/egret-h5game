/**
 * Created by lenovo on 2014/6/12.
 */
var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var basic;
(function (basic) {
    var Utils = (function () {
        function Utils() {
        }
        Utils.injectProp = function (target, data, ignoreMethod) {
            if (data === void 0) { data = null; }
            if (ignoreMethod === void 0) { ignoreMethod = true; }
            if (!data) {
                return false;
            }
            var result = true;
            for (var key in data) {
                var value = data[key];
                if (!ignoreMethod || typeof value != 'function') {
                    target[key] = value;
                }
            }
            return result;
        };
        Utils.clone = function (source, def, ignoreMethod) {
            if (def === void 0) { def = null; }
            if (ignoreMethod === void 0) { ignoreMethod = true; }
            var target = def ? new def() : {};
            this.injectProp(target, source, ignoreMethod);
            return target;
        };
        Utils.arrToIntArr = function (arr) {
            for (var i = 0, li = arr.length; i < li; i++) {
                arr[i] = parseInt(arr[i]);
            }
            return arr;
        };
        Utils.getUrlParams = function () {
            var params = {};
            var href = window.location.href;
            var index = href.indexOf("?");
            if (index < 0) {
                return params;
            }
            var hashes = href.substr(index + 1).split('&');
            for (var i = 0; i < hashes.length; i++) {
                var arr = hashes[i].split('=');
                params[arr[0]] = arr[1];
            }
            return params;
        };
        Utils.getUrlBase = function () {
            var href = window.location.href;
            var index = href.indexOf("?");
            return href.substring(0, index < 0 ? href.length : index);
        };
        Utils.anchorCenter = function (target, width, height) {
            if (width === void 0) { width = 0; }
            if (height === void 0) { height = 0; }
            this.anchorRate(target, 0.5, 0.5, width, height);
        };
        Utils.anchorRate = function (target, rx, ry, width, height) {
            if (width === void 0) { width = 0; }
            if (height === void 0) { height = 0; }
            if (width == 0) {
                width = target.width;
            }
            if (height == 0) {
                height = target.height;
            }
            target.x += target.anchorOffsetX = width * rx;
            target.y += target.anchorOffsetY = height * ry;
        };
        /**
         * object转成查询字符串
         * @param obj
         * @returns {string}
         */
        Utils.obj2query = function (obj) {
            if (!obj) {
                return '';
            }
            var arr = [];
            for (var key in obj) {
                arr.push(key + '=' + obj[key]);
            }
            return arr.join('&');
        };
        return Utils;
    }());
    basic.Utils = Utils;
    __reflect(Utils.prototype, "basic.Utils");
})(basic || (basic = {}));
//# sourceMappingURL=Utils.js.map