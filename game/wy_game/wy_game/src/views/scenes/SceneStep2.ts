/**
 *
 * @步骤2
 *
 */
class SceneStep2 extends basic.SceneBase {
    //定义变量
    private g_xf: eui.Group;
    private monolog: Monolog;
    private txt_tips: eui.Label;
    private img_mask: eui.Image;
    private btn_open: eui.Button;
    private btn_next: eui.Button;
    private mask_action: Action_Mask;
    private detail: string[] = [
        "这个神秘人让我调查一个恶名昭著的庄园，并找到他失踪的女儿。从随信附着的支票数额来看应该不可能是恶作剧。但更吸引我注意的是……**。",
        "**，他曾经为我赢得财富与名望，而他现在理应被人遗忘。但有人不仅记得这个名字，还找到了我……究竟是谁？看来想知道这个答案，此行是在所难免了。"
    ]

    //定义界面
    public constructor() {
        super();

        //定义界面
        this.skinName = SceneStep2Skin;

        //定义变量
        var monolog_data: any = {};

        //数据赋值
        monolog_data["detail_text"] = this.detail;
        monolog_data["detail_type"] = [0,0];
        
        //定义独白
        this.monolog = new Monolog(this.over.bind(this));
        this.monolog.show(monolog_data);

        //显示界面
        this.addChild(this.monolog);

        //定义最上层
        this.setChildIndex(this.img_mask,this.numChildren-1);
        
        //注册按钮
        this.btn_open.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onOpenBtn,this);
        this.btn_next.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onNextBtn,this);
    }

    //注册侦听
    beforeShow(params: any): void {
        //初始化显示
        this.g_xf.visible = false;
        this.monolog.visible = false;
        this.btn_open.visible = true;
        this.txt_tips.visible = true;
        this.btn_next.visible = false;

        //定义位置
        this.monolog.x = (basic.StageProxy.width - this.monolog.width)/2;
        this.monolog.y=basic.StageProxy.height - this.monolog.height - 150;

         //初始化遮罩 
        this.mask_action = new Action_Mask(this.img_mask);

          //隐藏遮罩
        this.mask_action.hide();
    }

    //结束动画
    private over():void{
        //隐藏按钮
        this.btn_next.visible = false;

        //显示遮罩
        this.mask_action.show(()=>{
            //显示界面
            basic.SceneManager.show(SceneNames.STEP3);
        });
    }

    //打开信封按钮
    private onOpenBtn(e:egret.TouchEvent):void{
        //播放声音
        basic.SoundManager.instance.playEffect("sound_btn_mp3");

        //显示界面
        this.g_xf.visible = true;
        this.btn_open.visible = false;
        this.txt_tips.visible = false;
        
        //显示按钮
        Action_Other.changeAlpha(0,1,500,this.btn_next);
    }
    
    //下一步按钮
    private onNextBtn(e: egret.TouchEvent): void {
        //播放声音
        basic.SoundManager.instance.playEffect("sound_btn_mp3");
        
        //判断显示
        if(this.g_xf.visible == true){
            //隐藏提示
            this.g_xf.visible = false;
            this.btn_next.enabled = false;
            
            //显示提示文本
            Action_Other.changeAlpha(0,1,500,this.monolog,0,()=>{
                //显示按钮
                this.btn_next.enabled = true;

                //开始独白
                this.monolog.startAction();
            });
        }
        else{
            //开始独白
            this.monolog.startAction();
        }
    }
}
