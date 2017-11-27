/**
 *
 * @等待界面
 *
 */
class SceneWaiting extends basic.SceneBase {
    //定义变量
	private btn_yes: eui.Button;
	private com_waiting: eui.Component;
	private _tween_rotation: egret.Tween = null;
    
    //定义界面
    public constructor() {
        super();

        //定义界面
        this.skinName = SceneWaitingSkin;

        //注册事件
        

        //注册按钮
        this.btn_yes.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onYesBtn,this);
    }
    
    //显示前调用
    beforeShow(params: any): void {
		//数据赋值
		GameData.Is_Show_Waiting = true;

        //显示动画
		this.com_waiting.rotation = 0;
		this._tween_rotation = egret.Tween.get(this.com_waiting,{loop: true}).to({rotation: 360},1000);
    }

    //隐藏前调用
    beforeHide(): void {
        //停止动画
		if(this._tween_rotation){
			this._tween_rotation.setPaused(true);
			this._tween_rotation = null;
		}

		//数据赋值
		GameData.Is_Show_Waiting = false;
    }

	//确定按钮
	private onYesBtn(e:egret.TouchEvent): void{
		//播放声音
        basic.SoundManager.instance.playEffect("sound_btn_mp3");

        //刷新界面
        window.location.href = window.location.href;
	}
}