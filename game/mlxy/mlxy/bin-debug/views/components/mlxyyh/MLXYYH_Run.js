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
 * @马来西亚银行-跑动画
 *
 */
var MLXYYH_Run = (function (_super) {
    __extends(MLXYYH_Run, _super);
    function MLXYYH_Run() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.box_num = [];
        _this.box = [];
        _this.run_boxnum = 26;
        _this.run_fasttime = 100;
        _this.run_maxshownum = 5;
        _this.run_overboxnum = 15;
        _this.run_startboxnum = 10;
        _this.run_middlecircle = 2;
        _this.run_overtime = [100, 100, 100, 100, 215, 215, 225, 236, 500, 500, 500, 500, 500, 500, 500, 500, 500, 500, 500, 500];
        _this.run_starttime = [300, 275, 260, 220, 200, 160, 150, 130, 110, 100];
        _this.timer_StartRun = null;
        _this.timer_MiddleRun = null;
        _this.timer_OverRun = null;
        _this.hide_time = 350;
        return _this;
    }
    //初始化
    MLXYYH_Run.prototype.createChildren = function () {
        _super.prototype.createChildren.call(this);
        //数据赋值
        for (var i = 0; i < this.run_boxnum; i++) {
            //定义变量
            var now_box = this["box" + i];
            //数据赋值
            this.box[i] = now_box;
        }
        //注册事件
        basic.Dispatcher.addListener(EventNames.MLXYYH_SHOW_BOXLIGHT, this.onShowBoxLight, this);
    };
    //初始化界面
    MLXYYH_Run.prototype.info = function (_type) {
        //判断显示
        this.run_type = _type;
        //显示Box
        for (var i = 0; i < this.run_boxnum; i++) {
            //数据赋值
            if (this.run_type == 0) {
                //数据赋值
                GameData.MLXYYH_Box_X[i] = this.box[i].x;
                GameData.MLXYYH_Box_Y[i] = this.box[i].y;
                //初始化
                this.box[i].info(GameData.MLXYYH_BoxNum_Left[i]);
            }
            else if (this.run_type == 1) {
                this.box[i].info(GameData.MLXYYH_BoxNum_Right[i]);
            }
            //判断显示
            if (i < 6) {
                if (i == 2) {
                    this.box[i].showMaskWidth(80);
                }
                else {
                    this.box[i].showMaskWidth(79);
                }
            }
            else if (i < 13) {
                if (i == 9) {
                    this.box[i].showMaskHeight(80);
                }
                else {
                    this.box[i].showMaskHeight(79);
                }
            }
            else if (i == 13) {
                this.box[i].showMaskHeight(75);
            }
            else if (i > 13 && i < 20) {
                if (i == 17) {
                    this.box[i].showMaskWidth(80);
                }
                else {
                    this.box[i].showMaskWidth(79);
                }
                this.box[i].showMaskHeight(75);
            }
            else if (i < 25) {
                if (i == 23) {
                    this.box[i].showMaskHeight(80);
                }
                else {
                    this.box[i].showMaskHeight(79);
                }
            }
            else if (i == 25) {
                this.box[i].showMaskY(-3);
                this.box[i].showMaskHeight(82);
            }
        }
    };
    //显示当前
    MLXYYH_Run.prototype.showNow = function (_data) {
        //数据赋值
        this.run_now = _data.pos;
        if (this.run_type == 0) {
            GameData.MLXYYH_RunOver_Left = _data.pos;
            if (_data.isWin == true) {
                GameData.MLXYYH_RunOver_IsWin_Left = true;
            }
            else {
                GameData.MLXYYH_RunOver_IsWin_Left = false;
            }
        }
        else if (this.run_type == 1) {
            GameData.MLXYYH_RunOver_Right = _data.pos;
            if (_data.isWin == true) {
                GameData.MLXYYH_RunOver_IsWin_Right = true;
            }
            else {
                GameData.MLXYYH_RunOver_IsWin_Right = false;
            }
        }
        //显示界面
        for (var i = 0; i < this.run_boxnum; i++) {
            //数据赋值
            if (i == this.run_now) {
                this.box[i].showBox(0);
            }
            else {
                this.box[i].hideBox(0);
            }
            this.box[i].hideMask();
        }
    };
    //清除界面
    MLXYYH_Run.prototype.clean = function () {
        //数据赋值
        for (var i = 0; i < this.run_boxnum; i++) {
            this.box[i].clean();
        }
    };
    //显示遮罩
    MLXYYH_Run.prototype.showMask = function () {
        for (var i = 0; i < this.run_boxnum; i++) {
            this.box[i].showMask();
        }
    };
    //开始播放
    MLXYYH_Run.prototype.startPlay = function (_data) {
        //数据赋值
        if (this.run_type == 0) {
            GameData.MLXYYH_RunOver_Left = _data.pos;
            if (_data.isWin == true) {
                GameData.MLXYYH_RunOver_IsWin_Left = true;
            }
            else {
                GameData.MLXYYH_RunOver_IsWin_Left = false;
            }
        }
        else if (this.run_type == 1) {
            GameData.MLXYYH_RunOver_Right = _data.pos;
            if (_data.isWin == true) {
                GameData.MLXYYH_RunOver_IsWin_Right = true;
            }
            else {
                GameData.MLXYYH_RunOver_IsWin_Right = false;
            }
        }
        //开始转圈
        this.runStart();
    };
    //判断播放声音
    MLXYYH_Run.prototype.jugePlaySound = function () {
        //判断复制
        if (GameData.MLXYYH_RunOverNum_Left >= GameData.MLXYYH_RunOverNum_Right) {
            if (this.run_type == 0) {
                return true;
            }
            else {
                return false;
            }
        }
        else {
            if (this.run_type == 0) {
                return false;
            }
            else {
                return true;
            }
        }
    };
    //开始转圈
    MLXYYH_Run.prototype.runStart = function () {
        //开始动画
        var total_num;
        //数据赋值
        this.now_overnum = 0;
        this.now_startnum = 0;
        total_num = this.run_boxnum * this.run_middlecircle;
        this.run_overboxnum = Math.floor(Math.random() * 8) + 12;
        //显示遮罩
        this.showMask();
        //判断赋值
        if (this.run_type == 0) {
            GameData.MLXYYH_RunOverNum_Left = this.run_overboxnum;
            total_num += GameData.MLXYYH_RunOver_Left - this.run_now;
            this.run_middlenum = total_num - this.run_startboxnum - this.run_overboxnum;
            GameData.MLXYYH_RunMiddleNum_Left = this.run_middlenum;
        }
        else if (this.run_type == 1) {
            GameData.MLXYYH_RunOverNum_Right = this.run_overboxnum;
            total_num += this.run_boxnum - (GameData.MLXYYH_RunOver_Right - this.run_now);
            this.run_middlenum = total_num - this.run_startboxnum - this.run_overboxnum;
            GameData.MLXYYH_RunMiddleNum_Right = this.run_middlenum;
        }
        //隐藏界面
        if (this.run_starttime[this.now_startnum] < 200) {
            this.box[this.run_now].hideBox(this.hide_time);
        }
        //开始等待
        this.timer_StartRun = new egret.Timer(this.run_starttime[this.now_startnum], 1);
        this.timer_StartRun.addEventListener(egret.TimerEvent.TIMER_COMPLETE, this.onSatrtRunComplete, this);
        this.timer_StartRun.start();
    };
    //开始转圈结束
    MLXYYH_Run.prototype.onSatrtRunComplete = function (e) {
        //注销事件
        if (this.timer_StartRun) {
            this.timer_StartRun.stop();
            this.timer_StartRun.removeEventListener(egret.TimerEvent.TIMER_COMPLETE, this.onSatrtRunComplete, this);
            this.timer_StartRun = null;
        }
        if (this.jugePlaySound() == true) {
            basic.SoundManager.instance.playEffect("sound_mlxyyh_runover_mp3");
        }
        //判断隐藏界面
        if (this.run_starttime[this.now_startnum] >= 200) {
            this.box[this.run_now].hideBox(0);
        }
        //数据赋值
        if (this.run_type == 0) {
            this.run_now += 1;
            if (this.run_now >= this.run_boxnum) {
                this.run_now = 0;
            }
        }
        else if (this.run_type == 1) {
            this.run_now -= 1;
            if (this.run_now < 0) {
                this.run_now = this.run_boxnum - 1;
            }
        }
        //显示框
        this.box[this.run_now].showBox(0);
        //判断显示
        this.now_startnum += 1;
        if (this.now_startnum < this.run_startboxnum) {
            //隐藏界面
            if (this.run_starttime[this.now_startnum] < 200) {
                this.box[this.run_now].hideBox(this.hide_time);
            }
            //开始等待
            this.timer_StartRun = new egret.Timer(this.run_starttime[this.now_startnum], 1);
            this.timer_StartRun.addEventListener(egret.TimerEvent.TIMER_COMPLETE, this.onSatrtRunComplete, this);
            this.timer_StartRun.start();
        }
        else {
            //开始中间转圈
            this.runMiddle();
        }
    };
    //中间转圈
    MLXYYH_Run.prototype.runMiddle = function () {
        //判断赋值
        if (this.run_type == 0) {
            if (GameData.MLXYYH_RunMiddleNum_Left < GameData.MLXYYH_RunMiddleNum_Right) {
                this.run_fasttime = 100;
            }
            else {
                this.run_fasttime = 100 * GameData.MLXYYH_RunMiddleNum_Right / GameData.MLXYYH_RunMiddleNum_Left;
            }
        }
        else if (this.run_type == 1) {
            if (GameData.MLXYYH_RunMiddleNum_Left < GameData.MLXYYH_RunMiddleNum_Right) {
                this.run_fasttime = 100 * GameData.MLXYYH_RunMiddleNum_Left / GameData.MLXYYH_RunMiddleNum_Right;
            }
            else {
                this.run_fasttime = 100;
            }
        }
        //隐藏界面
        this.box[this.run_now].hideBox(this.hide_time);
        //开始等待
        this.timer_MiddleRun = new egret.Timer(this.run_fasttime, this.run_middlenum);
        this.timer_MiddleRun.addEventListener(egret.TimerEvent.TIMER, this.onMiddleRun, this);
        this.timer_MiddleRun.addEventListener(egret.TimerEvent.TIMER_COMPLETE, this.onMiddleRunComplete, this);
        this.timer_MiddleRun.start();
    };
    //中间转圈中
    MLXYYH_Run.prototype.onMiddleRun = function (e) {
        //判断播放声音
        if (this.jugePlaySound() == true) {
            basic.SoundManager.instance.playEffect("sound_mlxyyh_runover_mp3");
        }
        //数据赋值
        if (this.run_type == 0) {
            this.run_now += 1;
            if (this.run_now >= this.run_boxnum) {
                this.run_now = 0;
            }
            //隐藏界面
            if (this.run_now == 0) {
                this.box[this.run_boxnum - 1].hideBox(this.hide_time);
            }
            else {
                this.box[this.run_now - 1].hideBox(this.hide_time);
            }
        }
        else if (this.run_type == 1) {
            this.run_now -= 1;
            if (this.run_now < 0) {
                this.run_now = this.run_boxnum - 1;
            }
            //隐藏界面
            if (this.run_now == this.run_boxnum - 1) {
                this.box[0].hideBox(this.hide_time);
            }
            else {
                this.box[this.run_now + 1].hideBox(this.hide_time);
            }
        }
        //显示框
        this.box[this.run_now].showBox(0);
    };
    //中间转圈结束
    MLXYYH_Run.prototype.onMiddleRunComplete = function () {
        //注销事件
        if (this.timer_MiddleRun) {
            this.timer_MiddleRun.stop();
            this.timer_MiddleRun.removeEventListener(egret.TimerEvent.TIMER, this.onMiddleRun, this);
            this.timer_MiddleRun.removeEventListener(egret.TimerEvent.TIMER_COMPLETE, this.onMiddleRunComplete, this);
            this.timer_MiddleRun = null;
        }
        //停止声音
        basic.SoundManager.instance.stopEffect();
        //结束转圈
        this.runOver();
    };
    //结束转圈
    MLXYYH_Run.prototype.runOver = function () {
        //隐藏界面
        if (this.run_overtime[this.now_overnum] < 500) {
            this.box[this.run_now].hideBox(this.hide_time);
        }
        //播放声音
        if (this.jugePlaySound() == true) {
            basic.SoundManager.instance.playEffect("sound_mlxyyh_runover_mp3");
        }
        //开始等待
        this.timer_OverRun = new egret.Timer(this.run_overtime[this.now_overnum], 1);
        this.timer_OverRun.addEventListener(egret.TimerEvent.TIMER_COMPLETE, this.onOverRunComplete, this);
        this.timer_OverRun.start();
    };
    //结束转圈结束
    MLXYYH_Run.prototype.onOverRunComplete = function (e) {
        var _this = this;
        //停止等待
        if (this.timer_OverRun) {
            this.timer_OverRun.stop();
            this.timer_OverRun.removeEventListener(egret.TimerEvent.TIMER_COMPLETE, this.onOverRunComplete, this);
            this.timer_OverRun = null;
        }
        //隐藏界面
        if (this.run_overtime[this.now_overnum] >= 200) {
            this.box[this.run_now].hideBox(0);
        }
        //数据赋值
        if (this.run_type == 0) {
            this.run_now += 1;
            if (this.run_now >= this.run_boxnum) {
                this.run_now = 0;
            }
        }
        else if (this.run_type == 1) {
            this.run_now -= 1;
            if (this.run_now < 0) {
                this.run_now = this.run_boxnum - 1;
            }
        }
        //显示框
        this.box[this.run_now].showBox(0);
        //判断结束
        this.now_overnum += 1;
        if (this.now_overnum < this.run_overboxnum) {
            //隐藏界面
            if (this.run_overtime[this.now_overnum] < 500) {
                this.box[this.run_now].hideBox(this.hide_time);
            }
            //播放声音
            if (this.jugePlaySound() == true) {
                basic.SoundManager.instance.playEffect("sound_mlxyyh_runover_mp3");
            }
            //开始等待
            this.timer_OverRun = new egret.Timer(this.run_overtime[this.now_overnum], 1);
            this.timer_OverRun.addEventListener(egret.TimerEvent.TIMER_COMPLETE, this.onOverRunComplete, this);
            this.timer_OverRun.start();
        }
        else {
            //播放声音
            basic.SoundManager.instance.playEffect("sound_mlxyyh_runzhong_mp3");
            //发送消息
            egret.setTimeout(function () {
                //判断发送消息
                if (_this.jugePlaySound() == true) {
                    //发送消息
                    basic.Dispatcher.dispatch(EventNames.MLXYYH_RUNOVER);
                }
            }, this, 300);
        }
    };
    //Box发光
    MLXYYH_Run.prototype.showBoxLight = function (_index) {
        //开始发光
        for (var i = 0; i < this.run_boxnum; i++) {
            if (this.box[i].box_num == _index) {
                this.box[i].startLight();
            }
        }
    };
    //显示Box发光
    MLXYYH_Run.prototype.onShowBoxLight = function (e) {
        //开始发
        for (var i = 0; i < 7; i++) {
            //判断开始发光
            if (GameData.MLXYYH_YaZhu_User[i] > 0) {
                //发光
                this.showBoxLight(i);
            }
        }
    };
    return MLXYYH_Run;
}(eui.Component));
__reflect(MLXYYH_Run.prototype, "MLXYYH_Run");
//# sourceMappingURL=MLXYYH_Run.js.map