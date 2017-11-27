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
 * @选择筹码
 *
 */
var Panel_ChooseChip = (function (_super) {
    __extends(Panel_ChooseChip, _super);
    //定义界面
    function Panel_ChooseChip() {
        var _this = _super.call(this, basic.dialogEffect.Scale, {
            withFade: true,
            ease: egret.Ease.backOut
        }, basic.dialogEffect.Scale, { withFade: true, ease: egret.Ease.backIn }) || this;
        _this.img_choose = [];
        _this.btn_choose = [];
        //数据赋值
        _this.now_choose_chip = [];
        return _this;
    }
    Object.defineProperty(Panel_ChooseChip, "instance", {
        get: function () {
            if (this._instance == undefined) {
                this._instance = new Panel_ChooseChip();
            }
            return this._instance;
        },
        enumerable: true,
        configurable: true
    });
    //皮肤设置
    Panel_ChooseChip.prototype.init = function () {
        this.skinName = Panel_ChooseChipSkin;
    };
    //初始化界面
    Panel_ChooseChip.prototype.createChildren = function () {
        _super.prototype.createChildren.call(this);
        //判断显示
        if (basic.StageProxy.width < 960) {
            //显示界面
            var ratezoom = 0.8 + 0.2 * (basic.StageProxy.width - 830) / 130;
            //显示界面
            this.width = 883 * ratezoom;
            this.height = 490 * ratezoom;
            this.g_detail.scaleX = ratezoom;
            this.g_detail.scaleY = ratezoom;
            this.g_detail.width = 883 * ratezoom;
            this.g_detail.height = 490 * ratezoom;
        }
        //注册按钮
        this.btn_no.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onNoBtn, this);
        this.btn_yes.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onYesBtn, this);
    };
    //显示界面
    Panel_ChooseChip.prototype.show = function (_type, callback) {
        if (callback === void 0) { callback = null; }
        //数据赋值
        this._callback = callback;
        //数据赋值
        for (var i = 0; i < 8; i++) {
            //定义变量
            var now_img = this["img_choose" + i];
            //数据赋值
            this.img_choose[i] = now_img;
            this.img_choose[i].visible = false;
        }
        for (var j = 0; j < 9; j++) {
            //定义变量
            var now_btn = this["btn_choose" + j];
            //数据赋值
            this.btn_choose[j] = now_btn;
            //注册按钮
            this.btn_choose[j].addEventListener(egret.TouchEvent.TOUCH_TAP, this.onChooseBtn, this);
        }
        //显示界面
        this.startShowNowChip();
        //显示背景
        if (_type == 1) {
            this.img_back.source = "back_g_choosechip1_png";
        }
        else {
            this.img_back.source = "back_g_choosechip0_png";
        }
        //显示界面
        this.popup(this.funExit.bind(this));
    };
    //开始显示界面
    Panel_ChooseChip.prototype.startShowNowChip = function () {
        //显示界面
        GameData.Game_Chip_Gold = [100, 500, 1000, 2500];
        this.txt_tips.text = "";
        for (var i = 0; i < 4; i++) {
            for (var j = 0; j < 9; j++) {
                if (GameData.Game_Chip_Gold[i] == GameData.Game_Chip[j]) {
                    //显示
                    console.log(i);
                    this.img_choose[i].visible = true;
                    this.img_choose[i + 4].visible = true;
                    this.img_choose[i].x = this.btn_choose[j].x - 17;
                    this.img_choose[i].y = this.btn_choose[j].y - 18;
                    this.img_choose[i + 4].x = this.btn_choose[j].x - 17;
                    this.img_choose[i + 4].y = this.btn_choose[j].y - 18;
                    this.now_choose_chip[i] = GameData.Game_Chip_Gold[i];
                    break;
                }
            }
        }
    };
    //退出函数
    Panel_ChooseChip.prototype.funExit = function () {
        //注销
        for (var j = 0; j < 9; j++) {
            //注销按钮
            this.btn_choose[j].removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onChooseBtn, this);
        }
        //退出事件
        this.dealAction();
    };
    //取消按钮
    Panel_ChooseChip.prototype.onNoBtn = function (e) {
        //播放声音
        basic.SoundManager.instance.playEffect("sound_btn_mp3");
        //退出设置
        this.funExit();
    };
    //确定按钮
    Panel_ChooseChip.prototype.onYesBtn = function (e) {
        //播放声音
        basic.SoundManager.instance.playEffect("sound_btn_mp3");
        //定义变量
        var is_all_choose = true;
        //判断显示
        for (var i = 0; i < 4; i++) {
            if (this.now_choose_chip[i] == 0) {
                is_all_choose = false;
                break;
            }
        }
        //判断显示
        if (is_all_choose == true) {
            //定义变量
            var now_choose_chip = [];
            //数据赋值
            for (var k = 0; k < 9; k++) {
                //定义变量
                var is_choose = false;
                //数据赋值
                for (var p = 0; p < 4; p++) {
                    if (this.now_choose_chip[p] == GameData.Game_Chip[k]) {
                        is_choose = true;
                        break;
                    }
                }
                //判断赋值
                if (is_choose == true) {
                    //数据赋值
                    now_choose_chip[now_choose_chip.length] = GameData.Game_Chip[k];
                }
            }
            //数据赋值
            GameData.Game_Chip_Gold = now_choose_chip;
            //保存数据
            GameData.saveChooseChip();
            //退出界面
            this.funExit();
        }
        else {
            //显示提示
            this.txt_tips.text = "请选择4个筹码";
        }
    };
    //选择按钮
    Panel_ChooseChip.prototype.onChooseBtn = function (e) {
        //定义变量
        var is_choose = false;
        var btn_num = Number(e.target.name);
        //数据赋值
        for (var i = 0; i < 4; i++) {
            if (this.now_choose_chip[i] == GameData.Game_Chip[btn_num]) {
                //数据赋值
                is_choose = true;
                this.now_choose_chip[i] = 0;
                this.img_choose[i].visible = false;
                this.img_choose[i + 4].visible = false;
                break;
            }
        }
        //判断显示
        if (is_choose == false) {
            //数据赋值
            for (var j = 0; j < 4; j++) {
                if (this.now_choose_chip[j] == 0) {
                    //数据赋值
                    this.img_choose[j].visible = true;
                    this.img_choose[j + 4].visible = true;
                    this.img_choose[j].x = this.btn_choose[btn_num].x - 17;
                    this.img_choose[j].y = this.btn_choose[btn_num].y - 18;
                    this.img_choose[j + 4].x = this.btn_choose[btn_num].x - 17;
                    this.img_choose[j + 4].y = this.btn_choose[btn_num].y - 18;
                    this.now_choose_chip[j] = GameData.Game_Chip[btn_num];
                    break;
                }
            }
        }
    };
    return Panel_ChooseChip;
}(basic.PanelBase));
__reflect(Panel_ChooseChip.prototype, "Panel_ChooseChip");
//# sourceMappingURL=Panel_ChooseChip.js.map