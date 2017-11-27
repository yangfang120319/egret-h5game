/**
 *
 * @author 
 *
 */
class EBG_Chat extends eui.Component {
    //定义变量
    private g_show: eui.Group;
    private txt_tips: eui.Label;
    private btn_send: eui.Button;
    private g_show_bq: eui.Group;
    private btn_biaoqing: eui.Button;
    private txt_chat: eui.EditableText;
    private txt_test: egret.TextField;
    private scroller: eui.Scroller;
    private g_detail: eui.Group;
    private rect_back: eui.Rect;
    private old_chat: string = "";

    //表情变量
    private bq_num: number = 0;
    private bq_index: number[] = [];
    private bq_detail: string[] = [];
    private bq_picture: eui.Image[] = [];

    //系统消息变量
    private show_chat: Chat_Item[] = [];
    private show_chat_num: number = 0;

    //初始化
    createChildren(): void {
        super.createChildren();

        //清空文本
        this.g_show.scaleY = 0;
        this.txt_chat.text = "";
        this.g_show.visible = false;
        this.txt_tips.visible = true;
        this.rect_back.visible = false;

        //定义测试文本
        this.txt_test = new egret.TextField();
        this.txt_test.fontFamily = "微软雅黑";
        this.txt_test.size = 20;

        //注册事件
        basic.Dispatcher.addListener(EventNames.EBG_SHOWCHAT,this.onShowChat,this);
        basic.Dispatcher.addListener(EventNames.EBG_DELETECHAT,this.onDeleteChat,this);
        basic.Dispatcher.addListener(EventNames.EBG_ADDBIAOQING,this.onAddBiaoQing,this);

        //注册按钮
        this.txt_chat.addEventListener(egret.Event.CHANGE,this.onChatTextChange,this);
        this.txt_chat.addEventListener(egret.FocusEvent.FOCUS_IN,this.onChatText,this);
        this.txt_chat.addEventListener(egret.FocusEvent.FOCUS_OUT,this.onChatText,this);
        this.btn_send.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onSendBtn,this);
        this.rect_back.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onHideChat,this);
        this.btn_biaoqing.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onBiaoQingBtn,this);
    }

    //清除界面
    clean(): void {
        //移除聊天
        for(var i: number = 0;i < this.show_chat_num;i++) {
            this.g_detail.removeChild(this.show_chat[i]);
        }
        this.show_chat = [];
        this.show_chat_num = 0;
    }

    //显示聊天
    private onShowChat(e: egret.Event): void {
        //判断显示
        if(e.data.chatType == 1) {
            //定义变量
            var item: Chat_Item = new Chat_Item();
            var message: any = {
                "uid": e.data.account,
                "nickname": e.data.nickName,
                "message": e.data.msg,
                "head": e.data.headImgURL,
                "vip": e.data.vipLevel
            };

            //显示聊天条
            item.show(message,530);
            this.show_chat[this.show_chat_num] = item;
            this.g_detail.addChild(this.show_chat[this.show_chat_num]);
            this.show_chat_num += 1;

            //判断显示位置
            if(this.scroller.viewport.height < this.scroller.viewport.contentHeight) {
                this.scroller.validateNow();
                this.scroller.viewport.scrollV = this.scroller.viewport.contentHeight - this.scroller.viewport.height;
            }
        }
    }

    //聊天文本
    private onChatText(e: egret.FocusEvent): void {
        //判断显示
        if(e.type == egret.FocusEvent.FOCUS_IN) {
            this.txt_tips.visible = false;
            
            //显示界面
            this.showChat();
        }
        else if(e.type == egret.FocusEvent.FOCUS_OUT) {
            if(this.txt_chat.text == "") {
                this.txt_tips.visible = true;
            }
        }
    }

    //移除聊天
    private onHideChat(e: egret.TouchEvent): void {
        //判断显示
        if(this.g_show.scaleY == 1) {
            //显示界面
            this.rect_back.visible = false;
            
            //显示界面
            var _tween_scaleY: egret.Tween = egret.Tween.get(this.g_show).to({ scaleY: 0 },400,egret.Ease.backIn).call(()=>{
                //界面
                this.g_show.visible = false;
            });
        }
    }
    
    //显示聊天 
    private showChat():void{
        //判断显示
        if(this.g_show.scaleY == 0) {
            //显示界面
            this.g_show.visible = true;
            this.rect_back.visible = true;
            
            //显示界面
            var _tween_scaleY: egret.Tween = egret.Tween.get(this.g_show).to({ scaleY: 1 },400,egret.Ease.backOut);
        }
    }
    
    //删除聊天
    private onDeleteChat(e: egret.Event): void {
        //判断显示
        if(this.txt_chat.text != "") {
            this.txt_chat.text = this.txt_chat.text.substring(0,this.txt_chat.text.length - 1);
        }

        //定义变量
        var num_nowchange_index: number = -1;
        var str_new_chat: string = this.txt_chat.text;

        //数据比对
        for(var i: number = 0;i < this.old_chat.length;i++) {
            if(i < str_new_chat.length) {
                if(str_new_chat.charAt(i) != this.old_chat.charAt(i)) {
                    num_nowchange_index = i;
                    break;
                }
            }
        }

        //改变值
        var num_change_x: number = this.txt_chat.textWidth;
        var num_change_index: number = Math.max(-1,str_new_chat.length - this.old_chat.length);
        this.txt_test.text = this.old_chat;
        num_change_x = Math.max(-30,num_change_x - this.txt_test.textWidth);
        if(num_nowchange_index == -1) {
            if(num_change_x > 0) {
                num_nowchange_index = str_new_chat.length - 1;
            }
            else {
                num_nowchange_index = this.old_chat.length - 1;
            }
        }

        //判断显示
        for(var j: number = 0;j < this.bq_num;j++) {
            if(this.bq_picture[j] != null) {
                if(this.bq_index[j] > num_nowchange_index) {
                    this.bq_index[j] += num_change_index;
                    this.bq_picture[j].x = this.bq_picture[j].x + num_change_x;
                }
                else if(this.bq_index[j] == num_nowchange_index) {
                    this.g_show_bq.removeChild(this.bq_picture[j]);
                    this.bq_picture[j] = null;
                }
                else {
                    if(this.bq_index[j] >= str_new_chat.length) {
                        this.g_show_bq.removeChild(this.bq_picture[j]);
                        this.bq_picture[j] = null;
                    }
                }
            }
        }
        this.old_chat = str_new_chat;
        this.txt_chat.text = str_new_chat;

        //判断清空数据
        if(this.txt_chat.text == "") {
            this.txt_tips.visible = true;
            for(var k: number = 0;k < this.bq_num;k++) {
                if(this.bq_picture[k] != null) {
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

    //添加表情
    private onAddBiaoQing(e: egret.Event): void {
        //判断显示
        if(Number(e.data.num) > 0) {
            //显示文本
            this.txt_test.text = this.txt_chat.text + "　";

            //判断显示
            if(this.txt_test.textWidth > this.txt_chat.width) {
                this.txt_chat.text = this.old_chat;
            }
            else {
                //定义变量
                var img_bq: eui.Image = new eui.Image();

                //数据赋值
                img_bq.y = 10;
                img_bq.width = 18;
                img_bq.height = 18;
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
            if(this.old_chat != "") {
                this.txt_tips.visible = false;
            }
            
        }
    }

    //聊天文本改变事件
    private onChatTextChange(e: egret.Event): void {
        //显示文本
        this.txt_test.text = this.txt_chat.text;

        //显示文本
        if(this.txt_test.textWidth > this.txt_chat.width) {
            this.txt_chat.text = this.old_chat;
        }
        else {
            //定义变量
            var num_nowchange_index: number = -1;
            var str_new_chat: string = this.txt_chat.text;

            //数据比对
            for(var i: number = 0;i < this.old_chat.length;i++) {
                if(i < str_new_chat.length) {
                    if(str_new_chat.charAt(i) != this.old_chat.charAt(i)) {
                        num_nowchange_index = i;
                        break;
                    }
                }
            }

            //改变值
            var num_change_x: number = this.txt_chat.textWidth;
            var num_change_index: number = Math.max(-1,str_new_chat.length - this.old_chat.length);
            this.txt_test.text = this.old_chat;
            num_change_x = Math.max(-30,num_change_x - this.txt_test.textWidth);
            if(num_nowchange_index == -1) {
                if(num_change_x > 0) {
                    num_nowchange_index = str_new_chat.length - 1;
                }
                else {
                    num_nowchange_index = this.old_chat.length - 1;
                }
            }

            //判断显示
            for(var j: number = 0;j < this.bq_num;j++) {
                if(this.bq_picture[j] != null) {
                    if(this.bq_index[j] > num_nowchange_index) {
                        this.bq_index[j] += num_change_index;
                        this.bq_picture[j].x = this.bq_picture[j].x + num_change_x;
                    }
                    else if(this.bq_index[j] == num_nowchange_index) {
                        this.g_show_bq.removeChild(this.bq_picture[j]);
                        this.bq_picture[j] = null;
                    }
                    else {
                        if(this.bq_index[j] >= str_new_chat.length) {
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
        if(this.txt_chat.text == "") {
            this.txt_tips.visible = true;
            for(var k: number = 0;k < this.bq_num;k++) {
                if(this.bq_picture[k] != null) {
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
    }

    //表情按钮
    private onBiaoQingBtn(e: egret.TouchEvent): void {
        //显示界面
        this.showChat();
        
        //播放声音
        basic.SoundManager.instance.playEffect("sound_btn_mp3");
        
        //发送消息
        basic.Dispatcher.dispatch(EventNames.EBG_SHOWBIAOQING);
    }

    //发送按钮
    private onSendBtn(e: egret.TouchEvent): void {
        //判断显示
        if(this.txt_chat.text != "") {
            //判断显示
            if(UserData.User_VIP == 15) {
                //显示提示
                basic.Dispatcher.dispatch(EventNames.SHOW_TIPS,{"tips":"VIP15账号不能再游戏中发言"});
            }
            else {
                //定义变量
                var str_send_detail: string = "";

                //播放声音
                basic.SoundManager.instance.playEffect("sound_ebg_send_mp3");

                //数据复制
                for(var i: number = 0;i < this.txt_chat.text.length;i++) {
                    //数据赋值
                    var num_bq: number = -1;

                    //数据赋值
                    for(var j: number = 0;j < this.bq_num;j++) {
                        if(this.bq_picture[j] != null && i == this.bq_index[j]) {
                            num_bq = Number(this.bq_detail[j]);
                            break
                        }
                    }

                    //判断复制
                    if(num_bq == -1) {
                        str_send_detail += this.txt_chat.text.charAt(i);
                    }
                    else {
                        str_send_detail += "[" + num_bq.toString() + "]"
                    }
                }

                //发送消息
                Comm_ebg.instance.sendSocket({ "type": "chat","msg": str_send_detail });

                //清除数据
                this.old_chat = "";
                this.txt_chat.text = "";
                this.txt_tips.visible = true;
                for(var k: number = 0;k < this.bq_num;k++) {
                    if(this.bq_picture[k] != null) {
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
    }
}
