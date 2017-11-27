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
 * @遥控骰子
 *
 */
var PanelChooseDice = (function (_super) {
    __extends(PanelChooseDice, _super);
    //定义界面
    function PanelChooseDice() {
        var _this = _super.call(this, basic.dialogEffect.Scale, {
            withFade: true,
            ease: egret.Ease.backOut
        }, basic.dialogEffect.Scale, { withFade: true, ease: egret.Ease.backIn }) || this;
        _this.btn_dice = [];
        return _this;
    }
    Object.defineProperty(PanelChooseDice, "instance", {
        get: function () {
            if (this._instance == undefined) {
                this._instance = new PanelChooseDice();
            }
            return this._instance;
        },
        enumerable: true,
        configurable: true
    });
    //皮肤设置
    PanelChooseDice.prototype.init = function () {
        this.skinName = PanelChooseDiceSkin;
    };
    //初始化界面
    PanelChooseDice.prototype.createChildren = function () {
        _super.prototype.createChildren.call(this);
        //数据赋值
        for (var i = 1; i < 7; i++) {
            //定义变量
            var now_btn = this["btn_dice" + i];
            //数据赋值
            this.btn_dice[i] = now_btn;
            this.btn_dice[i].currentState = "up";
            //注册按钮
            this.btn_dice[i].addEventListener(egret.TouchEvent.TOUCH_TAP, this.onDiceBtn, this);
        }
        //注册按钮
        this.btn_yes.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onYesBtn, this);
    };
    //显示界面
    PanelChooseDice.prototype.show = function (callback) {
        if (callback === void 0) { callback = null; }
        //数据赋值
        this._callback = callback;
        //显示界面
        this.popup(this.funExit.bind(this));
        //显示按钮状态
        this.now_dice = 0;
        for (var i = 1; i < 7; i++) {
            if (i == this.now_dice) {
                this.btn_dice[i].currentState = "down";
            }
            else {
                this.btn_dice[i].currentState = "up";
            }
        }
    };
    //退出函数
    PanelChooseDice.prototype.funExit = function () {
        //退出事件
        this.dealAction();
    };
    //性别按钮
    PanelChooseDice.prototype.onDiceBtn = function (e) {
        //定义变量
        this.now_dice = Number(e.target.name);
        //播放声音
        basic.SoundManager.instance.playEffect("sound_btn_mp3");
        //显示按钮状态
        for (var i = 1; i < 7; i++) {
            if (i == this.now_dice) {
                this.btn_dice[i].currentState = "down";
            }
            else {
                this.btn_dice[i].currentState = "up";
            }
        }
    };
    //确定按钮
    PanelChooseDice.prototype.onYesBtn = function (e) {
        //播放声音
        basic.SoundManager.instance.playEffect("sound_btn_mp3");
        //判断显示
        if (this.now_dice > 0) {
            if (GameData.jl_dj_num > 0) {
                //数据赋值
                GameData.jl_dj_num -= 1;
                //保存数据
                basic.Dispatcher.dispatch(EventNames.SHOW_TIPSTIMES);
                //发送消息
                Comm.instance.sendSocket({ "type": "playDice", "num": this.now_dice });
                //退出设置
                this.funExit();
            }
            else {
                if (GameData.tips_num[0] > 0) {
                    if (UserData.User_Gold >= GameData.DJ_Gold_Dice) {
                        //数据赋值
                        GameData.tips_num[0] -= 1;
                        //保存数据
                        basic.Dispatcher.dispatch(EventNames.SHOW_TIPSTIMES);
                        //发送消息
                        Comm.instance.sendSocket({ "type": "playDice", "num": this.now_dice });
                        //退出设置
                        this.funExit();
                    }
                    else {
                        //退出设置
                        this.funExit();
                        //显示提示界面
                        egret.setTimeout(function () {
                            PanelShopTips.instance.show();
                        }, this, 300);
                    }
                }
                else {
                    basic.Dispatcher.dispatch(EventNames.SHOW_TIPS, { "msg": "超出使用次数" });
                }
            }
        }
        else {
            basic.Dispatcher.dispatch(EventNames.SHOW_TIPS, { "msg": "请选择需要的点数" });
        }
    };
    return PanelChooseDice;
}(basic.PanelBase));
__reflect(PanelChooseDice.prototype, "PanelChooseDice");
//# sourceMappingURL=PanelChooseDice.js.map