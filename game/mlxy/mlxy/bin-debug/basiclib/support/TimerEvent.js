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
 * @author
 *
 */
var basic;
(function (basic) {
    var TimerEvent = (function (_super) {
        __extends(TimerEvent, _super);
        function TimerEvent() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        //定义变量
        TimerEvent.TIMER = "timer";
        TimerEvent.TIMER_COMPLETE = "timer_complete";
        return TimerEvent;
    }(egret.Event));
    basic.TimerEvent = TimerEvent;
    __reflect(TimerEvent.prototype, "basic.TimerEvent");
})(basic || (basic = {}));
//# sourceMappingURL=TimerEvent.js.map