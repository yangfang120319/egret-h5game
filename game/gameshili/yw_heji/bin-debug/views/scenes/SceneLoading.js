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
 * @加载界面
 *
 */
var SceneLoading = (function (_super) {
    __extends(SceneLoading, _super);
    //定义界面
    function SceneLoading() {
        var _this = _super.call(this) || this;
        //定义界面
        _this.skinName = SceneLoadingSkin;
        //定义界面
        _this.txt_tips.text = "";
        _this.txt_password.inputType = egret.TextFieldInputType.PASSWORD;
        _this.txt_password.displayAsPassword = true;
        //注册事件
        basic.Dispatcher.addListener(EventNames.SHOW_USERMESSAGE, _this.onShowMessage, _this);
        basic.Dispatcher.addListener(EventNames.SHOW_NEWACCOUNT, _this.onShowNewAccount, _this);
        //注册按钮
        _this.btn_login.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onLogin, _this);
        _this.btn_start.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onStartBtn, _this);
        _this.txt_account.addEventListener(egret.FocusEvent.FOCUS_IN, _this.onAccountText, _this);
        _this.txt_account.addEventListener(egret.FocusEvent.FOCUS_OUT, _this.onAccountText, _this);
        _this.txt_password.addEventListener(egret.FocusEvent.FOCUS_IN, _this.onPasswordText, _this);
        _this.txt_password.addEventListener(egret.FocusEvent.FOCUS_OUT, _this.onPasswordText, _this);
        return _this;
    }
    //显示加载进度
    SceneLoading.prototype.onLoadingProgress = function (event) {
        //定义变量
        var num_now_loader = (event.data.itemsLoaded / event.data.itemsTotal) * 100;
        //显示进度条
        this.pb_loading.value = num_now_loader;
        //显示文本
        this.txt_loading.text = Math.floor(num_now_loader).toString() + "%";
    };
    //注册侦听
    SceneLoading.prototype.beforeShow = function (params) {
        //隐藏界面
        this.g_login.visible = false;
        this.g_loading.visible = false;
        this.btn_start.visible = true;
        //判断显示
        if (GameConfig.isApp() == true && egret.Capabilities.os == "iOS") {
            this.txt_account.text = UserData.User_Account;
            this.txt_password.text = UserData.User_Password;
        }
        else {
            //判断显示
            if (basic.localStorage.getItem('account') != null && basic.localStorage.getItem('account') != "") {
                //数据赋值
                this.txt_account_tips.visible = false;
                this.txt_account.text = basic.localStorage.getItem('account');
                if (basic.localStorage.getItem('password') != null && basic.localStorage.getItem('password') != "") {
                    this.txt_password_tips.visible = false;
                    this.txt_password.text = basic.localStorage.getItem('password');
                }
                else {
                    this.txt_password.text = "";
                    this.txt_password_tips.visible = true;
                }
            }
            else {
                this.txt_account.text = "";
                this.txt_account_tips.visible = true;
                //判断显示
                if (Comm.instance.jugeConnect() == true) {
                    //判断注册账号
                    Comm.instance.sendSocket({ "type": "newAccount" });
                }
                else {
                    //判断注册账号
                    this.connectNetRegister();
                }
            }
        }
        this.txt_tips.text = "";
        //注册事件
        basic.Dispatcher.addListener(EventNames.LOADING_PROGRESS, this.onLoadingProgress, this);
    };
    //注销侦听
    SceneLoading.prototype.beforeHide = function () {
        //注销事件
        basic.Dispatcher.removeListener(EventNames.LOADING_PROGRESS, this.onLoadingProgress, this);
    };
    //显示新用户
    SceneLoading.prototype.onShowNewAccount = function (e) {
        //数据赋值
        UserData.User_Account = e.data.account;
        UserData.User_Password = e.data.password;
        //显示用户信息
        this.txt_account_tips.visible = false;
        this.txt_password_tips.visible = false;
        this.txt_account.text = UserData.User_Account;
        this.txt_password.text = UserData.User_Password;
        //判断保存数据
        if (GameConfig.isApp() == true) {
            if (egret.Capabilities.os == "iOS") {
                window["IOSsaveAccount"](UserData.User_Account);
                window["IOSsavePassword"](UserData.User_Password);
            }
            else if (egret.Capabilities.os == "Android") {
                basic.localStorage.setItem('account', UserData.User_Account);
                basic.localStorage.setItem('password', UserData.User_Password);
            }
        }
        else {
            basic.localStorage.setItem('account', UserData.User_Account);
            basic.localStorage.setItem('password', UserData.User_Password);
        }
    };
    //显示用户信息
    SceneLoading.prototype.onShowMessage = function (e) {
        //显示用户信息
        this.txt_account.text = UserData.User_Account;
        this.txt_password.text = UserData.User_Password;
        //判断显示
        if (e.data.showtype == 0) {
            if (UserData.User_Account == "") {
                this.txt_account_tips.visible = true;
                //判断显示
                if (Comm.instance.jugeConnect() == true) {
                    //判断注册账号
                    Comm.instance.sendSocket({ "type": "newAccount" });
                }
                else {
                    //判断注册账号
                    this.connectNetRegister();
                }
            }
            else {
                this.txt_account_tips.visible = false;
            }
        }
        else if (e.data.showtype == 1) {
            if (UserData.User_Password == "") {
                this.txt_password_tips.visible = true;
            }
            else {
                this.txt_password_tips.visible = false;
            }
        }
    };
    //账号文本事件
    SceneLoading.prototype.onAccountText = function (e) {
        //判断显示
        if (e.type == egret.FocusEvent.FOCUS_IN) {
            //隐藏界面
            this.txt_account_tips.visible = false;
        }
        else if (e.type == egret.FocusEvent.FOCUS_OUT) {
            //判断显示
            if (this.txt_account.text == "") {
                this.txt_account_tips.visible = true;
            }
        }
    };
    //密码文本事件
    SceneLoading.prototype.onPasswordText = function (e) {
        //判断显示
        if (e.type == egret.FocusEvent.FOCUS_IN) {
            //隐藏界面
            this.txt_password_tips.visible = false;
        }
        else if (e.type == egret.FocusEvent.FOCUS_OUT) {
            //判断显示
            if (this.txt_password.text == "") {
                this.txt_password_tips.visible = true;
            }
        }
    };
    //开始按钮
    SceneLoading.prototype.onStartBtn = function (e) {
        //显示界面
        this.g_login.visible = true;
        this.g_loading.visible = false;
        this.btn_start.visible = false;
        //播放声音
        basic.SoundManager.instance.playEffect("sound_btn_mp3");
    };
    //登陆按钮
    SceneLoading.prototype.onLogin = function (e) {
        //清空文本
        this.txt_tips.text = "";
        //播放声音
        basic.SoundManager.instance.playEffect("sound_btn_mp3");
        //判断显示
        if (this.txt_account.text == "") {
            this.txt_tips.text = "请输入账号！";
        }
        else if (this.txt_password.text == "") {
            this.txt_tips.text = "请输入密码！";
        }
        else {
            //判断链接数据库
            if (Comm.instance.jugeConnect() == true) {
                //显示提示
                this.txt_tips.text = "登陆中...";
                //数据赋值
                UserData.User_Account = this.txt_account.text;
                UserData.User_Password = this.txt_password.text;
                //发送消息
                Comm.instance.sendSocket({
                    "type": "login",
                    "account": this.txt_account.text,
                    "password": this.txt_password.text
                });
            }
            else {
                //显示提示
                this.txt_tips.text = "登陆中...";
                //数据赋值
                UserData.User_Account = this.txt_account.text;
                UserData.User_Password = this.txt_password.text;
                //链接数据库
                this.connectNetLogin();
            }
        }
    };
    //判断注册账号
    SceneLoading.prototype.connectNetRegister = function () {
        var _this = this;
        //链接数据库
        Comm.instance.init();
        //登陆游戏
        egret.setTimeout(function () {
            //判断显示
            if (Comm.instance.jugeConnect() == true) {
                //判断注册账号
                Comm.instance.sendSocket({ "type": "newAccount" });
            }
            else {
                //链接数据库
                _this.connectNetRegister();
            }
        }, this, 300);
    };
    //链接数据库登陆
    SceneLoading.prototype.connectNetLogin = function () {
        var _this = this;
        //链接数据库
        Comm.instance.init();
        //登陆游戏
        egret.setTimeout(function () {
            //判断显示
            if (Comm.instance.jugeConnect() == true) {
                //发送消息
                Comm.instance.sendSocket({
                    "type": "login",
                    "account": _this.txt_account.text,
                    "password": _this.txt_password.text
                });
            }
            else {
                //链接数据库
                _this.connectNetLogin();
            }
        }, this, 300);
    };
    return SceneLoading;
}(basic.SceneBase));
__reflect(SceneLoading.prototype, "SceneLoading");
