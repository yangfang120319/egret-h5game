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
 * @步骤9
 *
 */
var SceneStep9 = (function (_super) {
    __extends(SceneStep9, _super);
    //定义界面
    function SceneStep9() {
        var _this = _super.call(this) || this;
        _this.detail0 = [
            "**：让我们重新回到1楼的玄关开始看看！",
            "**：很好，另一组脚印！从这脚印的大小来看，应该是年轻女子没错。但是门外却没有发现相同的痕迹，难道⋯⋯",
            "随脚印到二楼,继续调查1楼",
            "从这些痕迹的方向来看，是通往二楼的，难道刚刚就在眼皮底下错过了？事不宜迟，回到1楼看看吧。",
            "**：总感觉还遗漏了点什么⋯⋯咦？玄关的地毯地毯下面好像有什么东西？",
            "**：一把钥匙！应该是某些地方的备用钥匙，总之先把它收起来。说不定是2楼某个房间的钥匙，去调查看看。"
        ];
        _this.detail1 = [
            "**：让我们重新回到1楼的玄关开始看看！",
            "**：很好，另一组脚印！从这脚印的大小来看，应该是年轻女子没错。但是门外却没有发现相同的痕迹，难道⋯⋯",
            "随脚印到二楼,继续调查1楼",
            "**：总感觉还遗漏了点什么⋯⋯咦？玄关的地毯地毯下面好像有什么东西？",
            "**：一把钥匙！应该是某些地方的备用钥匙，总之先把它收起来。说不定是2楼某个房间的钥匙，去调查看看。"
        ];
        //定义界面
        _this.skinName = SceneStep9Skin;
        //定义变量
        var monolog_data = {};
        //数据赋值
        monolog_data["detail_text"] = _this.detail0;
        monolog_data["detail_type"] = [0, 0, 1, 0, 0, 0];
        //定义独白
        _this.monolog = new Monolog(_this.over.bind(_this), _this.btnchange.bind(_this));
        ;
        _this.monolog.show(monolog_data);
        //显示界面
        _this.addChild(_this.monolog);
        //定义最上层
        _this.setChildIndex(_this.btn_next, _this.numChildren - 1);
        _this.setChildIndex(_this.img_mask, _this.numChildren - 1);
        //注册按钮
        _this.btn_next.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onNextBtn, _this);
        return _this;
    }
    //注册侦听
    SceneStep9.prototype.beforeShow = function (params) {
        var _this = this;
        //初始化显示
        UserData.User_Choose[2] = -1;
        this.btn_next.visible = false;
        this.monolog.visible = false;
        //定义位置
        this.monolog.x = (basic.StageProxy.width - this.monolog.width) / 2;
        this.monolog.y = basic.StageProxy.height - this.monolog.height - 150;
        //初始化遮罩 
        this.mask_action = new Action_Mask(this.img_mask);
        //隐藏遮罩
        this.mask_action.hide(function () {
            //显示按钮
            Action_Other.changeAlpha(0, 1, 500, _this.btn_next);
            //显示独白
            Action_Other.changeAlpha(0, 1, 500, _this.monolog, 0, function () {
                //开始独白
                _this.monolog.startAction();
            });
        });
    };
    //结束动画
    SceneStep9.prototype.over = function () {
        //隐藏按钮
        this.btn_next.visible = false;
        //隐藏独白
        Action_Other.changeAlpha(1, 0, 500, this.monolog);
        //显示遮罩
        this.mask_action.show(function () {
            //显示界面
            basic.SceneManager.show(SceneNames.STEP10);
        });
    };
    //按钮改变
    SceneStep9.prototype.btnchange = function () {
        var _this = this;
        //数据赋值
        UserData.User_Choose[2] = this.monolog.now_choose;
        //判断显示
        if (this.monolog.detail_type[this.monolog.now_show] == 1) {
            //隐藏按钮
            this.btn_next.enabled = false;
            Action_Other.changeAlpha(1, 0, 500, this.btn_next, 0, function () {
                _this.btn_next.enabled = true;
            });
        }
        else {
            if (this.btn_next.visible == false) {
                //显示按钮
                Action_Other.changeAlpha(0, 1, 500, this.btn_next);
            }
        }
    };
    //下一步按钮
    SceneStep9.prototype.onNextBtn = function (e) {
        //播放声音
        basic.SoundManager.instance.playEffect("sound_btn_mp3");
        //判断显示下一个
        if (this.monolog.detail_type[this.monolog.now_show - 1] == 1) {
            //移除界面
            this.monolog.clean();
            //定义变量
            var monolog_data = {};
            //数据赋值
            if (UserData.User_Choose[2] == 0) {
                monolog_data["detail_text"] = this.detail0;
                monolog_data["detail_type"] = [0, 0, 1, 0, 0, 0];
            }
            else {
                monolog_data["detail_text"] = this.detail1;
                monolog_data["detail_type"] = [0, 0, 1, 0, 0];
            }
            //显示界面
            this.monolog.show(monolog_data, this.monolog.now_show);
        }
        //开始独白
        this.monolog.startAction();
    };
    return SceneStep9;
}(basic.SceneBase));
__reflect(SceneStep9.prototype, "SceneStep9");
//# sourceMappingURL=SceneStep9.js.map