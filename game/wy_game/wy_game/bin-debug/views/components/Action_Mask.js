var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var Action_Mask = (function () {
    //初始化界面
    function Action_Mask(_mask, _time, _waiting) {
        if (_time === void 0) { _time = 1500; }
        if (_waiting === void 0) { _waiting = 300; }
        this._tween_alpha = null;
        //数据复制
        this.img_mask = _mask;
        this.play_time = _time;
        this.play_waiting = _waiting;
    }
    //隐藏遮罩
    Action_Mask.prototype.hide = function (_callback) {
        var _this = this;
        if (_callback === void 0) { _callback = null; }
        //数据复制
        this.callback = _callback;
        //判断显示
        this.img_mask.alpha = 1;
        this.img_mask.visible = true;
        var _tween_mask_alpha = egret.Tween.get(this.img_mask).wait(this.play_waiting)
            .to({ alpha: 0 }, this.play_time).call(function () {
            //隐藏界面
            _this.img_mask.visible = false;
            //清除界面
            _this.clean();
        });
    };
    //显示遮罩
    Action_Mask.prototype.show = function (_callback) {
        var _this = this;
        //数据复制
        this.callback = _callback;
        //判断显示
        this.img_mask.alpha = 0;
        this.img_mask.visible = true;
        var _tween_mask_alpha = egret.Tween.get(this.img_mask).wait(this.play_waiting)
            .to({ alpha: 1 }, this.play_time).call(function () {
            //清除界面
            _this.clean();
        });
    };
    //清除
    Action_Mask.prototype.clean = function () {
        //显示回调函数
        if (this.callback) {
            this.callback();
        }
        //停止动画
        if (this._tween_alpha) {
            this._tween_alpha.setPaused(true);
            this._tween_alpha = null;
        }
    };
    return Action_Mask;
}());
__reflect(Action_Mask.prototype, "Action_Mask");
//# sourceMappingURL=Action_Mask.js.map