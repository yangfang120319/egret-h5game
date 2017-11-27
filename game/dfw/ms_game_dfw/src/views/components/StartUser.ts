/**
 *
 * @开始用户信息
 *
 */
class StartUser extends eui.Component{
	//定义变量
	private head: Head;
	private txt_name: eui.Label;
	private txt_gold: eui.Label;
	private btn_exit: eui.Button;
	private btn_send: eui.Button;
	private btn_shop: eui.Button;
	
	//初始化
    createChildren(): void {
        super.createChildren();

		//注册按钮
		this.btn_exit.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onExitBtn,this);
		this.btn_send.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onSendBtn,this);
		this.btn_shop.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onShopBtn,this);
	}

	//显示
	show(): void{
		//显示头像
		this.head.show(UserData.User_Head);
		this.head.currentState = "hide";

		//显示文本
		this.txt_name.text = UserData.User_Name;
		this.txt_gold.text = UserData.User_Gold.toString();

		//显示位置
		this.showPlace();
	}

	//显示位置
	private showPlace(): void{
		//定义变量
		var now_show_x: number = 750 -12;

		//判断显示发钻按钮
		if(UserData.User_Is_Dl == true){
			this.btn_send.visible = true;
		}
		else{
			this.btn_send.visible = false;
		}
		
		//判断定义位置
		this.btn_exit.x = now_show_x - this.btn_exit.width;
		now_show_x =  now_show_x - this.btn_exit.width -12;
		this.btn_shop.x = now_show_x - this.btn_shop.width;
		now_show_x =  now_show_x - this.btn_shop.width -12;
		if(this.btn_send.visible == true){
			this.btn_send.x = now_show_x - this.btn_send.width;
			now_show_x =  now_show_x - this.btn_send.width -12;
		}
	}

	//退出按钮
	private onExitBtn(e:egret.TouchEvent): void{
		//播放声音
        basic.SoundManager.instance.playEffect("sound_btn_mp3");

		//显示退出提示
        PanelExit.instance.show();
	}

	//发钻按钮
	private onSendBtn(e:egret.TouchEvent): void{
		//定义变量
        var params: any = basic.Utils.getUrlParams();

        //注销按钮
        this.btn_send.enabled = false;

        //播放声音
        basic.SoundManager.instance.playEffect("sound_btn_mp3");
        
		//判断赋值
        if(GameData.Is_Test == true){
            params = {"token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHBpcmVkIjoxNTA5NjA5OTI5NjkyLCJ1c2VySWQiOjUwMzF9.gqRswsAY_csgCl5AnNpoJf-_eCyLNpuzDAztNRpd4rk"};
        }
		
        //请求参数
        var request = new egret.HttpRequest();
        request.responseType = egret.HttpResponseType.TEXT;
        request.open("https://client.yile.vip/api/game/paymentUrl.json?token=" + params.token, egret.HttpMethod.GET);
        request.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        request.send();
        request.addEventListener(egret.Event.COMPLETE,this.onGetComplete,this);
	}

	//商店按钮
	private onShopBtn(e:egret.TouchEvent): void{
		//播放声音
        basic.SoundManager.instance.playEffect("sound_btn_mp3");

		//显示充值界面
        window.location.href = GameData.Shop_Url;
	}

	//获取数据完成
    private onGetComplete(event:egret.Event):void {
        //数据赋值
        var request = <egret.HttpRequest>event.currentTarget;
        var sign = JSON.parse(request.response);
        
        //显示按钮
        this.btn_send.enabled = true;

        //显示对话框
        PanelRoom.instance.show(sign.data.payurl,1);
    }
}