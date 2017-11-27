class Action_Other {
	//alpha改变
	static changeAlpha(_start_alpha:number,_over_alpha:number,_time:number,_obj:any,_waitingtime:number=0,_callback:Function=null):void{
		//显示界面
		_obj.visible = true;
		_obj.alpha = _start_alpha;

		//显示动画
 		var _tween_alpha:egret.Tween = egret.Tween.get(_obj)
                .wait(_waitingtime)
				.to({ alpha: _over_alpha },_time).call(()=>{
					//判断显示
					if(_over_alpha==0){
						_obj.visible = false;
					}

					//判断回调
					if(_callback){
						_callback();
					}
				});

	}
}