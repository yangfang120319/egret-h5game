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
 * @游戏筹码
 *
 */
var Game_Chip = (function (_super) {
    __extends(Game_Chip, _super);
    //定义界面
    function Game_Chip() {
        var _this = _super.call(this) || this;
        //定义界面
        _this.skinName = Game_ChipSkin;
        return _this;
    }
    //初始界面
    Game_Chip.prototype.info = function (_pos, _gold, _type) {
        if (_type === void 0) { _type = 0; }
        //数据赋值
        this.chip_pos = _pos;
        this.chip_gold = _gold;
        this.chip_isshow = true;
        //显示界面
        if (_type == 0) {
            if (this.chip_gold == 1000) {
                this.txt_gold.text = this.chip_gold.toString();
            }
            else {
                this.txt_gold.text = GameData.assShowGold(this.chip_gold);
            }
            this.img_chip.source = "back_g_chip" + this.chip_gold.toString() + "_png";
        }
        else {
            this.txt_gold.text = "";
            this.img_chip.source = "back_g_chipsmall" + this.chip_gold.toString() + "_png";
        }
    };
    return Game_Chip;
}(eui.Component));
__reflect(Game_Chip.prototype, "Game_Chip");
//# sourceMappingURL=Game_Chip.js.map