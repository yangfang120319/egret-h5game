/**
 *
 * @步骤5
 *
 */
class SceneStep5  extends basic.SceneBase {
    //定义变量
    private monolog: Monolog;
    private monolog1: Monolog;
    private img_mask: eui.Image;
	private txt_tips: eui.Label;
	private rect_mask: eui.Rect;
    private btn_open: eui.Button;
    private btn_next: eui.Button;
    private com_person: eui.Component;
    private mask_action: Action_Mask;
	private detail: string[] = [
		"189X年，6月16日",
		"这已经是这个月的第三个了，这一切都是为了那所谓的永生⋯⋯",
		"这对于我们来说可能太过于虚伪了，但所谓的处刑者不久是喜欢抹杀这些无趣的人生么？",
		"一个个渐渐沉醉其中，脸上露出诡异的笑容，然后纷纷跪倒在地，拿出了袖中的匕首。",
		"怎么办？",
		"我该怎么办呢？",
		"作为一个心中还存有一丝善念的人而言，简直不敢想象即将迎来的这个画面。",
		"我能心安理得地看着他们继续做这种事情么？",
		"⋯⋯",
		"不行，我必须阻止他们！",
		"⋯⋯"
	];
    private detail1: string[] = [
        "这日记里讲的难道是献祭？这个玩笑可不好笑，感觉已经不是一桩单纯的绑架案了。",
        "不过现在也没有其他退路了，只能继续调查下去了。"
    ]

    //定义界面
    public constructor() {
        super();

        //定义界面
        this.skinName = SceneStep5Skin;

		//定义变量
        var monolog_data: any = {};
        var monolog_data1: any = {};

        //数据赋值
        monolog_data["detail_text"] = this.detail;
        monolog_data1["detail_text"] = this.detail1;
        monolog_data["detail_type"] = [0,0,0,0,0,0,0,0,0,0,0];
        monolog_data1["detail_type"] = [0,0];
        
        //定义独白
		this.monolog = new Monolog(this.over.bind(this));
		this.monolog1 = new Monolog(this.over.bind(this));
		this.monolog.show(monolog_data);
		this.monolog1.show(monolog_data1);

        //显示界面
        this.addChild(this.monolog);
        this.addChild(this.monolog1);

        //定义最上层
        this.setChildIndex(this.btn_open,this.numChildren-1);
        this.setChildIndex(this.btn_next,this.numChildren-1);
        this.setChildIndex(this.img_mask,this.numChildren-1);

        //显示遮罩
        this.rect_mask.visible = true;
        this.com_person.mask = this.rect_mask;

        //注册按钮
        this.btn_open.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onOpenBtn,this);
        this.btn_next.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onNextBtn,this);
    }
    
    //注册侦听
    beforeShow(params: any): void {
        //初始化显示
		this.txt_tips.visible = true;
		this.btn_open.visible = true;
		this.btn_next.visible = false;
		this.monolog.visible = false;
		this.monolog1.visible = false;
        this.com_person.visible = false;

        //定义位置
        this.monolog.x = (basic.StageProxy.width - this.monolog.width)/2;
        this.monolog1.x = (basic.StageProxy.width - this.monolog1.width)/2;
        this.monolog.y=basic.StageProxy.height - this.monolog.height - 150;
        this.monolog1.y=basic.StageProxy.height - this.monolog1.height - 150;
        
        //初始化遮罩 
        this.mask_action = new Action_Mask(this.img_mask);

        //隐藏遮罩
		this.mask_action.hide();
    }

    //结束动画
    private over():void{
        //判断显示
        if(this.monolog.visible == true){
            //隐藏对话
            this.monolog.visible = false;

            //显示对话
            this.monolog1.visible = true;
            this.com_person.visible = true;

            //显示独白
			this.monolog1.startAction();
        }
        else{
            //隐藏按钮
            this.btn_next.visible = false;

            //显示遮罩
            this.mask_action.show(()=>{
                //显示界面
                basic.SceneManager.show(SceneNames.STEP6);
            });
        }
    }

    //开门按钮
    private onOpenBtn(e:egret.TouchEvent):void{
        //隐藏界面
        this.btn_open.visible = false;
		this.txt_tips.visible = false;

        //播放声音
        basic.SoundManager.instance.playEffect("sound_btn_mp3");

        //显示独白
		Action_Other.changeAlpha(0,1,500,this.monolog,0,()=>{
			//显示独白
			this.monolog.startAction();
		});

		//显示按钮
		Action_Other.changeAlpha(0,1,500,this.btn_next);
    }

	//下一步按钮
    private onNextBtn(e:egret.TouchEvent):void{
        //播放声音
        basic.SoundManager.instance.playEffect("sound_btn_mp3");

        ///显示独白
        if(this.monolog.visible == true){
            this.monolog.startAction();
        }
        else{
            this.monolog1.startAction();
        }
    }
}