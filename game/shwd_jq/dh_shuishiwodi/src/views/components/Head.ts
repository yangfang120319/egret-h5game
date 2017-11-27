/**
 *
 * @头像
 *
 */
class Head extends eui.Component {
    //定义变量
    private img_head: eui.Image;
    private img_hook: eui.Image;
    private img_headmask: eui.Image;
    
    //初始化
    createChildren(): void {
        super.createChildren();

        //显示遮罩
        this.img_hook.visible = false;
        this.img_headmask.visible = true;
        this.img_head.mask = this.img_headmask;
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
}
