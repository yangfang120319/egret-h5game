var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
/**
 *
 * @author
 *
 */
var NN_SendCard = (function (_super) {
    __extends(NN_SendCard, _super);
    function NN_SendCard() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.send_to_x = [];
        _this.send_to_y = [];
        _this.sendcard_speed = 150;
        //界面变量
        _this._tween_x = null;
        _this._tween_y = null;
        _this.img_sendcard = null;
        _this._tween_card = null;
        _this._tween_zoomratex = null;
        _this._tween_zoomratey = null;
        _this.timer_sendcard = null;
        return _this;
    }
    //初始化
    NN_SendCard.prototype.createChildren = function () {
        _super.prototype.createChildren.call(this);
    };
    //初始化界面
    NN_SendCard.prototype.info = function (_to_x, _to_y) {
        //数据赋值
        this.send_to_x = _to_x;
        this.send_to_y = _to_y;
    };
    //清除
    NN_SendCard.prototype.clean = function () {
        //停止发牌
        if (this.timer_sendcard) {
            this.timer_sendcard.stop();
            this.timer_sendcard.removeEventListener(basic.TimerEvent.TIMER, this.sendcard, this);
            this.timer_sendcard.removeEventListener(basic.TimerEvent.TIMER_COMPLETE, this.sendcardcomplete, this);
            this.timer_sendcard = null;
        }
        //判断移除
        if (this.img_sendcard) {
            //移除牌
            this.removeChild(this.img_sendcard);
            this.img_sendcard = null;
        }
    };
    //开始
    NN_SendCard.prototype.start = function () {
        var _this = this;
        //清楚界面
        this.clean();
        //定义第一张牌
        this.img_sendcard = this.assCardPicture();
        this.addChild(this.img_sendcard);
        //console.info(6666);
        //显示第一张牌
        this.img_sendcard.y = -50;
        this._tween_card = egret.Tween.get(this.img_sendcard).to({ y: 280 }, 200).call(function () {
            //定义变量
            _this.now_sendcard = 0;
            _this.sendcard_num = -2;
            //播放声音
            basic.SoundManager.instance.playEffect("sound_g_cardsend_mp3");
            //发牌
            _this.timer_sendcard = new basic.Timer(_this.sendcard_speed * 2, 7);
            _this.timer_sendcard.addEventListener(basic.TimerEvent.TIMER, _this.sendcard, _this);
            _this.timer_sendcard.addEventListener(basic.TimerEvent.TIMER_COMPLETE, _this.sendcardcomplete, _this);
            //console.info(4441);
            _this.timer_sendcard.start();
        });
    };
    //发牌
    NN_SendCard.prototype.sendcard = function (e) {
        console.info(this.sendcard_num);
        //定义变量
        var num_to_x;
        var num_to_y;
        var num_zoomrate;
        //数据复制
        this.sendcard_num += 1;
        //判断赋值
        if (this.sendcard_num == -1) {
            num_zoomrate = 0.65;
            num_to_y = this.send_to_y[5];
            num_to_x = this.send_to_x[5] + 32 * this.now_sendcard;
            //发牌
            this.sendcardaction(num_to_x, num_to_y, num_zoomrate, this.now_sendcard, this.sendcard_num);
        }
        else if (this.sendcard_num < 5) {
            num_zoomrate = 0.65;
            num_to_y = this.send_to_y[this.sendcard_num];
            num_to_x = this.send_to_x[this.sendcard_num] + 32 * this.now_sendcard;
            //发牌
            this.sendcardaction(num_to_x, num_to_y, num_zoomrate, this.now_sendcard, this.sendcard_num);
        }
    };
    //发牌动画
    NN_SendCard.prototype.sendcardaction = function (_x, _y, _zoomrate, _nowsendcard, _sendcard_num) {
        var _this = this;
        //定义变量
        var img_card = this.assCardPicture();
        //显示牌
        img_card.alpha = 1;
        this.addChild(img_card);
        //播放声音
        basic.SoundManager.instance.playEffect("sound_g_cardsend_mp3");
        //显示动画
        this._tween_x = egret.Tween.get(img_card).to({ x: _x }, this.sendcard_speed);
        this._tween_y = egret.Tween.get(img_card).to({ y: _y }, this.sendcard_speed);
        this._tween_zoomratex = egret.Tween.get(img_card).to({ scaleX: _zoomrate }, this.sendcard_speed);
        this._tween_zoomratey = egret.Tween.get(img_card).to({ scaleY: _zoomrate }, this.sendcard_speed).call(function () {
            //移除界面
            _this.removeChild(img_card);
            //显示牌
            if (_sendcard_num == -1) {
                basic.Dispatcher.dispatch(EventNames.NN_SHOW_CARD, { "table": 5, "cardnum": _nowsendcard });
            }
            else {
                basic.Dispatcher.dispatch(EventNames.NN_SHOW_CARD, { "table": _sendcard_num, "cardnum": _nowsendcard });
            }
        });
    };
    //发牌结束
    NN_SendCard.prototype.sendcardcomplete = function (e) {
        var _this = this;
        //发牌
        if (this.timer_sendcard) {
            this.timer_sendcard.stop();
            this.timer_sendcard.removeEventListener(basic.TimerEvent.TIMER, this.sendcard, this);
            this.timer_sendcard.removeEventListener(basic.TimerEvent.TIMER_COMPLETE, this.sendcardcomplete, this);
            this.timer_sendcard = null;
        }
        //数据赋值
        this.now_sendcard += 1;
        this.sendcard_num = -2;
        //判断显示
        if (this.now_sendcard < 5) {
            //定义变量
            var times_num = 6;
            //判断显示
            if (this.now_sendcard == 4) {
                times_num = 10;
            }
            //开始计时
            this.timer_sendcard = new basic.Timer(this.sendcard_speed * 2, times_num);
            this.timer_sendcard.addEventListener(basic.TimerEvent.TIMER, this.sendcard, this);
            this.timer_sendcard.addEventListener(basic.TimerEvent.TIMER_COMPLETE, this.sendcardcomplete, this);
            this.timer_sendcard.start();
        }
        else {
            //移除牌
            this._tween_card = egret.Tween.get(this.img_sendcard).to({ y: -50 }, 100).call(function () {
                //发送消息
                basic.Dispatcher.dispatch(EventNames.NN_SEND_CARDOVER);
                //移除界面
                _this.clean();
            });
        }
    };
    //牌背面赋值
    NN_SendCard.prototype.assCardPicture = function () {
        //定义变量
        var img = new eui.Image();
        //定义图片
        img.source = "back_g_beimian_png";
        //定义图片位置
        img.y = 280;
        img.scaleX = 0.3;
        img.scaleY = 0.3;
        img.x = (basic.StageProxy.width - 38) / 2;
        return img;
    };
    return NN_SendCard;
}(eui.Component));
__reflect(NN_SendCard.prototype, "NN_SendCard");
//# sourceMappingURL=NN_SendCard.js.map