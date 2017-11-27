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
 * @排行榜
 *
 */
var SceneRanking = (function (_super) {
    __extends(SceneRanking, _super);
    //定义界面
    function SceneRanking() {
        var _this = _super.call(this) || this;
        _this.is_get = [false, false];
        //定义界面
        _this.skinName = SceneRankingSkin;
        //定义Tab按钮
        _this.tabbar_type.selectedIndex = 0;
        _this.viewStack.selectedIndex = _this.tabbar_type.selectedIndex;
        //定义List
        _this.list0.dataProvider = _this._data0 = new eui.ArrayCollection();
        _this.list1.dataProvider = _this._data1 = new eui.ArrayCollection();
        _this.list0.itemRenderer = RankingListItem;
        _this.list1.itemRenderer = RankingListItem;
        //注册按钮
        _this.tabbar_type.addEventListener(egret.Event.CHANGE, _this.onTypeBtn, _this);
        //注册事件
        basic.Dispatcher.addListener(EventNames.SHOW_RANKING, _this.onShowRanking, _this);
        return _this;
    }
    //显示前调用
    SceneRanking.prototype.beforeShow = function () {
        //获取数据
        this.is_get = [false, false];
        //获取数据
        Comm.instance.sendSocket({ "type": "rankingList", "rankType": this.tabbar_type.selectedIndex });
    };
    //显示排行榜
    SceneRanking.prototype.onShowRanking = function (e) {
        //数据赋值
        var ranking_data = [];
        //数据赋值
        for (var i = 0; i < Math.min(30, e.data.data.length); i++) {
            //定义变量
            var now_data = e.data.data[i];
            //数据赋值
            now_data["num"] = i + 1;
            ranking_data[i] = now_data;
        }
        //判断赋值
        if (this.tabbar_type.selectedIndex == 0) {
            this._data0.source = ranking_data;
            this._data0.refresh();
        }
        else {
            this._data1.source = ranking_data;
            this._data1.refresh();
        }
        this.is_get[this.tabbar_type.selectedIndex] = true;
    };
    //类型按钮
    SceneRanking.prototype.onTypeBtn = function (e) {
        //播放声音
        basic.SoundManager.instance.playEffect("sound_btn_mp3");
        //数据赋值
        this.viewStack.selectedIndex = this.tabbar_type.selectedIndex;
        //判断获取数据
        if (this.is_get[this.tabbar_type.selectedIndex] == false) {
            //获取数据
            Comm.instance.sendSocket({ "type": "rankingList", "rankType": this.tabbar_type.selectedIndex });
        }
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
        this.head.show(this.data.headImgURL);
        //显示文本
        this.txt_name.text = this.data.nickName;
        this.txt_id.text = "ID:" + this.data.userId;
        this.com_ranking.currentState = this.data.num;
        this.img_vip.source = "txt_s_vip" + this.data.vipLeval + "_png";
        //判断显示金币
        if (this.data.gold < 100000000) {
            this.txt_gold.text = Math.floor(this.data.gold / 10000).toString() + "万";
        }
        else {
            this.txt_gold.text = Number(Math.floor(this.data.gold / 1000000) / 100).toString() + "亿";
        }
    };
    return RankingListItem;
}(eui.ItemRenderer));
__reflect(RankingListItem.prototype, "RankingListItem");
