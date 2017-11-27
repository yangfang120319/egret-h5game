/**
 *
 * @步骤17
 *
 */
class SceneStep18  extends basic.SceneBase {
    //定义变量
    private monolog: Monolog;
	private rect_mask: eui.Rect;
    private img_mask: eui.Image;
    private img_back: eui.Image;
    private img_head: eui.Image;
    private btn_next: eui.Button;
    private com_person: eui.Component;
    private mask_action: Action_Mask;
    private detail0:string[] = [
        "来到地下室后，眼前的一幕让**惊呆了，小偷被杀了，胸口插着一把餐刀，死在了地下室的纹样旁。"
    ];
    private detail1:string[] = [
        "来到地下室后，眼前的一幕让**惊呆了，女演员被杀了，胸口插着一把餐刀，死在了地下室的纹样旁。"
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
        this.img_head.visible = false;
		this.btn_next.visible = false;
        this.com_person.visible = false;
        this.img_back.source = "back_step10_jpg";

        //定义变量
        var monolog_data: any = {};

        //数据赋值
        if(UserData.User_Choose[3] == 0){
            this.img_head.source = "icon_head3_png";
            monolog_data["detail_text"] = this.detail0;
            monolog_data["detail_type"] = [0];
        }
        else{
            this.img_head.source = "icon_head2_png";
            monolog_data["detail_text"] = this.detail1;
            monolog_data["detail_type"] = [0];
        }
        
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
        this.img_head.y = this.monolog.y - 387 + 30;
        
        //初始化遮罩 
        this.mask_action = new Action_Mask(this.img_mask);

        //隐藏遮罩
		this.mask_action.hide(()=>{
            //显示按钮
			Action_Other.changeAlpha(0,1,500,this.btn_next);

            //显示头像
			Action_Other.changeAlpha(0,1,500,this.img_head);

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
            basic.SceneManager.show(SceneNames.STEP19);
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