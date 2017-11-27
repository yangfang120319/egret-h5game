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
var Panel_MLXYYH_ChooseChip = (function (_super) {
    __extends(Panel_MLXYYH_ChooseChip, _super);
    //定义界面
    function Panel_MLXYYH_ChooseChip() {
        var _this = _super.call(this, basic.dialogEffect.Scale, {
            withFade: true,
            ease: egret.Ease.backOut
        }, basic.dialogEffect.Scale, { withFade: true, ease: egret.Ease.backIn }) || this;
        _this.btn_choose = [];
        //数据赋值
        _this.now_choose_chip = [];
        return _this;
    }
    Object.defineProperty(Panel_MLXYYH_ChooseChip, "instance", {
        get: function () {
            if (this._instance == undefined) {
                this._instance = new Panel_MLXYYH_ChooseChip();
            }
            return this._instance;
        },
        enumerable: true,
        configurable: true
    });
    //皮肤设置
    Panel_MLXYYH_ChooseChip.prototype.init = function () {
        this.skinName = Panel_MLXYYH_ChooseChipSkin;
    };
    //初始化界面
    Panel_MLXYYH_ChooseChip.prototype.createChildren = function () {
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
    };
    //显示界面
    Panel_MLXYYH_ChooseChip.prototype.show = function (callback) {
        if (callback === void 0) { callback = null; }
        //数据赋值
        this._callback = callback;
        //数据赋值
        for (var j = 0; j < 9; j++) {
            //定义变量
            var now_btn = this["btn_choose" + j];
            //数据赋值
            this.btn_choose[j] = now_btn;
            //注册按钮
            this.btn_choose[j].addEventListener(egret.TouchEvent.TOUCH_TAP, this.onChooseBtn, this);
        }
        //显示界面
        for (var i = 0; i < 9; i++) {
            if (GameData.MLXYYH_BeiLv == GameData.Game_Chip[i]) {
                this.img_choose.visible = true;
                this.img_choose.x = this.btn_choose[i].x - 17;
                this.img_choose.y = this.btn_choose[i].y - 18;
                break;
            }
        }
        //显示界面
        this.popup(this.funExit.bind(this));
    };
    //退出函数
    Panel_MLXYYH_ChooseChip.prototype.funExit = function () {
        //注销
        for (var j = 0; j < 9; j++) {
            //注销按钮
            this.btn_choose[j].removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onChooseBtn, this);
        }
        //退出事件
        this.dealAction();
    };
    //选择按钮
    Panel_MLXYYH_ChooseChip.prototype.onChooseBtn = function (e) {
        //定义变量
        var btn_num = Number(e.target.name);
        //播放声音
        basic.SoundManager.instance.playEffect("sound_btn_mp3");
        //数据赋值
        GameData.MLXYYH_BeiLv = GameData.Game_Chip[btn_num];
        //退出界面
        this.funExit();
    };
    return Panel_MLXYYH_ChooseChip;
}(basic.PanelBase));
__reflect(Panel_MLXYYH_ChooseChip.prototype, "Panel_MLXYYH_ChooseChip");
//# sourceMappingURL=Panel_MLXYYH_ChooseChip.js.map