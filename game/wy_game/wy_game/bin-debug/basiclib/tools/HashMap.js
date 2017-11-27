/**
 * Created by jq on 2016/2/6.
 */
var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var basic;
(function (basic) {
    var HashMap = (function () {
        //初始化
        function HashMap() {
            this.clear();
        }
        //判断是Key否存在
        HashMap.prototype.containsKey = function (key) {
            return key in this.obj;
        };
        //判断对象是否存在
        HashMap.prototype.containsValue = function (value) {
            for (var key in this.obj) {
                if (this.obj[key] == value) {
                    return true;
                }
            }
            return false;
        };
        //加入对象
        HashMap.prototype.put = function (key, value) {
            if (!this.containsKey(key)) {
                this.obj[key] = value;
                this._length++;
            }
        };
        //获取对象
        HashMap.prototype.get = function (key) {
            return this.containsKey(key) ? this.obj[key] : null;
        };
        //移除对象
        HashMap.prototype.remove = function (key) {
            if (this.containsKey(key)) {
                var value = this.obj;
                delete this.obj[key];
                this._length--;
                return value;
            }
            return null;
        };
        HashMap.prototype.foreach = function (callback, thisOjb) {
            for (var key in this.obj) {
                if (!callback.call(thisOjb, key, this.obj[key])) {
                    break;
                }
            }
        };
        //随机获取一个对象
        HashMap.prototype.randomGet = function () {
            var values = this.valueSet;
            return values[Math.floor(Math.random() * values.length)];
        };
        Object.defineProperty(HashMap.prototype, "keySet", {
            //获取所有Key
            get: function () {
                var keys = [];
                for (var key in this.obj) {
                    keys.push(key);
                }
                return keys;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(HashMap.prototype, "valueSet", {
            //获取所有对象
            get: function () {
                var values = [];
                for (var key in this.obj) {
                    values.push(this.obj[key]);
                }
                return values;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(HashMap.prototype, "size", {
            //获取长度
            get: function () {
                return this._length;
            },
            enumerable: true,
            configurable: true
        });
        //清除
        HashMap.prototype.clear = function () {
            this._length = 0;
            this.obj = {};
        };
        return HashMap;
    }());
    basic.HashMap = HashMap;
    __reflect(HashMap.prototype, "basic.HashMap");
})(basic || (basic = {}));
//# sourceMappingURL=HashMap.js.map