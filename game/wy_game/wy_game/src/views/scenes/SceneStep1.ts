/**
 *
 * @步骤1
 *
 */
class SceneStep1 extends basic.SceneBase {
    //定义变量
    private monolog: Monolog;
    private monolog1: Monolog;
    private img_mask: eui.Image;
    private btn_open: eui.Button;
    private btn_next: eui.Button;
    private mask_action:Action_Mask;
    private detail_start: string = "我的名字⋯是⋯____（点击输入）";
    private detail: string = "我叫**，曾凭着自撰小说名噪一时，不过因为某个事件失去了一部分记忆之后，不知为何就再也写不出能卖的东西了，现在的我只是个潦倒的私家侦探而已。";
    private now_step: number = 0;

    //定义界面
    public constructor() {
        super();

        //定义界面
        this.skinName = SceneStep1Skin;

        //定义变量
        var monolog_data: any = {};
        var monolog_data1: any = {};

        //数据赋值
        monolog_data["detail_text"] = [this.detail_start];
        monolog_data1["detail_text"] = [this.detail];
        monolog_data["detail_type"] = [0];
        monolog_data1["detail_type"] = [0];

        //定义独白
        this.monolog1 = new Monolog(this.over.bind(this));
        this.monolog = new Monolog(this.over.bind(this),null,this.stopCallback.bind(this),800,360);
        this.monolog1.show(monolog_data1);
        this.monolog.show(monolog_data);

        //显示界面
        this.addChild(this.monolog);
        this.addChild(this.monolog1);

        //定义最上层
        this.btn_open.visible = false;
        this.setChildIndex(this.btn_open,this.numChildren-1);
        this.setChildIndex(this.img_mask,this.numChildren-1);

        //注册按钮
        this.btn_open.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onOpenBtn,this);
        this.btn_next.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onNextBtn,this);
    }
    
    //注册侦听
    beforeShow(params: any): void {
        //初始化显示
        this.monolog.visible = false;
        this.monolog1.visible = false;
        this.btn_next.visible = false;

        //定义位置
        this.monolog.x = (basic.StageProxy.width - this.monolog.width)/2;
        this.monolog1.x = (basic.StageProxy.width - this.monolog1.width)/2;
        this.monolog.y=basic.StageProxy.height - this.monolog.height - 150;
        this.monolog1.y=basic.StageProxy.height - this.monolog1.height - 150;
        
        //初始化遮罩 
        this.mask_action = new Action_Mask(this.img_mask);

        //隐藏遮罩
        this.mask_action.hide(()=>{
             //显示内容
            Action_Other.changeAlpha(0,1,500,this.monolog,200,()=>{
                //开始独白
                this.monolog.startAction();
            });
        })

        //发送消息
        if(LoaderData.is_part_LoadEnd[2] == false) {
            basic.Dispatcher.dispatch(EventNames.LOAD_PART,{ "part_num": 2 });
        }

        //播放声音
        basic.SoundManager.instance.playMusic("sound_back_mp3");
    }

    //注销侦听
    beforeHide(): void {
        
    }
    
    //停止回调
    private stopCallback(): void{
        //显示Open按钮
        Action_Other.changeAlpha(0,1,500,this.btn_open,200);
    }

    //结束动画
    private over():void{
        //隐藏按钮
        this.btn_next.visible = false;

        //显示遮罩
        this.mask_action.show(()=>{
            //显示界面
            basic.SceneManager.show(SceneNames.STEP2);
        });
    }

    //下一步按钮
    private onNextBtn(e: egret.TouchEvent): void {
        //播放声音
        basic.SoundManager.instance.playEffect("sound_btn_mp3");
        
        //开始独白
        this.monolog1.startAction();
    }

    //打开按钮
    private onOpenBtn(e: egret.TouchEvent): void{
        //隐藏按钮
        this.monolog.visible = false;
        this.btn_open.visible = false;

        //播放声音
        basic.SoundManager.instance.playEffect("sound_btn_mp3");

        //显示对话框
        PanelNickName.instance.show(()=>{
            //显示内容
            Action_Other.changeAlpha(0,1,500,this.monolog1,200,()=>{
                //开始独白
                this.monolog1.startAction();
            });

            //显示下一步按钮
            Action_Other.changeAlpha(0,1,500,this.btn_next,200);
        });
    }
}
