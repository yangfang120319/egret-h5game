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
 * @保险箱界面
 *
 */
var SceneSaveBox = (function (_super) {
    __extends(SceneSaveBox, _super);
    //定义界面
    function SceneSaveBox() {
        var _this = _super.call(this) || this;
        _this.change_gold = 10000;
        //定义界面
        _this.skinName = SceneSaveBoxSkin;
        //显示文本
        _this.txt_tips.text = "";
        //显示修改金币
        _this.showChangeGold();
        //注册事件
        basic.Dispatcher.addListener(EventNames.GOLD_CHANGE, _this.onGoldChange, _this);
        //注册按钮
        _this.btn_get.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onGetBtn, _this);
        _this.btn_close.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onCloseBtn, _this);
        _this.btn_left.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onLeftBtn, _this);
        _this.btn_right.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onRightBtn, _this);
        _this.btn_seposit.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onSepositBtn, _this);
        return _this;
    }
    //显示前调用
    SceneSaveBox.prototype.beforeShow = function () {
        //判断显示
        if (GameData.Game_Type == -1) {
            this.rect_back.visible = false;
        }
        else {
            this.rect_back.visible = true;
        }
        //显示金币
        this.showGold();
    };
    //金币改变
    SceneSaveBox.prototype.onGoldChange = function (e) {
        //显示金币
        this.showGold();
        //显示文本
        this.txt_tips.text = "存取成功!";
    };
    //显示金币
    SceneSaveBox.prototype.showGold = function () {
        //判断显示金币
        if (UserData.User_Gold < 100000000) {
            this.txt_gold.text = Math.floor(UserData.User_Gold / 10000).toString() + "w";
        }
        else {
            this.txt_gold.text = Number(Math.floor(UserData.User_Gold / 1000000) / 100).toString() + "y";
        }
        if (UserData.User_SaveGold < 100000000) {
            this.txt_savegold.text = Math.floor(UserData.User_SaveGold / 10000).toString() + "w";
        }
        else {
            this.txt_savegold.text = Number(Math.floor(UserData.User_SaveGold / 1000000) / 100).toString() + "y";
        }
    };
    //显示金币
    SceneSaveBox.prototype.showChangeGold = function () {
        //判断显示金币
        if (this.change_gold < 100000000) {
            this.txt_change_gold.text = Math.floor(this.change_gold / 10000).toString() + "万 整存整取";
        }
        else {
            this.txt_change_gold.text = Math.floor(this.change_gold / 100000000).toString() + "亿 整存整取";
        }
    };
    //关闭按钮
    SceneSaveBox.prototype.onCloseBtn = function (e) {
        //播放声音
        basic.SoundManager.instance.playEffect("sound_btn_mp3");
        //判断显示
        if (GameData.Game_Type == -1) {
            //发送消息
            basic.Dispatcher.dispatch(EventNames.SHOW_FACE, { "nowshow": 0 });
        }
        else {
            //显示保险箱
            basic.SceneManager.removeTopScene(SceneNames.SAVEBOX);
        }
    };
    //取按钮
    SceneSaveBox.prototype.onGetBtn = function (e) {
        //播放声音
        basic.SoundManager.instance.playEffect("sound_btn_mp3");
        //显示提示
        this.txt_tips.text = "";
        //判断显示
        if (this.change_gold > UserData.User_SaveGold) {
            //显示提示
            this.txt_tips.text = "保存金币不足！";
        }
        else {
            //发送消息
            Comm.instance.sendSocket({ "type": "exchangeGold", "gold": this.change_gold, "exchangeType": 0 });
        }
    };
    //存按钮
    SceneSaveBox.prototype.onSepositBtn = function (e) {
        //播放声音
        basic.SoundManager.instance.playEffect("sound_btn_mp3");
        //显示提示
        this.txt_tips.text = "";
        //判断显示
        if (this.change_gold > UserData.User_Gold) {
            //显示提示
            this.txt_tips.text = "现有金币不足！";
        }
        else {
            //发送消息
            Comm.instance.sendSocket({ "type": "exchangeGold", "gold": this.change_gold, "exchangeType": 1 });
        }
    };
    //左边按钮
    SceneSaveBox.prototype.onLeftBtn = function (e) {
        //播放声音
        basic.SoundManager.instance.playEffect("sound_btn_mp3");
        //数据赋值
        this.change_gold = Math.floor(this.change_gold / 10);
        if (this.change_gold < 10000) {
            this.change_gold = 100000000000;
        }
        //显示文本
        this.showChangeGold();
    };
    //右边按钮
    SceneSaveBox.prototype.onRightBtn = function (e) {
        //播放声音
        basic.SoundManager.instance.playEffect("sound_btn_mp3");
        //数据赋值
        this.change_gold = Math.floor(this.change_gold * 10);
        if (this.change_gold > 100000000000) {
            this.change_gold = 10000;
        }
        //显示文本
        this.showChangeGold();
    };
    return SceneSaveBox;
}(basic.SceneBase));
__reflect(SceneSaveBox.prototype, "SceneSaveBox");
