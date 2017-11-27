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
 * @财神飞行动画
 *
 */
var CaiShen_Flay = (function (_super) {
    __extends(CaiShen_Flay, _super);
    //定义界面
    function CaiShen_Flay() {
        var _this = _super.call(this) || this;
        _this._tween_x = null;
        _this.now_speed = -10;
        return _this;
    }
    //初始化界面
    CaiShen_Flay.prototype.info = function (_callback) {
        //数据赋值
        this.callback = _callback;
        //显示财神
        this.caishen = new CaiShen();
        //定义位置
        this.caishen.y = 50;
        this.caishen.x = 1472;
        this.caishen.scaleX = 0.5;
        this.caishen.scaleY = 0.5;
        //显示界面
        this.addChild(this.caishen);
        this.caishen.info();
        //开始显示动画
        this.showAction();
    };
    //开始动画
    CaiShen_Flay.prototype.showAction = function () {
        var _this = this;
        //初始化界面
        this.caishen.x = 1472;
        this.caishen.skewY = 0;
        //开始显示动画
        this._tween_x = egret.Tween.get(this.caishen).to({ x: 0 }, 800, egret.Ease.quadOut).call(function () {
            _this.caishen.x = 250;
            _this.caishen.skewY = 180;
            _this._tween_x = egret.Tween.get(_this.caishen).to({ x: 1024 }, 6000).call(function () {
                _this.caishen.x = 1024 - 250;
                _this.caishen.skewY = 0;
                _this._tween_x = egret.Tween.get(_this.caishen).to({ x: 0 }, 6000).call(function () {
                    _this.caishen.x = 250;
                    _this.caishen.skewY = 180;
                    _this._tween_x = egret.Tween.get(_this.caishen).to({ x: 1472 + 250 }, 800).call(function () {
                        //注销事件
                        _this.removeEventListener(egret.Event.ENTER_FRAME, _this.onShowGold, _this);
                        //停止动画
                        _this.caishen.clean();
                        //移除界面
                        _this.removeChild(_this.caishen);
                        //显示回调函数
                        _this.callback();
                    });
                    ;
                });
            });
        });
        //掉金币
        this.addEventListener(egret.Event.ENTER_FRAME, this.onShowGold, this);
    };
    //判断显示金币
    CaiShen_Flay.prototype.onShowGold = function (e) {
        //显示金币
        this.showGold();
    };
    //显示金币
    CaiShen_Flay.prototype.showGold = function () {
        var _this = this;
        //定义变量
        var img_gold = new eui.Image();
        var now_speed = Math.random() * 2000 + 1000;
        //定义金币
        img_gold.y = 200;
        img_gold.alpha = 0;
        img_gold.source = "icon_gold_png";
        if (this.caishen.skewY == 0) {
            img_gold.x = this.caishen.x + Math.random() * 250 - 30;
        }
        else {
            img_gold.x = this.caishen.x - Math.random() * 250;
        }
        this.addChild(img_gold);
        var _tween_alpha = egret.Tween.get(img_gold).to({ alpha: 1 }, 500).wait(now_speed - 1000).to({ alpha: 0 }, 500);
        var _tween_y = egret.Tween.get(img_gold).to({ y: 1000 }, now_speed).call(function () {
            _this.removeChild(img_gold);
        });
    };
    //显示界面
    CaiShen_Flay.prototype.onShow = function (e) {
        //判断显示界面
        if (this.now_speed < 0) {
            this.caishen.x = this.caishen.x + this.now_speed;
            //判断显示界面
            if (this.caishen.x < 0) {
                this.now_speed = 10;
                this.caishen.x = 250;
                this.caishen.skewY = 180;
            }
        }
        else {
            this.caishen.x = this.caishen.x + this.now_speed;
            //判断显示界面
            if (this.caishen.x > 1024) {
                this.now_speed = -10;
                this.caishen.skewY = 0;
                this.caishen.x = 1024 - 250;
            }
        }
    };
    return CaiShen_Flay;
}(eui.Component));
__reflect(CaiShen_Flay.prototype, "CaiShen_Flay");
//# sourceMappingURL=CaiShen_Flay.js.map