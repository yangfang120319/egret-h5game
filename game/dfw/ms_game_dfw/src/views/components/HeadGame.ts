class HeadGame extends eui.Component {
    //定义变量
    private img_head: eui.Image;
    private img_mask: eui.Image;
    
    //初始化
    createChildren(): void {
        super.createChildren();

        //显示遮罩
        this.img_mask.visible = true;
		this.currentState = "0";
    }

    //显示头像
    show(_head: string):void{
        //判断显示
        if(_head != ""&&_head != null){
            this.img_head.source = _head;
        }
        else{
            this.img_head.source = "";
        }
    }

	//显示遮罩
	showStatus(_status: number): void{
		if(_status == 0){
			//隐藏遮罩
			this.img_mask.visible = false;
		}
		else{
			//显示遮罩
			this.img_mask.visible = true;
		}
	}

	//改变状态
	changeState(_state: string): void{
		this.currentState = _state;
	}
}