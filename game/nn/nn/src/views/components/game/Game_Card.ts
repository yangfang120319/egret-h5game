/**
 *
 * @author 
 *
 */
class Game_Card extends eui.Component {
    //定义变量
    public num_cardnum: number;
    public num_card_value: number;
    public num_card_huase: number;
    public boo_isShow: Boolean = false;
    private num_opencard_speed: number = 200;
    private _tween_card: egret.Tween;

    //界面变量
    private img_value: eui.Image;
    private img_huaseda: eui.Image;
    private img_huasexiao: eui.Image;
    private img_value_new: eui.Image;
    private rect_delete: eui.Rect;

    //初始化
    public constructor() {
        super();

        //定义皮肤
        this.skinName = Game_CardSkin;

        //显示界面
        this.showCardFace();
    }

    //显示牌
    public showCard(cardnum: number) {
        try {
            //隐藏界面
            this.rect_delete.visible = false;
            this.img_value_new.visible = false;
            this.img_huasexiao.visible = true;
            
            //数据赋值
            this.num_cardnum = cardnum;

            //显示界面
            if(this.num_cardnum < 62) {
                //数据赋值
                this.num_card_huase = 3 - Math.floor(this.num_cardnum / 16);
                this.num_card_value = Math.floor(this.num_cardnum % 16);

                //判断显示
                if(this.num_card_huase % 2 == 0) {
                    this.img_value.source = "num_g_b_" + this.num_card_value + "_png";
                }
                else {
                    this.img_value.source = "num_g_r_" + this.num_card_value + "_png";
                }
                this.img_huaseda.source = "icon_g_da_pai" + this.num_card_huase + "_png";
                this.img_huasexiao.source = "icon_g_xiao_pai" + this.num_card_huase + "_png";

                //定义位置
                this.img_value.x = 6;
                this.img_huaseda.y = 65;
            }
            else if(this.num_cardnum == 62) {
                //数据复制
                this.num_card_huase = 4;
                this.num_card_value = 14;

                //显示图片
                this.img_huasexiao.source = "";
                this.img_value.source = "num_g_b_14_png";
                this.img_huaseda.source = "icon_g_da_pai4_png";

                //定义位置
                this.img_value.x = 10;
                this.img_huaseda.y = 20;
            }
            else if(this.num_cardnum == 63) {
                //数据赋值
                this.num_card_huase = 5;
                this.num_card_value = 14;

                //显示图片
                this.img_huasexiao.source = "";
                this.img_value.source = "num_g_r_14_png";
                this.img_huaseda.source = "icon_g_da_pai5_png";

                //定义位置
                this.img_value.x = 10;
                this.img_huaseda.y = 20;
            }
        }
        catch(error) {

        }
    }
    
    //显示新牌
    showNewCard(cardnum: number):void{
        try {
            //隐藏界面
            this.rect_delete.visible = true;
            this.img_value_new.visible = true;
            this.img_huasexiao.visible = false;
            
            //数据赋值
            this.num_cardnum = cardnum;
            
            //显示界面
            if(this.num_cardnum < 62) {
                //数据赋值
                this.num_card_value = Math.floor(this.num_cardnum % 16);

                //判断显示
                if(this.num_card_huase % 2 == 0) {
                    this.img_value_new.source = "num_g_b_" + this.num_card_value + "_png";
                }
                else {
                    this.img_value_new.source = "num_g_r_" + this.num_card_value + "_png";
                }
                
                //定义位置
                this.img_value.x = 6;
                this.img_huaseda.y = 65;
            }
        }
        catch(error) {

        }
    }
    
    //打开牌
    public openCard() {
        //数据赋值
        this.boo_isShow = true;

        //显示界面
        this.showCardFace();
    }

    //开牌动画
    public openCardAction(_zoomrate: number,_callback: Function = null): void {
        //显示动作
        this._tween_card = egret.Tween.get(this).to({ scaleX: 0 },this.num_opencard_speed).call(() => {
            this.openCard();
            this._tween_card = egret.Tween.get(this).to({ scaleX: _zoomrate },this.num_opencard_speed).call(() => {
                if(_callback) {
                    _callback();
                }
            });
        });
    }

    //停止动画
    public stopAction(): void {
        //停止缓动
        if(this._tween_card) {
            this._tween_card.setPaused(true);
            this._tween_card = null;
        }
    }

    //关闭牌
    public closeCard() {
        //数据赋值
        this.boo_isShow = false;

        //显示界面
        this.showCardFace();
    }

    //显示牌状态
    private showCardFace() {
        //判断显示界面
        if(this.boo_isShow == true) {
            this.currentState = "open";
        }
        else if(this.boo_isShow == false) {
            this.currentState = "close";
        }
    }
}
