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
 * @提示
 *
 */
var Tips = (function (_super) {
    __extends(Tips, _super);
    //定义界面
    function Tips() {
        var _this = _super.call(this) || this;
        _this.is_show = false;
        _this._tween_y = null;
        _this._tween_alpha = null;
        //定义界面
        _this.skinName = TipsSkin;
        //隐藏界面
        _this.visible = false;
        return _this;
    }
    //显示提示
    Tips.prototype.show = function (_tips) {
        var _this = this;
        //判断移除
        if (this.is_show == true) {
            //数据赋值
            this.is_show = false;
            //停止欢动
            if (this._tween_y) {
                this._tween_y.setPaused(true);
                this._tween_y = null;
            }
            if (this._tween_alpha) {
                this._tween_alpha.setPaused(true);
                this._tween_alpha = null;
            }
        }
        //显示文本
        this.txt_tips.text = _tips;
        //显示位置
        this.alpha = 1;
        this.visible = true;
        this.y = basic.StageProxy.height;
        this.x = (basic.StageProxy.width - this.width) / 2;
        //显示界面
        this.is_show = true;
        this._tween_alpha = egret.Tween.get(this).wait(1600).to({ alpha: 0 }, 300);
        this._tween_y = egret.Tween.get(this).to({ y: (basic.StageProxy.height - this.height) / 2 }, 300).wait(1500).to({ y: -this.height }, 300).call(function () {
            //数据赋值
            _this.is_show = false;
            //停止欢动
            if (_this._tween_y) {
                _this._tween_y.setPaused(true);
                _this._tween_y = null;
            }
            if (_this._tween_alpha) {
                _this._tween_alpha.setPaused(true);
                _this._tween_alpha = null;
            }
            //隐藏界面
            _this.visible = false;
        });
    };
    return Tips;
}(eui.Component));
__reflect(Tips.prototype, "Tips");
//# sourceMappingURL=Tips.js.map