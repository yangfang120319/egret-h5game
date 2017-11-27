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
 * @游戏结束
 *
 */
var PanelGameOver = (function (_super) {
    __extends(PanelGameOver, _super);
    //定义界面
    function PanelGameOver() {
        var _this = _super.call(this) || this;
        _this.gift_num = 0;
        _this.gift_detail = [];
        //定义界面
        _this.skinName = PanelGameOverSkin;
        //注册按钮
        _this.btn_yes.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onYesBtn, _this);
        return _this;
    }
    //显示前调用
    PanelGameOver.prototype.beforeShow = function (params) {
        //定义变量
        var show_tips = "";
        var is_has_last = false;
        var last_person_num;
        //显示位置
        this.width = basic.StageProxy.width;
        this.height = basic.StageProxy.height;
        //判断显示
        this.img_box.visible = false;
        this.img_title.visible = false;
        if (GameData.over_type == 0) {
            //数据赋值
            show_tips = "<font color='#EA9658'>";
            for (var i = 0; i < 22; i++) {
                //定义变量
                var now_person = [];
                //数据赋值
                for (var j = 0; j < GameData.player_num; j++) {
                    if (GameData.player_place[j] == i) {
                        now_person[now_person.length] = j;
                    }
                }
                //判断显示界面
                if (now_person.length > 0) {
                    //显示界面
                    is_has_last = true;
                    last_person_num = now_person.length;
                    for (var p = 0; p < now_person.length; p++) {
                        show_tips += GameData.player_name[now_person[p]];
                        if (p < now_person.length - 1) {
                            show_tips += "、";
                        }
                    }
                    break;
                }
            }
            //判断显示
            if (is_has_last == false) {
                show_tips = "本局没有人需要喝罚酒";
            }
            else {
                if (last_person_num == 1) {
                    show_tips += "</font>输了<font> \n </font>需要喝掉<font color='#EA9658'>" + GameData.FJ_Num.toString() + "</font>杯罚酒";
                }
                else {
                    show_tips += "</font>输了<font> \n </font>都需要喝掉<font color='#EA9658'>" + GameData.FJ_Num.toString() + "</font>杯罚酒";
                }
            }
            //判断显示文本
            this.txt_tips.textFlow = (new egret.HtmlTextParser).parser(show_tips);
            this.txt_tips1.text = "与本局其他玩家自动加为好友";
        }
        else {
            //判断显示
            if (GameData.over_tips == "主动退出游戏") {
                this.txt_tips1.text = "更多好玩游戏等你来";
            }
            else {
                this.txt_tips1.text = "开房玩游戏";
            }
            //判断显示文本
            this.txt_tips.textFlow = (new egret.HtmlTextParser).parser(GameData.over_tips);
        }
        //显示奖品
        this.showGift();
        //显示二维码
        this.showCode();
    };
    //隐藏前调用
    PanelGameOver.prototype.beforeHide = function () {
        //移除奖品
        this.removeGift();
        //移除二维码
        hideQrCode();
        //清除数据
        GameData.Over_Data = null;
    };
    //显示奖品
    PanelGameOver.prototype.showGift = function () {
        //移除奖品
        this.removeGift();
        //判断显示
        if (GameData.Over_Data != null) {
            if (GameData.Over_Data.data.length > 0) {
                //数据赋值
                this.img_box.visible = true;
                this.img_title.visible = true;
                this.gift_num = GameData.Over_Data.data.length;
                for (var i = 0; i < this.gift_num; i++) {
                    //定义变量
                    var now_gift = new OverGift();
                    //显示界面
                    now_gift.show(GameData.Over_Data.data[i]);
                    //显示礼物
                    this.gift_detail[i] = now_gift;
                    this.g_gift.addChild(this.gift_detail[i]);
                }
            }
        }
    };
    //移除奖品
    PanelGameOver.prototype.removeGift = function () {
        //移除
        for (var i = 0; i < this.gift_num; i++) {
            this.g_gift.removeChild(this.gift_detail[i]);
        }
        //清除数据
        this.gift_num = 0;
        this.gift_detail = [];
    };
    //确定按钮
    PanelGameOver.prototype.onYesBtn = function (e) {
        //播放声音
        basic.SoundManager.instance.playEffect("sound_btn_mp3");
        //移除界面
        basic.SceneManager.removeTopScene(SceneNames.OVER);
        //显示开始界面
        basic.SceneManager.show(SceneNames.START);
    };
    //显示二维码
    PanelGameOver.prototype.showCode = function () {
        //定义变量
        var top_px;
        var img_url;
        var top_show;
        var height_px;
        var show_height = 375;
        //判断显示
        img_url = "https://game.yile.vip/h5/erweima.jpg";
        height_px = window.innerWidth * show_height / basic.StageProxy.width;
        top_px = window.innerHeight - 520 * (window.innerWidth / basic.StageProxy.width);
        //显示关注微信公众号
        showQrCode(img_url, top_px, height_px);
    };
    return PanelGameOver;
}(basic.SceneBase));
__reflect(PanelGameOver.prototype, "PanelGameOver");
//礼物界面
var OverGift = (function (_super) {
    __extends(OverGift, _super);
    //定义界面
    function OverGift() {
        var _this = _super.call(this) || this;
        //定义界面
        _this.skinName = OverGiftSkin;
        return _this;
    }
    //显示界面
    OverGift.prototype.show = function (_data) {
        //显示界面
        this.txt_name.text = _data.name;
        this.img_icon.source = _data.imgurl;
        this.txt_num.text = "x" + _data.count;
    };
    return OverGift;
}(eui.Component));
__reflect(OverGift.prototype, "OverGift");
//# sourceMappingURL=PanelGameOver.js.map