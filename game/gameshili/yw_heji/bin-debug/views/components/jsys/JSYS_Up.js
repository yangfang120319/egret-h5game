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
var JSYS_Up = (function (_super) {
    __extends(JSYS_Up, _super);
    function JSYS_Up() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    //初始化
    JSYS_Up.prototype.createChildren = function () {
        _super.prototype.createChildren.call(this);
        //注册按钮
        this.btn_exit.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onExitBtn, this);
        this.btn_savebox.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onSaveBoxBtn, this);
    };
    //初始化界面
    JSYS_Up.prototype.info = function () {
        //显示界面
        this.head.show(UserData.User_Head);
        this.txt_name.text = UserData.User_Name;
        this.txt_gold.text = UserData.User_Gold.toString();
        this.img_vip.source = "txt_s_vip" + UserData.User_VIP.toString() + "_png";
    };
    //显示金币
    JSYS_Up.prototype.showGold = function (_gold) {
        //显示金币
        this.txt_gold.text = _gold.toString();
    };
    //退出按钮
    JSYS_Up.prototype.onExitBtn = function (e) {
        //播放声音
        basic.SoundManager.instance.playEffect("sound_btn_mp3");
        //判断提示
        if (UserData.User_Id == GameData.Zhuang_Id) {
            //显示提示
            basic.Dispatcher.dispatch(EventNames.SHOW_TIPS, { "tips": "您当前是庄家，请下庄后退出!" });
        }
        else {
            //显示提示
            PanelExit.instance.show();
        }
    };
    //保险箱按钮
    JSYS_Up.prototype.onSaveBoxBtn = function (e) {
        //播放声音
        basic.SoundManager.instance.playEffect("sound_btn_mp3");
        //显示保险箱
        basic.SceneManager.addTopScene(SceneNames.SAVEBOX);
    };
    return JSYS_Up;
}(eui.Component));
__reflect(JSYS_Up.prototype, "JSYS_Up");
