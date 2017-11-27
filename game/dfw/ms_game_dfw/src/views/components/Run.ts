/**
 *
 * @运行界面
 *
 */
class Run extends eui.Component{
	//定义变量
	private dice: Dice;
	private g_now: eui.Group;
	private card: Card[] = [];


	//初始化
    createChildren(): void {
        super.createChildren();

		//数据赋值
        for(var i: number = 0;i < 9;i++) {
            //定义变量
            var now_card: Card = this["card" + i];
			let num = i+3;
			
            //数据赋值
            this.card[i] = now_card;
			this.card[i].img_back.source = num+"_png";
        }
		
	}

	

}