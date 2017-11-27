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
 * @游戏卡牌总
 *
 */
var Start_Cards = (function (_super) {
    __extends(Start_Cards, _super);
    function Start_Cards() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.arr_card = [];
        _this.num_max_alpha = 0.8;
        _this.num_min_scale = 0.8;
        _this._tween_x = null;
        _this.card_txt = ["txt_s_box0_png", "", "txt_s_box2_png", "", "", ""];
        _this.card_icon = ["icon_s_box0_png", "", "", "", "", ""];
        return _this;
    }
    //初始化
    Start_Cards.prototype.createChildren = function () {
        _super.prototype.createChildren.call(this);
        //定义组宽度
        this.g_card.width = 390 * (GameData.Game_Num - 1) + 444 + 196;
        for (var i = 0; i < GameData.Game_Num; i++) {
            //定义卡片
            var card = new Start_Card();
            //定义卡片位置
            card.verticalCenter = 0;
            card.horizontalCenter = 390 * ((1 - GameData.Game_Num) / 2 + i);
            //显示图片
            card.show("back_s_box" + i + "_png", this.card_txt[i], this.card_icon[i], i);
            //数据赋值
            this.arr_card[i] = card;
            //显示卡片
            this.g_card.addChild(this.arr_card[i]);
        }
        //显示当前牌
        this.showNowCard();
        //注册事件
        basic.Dispatcher.addListener(EventNames.SHOW_NOWCARD, this.onShowNowCard, this);
        this.g_card.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.startMove, this);
    };
    //进入房间
    Start_Cards.prototype.enterGame = function (_card_num) {
        //进入房间
        this.arr_card[_card_num].enterGame();
    };
    //显示当前牌
    Start_Cards.prototype.showNowCard = function () {
        //定义位置
        this.g_card.x = -390 * GameData.GameCard_NowShow;
        //显示当前卡片
        for (var i = 0; i < GameData.Game_Num; i++) {
            //判断显示界面
            if (i == GameData.GameCard_NowShow) {
                //显示状态
                this.arr_card[i].showState("show");
                //定义大小
                this.arr_card[i].scaleX = 1;
                this.arr_card[i].scaleY = 1;
                //显示最底层
                this.g_card.setChildIndex(this.arr_card[i], 0);
            }
            else {
                //显示状态
                this.arr_card[i].showState("hide");
                //定义大小
                this.arr_card[i].scaleX = this.num_min_scale;
                this.arr_card[i].scaleY = this.num_min_scale;
                this.arr_card[i].showMaskAlpha(this.num_max_alpha);
            }
        }
    };
    //定义移动中牌显示
    Start_Cards.prototype.showActionCard = function () {
        //显示卡片
        for (var i = 0; i < GameData.Game_Num; i++) {
            //判断显示
            if (this.g_card.x == -i * 390) {
                //显示状态
                this.arr_card[i].showState("show");
                //定义大小
                this.arr_card[i].scaleX = 1;
                this.arr_card[i].scaleY = 1;
            }
            else {
                //定义变量
                var num_ratezoom;
                var num_Move_Deviation;
                //显示状态
                this.arr_card[i].showState("hide");
                //数据赋值
                num_Move_Deviation = Math.abs(i * 390 + this.g_card.x);
                num_ratezoom = Math.min(1, num_Move_Deviation / 390);
                //定义大小
                this.arr_card[i].showMaskAlpha(this.num_max_alpha * num_ratezoom);
                this.arr_card[i].scaleX = 1 - (1 - this.num_min_scale) * num_ratezoom;
                this.arr_card[i].scaleY = 1 - (1 - this.num_min_scale) * num_ratezoom;
            }
        }
    };
    //开始缓动动画
    Start_Cards.prototype.showMoveAction = function (_nowShow) {
        var _this = this;
        if (_nowShow === void 0) { _nowShow = null; }
        //定义变量
        var num_move_time;
        var num_NowNeedShow;
        //数据赋值
        if (_nowShow == null) {
            num_NowNeedShow = Math.floor((0 - this.g_card.x + 195) / 390);
        }
        else {
            num_NowNeedShow = _nowShow;
        }
        if (num_NowNeedShow < 0) {
            num_NowNeedShow = 0;
        }
        if (num_NowNeedShow >= GameData.Game_Num) {
            num_NowNeedShow = GameData.Game_Num - 1;
        }
        num_move_time = Math.abs(this.g_card.x + num_NowNeedShow * 390) * 1.3;
        //注册事件
        this.addEventListener(egret.Event.ENTER_FRAME, this.onFrameShowCard, this);
        //注销按钮
        this.g_card.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this.startMove, this);
        //开始缓动
        this._tween_x = egret.Tween.get(this.g_card).to({ x: -num_NowNeedShow * 390 }, num_move_time).call(function () {
            //注销事件
            _this.removeEventListener(egret.Event.ENTER_FRAME, _this.onFrameShowCard, _this);
            //注册按钮
            _this.g_card.addEventListener(egret.TouchEvent.TOUCH_BEGIN, _this.startMove, _this);
            //数据赋值
            GameData.GameCard_NowShow = num_NowNeedShow;
            //显示当前牌
            _this.showNowCard();
        });
    };
    //显示当前状态
    Start_Cards.prototype.onFrameShowCard = function (e) {
        //显示牌
        this.showActionCard();
    };
    //显示当前卡片
    Start_Cards.prototype.onShowNowCard = function (e) {
        //显示当前卡牌
        this.showMoveAction(e.data.nowcardnum);
    };
    //开始移动
    Start_Cards.prototype.startMove = function (e) {
        //计算距离
        this.num_offsetX = e.stageX - this.g_card.x;
        this.num_Start_MoveX = this.g_card.x;
        this.num_MoveMax_X = 0;
        //移动数据赋值
        this.int_Time1 = this.int_Time2 = egret.getTimer();
        this.num_X1 = this.num_X2 = this.g_card.x;
        this.num_X_Off_Set = e.stageX - this.g_card.x;
        //卡片数据赋值
        for (var i = 0; i < GameData.Game_Num; i++) {
            this.arr_card[i].is_canClick = false;
        }
        //注册事件
        this.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.onMove, this);
        this.addEventListener(egret.TouchEvent.TOUCH_END, this.stopMove, this);
    };
    //移动事件
    Start_Cards.prototype.onMove = function (e) {
        //定义变量
        var int_Now_Time; //当前时间
        var num_Now_X; //当前X坐标
        //定义位置
        this.g_card.x = e.stageX - this.num_offsetX;
        this.num_MoveMax_X = Math.abs(this.g_card.x - this.num_Start_MoveX);
        //显示卡片
        this.showActionCard();
        //判断停止
        if (this.g_card.x > 200 || this.g_card.x < 640 - this.g_card.width - 200) {
            //注销事件
            this.removeEventListener(egret.TouchEvent.TOUCH_MOVE, this.onMove, this);
            this.removeEventListener(egret.TouchEvent.TOUCH_END, this.stopMove, this);
            //开始缓动动画
            this.showMoveAction();
        }
        if (e.stageX < 10 || e.stageX > 630) {
            //注销事件
            this.removeEventListener(egret.TouchEvent.TOUCH_MOVE, this.onMove, this);
            this.removeEventListener(egret.TouchEvent.TOUCH_END, this.stopMove, this);
            //开始缓动动画
            this.showMoveAction();
        }
        //时间赋值
        int_Now_Time = egret.getTimer();
        if (int_Now_Time - this.int_Time1 > 50) {
            this.num_X2 = this.num_X1;
            this.int_Time2 = this.int_Time1;
            this.num_X1 = this.g_card.x;
            this.int_Time1 = int_Now_Time;
        }
    };
    //停止移动
    Start_Cards.prototype.stopMove = function (e) {
        //定义变量
        var num_Speed;
        var num_Use_Time; //用时
        //注销事件
        this.removeEventListener(egret.TouchEvent.TOUCH_MOVE, this.onMove, this);
        this.removeEventListener(egret.TouchEvent.TOUCH_END, this.stopMove, this);
        //判断显示
        if (this.num_MoveMax_X > 5) {
            //判断加速度
            num_Use_Time = (egret.getTimer() - this.int_Time2) / 1000;
            num_Speed = (this.g_card.x - this.num_X2) / num_Use_Time;
            //判断显示
            if (Math.abs(num_Speed) > 150) {
                if (num_Speed < 0) {
                    //开始缓动动画
                    this.showMoveAction(GameData.GameCard_NowShow + 1);
                }
                else {
                    //开始缓动动画
                    this.showMoveAction(GameData.GameCard_NowShow - 1);
                }
            }
            else {
                //开始缓动动画
                this.showMoveAction();
            }
        }
        else {
            //显示当前牌
            this.showNowCard();
            //卡片数据赋值
            for (var i = 0; i < GameData.Game_Num; i++) {
                this.arr_card[i].is_canClick = true;
            }
        }
    };
    return Start_Cards;
}(eui.Component));
__reflect(Start_Cards.prototype, "Start_Cards");
