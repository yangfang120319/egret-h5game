/**
 *Created by jq on 2016/1/24
 * @设置适配模式
 *
 */
module basic {
    export class ScaleMode {
		//设置竖屏模式
		static setPortrait():void{
			//设置屏幕适配
        	basic.StageProxy.stage.scaleMode = egret.StageScaleMode.FIXED_WIDTH;
        	basic.StageProxy.stage.orientation = egret.OrientationMode.PORTRAIT;
		}

		//设置横屏模式
		static setLandscape():void{
			//设置屏幕适配
        	basic.StageProxy.stage.scaleMode = egret.StageScaleMode.FIXED_HEIGHT;
        	basic.StageProxy.stage.orientation = egret.OrientationMode.LANDSCAPE;
		}
	}
}