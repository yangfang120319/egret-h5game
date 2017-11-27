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
 * @步骤14
 *
 */
var SceneStep14 = (function (_super) {
    __extends(SceneStep14, _super);
    //定义界面
    function SceneStep14() {
        var _this = _super.call(this) || this;
        _this.detail = [
            "小偷：这雨下得可真够大的。警官，要不咱们在这住一晚再走吧？",
            "警察：我劝你最好不要动什么玩脑筋。",
            " ",
            "接着警察把小偷铐在了屋内，并指向门外的警车，询问是否有谁愿意搭把手？",
            "前去帮忙,留守屋内"
        ];
        //定义界面
        _this.skinName = SceneStep14Skin;
        //定义变量
        var monolog_data = {};
        //数据赋值
        monolog_data["detail_text"] = _this.detail;
        monolog_data["detail_type"] = [0, 0, 0, 0, 1];
        //定义独白
        _this.monolog = new Monolog(_this.over.bind(_this), _this.btnchange.bind(_this), _this.stopMonolog.bind(_this), 380);
        _this.monolog.show(monolog_data);
        //显示界面
        _this.addChild(_this.monolog);
        //定义最上层
        _this.setChildIndex(_this.btn_next, _this.numChildren - 1);
        _this.setChildIndex(_this.img_mask, _this.numChildren - 1);
        //定义遮罩
        _this.rect_mask.visible = true;
        _this.com_person.mask = _this.rect_mask;
        //注册按钮
        _this.btn_next.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onNextBtn, _this);
        return _this;
    }
    //注册侦听
    SceneStep14.prototype.beforeShow = function (params) {
        var _this = this;
        //初始化显示
        UserData.User_Choose[3] = -1;
        this.monolog.visible = false;
        this.btn_next.visible = false;
        this.com_person.visible = false;
        //定义位置
        this.monolog.x = (basic.StageProxy.width - this.monolog.width) / 2;
        this.monolog.y = basic.StageProxy.height - this.monolog.height - 150;
        //初始化遮罩 
        this.mask_action = new Action_Mask(this.img_mask);
        //隐藏遮罩
        this.mask_action.hide(function () {
            //显示按钮
            Action_Other.changeAlpha(0, 1, 500, _this.btn_next);
            //显示人物
            _this.com_person.currentState = "2";
            Action_Other.changeAlpha(0, 1, 500, _this.com_person);
            //显示独白
            Action_Other.changeAlpha(0, 1, 500, _this.monolog, 0, function () {
                //开始独白
                _this.monolog.startAction();
            });
        });
    };
    //结束动画
    SceneStep14.prototype.over = function () {
        //隐藏按钮
        this.btn_next.visible = false;
        //显示遮罩
        this.mask_action.show(function () {
            //显示界面
            basic.SceneManager.show(SceneNames.STEP15);
        });
    };
    //按钮改变
    SceneStep14.prototype.btnchange = function () {
        var _this = this;
        //数据赋值
        UserData.User_Choose[3] = this.monolog.now_choose;
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
    //停止动画
    SceneStep14.prototype.stopMonolog = function () {
        //判断显示
        if (this.monolog.now_show > 2) {
            //开始独白
            this.monolog.startAction();
        }
    };
    //下一步按钮
    SceneStep14.prototype.onNextBtn = function (e) {
        //播放声音
        basic.SoundManager.instance.playEffect("sound_btn_mp3");
        //判断显示按钮
        if (this.monolog.now_show == 1) {
            this.com_person.visible = true;
            this.com_person.currentState = "1";
        }
        else {
            this.com_person.visible = false;
        }
        //开始独白
        this.monolog.startAction();
    };
    return SceneStep14;
}(basic.SceneBase));
__reflect(SceneStep14.prototype, "SceneStep14");
//# sourceMappingURL=SceneStep14.js.map