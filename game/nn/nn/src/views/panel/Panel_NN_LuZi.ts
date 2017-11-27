/**
 *
 * @author 
 *
 */
class Panel_NN_LuZi extends basic.PanelBase {
    //自定义界面
    private static _instance: Panel_NN_LuZi;
    public static get instance(): Panel_NN_LuZi {
        if(this._instance == undefined) {
            this._instance = new Panel_NN_LuZi();
        }
        return this._instance;
    }

    //定义变量
    private btn_close: eui.Button;
    private arr_table0: eui.Component[] = [];
    private arr_table1: eui.Component[] = [];
    private arr_table2: eui.Component[] = [];
    private arr_table3: eui.Component[] = [];
    private arr_table4: eui.Component[] = [];
    private arr_zhuang: eui.Component[] = [];

    //皮肤设置
    protected init(): void {
        this.skinName = Panel_NN_LuZiSkin;
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

        //数据赋值
        for(var i: number = 0;i < 8;i++) {
            //定义变量
            var com_table0: eui.Component = this["com_table0_" + i];
            var com_table1: eui.Component = this["com_table1_" + i];
            var com_table2: eui.Component = this["com_table2_" + i];
            var com_table3: eui.Component = this["com_table3_" + i];
            var com_table4: eui.Component = this["com_table4_" + i];
            var com_zhuang: eui.Component = this["com_zhuang_" + i];

            //数据赋值
            this.arr_table0[i] = com_table0;
            this.arr_table1[i] = com_table1;
            this.arr_table2[i] = com_table2;
            this.arr_table3[i] = com_table3;
            this.arr_table4[i] = com_table4;
            this.arr_zhuang[i] = com_zhuang;
            this.arr_table0[i].visible = false;
            this.arr_table1[i].visible = false;
            this.arr_table2[i].visible = false;
            this.arr_table3[i].visible = false;
            this.arr_table4[i].visible = false;
            this.arr_zhuang[i].visible = false;
        }

        //注册按钮
        basic.Dispatcher.addListener(EventNames.NN_HISTORY,this.onShowDetail,this);
        this.btn_close.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onCloseBtn,this);
    }

    //显示界面
    show(callback: Function = null): void {
        //数据赋值
        this._callback = callback;

        //显示界面
        this.popup(this.funExit.bind(this));
        
        //发送消息
        //Comm_nn.instance.sendSocket({ "type": "history" });
    }

    //退出函数
    private funExit(): void {
        //退出事件
        this.dealAction();
    }
    
    //显示内容界面
    private onShowDetail(e: egret.Event): void {
        //隐藏界面
        for(var i: number = 0;i < 8;i++) {
            if(i < e.data.historys.length) {
                this.arr_table0[i].visible = true;
                this.arr_table1[i].visible = true;
                this.arr_table2[i].visible = true;
                this.arr_table3[i].visible = true;
                this.arr_table4[i].visible = true;
                this.arr_zhuang[i].visible = true;
                if(e.data.historys[i][0] == true) {
                    this.arr_table0[i].currentState = "1";
                }
                else {
                    this.arr_table0[i].currentState = "0";
                }
                if(e.data.historys[i][1] == true) {
                    this.arr_table1[i].currentState = "1";
                }
                else {
                    this.arr_table1[i].currentState = "0";
                }
                if(e.data.historys[i][2] == true) {
                    this.arr_table2[i].currentState = "1";
                }
                else {
                    this.arr_table2[i].currentState = "0";
                }
                if(e.data.historys[i][3] == true) {
                    this.arr_table3[i].currentState = "1";
                }
                else {
                    this.arr_table3[i].currentState = "0";
                }
                if(e.data.historys[i][4] == true) {
                    this.arr_table4[i].currentState = "1";
                }
                else {
                    this.arr_table4[i].currentState = "0";
                }
                if(e.data.historys[i][5] == true) {
                    this.arr_zhuang[i].currentState = "1";
                }
                else {
                    this.arr_zhuang[i].currentState = "0";
                }
            }
            else {
                this.arr_table0[i].visible = false;
                this.arr_table1[i].visible = false;
                this.arr_table2[i].visible = false;
                this.arr_table3[i].visible = false;
                this.arr_table4[i].visible = false;
                this.arr_zhuang[i].visible = false;
            }
        }
    }
    
    //退出按钮
    private onCloseBtn(e: egret.TouchEvent) {
        //播放声音
        basic.SoundManager.instance.playEffect("sound_btn_mp3");

        //退出设置
        this.funExit();
    }
}