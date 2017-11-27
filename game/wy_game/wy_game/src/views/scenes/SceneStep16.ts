/**
 *
 * @步骤16
 *
 */
class SceneStep16  extends basic.SceneBase {
    //定义变量
    private monolog: Monolog;
    private img_mask: eui.Image;
    private btn_next: eui.Button;
    private mask_action: Action_Mask;
    private detail:string[] = [
        "大家都了解完情况后，开始分配房间。警察和小偷住2A，**和医生住2B，女演员住2C",
        "各自回房之后，由于房间老旧的缘故，到处都有一些吱吱嘎嘎的声音。",
        "**隐约听到犯人又开始自言自语起来，而警察貌似有些不耐烦了，狠狠地给了他一拳警告他闭嘴。",
        "而另一边，女演员似乎在和谁对话，起初好像是在吵架，后来越来越轻，显然演员刻意压低了声音，所以不知道后面在说什么⋯⋯",
        "不知过了多久，**便睡着了。",
    ];
    
    //定义界面
    public constructor() {
        super();

        //定义界面
        this.skinName = SceneStep16Skin;

        //注册按钮
        this.btn_next.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onNextBtn,this);
    }
    
    //注册侦听
    beforeShow(params: any): void {
        //初始化显示
		this.btn_next.visible = false;

        //定义变量
        var monolog_data: any = {};

        //数据赋值
        monolog_data["detail_text"] = this.detail;
        monolog_data["detail_type"] = [0,0,0,0,0];
        
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
            basic.SceneManager.show(SceneNames.STEP17);
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