/**
 *
 * @步骤17
 *
 */
class SceneStep24  extends basic.SceneBase {
    //定义变量
    private monolog: Monolog;
	private rect_mask: eui.Rect;
    private img_mask: eui.Image;
    private img_back: eui.Image;
    private btn_next: eui.Button;
    private com_person: eui.Component;
    private mask_action: Action_Mask;
    private detail000:string[] = [
        "**觉得仍有可疑的地方，折回地下室寻找心的线索，经过一番搜查在奇怪的纹样边找到了一小块被撕碎的笔记碎片。",
        "碎片上写着，献祭仪式需要四个生命的灵魂才能起到作用。",
        "**仔细思考了一番，觉得凶手并非女演员。"
    ];
    private detail001:string[] = [
        "**觉得仍有可疑的地方，于是回到2楼重新调查一番，但是没有发现什么新的线索。"
    ];
    private detail010:string[] = [
        "**和警察看此情况急忙想到女演员也有辆车，便驱车前去追赶。",
        "虽然医生已经不见踪影，但是**和警察已经掌握了医生的个人信息，便决定先回警署再商议下一步对策。",
        "途中，警察烟瘾犯了，便从烟盒里抽出一直烟递给了**，自己也抽出一支。",
        "**因为经历了一连串的案件倍感劳累，接过了烟便抽了起来。",
        "抽着抽着**觉得自己有点不太对劲，眼皮开始慢慢沉重，眼前的路也变得扭曲了起来。",
        "**昏昏沉沉地把头转向驾驶座上的警察，发现警察已经趴倒在方向盘上，嘴角挂着一抹鲜红……"
    ];
    private detail011:string[] = [
        "警察建议**马上和他一起驾驶女演员的车子去追医生。但是**却说他们已经掌握了医生的个人信息，所以他跑不了。",
        "等收拾完行李再追也不迟，于是**和警察会到二楼收拾行李。",
        "正当**离开房间的时候，他发现医生的药箱中似乎少了一瓶药剂。",
        "过道中，警察烟瘾犯了，便从烟盒里抽出一直烟递给了**，自己也抽出一支。",
        "**因为经历了一连串的案件倍感劳累，接过了烟便抽了起来。",
        "抽了没几口**发现不对，那瓶药剂定义有什么关键用途。",
        "**看着警察还未点燃的烟似乎想起了什么，赶紧把警察的烟丢掉，但自己的眼皮开始慢慢沉重起来……"
    ];
    private detail020:string[] = [
        "**觉得仍有可疑的地方，折回地下室寻找心的线索，经过一番搜查在奇怪的纹样边找到了一小块被撕碎的笔记碎片。",
        "碎片上写着，献祭仪式需要四个生命的灵魂才能起到作用。",
        "**仔细思考了一番，觉得凶手并非警察"
    ];
    private detail021:string[] = [
        "**觉得仍有可疑的地方，于是回到2楼重新调查一番，但是没有发现什么新的线索。"
    ];
    private detail100:string[] = [
        "**觉得仍有可疑的地方，折回地下室寻找心的线索，经过一番搜查在奇怪的纹样边找到了一小块被撕碎的笔记碎片。",
        "碎片上写着，献祭仪式需要四个生命的灵魂才能起到作用。",
        "**仔细思考了一番，觉得凶手并非小偷。"
    ];
    private detail101:string[] = [
        "**觉得仍有可疑的地方，于是回到2楼重新调查一番，但是没有发现什么新的线索。"
    ];
    private detail110:string[] = [
        "**和警察看此情况急忙想到女演员也有辆车，便驱车前去追赶。",
        "虽然医生已经不见踪影，但是**和警察已经掌握了医生的个人信息，便决定先回警署再商议下一步对策。",
        "途中，警察烟瘾犯了，便从烟盒里抽出一直烟递给了**，自己也抽出一支。",
        "**因为经历了一连串的案件倍感劳累，接过了烟便抽了起来。",
        "抽着抽着**觉得自己有点不太对劲，眼皮开始慢慢沉重，眼前的路也变得扭曲了起来。",
        "**昏昏沉沉地把头转向驾驶座上的警察，发现警察已经趴倒在方向盘上，嘴角挂着一抹鲜红……"
    ];
    private detail111:string[] = [
        "警察建议**马上和他一起驾驶女演员的车子去追医生。但是**却说他们已经掌握了医生的个人信息，所以他跑不了。",
        "等收拾完行李再追也不迟，于是**和警察会到二楼收拾行李。",
        "正当**离开房间的时候，他发现医生的药箱中似乎少了一瓶药剂。",
        "过道中，警察烟瘾犯了，便从烟盒里抽出一直烟递给了**，自己也抽出一支。",
        "**因为经历了一连串的案件倍感劳累，接过了烟便抽了起来。",
        "抽了没几口**发现不对，那瓶药剂定义有什么关键用途。",
        "**看着警察还未点燃的烟似乎想起了什么，赶紧把警察的烟丢掉，但自己的眼皮开始慢慢沉重起来……"
    ];
    private detail120:string[] = [
        "**觉得仍有可疑的地方，折回地下室寻找心的线索，经过一番搜查在奇怪的纹样边找到了一小块被撕碎的笔记碎片。",
        "碎片上写着，献祭仪式需要四个生命的灵魂才能起到作用。",
        "**仔细思考了一番，觉得凶手并非警察。"
    ];
     private detail121:string[] = [
        "**觉得仍有可疑的地方，于是回到2楼重新调查一番，但是没有发现什么新的线索。"
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
                    this.img_back.source = "back_step10_jpg";
                }
                else if(UserData.User_Choose[5] == 1){
                    monolog_data["detail_text"] = this.detail001;
                    monolog_data["detail_type"] = [0,0,0,0,0,0,0,0];
                    this.img_back.source = "back_step8_jpg";
                }
            }
            else if(UserData.User_Choose[4] == 1){
                if(UserData.User_Choose[5] == 0){
                    monolog_data["detail_text"] = this.detail010;
                    monolog_data["detail_type"] = [0,0,0,0,0,0,0,0];
                    this.img_back.source = "back_step15_jpg";
                }
                else if(UserData.User_Choose[5] == 1){
                    monolog_data["detail_text"] = this.detail011;
                    monolog_data["detail_type"] = [0,0,0,0,0,0,0,0];
                    this.img_back.source = "back_step14_jpg";
                }
            }
            else if(UserData.User_Choose[4] == 2){
                if(UserData.User_Choose[5] == 0){
                    monolog_data["detail_text"] = this.detail020;
                    monolog_data["detail_type"] = [0,0,0,0,0,0,0,0];
                    this.img_back.source = "back_step10_jpg";
                }
                else if(UserData.User_Choose[5] == 1){
                    monolog_data["detail_text"] = this.detail021;
                    monolog_data["detail_type"] = [0,0,0,0,0,0,0,0];
                    this.img_back.source = "back_step8_jpg";
                }
            }
        }
        else{
            if(UserData.User_Choose[4] == 0){
                //判断显示
                if(UserData.User_Choose[5] == 0){
                    monolog_data["detail_text"] = this.detail100;
                    monolog_data["detail_type"] = [0,0,0,0,0,0,0,0];
                    this.img_back.source = "back_step10_jpg";
                }
                else if(UserData.User_Choose[5] == 1){
                    monolog_data["detail_text"] = this.detail101;
                    monolog_data["detail_type"] = [0,0,0,0,0,0,0,0];
                    this.img_back.source = "back_step8_jpg";
                }
            }
            else if(UserData.User_Choose[4] == 1){
                if(UserData.User_Choose[5] == 0){
                    monolog_data["detail_text"] = this.detail110;
                    monolog_data["detail_type"] = [0,0,0,0,0,0,0,0];
                    this.img_back.source = "back_step15_jpg";
                }
                else if(UserData.User_Choose[5] == 1){
                    monolog_data["detail_text"] = this.detail111;
                    monolog_data["detail_type"] = [0,0,0,0,0,0,0,0];
                    this.img_back.source = "back_step14_jpg";
                }
            }
            else if(UserData.User_Choose[4] == 2){
                if(UserData.User_Choose[5] == 0){
                    monolog_data["detail_text"] = this.detail120;
                    monolog_data["detail_type"] = [0,0,0,0,0,0,0,0];
                    this.img_back.source = "back_step10_jpg";
                }
                else if(UserData.User_Choose[5] == 1){
                    monolog_data["detail_text"] = this.detail121;
                    monolog_data["detail_type"] = [0,0,0,0,0,0,0,0];
                    this.img_back.source = "back_step8_jpg";
                }
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
            if(UserData.User_Choose[4] == 1){
                basic.SceneManager.show(SceneNames.OVER);
            }
            else{
                basic.SceneManager.show(SceneNames.STEP25);
            }
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