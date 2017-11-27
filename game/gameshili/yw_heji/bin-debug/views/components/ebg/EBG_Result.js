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
 * @结果
 *
 */
var EBG_Result = (function (_super) {
    __extends(EBG_Result, _super);
    function EBG_Result() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        //状态控制变量
        _this._tween_width = null;
        _this._tween_alpha = null;
        return _this;
    }
    //初始化
    EBG_Result.prototype.createChildren = function () {
        _super.prototype.createChildren.call(this);
        //定义遮罩
        this.img_mask.visible = true;
        this.img_back.mask = this.img_mask;
    };
    //初始化界面
    EBG_Result.prototype.info = function (_table_num) {
        //数据赋值
        this.table_num = _table_num;
    };
    //显示结果
    EBG_Result.prototype.show = function () {
        var _this = this;
        //数据赋值
        this.assData();
        //显示类型
        this.currentState = "type" + this.result_type.toString();
        //判断显示
        if (this.result_type == 1) {
            this.img_num1.source = "icon_ebg_diannum" + this.result_diannum.toString() + "_png";
        }
        //隐藏界面
        this.img_dian.visible = false;
        this.img_num1.visible = false;
        this.img_num2.visible = false;
        this.img_num3.visible = false;
        //开始动画
        this.startBackAction(function () {
            //判断显示动画
            if (_this.result_type == 1) {
                _this.startAction1();
            }
            else if (_this.result_type == 2) {
                _this.startAction2();
            }
            else if (_this.result_type == 3) {
                _this.startAction3();
            }
        });
    };
    //直接显示结果
    EBG_Result.prototype.showResult = function () {
        //数据赋值
        this.assData();
        //显示底
        this.img_mask.width = 200;
        //显示类型
        this.currentState = "type" + this.result_type.toString();
        //判断显示
        if (this.result_type == 1) {
            this.img_num1.source = "icon_ebg_diannum" + this.result_diannum.toString() + "_png";
        }
    };
    //数据赋值
    EBG_Result.prototype.assData = function () {
        //判断显示
        this.result_type = GameData.EBG_Poker_Table_Type[this.table_num];
        //判断赋值
        if (this.result_type == 1) {
            this.result_diannum = this.assDianNum();
        }
    };
    //点数赋值
    EBG_Result.prototype.assDianNum = function () {
        //定义变量
        var dian_num;
        var mohjong_detail;
        //判断赋值
        mohjong_detail = GameData.EBG_Poker_Table_Card[this.table_num];
        //数据赋值
        dian_num = Number(mohjong_detail[0]) % 16 + Number(mohjong_detail[1]) % 16;
        dian_num = dian_num % 10;
        return dian_num;
    };
    //底效果
    EBG_Result.prototype.startBackAction = function (_callback) {
        if (_callback === void 0) { _callback = null; }
        //显示底动画
        this.img_back.alpha = 0;
        this.img_mask.width = 20;
        this._tween_alpha = egret.Tween.get(this.img_back).to({ alpha: 1 }, 50);
        this._tween_width = egret.Tween.get(this.img_mask).to({ width: 200 }, 200).call(function () {
            //判断回调函数
            if (_callback) {
                _callback();
            }
        });
    };
    //显示动画1
    EBG_Result.prototype.startAction1 = function () {
        var _this = this;
        //显示点数
        this.img_num1.alpha = 0;
        this.img_dian.alpha = 0;
        this.img_num1.visible = true;
        this.img_dian.visible = true;
        this._tween_alpha = egret.Tween.get(this.img_num1).to({ alpha: 1 }, 100).call(function () {
            _this._tween_alpha = egret.Tween.get(_this.img_dian).to({ alpha: 1 }, 100);
            //播放声音
            basic.SoundManager.instance.playEffect("sound_ebg_dian" + _this.result_diannum.toString() + "_mp3");
        });
    };
    //显示动画2
    EBG_Result.prototype.startAction2 = function () {
        //显示点数
        this.img_num2.alpha = 0;
        this.img_num2.visible = true;
        this._tween_alpha = egret.Tween.get(this.img_num2).to({ alpha: 1 }, 100);
        //播放声音
        basic.SoundManager.instance.playEffect("sound_ebg_erbagang_mp3");
    };
    //显示动画3
    EBG_Result.prototype.startAction3 = function () {
        //显示点数
        this.img_num3.alpha = 0;
        this.img_num3.visible = true;
        this._tween_alpha = egret.Tween.get(this.img_num3).to({ alpha: 1 }, 100);
        //播放声音
        basic.SoundManager.instance.playEffect("sound_ebg_baozi_mp3");
    };
    return EBG_Result;
}(eui.Component));
__reflect(EBG_Result.prototype, "EBG_Result");
