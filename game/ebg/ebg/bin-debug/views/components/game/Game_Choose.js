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
 * @游戏-选择
 *
 */
var Game_Choose = (function (_super) {
    __extends(Game_Choose, _super);
    function Game_Choose() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.btn_choose = [];
        _this._tween_alpha = null;
        _this.btn_x = [];
        return _this;
    }
    //初始化
    Game_Choose.prototype.createChildren = function () {
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
    };
    //显示位置
    Game_Choose.prototype.showPlace = function (_type, _show_width) {
        //定义变量
        var jiange_width;
        //数据赋值
        this.game_type = _type;
        this.width = _show_width;
        jiange_width = (this.width - 8 - 162 * 4) / 3;
        //显示界面
        for (var i = 0; i < 4; i++) {
            this.btn_choose[i].x = 4 + i * (162 + jiange_width);
            this.btn_x[i] = this.btn_choose[i].x + 17;
        }
        this.btn_y = this.btn_choose[0].y + 17;
    };
    //初始化
    Game_Choose.prototype.info = function () {
        GameData.Game_Chip_Now = 0;
        //判断显示位置
        this.img_choose0.x = this.btn_choose[GameData.Game_Chip_Now].x - 11;
        this.img_choose0.y = this.btn_choose[GameData.Game_Chip_Now].y - 13;
        this.img_choose1.x = this.btn_choose[GameData.Game_Chip_Now].x - 11;
        this.img_choose1.y = this.btn_choose[GameData.Game_Chip_Now].y - 13;
        //显示文本
        for (var i = 0; i < 4; i++) {
            if (GameData.Game_Chip_Gold[i] == 1000) {
                this.btn_choose[i].label = GameData.Game_Chip_Gold[i].toString();
            }
            else {
                this.btn_choose[i].label = GameData.assShowGold(GameData.Game_Chip_Gold[i]);
            }
            this.btn_choose[i].icon = "back_g_chip" + GameData.Game_Chip_Gold[i].toString() + "_png";
        }
    };
    //清除
    Game_Choose.prototype.clean = function () {
        if (this._tween_alpha) {
            this._tween_alpha.setPaused(true);
            this._tween_alpha = null;
        }
    };
    //选择按钮
    Game_Choose.prototype.onChooseBtn = function (e) {
        //定义变量
        var btnnum = Number(e.target.name);
        //数据赋值
        GameData.Game_Chip_Now = btnnum;
        //保存数据
        GameData.saveNowChip();
        //判断显示位置
        this.img_choose0.x = this.btn_choose[btnnum].x - 11;
        this.img_choose0.y = this.btn_choose[btnnum].y - 13;
        this.img_choose1.x = this.btn_choose[btnnum].x - 11;
        this.img_choose1.y = this.btn_choose[btnnum].y - 13;
        //播放声音
        basic.SoundManager.instance.playEffect("sound_btn_mp3");
    };
    return Game_Choose;
}(eui.Component));
__reflect(Game_Choose.prototype, "Game_Choose");
//# sourceMappingURL=Game_Choose.js.map