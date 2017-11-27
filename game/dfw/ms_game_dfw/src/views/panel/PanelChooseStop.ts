/**
 *
 * @阻止发生
 *
 */
class PanelChooseStop  extends basic.PanelBase {
    //自定义界面
    private static _instance: PanelChooseStop;
    public static get instance(): PanelChooseStop {
        if(this._instance == undefined) {
            this._instance = new PanelChooseStop();
        }
        return this._instance;
    }

    //定义变量
	private now_pos: number;
	private show_num: number;
	private head: Head[] = [];
    private btn_yes: eui.Button;
	private btn_head: eui.Button[] = [];
	private pos_num: number[] = [];
	private callback: Function;

    //皮肤设置
    protected init(): void {
        this.skinName = PanelChooseStopSkin;
    }
    
    //定义界面
    constructor() {
        super(basic.dialogEffect.Scale,{
            withFade: true,
            ease: egret.Ease.backOut
        },basic.dialogEffect.Scale,{ withFade: true,ease: egret.Ease.backIn });
    }

    //初始化界面
    createChildren(): void {
        super.createChildren();

		//数据赋值
		for(var i: number = 0;i < 8;i++){
			//定义变量
			var now_head: Head = this["head" + i];
			var now_btn: eui.Button = this["btn_head" + i];

			//数据赋值
			this.head[i] = now_head;
			this.btn_head[i] = now_btn;

			//注册按钮
			this.btn_head[i].addEventListener(egret.TouchEvent.TOUCH_TAP,this.onHeadBtn,this);
		}
        

		//注册事件
		basic.Dispatcher.addListener(EventNames.SHOW_REMAIN,this.onRemain,this); 

        //注册按钮
        this.btn_yes.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onYesBtn,this);
    }

    //显示界面
    show(callback: Function = null): void {
        //数据赋值
        this.callback = callback;

        //显示界面
        this.popup(this.funExit.bind(this));

		//隐藏界面
		for(var j: number = 0;j < 8;j++){
			this.head[j].visible = false;
			this.btn_head[j].visible = false;
		}

        //显示按钮状态
		this.now_pos = -1;
		this.show_num = 0;
		for(var i: number = 0;i < GameData.player_num;i++){
			if(UserData.User_Id != GameData.player_id[i] && GameData.player_place[i] > 0){
				//数据赋值
				this.pos_num[this.show_num] = i;

				//显示头像
				this.head[this.show_num].visible = true;
				this.btn_head[this.show_num].visible = true;

				//显示头像
				this.head[this.show_num].show(GameData.player_head[i]);
				this.head[this.show_num].showName(GameData.player_name[i])
				this.head[this.show_num].currentState = "hide";
				
				//判断显示
				if(this.now_pos == -1){
					this.now_pos = this.show_num;
					this.head[this.show_num].currentState = "show";
				}

				//数据赋值
				this.show_num += 1;
			}
		}
    }

    //退出函数
    private funExit(): void {
        //退出事件
        this.dealAction();
    }

    //性别按钮
    private onHeadBtn(e:egret.TouchEvent): void{
        //定义变量
		this.now_pos = Number(e.target.name);
        
        //播放声音
        basic.SoundManager.instance.playEffect("sound_btn_mp3");
		
		//数据赋值
		for(var i: number = 0;i < GameData.player_num;i++){
			//判断显示
			if(this.now_pos == i){
				this.head[i].currentState = "show";
			}
			else{
				this.head[i].currentState = "hide";
			}
		}
    }

	//停留原地生效
	private onRemain(e: egret.Event): void{
		//判断显示
		if(GameData.jl_dj_num > 0){
			//数据赋值
			GameData.jl_dj_num -= 1;

			//保存数据
			basic.Dispatcher.dispatch(EventNames.SHOW_TIPSTIMES);

			//显示回调函数
			if(this.callback){
				this.callback();
			}

			//退出设置
			this.funExit();
		}
		else{
			if(GameData.tips_num[2] > 0){
				//数据赋值
				GameData.tips_num[2] -= 1;

				//保存数据
				basic.Dispatcher.dispatch(EventNames.SHOW_TIPSTIMES);

				//显示回调函数
				if(this.callback){
					this.callback();
				}

				//退出设置
				this.funExit();
			}
		}

		//显示提示
		basic.Dispatcher.dispatch(EventNames.SHOW_TIPS,{"msg" : GameData.player_name[e.data.pos] + "将停留一回合。"})
	}

    //确定按钮
    private onYesBtn(e: egret.TouchEvent): void{
        //播放声音
        basic.SoundManager.instance.playEffect("sound_btn_mp3");

		//判断显示
		if(GameData.jl_dj_num > 0){
			//发送消息
			Comm.instance.sendSocket({"type":"remain","pos":this.pos_num[this.now_pos]});
		}
		else{
			if(GameData.tips_num[2] > 0){
				if(UserData.User_Gold >= GameData.DJ_Gold_Stop){
					//发送消息
					if(this.now_pos >= 0){
						Comm.instance.sendSocket({"type":"remain","pos":this.pos_num[this.now_pos]});
					}
					else{
						basic.Dispatcher.dispatch(EventNames.SHOW_TIPS,{"msg":"没有人可以被停留"});
					}
				}
				else{
					//退出设置
					this.funExit();

					//显示提示界面
					egret.setTimeout(()=>{
						PanelShopTips.instance.show();
					},this,300);
				}
			}
			else{
				basic.Dispatcher.dispatch(EventNames.SHOW_TIPS,{"msg":"超出使用次数"});
			}
		}
    }
}