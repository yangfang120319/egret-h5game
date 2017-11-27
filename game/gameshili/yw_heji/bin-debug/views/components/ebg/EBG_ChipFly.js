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
var EBG_ChipFly = (function (_super) {
    __extends(EBG_ChipFly, _super);
    function EBG_ChipFly() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        //缓动变量
        _this.chip_num = 0;
        _this.chip_img = [];
        _this._tween_x = null;
        _this._tween_y = null;
        _this._tween_alpha = null;
        _this._tween_scaleX = null;
        _this._tween_scaleY = null;
        _this.move_to_x = [20, 240, 460];
        _this.move_to_y = [140, 330, 140];
        _this.move_width = 160;
        _this.move_height = 180;
        return _this;
    }
    //初始化
    EBG_ChipFly.prototype.createChildren = function () {
        _super.prototype.createChildren.call(this);
    };
    //初始化筹码
    EBG_ChipFly.prototype.info = function () {
        //初始化筹码
        for (var i = 0; i < 3; i++) {
            for (var j = 0; j < GameData.EBG_Poker_Table_InfoChip[i].length; j++) {
                //显示筹码
                this.showChip(String(Math.floor(GameData.EBG_Poker_Table_InfoChip[i][j] / 10000)).length - 1, i);
            }
        }
    };
    //清除界面
    EBG_ChipFly.prototype.clean = function () {
        //移除筹码
        for (var i = 0; i < this.chip_num; i++) {
            this.removeChild(this.chip_img[i]);
        }
        //清除数据
        this.chip_num = 0;
        this.chip_img = [];
    };
    //发送筹码
    EBG_ChipFly.prototype.sendChip = function (_type, _chiptype, _table) {
        //定义变量
        var img_chip = new eui.Image();
        var move_x = this.move_to_x[_table] + Math.random() * (this.move_width - 45);
        var move_y = this.move_to_y[_table] + Math.random() * (this.move_height - 45);
        //定义筹码
        img_chip.source = "icon_smallchip" + _chiptype + "_png";
        //判断显示
        if (_type == 0) {
            //定义位置
            img_chip.y = 553;
            img_chip.scaleX = 1.65;
            img_chip.scaleY = 1.65;
            img_chip.x = 137 + 84 * _chiptype;
        }
        else if (_type == 1) {
            img_chip.x = 586;
            img_chip.y = (175 - 45) / 2 - 20;
        }
        //显示筹码
        this.chip_img[this.chip_num] = img_chip;
        this.addChild(this.chip_img[this.chip_num]);
        //判断显示动画
        if (this.chip_img[this.chip_num].scaleX > 1) {
            this._tween_scaleX = egret.Tween.get(this.chip_img[this.chip_num]).wait(80).to({ scaleX: 1 }, 300, egret.Ease.circOut);
            this._tween_scaleY = egret.Tween.get(this.chip_img[this.chip_num]).wait(80).to({ scaleY: 1 }, 300, egret.Ease.circOut);
        }
        this._tween_x = egret.Tween.get(this.chip_img[this.chip_num]).wait(80).to({ x: move_x }, 800, egret.Ease.circOut);
        this._tween_y = egret.Tween.get(this.chip_img[this.chip_num]).wait(80).to({ y: move_y }, 800, egret.Ease.circOut);
        //数据赋值
        this.chip_num += 1;
    };
    //显示筹码
    EBG_ChipFly.prototype.showChip = function (_chiptype, _table) {
        //定义变量
        var img_chip = new eui.Image();
        var move_x = this.move_to_x[_table] + Math.random() * (this.move_width - 45);
        var move_y = this.move_to_y[_table] + Math.random() * (this.move_height - 45);
        //定义筹码
        img_chip.source = "icon_smallchip" + _chiptype + "_png";
        //定义筹码位置
        img_chip.x = move_x;
        img_chip.y = move_y;
        //显示筹码
        this.chip_img[this.chip_num] = img_chip;
        this.addChild(this.chip_img[this.chip_num]);
        this.chip_num += 1;
    };
    return EBG_ChipFly;
}(eui.Component));
__reflect(EBG_ChipFly.prototype, "EBG_ChipFly");
