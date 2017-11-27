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
 * @夜市场-选择
 *
 */
var YSC_Choose = (function (_super) {
    __extends(YSC_Choose, _super);
    function YSC_Choose() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.btn_choose = [];
        return _this;
    }
    //初始化
    YSC_Choose.prototype.createChildren = function () {
        _super.prototype.createChildren.call(this);
        //数据赋值
        for (var i = 0; i < 4; i++) {
            //定义变量
            var btn = this["btn_choose" + i];
            //数据赋值
            this.btn_choose[i] = btn;
            //注册按钮
            this.btn_choose[i].addEventListener(egret.TouchEvent.TOUCH_TAP, this.onChooseBtn, this);
        }
        //注册按钮
        this.btn_choosechip.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onChooseChipBtn, this);
    };
    //初始化
    YSC_Choose.prototype.info = function () {
        //console.info(33);
        GameData.Game_Chip_Now = 1;
        //判断显示位置
        this.img_choose.x = this.btn_choose[GameData.Game_Chip_Now].x - 14;
        this.img_choose.y = this.btn_choose[GameData.Game_Chip_Now].y - 15;
        this.img_choose1.x = this.btn_choose[GameData.Game_Chip_Now].x - 14;
        this.img_choose1.y = this.btn_choose[GameData.Game_Chip_Now].y - 15;
        GameData.Game_Chip_Gold = [100, 500, 1000, 2500];
        //显示文本
        for (var i = 0; i < 4; i++) {
            if (GameData.Game_Chip_Gold[i] == 1000) {
                this.btn_choose[i].label = GameData.Game_Chip_Gold[i].toString();
            }
            else {
                this.btn_choose[i].label = GameData.assShowGold(GameData.Game_Chip_Gold[i]);
            }
            this.btn_choose[i].icon = "back_ysc_chip" + GameData.Game_Chip_Gold[i].toString() + "_png";
        }
    };
    //选择按钮
    YSC_Choose.prototype.onChooseBtn = function (e) {
        //定义变量
        var btnnum = Number(e.target.name);
        //数据赋值
        GameData.Game_Chip_Now = btnnum;
        //保存数据
        GameData.saveNowChip();
        //判断显示位置
        this.img_choose.x = this.btn_choose[btnnum].x - 14;
        this.img_choose.y = this.btn_choose[btnnum].y - 15;
        this.img_choose1.x = this.btn_choose[btnnum].x - 14;
        this.img_choose1.y = this.btn_choose[btnnum].y - 15;
        //播放声音
        // basic.SoundManager.instance.playEffect("sound_btn_mp3");
    };
    //选择筹码按钮
    YSC_Choose.prototype.onChooseChipBtn = function (e) {
        //播放声音
        //basic.SoundManager.instance.playEffect("sound_btn_mp3");
        var _this = this;
        //显示界面
        Panel_ChooseChip.instance.show(0, function () {
            //显示界面
            //GameData.Game_Chip_Gold=[100,500,1000,2500];
            for (var i = 0; i < 4; i++) {
                if (GameData.Game_Chip_Gold[i] == 1000) {
                    _this.btn_choose[i].label = GameData.Game_Chip_Gold[i].toString();
                }
                else {
                    _this.btn_choose[i].label = GameData.assShowGold(GameData.Game_Chip_Gold[i]);
                }
                _this.btn_choose[i].icon = "back_ysc_chip" + GameData.Game_Chip_Gold[i].toString() + "_png";
            }
        });
    };
    return YSC_Choose;
}(eui.Component));
__reflect(YSC_Choose.prototype, "YSC_Choose");
//# sourceMappingURL=YSC_Choose.js.map