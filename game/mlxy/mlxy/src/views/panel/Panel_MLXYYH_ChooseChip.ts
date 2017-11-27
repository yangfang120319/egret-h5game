/**
 *
 * @选择筹码
 *
 */
class Panel_MLXYYH_ChooseChip extends basic.PanelBase {
    //自定义界面
    private static _instance: Panel_MLXYYH_ChooseChip;
    public static get instance(): Panel_MLXYYH_ChooseChip {
        if(this._instance == undefined) {
            this._instance = new Panel_MLXYYH_ChooseChip();
        }
        return this._instance;
    }

    //定义变量
    private img_back: eui.Image;
    private g_detail: eui.Group;
    private img_choose: eui.Image;
    private btn_choose: eui.Button[] = [];

    //数据赋值
    private now_choose_chip: number[] = [];

    //皮肤设置
    protected init(): void {
        this.skinName = Panel_MLXYYH_ChooseChipSkin;
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
    }

    //显示界面
    show(callback: Function = null): void {
        //数据赋值
        this._callback = callback;

        //数据赋值
        for(var j: number = 0;j < 9;j++) {
            //定义变量
            var now_btn: eui.Button = this["btn_choose" + j];

            //数据赋值
            this.btn_choose[j] = now_btn;

            //注册按钮
            this.btn_choose[j].addEventListener(egret.TouchEvent.TOUCH_TAP,this.onChooseBtn,this);
        }

        //显示界面
        for(var i: number = 0;i < 9;i++) {
            if(GameData.MLXYYH_BeiLv == GameData.Game_Chip[i]) {
                this.img_choose.visible = true;
                this.img_choose.x = this.btn_choose[i].x - 17;
                this.img_choose.y = this.btn_choose[i].y - 18;
                break;
            }
        }
        
        
        //显示界面
        this.popup(this.funExit.bind(this));
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
    
    //选择按钮
    private onChooseBtn(e: egret.TouchEvent): void {
        //定义变量
        var btn_num: number = Number(e.target.name);
        
        //播放声音
        basic.SoundManager.instance.playEffect("sound_btn_mp3");
        
        //数据赋值
        GameData.MLXYYH_BeiLv =GameData.Game_Chip[btn_num];
        
        //退出界面
        this.funExit();
    }
}
