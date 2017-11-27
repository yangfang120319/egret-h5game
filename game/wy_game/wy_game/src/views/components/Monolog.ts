/**
 *
 * @内容界面
 *
 */
class Monolog extends eui.Component{
	//定义变量
	private g_text: eui.Group;
	private rect_back: eui.Rect;
	private img_back: eui.Image;
	private rect_mask: eui.Rect;
	private detail_num: number = 0;
	private detail_text: string[]=[];
	public detail_type: number[]=[];
	private detail_face: any[] = [];
	private overcallback: Function;
	private btncallback: Function;
	private stopcallback: Function;
	public now_choose: number = -1;
	public now_show:number = 0;
	private max_height: number;
	private min_height: number;

	//初始化
	public constructor(_overcallback: Function = null,_btncallback: Function = null,_stopcallback: Function = null,_max_height:number = 800,_min_height:number = 200) {
		super();

		//定义界面
        this.skinName = MonologSkin;

		//定义遮罩
		this.rect_mask.visible = true;
		this.g_text.mask = this.rect_mask;

		//数据赋值
		this.max_height = _max_height;
		this.min_height = _min_height;
		this.btncallback = _btncallback
		this.overcallback = _overcallback;
		this.stopcallback = _stopcallback;
	}

	//初始化界面
	show(_detail:any,_now_show:number = 0):void{
		//定义变量
		var now_show_y: number = 0;

		//初始化界面
		this.detail_text = _detail.detail_text;
		this.detail_type = _detail.detail_type;
		this.detail_num = this.detail_text.length;
		
		//显示界面
		for(var i:number = 0;i < this.detail_num;i++){
			//判断显示
			if(this.detail_type[i] == 0){
				//定义变量
				var now_text: TextDetail = new TextDetail();

				//定义高度
				now_text.y = now_show_y;

				//数据赋值
				now_show_y += now_text.assHeight(this.detail_text[i]) + 25;
				this.detail_face[i] = now_text;
			}
			else if(this.detail_type[i] == 1){
				//定义变量
				var now_choosebtn: ChooseBtn = new ChooseBtn();

				//初始化界面
				now_choosebtn.info(this.detail_text[i].split(","),this.btnCallBack.bind(this));

				//定义高度
				now_choosebtn.y = now_show_y;

				//数据赋值
				now_show_y += now_choosebtn.height + 25;
				this.detail_face[i] = now_choosebtn;
			}

			//显示界面
			this.detail_face[i].visible = false;
			this.g_text.addChild(this.detail_face[i]);
			
			//判断显示按钮
			this.now_show = _now_show;
			if(i < _now_show){
				//显示界面
				this.detail_face[i].visible = true;

				//判断显示
				if(this.detail_type[i] == 0){
					this.detail_face[i].showText(this.detail_text[i]);
				}
				else if(this.detail_type[i] == 1){
					this.detail_face[i].showChoose(this.now_choose);
				}

				//判断显示状态
				if(this.detail_type[i] == 0){
					this.detail_face[i].changeTextColor();
				}
				else if(this.detail_type[i] == 1){
					this.detail_face[i].touchEnabled=false;
					this.detail_face[i].touchChildren = false;
				}
			}
			else if(i == _now_show){
				//显示界面
				this.detail_face[i].visible = true;
			}
		}

		//显示高度
		this.height = Math.max(this.min_height,Math.min(this.max_height,now_show_y + 100 -25));
		console.log(this.height)
		//显示遮罩
		this.rect_mask.height = this.height - 100;
	}

	//移除界面
	clean():void{
		//移除界面
		for(var i:number = 0;i<this.detail_num;i++){
			//移除界面
			this.g_text.removeChild(this.detail_face[i]);
		}

		//清空文本
		this.detail_num = 0;
		this.detail_text =[];
		this.detail_type =[];
		this.detail_face = [];
	}

	//停止动画
	stop():void{
		//判断停止动画
		if(this.now_show > 0){
			if(this.detail_type[this.now_show-1] == 0){
				//停止独白
				this.detail_face[this.now_show-1].stop();
				this.detail_face[this.now_show-1].changeTextColor();
				
				//判断显示位置
				this.jugeShowPlace();
			}
		}
	}

	//开始动画
	startAction():void{
		//判断停止动画
		if(this.now_show > 0 && this.now_show <= this.detail_num){
			if(this.detail_type[this.now_show-1] == 0){
				this.detail_face[this.now_show-1].stop();
				this.detail_face[this.now_show-1].changeTextColor();
			}
			else{
				this.detail_face[this.now_show-1].touchEnabled=false;
				this.detail_face[this.now_show-1].touchChildren = false;
			}
		}
		
		//开始动画
		if(this.now_show == this.detail_num + 1){
			//显示回调函数
			if(this.overcallback){
				this.overcallback();
			}
		}
		else if(this.now_show == this.detail_num){
			if(this.detail_type[this.now_show-1] == 1){
				//显示回调函数
				if(this.overcallback){
					this.overcallback();
				}
			}
		}
		else if(this.now_show < this.detail_num){
			this.detail_face[this.now_show].visible = true;
			if(this.detail_type[this.now_show] == 0){
				this.detail_face[this.now_show].start(
				this.detail_text[this.now_show],
				()=>{
					//判断停止动画
					if(this.stopcallback){
						this.stopcallback();
					}
					else{
						//开始动画
						this.startAction();
					}
				},
				()=>{
					if(this.now_show > 0){
						//判断显示位置
						this.jugeShowPlace();
					}
				});
			}
			else{
				//按钮回调
				if(this.btncallback){
					this.btncallback();
				}
			}
		}
		
		//数据赋值
		this.now_show += 1;

		//判断显示位置
		this.jugeShowPlace();
	}

	//位置赋值
	private jugeShowPlace():void{
		//判断显示
		if(this.now_show <= this.detail_num){
			//数据赋值
			var show_height:number = this.detail_face[this.now_show-1].y + this.detail_face[this.now_show-1].height;
			
			//判断显示
			if(show_height>this.rect_mask.height){
				//显示位置
				this.g_text.y=this.rect_mask.y - (show_height-this.rect_mask.height);
			}
		}
		else{
			//数据赋值
			var show_height:number = this.detail_face[this.detail_num-1].y + this.detail_face[this.detail_num-1].height;
			
			//判断显示
			if(show_height>this.rect_mask.height){
				//显示位置
				this.g_text.y=this.rect_mask.y - (show_height-this.rect_mask.height);
			}
		}
	}

	//按钮回调函数
	private btnCallBack(_choose:number):void{
		//数据赋值
		this.now_choose = _choose;

		//按钮回调
		if(this.btncallback){
			this.btncallback();
		}
	}
}