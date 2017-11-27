/**
 *
 * @游戏结束
 *
 */
class PanelGameOver extends basic.SceneBase {
    //定义变量
    private g_gift: eui.Group;
	private txt_tips: eui.Label;
	private txt_tips1: eui.Label;
    private btn_yes: eui.Button;
    private gift_num: number = 0;
    private gift_detail: OverGift[] = [];
    private img_title: eui.Image;
    private img_box: eui.Image;

     //定义界面
    public constructor() {
        super();

        //定义界面
        this.skinName = PanelGameOverSkin;

        //注册按钮
        this.btn_yes.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onYesBtn,this);
    }

    //显示前调用
    beforeShow(params: any): void {
        //定义变量
        var show_tips: string = "";
        var is_has_last: boolean = false;
        var last_person_num: number;
        

        //显示位置
        this.width = basic.StageProxy.width;
        this.height = basic.StageProxy.height;
        
        //判断显示
        this.img_box.visible = false;
        this.img_title.visible = false;
        if(GameData.over_type == 0){
            //数据赋值
            show_tips = "<font color='#EA9658'>";
            for(var i: number = 0;i < 22;i++){
                //定义变量
                var now_person: number[] = [];

                //数据赋值
                for(var j: number = 0;j < GameData.player_num;j++){
                    if(GameData.player_place[j] == i){
                        now_person[now_person.length] = j;
                    }
                }
                
                //判断显示界面
                if(now_person.length > 0){
                    //显示界面
                    is_has_last = true;
                    last_person_num = now_person.length;
                    for(var p: number = 0;p < now_person.length;p++){
                        show_tips += GameData.player_name[now_person[p]];
                        if(p < now_person.length - 1){
                            show_tips += "、"
                        }
                    }
                    break;
                }
            }
            
            //判断显示
            if(is_has_last == false){
                show_tips = "本局没有人需要喝罚酒";
            }
            else{
                if(last_person_num == 1){
                    show_tips += "</font>输了<font> \n </font>需要喝掉<font color='#EA9658'>" + GameData.FJ_Num.toString() + "</font>杯罚酒";
                }
                else{
                    show_tips += "</font>输了<font> \n </font>都需要喝掉<font color='#EA9658'>" + GameData.FJ_Num.toString() + "</font>杯罚酒";
                }
            }
            
            //判断显示文本
            this.txt_tips.textFlow = (new egret.HtmlTextParser).parser(show_tips);
            this.txt_tips1.text = "与本局其他玩家自动加为好友";
        }
        else{
            //判断显示
            if(GameData.over_tips == "主动退出游戏"){
                this.txt_tips1.text = "更多好玩游戏等你来";
            }
            else{
                this.txt_tips1.text = "开房玩游戏";
            }

            //判断显示文本
            this.txt_tips.textFlow = (new egret.HtmlTextParser).parser(GameData.over_tips);
        }

        //显示奖品
        this.showGift();

        //显示二维码
        this.showCode();
    }

    //隐藏前调用
    beforeHide(): void{
        //移除奖品
        this.removeGift();

        //移除二维码
        hideQrCode();

        //清除数据
        GameData.Over_Data = null;
    }
    
    //显示奖品
    private showGift(): void{
        //移除奖品
        this.removeGift();

        //判断显示
        if(GameData.Over_Data != null){
            if(GameData.Over_Data.data.length > 0){
                //数据赋值
                this.img_box.visible = true;
                this.img_title.visible = true;
                this.gift_num = GameData.Over_Data.data.length;
                for(var i: number = 0;i < this.gift_num;i++){
                    //定义变量
                    var now_gift: OverGift = new OverGift();

                    //显示界面
                    now_gift.show(GameData.Over_Data.data[i]);

                    //显示礼物
                    this.gift_detail[i] = now_gift;
                    this.g_gift.addChild(this.gift_detail[i]);
                }
            }
        }
    }

    //移除奖品
    private removeGift(): void{
        //移除
        for(var i: number = 0;i < this.gift_num;i++){
            this.g_gift.removeChild(this.gift_detail[i]);
        }

        //清除数据
        this.gift_num = 0;
        this.gift_detail = [];
    }

    //确定按钮
    private onYesBtn(e: egret.TouchEvent): void{
        //播放声音
        basic.SoundManager.instance.playEffect("sound_btn_mp3");

        //移除界面
        basic.SceneManager.removeTopScene(SceneNames.OVER);

        //显示开始界面
        basic.SceneManager.show(SceneNames.START);
    }


    //显示二维码
    private showCode():void{
        //定义变量
        var top_px: number;
        var img_url: string;
        var top_show: number;
        var height_px: number;
        var show_height: number = 375;

        //判断显示
        img_url = "https://game.yile.vip/h5/erweima.jpg";
        height_px = window.innerWidth * show_height / basic.StageProxy.width;
        top_px = window.innerHeight - 520 * (window.innerWidth / basic.StageProxy.width);
        
        //显示关注微信公众号
        showQrCode(
            img_url,
            top_px,
            height_px
        );
    }
}

//礼物界面
class OverGift extends eui.Component {
    //定义变量
    private txt_num: eui.Label;
    private txt_name: eui.Label;
    private img_icon: eui.Image;

    //定义界面
    public constructor() {
        super();

        //定义界面
        this.skinName = OverGiftSkin;
    }

    //显示界面
    show(_data: any): void{
        //显示界面
        this.txt_name.text = _data.name;
        this.img_icon.source = _data.imgurl;
        this.txt_num.text = "x" + _data.count;
    }
}
