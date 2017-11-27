/**
 *
 * @步骤9
 *
 */
class SceneStep12  extends basic.SceneBase {
    //定义变量
    private monolog: Monolog;
    private img_mask: eui.Image;
	private rect_mask: eui.Rect;
    private btn_next: eui.Button;
    private com_person: eui.Component;
    private mask_action: Action_Mask;
    private detail:string[] = [
        "医生：喂，醒醒，你还好吗？",
        "**：额⋯⋯头好痛，你是？",
        "医生：我是一名私人医生，看完诊回来的途中下起了雨，于是便想进来躲一躲。可进门一看却发现一个人也没有。接着就在二楼发现了一片血迹和昏迷的你，差点还以为你⋯⋯话说回来，这里到底发生了什么，这家人都到哪里去了。先生你又是哪位？",
        "**：你好，先生。我是受邀前来调查此次绑架案的私家侦探，我叫**。我来的时候这里已经是一座空宅了，在我调查情况的时候突然被谁从背后偷袭了。接下来的事情你应该都知道了⋯⋯",
        "医生：原来如此，接下来我们该怎么办？",
        " ",
        "**看了下自己脚下的笔记还在，但是明显有一页被撕毁的痕迹。",
        "此时门外又传来了敲门声，**开门一看，发现是一名警察和一个手被铐着的小偷。"
    ];

    //定义界面
    public constructor() {
        super();

        //定义界面
        this.skinName = SceneStep12Skin;

		//定义变量
        var monolog_data: any = {};

        //数据赋值
        monolog_data["detail_text"] = this.detail;
        monolog_data["detail_type"] = [0,0,0,0,0,0,0,0];
        
        //定义独白
		this.monolog = new Monolog(this.over.bind(this),null,this.stopMonolog.bind(this),380);
		this.monolog.show(monolog_data);

        //显示界面
        this.addChild(this.monolog);

        //定义最上层
        this.setChildIndex(this.btn_next,this.numChildren-1);
        this.setChildIndex(this.img_mask,this.numChildren-1);

        //定义遮罩
        this.rect_mask.visible = true;
        this.com_person.mask = this.rect_mask;

        //注册按钮
        this.btn_next.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onNextBtn,this);
    }
    
    //注册侦听
    beforeShow(params: any): void {
        //初始化显示
		this.monolog.visible = false;
		this.btn_next.visible = false;
        this.com_person.visible = false;
        
        //定义位置
        this.monolog.x = (basic.StageProxy.width - this.monolog.width)/2;
        this.monolog.y=basic.StageProxy.height - this.monolog.height - 150;
        
        //初始化遮罩 
        this.mask_action = new Action_Mask(this.img_mask);

        //隐藏遮罩
		this.mask_action.hide(()=>{
            //显示按钮
			Action_Other.changeAlpha(0,1,500,this.btn_next);

            //显示人物
            this.com_person.currentState = "0";
            Action_Other.changeAlpha(0,1,500,this.com_person);

            //显示独白
			Action_Other.changeAlpha(0,1,500,this.monolog,0,()=>{
                //播放声音
                basic.SoundManager.instance.playEffect("sound_ys_w_mp3");

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
            basic.SceneManager.show(SceneNames.STEP13);
        });
    }
    
    //停止动画
    private stopMonolog():void{
        //开始独白
        if(this.monolog.now_show>5){
            this.monolog.startAction();
        }
    }

	//下一步按钮
    private onNextBtn(e:egret.TouchEvent):void{
        //播放声音
        basic.SoundManager.instance.playEffect("sound_btn_mp3");
        
        //判断显示按钮
        if(this.monolog.now_show == 1){
            this.com_person.visible = true;
            this.com_person.currentState = "4";
        }
        else if(this.monolog.now_show == 2){
            this.com_person.visible = true;
            this.com_person.currentState = "0";
        }
        else if(this.monolog.now_show == 3){
            this.com_person.visible = true;
            this.com_person.currentState = "4";
        }
        else if(this.monolog.now_show == 4){
            this.com_person.visible = true;
            this.com_person.currentState = "0";
        }
        else{
            this.com_person.visible = false;
        }
        
        //开始独白
        this.monolog.startAction();
    }
}