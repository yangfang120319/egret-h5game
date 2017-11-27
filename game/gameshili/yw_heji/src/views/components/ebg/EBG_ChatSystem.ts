/**
 *
 * @author 
 *
 */
class EBG_ChatSystem extends eui.Component {
    //定义变量
    private txt_system: eui.Label;
    private rect_system_mask: eui.Rect;

    //系统消息变量
    private g_system: eui.Group;
    private txt_System: egret.TextField;
    private system_message: string[] = [];
    private is_SystemStart: Boolean = false;
    private _tween_x: egret.Tween = null;
    private _tween_alpha: egret.Tween = null;
    
    //初始化
    createChildren(): void {
        super.createChildren();

        //清空文本
        this.visible = false;

        //显示系统文本
        this.rect_system_mask.visible = true;
        this.txt_System = new egret.TextField();
        this.txt_System.y = 10;
        this.txt_System.size = 20;
        this.txt_System.height = 20;
        this.txt_System.fontFamily = "微软雅黑";
        this.g_system.addChild(this.txt_System);
        this.g_system.setChildIndex(this.rect_system_mask,this.g_system.numChildren - 1);
        this.txt_System.mask = this.rect_system_mask;

        //注册事件
        basic.Dispatcher.addListener(EventNames.EBG_SHOWCHAT,this.onShowChat,this);
    }
    
    //显示聊天
    private onShowChat(e: egret.Event): void {
        //数据赋值
        if(e.data.chatType==0){
            //显示系统通知
            this.showSystemChat(e.data.msg);
        }
    }
    
    //显示系统聊天
    private showSystemChat(_message: string): void {
        //数据赋值
        this.system_message[this.system_message.length] = _message;

        //开始滚动
        this.startShowSystem();
    }

    //开始显示系统
    private startShowSystem(): void {
        //判断开始
        if(this.is_SystemStart == false) {
            //定义变量
            var str_nowshow: string = "";

            //数据赋值
            for(var i: number = 0;i < this.system_message.length;i++) {
                if(this.system_message[i] != "") {
                    //数据赋值
                    str_nowshow = this.system_message[i];
                    this.system_message[i] = "";
                    break;
                }
            }

            //判断显示
            if(str_nowshow != "") {
                //定义变量
                var num_move_x: number;
                var num_move_time: number;

                //数据赋值
                this.visible = true;
                this.is_SystemStart = true;

                //显示文本
                this.txt_System.x = 640;
                this.txt_System.width = 1000;
                this.txt_System.textFlow = (new egret.HtmlTextParser).parser(str_nowshow);
                this.txt_System.width = this.txt_System.textWidth;
                num_move_x = 640 + this.txt_System.width;
                num_move_time = num_move_x * 20;

                //开始动画
                this._tween_x = egret.Tween.get(this.txt_System).to({ x: 640 - num_move_x },num_move_time).call(() => {
                    //数据赋值
                    this.visible = false;
                    this.is_SystemStart = false;

                    //开始滚动
                    this.startShowSystem();
                });
            }
        }
    }

}
