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
 * @按钮
 *
 */
var JSYS_Btn = (function (_super) {
    __extends(JSYS_Btn, _super);
    function JSYS_Btn() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.btn_genzhu = [];
        _this.is_show = false;
        _this._tween_y = null;
        _this.genzhu_num = [5, 10, 50];
        return _this;
    }
    //初始化
    JSYS_Btn.prototype.createChildren = function () {
        _super.prototype.createChildren.call(this);
        //显示界面
        this.g_genzhu.y = 0;
        this.g_genzhu.visible = true;
        this.rect_mask.visible = true;
        this.g_genzhu.mask = this.rect_mask;
        //数据赋值
        for (var i = 0; i < 3; i++) {
            //定义变量
            var genzhu = this["btn_genzhu" + i];
            //数据赋值
            this.btn_genzhu[i] = genzhu;
            //注册按钮
            this.btn_genzhu[i].addEventListener(egret.TouchEvent.TOUCH_TAP, this.onGenZhuBtn, this);
        }
        //注册按钮
        this.btn_up.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onUpBtn, this);
        this.btn_down.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onDownBtn, this);
        this.btn_start.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onStartBtn, this);
        this.btn_again.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onAgainBtn, this);
    };
    //显示庄按钮
    JSYS_Btn.prototype.showZhuangBtn = function () {
        //判断显示庄按钮
        if (UserData.User_Id == GameData.Zhuang_Id) {
            this.btn_up.visible = false;
            this.btn_down.visible = true;
        }
        else {
            //定义变量
            var is_show_list = false;
            //数据赋值
            for (var i = 0; i < GameData.JSYS_ZhuangList.length; i++) {
                if (GameData.JSYS_ZhuangList[i].playerId == UserData.User_Id) {
                    is_show_list = true;
                    break;
                }
            }
            //判断显示
            if (is_show_list == false) {
                this.btn_up.visible = true;
                this.btn_down.visible = false;
            }
            else {
                this.btn_up.visible = false;
                this.btn_down.visible = true;
            }
        }
    };
    //显示按钮
    JSYS_Btn.prototype.showBtn = function () {
        //显示按钮
        if (UserData.User_Id != GameData.Zhuang_Id) {
            this.btn_start.enabled = true;
            this.btn_again.enabled = true;
        }
    };
    //隐藏按钮
    JSYS_Btn.prototype.hideBtn = function () {
        //隐藏按钮
        this.btn_start.enabled = false;
        this.btn_again.enabled = false;
        //判断移除
        if (this.is_show == true) {
            //数据赋值
            this.is_show = false;
            //停止移动
            if (this._tween_y) {
                this._tween_y.setPaused(true);
                this._tween_y = null;
            }
            //注销按钮
            basic.StageProxy.stage.removeEventListener(egret.TouchEvent.TOUCH_END, this.onOverBtn, this);
            //开始移动
            this._tween_y = egret.Tween.get(this.g_genzhu).to({ y: 0 }, 200);
        }
    };
    //跟注按钮
    JSYS_Btn.prototype.onGenZhuBtn = function (e) {
        //定义变量
        var btnnum = Number(e.target.name);
        //数据赋值
        this.click_btn = btnnum;
    };
    //上庄按钮
    JSYS_Btn.prototype.onUpBtn = function (e) {
        //播放声音
        basic.SoundManager.instance.playEffect("sound_btn_mp3");
        //发送请求
        Comm_jsys.instance.sendSocket({ "type": "callDealer" });
    };
    //下庄按钮
    JSYS_Btn.prototype.onDownBtn = function (e) {
        //播放声音
        basic.SoundManager.instance.playEffect("sound_btn_mp3");
        //发送消息
        Comm_jsys.instance.sendSocket({ "type": "cancelDealer" });
    };
    //开始按钮
    JSYS_Btn.prototype.onStartBtn = function (e) {
        var _this = this;
        //显示界面
        if (this.is_show == false) {
            //数据赋值
            this.is_show = true;
            this.click_btn = -1;
            //停止移动
            if (this._tween_y) {
                this._tween_y.setPaused(true);
                this._tween_y = null;
            }
            //播放声音
            basic.SoundManager.instance.playEffect("sound_btn_mp3");
            //注册按钮
            basic.StageProxy.stage.addEventListener(egret.TouchEvent.TOUCH_END, this.onOverBtn, this);
            //开始移动
            this._tween_y = egret.Tween.get(this.g_genzhu).to({ y: -170 }, 200);
        }
        else {
            //数据赋值
            this.is_show = false;
            //停止移动
            if (this._tween_y) {
                this._tween_y.setPaused(true);
                this._tween_y = null;
            }
            //播放声音
            basic.SoundManager.instance.playEffect("sound_btn_mp3");
            //注销按钮
            basic.StageProxy.stage.removeEventListener(egret.TouchEvent.TOUCH_END, this.onOverBtn, this);
            //开始移动
            this._tween_y = egret.Tween.get(this.g_genzhu).to({ y: 0 }, 200).call(function () {
                //判断发送消息
                if (_this.click_btn != -1) {
                    //开始跟注
                    _this.startGenZhu();
                }
            });
        }
    };
    //结束按钮
    JSYS_Btn.prototype.onOverBtn = function (e) {
        var _this = this;
        //判断显示
        egret.setTimeout(function () {
            if (_this.is_show == true) {
                //数据赋值
                _this.is_show = false;
                //停止移动
                if (_this._tween_y) {
                    _this._tween_y.setPaused(true);
                    _this._tween_y = null;
                }
                //注销按钮
                basic.StageProxy.stage.removeEventListener(egret.TouchEvent.TOUCH_END, _this.onOverBtn, _this);
                //播放声音
                if (_this.click_btn != -1) {
                    basic.SoundManager.instance.playEffect("sound_btn_mp3");
                }
                //开始移动
                _this._tween_y = egret.Tween.get(_this.g_genzhu).to({ y: 0 }, 200).call(function () {
                    //判断发送消息
                    if (_this.click_btn != -1) {
                        //开始跟注
                        _this.startGenZhu();
                    }
                });
            }
        }, this, 50);
    };
    //开始跟注
    JSYS_Btn.prototype.startGenZhu = function () {
        //数据赋值
        GameData.JSYS_GenZhu_Num = this.genzhu_num[this.click_btn];
        //判断赋值
        if (GameData.JSYS_YaZhu_UserTotal > 0) {
            //数据赋值
            for (var i = 0; i < 12; i++) {
                GameData.JSYS_GenZhu_Detail[i] = GameData.JSYS_YaZhu_User[i];
            }
        }
        else {
            //数据赋值
            for (var j = 0; j < 12; j++) {
                GameData.JSYS_GenZhu_Detail[j] = GameData.Game_BeiLv;
                Comm_jsys.instance.sendSocket({ "type": "bet", "pos": j, "gold": GameData.JSYS_GenZhu_Detail[j] });
            }
        }
        //发送消息
        basic.Dispatcher.dispatch(EventNames.JSYS_STARTGENZHU);
    };
    //重复压住
    JSYS_Btn.prototype.onAgainBtn = function (e) {
        //播放声音
        basic.SoundManager.instance.playEffect("sound_btn_mp3");
        //发送消息
        for (var i = 0; i < 12; i++) {
            //判断发送
            if (GameData.JSYS_YaZhu_User_Old[i] > 0) {
                Comm_jsys.instance.sendSocket({ "type": "bet", "pos": i, "gold": GameData.JSYS_YaZhu_User_Old[i] });
            }
        }
    };
    return JSYS_Btn;
}(eui.Component));
__reflect(JSYS_Btn.prototype, "JSYS_Btn");
