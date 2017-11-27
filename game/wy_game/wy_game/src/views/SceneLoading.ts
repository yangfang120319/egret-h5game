/**
 *
 * @加载界面
 *
 */
class SceneLoading extends basic.SceneBase {
    //定义变量
    private g_tips: eui.Group;
    private img_mask: eui.Image;
    private img_logo: eui.Image;
    private btn_next: eui.Button;
    private txt_tips_title: eui.Label;
    private btn_start: eui.Button;
    private mask_action: Action_Mask;
    private txt_tips: eui.Label[] = [];
    private now_text: number = 0;
    
    //定义界面
    public constructor() {
        super();

        //定义界面
        this.skinName = SceneLoadingSkin;

        //数据复制
        this.img_logo.alpha = 0;
        this.btn_start.alpha = 0;
        this.g_tips.visible = false;
        this.btn_next.visible = false;
        this.txt_tips_title.alpha = 0;
        for(var i: number = 0;i < 3;i++) {
            //定义变量
            var now_txt: eui.Label = this["txt_tips" + i];

            //数据赋值
            this.txt_tips[i] = now_txt;
            this.txt_tips[i].alpha = 0;
        }
        
        //注册按钮
        this.btn_next.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onNextBtn,this);
        this.btn_start.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onStartBtn,this);
    }

    //注册侦听
    beforeShow(params: any): void {
        //初始化遮罩 
        this.mask_action = new Action_Mask(this.img_mask);

        //隐藏遮罩
        this.mask_action.hide(()=>{
            //显示logo
            Action_Other.changeAlpha(0,1,1500,this.img_logo,200,()=>{
                 Action_Other.changeAlpha(0,1,1500,this.txt_tips_title,200,()=>{
                    //显示开始按钮
                    Action_Other.changeAlpha(0,1,1000,this.btn_start,200);
                 });
            });
        })

        //发送消息
        if(LoaderData.is_part_LoadEnd[1] == false) {
            basic.Dispatcher.dispatch(EventNames.LOAD_PART,{ "part_num": 1 });
        }
    }
    
    //显示提示文本
    private showText(): void {
        //显示动画
        if(this.now_text < 3) {
            var _tween_txt_alpha:egret.Tween = egret.Tween.get(this.txt_tips[this.now_text])
                .to({ alpha: 1 },600)
                .wait(200).call(() => {
                    //数据赋值
                    this.now_text += 1;

                    //显示文本
                    this.showText();
                });
        }
        else {
            //显示下一页按钮
            Action_Other.changeAlpha(0,1,500,this.btn_next);
        }
    }
    
    //开始按钮
    private onStartBtn(e:egret.TouchEvent):void{
        //隐藏按钮
        this.btn_start.visible = false;

        //播放声音
        basic.SoundManager.instance.playEffect("sound_btn_mp3");

        //显示遮罩
        this.mask_action.show(()=>{
            //显示界面
            this.g_tips.visible = true;

            //显示提示文本
            this.showText();
        });
    }

    //下一步按钮
    private onNextBtn(e: egret.TouchEvent): void {
        //隐藏按钮
        this.btn_next.visible = false;

        //播放声音
        basic.SoundManager.instance.playEffect("sound_btn_mp3");
        
        //判断显示
        if(LoaderData.is_part_LoadEnd[1] == true) {
            //隐藏提示
            Action_Other.changeAlpha(1,0,500,this.g_tips,0,()=>{
                //移出动画
                basic.SceneManager.show(SceneNames.STEP1);
            });
        }
        else{
            //显示等待界面
            basic.SceneManager.addTopScene(SceneNames.WAITING);
            
            //注册事件
            this.addEventListener(egret.Event.ENTER_FRAME,this.onCheckShow,this);
        }
    }
    
    //检查是否可以显示
    private onCheckShow(e: egret.Event): void {
        //判断显示
        if(LoaderData.is_part_LoadEnd[1] == true) {
            //注销事件
            this.removeEventListener(egret.Event.ENTER_FRAME,this.onCheckShow,this);
            
            //移出等待界面
            basic.SceneManager.removeTopScene(SceneNames.WAITING);
            
            //隐藏提示
            Action_Other.changeAlpha(1,0,500,this.g_tips,0,()=>{
                //移出动画
                basic.SceneManager.show(SceneNames.STEP1);
            });
        }
    }
}
