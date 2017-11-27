/**
 *
 * @author 
 *
 */
class EBG_BiaoQing extends eui.Component {
    //定义变量
    private is_click: Boolean;
    private btn_delete: eui.Button;
    private btn_biaoqing: eui.Button[] = [];
    private _tween_y: egret.Tween = null;
    private is_show: Boolean = false;

    //初始化
    createChildren(): void {
        super.createChildren();

        //隐藏界面
        this.y = 1136;
        this.visible = true;

        //数据赋值
        for(var i: number = 1;i < 28;i++) {
            //定义变量
            var btn: eui.Button = this["btn_biaoqing" + i];

            //数据赋值
            this.btn_biaoqing[i] = btn;

            //注册按钮
            this.btn_biaoqing[i].addEventListener(egret.TouchEvent.TOUCH_TAP,this.onBiaoQingBtn,this);
        }
        
        //注册事件
        basic.Dispatcher.addListener(EventNames.EBG_SHOWBIAOQING,this.onShowFace,this);

        //定义按钮
        this.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onThisBtn,this);
        this.btn_delete.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onDeleteBtn,this);
    }

    //删除按钮
    private onDeleteBtn(e: egret.TouchEvent): void {
        //播放声音
        basic.SoundManager.instance.playEffect("sound_btn_mp3");

        //发送消息
        basic.Dispatcher.dispatch(EventNames.EBG_DELETECHAT);
    }

    //表情按钮
    private onBiaoQingBtn(e: egret.TouchEvent): void {
        //定义变量
        var btnnum: number = Number(e.target.name);

        //播放声音
        basic.SoundManager.instance.playEffect("sound_btn_mp3");

        //发送消息
        basic.Dispatcher.dispatch(EventNames.EBG_ADDBIAOQING,{ "num": btnnum });
    }

    //显示界面
    private onShowFace(e: egret.TouchEvent): void {
        //显示界面
        if(this.is_show == false) {
            //数据赋值
            this.is_show = true;

            //显示界面
            this._tween_y = egret.Tween.get(this).to({ y: 1136 - this.height },200).call(() => {
                //注册按钮
                basic.StageProxy.stage.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onHideFace,this);
            });
        }
    }

    //当前按钮
    private onThisBtn(e: egret.TouchEvent): void {
        //数据赋值
        egret.setTimeout(() => {
            this.is_click = true;
        },this,20);
    }

    //隐藏按钮
    private onHideFace(e: egret.TouchEvent): void {
        //数据赋值
        this.is_click = false;

        //判断隐藏界面
        egret.setTimeout(() => {
            if(this.is_click == false) {
                //数据赋值
                this.is_show = false;

                //隐藏界面
                this._tween_y = egret.Tween.get(this).to({ y: 1136 },200);

                //注销按钮
                basic.StageProxy.stage.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.onHideFace,this);
            }
        },this,50);
    }
}
