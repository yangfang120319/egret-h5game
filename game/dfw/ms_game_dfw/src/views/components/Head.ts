/**
 *
 * @头像
 *
 */
class Head extends eui.Component{
	//定义变量
	private img_head: eui.Image;
	private img_mask: eui.Image;
	private rect_mask: eui.Rect;
	private txt_name: eui.Label;
	private com_sex: eui.Component;
	
	//初始化
    createChildren(): void {
        super.createChildren();

		//定义遮罩
		this.img_mask.visible = true;
		this.img_head.mask = this.img_mask;
	}

	//显示头像
	show(_head: string): void{
		//判断显示头像
		if(_head != "" && _head != null){
			this.img_head.source = _head;
		}
		else{
			this.img_head.source = "";
		}
		this.currentState = "show";
	}

	//隐藏头像
	hide():void{
		//隐藏头像
		this.img_head.source = "";
		this.currentState = "hide";
		this.com_sex.visible = false;
	}

	//显示性别
	showSex(_sex: number): void{
		//显示性别
		this.com_sex.visible = true;
		this.com_sex.currentState = _sex.toString();
	}

	//显示遮罩
	showStatus(_status: number): void{
		if(_status == 0){
			//隐藏遮罩
			this.rect_mask.visible = false;
		}
		else{
			//显示遮罩
			this.rect_mask.visible = true;
		}
	}

	//显示名称
	showName(_name: string): void{
		//显示昵称
		this.txt_name.text = _name;
		this.txt_name.visible = true;
	}
}