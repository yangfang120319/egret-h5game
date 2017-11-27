var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var Action_Other = (function () {
    function Action_Other() {
    }
    //alpha改变
    Action_Other.changeAlpha = function (_start_alpha, _over_alpha, _time, _obj, _waitingtime, _callback) {
        if (_waitingtime === void 0) { _waitingtime = 0; }
        if (_callback === void 0) { _callback = null; }
        //显示界面
        _obj.visible = true;
        _obj.alpha = _start_alpha;
        //显示动画
        var _tween_alpha = egret.Tween.get(_obj)
            .wait(_waitingtime)
            .to({ alpha: _over_alpha }, _time).call(function () {
            //判断显示
            if (_over_alpha == 0) {
                _obj.visible = false;
            }
            //判断回调
            if (_callback) {
                _callback();
            }
        });
    };
    return Action_Other;
}());
__reflect(Action_Other.prototype, "Action_Other");
//# sourceMappingURL=Action_Other.js.map