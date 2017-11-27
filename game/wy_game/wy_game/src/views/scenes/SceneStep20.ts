/**
 *
 * @步骤17
 *
 */
class SceneStep20  extends basic.SceneBase {
    //定义变量
    private monolog: Monolog;
	private rect_mask: eui.Rect;
    private img_mask: eui.Image;
    private img_back: eui.Image;
    private btn_next: eui.Button;
    private com_person: eui.Component;
    private mask_action: Action_Mask;
    private detail00:string[] = [
        "调查衣物,调查伤口,调查地板",
        "在小偷身上发现了女演员的解约书。",
        "**：看来她虽然表面仍然风光亮丽，但是自己的演艺事业已经进入危机。",
        "**：不过我还需要更多的线索。",
        "**将证据展示给众人，虽然无法判断究竟谁是凶手，但大家决定先把女演员铐起来。"
    ];
    private detail01:string[] = [
        "调查衣物,调查伤口,调查地板",
        "发现伤口只有一处致命伤。",
        "**：这处伤口准确得命中了被害人的要害，能做到这一点的恐怕⋯⋯",
        "**：不过我还需要更多的线索。",
        "**将证据展示给众人，虽然无法判断究竟谁是凶手，但大家决定先把医生铐起来。"
    ];
    private detail02:string[] = [
        "调查衣物,调查伤口,调查地板",
        "发现地上散落的烟灰。",
        "**：从昨天到现在只有警察抽过烟，难道⋯⋯",
        "**：不过我还需要更多的线索。",
        "**将证据展示给众人，虽然无法判断究竟谁是凶手，但警察为了证明自己的清白决定让大家先把自己铐起来。"
    ];
    private detail10:string[] = [
        "调查衣物,调查伤口,调查地板",
        "发现演员的钱包不翼而飞了。",
        "**：难道只是因为金钱纠葛而引发的凶杀案吗？那么嫌疑最大的应该是……",
        "**：不过我还需要更多的线索。",
        "**将证据展示给众人，虽然无法判断究竟谁是凶手，但大家决定先把小偷铐起来。"
    ];
    private detail11:string[] = [
        "调查衣物,调查伤口,调查地板",
        "发现伤口只有一处致命伤。",
        "**：这处伤口准确得命中了被害人的要害，能做到这一点的恐怕⋯⋯",
        "**：不过我还需要更多的线索。",
        "**将证据展示给众人，虽然无法判断究竟谁是凶手，但大家决定先把医生铐起来。"
    ];
    private detail12:string[] = [
        "调查衣物,调查伤口,调查地板",
        "发现地上散落的烟灰。",
        "**：从昨天到现在只有警察抽过烟，难道⋯⋯",
        "**：不过我还需要更多的线索。",
        "**将证据展示给众人，虽然无法判断究竟谁是凶手，但警察为了证明自己的清白决定让大家先把自己铐起来。"
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
        UserData.User_Choose[4] = -1;
		this.btn_next.visible = false;
        this.com_person.visible = false;
        this.img_back.source = "back_step10_jpg";

        //定义变量
        var monolog_data: any = {};

        //数据赋值
        if(UserData.User_Choose[3] == 0){
            monolog_data["detail_text"] = this.detail00;
            monolog_data["detail_type"] = [1,0,0,0,0];
        }
        else{
            monolog_data["detail_text"] = this.detail10;
            monolog_data["detail_type"] = [1,0,0,0,0];
        }
        
        //定义独白
		this.monolog = new Monolog(this.over.bind(this),this.btnchange.bind(this),this.stopMonolog.bind(this),380);
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
            //显示独白
            Action_Other.changeAlpha(0,1,500,this.monolog);
        });
    }
    
    //结束动画
    private over():void{
        //隐藏按钮
        this.btn_next.visible = false;

        //显示遮罩
        this.mask_action.show(()=>{
            //显示界面
            basic.SceneManager.show(SceneNames.STEP21);
        });
    }

    //按钮改变
    private btnchange():void{
        //数据赋值
        UserData.User_Choose[4] = this.monolog.now_choose;

        //判断显示
       if(this.btn_next.visible == false&&UserData.User_Choose[4]!=-1){
            //显示按钮
            Action_Other.changeAlpha(0,1,500,this.btn_next);
        }
    }

    //停止动画
    private stopMonolog():void{
         //判断显示
        if(this.monolog.now_show != 3 &&this.monolog.now_show != 4){
            //判断显示
            if(this.monolog.now_show == 2){
                this.com_person.visible = true;
                this.com_person.currentState = "4";
            }

            //开始独白
            this.monolog.startAction();
        }
    }

	//下一步按钮
    private onNextBtn(e:egret.TouchEvent):void{
        //播放声音
        basic.SoundManager.instance.playEffect("sound_btn_mp3");
        
        //定义变量
        var monolog_data: any = {};

        //判断显示
        if(this.monolog.now_show == 0){
            //清除
            this.monolog.clean();

            //判断清楚
            if(UserData.User_Choose[3] == 0){
                if(UserData.User_Choose[4] == 0){
                     monolog_data["detail_text"] = this.detail00;
                     monolog_data["detail_type"] = [1,0,0,0,0];
                }
                else if(UserData.User_Choose[4] == 1){
                    monolog_data["detail_text"] = this.detail01;
                    monolog_data["detail_type"] = [1,0,0,0,0];
                }
                else if(UserData.User_Choose[4] == 2){
                    monolog_data["detail_text"] = this.detail02;
                    monolog_data["detail_type"] = [1,0,0,0,0];
                }
            }
            else if(UserData.User_Choose[3] == 1){
                if(UserData.User_Choose[4] == 0){
                     monolog_data["detail_text"] = this.detail10;
                     monolog_data["detail_type"] = [1,0,0,0,0];
                }
                else if(UserData.User_Choose[4] == 1){
                    monolog_data["detail_text"] = this.detail11;
                    monolog_data["detail_type"] = [1,0,0,0,0];
                }
                else if(UserData.User_Choose[4] == 2){
                    monolog_data["detail_text"] = this.detail12;
                    monolog_data["detail_type"] = [1,0,0,0,0];
                }
            }
            this.monolog.show(monolog_data,1);
        }
        if(this.monolog.now_show == 2){
            this.com_person.visible = true;
            this.com_person.currentState = "4";
        }
        else if(this.monolog.now_show == 3){
            this.com_person.visible = true;
            this.com_person.currentState = "4";
        }
        else{
            this.com_person.visible = false;
        }

        //开始独白
        this.monolog.startAction();
    }
}