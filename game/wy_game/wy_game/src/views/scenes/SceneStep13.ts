/**
 *
 * @步骤9
 *
 */
class SceneStep13  extends basic.SceneBase {
    //定义变量
    private monolog: Monolog;
    private img_mask: eui.Image;
	private rect_mask: eui.Rect;
    private btn_next: eui.Button;
    private com_person: eui.Component;
    private mask_action: Action_Mask;
    private detail:string[] = [
        "警察：你好，请问您是这家人家的主人么？",
        "**：不，事实上，这家里的人都莫名失踪了，而我是受雇前来的私家侦探。",
        "警察：竟然有这种事？我是警察，这是我的证件。而旁边这家伙就是最近经常出没的惯偷，今天在作案的时候被我逮着了。但在押送他回去的时候，胎被路边的树枝扎破了。原本只是想路过此地借点修理工具，没想到居然发生了这种事情？",
        "小偷：长官，这可是天大的误会啊。我可不认识你说的那个什么惯犯。我今天可是第一次啊，而且我这不什么都没有偷到么，最多算偷窃未遂。",
        "警察：让你说话了么！给我老实点！",
        "小偷：是，长官。那能否请你再给我一支烟呢？",
        "**：很可惜，我并不是这里的主人并不知道东西放在哪。",
        "医生：汽车的修理工具么？之前来的时候我好像在哪里见过，貌似在地下室。情况特殊，先随我去取吧。"
    ];

    //定义界面
    public constructor() {
        super();

        //定义界面
        this.skinName = SceneStep13Skin;

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
            this.com_person.currentState = "1";
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
            basic.SceneManager.show(SceneNames.STEP14);
        });
    }
    
    //停止动画
    private stopMonolog():void{
        
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
            this.com_person.currentState = "1";
        }
        else if(this.monolog.now_show == 3){
            this.com_person.visible = true;
            this.com_person.currentState = "2";
        }
        else if(this.monolog.now_show == 4){
            this.com_person.visible = true;
            this.com_person.currentState = "1";
        }
        else if(this.monolog.now_show == 5){
            this.com_person.visible = true;
            this.com_person.currentState = "2";
        }
        else if(this.monolog.now_show == 6){
            this.com_person.visible = true;
            this.com_person.currentState = "4";
        }
        else if(this.monolog.now_show == 7){
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