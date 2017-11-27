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
var SceneStep25 = (function (_super) {
    __extends(SceneStep25, _super);
    //定义界面
    function SceneStep25() {
        var _this = _super.call(this) || this;
        _this.detail000 = [
            "**察觉事情可能有蹊跷，想要尽快将真相告诉警察。并且顺路在厨房中拿了一把餐刀防身。",
            "**推推门进去一看，女演员和警察已经倒在了血泊之中。",
            "因为**早有防备，医生的偷袭没有成功。",
            "双方经过一场激烈的争斗后，**终于将医生杀死……"
        ];
        _this.detail001 = [
            "由于**没有发现任何可疑的地方，想和警察汇报情况后再做打算。",
            "主角推门进去一看，女演员和警察已经倒在了血泊之中。",
            "因为**没有防备医生成功偷袭主角，将手术刀插进了**的心脏。",
            "**意识消失之前迷迷糊糊地看着医生吧自己拖向划有献祭纹样的地下室深处……"
        ];
        _this.detail02 = [
            "**察觉事情可能有蹊跷，觉得凶手另有其人。并且顺路在厨房中拿了一把餐刀防身。",
            "**推门进去一看，警察已经倒在了血泊之中，医生夺了警察随身携带的左轮手枪与**和女演员对峙。",
            "在激烈的混战中，**不幸中弹，而医生也被**从厨房拿到的餐刀刺死。",
            "弥留之际，**期望女演员好好活下去……"
        ];
        _this.detail100 = [
            "**察觉事情可能有蹊跷，想要尽快将真相告诉警察。并且顺路在厨房中拿了一把餐刀防身。",
            "**推门进去一看，小偷和警察已经倒在了血泊之中。",
            "因为**早有防备，医生的偷袭并没有成功。",
            "双方经过一场激烈的斗争后，**终于将医生杀死……"
        ];
        _this.detail101 = [
            "由于**没有发现任何可疑的地方，想和警察汇报情况后再做打算。",
            "主角推门进去一看，小偷和警察已经倒在了血泊之中。",
            "因为**没有防备医生成功偷袭主角，将手术刀插进了**的心脏。",
            "**意识消失之前迷迷糊糊地看着医生吧自己拖向划有献祭纹样的地下室深处……"
        ];
        _this.detail12 = [
            "**察觉事情可能有蹊跷，觉得凶手另有其人。并且顺路在厨房中拿了一把餐刀防身。",
            "**推门进去一看，警察已经倒在了血泊之中，因为**早有防备，医生的偷袭并没有成功。。",
            "双方经过一场激烈的斗争后，**将餐刀刺进了医生的胸膛。",
            "正当**以为一切都结束的时候，医生拿出警察的枪朝着**射了一枪……",
            "此时门外，小偷发动了警察的汽车准备驶离这栋恐怖的庄园。"
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
    SceneStep25.prototype.beforeShow = function (params) {
        var _this = this;
        //初始化显示
        this.btn_next.visible = false;
        this.com_person.visible = false;
        //定义变量
        var monolog_data = {};
        //数据赋值
        if (UserData.User_Choose[3] == 0) {
            if (UserData.User_Choose[4] == 0) {
                //判断显示
                if (UserData.User_Choose[5] == 0) {
                    monolog_data["detail_text"] = this.detail000;
                    monolog_data["detail_type"] = [0, 0, 0, 0, 0, 0, 0, 0];
                    this.img_back.source = "back_step12_jpg";
                }
                else if (UserData.User_Choose[5] == 1) {
                    monolog_data["detail_text"] = this.detail001;
                    monolog_data["detail_type"] = [0, 0, 0, 0, 0, 0, 0, 0];
                    this.img_back.source = "back_step17_jpg";
                }
            }
            else if (UserData.User_Choose[4] == 2) {
                monolog_data["detail_text"] = this.detail02;
                monolog_data["detail_type"] = [0, 0, 0, 0, 0, 0, 0, 0];
                this.img_back.source = "back_step16_jpg";
            }
        }
        else {
            if (UserData.User_Choose[4] == 0) {
                //判断显示
                if (UserData.User_Choose[5] == 0) {
                    monolog_data["detail_text"] = this.detail100;
                    monolog_data["detail_type"] = [0, 0, 0, 0, 0, 0, 0, 0];
                    this.img_back.source = "back_step12_jpg";
                }
                else if (UserData.User_Choose[5] == 1) {
                    monolog_data["detail_text"] = this.detail101;
                    monolog_data["detail_type"] = [0, 0, 0, 0, 0, 0, 0, 0];
                    this.img_back.source = "back_step17_jpg";
                }
            }
            else if (UserData.User_Choose[4] == 2) {
                monolog_data["detail_text"] = this.detail12;
                monolog_data["detail_type"] = [0, 0, 0, 0, 0, 0, 0, 0];
                this.img_back.source = "back_step13_jpg";
            }
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
    SceneStep25.prototype.over = function () {
        //隐藏按钮
        this.btn_next.visible = false;
        //显示遮罩
        this.mask_action.show(function () {
            //显示界面
            basic.SceneManager.show(SceneNames.OVER);
        });
    };
    //下一步按钮
    SceneStep25.prototype.onNextBtn = function (e) {
        //播放声音
        basic.SoundManager.instance.playEffect("sound_btn_mp3");
        //开始独白
        this.monolog.startAction();
    };
    return SceneStep25;
}(basic.SceneBase));
__reflect(SceneStep25.prototype, "SceneStep25");
//# sourceMappingURL=SceneStep25.js.map