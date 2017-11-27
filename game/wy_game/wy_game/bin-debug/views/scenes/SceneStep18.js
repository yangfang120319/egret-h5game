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
 * @步骤17
 *
 */
var SceneStep18 = (function (_super) {
    __extends(SceneStep18, _super);
    //定义界面
    function SceneStep18() {
        var _this = _super.call(this) || this;
        _this.detail0 = [
            "来到地下室后，眼前的一幕让**惊呆了，小偷被杀了，胸口插着一把餐刀，死在了地下室的纹样旁。"
        ];
        _this.detail1 = [
            "来到地下室后，眼前的一幕让**惊呆了，女演员被杀了，胸口插着一把餐刀，死在了地下室的纹样旁。"
        ];
        //定义界面
        _this.skinName = SceneStep17Skin;
        //定义遮罩
        _this.rect_mask.visible = true;
        _this.com_person.mask = _this.rect_mask;
        //注册按钮
        _this.btn_next.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onNextBtn, _this);
        return _this;
    }
    //注册侦听
    SceneStep18.prototype.beforeShow = function (params) {
        var _this = this;
        //初始化显示
        this.img_head.visible = false;
        this.btn_next.visible = false;
        this.com_person.visible = false;
        this.img_back.source = "back_step10_jpg";
        //定义变量
        var monolog_data = {};
        //数据赋值
        if (UserData.User_Choose[3] == 0) {
            this.img_head.source = "icon_head3_png";
            monolog_data["detail_text"] = this.detail0;
            monolog_data["detail_type"] = [0];
        }
        else {
            this.img_head.source = "icon_head2_png";
            monolog_data["detail_text"] = this.detail1;
            monolog_data["detail_type"] = [0];
        }
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
        this.img_head.y = this.monolog.y - 387 + 30;
        //初始化遮罩 
        this.mask_action = new Action_Mask(this.img_mask);
        //隐藏遮罩
        this.mask_action.hide(function () {
            //显示按钮
            Action_Other.changeAlpha(0, 1, 500, _this.btn_next);
            //显示头像
            Action_Other.changeAlpha(0, 1, 500, _this.img_head);
            //显示独白
            Action_Other.changeAlpha(0, 1, 500, _this.monolog, 0, function () {
                //开始独白
                _this.monolog.startAction();
            });
        });
    };
    //结束动画
    SceneStep18.prototype.over = function () {
        //隐藏按钮
        this.btn_next.visible = false;
        //显示遮罩
        this.mask_action.show(function () {
            //显示界面
            basic.SceneManager.show(SceneNames.STEP19);
        });
    };
    //下一步按钮
    SceneStep18.prototype.onNextBtn = function (e) {
        //播放声音
        basic.SoundManager.instance.playEffect("sound_btn_mp3");
        //开始独白
        this.monolog.startAction();
    };
    return SceneStep18;
}(basic.SceneBase));
__reflect(SceneStep18.prototype, "SceneStep18");
//# sourceMappingURL=SceneStep18.js.map