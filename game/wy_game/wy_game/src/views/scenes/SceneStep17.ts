/**
 *
 * @步骤17
 *
 */
class SceneStep17  extends basic.SceneBase {
    //定义变量
    private monolog: Monolog;
	private rect_mask: eui.Rect;
    private img_mask: eui.Image;
    private img_back: eui.Image;
    private btn_next: eui.Button;
    private com_person: eui.Component;
    private mask_action: Action_Mask;
    private detail:string[] = [
        "**和医生被一串急促的敲门声惊醒，警察一脸严肃，让**和他一起去地下室看一看。"
    ];
    
    //定义界面
    public constructor() {
        super();

        //定义界面
        this.skinName = SceneStep17Skin;

        //定义遮罩
        this.rect_mask.visible = true;
        this.com_person.mask = this.rect_mask;

        //注册按钮
        this.btn_next.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onNextBtn,this);
    }
    
    //注册侦听
    beforeShow(params: any): void {
        //初始化显示
		this.btn_next.visible = false;
        this.com_person.visible = false;
        this.img_back.source = "back_step8_jpg";

        //定义变量
        var monolog_data: any = {};

        //数据赋值
        monolog_data["detail_text"] = this.detail;
        monolog_data["detail_type"] = [0];
        
        //定义独白
		this.monolog = new Monolog(this.over.bind(this));
		this.monolog.show(monolog_data);

        //显示界面
        this.addChild(this.monolog);
		this.monolog.visible = false;

        //定义最上层
        this.setChildIndex(this.btn_next,this.numChildren-1);
        this.setChildIndex(this.img_mask,this.numChildren-1);

        //定义位置
        this.monolog.x = (basic.StageProxy.width - this.monolog.width)/2;
        this.monolog.y=basic.StageProxy.height - this.monolog.height - 150;
        
        //初始化遮罩 
        this.mask_action = new Action_Mask(this.img_mask);

        //隐藏遮罩
		this.mask_action.hide(()=>{
            //显示按钮
			Action_Other.changeAlpha(0,1,500,this.btn_next);

            //显示独白
			Action_Other.changeAlpha(0,1,500,this.monolog,0,()=>{
                //开始独白
                this.monolog.startAction();
            });
        });
    }
    
    //结束动画
    private over():void{
        //隐藏按钮
        this.btn_next.visible = false;

        //显示遮罩
        this.mask_action.show(()=>{
            //显示界面
            basic.SceneManager.show(SceneNames.STEP18);
        });
    }

	//下一步按钮
    private onNextBtn(e:egret.TouchEvent):void{
        //播放声音
        basic.SoundManager.instance.playEffect("sound_btn_mp3");
        
        //开始独白
        this.monolog.startAction();
    }
}