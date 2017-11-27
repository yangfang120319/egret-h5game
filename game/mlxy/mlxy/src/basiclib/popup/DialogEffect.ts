/**
 * Created by jq on 2016/2/8.
 */

/*
 * Blind 刷出来
 * Bounce 跳动
 * Clip 横向收缩
 * Scale 纵向收缩
 * Drop 单向收缩+fade
 * Slide 单向收缩
 * Explode 八方向爆炸
 * Fade 渐进
 * Fold 抽屉收缩
 * Puff 放大+Fade
 * Pulsate 闪烁
 * Shake 抖动
 * */
module basic.dialogEffect {
    export class Utils {
        //水平垂直居中
        static centerPopUp(popUp: eui.Component): void {
            popUp.horizontalCenter = popUp.verticalCenter = 0;
        }
        
        //水平居中
        static centerHorizontal(popUp: eui.Component): void {
            popUp.horizontalCenter = 0;
        }
        
        //垂直居中
        static centerVertical(popUp: eui.Component): void {
            popUp.verticalCenter = 0;
        }
        
        //不设置居中
        static notCenterPopUp(popUp: eui.Component): void {
            popUp.horizontalCenter = popUp.verticalCenter = NaN;
        }
        
        //返回对话框居中位置
        static getCenterPos(popUp: eui.Component): any {
            //定义变量
            var x: number = 0;
            var y: number = 0;
            
            //对话框父级容器
            var parent: egret.DisplayObjectContainer = popUp.parent;
            
            //数据赋值
            if(parent) {
                x = (parent.width - popUp.width) * 0.5;
                y = (parent.height - popUp.height) * 0.5;
            }

            return { x: x,y: y };
        }
        
        //返回位置
        static transDirection(dStr: string): number {
            var d: number;
            switch(dStr) {
                case "up":
                    d = 0;
                    break;
                case "right":
                    d = 1;
                    break;
                case "bottom":
                    d = 2;
                    break;
                case "left":
                    d = 3;
                    break;
            }

            return d;
        }
    }
    
    //定义对话框显示隐藏
    export interface IDialogEffect {
        show(target: eui.Component,parent: eui.Group,callback: Function,thisObj: any,params: any): void;
        hide(target: eui.Component,parent: eui.Group,callback: Function,thisObj: any,params: any): void;
    }
    
    /***
	 * 无效果
	 */
    export class None implements IDialogEffect {
        show(target: eui.Component,parent: eui.Group,callback: Function,thisObj: any,params: any): void {
            parent.addChild(target);
            Utils.centerPopUp(target);
        }

        hide(target: eui.Component,parent: eui.Group,callback: Function,thisObj: any,params: any): void {
            parent.removeChild(target);
        }
    }

	/***
	 * 渐进渐出
	 */
    export class Fade implements IDialogEffect {
        static DEFAULT_DURATION: number = 200;

        show(target: eui.Component,parent: eui.Group,callback: Function,thisObj: any,params: any): void {
            target.alpha = 0;
            parent.addChild(target);
            Utils.centerPopUp(target);
            var duration: number = (params && params.duration) || Fade.DEFAULT_DURATION;
            egret.Tween.get(target).to({ alpha: 1 },duration);
        }

        hide(target: eui.Component,parent: eui.Group,callback: Function,thisObj: any,params: any): void {
            var duration: number = (params && params.duration) || Fade.DEFAULT_DURATION;
            egret.Tween.get(target).to({ alpha: 0 },duration).call(function(): void {
                parent.removeChild(target);
            },this);
        }
    }

	/**
	 * 飞入
	 * duration: 时间
	 * direction: 方向(up, bottom, left, right)
	 * withFade: 是否伴随渐进渐出
	 */
    export class Flew implements IDialogEffect {
        static DEFAULT_DURATION: number = 500;
        static outPos: Array<any>;

        show(target: eui.Component,parent: eui.Group,callback: Function,thisObj: any,params: any): void {
            if(!Flew.outPos) {
                Flew.outPos = [[0,-StageProxy.height],[StageProxy.width,0],[0,StageProxy.height],[-StageProxy.width,0]];
            }

            parent.addChild(target);
            Utils.notCenterPopUp(target);
            parent.width = StageProxy.width;
            var startPos: any = Flew.outPos[Utils.transDirection(params.direction)];
            var centerPos: any = Utils.getCenterPos(target);
            target.x = startPos[0] == 0 ? centerPos.x : startPos[0];
            target.y = startPos[1] == 0 ? centerPos.y : startPos[1];
            var duration: number = (params && params.duration) || Flew.DEFAULT_DURATION;
            var state: any = { x: centerPos.x,y: centerPos.y };
            egret.Tween.get(target).to(state,duration,params ? params.ease : null);
            if(params && params.withFade) {
                egret.Tween.get(target).to({ alpha: 1 },duration);
            }
        }

        hide(target: eui.Component,parent: eui.Group,callback: Function,thisObj: any,params: any): void {
            var endPos: any = Flew.outPos[Utils.transDirection(params.direction)];
            var duration: number = (params && params.duration) || Flew.DEFAULT_DURATION;
            var centerPos: any = Utils.getCenterPos(target);
            var state: any = {
                x: (endPos[0] == 0 ? centerPos.x : endPos[0]),
                y: endPos[1] == 0 ? centerPos.y : endPos[1]
            };
            egret.Tween.get(target).to(state,duration,params ? params.ease : null).call(function(): void {
                parent.removeChild(target);
                Utils.centerPopUp(target);
            },this);
            if(params && params.withFade) {
                egret.Tween.get(target).to({ alpha: 0 },duration);
            }
        }
    }

	/***
	 * 缩放
	 * duration: 时间
	 * withFade: 是否伴随渐进渐出
	 */
    export class Scale implements IDialogEffect {
        static DEFAULT_DURATION: number = 200;

        show(target: eui.Component,parent: eui.Group,callback: Function,thisObj: any,params: any): void {
            var duration: number = (params && params.duration) || Scale.DEFAULT_DURATION;
            target.scaleX = target.scaleY = 0;
            var state: any = { scaleX: 1,scaleY: 1 };
            parent.addChild(target);
            Utils.centerPopUp(target);
            egret.Tween.get(target).to(state,duration,params ? params.ease : null);
            if(params && params.withFade) {
                egret.Tween.get(target).to({ alpha: 1 },duration);
            }
        }

        hide(target: eui.Component,parent: eui.Group,callback: Function,thisObj: any,params: any): void {
            var duration: number = (params && params.duration) || Scale.DEFAULT_DURATION;
            target.scaleX = target.scaleY = 1;
            var state: any = { scaleX: 0,scaleY: 0 };
            egret.Tween.get(target).to(state,duration,params ? params.ease : null).call(function(): void {
                parent.removeChild(target);
                target.scaleX = target.scaleY = 1;
            },this);
            if(params && params.withFade) {
                egret.Tween.get(target).to({ alpha: 0 },duration);
            }
        }
    }
}