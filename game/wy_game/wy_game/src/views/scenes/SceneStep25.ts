/**
 *
 * @步骤17
 *
 */
class SceneStep25  extends basic.SceneBase {
    //定义变量
    private monolog: Monolog;
	private rect_mask: eui.Rect;
    private img_mask: eui.Image;
    private img_back: eui.Image;
    private btn_next: eui.Button;
    private com_person: eui.Component;
    private mask_action: Action_Mask;
    private detail000:string[] = [
        "**察觉事情可能有蹊跷，想要尽快将真相告诉警察。并且顺路在厨房中拿了一把餐刀防身。",
        "**推推门进去一看，女演员和警察已经倒在了血泊之中。",
        "因为**早有防备，医生的偷袭没有成功。",
        "双方经过一场激烈的争斗后，**终于将医生杀死……"
    ];
    private detail001:string[] = [
        "由于**没有发现任何可疑的地方，想和警察汇报情况后再做打算。",
        "主角推门进去一看，女演员和警察已经倒在了血泊之中。",
        "因为**没有防备医生成功偷袭主角，将手术刀插进了**的心脏。",
        "**意识消失之前迷迷糊糊地看着医生吧自己拖向划有献祭纹样的地下室深处……"
    ];
    private detail02:string[] = [
        "**察觉事情可能有蹊跷，觉得凶手另有其人。并且顺路在厨房中拿了一把餐刀防身。",
        "**推门进去一看，警察已经倒在了血泊之中，医生夺了警察随身携带的左轮手枪与**和女演员对峙。",
        "在激烈的混战中，**不幸中弹，而医生也被**从厨房拿到的餐刀刺死。",
        "弥留之际，**期望女演员好好活下去……"
    ];
    private detail100:string[] = [
        "**察觉事情可能有蹊跷，想要尽快将真相告诉警察。并且顺路在厨房中拿了一把餐刀防身。",
        "**推门进去一看，小偷和警察已经倒在了血泊之中。",
        "因为**早有防备，医生的偷袭并没有成功。",
        "双方经过一场激烈的斗争后，**终于将医生杀死……"
    ];
    private detail101:string[] = [
        "由于**没有发现任何可疑的地方，想和警察汇报情况后再做打算。",
        "主角推门进去一看，小偷和警察已经倒在了血泊之中。",
        "因为**没有防备医生成功偷袭主角，将手术刀插进了**的心脏。",
        "**意识消失之前迷迷糊糊地看着医生吧自己拖向划有献祭纹样的地下室深处……"
    ];
    private detail12:string[] = [
        "**察觉事情可能有蹊跷，觉得凶手另有其人。并且顺路在厨房中拿了一把餐刀防身。",
        "**推门进去一看，警察已经倒在了血泊之中，因为**早有防备，医生的偷袭并没有成功。。",
        "双方经过一场激烈的斗争后，**将餐刀刺进了医生的胸膛。",
        "正当**以为一切都结束的时候，医生拿出警察的枪朝着**射了一枪……",
        "此时门外，小偷发动了警察的汽车准备驶离这栋恐怖的庄园。"
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

        //定义变量
        var monolog_data: any = {};

        //数据赋值
        if(UserData.User_Choose[3] == 0){
            if(UserData.User_Choose[4] == 0){
                //判断显示
                if(UserData.User_Choose[5] == 0){
                    monolog_data["detail_text"] = this.detail000;
                    monolog_data["detail_type"] = [0,0,0,0,0,0,0,0];
                    this.img_back.source = "back_step12_jpg";
                }
                else if(UserData.User_Choose[5] == 1){
                    monolog_data["detail_text"] = this.detail001;
                    monolog_data["detail_type"] = [0,0,0,0,0,0,0,0];
                    this.img_back.source = "back_step17_jpg";
                }
            }
            else if(UserData.User_Choose[4] == 2){
                monolog_data["detail_text"] = this.detail02;
                monolog_data["detail_type"] = [0,0,0,0,0,0,0,0];
                this.img_back.source = "back_step16_jpg";
            }
        }
        else{
            if(UserData.User_Choose[4] == 0){
                //判断显示
                if(UserData.User_Choose[5] == 0){
                    monolog_data["detail_text"] = this.detail100;
                    monolog_data["detail_type"] = [0,0,0,0,0,0,0,0];
                    this.img_back.source = "back_step12_jpg";
                }
                else if(UserData.User_Choose[5] == 1){
                    monolog_data["detail_text"] = this.detail101;
                    monolog_data["detail_type"] = [0,0,0,0,0,0,0,0];
                    this.img_back.source = "back_step17_jpg";
                }
            }
            else if(UserData.User_Choose[4] == 2){
                monolog_data["detail_text"] = this.detail12;
                monolog_data["detail_type"] = [0,0,0,0,0,0,0,0];
                this.img_back.source = "back_step13_jpg";
            }
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
            basic.SceneManager.show(SceneNames.OVER);
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