/**
 *
 * @步骤4
 *
 */
class SceneStep4  extends basic.SceneBase {
    //定义变量
    private monolog: Monolog;
    private img_mask: eui.Image;
    private btn_next: eui.Button;
    private btn_open0: eui.Button;
    private btn_open1: eui.Button;
    private img_mask_hei: eui.Image;
    private mask_action: Action_Mask;
    private detail: string[] = [
        "这里看起来已经荒废很久了，最近貌似也没有任何人在这生活过的痕迹。",
        "哼，有点意思，没有什么比在这种鸟不生蛋的多地方找一个离家出走的小女孩更适合打发时间的了。",
        "先看看厅内有什么线索吧。"
    ];

    //定义界面
    public constructor() {
        super();

        //定义界面
        this.skinName = SceneStep4Skin;

        //定义变量
        var monolog_data: any = {};

        //数据赋值
        monolog_data["detail_text"] = this.detail;
        monolog_data["detail_type"] = [0,0,0];
        
        //定义独白
        this.monolog = new Monolog(this.over.bind(this));
        this.monolog.show(monolog_data);

        //显示界面
        this.addChild(this.monolog);

        //定义最上层
        this.setChildIndex(this.btn_next,this.numChildren-1);
        this.setChildIndex(this.btn_open1,this.numChildren-1);
        this.setChildIndex(this.img_mask,this.numChildren-1);
        this.setChildIndex(this.img_mask_hei,this.numChildren-1);
        this.setChildIndex(this.btn_open0,this.numChildren-1);

        //注册按钮
        this.btn_next.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onNextBtn,this);
        this.btn_open0.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onOpenBtn0,this);
        this.btn_open1.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onOpenBtn1,this);
    }
    
    //注册侦听
    beforeShow(params: any): void {
        //初始化显示
		this.monolog.visible = false;
		this.btn_open0.visible = true;
		this.btn_next.visible = false;
		this.img_mask_hei.alpha = 0.8;
		this.btn_open1.visible = false;
		this.img_mask_hei.visible = true;

        //定义位置
        this.monolog.x = (basic.StageProxy.width - this.monolog.width)/2;
        this.monolog.y=basic.StageProxy.height - this.monolog.height - 150;
        
        //初始化遮罩 
        this.mask_action = new Action_Mask(this.img_mask);

        //隐藏遮罩
		this.mask_action.hide();

        //发送消息
        if(LoaderData.is_part_LoadEnd[1] == false) {
            basic.Dispatcher.dispatch(EventNames.LOAD_PART,{ "part_num": 3 });
        }
    }

    //开门按钮
    private onOpenBtn0(e:egret.TouchEvent):void{
        //隐藏界面
        this.btn_open0.visible = false;

        //播放声音
        basic.SoundManager.instance.playEffect("sound_btn_mp3");

        //隐藏着找
		Action_Other.changeAlpha(0.8,0,500,this.img_mask_hei,0,()=>{
            //显示提示文本
            Action_Other.changeAlpha(0,1,500,this.monolog,0,()=>{
                //显示独白
                this.monolog.startAction();
            });

			//显示按钮
			Action_Other.changeAlpha(0,1,500,this.btn_next);
		});
    }

    //结束界面
    private over():void{
        //隐藏按钮
        this.btn_next.visible = false;

        //隐藏对话框
        this.monolog.visible = false;

        //显示按钮
		Action_Other.changeAlpha(0,1,500,this.btn_open1);
    }

	//开门按钮
    private onOpenBtn1(e:egret.TouchEvent):void{
        //隐藏界面
        this.btn_open1.visible = false;

        //播放声音
        basic.SoundManager.instance.playEffect("sound_btn_mp3");

        //显示遮罩
        this.mask_action.show(()=>{
            //显示界面
            basic.SceneManager.show(SceneNames.STEP5);
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