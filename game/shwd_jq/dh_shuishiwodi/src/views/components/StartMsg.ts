/**
 *
 * @用户信息
 *
 */
class StartMsg extends eui.Component {
    //定义变量
    private head: Head;
    private img_tag: eui.Image;
    private img_vip: eui.Image;
    private img_star: eui.Image;
    private txt_level: eui.Label;
    private txt_goldnum: eui.Label;
    private txt_nickname: eui.Label;
    
    //初始化
    createChildren(): void {
        super.createChildren();

        //注册按钮
        this.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onThisBtn,this);
    }
    
    //显示内容
    show():void{
        //显示头像
        this.head.show(UserData.User_Head);

        //显示文本
        this.txt_nickname.text = UserData.User_Name;
        this.txt_goldnum.text = UserData.User_Gold.toString();

        //判断显示等级
        if(UserData.User_Level < 30){
            this.txt_level.text = "初级卧底";
        }
        else if(UserData.User_Level < 60){
            this.txt_level.text = "中级卧底";
        }
        else if(UserData.User_Level < 90){
            this.txt_level.text = "高级卧底";
        }
        else{
            this.txt_level.text = "终极卧底";
        }

        //定义位置
        this.img_vip.x = this.txt_nickname.x + this.txt_nickname.width + 10;
        this.img_star.x = this.img_vip.x + this.img_vip.width * this.img_vip.scaleX + 5;

        //显示等级
        this.img_star.source = "icon_star" + Number(UserData.User_Level % 10).toString() + "_png";
        this.img_vip.source = "icon_vip" + Math.floor(UserData.User_Level / 10).toString() + "_png";
    }

    //界面按钮
    private onThisBtn(e: egret.TouchEvent): void{

    }
}
