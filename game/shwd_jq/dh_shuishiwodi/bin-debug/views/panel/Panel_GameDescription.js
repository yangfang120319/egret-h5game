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
var Panel_GameDescription = (function (_super) {
    __extends(Panel_GameDescription, _super);
    //定义界面
    function Panel_GameDescription() {
        var _this = _super.call(this, basic.dialogEffect.Scale, {
            withFade: true,
            ease: egret.Ease.backOut
        }, basic.dialogEffect.Scale, { withFade: true, ease: egret.Ease.backIn }) || this;
        _this.is_show = false;
        return _this;
    }
    Object.defineProperty(Panel_GameDescription, "instance", {
        get: function () {
            if (this._instance == undefined) {
                this._instance = new Panel_GameDescription();
            }
            return this._instance;
        },
        enumerable: true,
        configurable: true
    });
    //初始化界面
    Panel_GameDescription.prototype.createChildren = function () {
        _super.prototype.createChildren.call(this);
        //定义界面
        this.skinName = Panel_GameDescriptionSkin;
        //注册按钮
        this.btn_yes.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onYesBtn, this);
    };
    //退出函数
    Panel_GameDescription.prototype.funExit = function () {
        //判断移除
        if (this.is_show == true) {
            //退出事件
            this.dealAction();
            //数据赋值
            this.is_show = false;
        }
    };
    //显示界面
    Panel_GameDescription.prototype.show = function (callback) {
        if (callback === void 0) { callback = null; }
        //判断显示
        if (this.is_show == false) {
            //显示界面
            this.popup();
            //数据赋值
            this.is_show = true;
            //显示文本
            this.txt_description.text = "";
            this.txt_word.text = GameData.Game_Word;
        }
    };
    //确定按钮
    Panel_GameDescription.prototype.onYesBtn = function (e) {
        //退出事件
        this.funExit();
        //判断发送消息
        if (this.txt_description.text == "") {
            Comm.instance.sendSocket({ "type": "gameDescribe", "describe": " " });
        }
        else {
            Comm.instance.sendSocket({ "type": "gameDescribe", "describe": this.txt_description.text });
        }
    };
    return Panel_GameDescription;
}(basic.PanelBase));
__reflect(Panel_GameDescription.prototype, "Panel_GameDescription");
