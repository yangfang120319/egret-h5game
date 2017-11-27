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
/**
 *
 * 摇一摇工具类
 *
 */
var basic;
(function (basic) {
    var ShakeTool = (function (_super) {
        __extends(ShakeTool, _super);
        //初始化
        function ShakeTool() {
            var _this = _super.call(this) || this;
            //定义变量
            _this.orientation = null; //设备方向变化
            _this.xAngle = 0; //设备绕x角度
            _this.yAngle = 0; //设备绕y角度
            _this.zAngle = 0; //设备绕z角度
            _this.last_x = 0; //上一次绕x角度
            _this.last_y = 0; //上一次绕y角度
            _this.last_z = 0; //上一次绕z角度
            _this.shakeCount = 0; //摇动次数
            _this.lastTime = 0; //上一次更新时间
            _this.lastTime_check = 0; //上一次更新时间
            _this.shakeAngle = 45; //当晃动角度大于一定角度时，算摇动一次
            return _this;
        }
        /**开始 */
        ShakeTool.prototype.start = function () {
            //重置数据
            this.last_x = 0;
            this.last_y = 0;
            this.last_z = 0;
            this.lastTime = 0;
            this.shakeCount = 0;
            this.lastTime_check = 0;
            //停止监听
            this.stop();
            //开始监听
            this.orientation || (this.orientation = new egret.DeviceOrientation());
            this.orientation.addEventListener(egret.Event.CHANGE, this.onOrientation, this);
            this.orientation.start();
        };
        /**停止 */
        ShakeTool.prototype.stop = function () {
            //判断停止
            if (this.orientation) {
                this.orientation.stop();
                this.orientation.removeEventListener(egret.Event.CHANGE, this.onOrientation, this);
                this.orientation = null;
            }
        };
        //角度改变事件
        ShakeTool.prototype.onOrientation = function (e) {
            //定义当前时间
            var curTime = egret.getTimer();
            //每100ms判断一次
            if (curTime - this.lastTime > 100) {
                //数据赋值
                this.lastTime = curTime;
                this.xAngle = e.beta; //x轴
                this.yAngle = e.gamma; //y轴
                this.zAngle = e.alpha; //z轴
                //旋转超过一定角度，则算摇动一次
                if (Math.abs(this.last_x - this.xAngle) > this.shakeAngle ||
                    Math.abs(this.last_y - this.yAngle) > this.shakeAngle ||
                    Math.abs(this.last_z - this.zAngle) > this.shakeAngle) {
                    this.shakeCount++;
                }
                this.last_x = this.xAngle;
                this.last_y = this.yAngle;
                this.last_z = this.zAngle;
                //判断赋值
                if (this.shakeCount == 1) {
                    this.lastTime_check = egret.getTimer();
                }
            }
            //每300ms发送一次
            if (this.lastTime_check != 0 && curTime - this.lastTime_check > 400) {
                //派发事件(应该在shakeCount++时派发一次，写在这里只是为了方便显示测试数据...)
                this.dispatchEventWith(egret.Event.CHANGE, false, {
                    x: this.xAngle,
                    y: this.yAngle,
                    z: this.zAngle,
                    shakeCount: this.shakeCount
                });
                //重置数据
                this.last_x = 0;
                this.last_y = 0;
                this.last_z = 0;
                this.lastTime = 0;
                this.shakeCount = 0;
                this.lastTime_check = 0;
            }
        };
        return ShakeTool;
    }(egret.EventDispatcher));
    basic.ShakeTool = ShakeTool;
    __reflect(ShakeTool.prototype, "basic.ShakeTool");
})(basic || (basic = {}));
//# sourceMappingURL=ShakeTool.js.map