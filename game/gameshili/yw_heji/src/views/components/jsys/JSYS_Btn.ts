/**
 *
 * @按钮
 *
 */
class JSYS_Btn extends eui.Component {
    //定义变量
    private btn_up: eui.Button;
    private rect_mask: eui.Rect;
    private g_genzhu: eui.Group;
    private btn_down: eui.Button
    private btn_start: eui.Button
    private btn_again: eui.Button;
    private btn_genzhu: eui.Button[] = [];
    private is_show: Boolean = false;
    private _tween_y: egret.Tween = null;
    private genzhu_num: number[] = [5,10,50];
    private click_btn: number;

    //初始化
    createChildren(): void {
        super.createChildren();
        
        //显示界面
        this.g_genzhu.y = 0;
        this.g_genzhu.visible = true;
        this.rect_mask.visible = true;
        this.g_genzhu.mask = this.rect_mask;
        
        //数据赋值
        for(var i: number = 0;i < 3;i++) {
            //定义变量
            var genzhu: eui.Button = this["btn_genzhu" + i];
            
            //数据赋值
            this.btn_genzhu[i] = genzhu;
            
            //注册按钮
            this.btn_genzhu[i].addEventListener(egret.TouchEvent.TOUCH_TAP,this.onGenZhuBtn,this);
        }
        
        //注册按钮
        this.btn_up.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onUpBtn,this);
        this.btn_down.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onDownBtn,this);
        this.btn_start.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onStartBtn,this);
        this.btn_again.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onAgainBtn,this);
    }
    
    //显示庄按钮
    showZhuangBtn():void{
        //判断显示庄按钮
        if(UserData.User_Id == GameData.Zhuang_Id) {
            this.btn_up.visible = false;
            this.btn_down.visible = true;
        }
        else {
            //定义变量
            var is_show_list: Boolean = false;

            //数据赋值
            for(var i: number = 0;i < GameData.JSYS_ZhuangList.length;i++) {
                if(GameData.JSYS_ZhuangList[i].playerId == UserData.User_Id) {
                    is_show_list = true;
                    break;
                }
            }

            //判断显示
            if(is_show_list == false) {
                this.btn_up.visible = true;
                this.btn_down.visible = false;
            }
            else {
                this.btn_up.visible = false;
                this.btn_down.visible = true;
            }
        }
    }

    //显示按钮
    showBtn(): void {
        //显示按钮
        if(UserData.User_Id != GameData.Zhuang_Id) {
            this.btn_start.enabled = true;
            this.btn_again.enabled = true;
        }
    }

    //隐藏按钮
    hideBtn(): void {
        //隐藏按钮
        this.btn_start.enabled = false;
        this.btn_again.enabled = false;
        
        //判断移除
        if(this.is_show==true){
            //数据赋值
            this.is_show = false;

            //停止移动
            if(this._tween_y) {
                this._tween_y.setPaused(true);
                this._tween_y = null;
            }

            //注销按钮
            basic.StageProxy.stage.removeEventListener(egret.TouchEvent.TOUCH_END,this.onOverBtn,this);

            //开始移动
            this._tween_y = egret.Tween.get(this.g_genzhu).to({ y: 0 },200)
        }
    }

    //跟注按钮
    private onGenZhuBtn(e:egret.TouchEvent):void{
        //定义变量
        var btnnum: number = Number(e.target.name);
        
        //数据赋值
        this.click_btn = btnnum;
    }
    
    //上庄按钮
    private onUpBtn(e: egret.TouchEvent): void {
        //播放声音
        basic.SoundManager.instance.playEffect("sound_btn_mp3");
        
        //发送请求
        Comm_jsys.instance.sendSocket({ "type": "callDealer" });
    }
    
    //下庄按钮
    private onDownBtn(e: egret.TouchEvent): void {
        //播放声音
        basic.SoundManager.instance.playEffect("sound_btn_mp3");
        
        //发送消息
        Comm_jsys.instance.sendSocket({ "type": "cancelDealer" });
    }
    
    //开始按钮
    private onStartBtn(e: egret.TouchEvent): void {
        //显示界面
        if(this.is_show == false) {
            //数据赋值
            this.is_show = true;
            this.click_btn = -1;
            
            //停止移动
            if(this._tween_y) {
                this._tween_y.setPaused(true);
                this._tween_y = null;
            }
            
            //播放声音
            basic.SoundManager.instance.playEffect("sound_btn_mp3");
            
            //注册按钮
            basic.StageProxy.stage.addEventListener(egret.TouchEvent.TOUCH_END,this.onOverBtn,this);
            
            //开始移动
            this._tween_y = egret.Tween.get(this.g_genzhu).to({ y: -170 },200);
        }
        else{
            //数据赋值
            this.is_show = false;

            //停止移动
            if(this._tween_y) {
                this._tween_y.setPaused(true);
                this._tween_y = null;
            }
            
            //播放声音
            basic.SoundManager.instance.playEffect("sound_btn_mp3");
            
            //注销按钮
            basic.StageProxy.stage.removeEventListener(egret.TouchEvent.TOUCH_END,this.onOverBtn,this);

            //开始移动
            this._tween_y = egret.Tween.get(this.g_genzhu).to({ y: 0 },200).call(() => {
                //判断发送消息
                if(this.click_btn != -1) {
                    //开始跟注
                    this.startGenZhu();
                }
            });
        }
    }
    
    //结束按钮
    private onOverBtn(e: egret.TouchEvent): void {
        //判断显示
        egret.setTimeout(() => {
            if(this.is_show == true) {
                //数据赋值
                this.is_show = false;

                //停止移动
                if(this._tween_y) {
                    this._tween_y.setPaused(true);
                    this._tween_y = null;
                }

                //注销按钮
                basic.StageProxy.stage.removeEventListener(egret.TouchEvent.TOUCH_END,this.onOverBtn,this);
                
                //播放声音
                if(this.click_btn != -1) {
                    basic.SoundManager.instance.playEffect("sound_btn_mp3");
                }
                
                //开始移动
                this._tween_y = egret.Tween.get(this.g_genzhu).to({ y: 0 },200).call(() => {
                    //判断发送消息
                    if(this.click_btn != -1) {
                        //开始跟注
                        this.startGenZhu();
                    }
                });
            }
        },this,50);
    }
    
    //开始跟注
    private startGenZhu():void{
        //数据赋值
        GameData.JSYS_GenZhu_Num = this.genzhu_num[this.click_btn];

        //判断赋值
        if(GameData.JSYS_YaZhu_UserTotal > 0) {
            //数据赋值
            for(var i: number = 0;i < 12;i++) {
                GameData.JSYS_GenZhu_Detail[i] = GameData.JSYS_YaZhu_User[i];
            }
        }
        else {
            //数据赋值
            for(var j: number = 0;j < 12;j++) {
                GameData.JSYS_GenZhu_Detail[j] = GameData.Game_BeiLv;
                Comm_jsys.instance.sendSocket({ "type": "bet","pos": j,"gold": GameData.JSYS_GenZhu_Detail[j] });
            }
        }

        //发送消息
        basic.Dispatcher.dispatch(EventNames.JSYS_STARTGENZHU);
    }
    
    //重复压住
    private onAgainBtn(e: egret.TouchEvent): void {
        //播放声音
        basic.SoundManager.instance.playEffect("sound_btn_mp3");
        
        //发送消息
        for(var i: number = 0;i < 12;i++) {
            //判断发送
            if(GameData.JSYS_YaZhu_User_Old[i] > 0) {//发送消息
                Comm_jsys.instance.sendSocket({ "type": "bet","pos": i,"gold": GameData.JSYS_YaZhu_User_Old[i] });
            }
        }
    }
}
