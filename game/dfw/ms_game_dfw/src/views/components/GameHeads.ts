class GameHeads extends eui.Component{

	//变量
	private g_heads: eui.Group;

	//初始化
    createChildren(): void {
        super.createChildren();	
		
	}

	addHead(img_head:string):void {
		var head = new HeadGame();
		head.show(img_head);
		this.g_heads.addChild(head);
	}
}