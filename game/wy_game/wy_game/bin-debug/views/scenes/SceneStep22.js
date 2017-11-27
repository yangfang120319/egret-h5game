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
var SceneStep22 = (function (_super) {
    __extends(SceneStep22, _super);
    //定义界面
    function SceneStep22() {
        var _this = _super.call(this) || this;
        _this.detail00 = [
            "**来到女演员的2C房间",
            "**：这个房间非常简洁",
            "此时**看到梳妆台上女演员的口红，想起小偷衣服上的印记",
            "正当**准备将这重大发现告诉大家时，楼下传来了女演员的惨叫",
            "**：该死，又怎么了？"
        ];
        _this.detail01 = [
            "**来到自己和医生所在的2B房间的窗台边",
            "**：伤口的确非常可疑……",
            "此时**看见医生随身携带的医药箱，发现里面有一把带血的大号手术刀",
            "**：真是披着天使外壳的恶魔！",
            "正当**准备将这重大发现告诉大家时，楼下传来了女演员的惨叫",
            "**：该死，又怎么了？"
        ];
        _this.detail02 = [
            "**来到警察和小偷所在的2A房间的窗台边",
            "**：烟灰的确非常可疑……",
            "此时主角回忆起小偷曾经想向警察借烟，经过调查，果然在窗台附近找到了相同的烟灰",
            "**：狡猾的老狐狸，我可能遇到了一个假警察！",
            "正当**准备将这重大发现告诉大家时，楼下传来了警察的惨叫",
            "**：该死，又怎么了？"
        ];
        _this.detail10 = [
            "**来到警察和小偷所在的2A房间的卫生间",
            "**：这铁杆还真结实，难道小偷昨天真的是在这里过夜的？",
            "**：难道只是因为金钱纠葛而引发的凶杀案吗？那么嫌疑最大的应该是……",
            "此时**回忆起警察说过的话，掀起了马桶的水箱盖，在水箱里找到了丢失的钱包",
            "**：狡猾的家伙，我早就该想到一副手铐怎么可能困得住一个小偷呢！",
            "正当**准备将这重大发现告诉大家时，楼下传来了小偷的惨叫",
            "**：该死，又怎么了？"
        ];
        _this.detail11 = [
            "**来到自己和医生所在的2B房间的窗台边",
            "**：伤口的确非常可疑……",
            "此时**看见医生随身携带的医药箱，发现里面有一把带血的大号手术刀",
            "**：真是披着天使外壳的恶魔！",
            "正当**准备将这重大发现告诉大家时，楼下传来了小偷的惨叫",
            "**：该死，又怎么了？"
        ];
        _this.detail12 = [
            "**来到警察和小偷所在的2A房间的窗台边",
            "**：烟灰的确非常可疑……",
            "此时主角回忆起小偷曾经想向警察借烟，经过调查，果然在窗台附近找到了相同的烟灰",
            "**：狡猾的老狐狸，我可能遇到了一个假警察！",
            "正当**准备将这重大发现告诉大家时，楼下传来了警察的惨叫",
            "**：该死，又怎么了？"
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
    SceneStep22.prototype.beforeShow = function (params) {
        var _this = this;
        //初始化显示
        this.btn_next.visible = false;
        this.com_person.visible = false;
        this.img_back.source = "back_step11_jpg";
        //定义变量
        var monolog_data = {};
        //数据赋值
        if (UserData.User_Choose[3] == 0) {
            if (UserData.User_Choose[4] == 0) {
                monolog_data["detail_text"] = this.detail00;
                monolog_data["detail_type"] = [0, 0, 0, 0, 0];
            }
            else if (UserData.User_Choose[4] == 1) {
                monolog_data["detail_text"] = this.detail01;
                monolog_data["detail_type"] = [0, 0, 0, 0, 0, 0];
            }
            else if (UserData.User_Choose[4] == 2) {
                monolog_data["detail_text"] = this.detail02;
                monolog_data["detail_type"] = [0, 0, 0, 0, 0, 0];
            }
        }
        else {
            if (UserData.User_Choose[4] == 0) {
                monolog_data["detail_text"] = this.detail10;
                monolog_data["detail_type"] = [0, 0, 0, 0, 0, 0, 0];
            }
            else if (UserData.User_Choose[4] == 1) {
                monolog_data["detail_text"] = this.detail11;
                monolog_data["detail_type"] = [0, 0, 0, 0, 0, 0];
            }
            else if (UserData.User_Choose[4] == 2) {
                monolog_data["detail_text"] = this.detail12;
                monolog_data["detail_type"] = [0, 0, 0, 0, 0, 0];
            }
        }
        //定义独白
        this.monolog = new Monolog(this.over.bind(this), null, this.stopcallback.bind(this));
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
    SceneStep22.prototype.over = function () {
        //隐藏按钮
        this.btn_next.visible = false;
        //显示遮罩
        this.mask_action.show(function () {
            //显示界面
            basic.SceneManager.show(SceneNames.STEP23);
        });
    };
    //停止下一步
    SceneStep22.prototype.stopcallback = function () {
        //判断播放声音
        if (UserData.User_Choose[3] == 0) {
            if (UserData.User_Choose[4] == 0) {
                if (this.monolog.now_show == 3) {
                    //播放声音
                    basic.SoundManager.instance.playEffect("sound_nyy_dj_mp3");
                }
            }
            else if (UserData.User_Choose[4] == 1) {
                if (this.monolog.now_show == 4) {
                    //播放声音
                    basic.SoundManager.instance.playEffect("sound_nyy_dj_mp3");
                }
            }
            else if (UserData.User_Choose[4] == 2) {
                if (this.monolog.now_show == 4) {
                    //播放声音
                    basic.SoundManager.instance.playEffect("sound_jc_dj_mp3");
                }
            }
        }
        else {
            if (UserData.User_Choose[4] == 0) {
                if (this.monolog.now_show == 5) {
                    //播放声音
                    basic.SoundManager.instance.playEffect("sound_xt_dj_mp3");
                }
            }
            else if (UserData.User_Choose[4] == 1) {
                if (this.monolog.now_show == 4) {
                    //播放声音
                    basic.SoundManager.instance.playEffect("sound_xt_dj_mp3");
                }
            }
            else if (UserData.User_Choose[4] == 2) {
                if (this.monolog.now_show == 4) {
                    //播放声音
                    basic.SoundManager.instance.playEffect("sound_jc_dj_mp3");
                }
            }
        }
        //开始独白
        this.monolog.startAction();
    };
    //下一步按钮
    SceneStep22.prototype.onNextBtn = function (e) {
        //播放声音
        basic.SoundManager.instance.playEffect("sound_btn_mp3");
        //判断播放声音
        if (UserData.User_Choose[3] == 0) {
            if (UserData.User_Choose[4] == 0) {
                if (this.monolog.now_show == 3) {
                    //播放声音
                    basic.SoundManager.instance.playEffect("sound_nyy_dj_mp3");
                }
            }
            else if (UserData.User_Choose[4] == 1) {
                if (this.monolog.now_show == 4) {
                    //播放声音
                    basic.SoundManager.instance.playEffect("sound_nyy_dj_mp3");
                }
            }
            else if (UserData.User_Choose[4] == 2) {
                if (this.monolog.now_show == 4) {
                    //播放声音
                    basic.SoundManager.instance.playEffect("sound_jc_dj_mp3");
                }
            }
        }
        else {
            if (UserData.User_Choose[4] == 0) {
                if (this.monolog.now_show == 5) {
                    //播放声音
                    basic.SoundManager.instance.playEffect("sound_xt_dj_mp3");
                }
            }
            else if (UserData.User_Choose[4] == 1) {
                if (this.monolog.now_show == 4) {
                    //播放声音
                    basic.SoundManager.instance.playEffect("sound_xt_dj_mp3");
                }
            }
            else if (UserData.User_Choose[4] == 2) {
                if (this.monolog.now_show == 4) {
                    //播放声音
                    basic.SoundManager.instance.playEffect("sound_jc_dj_mp3");
                }
            }
        }
        //开始独白
        this.monolog.startAction();
    };
    return SceneStep22;
}(basic.SceneBase));
__reflect(SceneStep22.prototype, "SceneStep22");
//# sourceMappingURL=SceneStep22.js.map