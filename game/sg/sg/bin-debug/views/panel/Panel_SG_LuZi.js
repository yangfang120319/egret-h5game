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
var Panel_SG_LuZi = (function (_super) {
    __extends(Panel_SG_LuZi, _super);
    //定义界面
    function Panel_SG_LuZi() {
        var _this = _super.call(this, basic.dialogEffect.Scale, {
            withFade: true,
            ease: egret.Ease.backOut
        }, basic.dialogEffect.Scale, { withFade: true, ease: egret.Ease.backIn }) || this;
        _this.arr_table0 = [];
        _this.arr_table1 = [];
        _this.arr_table2 = [];
        _this.arr_table3 = [];
        _this.arr_table4 = [];
        _this.arr_zhuang = [];
        return _this;
    }
    Object.defineProperty(Panel_SG_LuZi, "instance", {
        get: function () {
            if (this._instance == undefined) {
                this._instance = new Panel_SG_LuZi();
            }
            return this._instance;
        },
        enumerable: true,
        configurable: true
    });
    //皮肤设置
    Panel_SG_LuZi.prototype.init = function () {
        this.skinName = Panel_SG_LuZiSkin;
    };
    //初始化界面
    Panel_SG_LuZi.prototype.createChildren = function () {
        _super.prototype.createChildren.call(this);
        //数据赋值
        for (var i = 0; i < 8; i++) {
            //定义变量
            var com_table0 = this["com_table0_" + i];
            var com_table1 = this["com_table1_" + i];
            var com_table2 = this["com_table2_" + i];
            var com_table3 = this["com_table3_" + i];
            var com_table4 = this["com_table4_" + i];
            var com_zhuang = this["com_zhuang_" + i];
            //数据赋值
            this.arr_table0[i] = com_table0;
            this.arr_table1[i] = com_table1;
            this.arr_table2[i] = com_table2;
            this.arr_table3[i] = com_table3;
            this.arr_table4[i] = com_table4;
            this.arr_zhuang[i] = com_zhuang;
            this.arr_table0[i].visible = false;
            this.arr_table1[i].visible = false;
            this.arr_table2[i].visible = false;
            this.arr_table3[i].visible = false;
            this.arr_table4[i].visible = false;
            this.arr_zhuang[i].visible = false;
        }
        //注册按钮
        basic.Dispatcher.addListener(EventNames.SG_HISTORY, this.onShowDetail, this);
        this.btn_close.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onCloseBtn, this);
    };
    //显示界面
    Panel_SG_LuZi.prototype.show = function (callback) {
        if (callback === void 0) { callback = null; }
        //数据赋值
        this._callback = callback;
        //显示界面
        this.popup(this.funExit.bind(this));
        //发送消息
        Comm_sg.instance.sendSocket({ "type": "history" });
    };
    //退出函数
    Panel_SG_LuZi.prototype.funExit = function () {
        //退出事件
        this.dealAction();
    };
    //显示内容界面
    Panel_SG_LuZi.prototype.onShowDetail = function (e) {
        //隐藏界面
        for (var i = 0; i < 8; i++) {
            if (i < e.data.historys.length) {
                this.arr_table0[i].visible = true;
                this.arr_table1[i].visible = true;
                this.arr_table2[i].visible = true;
                this.arr_table3[i].visible = true;
                this.arr_table4[i].visible = true;
                this.arr_zhuang[i].visible = true;
                if (e.data.historys[i][0] == 1) {
                    this.arr_table0[i].currentState = "1";
                }
                else if (e.data.historys[i][0] == -1) {
                    this.arr_table0[i].currentState = "0";
                }
                else if (e.data.historys[i][0] == 0) {
                    this.arr_table0[i].currentState = "2";
                }
                if (e.data.historys[i][1] == 1) {
                    this.arr_table1[i].currentState = "1";
                }
                else if (e.data.historys[i][1] == -1) {
                    this.arr_table1[i].currentState = "0";
                }
                else if (e.data.historys[i][1] == 0) {
                    this.arr_table1[i].currentState = "2";
                }
                if (e.data.historys[i][2] == 1) {
                    this.arr_table2[i].currentState = "1";
                }
                else if (e.data.historys[i][2] == -1) {
                    this.arr_table2[i].currentState = "0";
                }
                else if (e.data.historys[i][2] == 0) {
                    this.arr_table2[i].currentState = "2";
                }
                if (e.data.historys[i][3] == 1) {
                    this.arr_table3[i].currentState = "1";
                }
                else if (e.data.historys[i][3] == -1) {
                    this.arr_table3[i].currentState = "0";
                }
                else if (e.data.historys[i][3] == 0) {
                    this.arr_table3[i].currentState = "2";
                }
                if (e.data.historys[i][4] == 1) {
                    this.arr_table4[i].currentState = "1";
                }
                else if (e.data.historys[i][4] == -1) {
                    this.arr_table4[i].currentState = "0";
                }
                else if (e.data.historys[i][4] == 0) {
                    this.arr_table4[i].currentState = "2";
                }
                if (e.data.historys[i][5] == 1) {
                    this.arr_zhuang[i].currentState = "1";
                }
                else if (e.data.historys[i][5] == -1) {
                    this.arr_zhuang[i].currentState = "0";
                }
                else if (e.data.historys[i][5] == 0) {
                    this.arr_zhuang[i].currentState = "2";
                }
            }
            else {
                this.arr_table0[i].visible = false;
                this.arr_table1[i].visible = false;
                this.arr_table2[i].visible = false;
                this.arr_table3[i].visible = false;
                this.arr_table4[i].visible = false;
                this.arr_zhuang[i].visible = false;
            }
        }
    };
    //退出按钮
    Panel_SG_LuZi.prototype.onCloseBtn = function (e) {
        //播放声音
        basic.SoundManager.instance.playEffect("sound_btn_mp3");
        //退出设置
        this.funExit();
    };
    return Panel_SG_LuZi;
}(basic.PanelBase));
__reflect(Panel_SG_LuZi.prototype, "Panel_SG_LuZi");
//# sourceMappingURL=Panel_SG_LuZi.js.map