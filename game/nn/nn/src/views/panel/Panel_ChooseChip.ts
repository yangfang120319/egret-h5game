/**
 *
 * @选择筹码
 *
 */
class Panel_ChooseChip extends basic.PanelBase {
    //自定义界面
    private static _instance: Panel_ChooseChip;
    public static get instance(): Panel_ChooseChip {
        if(this._instance == undefined) {
            this._instance = new Panel_ChooseChip();
        }
        return this._instance;
    }
    
    //定义变量
    private btn_no: eui.Button;
    private btn_yes: eui.Button;
    private img_back: eui.Image;
    private g_detail: eui.Group;
    private txt_tips: eui.Label;
    private img_choose: eui.Image[] = [];
    private btn_choose: eui.Button[] = [];
    
    //数据赋值
    private now_choose_chip: number[] = [];
    
    //皮肤设置
    protected init(): void {
        this.skinName = Panel_ChooseChipSkin;
    }

    //定义界面
    constructor() {
        super(basic.dialogEffect.Scale,{
            withFade: true,
            ease: egret.Ease.backOut
        },basic.dialogEffect.Scale,{ withFade: true,ease: egret.Ease.backIn });
    }

    //初始化界面
    createChildren(): void {
        super.createChildren();
        
        //判断显示
        if(basic.StageProxy.width < 960) {
            //显示界面
            var ratezoom: number = 0.8 + 0.2 * (basic.StageProxy.width - 830) / 130;
            
            //显示界面
            this.width = 883 * ratezoom;
            this.height = 490 * ratezoom;
            this.g_detail.scaleX = ratezoom;
            this.g_detail.scaleY = ratezoom;
            this.g_detail.width = 883 * ratezoom;
            this.g_detail.height = 490 * ratezoom;
        }
        
        //注册按钮
        this.btn_no.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onNoBtn,this);
        this.btn_yes.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onYesBtn,this);
    }

    //显示界面
    show(_type: number,callback: Function = null): void {
        //数据赋值
        this._callback = callback;
        
        //数据赋值
        for(var i: number = 0;i < 8;i++) {
            //定义变量
            var now_img: eui.Image = this["img_choose" + i];

            //数据赋值
            this.img_choose[i] = now_img;
            this.img_choose[i].visible = false;
        }
        for(var j: number = 0;j < 9;j++) {
            //定义变量
            var now_btn: eui.Button = this["btn_choose" + j];

            //数据赋值
            this.btn_choose[j] = now_btn;

            //注册按钮
            this.btn_choose[j].addEventListener(egret.TouchEvent.TOUCH_TAP,this.onChooseBtn,this);
        }
        
        //显示界面
        this.startShowNowChip();
        
        //显示背景
        if(_type == 1) {
            this.img_back.source = "back_g_choosechip1_png";
        }
        else {
            this.img_back.source = "back_g_choosechip0_png";
        }
        
        //显示界面
        this.popup(this.funExit.bind(this));
    }
    
    //开始显示界面
    private startShowNowChip():void{
        //显示界面
        this.txt_tips.text = "";
        for(var i: number = 0;i < 4;i++) {
            for(var j: number = 0;j < 9;j++) {
                if(GameData.Game_Chip_Gold[i] == GameData.Game_Chip[j]) {
                    //显示
                    console.log(i);
                    this.img_choose[i].visible = true;
                    this.img_choose[i + 4].visible = true;
                    this.img_choose[i].x = this.btn_choose[j].x - 17;
                    this.img_choose[i].y = this.btn_choose[j].y - 18;
                    this.img_choose[i + 4].x = this.btn_choose[j].x - 17;
                    this.img_choose[i + 4].y = this.btn_choose[j].y - 18;
                    this.now_choose_chip[i] = GameData.Game_Chip_Gold[i];
                    break;
                }
            }
        }
    }
    
    //退出函数
    private funExit(): void {
        //注销
        for(var j: number = 0;j < 9;j++) {
            //注销按钮
            this.btn_choose[j].removeEventListener(egret.TouchEvent.TOUCH_TAP,this.onChooseBtn,this);
        }
        
        //退出事件
        this.dealAction();
    }
    
    //取消按钮
    private onNoBtn(e: egret.TouchEvent) {
        //播放声音
        basic.SoundManager.instance.playEffect("sound_btn_mp3");

        //退出设置
        this.funExit();
    }
    
    //确定按钮
    private onYesBtn(e:egret.TouchEvent):void{
        //播放声音
        basic.SoundManager.instance.playEffect("sound_btn_mp3");
        
        //定义变量
        var is_all_choose: Boolean = true;
        
        //判断显示
        for(var i: number = 0;i < 4;i++) {
            if(this.now_choose_chip[i] == 0) {
                is_all_choose = false;
                break;
            }
        }
        
        //判断显示
        if(is_all_choose == true) {
            //定义变量
            var now_choose_chip: number[] = [];
            
            //数据赋值
            for(var k: number = 0;k < 9;k++) {
                //定义变量
                var is_choose: Boolean = false;
                
                //数据赋值
                for(var p: number = 0;p < 4;p++) {
                    if(this.now_choose_chip[p] == GameData.Game_Chip[k]) {
                        is_choose = true;
                        break;
                    }
                }
                
                //判断赋值
                if(is_choose == true) {
                    //数据赋值
                    now_choose_chip[now_choose_chip.length] = GameData.Game_Chip[k];
                }
            }
            
            //数据赋值
            GameData.Game_Chip_Gold = now_choose_chip;
            
            //保存数据
            GameData.saveChooseChip();
            
            //退出界面
            this.funExit();
        }
        else{
            //显示提示
            this.txt_tips.text = "请选择4个筹码";
        }
    }
    
    //选择按钮
    private onChooseBtn(e: egret.TouchEvent): void {
        //定义变量
        var is_choose: Boolean = false;
        var btn_num:number=Number(e.target.name);
        
        //数据赋值
        for(var i: number = 0;i < 4;i++) {
            if(this.now_choose_chip[i] == GameData.Game_Chip[btn_num]) {
                //数据赋值
                is_choose = true;
                this.now_choose_chip[i] = 0;
                this.img_choose[i].visible = false;
                this.img_choose[i+4].visible = false;
                break;
            }
        }
        
        //判断显示
        if(is_choose==false){
            //数据赋值
            for(var j:number=0;j<4;j++){
                if(this.now_choose_chip[j] == 0) {
                    //数据赋值
                    this.img_choose[j].visible = true;
                    this.img_choose[j + 4].visible = true;
                    this.img_choose[j].x = this.btn_choose[btn_num].x - 17;
                    this.img_choose[j].y = this.btn_choose[btn_num].y - 18;
                    this.img_choose[j + 4].x = this.btn_choose[btn_num].x - 17;
                    this.img_choose[j + 4].y = this.btn_choose[btn_num].y - 18;
                    this.now_choose_chip[j] = GameData.Game_Chip[btn_num];
                    break;
                }
            }
        }
    }
    
}
