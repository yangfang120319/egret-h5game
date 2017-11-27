/**
 *
 * @结束界面
 *
 */
class SceneOver extends basic.SceneBase {
    //定义变量
	private g_over: eui.Group;
    private img_mask: eui.Image;
	private txt_name: eui.Label;
	private img_over: eui.Image;
	private txt_tips: eui.Label;
	private btn_next: eui.Button;
	private btn_over: eui.Button;
	private btn_share: eui.Button;
	private btn_again: eui.Button;
    private mask_action: Action_Mask;

	"外倾性（extraversion）：好交际对不好交际，爱娱乐对严肃，感情丰富对含蓄;表现出热情、社交、果断、活跃、冒险、乐观等特点。"//小偷活着
	"神经质或情绪稳定性（neuroticism）:烦恼对平静，不安全感对安全感，自怜对自我满意，包括焦虑、敌对、压抑、自我意识、冲动、脆弱等特质。"//主角活着
	"开放性（openness）: 富于想象对务实，寻求变化对遵守惯例，自主对顺从。具有想象、审美、情感丰富、求异、创造、智慧等特征。"//女演员活着
	"宜人性 (agreeableness)：热心对无情，信赖对怀疑，乐于助人，合作。包括信任、利他、直率、谦虚、移情等品质。"//医生活着
	"尽责性(conscientiousness)：有序对无序，谨慎细心对粗心大意，自律对意志薄弱。包括胜任、公正、条理、尽职、成就、自律、谨慎、克制等特点。"//警察活着
    
    //定义界面
    public constructor() {
        super();
		console.info(this);
        //定义界面
        this.skinName = SceneOverSkin;

		//注册按钮
		this.btn_next.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onNextBtn,this);
		this.btn_over.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onOverBtn,this);
		this.btn_share.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onShareBtn,this);
		this.btn_again.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onAgainBtn,this);
    }
    
    //注册侦听
    beforeShow(params: any): void {
        //初始化遮罩 
		this.g_over.visible = false;
		this.img_mask.visible = true;
		this.txt_tips.visible = true;
		this.btn_next.visible = true;
		this.btn_over.visible = true;
        this.mask_action = new Action_Mask(this.img_mask);

		//显示界面
		this.txt_name.text = UserData.User_Name;
		if(UserData.User_Choose[4] == 0){
			if(UserData.User_Choose[5] == 0){
				this.img_over.source = "txt_sjz_png";
			}
			else{
				this.img_over.source = "txt_yr_png";
			}
		}
		else if(UserData.User_Choose[4] == 1){
			if(UserData.User_Choose[5] == 0){
				this.img_over.source = "txt_yr_png";
			}
			else{
				this.img_over.source = "txt_jz_png";
			}
		}
		else if(UserData.User_Choose[4] == 2){
			if(UserData.User_Choose[3] == 0){
				this.img_over.source = "txt_kf_png";
			}
			else{
				this.img_over.source = "txt_wq_png";
			}
		}
    }

    //注销侦听
    beforeHide(): void {
        
    }

	//按钮
	private onNextBtn(e:egret.TouchEvent):void{
		//播放声音
        basic.SoundManager.instance.playEffect("sound_btn_mp3");

		//隐藏界面
		this.btn_next.visible = false;
		this.txt_tips.visible = false;
		this.mask_action.hide();
	}

	//结束按钮
	private onOverBtn(e: egret.TouchEvent): void{
		//隐藏按钮
		this.btn_over.visible = false;

		//显示结束界面
		this.g_over.visible = true;
	}

	//分享按钮
	private onShareBtn(e: egret.TouchEvent): void{
		
		window["shareyang"]();
	}

	//重来按钮
	private onAgainBtn(e: egret.TouchEvent): void{
		//停止声音
		basic.SoundManager.instance.stopMusic();

		//显示加载界面
        basic.SceneManager.show(SceneNames.LOADING);
	}
}
