class Action_Mask {
	//定义变量
	private callback:Function;
	private img_mask:eui.Image;
	private _tween_alpha:egret.Tween = null;
	private play_time:number;
	private play_waiting:number;

	//初始化界面
	public constructor(_mask:eui.Image,_time:number=1500,_waiting:number=300) {
		//数据复制
		this.img_mask=_mask;
		this.play_time = _time;
		this.play_waiting = _waiting;
	}
	
	//隐藏遮罩
	hide(_callback:Function = null):void{
		//数据复制
		this.callback = _callback;

		//判断显示
		this.img_mask.alpha = 1;
        this.img_mask.visible = true;
        var _tween_mask_alpha:egret.Tween = egret.Tween.get(this.img_mask).wait(this.play_waiting)
            .to({ alpha: 0 },this.play_time).call(() => {
				//隐藏界面
        		this.img_mask.visible = false;

				//清除界面
				this.clean();
			});
	}

	//显示遮罩
	show(_callback:Function):void{
		//数据复制
		this.callback=_callback;

		//判断显示
		this.img_mask.alpha = 0;
        this.img_mask.visible = true;
        var _tween_mask_alpha:egret.Tween = egret.Tween.get(this.img_mask).wait(this.play_waiting)
            .to({ alpha: 1 },this.play_time).call(() => {
				//清除界面
				this.clean();
			});
	}

	//清除
	clean():void{
		//显示回调函数
		if(this.callback){
			this.callback();
		}

		//停止动画
		if(this._tween_alpha){
			this._tween_alpha.setPaused(true);
			this._tween_alpha=null;
		}
	}
}