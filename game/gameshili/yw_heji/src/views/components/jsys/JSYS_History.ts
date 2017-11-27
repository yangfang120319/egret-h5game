/**
 *
 * @历史记录
 *
 */
class JSYS_History extends eui.Component {
    //定义变量
    private g_show: eui.Group;
    private img_new: eui.Image
    private img_box: eui.Image[] = [];

    //初始化
    createChildren(): void {
        super.createChildren();
        
        //数据复制
        for(var i: number = 0;i < 8;i++) {
            //定义变量
            var box: eui.Image = this["img_box" + i];

            //数据复制
            this.img_box[i] = box;
        }
    }
    
    //显示历史记录
    show(_history: Array<number>): void {
        //显示历史
        this.g_show.x = 10;
        this.img_new.visible = true;

        //显示历史
        for(var i: number = 0;i < Math.min(_history.length,8);i++) {
            this.img_box[i].source = "icon_jsys_box" + _history[i].toString() + "_png";
        }
    }
    
    //增加历史
    addShow():void{
        //隐藏最新
        this.img_new.visible = false;
        
        //移动历史
        var _tween_x: egret.Tween = egret.Tween.get(this.g_show).to({ x: 68 },400);
    }
}
