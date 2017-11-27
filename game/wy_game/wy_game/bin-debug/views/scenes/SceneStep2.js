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
 * @步骤2
 *
 */
var SceneStep2 = (function (_super) {
    __extends(SceneStep2, _super);
    //定义界面
    function SceneStep2() {
        var _this = _super.call(this) || this;
        _this.detail = [
            "这个神秘人让我调查一个恶名昭著的庄园，并找到他失踪的女儿。从随信附着的支票数额来看应该不可能是恶作剧。但更吸引我注意的是……**。",
            "**，他曾经为我赢得财富与名望，而他现在理应被人遗忘。但有人不仅记得这个名字，还找到了我……究竟是谁？看来想知道这个答案，此行是在所难免了。"
        ];
        //定义界面
        _this.skinName = SceneStep2Skin;
        //定义变量
        var monolog_data = {};
        //数据赋值
        monolog_data["detail_text"] = _this.detail;
        monolog_data["detail_type"] = [0, 0];
        //定义独白
        _this.monolog = new Monolog(_this.over.bind(_this));
        _this.monolog.show(monolog_data);
        //显示界面
        _this.addChild(_this.monolog);
        //定义最上层
        _this.setChildIndex(_this.img_mask, _this.numChildren - 1);
        //注册按钮
        _this.btn_open.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onOpenBtn, _this);
        _this.btn_next.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onNextBtn, _this);
        return _this;
    }
    //注册侦听
    SceneStep2.prototype.beforeShow = function (params) {
        //初始化显示
        this.g_xf.visible = false;
        this.monolog.visible = false;
        this.btn_open.visible = true;
        this.txt_tips.visible = true;
        this.btn_next.visible = false;
        //定义位置
        this.monolog.x = (basic.StageProxy.width - this.monolog.width) / 2;
        this.monolog.y = basic.StageProxy.height - this.monolog.height - 150;
        //初始化遮罩 
        this.mask_action = new Action_Mask(this.img_mask);
        //隐藏遮罩
        this.mask_action.hide();
    };
    //结束动画
    SceneStep2.prototype.over = function () {
        //隐藏按钮
        this.btn_next.visible = false;
        //显示遮罩
        this.mask_action.show(function () {
            //显示界面
            basic.SceneManager.show(SceneNames.STEP3);
        });
    };
    //打开信封按钮
    SceneStep2.prototype.onOpenBtn = function (e) {
        //播放声音
        basic.SoundManager.instance.playEffect("sound_btn_mp3");
        //显示界面
        this.g_xf.visible = true;
        this.btn_open.visible = false;
        this.txt_tips.visible = false;
        //显示按钮
        Action_Other.changeAlpha(0, 1, 500, this.btn_next);
    };
    //下一步按钮
    SceneStep2.prototype.onNextBtn = function (e) {
        var _this = this;
        //播放声音
        basic.SoundManager.instance.playEffect("sound_btn_mp3");
        //判断显示
        if (this.g_xf.visible == true) {
            //隐藏提示
            this.g_xf.visible = false;
            this.btn_next.enabled = false;
            //显示提示文本
            Action_Other.changeAlpha(0, 1, 500, this.monolog, 0, function () {
                //显示按钮
                _this.btn_next.enabled = true;
                //开始独白
                _this.monolog.startAction();
            });
        }
        else {
            //开始独白
            this.monolog.startAction();
        }
    };
    return SceneStep2;
}(basic.SceneBase));
__reflect(SceneStep2.prototype, "SceneStep2");
//# sourceMappingURL=SceneStep2.js.map