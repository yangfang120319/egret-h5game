
var game_file_list = [
    //以下为自动修改，请勿修改
    //----auto game_file_list start----
	"libs/modules/egret/egret.js",
	"libs/modules/egret/egret.native.js",
	"libs/modules/game/game.js",
	"libs/modules/eui/eui.js",
	"libs/modules/res/res.js",
	"libs/modules/tween/tween.js",
	"libs/modules/socket/socket.js",
	"egret_modules/async/bin/async/async.js",
	"egret_modules/extend/bin/extend/extend.js",
	"promise/bin/promise.js",
	"bin-debug/basiclib/popup/PanelBase.js",
	"bin-debug/basiclib/scene/SceneBase.js",
	"bin-debug/basiclib/tools/Utils.js",
	"bin-debug/basiclib/animation/IAnimation.js",
	"bin-debug/basiclib/animation/Wave.js",
	"bin-debug/basiclib/popup/DialogEffect.js",
	"bin-debug/AssetAdapter.js",
	"bin-debug/basiclib/popup/PopUpManager.js",
	"bin-debug/basiclib/qr/QR8bitByte.js",
	"bin-debug/basiclib/qr/QRBitBuffer.js",
	"bin-debug/basiclib/qr/QRCode.js",
	"bin-debug/basiclib/qr/QRCodeModel.js",
	"bin-debug/basiclib/qr/QRErrorCorrectLevel.js",
	"bin-debug/basiclib/qr/QRMaskPattern.js",
	"bin-debug/basiclib/qr/QRMath.js",
	"bin-debug/basiclib/qr/QRMode.js",
	"bin-debug/basiclib/qr/QRPolynomial.js",
	"bin-debug/basiclib/qr/QRRSBlock.js",
	"bin-debug/basiclib/qr/QRUtil.js",
	"bin-debug/ThemeAdapter.js",
	"bin-debug/basiclib/scene/SceneeEffect.js",
	"bin-debug/basiclib/scene/SceneManager.js",
	"bin-debug/basiclib/support/AppNative.js",
	"bin-debug/basiclib/support/AppStorage.js",
	"bin-debug/basiclib/support/Dispatcher.js",
	"bin-debug/basiclib/support/LanguageManager.js",
	"bin-debug/basiclib/support/LocalStorage.js",
	"bin-debug/basiclib/support/Native.js",
	"bin-debug/basiclib/support/ScaleMode.js",
	"bin-debug/basiclib/support/SoundManager.js",
	"bin-debug/basiclib/support/StageProxy.js",
	"bin-debug/basiclib/support/Timer.js",
	"bin-debug/basiclib/support/TimerEvent.js",
	"bin-debug/basiclib/tools/HashMap.js",
	"bin-debug/basiclib/tools/MathUtils.js",
	"bin-debug/basiclib/tools/ShakeTool.js",
	"bin-debug/Main.js",
	"bin-debug/control/Comm.js",
	"bin-debug/control/Socket.js",
	"bin-debug/model/EventNames.js",
	"bin-debug/model/GameConfig.js",
	"bin-debug/model/GameData.js",
	"bin-debug/model/LoaderData.js",
	"bin-debug/model/SceneNames.js",
	"bin-debug/model/UserData.js",
	"bin-debug/views/components/Card.js",
	"bin-debug/views/components/Chat.js",
	"bin-debug/views/components/CountDown.js",
	"bin-debug/views/components/Dice.js",
	"bin-debug/views/components/GameHeads.js",
	"bin-debug/views/components/Head.js",
	"bin-debug/views/components/HeadGame.js",
	"bin-debug/views/components/Person.js",
	"bin-debug/views/components/Run.js",
	"bin-debug/views/components/StartUser.js",
	"bin-debug/views/components/Tips.js",
	"bin-debug/views/components/User.js",
	"bin-debug/views/panel/PanelChooseDice.js",
	"bin-debug/views/panel/PanelChooseSex.js",
	"bin-debug/views/panel/PanelChooseStop.js",
	"bin-debug/views/panel/PanelConnectTips.js",
	"bin-debug/views/panel/PanelEnterRoom.js",
	"bin-debug/views/panel/PanelExit.js",
	"bin-debug/views/panel/PanelGameOver.js",
	"bin-debug/views/panel/PanelRoom.js",
	"bin-debug/views/panel/PanelShopTips.js",
	"bin-debug/views/panel/PanelShowDrCode.js",
	"bin-debug/views/scenes/SceneGame.js",
	"bin-debug/views/scenes/SceneLoading.js",
	"bin-debug/views/scenes/SceneRoom.js",
	"bin-debug/views/scenes/SceneStart.js",
	"bin-debug/views/scenes/SceneWaiting.js",
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
		scaleMode: "fixedHeight",
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