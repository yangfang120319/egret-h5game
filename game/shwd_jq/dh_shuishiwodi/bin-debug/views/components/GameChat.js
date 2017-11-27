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
 * @聊天
 *
 */
var GameChat = (function (_super) {
    __extends(GameChat, _super);
    function GameChat() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.chat_detail = [];
        _this.chat_num = 0;
        return _this;
    }
    //初始化
    GameChat.prototype.createChildren = function () {
        _super.prototype.createChildren.call(this);
        //注册事件
        basic.Dispatcher.addListener(EventNames.SHOW_TIPS, this.onShowTips, this);
        basic.Dispatcher.addListener(EventNames.SHOW_CHAT, this.onShowChat, this);
        //注册按钮
        this.btn_send.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onSendBtn, this);
    };
    //清楚界面
    GameChat.prototype.clean = function () {
        //移除界面
        for (var i = 0; i < this.chat_num; i++) {
            this.g_detail.addChild(this.chat_detail[i]);
        }
        //清楚数据
        this.chat_num = 0;
        this.chat_detail = [];
        this.scroller.viewport.scrollV = 0;
    };
    //显示提示
    GameChat.prototype.onShowTips = function (e) {
        //定义变量
        var now_detail = "";
        var chat_item = new ChatItem();
        //数据赋值
        now_detail += "<font color='#a5a5a5'>法官：";
        now_detail += e.data.msg;
        now_detail += "</font>";
        //显示聊天
        chat_item.show(now_detail);
        this.chat_detail[this.chat_num] = chat_item;
        this.g_detail.addChild(this.chat_detail[this.chat_num]);
        this.chat_num += 1;
        //判断显示位置
        if (this.scroller.viewport.height < this.scroller.viewport.contentHeight) {
            this.scroller.validateNow();
            this.scroller.viewport.scrollV = this.scroller.viewport.contentHeight - this.scroller.viewport.height;
        }
    };
    //显示聊天
    GameChat.prototype.onShowChat = function (e) {
        //定义变量
        var now_detail = "";
        var chat_item = new ChatItem();
        //判断显示
        if (e.data.from == "system") {
            now_detail += "<font color='#ff6b05'>法官：";
            now_detail += e.data.msg;
            now_detail += "</font>";
        }
        else if (e.data.from == "player") {
            now_detail += "<font color='#f86283'>";
            now_detail += e.data.nickName + "：";
            now_detail += e.data.msg;
            now_detail += "</font>";
        }
        //显示聊天
        chat_item.show(now_detail);
        this.chat_detail[this.chat_num] = chat_item;
        this.g_detail.addChild(this.chat_detail[this.chat_num]);
        this.chat_num += 1;
        //判断显示位置
        if (this.scroller.viewport.height < this.scroller.viewport.contentHeight) {
            this.scroller.validateNow();
            this.scroller.viewport.scrollV = this.scroller.viewport.contentHeight - this.scroller.viewport.height;
        }
    };
    //发送按钮
    GameChat.prototype.onSendBtn = function (e) {
        //播放声音
        basic.SoundManager.instance.playEffect("sound_btn_mp3");
        //判断发送
        if (this.txt_chat.text != "") {
            //发送消息
            Comm.instance.sendSocket({
                "type": "chat",
                "roomId": GameData.Room_Id,
                "msg": this.txt_chat.text,
                "from": "player"
            });
            //清空文本
            this.txt_chat.text = "";
        }
    };
    return GameChat;
}(eui.Component));
__reflect(GameChat.prototype, "GameChat");
//聊天显示条
var ChatItem = (function (_super) {
    __extends(ChatItem, _super);
    //定义界面
    function ChatItem() {
        var _this = _super.call(this) || this;
        //定义界面
        _this.skinName = Item_GameChatSkin;
        return _this;
    }
    //显示界面
    ChatItem.prototype.show = function (_detail) {
        //显示文本
        this.txt_detail.textFlow = (new egret.HtmlTextParser).parser(_detail);
        //定义高度
        this.height = this.txt_detail.height + 12;
    };
    return ChatItem;
}(eui.Component));
__reflect(ChatItem.prototype, "ChatItem");
