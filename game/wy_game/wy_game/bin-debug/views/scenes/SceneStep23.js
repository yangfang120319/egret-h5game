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
 * @步骤23
 *
 */
var SceneStep23 = (function (_super) {
    __extends(SceneStep23, _super);
    //定义界面
    function SceneStep23() {
        var _this = _super.call(this) || this;
        _this.detail00 = [
            "**急忙赶到楼下，发现女演员满口鲜血躺在地上，而医生正在为她抢救。",
            "**：发生了什么！",
            "警察：刚才这家伙说想要喝水，我就让她待着我去帮她拿。谁知她喝完水就晕过去了。",
            "医生：她中毒了，水没问题我们都喝过了！",
            "**：我刚才在她房间发现了和小偷衣服上留下的印记一样的口红。",
            "医生：什么？该死一定是她！",
            "警察：等她醒来一定让她交代清楚。",
            "**继续调查，医生和警察则留在房间照顾演员",
            "地下室,二楼"
        ];
        _this.detail01 = [
            "**急忙赶到楼下，发现女演员已经死了，而医生已经不知所踪。",
            "**：发生了什么！",
            "警察：刚才这个家伙说想要喝水，我就叫他呆着别动，我去帮他拿。谁知道我回来的时候发现他不知道哪里藏了一把手术刀，将女演员捅死了，还把我给划伤了。",
            "**：我刚才在房间里发现他的手术刀少了一把，看来医生就是凶手。",
            "警察：真是该死的家伙！等找到他一定要狠狠的教训他一顿！",
            "就在此时他们发现医生已经架着警察的车开走了，警察和**决定一起追查凶手。",
            "驾驶女演员的汽车追,先回自己房间收拾行李"
        ];
        _this.detail02 = [
            "**急忙赶到楼下，发现警察已经昏迷不醒，而医生正在为警察急救。",
            "**：发生了什么！",
            "女演员：刚才这家伙说想要抽根烟，我就从他的上衣口袋里拿了一根给他。谁知道过了没多久他突然就开始抽搐，医生已经为他做过急救处理了，暂时没有危险。",
            "医生：他患有很严重的肺病，可能是平时抽烟太多日积月累下来的毛病。虽然现在性命没有危险，但一时半会是醒不过来了。",
            "**：我刚才在窗台边发现了和尸体旁边一样的烟灰，这位警察很可能和这桩案件有关联！",
            "女演员：什么？这年头警察杀人？等他醒了之后一定要让他把整个犯罪过程交代清楚！",
            "大家一致认为已经找到了凶手，小偷和医生留下继续看守警察，**继续调查。",
            "地下室,二楼"
        ];
        _this.detail10 = [
            "**急忙赶到楼下，发现小偷的嘴里满是鲜血，已经进入休克状态，而医生正在为小偷急救。",
            "**：发生了什么！",
            "警察：刚才这家伙说想要喝水，我就叫他待着别动，我去帮他拿。谁知道我回来的时候，发现他在吞什么东西，医生虽然在竭力制止，但还是被他咽下去了。",
            "医生：那是一根金属铁丝，我也不知道他是从哪里掏出来的，我急忙赶过去阻止，但还是没来得及。现在这家伙的喉咙被铁丝戳破了，虽然性命没有危险，但一时半会是醒不过来了。",
            "**：我刚才在马桶的水箱里发现了失窃的钱包，看来小偷就是用铁丝解开的手铐。",
            "警察：盗窃加杀人，真是该死的家伙！等他醒了之后一定要让他把整个犯罪过程交代清楚！",
            "大家一致认为已经找到了凶手，警察和医生留下继续看守犯人，**继续调查。",
            "地下室,二楼"
        ];
        _this.detail11 = [
            "**急忙赶到楼下，发现小偷已经死了，而医生已经不知所踪。",
            "**：发生了什么！",
            "警察：刚才这个家伙说想要喝水，我就叫他呆着别动，我去帮他拿。谁知道我回来的时候发现他不知道哪里藏了一把手术刀，将小偷捅死了，还把我给划伤了。",
            "**我刚才在房间里发现他的手术刀少了一把，看来医生就是凶手。",
            "警察：真是该死的家伙！等找到他一定要狠狠的教训他一顿！",
            "就在此时他们发现医生已经架着警察的车开走了，警察和**决定一起追查凶手。",
            "驾驶女演员的汽车追,先回自己房间收拾行李"
        ];
        _this.detail12 = [
            "**急忙赶到楼下，发现警察已经昏迷不醒，而医生正在为警察急救。",
            "**：发生了什么！",
            "小偷：刚才这家伙说想要抽根烟，我就从他的上衣口袋里拿了一根给他。谁知道过了没多久他突然就开始抽搐，医生已经为他做过急救处理了，暂时没有危险。",
            "医生：他患有很严重的肺病，可能是平时抽烟太多日积月累下来的毛病。虽然现在性命没有危险，但一时半会是醒不过来了。",
            "**：我刚才在窗台边发现了和尸体旁边一样的烟灰，这位警察很可能和这桩案件有关联！",
            "小偷：什么？这年头警察杀人？等他醒了之后一定要让他把整个犯罪过程交代清楚！",
            "大家一致认为已经找到了凶手，小偷和医生留下继续看守警察，**继续调查",
            "地下室,二楼"
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
    SceneStep23.prototype.beforeShow = function (params) {
        var _this = this;
        //初始化显示
        UserData.User_Choose[5] = -1;
        this.btn_next.visible = false;
        this.com_person.visible = false;
        this.img_back.source = "back_step4_jpg";
        //定义变量
        var monolog_data = {};
        //数据赋值
        if (UserData.User_Choose[3] == 0) {
            if (UserData.User_Choose[4] == 0) {
                monolog_data["detail_text"] = this.detail00;
                monolog_data["detail_type"] = [0, 0, 0, 0, 0, 0, 0, 0, 1];
            }
            else if (UserData.User_Choose[4] == 1) {
                monolog_data["detail_text"] = this.detail01;
                monolog_data["detail_type"] = [0, 0, 0, 0, 0, 0, 1];
            }
            else if (UserData.User_Choose[4] == 2) {
                monolog_data["detail_text"] = this.detail02;
                monolog_data["detail_type"] = [0, 0, 0, 0, 0, 0, 0, 1];
            }
        }
        else {
            if (UserData.User_Choose[4] == 0) {
                monolog_data["detail_text"] = this.detail10;
                monolog_data["detail_type"] = [0, 0, 0, 0, 0, 0, 0, 1];
            }
            else if (UserData.User_Choose[4] == 1) {
                monolog_data["detail_text"] = this.detail11;
                monolog_data["detail_type"] = [0, 0, 0, 0, 0, 0, 1];
            }
            else if (UserData.User_Choose[4] == 2) {
                monolog_data["detail_text"] = this.detail12;
                monolog_data["detail_type"] = [0, 0, 0, 0, 0, 0, 0, 1];
            }
        }
        //定义独白
        this.monolog = new Monolog(this.over.bind(this), this.btnchange.bind(this), this.stopMonolog.bind(this), 380);
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
    SceneStep23.prototype.over = function () {
        //隐藏按钮
        this.btn_next.visible = false;
        //显示遮罩
        this.mask_action.show(function () {
            //显示界面
            basic.SceneManager.show(SceneNames.STEP24);
        });
    };
    //按钮改变
    SceneStep23.prototype.btnchange = function () {
        var _this = this;
        //数据赋值
        UserData.User_Choose[5] = this.monolog.now_choose;
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
    SceneStep23.prototype.stopMonolog = function () {
        //判断显示
        if (this.monolog.now_show < 2) {
            //显示头像
            if (this.monolog.now_show == 1) {
                this.com_person.visible = true;
                this.com_person.currentState = "4";
            }
            //开始独白
            this.monolog.startAction();
        }
    };
    //下一步按钮
    SceneStep23.prototype.onNextBtn = function (e) {
        //播放声音
        basic.SoundManager.instance.playEffect("sound_btn_mp3");
        //判断清楚
        if (UserData.User_Choose[3] == 0) {
            if (UserData.User_Choose[4] == 0) {
                if (this.monolog.now_show == 1) {
                    this.com_person.visible = true;
                    this.com_person.currentState = "4";
                }
                else if (this.monolog.now_show == 2) {
                    this.com_person.visible = true;
                    this.com_person.currentState = "1";
                }
                else if (this.monolog.now_show == 3) {
                    this.com_person.visible = true;
                    this.com_person.currentState = "0";
                }
                else if (this.monolog.now_show == 4) {
                    this.com_person.visible = true;
                    this.com_person.currentState = "4";
                }
                else if (this.monolog.now_show == 5) {
                    this.com_person.visible = true;
                    this.com_person.currentState = "0";
                }
                else if (this.monolog.now_show == 6) {
                    this.com_person.visible = true;
                    this.com_person.currentState = "1";
                }
                else {
                    this.com_person.visible = false;
                }
            }
            else if (UserData.User_Choose[4] == 1) {
                if (this.monolog.now_show == 1) {
                    this.com_person.visible = true;
                    this.com_person.currentState = "4";
                }
                else if (this.monolog.now_show == 2) {
                    this.com_person.visible = true;
                    this.com_person.currentState = "1";
                }
                else if (this.monolog.now_show == 3) {
                    this.com_person.visible = true;
                    this.com_person.currentState = "4";
                }
                else if (this.monolog.now_show == 4) {
                    this.com_person.visible = true;
                    this.com_person.currentState = "1";
                }
                else {
                    this.com_person.visible = false;
                }
            }
            else if (UserData.User_Choose[4] == 2) {
                if (this.monolog.now_show == 1) {
                    this.com_person.visible = true;
                    this.com_person.currentState = "4";
                }
                else if (this.monolog.now_show == 2) {
                    this.com_person.visible = true;
                    this.com_person.currentState = "3";
                }
                else if (this.monolog.now_show == 3) {
                    this.com_person.visible = true;
                    this.com_person.currentState = "0";
                }
                else if (this.monolog.now_show == 4) {
                    this.com_person.visible = true;
                    this.com_person.currentState = "4";
                }
                else if (this.monolog.now_show == 5) {
                    this.com_person.visible = true;
                    this.com_person.currentState = "3";
                }
                else {
                    this.com_person.visible = false;
                }
            }
        }
        else if (UserData.User_Choose[3] == 1) {
            if (UserData.User_Choose[4] == 0) {
                if (this.monolog.now_show == 1) {
                    this.com_person.visible = true;
                    this.com_person.currentState = "4";
                }
                else if (this.monolog.now_show == 2) {
                    this.com_person.visible = true;
                    this.com_person.currentState = "1";
                }
                else if (this.monolog.now_show == 3) {
                    this.com_person.visible = true;
                    this.com_person.currentState = "0";
                }
                else if (this.monolog.now_show == 4) {
                    this.com_person.visible = true;
                    this.com_person.currentState = "4";
                }
                else if (this.monolog.now_show == 5) {
                    this.com_person.visible = true;
                    this.com_person.currentState = "1";
                }
                else {
                    this.com_person.visible = false;
                }
            }
            else if (UserData.User_Choose[4] == 1) {
                if (this.monolog.now_show == 1) {
                    this.com_person.visible = true;
                    this.com_person.currentState = "4";
                }
                else if (this.monolog.now_show == 2) {
                    this.com_person.visible = true;
                    this.com_person.currentState = "1";
                }
                else if (this.monolog.now_show == 3) {
                    this.com_person.visible = true;
                    this.com_person.currentState = "4";
                }
                else if (this.monolog.now_show == 4) {
                    this.com_person.visible = true;
                    this.com_person.currentState = "1";
                }
                else {
                    this.com_person.visible = false;
                }
            }
            else if (UserData.User_Choose[4] == 2) {
                if (this.monolog.now_show == 1) {
                    this.com_person.visible = true;
                    this.com_person.currentState = "4";
                }
                else if (this.monolog.now_show == 2) {
                    this.com_person.visible = true;
                    this.com_person.currentState = "2";
                }
                else if (this.monolog.now_show == 3) {
                    this.com_person.visible = true;
                    this.com_person.currentState = "0";
                }
                else if (this.monolog.now_show == 4) {
                    this.com_person.visible = true;
                    this.com_person.currentState = "4";
                }
                else if (this.monolog.now_show == 5) {
                    this.com_person.visible = true;
                    this.com_person.currentState = "2";
                }
                else {
                    this.com_person.visible = false;
                }
            }
        }
        //开始独白
        this.monolog.startAction();
    };
    return SceneStep23;
}(basic.SceneBase));
__reflect(SceneStep23.prototype, "SceneStep23");
//# sourceMappingURL=SceneStep23.js.map