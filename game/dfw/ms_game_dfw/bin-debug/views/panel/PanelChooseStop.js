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
 * @阻止发生
 *
 */
var PanelChooseStop = (function (_super) {
    __extends(PanelChooseStop, _super);
    //定义界面
    function PanelChooseStop() {
        var _this = _super.call(this, basic.dialogEffect.Scale, {
            withFade: true,
            ease: egret.Ease.backOut
        }, basic.dialogEffect.Scale, { withFade: true, ease: egret.Ease.backIn }) || this;
        _this.head = [];
        _this.btn_head = [];
        _this.pos_num = [];
        return _this;
    }
    Object.defineProperty(PanelChooseStop, "instance", {
        get: function () {
            if (this._instance == undefined) {
                this._instance = new PanelChooseStop();
            }
            return this._instance;
        },
        enumerable: true,
        configurable: true
    });
    //皮肤设置
    PanelChooseStop.prototype.init = function () {
        this.skinName = PanelChooseStopSkin;
    };
    //初始化界面
    PanelChooseStop.prototype.createChildren = function () {
        _super.prototype.createChildren.call(this);
        //数据赋值
        for (var i = 0; i < 8; i++) {
            //定义变量
            var now_head = this["head" + i];
            var now_btn = this["btn_head" + i];
            //数据赋值
            this.head[i] = now_head;
            this.btn_head[i] = now_btn;
            //注册按钮
            this.btn_head[i].addEventListener(egret.TouchEvent.TOUCH_TAP, this.onHeadBtn, this);
        }
        //注册事件
        basic.Dispatcher.addListener(EventNames.SHOW_REMAIN, this.onRemain, this);
        //注册按钮
        this.btn_yes.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onYesBtn, this);
    };
    //显示界面
    PanelChooseStop.prototype.show = function (callback) {
        if (callback === void 0) { callback = null; }
        //数据赋值
        this.callback = callback;
        //显示界面
        this.popup(this.funExit.bind(this));
        //隐藏界面
        for (var j = 0; j < 8; j++) {
            this.head[j].visible = false;
            this.btn_head[j].visible = false;
        }
        //显示按钮状态
        this.now_pos = -1;
        this.show_num = 0;
        for (var i = 0; i < GameData.player_num; i++) {
            if (UserData.User_Id != GameData.player_id[i] && GameData.player_place[i] > 0) {
                //数据赋值
                this.pos_num[this.show_num] = i;
                //显示头像
                this.head[this.show_num].visible = true;
                this.btn_head[this.show_num].visible = true;
                //显示头像
                this.head[this.show_num].show(GameData.player_head[i]);
                this.head[this.show_num].showName(GameData.player_name[i]);
                this.head[this.show_num].currentState = "hide";
                //判断显示
                if (this.now_pos == -1) {
                    this.now_pos = this.show_num;
                    this.head[this.show_num].currentState = "show";
                }
                //数据赋值
                this.show_num += 1;
            }
        }
    };
    //退出函数
    PanelChooseStop.prototype.funExit = function () {
        //退出事件
        this.dealAction();
    };
    //性别按钮
    PanelChooseStop.prototype.onHeadBtn = function (e) {
        //定义变量
        this.now_pos = Number(e.target.name);
        //播放声音
        basic.SoundManager.instance.playEffect("sound_btn_mp3");
        //数据赋值
        for (var i = 0; i < GameData.player_num; i++) {
            //判断显示
            if (this.now_pos == i) {
                this.head[i].currentState = "show";
            }
            else {
                this.head[i].currentState = "hide";
            }
        }
    };
    //停留原地生效
    PanelChooseStop.prototype.onRemain = function (e) {
        //判断显示
        if (GameData.jl_dj_num > 0) {
            //数据赋值
            GameData.jl_dj_num -= 1;
            //保存数据
            basic.Dispatcher.dispatch(EventNames.SHOW_TIPSTIMES);
            //显示回调函数
            if (this.callback) {
                this.callback();
            }
            //退出设置
            this.funExit();
        }
        else {
            if (GameData.tips_num[2] > 0) {
                //数据赋值
                GameData.tips_num[2] -= 1;
                //保存数据
                basic.Dispatcher.dispatch(EventNames.SHOW_TIPSTIMES);
                //显示回调函数
                if (this.callback) {
                    this.callback();
                }
                //退出设置
                this.funExit();
            }
        }
        //显示提示
        basic.Dispatcher.dispatch(EventNames.SHOW_TIPS, { "msg": GameData.player_name[e.data.pos] + "将停留一回合。" });
    };
    //确定按钮
    PanelChooseStop.prototype.onYesBtn = function (e) {
        //播放声音
        basic.SoundManager.instance.playEffect("sound_btn_mp3");
        //判断显示
        if (GameData.jl_dj_num > 0) {
            //发送消息
            Comm.instance.sendSocket({ "type": "remain", "pos": this.pos_num[this.now_pos] });
        }
        else {
            if (GameData.tips_num[2] > 0) {
                if (UserData.User_Gold >= GameData.DJ_Gold_Stop) {
                    //发送消息
                    if (this.now_pos >= 0) {
                        Comm.instance.sendSocket({ "type": "remain", "pos": this.pos_num[this.now_pos] });
                    }
                    else {
                        basic.Dispatcher.dispatch(EventNames.SHOW_TIPS, { "msg": "没有人可以被停留" });
                    }
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
    };
    return PanelChooseStop;
}(basic.PanelBase));
__reflect(PanelChooseStop.prototype, "PanelChooseStop");
//# sourceMappingURL=PanelChooseStop.js.map