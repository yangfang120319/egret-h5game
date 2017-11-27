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
 * @成功
 *
 */
var Action_Win = (function (_super) {
    __extends(Action_Win, _super);
    function Action_Win() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._tween_y = null;
        _this._tween_book_x = null;
        _this._tween_renwu_x = null;
        _this._tween_caidai_alpha = null;
        _this._tween_light_alpha = null;
        _this._tween_light_rotation = null;
        _this._tween_Star_rotation = [];
        _this._tween_Star_alpha = null;
        _this.com_star = [];
        _this._tween_xunzhang_alpha = null;
        _this._tween_jian_alpha0 = null;
        _this._tween_jian_rotation0 = null;
        _this._tween_jian_alpha1 = null;
        _this._tween_jian_rotation1 = null;
        _this._tween_jian_x0 = null;
        _this._tween_jian_x1 = null;
        return _this;
    }
    //初始化
    Action_Win.prototype.createChildren = function () {
        _super.prototype.createChildren.call(this);
        //数据赋值
        for (var i = 0; i < 6; i++) {
            //定义变量
            var com = this["com_star" + i];
            //数据赋值
            this.com_star[i] = com;
            this._tween_Star_rotation[i] = null;
        }
    };
    //开始动画
    Action_Win.prototype.start = function (_type) {
        var _this = this;
        //清除界面
        this.clean();
        //判断显示动画
        if (_type == 2) {
            this.img_title.source = "txt_cgcg_png";
            this._tween_renwu_x = egret.Tween.get(this.img_renwu).wait(300).to({ x: 170 }, 200);
            this._tween_book_x = egret.Tween.get(this.img_book).wait(500).to({ x: 375 }, 200, egret.Ease.backOut);
        }
        else {
            if (_type == 0) {
                this.img_title.source = "txt_tzsl_png";
            }
            else if (_type == 1) {
                this.img_title.source = "txt_tzwc_png";
            }
            //显示动画
            this._tween_xunzhang_alpha = egret.Tween.get(this.img_xunzhang).wait(300).to({ alpha: 1 }, 500);
            this._tween_jian_alpha0 = egret.Tween.get(this.com_jian0).wait(600).to({ alpha: 1 }, 400);
            this._tween_jian_alpha1 = egret.Tween.get(this.com_jian1).wait(600).to({ alpha: 1 }, 400);
            this._tween_jian_x0 = egret.Tween.get(this.com_jian0).wait(800).to({ x: 230 }, 500, egret.Ease.backOut);
            this._tween_jian_x1 = egret.Tween.get(this.com_jian1).wait(800).to({ x: 415 }, 500, egret.Ease.backOut);
            this._tween_jian_rotation0 = egret.Tween.get(this.com_jian0).wait(800).to({ rotation: 0 }, 500, egret.Ease.backOut);
            this._tween_jian_rotation1 = egret.Tween.get(this.com_jian1).wait(800).to({ rotation: 0 }, 500, egret.Ease.backOut);
        }
        //开始动画
        this._tween_Star_alpha = egret.Tween.get(this.g_star).wait(400).to({ alpha: 1 }, 700);
        this._tween_light_alpha = egret.Tween.get(this.com_light).wait(400).to({ alpha: 1 }, 700);
        this._tween_y = egret.Tween.get(this.g_title).to({ y: 290 }, 300, egret.Ease.backOut);
        this._tween_caidai_alpha = egret.Tween.get(this.img_caidai).wait(400).to({ alpha: 1 }, 700);
        //判断显示光动画
        egret.setTimeout(function () {
            _this._tween_light_rotation = egret.Tween.get(_this.com_light, { loop: true }).to({ rotation: 360 }, 8000);
            //开始星星动画
            for (var i = 0; i < 6; i++) {
                //开始星星动画
                _this.startStarAction(i);
            }
            //开始动画
            _this.showAcionAll();
            egret.setTimeout(function () {
                _this.showAcionAll();
            }, _this, 100);
            egret.setTimeout(function () {
                _this.showAcionAll();
            }, _this, 200);
            egret.setTimeout(function () {
                _this.showAcionAll();
            }, _this, 300);
        }, this, 400);
    };
    //显示动画
    Action_Win.prototype.showAcionAll = function () {
        //定义变量
        var num = 3 + Math.floor(Math.random() * 5);
        //显示动画
        for (var i = 0; i < num; i++) {
            this.showAcion();
        }
    };
    //显示动画
    Action_Win.prototype.showAcion = function () {
        var _this = this;
        var action = new Action_PaoWuXian();
        this.g_action.addChild(action);
        action.x = 260 + Math.random() * 120;
        action.y = 300 + Math.random() * 30;
        action.start(function () {
            _this.g_action.removeChild(action);
        });
    };
    //开始星星动画
    Action_Win.prototype.startStarAction = function (_num) {
        //数据赋值
        var time = 5000 + Math.floor(Math.random() * 2000);
        var start_rotation = Math.floor(Math.random() * 180);
        //开始动画
        this.com_star[_num].rotation = start_rotation;
        if (Math.random() < 0.5) {
            this._tween_Star_rotation[_num] = egret.Tween.get(this.com_star[_num], { loop: true }).
                to({ rotation: 360 }, time * (360 - start_rotation) / 360).
                to({ rotation: start_rotation + 360 }, time * start_rotation / 360);
        }
        else {
            this._tween_Star_rotation[_num] = egret.Tween.get(this.com_star[_num], { loop: true }).
                to({ rotation: 0 }, time * start_rotation / 360).
                to({ rotation: start_rotation - 360 }, time * (360 - start_rotation) / 360);
        }
    };
    //清除
    Action_Win.prototype.clean = function () {
        //隐藏界面
        this.g_star.alpha = 0;
        this.g_title.y = -170;
        this.img_book.x = 650;
        this.img_renwu.x = -230;
        this.img_caidai.alpha = 0;
        this.com_light.alpha = 0;
        this.com_light.rotation = 0;
        this.img_xunzhang.alpha = 0;
        this.com_jian0.alpha = 0;
        this.com_jian1.alpha = 0;
        this.com_jian0.rotation = -30;
        this.com_jian1.rotation = 30;
        this.com_jian0.x = 180;
        this.com_jian1.x = 465;
        //停止动画
        if (this._tween_y) {
            this._tween_y.setPaused(true);
            this._tween_y = null;
        }
        if (this._tween_renwu_x) {
            this._tween_renwu_x.setPaused(true);
            this._tween_renwu_x = null;
        }
        if (this._tween_caidai_alpha) {
            this._tween_caidai_alpha.setPaused(true);
            this._tween_caidai_alpha = null;
        }
        if (this._tween_book_x) {
            this._tween_book_x.setPaused(true);
            this._tween_book_x = null;
        }
        if (this._tween_light_alpha) {
            this._tween_light_alpha.setPaused(true);
            this._tween_light_alpha = null;
        }
        if (this._tween_light_rotation) {
            this._tween_light_rotation.setPaused(true);
            this._tween_light_rotation = null;
        }
        for (var i = 0; i < 6; i++) {
            if (this._tween_Star_rotation[i]) {
                this._tween_Star_rotation[i].setPaused(true);
                this._tween_Star_rotation[i] = null;
            }
        }
        if (this._tween_xunzhang_alpha) {
            this._tween_xunzhang_alpha.setPaused(true);
            this._tween_xunzhang_alpha = null;
        }
        if (this._tween_jian_alpha0) {
            this._tween_jian_alpha0.setPaused(true);
            this._tween_jian_alpha0 = null;
        }
        if (this._tween_jian_rotation0) {
            this._tween_jian_rotation0.setPaused(true);
            this._tween_jian_rotation0 = null;
        }
        if (this._tween_jian_alpha1) {
            this._tween_jian_alpha1.setPaused(true);
            this._tween_jian_alpha1 = null;
        }
        if (this._tween_jian_rotation1) {
            this._tween_jian_rotation1.setPaused(true);
            this._tween_jian_rotation1 = null;
        }
        if (this._tween_jian_x0) {
            this._tween_jian_x0.setPaused(true);
            this._tween_jian_x0 = null;
        }
        if (this._tween_jian_x1) {
            this._tween_jian_x1.setPaused(true);
            this._tween_jian_x1 = null;
        }
    };
    return Action_Win;
}(eui.Component));
__reflect(Action_Win.prototype, "Action_Win");
//# sourceMappingURL=Action_Win.js.map