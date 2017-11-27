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
 * @开始界面消息
 *
 */
var Start_Chat = (function (_super) {
    __extends(Start_Chat, _super);
    function Start_Chat() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.system_message = [];
        _this.is_SystemStart = false;
        _this._tween_x = null;
        _this._tween_alpha = null;
        //历史消息
        _this.show_chat_num = 0;
        _this.show_chat = [];
        return _this;
    }
    //初始化
    Start_Chat.prototype.createChildren = function () {
        _super.prototype.createChildren.call(this);
        //清空文本
        this.g_show.scaleY = 0;
        this.txt_chat.text = "";
        this.g_show.visible = false;
        this.g_system.visible = true;
        this.rect_back.visible = false;
        //显示系统文本
        this.rect_system_mask.visible = true;
        this.txt_System = new egret.TextField();
        this.txt_System.y = 10;
        this.txt_System.size = 20;
        this.txt_System.height = 20;
        this.txt_System.fontFamily = "微软雅黑";
        this.g_system.addChild(this.txt_System);
        this.g_system.setChildIndex(this.rect_system_mask, this.g_system.numChildren - 1);
        this.txt_System.mask = this.rect_system_mask;
        this.txt_chat.text = "";
        //注册事件
        basic.Dispatcher.addListener(EventNames.SHOW_CHAT, this.onShowChat, this);
        basic.Dispatcher.addListener(EventNames.SHOW_TOTALCHAT, this.onShowTotalChat, this);
        //注册按钮
        this.txt_chat.addEventListener(egret.FocusEvent.FOCUS_IN, this.onChatText, this);
        this.btn_send.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onSendBtn, this);
        this.rect_back.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onHideChat, this);
    };
    //显示聊天 
    Start_Chat.prototype.showChat = function () {
        var _this = this;
        //判断显示
        if (this.g_show.scaleY == 0) {
            //移除所有聊天
            this.removeAllChat();
            //显示界面
            this.g_show.visible = true;
            this.rect_back.visible = true;
            //发送消息
            Comm.instance.sendSocket({ "type": "chatList" });
            //显示界面
            var _tween_scaleY = egret.Tween.get(this.g_show).
                to({ scaleY: 1 }, 400, egret.Ease.backOut).call(function () {
                _this.g_system.visible = false;
            });
        }
    };
    //显示所有聊天
    Start_Chat.prototype.onShowTotalChat = function (e) {
        //显示所有聊天
        for (var i = 0; i < e.data.data.length; i++) {
            //定义变量
            var item = new Chat_Item();
            var message = {
                "uid": e.data.data[i].account,
                "nickname": e.data.data[i].nickName,
                "message": e.data.data[i].msg,
                "head": e.data.data[i].headImgURL,
                "vip": e.data.data[i].vipLevel
            };
            item.show(message, 585);
            this.show_chat[this.show_chat_num] = item;
            this.g_detail.addChild(this.show_chat[this.show_chat_num]);
            this.show_chat_num += 1;
        }
        //判断显示位置
        if (this.scroller.viewport.height < this.scroller.viewport.contentHeight) {
            this.scroller.validateNow();
            this.scroller.viewport.scrollV = this.scroller.viewport.contentHeight - this.scroller.viewport.height;
        }
    };
    //移除所有聊天
    Start_Chat.prototype.removeAllChat = function () {
        //移除聊天
        for (var i = 0; i < this.show_chat_num; i++) {
            this.g_detail.removeChild(this.show_chat[i]);
        }
        this.show_chat = [];
        this.show_chat_num = 0;
    };
    //显示聊天
    Start_Chat.prototype.onShowChat = function (e) {
        //数据赋值
        var chat_data = e.data;
        chat_data.chatType = 0;
        //发送消息
        basic.Dispatcher.dispatch(EventNames.EBG_SHOWCHAT, chat_data);
        basic.Dispatcher.dispatch(EventNames.JSYS_SHOWCHAT, chat_data);
        //显示系统通知
        this.showSystemChat(e.data.msg);
    };
    //聊天文本
    Start_Chat.prototype.onChatText = function (e) {
        //判断显示
        if (e.type == egret.FocusEvent.FOCUS_IN) {
            //显示界面
            this.showChat();
        }
    };
    //移除聊天
    Start_Chat.prototype.onHideChat = function (e) {
        var _this = this;
        //判断显示
        if (this.g_show.scaleY == 1) {
            //显示界面
            this.txt_chat.text = "";
            this.rect_back.visible = false;
            //显示界面
            var _tween_scaleY = egret.Tween.get(this.g_show).
                to({ scaleY: 0 }, 400, egret.Ease.backIn).call(function () {
                //界面
                _this.g_show.visible = false;
                _this.g_system.visible = true;
                //移除所有聊天
                _this.removeAllChat();
            });
        }
    };
    //发送按钮
    Start_Chat.prototype.onSendBtn = function (e) {
        var _this = this;
        //判断显示
        if (UserData.User_VIP == 15) {
            if (this.txt_chat.text != "") {
                //发送消息
                Comm.instance.sendSocket({ "type": "chat", "msg": this.txt_chat.text });
                //清空文本
                this.txt_chat.text = "";
                //判断显示
                if (this.g_show.scaleY == 1) {
                    //显示界面
                    this.rect_back.visible = false;
                    //显示界面
                    var _tween_scaleY = egret.Tween.get(this.g_show).
                        to({ scaleY: 0 }, 400, egret.Ease.backIn).call(function () {
                        //界面
                        _this.g_show.visible = false;
                        _this.g_system.visible = true;
                        //移除所有聊天
                        _this.removeAllChat();
                    });
                }
            }
        }
        else {
            basic.Dispatcher.dispatch(EventNames.SHOW_TIPS, { "tips": "您等级不足15级，不能发言" });
        }
    };
    //显示系统聊天
    Start_Chat.prototype.showSystemChat = function (_message) {
        //数据赋值
        this.system_message[this.system_message.length] = _message;
        //开始滚动
        this.startShowSystem();
    };
    //开始显示系统
    Start_Chat.prototype.startShowSystem = function () {
        var _this = this;
        //判断开始
        if (this.is_SystemStart == false) {
            //定义变量
            var str_nowshow = "";
            //数据赋值
            for (var i = 0; i < this.system_message.length; i++) {
                if (this.system_message[i] != "") {
                    //数据赋值
                    str_nowshow = this.system_message[i];
                    this.system_message[i] = "";
                    break;
                }
            }
            //判断显示
            if (str_nowshow != "") {
                //定义变量
                var num_move_x;
                var num_move_time;
                //数据赋值
                this.is_SystemStart = true;
                //显示文本
                this.txt_System.x = 470;
                this.txt_System.width = 1000;
                this.txt_System.textFlow = (new egret.HtmlTextParser).parser(str_nowshow);
                this.txt_System.width = this.txt_System.textWidth;
                num_move_x = 470 + this.txt_System.width;
                num_move_time = num_move_x * 20;
                //开始动画
                this._tween_x = egret.Tween.get(this.txt_System).to({ x: 470 - num_move_x }, num_move_time).call(function () {
                    //数据赋值
                    _this.is_SystemStart = false;
                    //开始滚动
                    _this.startShowSystem();
                });
            }
        }
    };
    return Start_Chat;
}(eui.Component));
__reflect(Start_Chat.prototype, "Start_Chat");
