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
 * @排行榜界面
 *
 */
var SceneRanking = (function (_super) {
    __extends(SceneRanking, _super);
    //初始化
    function SceneRanking() {
        var _this = _super.call(this) || this;
        _this.is_get = [false, false];
        _this.user_win = ["", ""];
        _this.user_level = [0, 0];
        _this.user_totalnum = [0, 0];
        //定义界面
        _this.skinName = SceneRankingSkin;
        //定义List
        _this.list0.dataProvider = _this._data0 = new eui.ArrayCollection();
        _this.list1.dataProvider = _this._data1 = new eui.ArrayCollection();
        _this.list0.itemRenderer = RankingListItem;
        _this.list1.itemRenderer = RankingListItem;
        //注册事件
        basic.Dispatcher.addListener(EventNames.SHOW_RANKING, _this.onShowRanking, _this);
        //注册按钮
        _this.tabbar.selectedIndex = 0;
        _this.tabbar.addEventListener(egret.Event.CHANGE, _this.onTabBarChange, _this);
        _this.btn_return.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onExitBtn, _this);
        return _this;
    }
    //显示前调用
    SceneRanking.prototype.beforeShow = function () {
        //数据赋值
        this.is_get = [false, false];
        this.viewstack.selectedIndex = this.tabbar.selectedIndex;
        //显示头像
        this.head.show(UserData.User_Head);
        this.txt_name.text = UserData.User_Name;
        //发送消息
        if (this.tabbar.selectedIndex == 0) {
            Comm.instance.sendSocket({ "type": "rank", "rankType": "rankByWeek" });
        }
        else {
            Comm.instance.sendSocket({ "type": "rank", "rankType": "rankByLevel" });
        }
    };
    //显示排行榜
    SceneRanking.prototype.onShowRanking = function (e) {
        //判断显示排行榜
        if (e.data.rankType == "rankByWeek") {
            //数据赋值
            this.is_get[0] = true;
            this.user_win[0] = e.data.playerRank.rate;
            this.user_level[0] = Math.max(0, e.data.playerRank.level);
            this.user_totalnum[0] = e.data.playerRank.count;
            //显示界面
            this._data0.source = e.data.rankList;
            this._data0.refresh();
            //显示用户信息
            this.showUserRanking(0);
        }
        else {
            //数据赋值
            this.is_get[1] = true;
            this.user_win[1] = e.data.playerRank.rate;
            this.user_level[1] = Math.max(0, e.data.playerRank.level);
            this.user_totalnum[1] = e.data.playerRank.count;
            //显示界面
            this._data1.source = e.data.rankList;
            this._data1.refresh();
            //显示用户信息
            this.showUserRanking(1);
        }
    };
    //显示用户信息
    SceneRanking.prototype.showUserRanking = function (_type) {
        //显示文本
        this.txt_win.text = this.user_win[_type];
        this.txt_totalnum.text = String(this.user_totalnum[_type]);
        //显示等级
        this.img_star.source = "icon_star" + Number(this.user_level[_type] % 10).toString() + "_png";
        this.img_vip.source = "icon_vip" + Math.floor(this.user_level[_type] / 10).toString() + "_png";
    };
    //TabBar修改事件
    SceneRanking.prototype.onTabBarChange = function (e) {
        //播放声音
        basic.SoundManager.instance.playEffect("sound_btn_mp3");
        //显示界面
        this.viewstack.selectedIndex = this.tabbar.selectedIndex;
        //发送消息
        if (this.tabbar.selectedIndex == 0) {
            if (this.is_get[0] == false) {
                Comm.instance.sendSocket({ "type": "rank", "rankType": "rankByWeek" });
            }
            else {
                //显示用户信息
                this.showUserRanking(0);
            }
        }
        else {
            if (this.is_get[1] == false) {
                Comm.instance.sendSocket({ "type": "rank", "rankType": "rankByLevel" });
            }
            else {
                //显示用户信息
                this.showUserRanking(1);
            }
        }
    };
    //退出按钮
    SceneRanking.prototype.onExitBtn = function (e) {
        //播放声音
        basic.SoundManager.instance.playEffect("sound_btn_mp3");
        //退出游戏
        basic.SceneManager.back();
    };
    return SceneRanking;
}(basic.SceneBase));
__reflect(SceneRanking.prototype, "SceneRanking");
//显示条定义
var RankingListItem = (function (_super) {
    __extends(RankingListItem, _super);
    function RankingListItem() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    //初始化界面
    RankingListItem.prototype.dataChanged = function () {
        _super.prototype.dataChanged.call(this);
        //显示头像
        this.txt_win.text = this.data.rate;
        this.head.show(this.data.headImgURL);
        this.txt_name.text = this.data.nickName;
        this.txt_totalnum.text = String(this.data.count);
        //显示等级
        this.img_star.source = "icon_star" + Number(this.data.level % 10).toString() + "_png";
        this.img_vip.source = "icon_vip" + Math.floor(this.data.level / 10).toString() + "_png";
    };
    return RankingListItem;
}(eui.ItemRenderer));
__reflect(RankingListItem.prototype, "RankingListItem");
