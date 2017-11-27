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
 * @游戏-筹码飞行
 *
 */
var Game_ChipFly = (function (_super) {
    __extends(Game_ChipFly, _super);
    function Game_ChipFly() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.start_x = [];
        _this.start_y = [];
        _this.over_x = [];
        _this.over_y = [];
        _this.over_with = [];
        _this.over_height = [];
        //筹码数据
        _this.chip_num = 0;
        _this.chip_detail = [];
        return _this;
    }
    //初始化
    Game_ChipFly.prototype.createChildren = function () {
        _super.prototype.createChildren.call(this);
        //注册事件
        basic.Dispatcher.addListener(EventNames.GAME_SHOW_USERYAZHU, this.onShowUserYaZhu, this);
        basic.Dispatcher.addListener(EventNames.GAME_SHOW_OHTERYAZHU, this.onShowOtherYaZhu, this);
    };
    //初始化
    Game_ChipFly.prototype.info = function (_rate, _start_x, _start_y, over_x, _over_y, _over_width, _over_height) {
        //数据赋值
        this.rate_zoom = _rate;
        this.start_x = _start_x;
        this.start_y = _start_y;
        this.over_x = over_x;
        this.over_y = _over_y;
        this.over_with = _over_width;
        this.over_height = _over_height;
    };
    //初始化筹码
    Game_ChipFly.prototype.infoChip = function (_data) {
        //显示筹码
        for (var i = 0; i < _data.length; i++) {
            for (var j = 0; j < _data[i].length; j++) {
                //定义变量
                var chip = new Game_Chip();
                //初始化
                chip.scaleX = 0.25;
                chip.scaleY = 0.25;
                chip.info(i, _data[i][j], 1);
                chip.x = this.over_x[i] + Math.random() * (this.over_with[i] - 32);
                chip.y = this.over_y[i] + Math.random() * (this.over_height[i] - 32);
                //显示界面
                this.chip_detail[this.chip_num] = chip;
                this.addChild(this.chip_detail[this.chip_num]);
                //数据赋值
                this.chip_num += 1;
            }
        }
    };
    //清除界面
    Game_ChipFly.prototype.clean = function () {
        //清除界面
        for (var i = 0; i < this.chip_num; i++) {
            //判断显示
            if (this.chip_detail[i].chip_isshow == true) {
                this.chip_detail[i].chip_isshow = false;
                this.removeChild(this.chip_detail[i]);
            }
        }
        this.chip_num = 0;
        this.chip_detail = [];
    };
    //用户压住
    Game_ChipFly.prototype.onShowUserYaZhu = function (e) {
        //定义变量
        var chip = new Game_Chip();
        //初始化
        chip.scaleX = this.rate_zoom;
        chip.scaleY = this.rate_zoom;
        chip.info(e.data.pos, e.data.gold, 1);
        chip.x = this.start_x[GameData.Game_Chip_Now];
        chip.y = this.start_y[GameData.Game_Chip_Now];
        //显示界面
        this.chip_detail[this.chip_num] = chip;
        this.addChild(this.chip_detail[this.chip_num]);
        //播放声音
        basic.SoundManager.instance.playEffect("sound_g_yazhu_mp3");
        //开始动画
        var _tween_scaleX = egret.Tween.get(this.chip_detail[this.chip_num]).to({ scaleX: 0.25 }, 500);
        var _tween_scaleY = egret.Tween.get(this.chip_detail[this.chip_num]).to({ scaleY: 0.25 }, 500);
        var _tween_x = egret.Tween.get(this.chip_detail[this.chip_num]).
            to({ x: this.over_x[e.data.pos] + Math.random() * (this.over_with[e.data.pos] - 32) }, 500);
        var _tween_y = egret.Tween.get(this.chip_detail[this.chip_num]).
            to({ y: this.over_y[e.data.pos] + Math.random() * (this.over_height[e.data.pos] - 32) }, 500);
        //数据赋值
        this.chip_num += 1;
    };
    //其他压住
    Game_ChipFly.prototype.onShowOtherYaZhu = function (e) {
        //定义变量
        var chip = new Game_Chip();
        //初始化
        chip.y = -50;
        chip.scaleX = this.rate_zoom;
        chip.scaleY = this.rate_zoom;
        chip.info(e.data.pos, e.data.gold, 1);
        chip.x = basic.StageProxy.width + 50;
        //显示界面
        this.chip_detail[this.chip_num] = chip;
        this.addChild(this.chip_detail[this.chip_num]);
        //开始动画
        var _tween_scaleX = egret.Tween.get(this.chip_detail[this.chip_num]).to({ scaleX: 0.25 }, 500);
        var _tween_scaleY = egret.Tween.get(this.chip_detail[this.chip_num]).to({ scaleY: 0.25 }, 500);
        var _tween_x = egret.Tween.get(this.chip_detail[this.chip_num]).
            to({ x: this.over_x[e.data.pos] + Math.random() * (this.over_with[e.data.pos] - 32) }, 500);
        var _tween_y = egret.Tween.get(this.chip_detail[this.chip_num]).
            to({ y: this.over_y[e.data.pos] + Math.random() * (this.over_height[e.data.pos] - 32) }, 500);
        //播发器声音
        basic.SoundManager.instance.playEffect("sound_g_yazhu_mp3");
        //数据赋值
        this.chip_num += 1;
    };
    return Game_ChipFly;
}(eui.Component));
__reflect(Game_ChipFly.prototype, "Game_ChipFly");
//# sourceMappingURL=Game_ChipFly.js.map