/**
 *
 * @选择头像
 *
 */
class Panel_ChooseHead extends basic.PanelBase {
    //自定义界面
    private static _instance: Panel_ChooseHead;
    public static get instance(): Panel_ChooseHead {
        if(this._instance == undefined) {
            this._instance = new Panel_ChooseHead();
        }
        return this._instance;
    }

    //定义变量
    private g_head: eui.Group;
    private img_choose0: eui.Image;
    private img_choose1: eui.Image;
    private head: Game_Head[] = [];
    private btn_choose: eui.Button[] = [];
    
    //皮肤设置
    protected init(): void {
        this.skinName = Panel_ChooseHeadSkin;
    }

    //定义界面
    constructor() {
        super(basic.dialogEffect.Scale,{
            withFade: true,
            ease: egret.Ease.backOut
        },basic.dialogEffect.Scale,{ withFade: true,ease: egret.Ease.backIn });
    }

    //初始化界面
    createChildren(): void {
        super.createChildren();
    }

    //显示界面
    show(callback: Function = null): void {
        //数据赋值
        this._callback = callback;

        //数据赋值
        for(var j: number = 0;j < 30;j++) {
            //定义变量
            var now_head: Game_Head = this["head" + j];
            var now_btn: eui.Button = this["btn_choose" + j];

            //数据赋值
            this.head[j] = now_head;
            this.btn_choose[j] = now_btn;
            this.head[j].show("icon_head" + j + "_jpg");

            //注册按钮
            this.btn_choose[j].addEventListener(egret.TouchEvent.TOUCH_TAP,this.onChooseBtn,this);
        }

        //显示界面
        for(var i: number = 0;i < 30;i++) {
            if(UserData.User_Head == "icon_head" + i + "_jpg") {
                this.img_choose0.visible = true;
                this.img_choose1.visible = true;
                this.img_choose0.x = this.head[i].x - 24;
                this.img_choose0.y = this.head[i].y - 26;
                this.img_choose1.x = this.head[i].x - 24;
                this.img_choose1.y = this.head[i].y - 26;
                break;
            }
        }


        //显示界面
        this.popup(this.funExit.bind(this));
    }

    //退出函数
    private funExit(): void {
        //注销
        for(var j: number = 0;j < 9;j++) {
            //注销按钮
            this.btn_choose[j].removeEventListener(egret.TouchEvent.TOUCH_TAP,this.onChooseBtn,this);
        }

        //退出事件
        this.dealAction();
    }

    //选择按钮
    private onChooseBtn(e: egret.TouchEvent): void {
        //定义变量
        var btn_num: number = Number(e.target.name);

        //数据赋值
        UserData.User_Head = "icon_head" + btn_num.toString() + "_jpg";
        
        //上传消息
        Comm.instance.sendSocket({ "type": "changeHead","head": UserData.User_Head });
        
        //退出界面
        this.funExit();
    }
}
