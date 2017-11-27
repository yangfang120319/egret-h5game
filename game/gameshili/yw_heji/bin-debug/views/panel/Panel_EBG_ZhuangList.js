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
 * @庄加列表
 *
 */
var Panel_EBG_ZhuangList = (function (_super) {
    __extends(Panel_EBG_ZhuangList, _super);
    //定义界面
    function Panel_EBG_ZhuangList() {
        return _super.call(this, basic.dialogEffect.Scale, {
            withFade: true,
            ease: egret.Ease.backOut
        }, basic.dialogEffect.Scale, { withFade: true, ease: egret.Ease.backIn }) || this;
    }
    Object.defineProperty(Panel_EBG_ZhuangList, "instance", {
        get: function () {
            if (this._instance == undefined) {
                this._instance = new Panel_EBG_ZhuangList();
            }
            return this._instance;
        },
        enumerable: true,
        configurable: true
    });
    //皮肤设置
    Panel_EBG_ZhuangList.prototype.init = function () {
        this.skinName = Panel_EBG_ZhuangListSkin;
    };
    //初始化界面
    Panel_EBG_ZhuangList.prototype.createChildren = function () {
        _super.prototype.createChildren.call(this);
        //定义List
        this.list.dataProvider = this._data = new eui.ArrayCollection();
        this.list.itemRenderer = ZhuangListItem;
        //注册按钮
        this.btn_up.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onUpBtn, this);
        this.btn_down.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onDownBtn, this);
        basic.Dispatcher.addListener(EventNames.EBG_ZHUANGLIST, this.onGetZhuangList, this);
    };
    //显示界面
    Panel_EBG_ZhuangList.prototype.show = function (callback) {
        if (callback === void 0) { callback = null; }
        //数据赋值
        this._callback = callback;
        basic.PopUpManager.modalMaskAlpha = 0.6;
        //显示界面
        this.popup(this.funExit.bind(this));
        //发送消息
        Comm_ebg.instance.sendSocket({ "type": "dealerList" });
    };
    //庄家数据
    Panel_EBG_ZhuangList.prototype.onGetZhuangList = function (e) {
        //定义变量
        var is_upzhuang = false;
        //数据赋值
        if (GameData.Zhuang_Id == UserData.User_Id) {
            is_upzhuang = true;
        }
        else {
            for (var i = 0; i < e.data.data.length; i++) {
                if (UserData.User_Id == e.data.data[i].playerId) {
                    is_upzhuang = true;
                    break;
                }
            }
        }
        //数据赋值
        this._data.source = e.data.data;
        this._data.refresh();
        //判断显示按钮
        if (is_upzhuang == true) {
            this.btn_up.visible = false;
            this.btn_down.visible = true;
        }
        else {
            this.btn_up.visible = true;
            this.btn_down.visible = false;
        }
    };
    //申请按钮
    Panel_EBG_ZhuangList.prototype.onUpBtn = function (e) {
        //播放声音
        basic.SoundManager.instance.playEffect("sound_btn_mp3");
        //发送数据
        Comm_ebg.instance.sendSocket({ "type": "callDealer" });
    };
    //下庄按钮
    Panel_EBG_ZhuangList.prototype.onDownBtn = function (e) {
        //播放声音
        basic.SoundManager.instance.playEffect("sound_btn_mp3");
        //发送消息
        Comm_ebg.instance.sendSocket({ "type": "cancelDealer" });
    };
    //退出按钮
    Panel_EBG_ZhuangList.prototype.funExit = function (e) {
        //播放声音
        basic.SoundManager.instance.playEffect("sound_btn_mp3");
        //退出界面
        this.dealAction();
    };
    return Panel_EBG_ZhuangList;
}(basic.PanelBase));
__reflect(Panel_EBG_ZhuangList.prototype, "Panel_EBG_ZhuangList");
//显示条定义
var ZhuangListItem = (function (_super) {
    __extends(ZhuangListItem, _super);
    function ZhuangListItem() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    //初始化界面
    ZhuangListItem.prototype.dataChanged = function () {
        _super.prototype.dataChanged.call(this);
        //显示头像
        this.img_head.source = this.data.headImgURL;
        //显示文本
        this.txt_name.text = this.data.nickName;
        this.txt_jinbi.text = GameData.assGold(2, this.data.gold);
    };
    return ZhuangListItem;
}(eui.ItemRenderer));
__reflect(ZhuangListItem.prototype, "ZhuangListItem");
