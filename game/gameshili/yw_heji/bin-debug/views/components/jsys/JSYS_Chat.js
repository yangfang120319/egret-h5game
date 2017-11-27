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
 * @聊天界面
 *
 */
var JSYS_Chat = (function (_super) {
    __extends(JSYS_Chat, _super);
    function JSYS_Chat() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.old_chat = "";
        //表情变量
        _this.bq_num = 0;
        _this.bq_index = [];
        _this.bq_detail = [];
        _this.bq_picture = [];
        _this.system_message = [];
        _this.is_SystemStart = false;
        _this._tween_x = null;
        _this._tween_alpha = null;
        _this.show_chat = [];
        _this.show_chat_num = 0;
        return _this;
    }
    //初始化
    JSYS_Chat.prototype.createChildren = function () {
        _super.prototype.createChildren.call(this);
        //清空文本
        this.txt_chat.text = "";
        this.txt_tips.visible = true;
        //定义测试文本
        this.txt_test = new egret.TextField();
        this.txt_test.fontFamily = "微软雅黑";
        this.txt_test.size = 16;
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
        this.g_system.visible = false;
        this.txt_chat.text = "";
        //注册事件
        basic.Dispatcher.addListener(EventNames.JSYS_SHOWCHAT, this.onShowChat, this);
        basic.Dispatcher.addListener(EventNames.JSYS_DELETECHAT, this.onDeleteChat, this);
        basic.Dispatcher.addListener(EventNames.JSYS_ADDBIAOQING, this.onAddBiaoQing, this);
        //注册按钮
        this.txt_chat.addEventListener(egret.Event.CHANGE, this.onChatTextChange, this);
        this.txt_chat.addEventListener(egret.FocusEvent.FOCUS_IN, this.onChatText, this);
        this.txt_chat.addEventListener(egret.FocusEvent.FOCUS_OUT, this.onChatText, this);
        this.btn_send.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onSendBtn, this);
        this.btn_biaoqing.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBiaoQingBtn, this);
    };
    //清除界面
    JSYS_Chat.prototype.clean = function () {
        //移除聊天
        for (var i = 0; i < this.show_chat_num; i++) {
            this.g_detail.removeChild(this.show_chat[i]);
        }
        this.show_chat = [];
        this.show_chat_num = 0;
    };
    //显示聊天
    JSYS_Chat.prototype.onShowChat = function (e) {
        //判断显示
        if (e.data.chatType == 1) {
            //定义变量
            var item = new Chat_Item();
            var message = {
                "uid": e.data.account,
                "nickname": e.data.nickName,
                "message": e.data.msg,
                "head": e.data.headImgURL,
                "vip": e.data.vipLevel
            };
            //显示聊天条
            item.show(message, 430);
            this.show_chat[this.show_chat_num] = item;
            this.g_detail.addChild(this.show_chat[this.show_chat_num]);
            this.show_chat_num += 1;
            //判断显示位置
            if (this.scroller.viewport.height < this.scroller.viewport.contentHeight) {
                this.scroller.validateNow();
                this.scroller.viewport.scrollV = this.scroller.viewport.contentHeight - this.scroller.viewport.height;
            }
        }
        else if (e.data.chatType == 0) {
            //显示系统通知
            this.showSystemChat(e.data.msg);
        }
    };
    //聊天文本
    JSYS_Chat.prototype.onChatText = function (e) {
        //判断显示
        if (e.type == egret.FocusEvent.FOCUS_IN) {
            this.txt_tips.visible = false;
        }
        else if (e.type == egret.FocusEvent.FOCUS_OUT) {
            if (this.txt_chat.text == "") {
                this.txt_tips.visible = true;
            }
        }
    };
    //删除聊天
    JSYS_Chat.prototype.onDeleteChat = function (e) {
        //判断显示
        if (this.txt_chat.text != "") {
            this.txt_chat.text = this.txt_chat.text.substring(0, this.txt_chat.text.length - 1);
        }
        //定义变量
        var num_nowchange_index = -1;
        var str_new_chat = this.txt_chat.text;
        //数据比对
        for (var i = 0; i < this.old_chat.length; i++) {
            if (i < str_new_chat.length) {
                if (str_new_chat.charAt(i) != this.old_chat.charAt(i)) {
                    num_nowchange_index = i;
                    break;
                }
            }
        }
        //改变值
        var num_change_x = this.txt_chat.textWidth;
        var num_change_index = Math.max(-1, str_new_chat.length - this.old_chat.length);
        this.txt_test.text = this.old_chat;
        num_change_x = Math.max(-30, num_change_x - this.txt_test.textWidth);
        if (num_nowchange_index == -1) {
            if (num_change_x > 0) {
                num_nowchange_index = str_new_chat.length - 1;
            }
            else {
                num_nowchange_index = this.old_chat.length - 1;
            }
        }
        //判断显示
        for (var j = 0; j < this.bq_num; j++) {
            if (this.bq_picture[j] != null) {
                if (this.bq_index[j] > num_nowchange_index) {
                    this.bq_index[j] += num_change_index;
                    this.bq_picture[j].x = this.bq_picture[j].x + num_change_x;
                }
                else if (this.bq_index[j] == num_nowchange_index) {
                    this.g_show_bq.removeChild(this.bq_picture[j]);
                    this.bq_picture[j] = null;
                }
                else {
                    if (this.bq_index[j] >= str_new_chat.length) {
                        this.g_show_bq.removeChild(this.bq_picture[j]);
                        this.bq_picture[j] = null;
                    }
                }
            }
        }
        this.old_chat = str_new_chat;
        this.txt_chat.text = str_new_chat;
        //判断清空数据
        if (this.txt_chat.text == "") {
            this.txt_tips.visible = true;
            for (var k = 0; k < this.bq_num; k++) {
                if (this.bq_picture[k] != null) {
                    this.g_show_bq.removeChild(this.bq_picture[k]);
                    this.bq_picture[k] = null;
                }
            }
            this.bq_num = 0;
            this.bq_index = [];
            this.bq_detail = [];
            this.bq_picture = [];
        }
    };
    //添加表情
    JSYS_Chat.prototype.onAddBiaoQing = function (e) {
        //判断显示
        if (Number(e.data.num) > 0) {
            //显示文本
            this.txt_test.text = this.txt_chat.text + "　";
            //判断显示
            if (this.txt_test.textWidth > this.txt_chat.width) {
                this.txt_chat.text = this.old_chat;
            }
            else {
                //定义变量
                var img_bq = new eui.Image();
                //数据赋值
                img_bq.y = 10;
                img_bq.width = 16;
                img_bq.height = 16;
                this.txt_test.text = this.old_chat;
                this.bq_detail[this.bq_num] = e.data.num;
                this.bq_index[this.bq_num] = this.txt_chat.text.length;
                img_bq.source = "icon_bq_" + this.bq_detail[this.bq_num] + "_png";
                img_bq.x = this.txt_test.textWidth;
                this.bq_picture[this.bq_num] = img_bq;
                this.g_show_bq.addChild(this.bq_picture[this.bq_num]);
                this.bq_num += 1;
                //显示文本
                this.txt_chat.text = this.txt_chat.text + "　";
                this.old_chat = this.txt_chat.text;
            }
            //判断显示
            if (this.old_chat != "") {
                this.txt_tips.visible = false;
            }
        }
    };
    //聊天文本改变事件
    JSYS_Chat.prototype.onChatTextChange = function (e) {
        //显示文本
        this.txt_test.text = this.txt_chat.text;
        //显示文本
        if (this.txt_test.textWidth > this.txt_chat.width) {
            this.txt_chat.text = this.old_chat;
        }
        else {
            //定义变量
            var num_nowchange_index = -1;
            var str_new_chat = this.txt_chat.text;
            //数据比对
            for (var i = 0; i < this.old_chat.length; i++) {
                if (i < str_new_chat.length) {
                    if (str_new_chat.charAt(i) != this.old_chat.charAt(i)) {
                        num_nowchange_index = i;
                        break;
                    }
                }
            }
            //改变值
            var num_change_x = this.txt_chat.textWidth;
            var num_change_index = Math.max(-1, str_new_chat.length - this.old_chat.length);
            this.txt_test.text = this.old_chat;
            num_change_x = Math.max(-30, num_change_x - this.txt_test.textWidth);
            if (num_nowchange_index == -1) {
                if (num_change_x > 0) {
                    num_nowchange_index = str_new_chat.length - 1;
                }
                else {
                    num_nowchange_index = this.old_chat.length - 1;
                }
            }
            //判断显示
            for (var j = 0; j < this.bq_num; j++) {
                if (this.bq_picture[j] != null) {
                    if (this.bq_index[j] > num_nowchange_index) {
                        this.bq_index[j] += num_change_index;
                        this.bq_picture[j].x = this.bq_picture[j].x + num_change_x;
                    }
                    else if (this.bq_index[j] == num_nowchange_index) {
                        this.g_show_bq.removeChild(this.bq_picture[j]);
                        this.bq_picture[j] = null;
                    }
                    else {
                        if (this.bq_index[j] >= str_new_chat.length) {
                            this.g_show_bq.removeChild(this.bq_picture[j]);
                            this.bq_picture[j] = null;
                        }
                    }
                }
            }
            this.old_chat = str_new_chat;
            this.txt_chat.text = str_new_chat;
        }
        //判断清空数据
        if (this.txt_chat.text == "") {
            this.txt_tips.visible = true;
            for (var k = 0; k < this.bq_num; k++) {
                if (this.bq_picture[k] != null) {
                    this.g_show_bq.removeChild(this.bq_picture[k]);
                    this.bq_picture[k] = null;
                }
            }
            this.bq_num = 0;
            this.bq_index = [];
            this.bq_detail = [];
            this.bq_picture = [];
        }
        else {
            this.txt_tips.visible = false;
        }
    };
    //表情按钮
    JSYS_Chat.prototype.onBiaoQingBtn = function (e) {
        //播放声音
        basic.SoundManager.instance.playEffect("sound_btn_mp3");
        //发送消息
        basic.Dispatcher.dispatch(EventNames.JSYS_SHOWBIAOQING);
    };
    //发送按钮
    JSYS_Chat.prototype.onSendBtn = function (e) {
        //判断显示
        if (this.txt_chat.text != "") {
            //判断显示
            if (UserData.User_VIP == 15) {
                //显示提示
                basic.Dispatcher.dispatch(EventNames.SHOW_TIPS, { "tips": "VIP15账号不能再游戏中发言" });
            }
            else {
                //定义变量
                var str_send_detail = "";
                //播放声音
                basic.SoundManager.instance.playEffect("sound_send_mp3");
                //数据复制
                for (var i = 0; i < this.txt_chat.text.length; i++) {
                    //数据赋值
                    var num_bq = -1;
                    //数据赋值
                    for (var j = 0; j < this.bq_num; j++) {
                        if (this.bq_picture[j] != null && i == this.bq_index[j]) {
                            num_bq = Number(this.bq_detail[j]);
                            break;
                        }
                    }
                    //判断复制
                    if (num_bq == -1) {
                        str_send_detail += this.txt_chat.text.charAt(i);
                    }
                    else {
                        str_send_detail += "[" + num_bq.toString() + "]";
                    }
                }
                //发送消息
                Comm_jsys.instance.sendSocket({ "type": "chat", "msg": str_send_detail });
                //清除数据
                this.old_chat = "";
                this.txt_chat.text = "";
                this.txt_tips.visible = true;
                for (var k = 0; k < this.bq_num; k++) {
                    if (this.bq_picture[k] != null) {
                        this.g_show_bq.removeChild(this.bq_picture[k]);
                        this.bq_picture[k] = null;
                    }
                }
                this.bq_num = 0;
                this.bq_index = [];
                this.bq_detail = [];
                this.bq_picture = [];
            }
        }
    };
    //显示系统聊天
    JSYS_Chat.prototype.showSystemChat = function (_message) {
        //数据赋值
        this.system_message[this.system_message.length] = _message;
        //开始滚动
        this.startShowSystem();
    };
    //开始显示系统
    JSYS_Chat.prototype.startShowSystem = function () {
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
                this.g_system.visible = true;
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
                    _this.g_system.visible = false;
                    //开始滚动
                    _this.startShowSystem();
                });
            }
        }
    };
    return JSYS_Chat;
}(eui.Component));
__reflect(JSYS_Chat.prototype, "JSYS_Chat");
