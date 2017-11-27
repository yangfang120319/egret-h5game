
var game_file_list = [
    //以下为自动修改，请勿修改
    //----auto game_file_list start----
	"libs/modules/egret/egret.js",
	"libs/modules/egret/egret.native.js",
	"libs/modules/eui/eui.js",
	"libs/modules/res/res.js",
	"libs/modules/tween/tween.js",
	"promise/bin/promise.js",
	"bin-debug/basiclib/popup/PanelBase.js",
	"bin-debug/basiclib/scene/SceneBase.js",
	"bin-debug/views/components/Action_Other.js",
	"bin-debug/basiclib/animation/IAnimation.js",
	"bin-debug/basiclib/animation/Wave.js",
	"bin-debug/basiclib/popup/DialogEffect.js",
	"bin-debug/AssetAdapter.js",
	"bin-debug/basiclib/popup/PopUpManager.js",
	"bin-debug/ThemeAdapter.js",
	"bin-debug/basiclib/scene/SceneeEffect.js",
	"bin-debug/basiclib/scene/SceneManager.js",
	"bin-debug/basiclib/support/Dispatcher.js",
	"bin-debug/basiclib/support/LanguageManager.js",
	"bin-debug/basiclib/support/LocalStorage.js",
	"bin-debug/basiclib/support/Native.js",
	"bin-debug/basiclib/support/SoundManager.js",
	"bin-debug/basiclib/support/StageProxy.js",
	"bin-debug/basiclib/support/Timer.js",
	"bin-debug/basiclib/support/TimerEvent.js",
	"bin-debug/basiclib/tools/HashMap.js",
	"bin-debug/basiclib/tools/MathUtils.js",
	"bin-debug/basiclib/tools/Utils.js",
	"bin-debug/model/EventNames.js",
	"bin-debug/model/GameConfig.js",
	"bin-debug/model/LoaderData.js",
	"bin-debug/model/SceneNames.js",
	"bin-debug/model/UserData.js",
	"bin-debug/views/SceneLoading.js",
	"bin-debug/views/SceneWaiting.js",
	"bin-debug/views/components/Action_Mask.js",
	"bin-debug/Main.js",
	"bin-debug/views/components/ChooseBtn.js",
	"bin-debug/views/components/Monolog.js",
	"bin-debug/views/components/TextDetail.js",
	"bin-debug/views/panel/PanelNickName.js",
	"bin-debug/views/scenes/SceneOver.js",
	"bin-debug/views/scenes/SceneStep1.js",
	"bin-debug/views/scenes/SceneStep10.js",
	"bin-debug/views/scenes/SceneStep11.js",
	"bin-debug/views/scenes/SceneStep12.js",
	"bin-debug/views/scenes/SceneStep13.js",
	"bin-debug/views/scenes/SceneStep14.js",
	"bin-debug/views/scenes/SceneStep15.js",
	"bin-debug/views/scenes/SceneStep16.js",
	"bin-debug/views/scenes/SceneStep17.js",
	"bin-debug/views/scenes/SceneStep18.js",
	"bin-debug/views/scenes/SceneStep19.js",
	"bin-debug/views/scenes/SceneStep2.js",
	"bin-debug/views/scenes/SceneStep20.js",
	"bin-debug/views/scenes/SceneStep21.js",
	"bin-debug/views/scenes/SceneStep22.js",
	"bin-debug/views/scenes/SceneStep23.js",
	"bin-debug/views/scenes/SceneStep24.js",
	"bin-debug/views/scenes/SceneStep25.js",
	"bin-debug/views/scenes/SceneStep3.js",
	"bin-debug/views/scenes/SceneStep4.js",
	"bin-debug/views/scenes/SceneStep5.js",
	"bin-debug/views/scenes/SceneStep6.js",
	"bin-debug/views/scenes/SceneStep7.js",
	"bin-debug/views/scenes/SceneStep8.js",
	"bin-debug/views/scenes/SceneStep9.js",
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
		contentWidth: 750,
		contentHeight: 1334,
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