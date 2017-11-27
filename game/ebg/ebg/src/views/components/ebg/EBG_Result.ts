/**
 *
 * @二八杠-结束
 *
 */
class EBG_Result extends eui.Component {
    //定义变量
    private img_back: eui.Image;
    private img_mask: eui.Image
    private img_dian: eui.Image;
    private img_num1: eui.Image;
    private img_num2: eui.Image;
    private img_num3: eui.Image;

    //数据变量
    private table_num: number;//桌子号
    private result_type: number;//结果类型
    private result_diannum: number;//结果点数

    //状态控制变量
    private _tween_width: egret.Tween = null;
    private _tween_alpha: egret.Tween = null;
    private fun_callback: Function;

    //初始化
    createChildren(): void {
        super.createChildren();

        //定义遮罩
        this.img_mask.visible = true;
        this.img_back.mask = this.img_mask;
    }

    //显示结果
    public show(_table_num: number,_callback: Function = null): void {
        //数据赋值
        this.table_num = _table_num;
        this.fun_callback = _callback;

        //数据赋值
        this.assData();

        //显示类型
        this.currentState = "type" + this.result_type.toString();

        //判断显示
        if(this.result_type == 1) {
            this.img_num1.source = "txt_ebg_" + this.result_diannum.toString() + "_png";
        }

        //隐藏界面
        this.img_dian.visible = false;
        this.img_num1.visible = false;
        this.img_num2.visible = false;
        this.img_num3.visible = false;

        //开始动画
        this.startBackAction(() => {
            //判断显示动画
            if(this.result_type == 1) {
                this.startAction1();
            }
            else if(this.result_type == 2) {
                this.startAction2();
            }
            else if(this.result_type == 3) {
                this.startAction3();
            }
        });
    }

    //直接显示结果
    public showResult(_table_num: number): void {
        //数据赋值
        this.table_num = _table_num;

        //数据赋值
        this.assData();

        //显示底
        this.img_mask.width = 200;

        //显示类型
        this.currentState = "type" + this.result_type.toString();

        //判断显示
        if(this.result_type == 1) {
            this.img_num1.source = "txt_ebg_" + this.result_diannum.toString() + "_png";
        }
    }

    //数据赋值
    private assData(): void {
        //数据赋值
        this.result_type = GameData.EBG_Poker_Table_Type[this.table_num];

        //判断赋值
        if(this.result_type == 1) {
            this.result_diannum = this.assDianNum();
        }
    }

    //点数赋值
    private assDianNum(): number {
        //定义变量
        var dian_num: number;
        var mohjong_detail: any;

        //判断赋值
        mohjong_detail = GameData.EBG_Poker_Table_Card[this.table_num];

        //数据赋值
        dian_num = Number(mohjong_detail[0]) % 16 + Number(mohjong_detail[1]) % 16;
        dian_num = dian_num % 10;

        return dian_num;
    }

    //底效果
    private startBackAction(_callback: Function = null): void {
        //显示底动画
        this.img_back.alpha = 0;
        this.img_mask.width = 20;
        this._tween_alpha = egret.Tween.get(this.img_back).to({ alpha: 1 },50);
        this._tween_width = egret.Tween.get(this.img_mask).to({ width: 200 },200).call(() => {
            //显示底
            this.img_mask.width = 200;
            
            //判断回调函数
            if(_callback) {
                _callback();
            }
        });
    }

    //显示动画1
    private startAction1(): void {
        //显示点数
        this.img_num1.alpha = 0;
        this.img_dian.alpha = 0;
        this.img_num1.visible = true;
        this.img_dian.visible = true;
        this._tween_alpha = egret.Tween.get(this.img_num1).to({ alpha: 1 },100).call(() => {
            this._tween_alpha = egret.Tween.get(this.img_dian).to({ alpha: 1 },100).call(()=>{
                if(this.fun_callback) {
                    this.fun_callback();
                }
            });
            
            //播放声音
            basic.SoundManager.instance.playEffect("sound_ebg_dian" + this.result_diannum.toString() + "_mp3");
        });
    }

    //显示动画2
    private startAction2(): void {
        //显示点数
        this.img_num2.alpha = 0;
        this.img_num2.visible = true;
        this._tween_alpha = egret.Tween.get(this.img_num2).to({ alpha: 1 },100).call(() => {
            if(this.fun_callback) {
                this.fun_callback();
            }
        });

        //播放声音
        basic.SoundManager.instance.playEffect("sound_ebg_erbagang_mp3");
    }

    //显示动画3
    private startAction3(): void {
        //显示点数
        this.img_num3.alpha = 0;
        this.img_num3.visible = true;
        this._tween_alpha = egret.Tween.get(this.img_num3).to({ alpha: 1 },100).call(() => {
            if(this.fun_callback) {
                this.fun_callback();
            }
        });

        //播放声音
        basic.SoundManager.instance.playEffect("sound_ebg_baozi_mp3");
    }
}