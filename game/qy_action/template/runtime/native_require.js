
var game_file_list = [
    //以下为自动修改，请勿修改
    //----auto game_file_list start----
	"libs/modules/egret/egret.js",
	"libs/modules/egret/egret.native.js",
	"libs/modules/game/game.js",
	"libs/modules/game/game.native.js",
	"libs/modules/eui/eui.js",
	"libs/modules/res/res.js",
	"libs/modules/tween/tween.js",
	"bin-debug/Action_Lose.js",
	"bin-debug/Action_PaoWuXian.js",
	"bin-debug/Action_Win.js",
	"bin-debug/AssetAdapter.js",
	"bin-debug/basic/popup/DialogEffect.js",
	"bin-debug/basic/popup/PanelBase.js",
	"bin-debug/basic/popup/PopUpManager.js",
	"bin-debug/basic/scene/SceneBase.js",
	"bin-debug/basic/scene/SceneeEffect.js",
	"bin-debug/basic/scene/SceneManager.js",
	"bin-debug/basic/support/Dispatcher.js",
	"bin-debug/basic/support/LocalStorage.js",
	"bin-debug/basic/support/Native.js",
	"bin-debug/basic/support/SoundManager.js",
	"bin-debug/basic/support/StageProxy.js",
	"bin-debug/basic/support/Timer.js",
	"bin-debug/basic/support/TimerEvent.js",
	"bin-debug/basic/tools/HashMap.js",
	"bin-debug/basic/tools/MathUtils.js",
	"bin-debug/basic/tools/Utils.js",
	"bin-debug/Main.js",
	"bin-debug/ScenePK.js",
	"bin-debug/ScenesStart.js",
	"bin-debug/StartAction.js",
	"bin-debug/ThemeAdapter.js",
	//----auto game_file_list end----
];

var window = this;

egret_native.setSearchPaths([""]);

egret_native.requireFiles = function () {
    for (var key in game_file_list) {
        var src = game_file_list[key];
        require(src);
    }
};

egret_native.egretInit = function () {
    if(egret_native.featureEnable) {
        //控制一些优化方案是否开启
        egret_native.featureEnable({
            
        });
    }
    egret_native.requireFiles();
    //egret.dom为空实现
    egret.dom = {};
    egret.dom.drawAsCanvas = function () {
    };
};

egret_native.egretStart = function () {
    var option = {
        //以下为自动修改，请勿修改
        //----auto option start----
		entryClassName: "Main",
		frameRate: 30,
		scaleMode: "fixedWidth",
		contentWidth: 640,
		contentHeight: 960,
		showPaintRect: false,
		showFPS: false,
		fpsStyles: "x:0,y:0,size:12,textColor:0xffffff,bgAlpha:0.9",
		showLog: false,
		logFilter: "",
		maxTouches: 2,
		textureScaleFactor: 1
		//----auto option end----
    };

    egret.native.NativePlayer.option = option;
    egret.runEgret();
    egret_native.Label.createLabel("/system/fonts/DroidSansFallback.ttf", 20, "", 0);
    egret_native.EGTView.preSetOffScreenBufferEnable(true);
};