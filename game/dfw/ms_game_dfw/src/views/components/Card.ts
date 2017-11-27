class Card extends eui.Component{

	//定义变量
	public img_back: eui.Image;
	private txt_rednum: eui.BitmapLabel;
	private txt_bluenum:eui.BitmapLabel;

	//初始化
	createChildren(): void {
        super.createChildren();
		this.currentState = "1";
	}

	//改变状态
	private cardState(state: string,txt_num: string): void {
		this.currentState = state;
		if(state == "2"){
			this.txt_bluenum.text = txt_num;
		}else if(state == "3"){
			this.txt_rednum.text = txt_num
		}
	}


}