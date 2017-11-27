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
 * @结束界面
 *
 */
var YSC_OverShow = (function (_super) {
    __extends(YSC_OverShow, _super);
    function YSC_OverShow() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.start_show_x = [];
        _this.start_show_y = [];
        _this._tween_x_show = null;
        _this._tween_y_show = null;
        _this._tween_alpha_show = null;
        _this._tween_scaleX_show = null;
        _this._tween_scaleY_show = null;
        _this._tween_alpha_Back = null;
        _this._tween_light_alpha = null;
        _this._tween_light_rotation = null;
        return _this;
    }
    //初始化
    YSC_OverShow.prototype.createChildren = function () {
        _super.prototype.createChildren.call(this);
        //隐藏界面
        this.visible = false;
        //注册事件
        basic.Dispatcher.addListener(EventNames.YSC_SHOWOVERFACE, this.onShowOverFace, this);
        basic.Dispatcher.addListener(EventNames.YSC_HIDEOVERFACE, this.onHideOverFace, this);
    };
    //初始化界面
    YSC_OverShow.prototype.info = function (_play_x, _play_y, _play_rate) {
        //数据赋值
        this.rate_zoom = _play_rate;
        this.start_show_x[0] = _play_x + 175 * this.rate_zoom;
        this.start_show_x[1] = _play_x + 430 * this.rate_zoom;
        this.start_show_x[2] = _play_x + 430 * this.rate_zoom;
        this.start_show_x[3] = _play_x + 175 * this.rate_zoom;
        this.start_show_y[0] = _play_y + 161 * this.rate_zoom;
        this.start_show_y[1] = _play_y + 161 * this.rate_zoom;
        this.start_show_y[2] = _play_y + 396 * this.rate_zoom;
        this.start_show_y[3] = _play_y + 396 * this.rate_zoom;
    };
    //显示结束界面
    YSC_OverShow.prototype.onShowOverFace = function (e) {
        var _this = this;
        //停止动画
        this.stopAction();
        //显示界面
        this.visible = true;
        this.g_light.alpha = 0;
        this.rect_back.alpha = 0;
        this.g_show.scaleX = this.rate_zoom;
        this.g_show.scaleY = this.rate_zoom;
        this.g_show.x = this.start_show_x[GameData.YSC_RUN_OVER];
        this.g_show.y = this.start_show_y[GameData.YSC_RUN_OVER];
        //初始化界面
        if (GameData.YSC_RUN_OVER % 2 == 0) {
            this.img_back.source = "back_ysc_redbox_png";
            this.img_light.source = "back_ysc_redbox_light_png";
        }
        else {
            this.img_back.source = "back_ysc_bluebox_png";
            this.img_light.source = "back_ysc_bluebox_light_png";
        }
        if (GameData.YSC_RUN_OVER < 2) {
            this.img_icon.source = "icon_ysc_choose_b_" + GameData.YSC_RUN_OVER.toString() + "_png";
        }
        else if (GameData.YSC_RUN_OVER == 2) {
            this.img_icon.source = "icon_ysc_choose_b_3_png";
        }
        else if (GameData.YSC_RUN_OVER == 3) {
            this.img_icon.source = "icon_ysc_choose_b_2_png";
        }
        //显示背景动画
        this._tween_alpha_Back = egret.Tween.get(this.rect_back).
            to({ alpha: 1 }, 500);
        //显示动画
        this._tween_alpha_show = egret.Tween.get(this.g_show).
            to({ alpha: 1 }, 250);
        this._tween_x_show = egret.Tween.get(this.g_show).wait(250).
            to({ x: basic.StageProxy.width / 2 }, 500);
        this._tween_y_show = egret.Tween.get(this.g_show).wait(250).
            to({ y: 320 }, 500);
        this._tween_scaleX_show = egret.Tween.get(this.g_show).wait(250).
            to({ scaleX: 1 }, 500);
        this._tween_scaleY_show = egret.Tween.get(this.g_show).wait(250).
            to({ scaleY: 1 }, 500).wait(200).call(function () {
            //播放声音
            //basic.SoundManager.instance.playEffect("sound_ysc_choose" + GameData.YSC_RUN_OVER.toString()+"_mp3");
            //显示发光动画
            _this.showLightAction();
        });
    };
    //隐藏结束界面
    YSC_OverShow.prototype.onHideOverFace = function (e) {
        //隐藏界面
        this.visible = false;
        //停止动画
        this.stopAction();
    };
    //停止动画
    YSC_OverShow.prototype.stopAction = function () {
        //停止动画
        if (this._tween_light_alpha) {
            this._tween_light_alpha.setPaused(true);
            this._tween_light_alpha = null;
        }
        if (this._tween_light_rotation) {
            this._tween_light_rotation.setPaused(true);
            this._tween_light_rotation = null;
        }
        if (this._tween_alpha_Back) {
            this._tween_alpha_Back.setPaused(true);
            this._tween_alpha_Back = null;
        }
        if (this._tween_alpha_show) {
            this._tween_alpha_show.setPaused(true);
            this._tween_alpha_show = null;
        }
        if (this._tween_x_show) {
            this._tween_x_show.setPaused(true);
            this._tween_x_show = null;
        }
        if (this._tween_y_show) {
            this._tween_y_show.setPaused(true);
            this._tween_y_show = null;
        }
        if (this._tween_scaleX_show) {
            this._tween_scaleX_show.setPaused(true);
            this._tween_scaleX_show = null;
        }
        if (this._tween_scaleY_show) {
            this._tween_scaleY_show.setPaused(true);
            this._tween_scaleY_show = null;
        }
    };
    //显示发光动画
    YSC_OverShow.prototype.showLightAction = function () {
        var _this = this;
        //显示界面
        this.g_light.rotation = 0;
        this._tween_light_alpha = egret.Tween.get(this.g_light).to({ alpha: 1 }, 200).call(function () {
            _this._tween_light_rotation = egret.Tween.get(_this.g_light, { loop: true }).
                to({ rotation: 360 }, 5000);
        });
    };
    return YSC_OverShow;
}(eui.Component));
__reflect(YSC_OverShow.prototype, "YSC_OverShow");
//# sourceMappingURL=YSC_OverShow.js.map