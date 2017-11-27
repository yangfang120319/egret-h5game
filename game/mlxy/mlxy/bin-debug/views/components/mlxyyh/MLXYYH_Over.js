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
 * @马来西亚银行-结算界面
 *
 */
var MLXYYH_Over = (function (_super) {
    __extends(MLXYYH_Over, _super);
    function MLXYYH_Over() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.zhong_box = [];
        _this.txt_yazhu = [];
        _this.peilv = [48, 48, 24, 12, 6, 4, 2];
        return _this;
    }
    //初始化
    MLXYYH_Over.prototype.createChildren = function () {
        _super.prototype.createChildren.call(this);
        //数据赋值
        for (var i = 0; i < 7; i++) {
            //定义变量
            var now_txt = this["txt_yazhu" + i];
            //数据赋值
            this.txt_yazhu[i] = now_txt;
        }
    };
    //初始化界面
    MLXYYH_Over.prototype.info = function (_rate) {
        //显示界面
        this.g_total.scaleX = _rate;
        this.g_total.scaleY = _rate;
    };
    //显示内容
    MLXYYH_Over.prototype.showDetail = function () {
        //显示中奖内容
        this.showZhongIcon();
        //显示压住内容
        this.showYaZhuDetail();
        //显示结果
        this.showWinGold();
    };
    //显示赢钱
    MLXYYH_Over.prototype.showWinGold = function () {
        //数据赋值
        this.total_win_gold = 0;
        for (var i = 0; i < this.zhong_box.length; i++) {
            this.total_win_gold += GameData.MLXYYH_YaZhu_User[this.zhong_box[i]] * this.peilv[this.zhong_box[i]];
        }
        //判断显示
        if (GameData.MLXYYH_IsDouble == true) {
            //显示文本
            this.txt_type.text = "天使奖励";
            this.txt_add_gold.text = Number(this.total_win_gold * 2).toString();
            //数据赋值
            this.total_win_gold = this.total_win_gold * 2 - this.total_yazhu_gold;
        }
        else if (GameData.MLXYYH_IsReturn == true) {
            this.txt_type.text = "财神奖励";
            this.txt_add_gold.text = this.total_yazhu_gold.toString();
        }
        else {
            //显示文本
            this.txt_type.text = "";
            this.txt_add_gold.text = "";
            //数据赋值
            this.total_win_gold = this.total_win_gold - this.total_yazhu_gold;
        }
        //判断显示文本
        if (this.total_win_gold == 0) {
            this.txt_win_gold.text = "0";
        }
        else if (this.total_win_gold > 0) {
            this.txt_win_gold.text = "+" + GameData.assShowGold(this.total_win_gold);
        }
        else {
            this.txt_win_gold.text = "-" + GameData.assShowGold(-this.total_win_gold);
        }
        //判断播放是声音
        if (this.total_win_gold < 0) {
            //播放声音
            basic.SoundManager.instance.playEffect("sound_g_fail_mp3");
        }
        else {
            //播放声音
            basic.SoundManager.instance.playEffect("sound_g_win" + Math.floor(Math.random() * 4 + 1).toString() + "_mp3");
        }
    };
    //显示压住内容
    MLXYYH_Over.prototype.showYaZhuDetail = function () {
        //显示数据
        this.total_yazhu_gold = 0;
        for (var i = 0; i < 7; i++) {
            this.total_yazhu_gold += GameData.MLXYYH_YaZhu_User[i];
            this.txt_yazhu[i].text = GameData.assShowGold(GameData.MLXYYH_YaZhu_User[i]);
        }
    };
    //显示中奖内容
    MLXYYH_Over.prototype.showZhongIcon = function () {
        //判断显示
        this.zhong_box = [];
        if (GameData.MLXYYH_RunOver_IsWin_Left == true && GameData.MLXYYH_RunOver_IsWin_Right == true && GameData.MLXYYH_RunOver_Luck > -1) {
            //显示三个结果
            this.img_zhong0.x = 231;
            this.img_zhong1.x = 331;
            this.img_zhong2.x = 431;
            this.img_zhong0.visible = true;
            this.img_zhong1.visible = true;
            this.img_zhong2.visible = true;
            //数据赋值
            this.zhong_box[0] = GameData.MLXYYH_BoxNum_Left[GameData.MLXYYH_RunOver_Left];
            this.zhong_box[1] = GameData.MLXYYH_BoxNum_Left[GameData.MLXYYH_RunOver_Luck];
            this.zhong_box[2] = GameData.MLXYYH_BoxNum_Right[GameData.MLXYYH_RunOver_Right];
            //显示图片
            this.img_zhong0.source = "icon_mlxyyh_" + this.zhong_box[0] + "_0_png";
            this.img_zhong1.source = "icon_mlxyyh_" + this.zhong_box[1] + "_0_png";
            this.img_zhong2.source = "icon_mlxyyh_" + this.zhong_box[2] + "_0_png";
        }
        else if (GameData.MLXYYH_RunOver_IsWin_Left == true && GameData.MLXYYH_RunOver_IsWin_Right == true) {
            //显示两个个结果
            this.img_zhong0.x = 281;
            this.img_zhong1.x = 381;
            this.img_zhong0.visible = true;
            this.img_zhong1.visible = true;
            this.img_zhong2.visible = false;
            //数据赋值
            this.zhong_box[0] = GameData.MLXYYH_BoxNum_Left[GameData.MLXYYH_RunOver_Left];
            this.zhong_box[1] = GameData.MLXYYH_BoxNum_Right[GameData.MLXYYH_RunOver_Right];
            //显示图片
            this.img_zhong0.source = "icon_mlxyyh_" + this.zhong_box[0] + "_0_png";
            this.img_zhong1.source = "icon_mlxyyh_" + this.zhong_box[1] + "_0_png";
        }
        else {
            //显示一个结果
            this.img_zhong0.x = 331;
            this.img_zhong0.visible = true;
            this.img_zhong1.visible = false;
            this.img_zhong2.visible = false;
            //数据赋值
            if (GameData.MLXYYH_RunOver_IsWin_Left == true) {
                this.zhong_box[0] = GameData.MLXYYH_BoxNum_Left[GameData.MLXYYH_RunOver_Left];
            }
            else {
                this.zhong_box[0] = GameData.MLXYYH_BoxNum_Right[GameData.MLXYYH_RunOver_Right];
            }
            //显示图片
            this.img_zhong0.source = "icon_mlxyyh_" + this.zhong_box[0] + "_0_png";
        }
    };
    return MLXYYH_Over;
}(eui.Component));
__reflect(MLXYYH_Over.prototype, "MLXYYH_Over");
//# sourceMappingURL=MLXYYH_Over.js.map