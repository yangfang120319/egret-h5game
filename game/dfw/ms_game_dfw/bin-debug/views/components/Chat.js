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
 * @消息
 *
 */
var Chat = (function (_super) {
    __extends(Chat, _super);
    function Chat() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        //系统消息变量
        _this._tween_y = null;
        _this._tween_alpha = null;
        _this.now_show_chat = 0;
        _this.chat_detail = [
            "使用【遥控骰子】：你想走到哪里就到哪里",
            "使用【阻止发生】：不喜欢的事情你可以拒绝",
            "使用【原地停留】：你让谁停，他就得停",
            "扫码【充值】：找美女扫码充值5折优惠！找美女，5折",
            "使用【房间】：让离开游戏的人重新进来"
        ];
        return _this;
    }
    //初始化
    Chat.prototype.createChildren = function () {
        _super.prototype.createChildren.call(this);
        //显示系统文本
        this.txt_chat.text = "";
        this.txt_chat.x = this.rect_mask.x;
        this.now_show_chat = Math.floor(Math.random() * this.chat_detail.length);
        this.rect_mask.visible = true;
        this.txt_chat.mask = this.rect_mask;
    };
    //开始消息
    Chat.prototype.start = function () {
        var _this = this;
        //定义变量
        var now_show;
        var show_detail = "";
        //判断赋值
        for (var i = 0; i < 20; i++) {
            now_show = Math.floor(Math.random() * this.chat_detail.length);
            if (now_show != this.now_show_chat) {
                this.now_show_chat = now_show;
                break;
            }
        }
        show_detail = this.chat_detail[this.now_show_chat];
        //显示文本
        this.txt_chat.y = this.height + 5;
        this.txt_chat.textFlow = (new egret.HtmlTextParser).parser(show_detail);
        //开始动画
        this._tween_y = egret.Tween.get(this.txt_chat).wait(500).
            to({ y: (this.height - this.txt_chat.height) / 2 }, 100).
            wait(6000).
            to({ y: -5 - this.txt_chat.height }, 100).
            call(function () {
            //开始滚动
            _this.start();
        });
    };
    //停止消息
    Chat.prototype.stop = function () {
        if (this._tween_y) {
            this._tween_y.setPaused(true);
            this._tween_y = null;
        }
    };
    return Chat;
}(eui.Component));
__reflect(Chat.prototype, "Chat");
//# sourceMappingURL=Chat.js.map