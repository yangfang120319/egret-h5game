/**
 *
 * @步骤9
 *
 */
class SceneStep9  extends basic.SceneBase {
    //定义变量
    private monolog: Monolog;
    private img_mask: eui.Image;
    private btn_next: eui.Button;
    private mask_action: Action_Mask;
    private detail0:string[] = [
        "**：让我们重新回到1楼的玄关开始看看！",
        "**：很好，另一组脚印！从这脚印的大小来看，应该是年轻女子没错。但是门外却没有发现相同的痕迹，难道⋯⋯",
        "随脚印到二楼,继续调查1楼",
        "从这些痕迹的方向来看，是通往二楼的，难道刚刚就在眼皮底下错过了？事不宜迟，回到1楼看看吧。",
        "**：总感觉还遗漏了点什么⋯⋯咦？玄关的地毯地毯下面好像有什么东西？",
        "**：一把钥匙！应该是某些地方的备用钥匙，总之先把它收起来。说不定是2楼某个房间的钥匙，去调查看看。"
    ];
     private detail1:string[] = [
        "**：让我们重新回到1楼的玄关开始看看！",
        "**：很好，另一组脚印！从这脚印的大小来看，应该是年轻女子没错。但是门外却没有发现相同的痕迹，难道⋯⋯",
        "随脚印到二楼,继续调查1楼",
        "**：总感觉还遗漏了点什么⋯⋯咦？玄关的地毯地毯下面好像有什么东西？",
        "**：一把钥匙！应该是某些地方的备用钥匙，总之先把它收起来。说不定是2楼某个房间的钥匙，去调查看看。"
    ];

    //定义界面
    public constructor() {
        super();

        //定义界面
        this.skinName = SceneStep9Skin;

		//定义变量
        var monolog_data: any = {};

        //数据赋值
        monolog_data["detail_text"] = this.detail0;
        monolog_data["detail_type"] = [0,0,1,0,0,0];
        
        //定义独白
		this.monolog = new Monolog(this.over.bind(this),this.btnchange.bind(this));;
		this.monolog.show(monolog_data);

        //显示界面
        this.addChild(this.monolog);

        //定义最上层
        this.setChildIndex(this.btn_next,this.numChildren-1);
        this.setChildIndex(this.img_mask,this.numChildren-1);

        //注册按钮
        this.btn_next.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onNextBtn,this);
    }
    
    //注册侦听
    beforeShow(params: any): void {
        //初始化显示
        UserData.User_Choose[2] = -1; 
		this.btn_next.visible = false;
		this.monolog.visible = false;
        
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

        //隐藏独白
        Action_Other.changeAlpha(1,0,500,this.monolog);

        //显示遮罩
        this.mask_action.show(()=>{
            //显示界面
            basic.SceneManager.show(SceneNames.STEP10);
        });
    }

    //按钮改变
    private btnchange():void{
        //数据赋值
        UserData.User_Choose[2] = this.monolog.now_choose;

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

	//下一步按钮
    private onNextBtn(e:egret.TouchEvent):void{
        //播放声音
        basic.SoundManager.instance.playEffect("sound_btn_mp3");
        
        //判断显示下一个
        if(this.monolog.detail_type[this.monolog.now_show - 1] == 1){
            //移除界面
            this.monolog.clean();

            //定义变量
            var monolog_data: any = {};

            //数据赋值
            if(UserData.User_Choose[2] == 0){
                monolog_data["detail_text"] = this.detail0;
                monolog_data["detail_type"] = [0,0,1,0,0,0];
            }
            else{
                monolog_data["detail_text"] = this.detail1;
                monolog_data["detail_type"] = [0,0,1,0,0];
            }

            //显示界面
            this.monolog.show(monolog_data,this.monolog.now_show);
        }
        
        //开始独白
        this.monolog.startAction();
    }
}