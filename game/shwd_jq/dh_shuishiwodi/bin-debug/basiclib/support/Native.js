/**
 * Created by jq on 2016/2/8.
 */
var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var basic;
(function (basic) {
    var Native = (function (_super) {
        __extends(Native, _super);
        //初始化
        function Native() {
            var _this = _super.call(this) || this;
            egret.ExternalInterface.addCallback('egretCall', _this.egretCall.bind(_this));
            return _this;
        }
        Object.defineProperty(Native, "instance", {
            get: function () {
                if (this._instance == undefined) {
                    this._instance = new Native();
                }
                return this._instance;
            },
            enumerable: true,
            configurable: true
        });
        Native.call = function (method, params) {
            if (params === void 0) { params = null; }
            this.instance.call(method, params);
        };
        Object.defineProperty(Native.prototype, "isNative", {
            get: function () {
                return egret.Capabilities.runtimeType == egret.RuntimeType.NATIVE;
            },
            enumerable: true,
            configurable: true
        });
        Native.prototype.egretCall = function (str) {
            var params = JSON.parse(str);
            var method = params.method;
            this.dispatchEventWith(method, false, params);
        };
        Native.prototype.call = function (method, params) {
            if (params === void 0) { params = null; }
            params = params || {};
            params.method = method;
            egret.ExternalInterface.call('nativeCall', JSON.stringify(params));
        };
        Native.prototype.navigateToUrl = function (url) {
            if (this.isNative) {
                this.call('navigateToUrl', { url: url });
            }
            else {
                location.href = url;
            }
        };
        Native.prototype.closeApp = function () {
            this.call('closeApp');
        };
        Native.prototype.showBanner = function () {
            //console.log('showBanner');
            if (this.isNative) {
                this.call('showBanner');
            }
            else {
            }
        };
        Native.prototype.hideBanner = function () {
            //console.log('hideBanner');
            if (this.isNative) {
                this.call('hideBanner');
            }
            else {
            }
        };
        Native.prototype.showInterstitial = function () {
            //console.log('showInterstitial');
            if (this.isNative) {
                this.call('showInterstitial');
            }
            else {
            }
        };
        Native.prototype.jumpApp = function (params) {
            //console.log('download');
            if (this.isNative) {
                this.call('jumpApp', params);
            }
            else {
                this.navigateToUrl(params.android_apk_url);
            }
        };
        Native.prototype.openAppMarket = function () {
            //console.log('openAppMarket');
            if (this.isNative) {
                this.call('openAppMarket', {});
            }
            else {
            }
        };
        Native.prototype.share = function (title, name, description, picture, link) {
            //console.log('share');
            if (this.isNative) {
                this.call('share', {
                    title: title,
                    name: name,
                    description: description,
                    picture: picture,
                    link: link
                });
            }
            else {
                //share(title, description, link);
            }
        };
        Native.prototype.shareSystem = function (title, description, link) {
            //console.log('shareSystem');
            if (this.isNative) {
                this.call('shareSystem', {
                    title: title,
                    description: description
                });
            }
            else {
                this.share(title, '', description, '', link);
            }
        };
        Native.prototype.sendEvent = function (eventId, params) {
            //console.log('sendEvent');
            if (this.isNative) {
                this.call('sendEvent', { eventId: eventId, params: params });
            }
            else {
            }
        };
        return Native;
    }(egret.EventDispatcher));
    basic.Native = Native;
    __reflect(Native.prototype, "basic.Native");
})(basic || (basic = {}));
