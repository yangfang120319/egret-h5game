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
var Panel_EBG_ZouShi = (function (_super) {
    __extends(Panel_EBG_ZouShi, _super);
    //定义界面
    function Panel_EBG_ZouShi() {
        var _this = _super.call(this, basic.dialogEffect.Scale, {
            withFade: true,
            ease: egret.Ease.backOut
        }, basic.dialogEffect.Scale, { withFade: true, ease: egret.Ease.backIn }) || this;
        //定义变量
        _this.arr_table0 = [];
        _this.arr_table1 = [];
        _this.arr_table2 = [];
        _this.arr_zhuang = [];
        return _this;
    }
    Object.defineProperty(Panel_EBG_ZouShi, "instance", {
        get: function () {
            if (this._instance == undefined) {
                this._instance = new Panel_EBG_ZouShi();
            }
            return this._instance;
        },
        enumerable: true,
        configurable: true
    });
    //皮肤设置
    Panel_EBG_ZouShi.prototype.init = function () {
        this.skinName = Panel_EBG_ZouShiSkin;
    };
    //初始化界面
    Panel_EBG_ZouShi.prototype.createChildren = function () {
        _super.prototype.createChildren.call(this);
        //数据赋值
        for (var i = 0; i < 8; i++) {
            //定义变量
            var com_table0 = this["com_table0_" + i];
            var com_table1 = this["com_table1_" + i];
            var com_table2 = this["com_table2_" + i];
            var com_zhuang = this["com_zhuang_" + i];
            //数据赋值
            this.arr_table0[i] = com_table0;
            this.arr_table1[i] = com_table1;
            this.arr_table2[i] = com_table2;
            this.arr_zhuang[i] = com_zhuang;
            this.arr_table0[i].visible = false;
            this.arr_table1[i].visible = false;
            this.arr_table2[i].visible = false;
            this.arr_zhuang[i].visible = false;
        }
        //注册按钮
        basic.Dispatcher.addListener(EventNames.EBG_HISTORY, this.onShowDetail, this);
    };
    //显示界面
    Panel_EBG_ZouShi.prototype.show = function (callback) {
        if (callback === void 0) { callback = null; }
        //数据赋值
        this._callback = callback;
        basic.PopUpManager.modalMaskAlpha = 0.6;
        //显示界面
        this.popup(this.funExit.bind(this));
        //发送消息
        Comm_ebg.instance.sendSocket({ "type": "history" });
    };
    //显示内容界面
    Panel_EBG_ZouShi.prototype.onShowDetail = function (e) {
        //隐藏界面
        for (var i = 0; i < 8; i++) {
            if (i < e.data.historys.length) {
                this.arr_table0[i].visible = true;
                this.arr_table1[i].visible = true;
                this.arr_table2[i].visible = true;
                this.arr_zhuang[i].visible = true;
                if (e.data.historys[i][0] == true) {
                    this.arr_table0[i].currentState = "1";
                }
                else {
                    this.arr_table0[i].currentState = "0";
                }
                if (e.data.historys[i][1] == true) {
                    this.arr_table1[i].currentState = "1";
                }
                else {
                    this.arr_table1[i].currentState = "0";
                }
                if (e.data.historys[i][2] == true) {
                    this.arr_table2[i].currentState = "1";
                }
                else {
                    this.arr_table2[i].currentState = "0";
                }
                if (e.data.historys[i][3] == true) {
                    this.arr_zhuang[i].currentState = "1";
                }
                else {
                    this.arr_zhuang[i].currentState = "0";
                }
            }
            else {
                this.arr_table0[i].visible = false;
                this.arr_table1[i].visible = false;
                this.arr_table2[i].visible = false;
                this.arr_zhuang[i].visible = false;
            }
        }
    };
    //退出按钮
    Panel_EBG_ZouShi.prototype.funExit = function () {
        //播放声音
        basic.SoundManager.instance.playEffect("sound_btn_mp3");
        //退出界面
        this.dealAction();
    };
    return Panel_EBG_ZouShi;
}(basic.PanelBase));
__reflect(Panel_EBG_ZouShi.prototype, "Panel_EBG_ZouShi");
