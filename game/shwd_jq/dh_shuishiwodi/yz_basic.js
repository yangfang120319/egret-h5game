//----------------------基础功能-------------------
//回调提示
function showBackTips(){
    
}
    	
//检测回退按钮
var is_can_back=false;
window.addEventListener('popstate',function(e){
    //监听到返回事件
    if(is_can_back){
    	//提示关注公众号
	    showBackTips();
    }
    getHistory();
},false);

//获取历史地址
function getHistory(){
    window.history.pushState('title','#');
}

//复制剪切板
function copyToShearPlate(str){
	var clipboard66 = new Clipboard("body", {
		text: function() {
			return str;
		}
	});
	$("body").trigger("click");
}

//----------------------App功能-------------------
//IOS调用函数
function setupWebViewJavascriptBridge(callback) {
    if (window.WebViewJavascriptBridge) { 
    		return callback(WebViewJavascriptBridge); 
    }
    if (window.WVJBCallbacks) { 
    	return window.WVJBCallbacks.push(callback); 
    }
    window.WVJBCallbacks = [callback];
    var WVJBIframe = document.createElement('iframe');
    WVJBIframe.style.display = 'none';
    WVJBIframe.src = 'wvjbscheme://__BRIDGE_LOADED__';
    document.documentElement.appendChild(WVJBIframe);
    setTimeout(function() { 
    	document.documentElement.removeChild(WVJBIframe) 
    }, 0)
}

//------------JS调用安卓------------
//隐藏图片
function isAlreadyAndroid(){
    YiZhuan.isAlready();
}

//保存数据
function saveDataAndroid(_data){
    YiZhuan.saveData(_data);
}

//打开浏览器
function openBrowserAndroid(_data){
    YiZhuan.openBrowser(_data);
}

//关闭游戏
function closeGameAndroid(){
	YiZhuan.closeGame();
}

//------------安卓调用JS------------
//获取数据
function getData(_data){

}

//获取机器码
function getMachineCode(_code){

}

//返回提示
function backTips(){
	
}

//------------JS调用IOS------------
//H5已经准备好
function isAlreadyIOS(){
	setupWebViewJavascriptBridge(function(bridge){
    	bridge.callHandler("isAlready");
    })
}

//保存数据
function saveDataIOS(_data){
	setupWebViewJavascriptBridge(function(bridge){
    	bridge.callHandler("saveData",_data);
    })
}

//打开浏览器
function openBrowserIOS(_url){
	setupWebViewJavascriptBridge(function(bridge){
    		bridge.callHandler("openBrowser",_url);
    })
}
		
//关闭游戏
function closeGameIOS(){
	setupWebViewJavascriptBridge(function(bridge){
    		bridge.callHandler("closeGame");
    })
}

//------------IOS调用JS------------
function funRegister(callback){
    setupWebViewJavascriptBridge(function(bridge){
    	//获取数据
    	bridge.registerHandler("getData",function(_data){
    	    callback("getData",_data);
    	})

    	//获取机器码
    	bridge.registerHandler("getMachineCode",function(_data){
    		callback("getMachineCode",_data);
    	})
    })
}