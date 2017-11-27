/**
 *
 * @头像
 *
 */
class Head extends eui.Component{
    //定义变量
    private rect_mask: eui.Rect;
    private img_head: eui.Image;
    private com_vip: eui.Component;
    
    //初始化
    createChildren(): void {
        super.createChildren();
        
        //显示遮罩
        this.rect_mask.visible = true;
        this.img_head.mask=this.rect_mask;
    }
	
    //显示头像
    public show(_address: string): void {
        //显示头像
        if(_address != null && _address!=""){
            this.img_head.source = _address;
        }
        else{
            this.img_head.source = "";
        }
    }
    
}
