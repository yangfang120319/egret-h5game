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
 * @夜市场-筹码飞行
 *
 */
var YSC_ChipFly = (function (_super) {
    __extends(YSC_ChipFly, _super);
    function YSC_ChipFly() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.chip_x = [];
        _this.chip_y = [];
        _this.yazhu_x = [];
        _this.yazhu_y = [];
        _this.yazhu_width = [];
        _this.yazhu_height = [];
        //筹码数据
        _this.chip_num = 0;
        _this.chip_detail = [];
        return _this;
    }
    //初始化
    YSC_ChipFly.prototype.createChildren = function () {
        _super.prototype.createChildren.call(this);
        //注册事件
        basic.Dispatcher.addListener(EventNames.YSC_YAZHU_USER, this.onYaZhuUser, this);
        basic.Dispatcher.addListener(EventNames.YSC_YAZHU_OTHER, this.onYaZhuOther, this);
        basic.Dispatcher.addListener(EventNames.YSC_QIANGZHU_USER, this.onQiangZhuUser, this);
        basic.Dispatcher.addListener(EventNames.YSC_QIANGZHU_OTHER, this.onQiangZhuOther, this);
    };
    //初始化界面
    YSC_ChipFly.prototype.info = function (_rate, _play_x, _play_y, _choose_x, _choose_y, _usergold_x, _usergold_y) {
        //数据赋值
        this.rate_zoom = _rate;
        this.usergold_x = _usergold_x;
        this.usergold_y = _usergold_y;
        this.yazhu_width[0] = 222 * this.rate_zoom;
        this.yazhu_width[1] = 222 * this.rate_zoom;
        this.yazhu_width[2] = 222 * this.rate_zoom;
        this.yazhu_width[3] = 222 * this.rate_zoom;
        this.yazhu_height[0] = 210 * this.rate_zoom;
        this.yazhu_height[1] = 210 * this.rate_zoom;
        this.yazhu_height[2] = 210 * this.rate_zoom;
        this.yazhu_height[3] = 210 * this.rate_zoom;
        this.yazhu_x[0] = _play_x + 64 * this.rate_zoom;
        this.yazhu_x[1] = _play_x + 319 * this.rate_zoom;
        this.yazhu_x[2] = _play_x + 319 * this.rate_zoom;
        this.yazhu_x[3] = _play_x + 64 * this.rate_zoom;
        this.yazhu_y[0] = _play_y + 46 * this.rate_zoom;
        this.yazhu_y[1] = _play_y + 56 * this.rate_zoom;
        this.yazhu_y[2] = _play_y + 291 * this.rate_zoom;
        this.yazhu_y[3] = _play_y + 291 * this.rate_zoom;
        this.chip_x[0] = _choose_x + 35.5 * this.rate_zoom;
        this.chip_x[1] = _choose_x + 215.5 * this.rate_zoom;
        this.chip_x[2] = _choose_x + 35.5 * this.rate_zoom;
        this.chip_x[3] = _choose_x + 215.5 * this.rate_zoom;
        this.chip_y[0] = _choose_y + 15.5 * this.rate_zoom;
        this.chip_y[1] = _choose_y + 15.5 * this.rate_zoom;
        this.chip_y[2] = _choose_y + 160.5 * this.rate_zoom;
        this.chip_y[3] = _choose_y + 160.5 * this.rate_zoom;
    };
    //清除界面
    YSC_ChipFly.prototype.clean = function () {
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
    YSC_ChipFly.prototype.onYaZhuUser = function (e) {
        //定义变量
        var chip = new Game_Chip();
        //初始化
        chip.scaleX = this.rate_zoom;
        chip.scaleY = this.rate_zoom;
        chip.info(e.data.pos, e.data.gold, 1);
        chip.x = this.chip_x[GameData.Game_Chip_Now];
        chip.y = this.chip_y[GameData.Game_Chip_Now];
        //显示界面
        this.chip_detail[this.chip_num] = chip;
        this.addChild(this.chip_detail[this.chip_num]);
        //开始动画
        var _tween_scaleX = egret.Tween.get(this.chip_detail[this.chip_num]).to({ scaleX: 0.25 }, 500);
        var _tween_scaleY = egret.Tween.get(this.chip_detail[this.chip_num]).to({ scaleY: 0.25 }, 500);
        var _tween_x = egret.Tween.get(this.chip_detail[this.chip_num]).
            to({ x: this.yazhu_x[e.data.pos] + Math.random() * (this.yazhu_width[e.data.pos] - 32) }, 500);
        var _tween_y = egret.Tween.get(this.chip_detail[this.chip_num]).
            to({ y: this.yazhu_y[e.data.pos] + Math.random() * (this.yazhu_height[e.data.pos] - 32) }, 500);
        //数据赋值
        this.chip_num += 1;
    };
    //其他用户压住
    YSC_ChipFly.prototype.onYaZhuOther = function (e) {
        //显示压住
        this.yaZhuOther(e.data.pos, e.data.gold);
    };
    //用户抢注
    YSC_ChipFly.prototype.onQiangZhuUser = function (e) {
        //抢注
        this.qiangZhu(e.data.pos, e.data.gold, 0);
    };
    //其他用户抢注
    YSC_ChipFly.prototype.onQiangZhuOther = function (e) {
        //抢注
        this.qiangZhu(e.data.pos, e.data.gold, 1);
    };
    //其他压住
    YSC_ChipFly.prototype.yaZhuOther = function (_pos, _gold) {
        //定义变量
        var chip = new Game_Chip();
        //初始化
        chip.y = -50;
        chip.x = -50;
        chip.info(_pos, _gold, 1);
        chip.scaleX = this.rate_zoom;
        chip.scaleY = this.rate_zoom;
        //显示界面
        this.chip_detail[this.chip_num] = chip;
        this.addChild(this.chip_detail[this.chip_num]);
        //开始动画
        var _tween_scaleX = egret.Tween.get(this.chip_detail[this.chip_num]).to({ scaleX: 0.25 }, 500);
        var _tween_scaleY = egret.Tween.get(this.chip_detail[this.chip_num]).to({ scaleY: 0.25 }, 500);
        var _tween_x = egret.Tween.get(this.chip_detail[this.chip_num]).
            to({ x: this.yazhu_x[_pos] + Math.random() * (this.yazhu_width[_pos] - 32) }, 500);
        var _tween_y = egret.Tween.get(this.chip_detail[this.chip_num]).
            to({ y: this.yazhu_y[_pos] + Math.random() * (this.yazhu_height[_pos] - 32) }, 500);
        //数据赋值
        this.chip_num += 1;
    };
    //压住函数
    YSC_ChipFly.prototype.yaZhu = function (_pos, _gold) {
        //定义变量
        var chip = new Game_Chip();
        //初始化
        chip.scaleX = 0.25;
        chip.scaleY = 0.25;
        chip.info(_pos, _gold, 1);
        chip.y = this.yazhu_y[_pos] + Math.random() * (this.yazhu_height[_pos] - 32);
        chip.x = this.yazhu_x[_pos] + Math.random() * (this.yazhu_width[_pos] - 32);
        //显示界面
        this.chip_detail[this.chip_num] = chip;
        this.addChild(this.chip_detail[this.chip_num]);
        //数据赋值
        this.chip_num += 1;
    };
    //抢注函数
    YSC_ChipFly.prototype.qiangZhu = function (_pos, _gold, _type) {
        //定义变量
        var max_gold = 0;
        var min_max_gold = 0;
        var now_gold = _gold;
        //数据赋值
        for (var i = 0; i < this.chip_num; i++) {
            if (this.chip_detail[i].chip_isshow == true && this.chip_detail[i].chip_pos == _pos) {
                if (this.chip_detail[i].chip_gold == now_gold) {
                    //隐藏筹码
                    this.removeChip(i, _type);
                    //数据赋值
                    now_gold = 0;
                    break;
                }
            }
        }
        //判断显示
        if (now_gold > 0) {
            //定义变量
            var remove_num = -1;
            //判断赋值
            for (var j = 0; j < this.chip_num; j++) {
                //判断显示
                if (this.chip_detail[j].chip_isshow == true && this.chip_detail[j].chip_pos == _pos && this.chip_detail[j].chip_gold > now_gold && this.chip_detail[j].chip_gold % now_gold == 0) {
                    remove_num = j;
                    break;
                }
            }
            //判断显示
            if (remove_num != -1) {
                //定义变量
                var add_num;
                var add_gold;
                //数据赋值
                add_gold = now_gold;
                add_num = Math.floor(this.chip_detail[remove_num].chip_gold / now_gold);
                //添加筹码
                for (var k = 0; k < add_num; k++) {
                    this.yaZhu(_pos, add_gold);
                }
                //移除筹码
                this.removeChip(remove_num, 1);
                //抢注函数
                this.qiangZhu(_pos, _gold, _type);
            }
            else {
                //定义变量
                var is_remove = false;
                //判断赋值
                for (var p = 0; p < this.chip_num; p++) {
                    //判断显示
                    if (this.chip_detail[p].chip_isshow == true && this.chip_detail[p].chip_pos == _pos && this.chip_detail[p].chip_gold < now_gold) {
                        //移除筹码
                        this.removeChip(p, _type);
                        //继续抢注
                        this.qiangZhu(_pos, now_gold - this.chip_detail[p].chip_gold, _type);
                        //数据赋值
                        is_remove = true;
                        break;
                    }
                }
                //判断显示
                if (is_remove == false) {
                    //定义变量
                    var remove_mingold = 0;
                    var remove_mingold_chipnum = -1;
                    //数据赋值
                    for (var q = 0; q < this.chip_num; q++) {
                        if (this.chip_detail[q].chip_isshow == true && this.chip_detail[q].chip_pos == _pos) {
                            //判断显示
                            if (this.chip_detail[q].chip_gold > now_gold) {
                                if (remove_mingold == 0) {
                                    remove_mingold_chipnum = q;
                                    remove_mingold = this.chip_detail[q].chip_gold;
                                }
                                else {
                                    if (remove_mingold > this.chip_detail[q].chip_gold) {
                                        remove_mingold_chipnum = q;
                                        remove_mingold = this.chip_detail[q].chip_gold;
                                    }
                                }
                            }
                        }
                    }
                    //数据赋值
                    if (remove_mingold_chipnum != -1) {
                        //显示筹码
                        var now_add_chip = [];
                        //数据赋值
                        now_add_chip = this.assAddGold(remove_mingold, now_gold);
                        //添加筹码
                        for (var r = 0; r < now_add_chip.length; r++) {
                            this.yaZhu(_pos, now_add_chip[r]);
                        }
                        //移除筹码
                        this.removeChip(remove_mingold_chipnum, 1);
                        //继续抢注
                        this.qiangZhu(_pos, _gold, _type);
                    }
                }
            }
        }
    };
    //移除筹码
    YSC_ChipFly.prototype.assAddGold = function (_total_gold, _now_gold) {
        //定义变量
        var add_gold = [];
        var now_gold = _total_gold;
        //数据赋值
        add_gold[add_gold.length] = _now_gold;
        now_gold = now_gold - _now_gold;
        //数据赋值
        function assData() {
            //定义变量
            var max_gold = 0;
            var chip_goldnum = [100, 500, 1000, 2500, 5000, 10000, 25000, 50000, 100000];
            //数据赋值
            for (var i = 0; i < chip_goldnum.length; i++) {
                if (chip_goldnum[i] <= now_gold) {
                    max_gold = Math.max(max_gold, chip_goldnum[i]);
                }
            }
            add_gold[add_gold.length] = max_gold;
            now_gold = now_gold - max_gold;
            //判断赋值
            if (now_gold > 0) {
                assData();
            }
        }
        //判断赋值
        if (now_gold > 0) {
            assData();
        }
        return add_gold;
    };
    //隐藏筹码
    YSC_ChipFly.prototype.removeChip = function (_num, _type) {
        var _this = this;
        //数据赋值
        this.chip_detail[_num].chip_isshow = false;
        //隐藏界面
        if (_type == 0) {
            var _tween_x1 = egret.Tween.get(this.chip_detail[_num]).to({ x: this.usergold_x }, 400);
            var _tween_y1 = egret.Tween.get(this.chip_detail[_num]).to({ y: this.usergold_y }, 400).call(function () {
                if (_this.chip_num > _num) {
                    _this.removeChild(_this.chip_detail[_num]);
                }
            });
        }
        else {
            var _tween_x2 = egret.Tween.get(this.chip_detail[_num]).to({ x: -50 }, 400);
            var _tween_y2 = egret.Tween.get(this.chip_detail[_num]).to({ y: -50 }, 400).call(function () {
                if (_this.chip_num > _num) {
                    _this.removeChild(_this.chip_detail[_num]);
                }
            });
        }
    };
    return YSC_ChipFly;
}(eui.Component));
__reflect(YSC_ChipFly.prototype, "YSC_ChipFly");
//# sourceMappingURL=YSC_ChipFly.js.map