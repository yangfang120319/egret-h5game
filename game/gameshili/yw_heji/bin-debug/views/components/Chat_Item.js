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
 * @筹码
 *
 */
var Chat_Item = (function (_super) {
    __extends(Chat_Item, _super);
    //定义界面
    function Chat_Item() {
        var _this = _super.call(this) || this;
        _this.txt_size = 24;
        _this.show_detail_index = [];
        //表情数据
        _this.bq_num = 0;
        _this.bq_index = [];
        _this.bq_detail = [];
        _this.bq_picture = [];
        //定义界面
        _this.skinName = Chat_ItemSkin;
        return _this;
    }
    //初始化界面
    Chat_Item.prototype.show = function (_data, _width) {
        //数据赋值
        this.user_id = _data.uid;
        this.user_vip = _data.vip;
        this.user_msg = _data.message;
        this.user_head = _data.head;
        this.user_name = _data.nickname;
        this.chat_width = _width;
        //判断显示文本颜色
        if (this.user_id == 0) {
            this.txt_detail.textColor = 0xFFFFFF;
        }
        else {
            this.txt_detail.textColor = 0xb158a7;
        }
        //定义文本位置宽度
        this.width = this.chat_width;
        if (this.user_id == 0) {
            this.g_bq.x = 0;
            this.txt_detail.x = 0;
            this.txt_vip.visible = false;
            this.txt_detail.width = this.chat_width;
        }
        else {
            this.g_bq.x = 50;
            this.txt_detail.x = 50;
            this.txt_vip.visible = true;
            this.txt_detail.width = this.chat_width - 50;
        }
        //数据赋值
        this.assBiaoQing();
        //显示表情
        this.showBiaoQing();
        //显示VIP
        this.txt_vip.text = "v" + this.user_vip.toString();
        if (this.user_vip < 10) {
            this.txt_vip.x = 0;
        }
        else {
            this.txt_vip.x = -18;
        }
        //判断显示位置
        if (this.bq_num > 0) {
            this.g_bq.y = -3;
            this.txt_detail.y = -3;
        }
        //显示文本
        this.txt_detail.textFlow = (new egret.HtmlTextParser).parser(this.detail);
        //定义文本高度
        this.txt_detail.height = this.txt_detail.textHeight;
        if (this.bq_num > 0) {
            this.height = this.txt_detail.height + 1;
        }
        else {
            this.height = this.txt_detail.height + 5;
        }
    };
    //表情数据赋值
    Chat_Item.prototype.assBiaoQing = function () {
        //定义变量
        var now_bq;
        var now_index = 0;
        var juge_bq = false;
        //数据赋值
        if (this.user_id == 0) {
            if (this.user_name != "") {
                this.detail = "<font color='#9d2e28'>" + this.user_name + "：" + "</font>";
            }
            else {
                this.detail = "";
            }
        }
        else {
            this.detail = this.user_name + "：";
        }
        for (var i = 0; i < this.user_msg.length; i++) {
            //判断赋值
            if (juge_bq == true) {
                if (this.user_msg.charAt(i) == "]") {
                    juge_bq = false;
                    this.detail += "　</font>";
                    this.bq_detail[this.bq_num] = now_bq;
                    this.bq_num += 1;
                }
                else {
                    now_bq += this.user_msg.charAt(i);
                }
            }
            else {
                if (this.user_msg.charAt(i) == "[") {
                    //数据赋值
                    now_bq = "";
                    juge_bq = true;
                    this.bq_index[this.bq_num] = this.detail.length;
                    this.detail += "<font size= '32'>";
                }
                else {
                    this.detail += this.user_msg.charAt(i);
                }
            }
        }
        //显示文本
        this.txt_detail.textFlow = (new egret.HtmlTextParser).parser(this.detail);
        //显示数据赋值
        this.show_detail = this.txt_detail.text;
        for (var j = 0; j < this.show_detail.length; j++) {
            //判断显示
            if (j == this.show_detail.length - 1) {
                this.show_detail_index[j] = this.detail.length;
            }
            else {
                //定义变量
                var num = 0;
                //判断复制
                if (now_index < this.detail.length - 5 && this.detail.substring(now_index, now_index + 5) == "<font") {
                    //数据赋值
                    for (var k = now_index; k < this.detail.length; k++) {
                        if (this.detail.charAt(k) == ">") {
                            if (num == 0) {
                                num += 1;
                            }
                            else {
                                now_index = k + 1;
                                break;
                            }
                        }
                    }
                    this.show_detail_index[j] = now_index;
                }
                else {
                    //数据赋值
                    now_index += 1;
                    this.show_detail_index[j] = now_index;
                }
            }
        }
    };
    //显示表情
    Chat_Item.prototype.showBiaoQing = function () {
        //定义显示高度
        for (var i = 0; i < this.bq_num; i++) {
            //定义变量
            var img_bq = new eui.Image();
            //定义表情图片
            img_bq.source = "icon_bq_" + this.bq_detail[i] + "_png";
            //定义图片大小
            img_bq.width = this.txt_size + 8;
            img_bq.height = this.txt_size + 8;
            //定义位置
            img_bq.y = this.assBQ_Y(this.bq_index[i]);
            img_bq.x = this.assBQ_X(this.bq_index[i]);
            //判断显示
            if (img_bq.x > this.chat_width - 77) {
                img_bq.x = 0;
                img_bq.y = img_bq.y + 39;
            }
            //数据赋值
            this.bq_picture[i] = img_bq;
            //显示表情
            this.g_bq.addChild(this.bq_picture[i]);
        }
    };
    //表情坐标赋值-X
    Chat_Item.prototype.assBQ_X = function (_index) {
        //定义变量
        var num_X = 0;
        var now_show = "";
        var now_showtotal;
        //显示文本
        this.txt_detail.textFlow = (new egret.HtmlTextParser).parser(this.detail.substring(0, _index));
        //数据复制
        now_showtotal = this.txt_detail.text;
        //数据复制
        for (var i = 0; i < now_showtotal.length; i++) {
            //数据赋值
            now_show += this.assOriginalDetail(i);
            //显示文本
            this.txt_detail.textFlow = (new egret.HtmlTextParser).parser(now_show);
            //判断显示
            if (this.txt_detail.numLines > 1) {
                //显示文本
                this.txt_detail.textFlow = (new egret.HtmlTextParser).parser(now_showtotal.charAt(i));
                //判断显示
                if (this.txt_detail.textWidth < this.txt_size / 2 + 1) {
                    //数据赋值
                    now_show = this.assOriginalDetail(i);
                    for (var j = i - 1; j > 0; j--) {
                        //显示文本
                        this.txt_detail.textFlow = (new egret.HtmlTextParser).parser(now_showtotal.charAt(j));
                        //判断复制
                        if (this.txt_detail.textWidth < this.txt_size / 2 + 1) {
                            now_show += this.assOriginalDetail(j);
                        }
                        else {
                            break;
                        }
                    }
                }
                else {
                    now_show = this.assOriginalDetail(i);
                }
            }
        }
        //显示文本
        this.txt_detail.textFlow = (new egret.HtmlTextParser).parser(now_show);
        //数据赋值
        num_X = this.txt_detail.textWidth;
        return num_X;
    };
    //赋值原始文本
    Chat_Item.prototype.assOriginalDetail = function (_index) {
        //定义变量
        var original_detail;
        //数据赋值
        if (_index == 0) {
            original_detail = this.detail.substring(0, this.show_detail_index[_index]);
        }
        else {
            original_detail = this.detail.substring(this.show_detail_index[_index - 1], this.show_detail_index[_index]);
        }
        return original_detail;
    };
    //表情坐标赋值-Y
    Chat_Item.prototype.assBQ_Y = function (_index) {
        //定义变量
        var num_Y = 0;
        //显示文本
        this.txt_detail.textFlow = (new egret.HtmlTextParser).parser(this.detail.substring(0, _index));
        //数据赋值
        if (this.txt_detail.numLines == 1) {
            num_Y = 4;
        }
        else {
            num_Y = this.txt_detail.textHeight - (this.txt_size + 4);
        }
        return num_Y;
    };
    return Chat_Item;
}(eui.Component));
__reflect(Chat_Item.prototype, "Chat_Item");
