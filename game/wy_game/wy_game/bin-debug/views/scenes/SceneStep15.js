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
var SceneStep15 = (function (_super) {
    __extends(SceneStep15, _super);
    //定义界面
    function SceneStep15() {
        var _this = _super.call(this) || this;
        _this.detail0 = [
            "**：外面雨挺大的，我和你一起去吧。",
            "警察：多谢，那还请医生帮我看管一下小偷。",
            " ",
            "通过交谈了解到了警察虽然平时不苟言笑，却是个尽忠职守的老警察，不过马上就要退休了",
            "过了一会儿，**看到又有一辆车朝着他们驶来，车上下来了一位年轻漂亮的女士",
            " ",
            "演员：嗨，你们好。请问附近有旅馆么？回镇子的路被水淹了，我想找个地方投宿。",
            "警察：我的上帝？路被水淹了？",
            "**：很遗憾，女士。附近没有旅馆，只有一栋庄园，不嫌弃的话你可以在那住一宿。",
            "演员：唔，非常感谢。",
            "警察：咦？这位女士，你看起来很眼熟。我们是不是在哪见过？",
            "**：难道，你是那部《红白玫瑰》里的⋯⋯",
            "演员：呵，居然还有人认得我，真荣幸。不过，那都是过去的事了。",
            "警察：不不，你现在也一样光彩照人。要不这样吧，我们先去前面看看路况，如果真的没法走的话，你就随我们一起去庄园吧。",
        ];
        _this.detail1 = [
            "医生：外面雨挺大的，我和你一起去吧。",
            " ",
            "此时屋内只剩小偷和**两个人，通过交谈发现小偷只是个爱占小便宜，但是本性不坏的家伙。",
            "过了好一阵子，警察和医生修车回来，和他们一起回来的还有一位年轻漂亮的女士。",
            " ",
            "警察：没错，我和医生去确认了一下，唯一的出路的确已经被淹没了，看来我们今天都得在这过夜了。",
            "小偷：嘿嘿，我刚说什么来着，长官？我就知道我们今晚走不了。",
            "警察：如果你今天不想站着睡觉的话，那就给我安分点！"
        ];
        //定义界面
        _this.skinName = SceneStep15Skin;
        //定义遮罩
        _this.rect_mask.visible = true;
        _this.com_person.mask = _this.rect_mask;
        //注册按钮
        _this.btn_next.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onNextBtn, _this);
        return _this;
    }
    //注册侦听
    SceneStep15.prototype.beforeShow = function (params) {
        var _this = this;
        //初始化显示
        this.btn_next.visible = false;
        this.com_person.visible = false;
        //定义变量
        var monolog_data = {};
        //数据赋值
        if (UserData.User_Choose[3] == 0) {
            monolog_data["detail_text"] = this.detail0;
            monolog_data["detail_type"] = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
        }
        else {
            monolog_data["detail_text"] = this.detail1;
            monolog_data["detail_type"] = [0, 0, 0, 0, 0, 0, 0, 0];
        }
        //定义独白
        this.monolog = new Monolog(this.over.bind(this), null, this.stopMonolog.bind(this), 380);
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
            //显示人物
            if (UserData.User_Choose[3] == 1) {
                _this.com_person.currentState = "0";
                Action_Other.changeAlpha(0, 1, 500, _this.com_person);
            }
            else {
                _this.com_person.currentState = "4";
                Action_Other.changeAlpha(0, 1, 500, _this.com_person);
            }
            //显示独白
            Action_Other.changeAlpha(0, 1, 500, _this.monolog, 0, function () {
                //开始独白
                _this.monolog.startAction();
            });
        });
    };
    //结束动画
    SceneStep15.prototype.over = function () {
        //隐藏按钮
        this.btn_next.visible = false;
        //显示遮罩
        this.mask_action.show(function () {
            //显示界面
            basic.SceneManager.show(SceneNames.STEP16);
        });
    };
    //停止动画
    SceneStep15.prototype.stopMonolog = function () {
        //判断显示
        if (UserData.User_Choose[3] == 0) {
            //判断显示
            if (this.monolog.now_show > 1 && this.monolog.now_show <= 6) {
                //判断显示
                if (this.monolog.now_show == 6) {
                    this.com_person.visible = true;
                    this.com_person.currentState = "3";
                }
                //开始独白
                this.monolog.startAction();
            }
        }
        else {
            //判断显示
            if (this.monolog.now_show > 0 && this.monolog.now_show <= 5) {
                //判断显示
                if (this.monolog.now_show == 6) {
                    this.com_person.visible = true;
                    this.com_person.currentState = "3";
                }
                //开始独白
                this.monolog.startAction();
            }
        }
    };
    //下一步按钮
    SceneStep15.prototype.onNextBtn = function (e) {
        //播放声音
        basic.SoundManager.instance.playEffect("sound_btn_mp3");
        //判断显示按钮
        if (UserData.User_Choose[3] == 0) {
            if (this.monolog.now_show == 1) {
                this.com_person.visible = true;
                this.com_person.currentState = "1";
            }
            else if (this.monolog.now_show == 6) {
                this.com_person.visible = true;
                this.com_person.currentState = "3";
            }
            else if (this.monolog.now_show == 7) {
                this.com_person.visible = true;
                this.com_person.currentState = "1";
            }
            else if (this.monolog.now_show == 8) {
                this.com_person.visible = true;
                this.com_person.currentState = "4";
            }
            else if (this.monolog.now_show == 9) {
                this.com_person.visible = true;
                this.com_person.currentState = "3";
            }
            else if (this.monolog.now_show == 10) {
                this.com_person.visible = true;
                this.com_person.currentState = "1";
            }
            else if (this.monolog.now_show == 11) {
                this.com_person.visible = true;
                this.com_person.currentState = "4";
            }
            else if (this.monolog.now_show == 12) {
                this.com_person.visible = true;
                this.com_person.currentState = "3";
            }
            else if (this.monolog.now_show == 13) {
                this.com_person.visible = true;
                this.com_person.currentState = "1";
            }
            else {
                this.com_person.visible = false;
            }
        }
        else {
            if (this.monolog.now_show == 5) {
                this.com_person.visible = true;
                this.com_person.currentState = "1";
            }
            else if (this.monolog.now_show == 6) {
                this.com_person.visible = true;
                this.com_person.currentState = "2";
            }
            else if (this.monolog.now_show == 7) {
                this.com_person.visible = true;
                this.com_person.currentState = "1";
            }
            else {
                this.com_person.visible = false;
            }
        }
        //开始独白
        this.monolog.startAction();
    };
    return SceneStep15;
}(basic.SceneBase));
__reflect(SceneStep15.prototype, "SceneStep15");
//# sourceMappingURL=SceneStep15.js.map