/**
 *
 * @步骤6
 *
 */
class SceneStep6  extends basic.SceneBase {
    //定义变量
    private monolog: Monolog;
    private img_mask: eui.Image;
    private btn_next: eui.Button;
    private mask_action: Action_Mask;
     private detail: string[] = [
        "奇怪，明明是第一次来这里，我怎么会对这里的陈设有种异常的亲切感？",
        "啊啊啊啊啊啊啊啊啊⋯⋯怎么回事，脑袋好疼⋯⋯",
        "**昏迷 “梦”见了惊悚的事情"
    ];

    //定义界面
    public constructor() {
        super();

        //定义界面
        this.skinName = SceneStep6Skin;

        //定义变量
        var monolog_data: any = {};

        //数据赋值
        monolog_data["detail_text"] = this.detail;
        monolog_data["detail_type"] = [0,0,0];
        
        //定义独白
		this.monolog = new Monolog(this.over.bind(this));;
		this.monolog.show(monolog_data);

        //显示界面
        this.addChild(this.monolog);

        //定义最上层
        this.setChildIndex(this.btn_next,this.numChildren-1);
        this.setChildIndex(this.img_mask,this.numChildren-1);

        //注册按钮
        this.btn_next.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onNextBtn,this);
    }
    
    //注册侦听
    beforeShow(params: any): void {
        //初始化显示
		this.monolog.visible = false;
		this.btn_next.visible = false;

        //定义位置
        this.monolog.x = (basic.StageProxy.width - this.monolog.width)/2;
        this.monolog.y=basic.StageProxy.height - this.monolog.height - 150;
        
        //初始化遮罩 
        this.mask_action = new Action_Mask(this.img_mask);

        //隐藏遮罩
		this.mask_action.hide(()=>{
			//显示按钮
			Action_Other.changeAlpha(0,1,500,this.btn_next);

			//显示提示文本
			Action_Other.changeAlpha(0,1,500,this.monolog,0,()=>{
				//显示文本独白
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
            basic.SceneManager.show(SceneNames.STEP7);
        });
    }

	//开门按钮
    private onNextBtn(e:egret.TouchEvent):void{
        //播放声音
        basic.SoundManager.instance.playEffect("sound_btn_mp3");

        //显示文本独白
		this.monolog.startAction();
    }
}