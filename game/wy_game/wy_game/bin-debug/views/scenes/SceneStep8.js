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
 * @步骤8
 *
 */
var SceneStep8 = (function (_super) {
    __extends(SceneStep8, _super);
    //定义界面
    function SceneStep8() {
        var _this = _super.call(this) || this;
        _this.detail = [
            "**：刚才那真的只是梦么？还真是低俗的趣味啊，不过看起来梦里大家都成功“逃脱”了。",
            "唔，日记还在这里，这应该是一条很重要的线索，先把它记下来好了。",
            "不过事件显然没有纸面上写着的这么简单，我需要找到更多的线索才行。"
        ];
        //定义界面
        _this.skinName = SceneStep8Skin;
        //定义变量
        var monolog_data = {};
        //数据赋值
        monolog_data["detail_text"] = _this.detail;
        monolog_data["detail_type"] = [0, 0, 0];
        //定义独白
        _this.monolog = new Monolog(_this.over.bind(_this));
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
    SceneStep8.prototype.beforeShow = function (params) {
        var _this = this;
        //初始化显示
        this.monolog.visible = false;
        this.btn_next.visible = false;
        //定义位置
        this.monolog.x = (basic.StageProxy.width - this.monolog.width) / 2;
        this.monolog.y = basic.StageProxy.height - this.monolog.height - 150;
        //初始化遮罩 
        this.mask_action = new Action_Mask(this.img_mask);
        //隐藏遮罩
        this.mask_action.hide(function () {
            //显示按钮
            Action_Other.changeAlpha(0, 1, 500, _this.btn_next);
            //显示提示文本
            Action_Other.changeAlpha(0, 1, 500, _this.monolog, 0, function () {
                //显示文本独白
                _this.monolog.startAction();
            });
        });
    };
    //结束动画
    SceneStep8.prototype.over = function () {
        //隐藏按钮
        this.btn_next.visible = false;
        //显示遮罩
        this.mask_action.show(function () {
            //显示界面
            basic.SceneManager.show(SceneNames.STEP9);
        });
    };
    //开门按钮
    SceneStep8.prototype.onNextBtn = function (e) {
        //播放声音
        basic.SoundManager.instance.playEffect("sound_btn_mp3");
        //显示文本独白
        this.monolog.startAction();
    };
    return SceneStep8;
}(basic.SceneBase));
__reflect(SceneStep8.prototype, "SceneStep8");
//# sourceMappingURL=SceneStep8.js.map