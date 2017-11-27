/**
 * Created by jq on 2016/2/5.
 * 场景基类
 */

module basic {
    export class SceneBase extends eui.Component {
        //初始化界面
        constructor() {
            super();
            
            //触屏控制
            this.touchChildren = true;
            this.touchEnabled = false;
            
            //定义场景大小
            this.width = StageProxy.stage.stageWidth;
            this.height = StageProxy.stage.stageHeight;

            //注册事件
            basic.Dispatcher.addListener(basic.StageProxy.CHANGE_RESIZE,this.onChangeResize,this);
        }
        
        //定义变量
        lastSceneName: string;

        //改变大小
        private onChangeResize(e:egret.Event):void{
            //显示大小
            this.width = basic.StageProxy.width;
            this.height = basic.StageProxy.height;

            //显示屏幕适配
            this.onShowPlace();
        }
        
        //显示前
        _beforeShow(params: any = null): void {
            this.onShowPlace();
            this.beforeShow(params);
        }
        
        //隐藏前
        _beforeHide(params: any = null): void {
            this.beforeHide(params);
        }
        
        //显示时
        _onShow(params: any = null): void {
            this.onShow(params);
        }
        
        //隐藏时
        _onHide(params: any = null): void {
            this.onHide(params);
        }
        
        //显示前
        protected beforeShow(params: any = null): void {
            
        }
        
        //隐藏前
        protected beforeHide(params: any = null): void {

        }
        
        //显示时
        protected onShow(params: any = null): void {

        }
        
        //隐藏时
        protected onHide(params: any = null): void {

        }

        //屏幕适配
        protected onShowPlace(): void {

        }
    }
}