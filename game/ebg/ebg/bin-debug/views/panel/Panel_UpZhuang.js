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
 * @申请上庄
 *
 */
var Panel_UpZhuang = (function (_super) {
    __extends(Panel_UpZhuang, _super);
    //定义界面
    function Panel_UpZhuang() {
        return _super.call(this, basic.dialogEffect.Scale, {
            withFade: true,
            ease: egret.Ease.backOut
        }, basic.dialogEffect.Scale, { withFade: true, ease: egret.Ease.backIn }) || this;
    }
    Object.defineProperty(Panel_UpZhuang, "instance", {
        get: function () {
            if (this._instance == undefined) {
                this._instance = new Panel_UpZhuang();
            }
            return this._instance;
        },
        enumerable: true,
        configurable: true
    });
    //皮肤设置
    Panel_UpZhuang.prototype.init = function () {
        this.skinName = Panel_UpZhuangSkin;
    };
    //初始化界面
    Panel_UpZhuang.prototype.createChildren = function () {
        _super.prototype.createChildren.call(this);
        //定义List
        this.list.dataProvider = this._data = new eui.ArrayCollection();
        this.list.itemRenderer = UpZhuangItem;
        //注册按钮
        basic.Dispatcher.addListener(EventNames.ZHUANG_UP_LIST, this.onShowList, this);
        this.btn_yes.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onYesBtn, this);
        this.btn_close.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onCloseBtn, this);
    };
    //显示界面
    Panel_UpZhuang.prototype.show = function (_type, callback) {
        if (callback === void 0) { callback = null; }
        //数据赋值
        this.game_type = _type;
        this._callback = callback;
        //显示界面
        this.popup(this.funExit.bind(this));
        //判断显示
        if (this.game_type == 0) {
            //Comm_ebg.instance.sendSocket({ "type": "dealerList" });
        }
        else if (this.game_type == 1) {
            //Comm_nn.instance.sendSocket({ "type": "dealerList" });
        }
        else if (this.game_type == 2) {
            //Comm_sg.instance.sendSocket({ "type": "dealerList" });
        }
    };
    //显示界面
    Panel_UpZhuang.prototype.onShowList = function (e) {
        //定义变量
        var now_data = [];
        //数据赋值
        for (var i = 0; i < e.data.data.length; i++) {
            //数据赋值
            now_data[i] = e.data.data[i];
            now_data[i].ranking = i + 1;
        }
        //数据赋值
        this._data.source = now_data;
        this._data.refresh();
    };
    //退出函数
    Panel_UpZhuang.prototype.funExit = function () {
        //退出事件
        this.dealAction();
    };
    //确定按钮
    Panel_UpZhuang.prototype.onYesBtn = function (e) {
        //播放声音
        basic.SoundManager.instance.playEffect("sound_btn_mp3");
        //判断显示
        if (this.game_type == 0) {
            //Comm_ebg.instance.sendSocket({ "type": "callDealer" });
        }
        else if (this.game_type == 1) {
            //Comm_nn.instance.sendSocket({ "type": "callDealer" });
        }
        else if (this.game_type == 2) {
            //Comm_sg.instance.sendSocket({ "type": "callDealer" });
        }
    };
    //退出按钮
    Panel_UpZhuang.prototype.onCloseBtn = function (e) {
        //播放声音
        basic.SoundManager.instance.playEffect("sound_btn_mp3");
        //退出设置
        this.funExit();
    };
    return Panel_UpZhuang;
}(basic.PanelBase));
__reflect(Panel_UpZhuang.prototype, "Panel_UpZhuang");
//显示条定义
var UpZhuangItem = (function (_super) {
    __extends(UpZhuangItem, _super);
    function UpZhuangItem() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    //初始化界面
    UpZhuangItem.prototype.dataChanged = function () {
        _super.prototype.dataChanged.call(this);
        //显示头像
        this.head.show(this.data.headImgURL);
        //显示文本
        this.txt_gold.text = this.data.gold;
        this.txt_name.text = this.data.nickName;
        //判断显示
        this.img_ranking.source = "icon_g_upzhuang" + Math.min(4, this.data.ranking).toString() + "_png";
    };
    return UpZhuangItem;
}(eui.ItemRenderer));
__reflect(UpZhuangItem.prototype, "UpZhuangItem");
//# sourceMappingURL=Panel_UpZhuang.js.map