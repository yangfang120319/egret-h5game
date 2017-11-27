
/**
 *Created by jq on 2016/1/24
 * @APP本地调用
 *
 */
module basic {
    export class AppNative {
        //定义变量
        static AppData: any = {};
        static MachineCode: string;
        static is_Run_App: Boolean = null;

        //事件变量
        static SHOW_DATA: string = "app_show_data";
        static SHOW_EXITTIPS: string = "show_exittips";
        static SHOW_MACHINECODE: string = "app_show_machinecode";
		
		//初始化
        static init(_is_app: boolean): void {
            //数据赋值
            if(_is_app == true){
                if(basic.AppNative.isApp() == true) {
                    if(egret.Capabilities.os == "iOS") {
                        window["funRegister"](this.iosCallBack.bind(this));
                    }
                    else if(egret.Capabilities.os == "Android") {
                        window["getData"]=this.getDataAndroid.bind(this);
                        window["getMachineCode"]=this.getMachineCodeAndroid.bind(this);
                        window["backTips"]=this.backTipsAndroid.bind(this);
                    }
                }
            }

            //数据赋值
            basic.AppNative.is_Run_App = false;
        }

        //----------------App调用H5---------------
        //获取数据
        static getDataAndroid(_data:string):void{
            //数据赋值
            basic.AppNative.is_Run_App = true;
            if(_data == ""||_data == null){
                //数据初始化
                basic.AppNative.AppData = {};

                //发送消息
                basic.Dispatcher.dispatch(basic.AppNative.SHOW_DATA);
            }
            else{
                //数据初始化
                basic.AppNative.AppData = JSON.parse(_data);

                //发送消息
                basic.Dispatcher.dispatch(basic.AppNative.SHOW_DATA);
            }
        }

        //获取机器码
        static getMachineCodeAndroid(_code:string):void{
            //数据赋值
            basic.AppNative.is_Run_App = true;
            basic.AppNative.MachineCode = _code;
                
            //发送消息
            basic.Dispatcher.dispatch(basic.AppNative.SHOW_MACHINECODE);
        }

        //返回提示
        static backTipsAndroid():void{
            //发送消息
            basic.Dispatcher.dispatch(basic.AppNative.SHOW_EXITTIPS);
        }

        //苹果函数
        static iosCallBack(_name:string,_data:any):void{
            //判断赋值
            if(_name=="getData"){
                //数据赋值
                basic.AppNative.is_Run_App = true;
                if(_data==""||_data==null){
                    //数据初始化
                    basic.AppNative.AppData = {};
                }
                else{
                    //数据初始化
                    basic.AppNative.AppData = JSON.parse(_data);

                    //发送消息
                    basic.Dispatcher.dispatch(basic.AppNative.SHOW_DATA);
                }
            }
            else if(_name=="getMachineCode"){
                ///数据赋值
                basic.AppNative.is_Run_App = true;
                basic.AppNative.MachineCode = _data;
                    
                //发送消息
                basic.Dispatcher.dispatch(basic.AppNative.SHOW_MACHINECODE);
            }
        }
        
        //----------------App调用H5---------------
        //隐藏图片
    	static isAlready():void{
    		//判断显示
            try{
                if(basic.AppNative.isApp() == true) {
                    if(egret.Capabilities.os == "iOS") {
                        window["isAlreadyIOS"]();
                    }
                    else if(egret.Capabilities.os == "Android") {
                        window["isAlreadyAndroid"]();
                    }
                }
            }
            catch(error){
                console.log("调用APP已准备失败");
            }

            //数据赋值
            basic.AppNative.is_Run_App = false;
    	}
    	
		//保存数据
		static saveData(_data:string):void{
    		//判断显示
            try{
                if(basic.AppNative.isApp() == true) {
                    if(egret.Capabilities.os == "iOS") {
                        window["saveDataIOS"](_data);
                    }
                    else if(egret.Capabilities.os == "Android") {
                        window["saveDataAndroid"](_data);
                    }
                }
            }
            catch(error){
                console.log("调用APP保存数据失败");
            }
    	}

		//打开浏览器
		static openBrowser(_url:string):void{
    		//判断显示
            try{
                if(basic.AppNative.isApp() == true) {
                    if(egret.Capabilities.os == "iOS") {
                        window["openBrowserIOS"](_url);
                    }
                    else if(egret.Capabilities.os == "Android") {
                        window["openBrowserAndroid"](_url);
                    }
                }
            }
            catch(error){
                console.log("调用APP浏览器失败");
            }
    	}

		//关闭游戏
		static closeGame():void{
			//判断显示
            try{
                if(basic.AppNative.isApp() == true) {
                    if(egret.Capabilities.os == "Android") {
                        window["closeGameAndroid"]();
                    }
                }
            }
            catch(error){
                console.log("调用APP退出失败");
            }
		}

        //----------------判断环境--------------
        //判断是否是微信环境
        static isWeiXin(): boolean {
            //定义变量
            var ua: string = navigator.userAgent.toString();

            //判断
            var str: any = ua.match(/MicroMessenger/i);
            if(str == "MicroMessenger") {
                return true;
            } else {
                return false;
            }
        }

        //判断是否App
        static isApp(): Boolean {
            if(this.isWeiXin() == false) {
                if(egret.Capabilities.os.indexOf("Windows") >= 0 || egret.Capabilities.os.indexOf("Mac") >= 0) {
                    return false;
                }
                else {
                    if(basic.AppNative.is_Run_App == null){
                        return true;
                    }
                    else if(basic.AppNative.is_Run_App == true){
                        return true;
                    }
                    else{
                        return false;
                    }
                }
            }
            else {
                return false;
            }
        }
	}
}