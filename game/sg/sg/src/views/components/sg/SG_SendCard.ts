/**
 *
 * @发送牌
 *
 */
class SG_SendCard extends eui.Component {
    //数据变量
    private now_sendcard: number;
    private sendcard_num: number;
    private send_to_x: number[] = [];
    private send_to_y: number[] = [];
    private sendcard_speed: number = 150;

    //界面变量
    private _tween_x: egret.Tween = null;
    private _tween_y: egret.Tween = null;
    private img_sendcard: eui.Image = null;
    private _tween_card: egret.Tween = null;
    private _tween_zoomratex: egret.Tween = null;
    private _tween_zoomratey: egret.Tween = null;
    private timer_sendcard: basic.Timer = null;

    //初始化
    createChildren(): void {
        super.createChildren();
    }
    
    //初始化界面
    info(_to_x: any,_to_y: any): void {
        //数据赋值
        this.send_to_x = _to_x;
        this.send_to_y = _to_y;
    }

    //清除
    clean(): void {
        //停止发牌
        if(this.timer_sendcard) {
            this.timer_sendcard.stop();
            this.timer_sendcard.removeEventListener(basic.TimerEvent.TIMER,this.sendcard,this);
            this.timer_sendcard.removeEventListener(basic.TimerEvent.TIMER_COMPLETE,this.sendcardcomplete,this);
            this.timer_sendcard = null;
        }

        //判断移除
        if(this.img_sendcard) {
            //移除牌
            this.removeChild(this.img_sendcard);
            this.img_sendcard = null;
        }
    }

    //开始
    start(): void {
        //清楚界面
        this.clean();

        //定义第一张牌
        this.img_sendcard = this.assCardPicture();
        this.addChild(this.img_sendcard);

        //显示第一张牌
        this.img_sendcard.y = -50;
        this._tween_card = egret.Tween.get(this.img_sendcard).to({ y: 280 },200).call(() => {
            //定义变量
            this.now_sendcard = 0;
            this.sendcard_num = -2;
            
            //发牌
            this.timer_sendcard = new basic.Timer(this.sendcard_speed * 2,6);
            this.timer_sendcard.addEventListener(basic.TimerEvent.TIMER,this.sendcard,this);
            this.timer_sendcard.addEventListener(basic.TimerEvent.TIMER_COMPLETE,this.sendcardcomplete,this);
            this.timer_sendcard.start();
        });
    }

    //发牌
    private sendcard(e: basic.TimerEvent): void {
        //定义变量
        var num_to_x: number;
        var num_to_y: number;
        var num_zoomrate: number;

        //数据复制
        this.sendcard_num += 1;

        //判断赋值
        if(this.sendcard_num == -1) {
            num_zoomrate = 0.65;
            num_to_y = this.send_to_y[5];
            num_to_x = this.send_to_x[5] + 85 * this.now_sendcard;
            
            //发牌
            this.sendcardaction(num_to_x,num_to_y,num_zoomrate,this.now_sendcard,this.sendcard_num);
        }
        else if(this.sendcard_num < 5) {
            num_zoomrate = 0.65;
            num_to_y = this.send_to_y[this.sendcard_num];
            num_to_x = this.send_to_x[this.sendcard_num] + 85 * this.now_sendcard;
            
            //发牌
            this.sendcardaction(num_to_x,num_to_y,num_zoomrate,this.now_sendcard,this.sendcard_num);
        }
    }

    //发牌动画
    private sendcardaction(_x: number,_y: number,_zoomrate: number,_nowsendcard: number,_sendcard_num): void {
        //定义变量
        var img_card: eui.Image = this.assCardPicture();

        //显示牌
        img_card.alpha = 1;
        this.addChild(img_card);
        
        //播放声音
        basic.SoundManager.instance.playEffect("sound_g_cardsend_mp3");
        
        //显示动画
        this._tween_x = egret.Tween.get(img_card).to({ x: _x },this.sendcard_speed);
        this._tween_y = egret.Tween.get(img_card).to({ y: _y },this.sendcard_speed);
        this._tween_zoomratex = egret.Tween.get(img_card).to({ scaleX: _zoomrate },this.sendcard_speed);
        this._tween_zoomratey = egret.Tween.get(img_card).to({ scaleY: _zoomrate },this.sendcard_speed).call(() => {
            //移除界面
            this.removeChild(img_card);

            //显示牌
            if(_sendcard_num == -1) {
                basic.Dispatcher.dispatch(EventNames.SG_SHOW_CARD,{ "table": 5,"cardnum": _nowsendcard });
            }
            else {
                basic.Dispatcher.dispatch(EventNames.SG_SHOW_CARD,{ "table": _sendcard_num,"cardnum": _nowsendcard });
            }
        });
    }

    //发牌结束
    private sendcardcomplete(e: basic.TimerEvent): void {
        //发牌
        if(this.timer_sendcard) {
            this.timer_sendcard.stop();
            this.timer_sendcard.removeEventListener(basic.TimerEvent.TIMER,this.sendcard,this);
            this.timer_sendcard.removeEventListener(basic.TimerEvent.TIMER_COMPLETE,this.sendcardcomplete,this);
            this.timer_sendcard = null;
        }

        //数据赋值
        this.now_sendcard += 1;
        this.sendcard_num = -2;

        //判断显示
        if(this.now_sendcard < 3) {
            //定义变量
            var times_num: number = 6;
            
            //判断显示
            if(this.now_sendcard == 2) {
                times_num = 10;
            }
            
            //开始计时
            this.timer_sendcard = new basic.Timer(this.sendcard_speed * 2,times_num);
            this.timer_sendcard.addEventListener(basic.TimerEvent.TIMER,this.sendcard,this);
            this.timer_sendcard.addEventListener(basic.TimerEvent.TIMER_COMPLETE,this.sendcardcomplete,this);
            this.timer_sendcard.start();
        }
        else {
            //移除牌
            this._tween_card = egret.Tween.get(this.img_sendcard).to({ y: -50 },100).call(() => {
                //发送消息
                basic.Dispatcher.dispatch(EventNames.SG_SEND_CARDOVER);

                //移除界面
                this.clean();
            });
        }
    }

    //牌背面赋值
    private assCardPicture(): eui.Image {
        //定义变量
        var img: eui.Image = new eui.Image();

        //定义图片
        img.source = "back_g_beimian_png";

        //定义图片位置
        img.y = 280;
        img.scaleX = 0.3;
        img.scaleY = 0.3;
        img.x = (basic.StageProxy.width - 38) / 2;

        return img;
    }
}
