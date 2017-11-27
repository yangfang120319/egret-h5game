/**
 *
 * @消息
 *
 */
class Chat extends eui.Component{
	//定义变量
    private txt_chat: eui.Label;
    private rect_mask: eui.Rect;

    //系统消息变量
    private _tween_y: egret.Tween = null;
    private _tween_alpha: egret.Tween = null;
    private now_show_chat:number = 0;
    private chat_detail: string[] = [
		"使用【遥控骰子】：你想走到哪里就到哪里",
		"使用【阻止发生】：不喜欢的事情你可以拒绝",
		"使用【原地停留】：你让谁停，他就得停",
		"扫码【充值】：找美女扫码充值5折优惠！找美女，5折",
		"使用【房间】：让离开游戏的人重新进来"
	];
    
	//初始化
    createChildren(): void {
        super.createChildren();

		//显示系统文本
		this.txt_chat.text = "";
		this.txt_chat.x = this.rect_mask.x;
		this.now_show_chat = Math.floor(Math.random() * this.chat_detail.length);
        this.rect_mask.visible = true;
        this.txt_chat.mask = this.rect_mask;
	}

	//开始消息
	start(): void{
		//定义变量
		var now_show: number;
        var show_detail: string = "";

		//判断赋值
		for(var i: number = 0;i < 20;i++){
			now_show = Math.floor(Math.random() * this.chat_detail.length);
			if(now_show != this.now_show_chat){
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
			to({ y: (this.height - this.txt_chat.height)/2 },100).
			wait(6000).
			to({ y: -5 - this.txt_chat.height },100).
			call(() => {
				//开始滚动
				this.start();
			});
	}

	//停止消息
	stop(): void{
		if(this._tween_y){
			this._tween_y.setPaused(true);
			this._tween_y = null;
		}
	}
}