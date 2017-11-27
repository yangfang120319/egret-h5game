/**
 *
 * @聊天
 *
 */
class GameChat extends eui.Component {
	//定义变量
    private g_chat: eui.Group;
    private g_detail: eui.Group;
    private btn_send: eui.Button;
    private scroller: eui.Scroller;
    private txt_chat: eui.EditableText;
    private chat_detail: ChatItem[] = [];
    private chat_num: number = 0;
    
    //初始化
    createChildren(): void {
        super.createChildren();
        
        //注册事件
        basic.Dispatcher.addListener(EventNames.SHOW_TIPS,this.onShowTips,this);
        basic.Dispatcher.addListener(EventNames.SHOW_CHAT,this.onShowChat,this);

        //注册按钮
        this.btn_send.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onSendBtn,this);
    }
    
    //清楚界面
    clean(): void{
        //移除界面
        for(var i: number = 0;i < this.chat_num;i++){
            this.g_detail.addChild(this.chat_detail[i]);
        }

        //清楚数据
        this.chat_num = 0;
        this.chat_detail = [];
        this.scroller.viewport.scrollV = 0;
    }

    //显示提示
    private onShowTips(e:egret.Event): void{
        //定义变量
        var now_detail: string = "";
        var chat_item: ChatItem = new ChatItem();

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
        if(this.scroller.viewport.height < this.scroller.viewport.contentHeight) {
            this.scroller.validateNow();
            this.scroller.viewport.scrollV = this.scroller.viewport.contentHeight - this.scroller.viewport.height;
        }
    }
    
    //显示聊天
    private onShowChat(e:egret.Event): void{
        //定义变量
        var now_detail: string = "";
        var chat_item: ChatItem = new ChatItem();

        //判断显示
        if(e.data.from == "system"){
            now_detail += "<font color='#ff6b05'>法官：";
            now_detail += e.data.msg;
            now_detail += "</font>";
        }
        else if(e.data.from == "player"){
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
        if(this.scroller.viewport.height < this.scroller.viewport.contentHeight) {
            this.scroller.validateNow();
            this.scroller.viewport.scrollV = this.scroller.viewport.contentHeight - this.scroller.viewport.height;
        }
    }

    //发送按钮
    private onSendBtn(e: egret.TouchEvent): void {
        //播放声音
        basic.SoundManager.instance.playEffect("sound_btn_mp3");
        
        //判断发送
        if(this.txt_chat.text != ""){
            //发送消息
            Comm.instance.sendSocket({
                "type":"chat",
                "roomId": GameData.Room_Id,
                "msg": this.txt_chat.text,
                "from":"player"
            });
            
            //清空文本
            this.txt_chat.text = "";
        }
    }
}

//聊天显示条
class ChatItem extends eui.Component {
    //数据赋值
    private txt_detail: eui.Label;

    //定义界面
    public constructor() {
        super();
        
        //定义界面
        this.skinName = Item_GameChatSkin;
    }

    //显示界面
    show(_detail): void{
        //显示文本
        this.txt_detail.textFlow = (new egret.HtmlTextParser).parser(_detail);

        //定义高度
        this.height = this.txt_detail.height + 12;
    }
}
