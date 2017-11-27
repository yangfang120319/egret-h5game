/**
 *
 * @步骤17
 *
 */
class SceneStep22  extends basic.SceneBase {
    //定义变量
    private monolog: Monolog;
	private rect_mask: eui.Rect;
    private img_mask: eui.Image;
    private img_back: eui.Image;
    private btn_next: eui.Button;
    private com_person: eui.Component;
    private mask_action: Action_Mask;
    private detail00:string[] = [
        "**来到女演员的2C房间",
        "**：这个房间非常简洁",
        "此时**看到梳妆台上女演员的口红，想起小偷衣服上的印记",
        "正当**准备将这重大发现告诉大家时，楼下传来了女演员的惨叫",
        "**：该死，又怎么了？"
    ];
    private detail01:string[] = [
        "**来到自己和医生所在的2B房间的窗台边",
        "**：伤口的确非常可疑……",
        "此时**看见医生随身携带的医药箱，发现里面有一把带血的大号手术刀",
        "**：真是披着天使外壳的恶魔！",
        "正当**准备将这重大发现告诉大家时，楼下传来了女演员的惨叫",
        "**：该死，又怎么了？"
    ];
    private detail02:string[] = [
        "**来到警察和小偷所在的2A房间的窗台边",
        "**：烟灰的确非常可疑……",
        "此时主角回忆起小偷曾经想向警察借烟，经过调查，果然在窗台附近找到了相同的烟灰",
        "**：狡猾的老狐狸，我可能遇到了一个假警察！",
        "正当**准备将这重大发现告诉大家时，楼下传来了警察的惨叫",
        "**：该死，又怎么了？"
    ];
    private detail10:string[] = [
        "**来到警察和小偷所在的2A房间的卫生间",
        "**：这铁杆还真结实，难道小偷昨天真的是在这里过夜的？",
        "**：难道只是因为金钱纠葛而引发的凶杀案吗？那么嫌疑最大的应该是……",
        "此时**回忆起警察说过的话，掀起了马桶的水箱盖，在水箱里找到了丢失的钱包",
        "**：狡猾的家伙，我早就该想到一副手铐怎么可能困得住一个小偷呢！",
        "正当**准备将这重大发现告诉大家时，楼下传来了小偷的惨叫",
        "**：该死，又怎么了？"
    ];
    private detail11:string[] = [
        "**来到自己和医生所在的2B房间的窗台边",
        "**：伤口的确非常可疑……",
        "此时**看见医生随身携带的医药箱，发现里面有一把带血的大号手术刀",
        "**：真是披着天使外壳的恶魔！",
        "正当**准备将这重大发现告诉大家时，楼下传来了小偷的惨叫",
        "**：该死，又怎么了？"
    ];
    private detail12:string[] = [
        "**来到警察和小偷所在的2A房间的窗台边",
        "**：烟灰的确非常可疑……",
        "此时主角回忆起小偷曾经想向警察借烟，经过调查，果然在窗台附近找到了相同的烟灰",
        "**：狡猾的老狐狸，我可能遇到了一个假警察！",
        "正当**准备将这重大发现告诉大家时，楼下传来了警察的惨叫",
        "**：该死，又怎么了？"
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
        this.img_back.source = "back_step11_jpg";

        //定义变量
        var monolog_data: any = {};

        //数据赋值
        if(UserData.User_Choose[3] == 0){
            if(UserData.User_Choose[4] == 0){
                monolog_data["detail_text"] = this.detail00;
                monolog_data["detail_type"] = [0,0,0,0,0];
            }
            else if(UserData.User_Choose[4] == 1){
                monolog_data["detail_text"] = this.detail01;
                monolog_data["detail_type"] = [0,0,0,0,0,0];
            }
            else if(UserData.User_Choose[4] == 2){
                monolog_data["detail_text"] = this.detail02;
                monolog_data["detail_type"] = [0,0,0,0,0,0];
            }
        }
        else{
            if(UserData.User_Choose[4] == 0){
                monolog_data["detail_text"] = this.detail10;
                monolog_data["detail_type"] = [0,0,0,0,0,0,0];
            }
            else if(UserData.User_Choose[4] == 1){
                monolog_data["detail_text"] = this.detail11;
                monolog_data["detail_type"] = [0,0,0,0,0,0];
            }
            else if(UserData.User_Choose[4] == 2){
                monolog_data["detail_text"] = this.detail12;
                monolog_data["detail_type"] = [0,0,0,0,0,0];
            }
        }
        
        //定义独白
		this.monolog = new Monolog(this.over.bind(this),null,this.stopcallback.bind(this));
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
            basic.SceneManager.show(SceneNames.STEP23);
        });
    }

    //停止下一步
    private stopcallback():void{
        //判断播放声音
        if(UserData.User_Choose[3] == 0){
            if(UserData.User_Choose[4] == 0){
                if(this.monolog.now_show == 3){
                    //播放声音
                    basic.SoundManager.instance.playEffect("sound_nyy_dj_mp3");
                }
            }
            else if(UserData.User_Choose[4] == 1){
                 if(this.monolog.now_show == 4){
                    //播放声音
                    basic.SoundManager.instance.playEffect("sound_nyy_dj_mp3");
                }
            }
            else if(UserData.User_Choose[4] == 2){
                 if(this.monolog.now_show == 4){
                    //播放声音
                    basic.SoundManager.instance.playEffect("sound_jc_dj_mp3");
                }
            }
        }
        else{
            if(UserData.User_Choose[4] == 0){
                if(this.monolog.now_show == 5){
                    //播放声音
                    basic.SoundManager.instance.playEffect("sound_xt_dj_mp3");
                }
            }
            else if(UserData.User_Choose[4] == 1){
                if(this.monolog.now_show == 4){
                    //播放声音
                    basic.SoundManager.instance.playEffect("sound_xt_dj_mp3");
                }
            }
            else if(UserData.User_Choose[4] == 2){
                if(this.monolog.now_show == 4){
                    //播放声音
                    basic.SoundManager.instance.playEffect("sound_jc_dj_mp3");
                }
            }
        }

        //开始独白
        this.monolog.startAction();
    }

	//下一步按钮
    private onNextBtn(e:egret.TouchEvent):void{
        //播放声音
        basic.SoundManager.instance.playEffect("sound_btn_mp3");

        //判断播放声音
        if(UserData.User_Choose[3] == 0){
            if(UserData.User_Choose[4] == 0){
                if(this.monolog.now_show == 3){
                    //播放声音
                    basic.SoundManager.instance.playEffect("sound_nyy_dj_mp3");
                }
            }
            else if(UserData.User_Choose[4] == 1){
                 if(this.monolog.now_show == 4){
                    //播放声音
                    basic.SoundManager.instance.playEffect("sound_nyy_dj_mp3");
                }
            }
            else if(UserData.User_Choose[4] == 2){
                 if(this.monolog.now_show == 4){
                    //播放声音
                    basic.SoundManager.instance.playEffect("sound_jc_dj_mp3");
                }
            }
        }
        else{
            if(UserData.User_Choose[4] == 0){
                if(this.monolog.now_show == 5){
                    //播放声音
                    basic.SoundManager.instance.playEffect("sound_xt_dj_mp3");
                }
            }
            else if(UserData.User_Choose[4] == 1){
                if(this.monolog.now_show == 4){
                    //播放声音
                    basic.SoundManager.instance.playEffect("sound_xt_dj_mp3");
                }
            }
            else if(UserData.User_Choose[4] == 2){
                if(this.monolog.now_show == 4){
                    //播放声音
                    basic.SoundManager.instance.playEffect("sound_jc_dj_mp3");
                }
            }
        }
        
        //开始独白
        this.monolog.startAction();
    }
}