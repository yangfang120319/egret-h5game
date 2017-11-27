/**
 *
 * @游戏头像
 *
 */
class Game_Head extends eui.Component {
    //定义变量
    private rect_mask: eui.Rect;
    private img_head: eui.Image;
    private txt_name: eui.Label;
    private img_nameback: eui.Image;

    //初始化
    createChildren(): void {
        super.createChildren();

        //显示遮罩
        this.rect_mask.visible = true;
        this.img_head.mask = this.rect_mask;
        this.txt_name.visible = false;
        this.img_nameback.visible = false;
    }

    //显示头像
    show(_address: string,_name = ""): void {
        //显示头像
        if(_address != "" && _address != null) {
            this.img_head.source = _address;
        }

        //判断显示名称
        if(_name == "") {
            this.txt_name.visible = false;
            this.img_nameback.visible = false;
        }
        else {
            this.txt_name.text = _name;
            this.txt_name.visible = true;
            this.img_nameback.visible = true;
        }
    }
}
