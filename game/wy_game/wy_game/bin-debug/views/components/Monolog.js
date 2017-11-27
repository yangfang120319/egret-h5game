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
 * @内容界面
 *
 */
var Monolog = (function (_super) {
    __extends(Monolog, _super);
    //初始化
    function Monolog(_overcallback, _btncallback, _stopcallback, _max_height, _min_height) {
        if (_overcallback === void 0) { _overcallback = null; }
        if (_btncallback === void 0) { _btncallback = null; }
        if (_stopcallback === void 0) { _stopcallback = null; }
        if (_max_height === void 0) { _max_height = 800; }
        if (_min_height === void 0) { _min_height = 200; }
        var _this = _super.call(this) || this;
        _this.detail_num = 0;
        _this.detail_text = [];
        _this.detail_type = [];
        _this.detail_face = [];
        _this.now_choose = -1;
        _this.now_show = 0;
        //定义界面
        _this.skinName = MonologSkin;
        //定义遮罩
        _this.rect_mask.visible = true;
        _this.g_text.mask = _this.rect_mask;
        //数据赋值
        _this.max_height = _max_height;
        _this.min_height = _min_height;
        _this.btncallback = _btncallback;
        _this.overcallback = _overcallback;
        _this.stopcallback = _stopcallback;
        return _this;
    }
    //初始化界面
    Monolog.prototype.show = function (_detail, _now_show) {
        if (_now_show === void 0) { _now_show = 0; }
        //定义变量
        var now_show_y = 0;
        //初始化界面
        this.detail_text = _detail.detail_text;
        this.detail_type = _detail.detail_type;
        this.detail_num = this.detail_text.length;
        //显示界面
        for (var i = 0; i < this.detail_num; i++) {
            //判断显示
            if (this.detail_type[i] == 0) {
                //定义变量
                var now_text = new TextDetail();
                //定义高度
                now_text.y = now_show_y;
                //数据赋值
                now_show_y += now_text.assHeight(this.detail_text[i]) + 25;
                this.detail_face[i] = now_text;
            }
            else if (this.detail_type[i] == 1) {
                //定义变量
                var now_choosebtn = new ChooseBtn();
                //初始化界面
                now_choosebtn.info(this.detail_text[i].split(","), this.btnCallBack.bind(this));
                //定义高度
                now_choosebtn.y = now_show_y;
                //数据赋值
                now_show_y += now_choosebtn.height + 25;
                this.detail_face[i] = now_choosebtn;
            }
            //显示界面
            this.detail_face[i].visible = false;
            this.g_text.addChild(this.detail_face[i]);
            //判断显示按钮
            this.now_show = _now_show;
            if (i < _now_show) {
                //显示界面
                this.detail_face[i].visible = true;
                //判断显示
                if (this.detail_type[i] == 0) {
                    this.detail_face[i].showText(this.detail_text[i]);
                }
                else if (this.detail_type[i] == 1) {
                    this.detail_face[i].showChoose(this.now_choose);
                }
                //判断显示状态
                if (this.detail_type[i] == 0) {
                    this.detail_face[i].changeTextColor();
                }
                else if (this.detail_type[i] == 1) {
                    this.detail_face[i].touchEnabled = false;
                    this.detail_face[i].touchChildren = false;
                }
            }
            else if (i == _now_show) {
                //显示界面
                this.detail_face[i].visible = true;
            }
        }
        //显示高度
        this.height = Math.max(this.min_height, Math.min(this.max_height, now_show_y + 100 - 25));
        console.log(this.height);
        //显示遮罩
        this.rect_mask.height = this.height - 100;
    };
    //移除界面
    Monolog.prototype.clean = function () {
        //移除界面
        for (var i = 0; i < this.detail_num; i++) {
            //移除界面
            this.g_text.removeChild(this.detail_face[i]);
        }
        //清空文本
        this.detail_num = 0;
        this.detail_text = [];
        this.detail_type = [];
        this.detail_face = [];
    };
    //停止动画
    Monolog.prototype.stop = function () {
        //判断停止动画
        if (this.now_show > 0) {
            if (this.detail_type[this.now_show - 1] == 0) {
                //停止独白
                this.detail_face[this.now_show - 1].stop();
                this.detail_face[this.now_show - 1].changeTextColor();
                //判断显示位置
                this.jugeShowPlace();
            }
        }
    };
    //开始动画
    Monolog.prototype.startAction = function () {
        var _this = this;
        //判断停止动画
        if (this.now_show > 0 && this.now_show <= this.detail_num) {
            if (this.detail_type[this.now_show - 1] == 0) {
                this.detail_face[this.now_show - 1].stop();
                this.detail_face[this.now_show - 1].changeTextColor();
            }
            else {
                this.detail_face[this.now_show - 1].touchEnabled = false;
                this.detail_face[this.now_show - 1].touchChildren = false;
            }
        }
        //开始动画
        if (this.now_show == this.detail_num + 1) {
            //显示回调函数
            if (this.overcallback) {
                this.overcallback();
            }
        }
        else if (this.now_show == this.detail_num) {
            if (this.detail_type[this.now_show - 1] == 1) {
                //显示回调函数
                if (this.overcallback) {
                    this.overcallback();
                }
            }
        }
        else if (this.now_show < this.detail_num) {
            this.detail_face[this.now_show].visible = true;
            if (this.detail_type[this.now_show] == 0) {
                this.detail_face[this.now_show].start(this.detail_text[this.now_show], function () {
                    //判断停止动画
                    if (_this.stopcallback) {
                        _this.stopcallback();
                    }
                    else {
                        //开始动画
                        _this.startAction();
                    }
                }, function () {
                    if (_this.now_show > 0) {
                        //判断显示位置
                        _this.jugeShowPlace();
                    }
                });
            }
            else {
                //按钮回调
                if (this.btncallback) {
                    this.btncallback();
                }
            }
        }
        //数据赋值
        this.now_show += 1;
        //判断显示位置
        this.jugeShowPlace();
    };
    //位置赋值
    Monolog.prototype.jugeShowPlace = function () {
        //判断显示
        if (this.now_show <= this.detail_num) {
            //数据赋值
            var show_height = this.detail_face[this.now_show - 1].y + this.detail_face[this.now_show - 1].height;
            //判断显示
            if (show_height > this.rect_mask.height) {
                //显示位置
                this.g_text.y = this.rect_mask.y - (show_height - this.rect_mask.height);
            }
        }
        else {
            //数据赋值
            var show_height = this.detail_face[this.detail_num - 1].y + this.detail_face[this.detail_num - 1].height;
            //判断显示
            if (show_height > this.rect_mask.height) {
                //显示位置
                this.g_text.y = this.rect_mask.y - (show_height - this.rect_mask.height);
            }
        }
    };
    //按钮回调函数
    Monolog.prototype.btnCallBack = function (_choose) {
        //数据赋值
        this.now_choose = _choose;
        //按钮回调
        if (this.btncallback) {
            this.btncallback();
        }
    };
    return Monolog;
}(eui.Component));
__reflect(Monolog.prototype, "Monolog");
//# sourceMappingURL=Monolog.js.map