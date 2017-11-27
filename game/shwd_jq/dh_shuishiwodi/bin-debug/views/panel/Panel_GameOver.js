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
 * @结束界面
 *
 */
var Panel_GameOver = (function (_super) {
    __extends(Panel_GameOver, _super);
    //定义界面
    function Panel_GameOver() {
        return _super.call(this, basic.dialogEffect.Scale, {
            withFade: true,
            ease: egret.Ease.backOut
        }, basic.dialogEffect.Scale, { withFade: true, ease: egret.Ease.backIn }) || this;
    }
    Object.defineProperty(Panel_GameOver, "instance", {
        get: function () {
            if (this._instance == undefined) {
                this._instance = new Panel_GameOver();
            }
            return this._instance;
        },
        enumerable: true,
        configurable: true
    });
    //初始化界面
    Panel_GameOver.prototype.createChildren = function () {
        _super.prototype.createChildren.call(this);
        //定义界面
        this.skinName = Panel_GameOverSkin;
        //注册按钮
        this.btn_exit.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onExitBtn, this);
        this.btn_again.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onAgainlBtn, this);
    };
    //显示界面
    Panel_GameOver.prototype.show = function (_data, callback) {
        if (callback === void 0) { callback = null; }
        //显示界面
        this.popup(this.funExit.bind(this));
        //数据赋值
        UserData.User_Level = _data.level;
        //显示界面
        this.head.show(UserData.User_Head);
        this.txt_win_rate.text = _data.rate;
        this.txt_name.text = UserData.User_Name;
        this.txt_word_pm.text = "平民词：" + _data.normal_terms;
        this.txt_word_wd.text = "卧底词：" + _data.undercover_terms;
        //判断显示玩家身份
        if (_data.playerType == 0) {
            this.txt_user_type.text = "平民";
        }
        else {
            this.txt_user_type.text = "卧底";
        }
        //判断显示结果
        if (_data.winType == 0) {
            this.txt_win_tips.text = "平民胜利";
        }
        else {
            this.txt_win_tips.text = "卧底胜利";
        }
        //判断显示等级
        if (UserData.User_Level < 30) {
            this.txt_level.text = "初级卧底";
        }
        else if (UserData.User_Level < 60) {
            this.txt_level.text = "中级卧底";
        }
        else if (UserData.User_Level < 90) {
            this.txt_level.text = "高级卧底";
        }
        else {
            this.txt_level.text = "终极卧底";
        }
        //判断显示星星改变
        if (_data.levelUp > 0) {
            this.com_type.currentState = "1";
            this.txt_level_change.text = "星星  +" + String(_data.levelUp);
        }
        else {
            this.com_type.currentState = "0";
            this.txt_level_change.text = "星星  " + String(_data.levelUp);
        }
    };
    //再来一次
    Panel_GameOver.prototype.onAgainlBtn = function (e) {
        //退出事件
        this.funExit();
    };
    //退出按钮
    Panel_GameOver.prototype.onExitBtn = function (e) {
        //退出事件
        this.funExit();
        //退出游戏
        basic.SceneManager.back();
    };
    //退出函数
    Panel_GameOver.prototype.funExit = function () {
        //退出事件
        this.dealAction();
    };
    return Panel_GameOver;
}(basic.PanelBase));
__reflect(Panel_GameOver.prototype, "Panel_GameOver");
