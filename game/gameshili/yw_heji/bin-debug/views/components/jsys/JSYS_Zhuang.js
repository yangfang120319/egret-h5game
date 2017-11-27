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
 * @庄界面
 *
 */
var JSYS_Zhuang = (function (_super) {
    __extends(JSYS_Zhuang, _super);
    function JSYS_Zhuang() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._tween_y = null;
        _this.is_show = false;
        return _this;
    }
    //初始化
    JSYS_Zhuang.prototype.createChildren = function () {
        _super.prototype.createChildren.call(this);
        //显示界面76   
        this.g_zhuanglist.y = -255;
        //显示遮罩
        this.rect_mask.visible = true;
        this.g_zhuanglist.visible = true;
        this.g_zhuanglist.mask = this.rect_mask;
        //定义List
        this.list.dataProvider = this._data = new eui.ArrayCollection();
        this.list.itemRenderer = JSTS_ZhuangListItem;
        //注册按钮
        this.btn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onThisBtn, this);
    };
    //显示界面
    JSYS_Zhuang.prototype.show = function () {
        //显示庄金币
        this.showGold();
        //显示当庄次数
        this.showZhuangTimes();
        //判断显示
        if (GameData.Zhuang_Id == 0) {
            //清空文本
            this.txt_zhuang_times.text = "";
            this.head.show("icon_zhuanghead_jpg");
        }
        else {
            this.head.show(GameData.Zhuang_Head);
        }
        //显示信息
        this.txt_name.text = GameData.Zhuang_Name;
        this.img_vip.source = "txt_s_vip" + GameData.Zhuang_VIP.toString() + "_png";
    };
    //显示庄金币
    JSYS_Zhuang.prototype.showGold = function () {
        //判断显示
        if (GameData.Zhuang_Id == 0) {
            //显示金币
            this.txt_gold.text = "88888y";
            this.txt_zhuang_times.text = "";
        }
        else {
            //判断显示
            this.txt_gold.text = Number(Math.floor(GameData.Zhuang_Gold / 1000000) / 100).toString() + "y";
        }
    };
    //显示庄列表
    JSYS_Zhuang.prototype.showZhuangList = function (_data) {
        //定义变量
        var mingci = 0;
        //数据赋值
        GameData.JSYS_ZhuangList = [];
        //清空文本
        this.txt_zhuang_times.text = "";
        //数据赋值
        for (var i = 0; i < _data.length; i++) {
            //定义变量
            var now_data = _data[i];
            //数据赋值
            now_data["num"] = i + 1;
            GameData.JSYS_ZhuangList[i] = now_data;
            //判断显示
            if (UserData.User_Id == now_data.playerId) {
                mingci = i + 1;
            }
        }
        //判断显示文本
        if (mingci > 0) {
            this.txt_zhuang_times.text = "排庄名次:" + mingci.toString();
        }
        //显示将诶面
        this._data.source = GameData.JSYS_ZhuangList;
        this._data.refresh();
    };
    //显示当庄次数
    JSYS_Zhuang.prototype.showZhuangTimes = function () {
        //判断显示
        if (GameData.Zhuang_Times == -1) {
            this.txt_num.text = "";
        }
        else {
            this.txt_num.text = "剩余局数:" + GameData.Zhuang_Times.toString();
        }
    };
    //当前按钮
    JSYS_Zhuang.prototype.onThisBtn = function (e) {
        var _this = this;
        //播放声音
        basic.SoundManager.instance.playEffect("sound_btn_mp3");
        //判断显示
        if (this.is_show == false) {
            //数据赋值
            this.is_show = true;
            //停止移动
            if (this._tween_y) {
                this._tween_y.setPaused(true);
                this._tween_y = null;
            }
            //开始移动
            this._tween_y = egret.Tween.get(this.g_zhuanglist).to({ y: 76 }, 400, egret.Ease.backOut).call(function () {
                //注册按钮
                basic.StageProxy.stage.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onRemoveBtn, _this);
            });
        }
    };
    //移除按钮
    JSYS_Zhuang.prototype.onRemoveBtn = function (e) {
        //数据赋值
        this.is_show = false;
        //停止移动
        if (this._tween_y) {
            this._tween_y.setPaused(true);
            this._tween_y = null;
        }
        //播放声音
        basic.SoundManager.instance.playEffect("sound_btn_mp3");
        //开始移动
        this._tween_y = egret.Tween.get(this.g_zhuanglist).to({ y: -255 }, 400, egret.Ease.backIn);
        //注销按钮
        basic.StageProxy.stage.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onRemoveBtn, this);
    };
    return JSYS_Zhuang;
}(eui.Component));
__reflect(JSYS_Zhuang.prototype, "JSYS_Zhuang");
//显示条定义
var JSTS_ZhuangListItem = (function (_super) {
    __extends(JSTS_ZhuangListItem, _super);
    function JSTS_ZhuangListItem() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    //初始化界面
    JSTS_ZhuangListItem.prototype.dataChanged = function () {
        _super.prototype.dataChanged.call(this);
        //显示文本
        this.txt_num.text = this.data.num + ".";
        this.txt_name.text = this.data.nickName;
        //判断显示金币
        this.txt_gold.text = Number(Math.floor(this.data.gold / 1000000) / 100).toString() + "亿";
    };
    return JSTS_ZhuangListItem;
}(eui.ItemRenderer));
__reflect(JSTS_ZhuangListItem.prototype, "JSTS_ZhuangListItem");
