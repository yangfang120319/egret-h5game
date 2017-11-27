/**
 *
 * @步骤14
 *
 */
class SceneStep14  extends basic.SceneBase {
    //定义变量
    private monolog: Monolog;
    private img_mask: eui.Image;
	private rect_mask: eui.Rect;
    private btn_next: eui.Button;
    private com_person: eui.Component;
    private mask_action: Action_Mask;
    private detail:string[] = [
        "小偷：这雨下得可真够大的。警官，要不咱们在这住一晚再走吧？",
        "警察：我劝你最好不要动什么玩脑筋。",
        " ",
        "接着警察把小偷铐在了屋内，并指向门外的警车，询问是否有谁愿意搭把手？",
        "前去帮忙,留守屋内"
    ];

    //定义界面
    public constructor() {
        super();

        //定义界面
        this.skinName = SceneStep14Skin;

		//定义变量
        var monolog_data: any = {};

        //数据赋值
        monolog_data["detail_text"] = this.detail;
        monolog_data["detail_type"] = [0,0,0,0,1];
        
        //定义独白
		this.monolog = new Monolog(this.over.bind(this),this.btnchange.bind(this),this.stopMonolog.bind(this),380);
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
        UserData.User_Choose[3] = -1; 
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
            this.com_person.currentState = "2";
            Action_Other.changeAlpha(0,1,500,this.com_person);

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
            basic.SceneManager.show(SceneNames.STEP15);
        });
    }
    
     //按钮改变
    private btnchange():void{
        //数据赋值
        UserData.User_Choose[3] = this.monolog.now_choose;

        //判断显示
        if(this.monolog.detail_type[this.monolog.now_show] == 1){
            //隐藏按钮
            this.btn_next.enabled = false;
            Action_Other.changeAlpha(1,0,500,this.btn_next,0,()=>{
                this.btn_next.enabled = true;
            });
        }
        else{
            if(this.btn_next.visible == false){
                //显示按钮
                Action_Other.changeAlpha(0,1,500,this.btn_next);
            }
        }
    }

    //停止动画
    private stopMonolog():void{
        //判断显示
        if(this.monolog.now_show > 2){
            //开始独白
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
            this.com_person.currentState = "1";
        }
        else{
            this.com_person.visible = false;
        }
        
        //开始独白
        this.monolog.startAction();
    }
}