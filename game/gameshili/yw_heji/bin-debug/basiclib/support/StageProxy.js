var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 *Created by jq on 2016/1/24
 * @Stage容器
 *
 */
var basic;
(function (basic) {
    var StageProxy = (function () {
        function StageProxy() {
        }
        //初始化
        StageProxy.init = function (stage, root) {
            this.stage = stage;
            this.root = root;
        };
        Object.defineProperty(StageProxy, "width", {
            //获取宽度
            get: function () {
                return this.stage.stageWidth;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(StageProxy, "height", {
            //获取高度
            get: function () {
                return this.stage.stageHeight;
            },
            enumerable: true,
            configurable: true
        });
        return StageProxy;
    }());
    basic.StageProxy = StageProxy;
    __reflect(StageProxy.prototype, "basic.StageProxy");
})(basic || (basic = {}));
