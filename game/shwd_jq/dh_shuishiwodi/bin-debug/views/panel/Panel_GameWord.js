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
 * @获得词语界面
 *
 */
var Panel_GameWord = (function (_super) {
    __extends(Panel_GameWord, _super);
    //定义界面
    function Panel_GameWord() {
        return _super.call(this, basic.dialogEffect.Scale, {
            withFade: true,
            ease: egret.Ease.backOut
        }, basic.dialogEffect.Scale, { withFade: true, ease: egret.Ease.backIn }) || this;
    }
    Object.defineProperty(Panel_GameWord, "instance", {
        get: function () {
            if (this._instance == undefined) {
                this._instance = new Panel_GameWord();
            }
            return this._instance;
        },
        enumerable: true,
        configurable: true
    });
    //初始化界面
    Panel_GameWord.prototype.createChildren = function () {
        _super.prototype.createChildren.call(this);
        //定义界面
        this.skinName = Panel_GameWordSkin;
        //定义按钮事件
        this.btn_yes.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onYesBtn, this);
    };
    //显示界面
    Panel_GameWord.prototype.show = function (callback) {
        if (callback === void 0) { callback = null; }
        //判断显示
        if (GameData.Is_Show_Word == false) {
            //显示界面
            this.popup();
            //数据赋值
            GameData.Is_Show_Word = true;
            //显示词语
            this.txt_word.text = GameData.Game_Word;
        }
    };
    //确定按钮
    Panel_GameWord.prototype.onYesBtn = function (e) {
        //退出事件
        this.funExit();
        //数据赋值
        GameData.Game_State = 0;
        //显示描述界面
        egret.setTimeout(function () {
            Panel_GameDescription.instance.show();
        }, this, 400);
    };
    //退出函数
    Panel_GameWord.prototype.funExit = function () {
        //判断移除
        if (GameData.Is_Show_Word == true) {
            //退出事件
            this.dealAction();
            //数据赋值
            GameData.Is_Show_Word = false;
        }
    };
    return Panel_GameWord;
}(basic.PanelBase));
__reflect(Panel_GameWord.prototype, "Panel_GameWord");
