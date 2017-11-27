/**
 *
 * @头像
 *
 */
class Head_Add extends eui.Component {
    //定义变量
    private img_head: eui.Image;
    private img_hook: eui.Image;
    private img_headmask: eui.Image;
    
    //定义界面
    public constructor() {
        super();
        
        //定义界面
        this.skinName = HeadSkin;

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

	//显示钩子
	showHook(): void{
		//显示界面
		this.img_hook.visible = true;
	}
}
