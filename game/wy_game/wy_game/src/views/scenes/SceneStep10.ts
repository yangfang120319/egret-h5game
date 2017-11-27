/**
 *
 * @步骤9
 *
 */
class SceneStep10  extends basic.SceneBase {
    //定义变量
    private monolog: Monolog;
    private img_mask: eui.Image;
    private btn_next: eui.Button;
    private btn_open: eui.Button;
    private mask_action: Action_Mask;
    private detail:string[] = [
        "**：这层楼似乎只有这几个房间，先调查下最外侧这个房间吧。",
        "门锁住了，似乎需要钥匙....",
        "**突然想起自己在楼下发现的钥匙，试了一下。"
    ];

    //定义界面
    public constructor() {
        super();

        //定义界面
        this.skinName = SceneStep10Skin;

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
        this.setChildIndex(this.btn_open,this.numChildren-1);
        this.setChildIndex(this.btn_next,this.numChildren-1);
        this.setChildIndex(this.img_mask,this.numChildren-1);

        //注册按钮
        this.btn_next.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onNextBtn,this);
        this.btn_open.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onOpenBtn,this);
    }
    
    //注册侦听
    beforeShow(params: any): void {
        //初始化显示
		this.monolog.visible = false;
		this.btn_next.visible = false;
		this.btn_open.visible = false;
        
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

        //发送消息
        if(LoaderData.is_part_LoadEnd[3] == false) {
            basic.Dispatcher.dispatch(EventNames.LOAD_PART,{ "part_num": 3 });
        }
    }
    
    //结束动画
    private over():void{
        //隐藏按钮
        this.btn_next.visible = false;

        //隐藏对话
        this.monolog.visible = false;

        //显示按钮
		Action_Other.changeAlpha(0,1,500,this.btn_open);
    }

    //打开按钮
    private onOpenBtn(e:egret.TouchEvent):void{
        //隐藏按钮
        this.btn_open.visible = false;

        //播放声音
        basic.SoundManager.instance.playEffect("sound_btn_mp3");
        
        //显示遮罩
        this.mask_action.show(()=>{
            //显示界面
            basic.SceneManager.show(SceneNames.STEP11);
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