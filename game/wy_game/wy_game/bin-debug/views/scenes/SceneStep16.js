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
 * @步骤16
 *
 */
var SceneStep16 = (function (_super) {
    __extends(SceneStep16, _super);
    //定义界面
    function SceneStep16() {
        var _this = _super.call(this) || this;
        _this.detail = [
            "大家都了解完情况后，开始分配房间。警察和小偷住2A，**和医生住2B，女演员住2C",
            "各自回房之后，由于房间老旧的缘故，到处都有一些吱吱嘎嘎的声音。",
            "**隐约听到犯人又开始自言自语起来，而警察貌似有些不耐烦了，狠狠地给了他一拳警告他闭嘴。",
            "而另一边，女演员似乎在和谁对话，起初好像是在吵架，后来越来越轻，显然演员刻意压低了声音，所以不知道后面在说什么⋯⋯",
            "不知过了多久，**便睡着了。",
        ];
        //定义界面
        _this.skinName = SceneStep16Skin;
        //注册按钮
        _this.btn_next.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onNextBtn, _this);
        return _this;
    }
    //注册侦听
    SceneStep16.prototype.beforeShow = function (params) {
        var _this = this;
        //初始化显示
        this.btn_next.visible = false;
        //定义变量
        var monolog_data = {};
        //数据赋值
        monolog_data["detail_text"] = this.detail;
        monolog_data["detail_type"] = [0, 0, 0, 0, 0];
        //定义独白
        this.monolog = new Monolog(this.over.bind(this));
        this.monolog.show(monolog_data);
        //显示界面
        this.addChild(this.monolog);
        this.monolog.visible = false;
        //定义最上层
        this.setChildIndex(this.btn_next, this.numChildren - 1);
        this.setChildIndex(this.img_mask, this.numChildren - 1);
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
    SceneStep16.prototype.over = function () {
        //隐藏按钮
        this.btn_next.visible = false;
        //显示遮罩
        this.mask_action.show(function () {
            //显示界面
            basic.SceneManager.show(SceneNames.STEP17);
        });
    };
    //下一步按钮
    SceneStep16.prototype.onNextBtn = function (e) {
        //播放声音
        basic.SoundManager.instance.playEffect("sound_btn_mp3");
        //开始独白
        this.monolog.startAction();
    };
    return SceneStep16;
}(basic.SceneBase));
__reflect(SceneStep16.prototype, "SceneStep16");
//# sourceMappingURL=SceneStep16.js.map