/**
 *Created by jq on 2016/1/24
 * @消息事件类
 */
module basic {
    export class Dispatcher {
        //定义变量
        static eventDispatcher: egret.EventDispatcher;
        
        //初始化
        static init(): void {
            Dispatcher.eventDispatcher = new egret.EventDispatcher();
        }
        
        //发送消息
        static dispatch(eventName: string,params: any = null): void {
            //判断发送消息
            if(params) {
                Dispatcher.eventDispatcher.dispatchEventWith(eventName,false,params);
            } 
            else {
                Dispatcher.eventDispatcher.dispatchEvent(new egret.Event(eventName));
            }
        }
        
        //注册消息侦听
        static addListener(eventName: string,callback: Function,thisObj: any): void {
            Dispatcher.eventDispatcher.addEventListener(eventName,callback,thisObj);
        }
        
        //注销消息侦听
        static removeListener(eventName: string,callback: Function,thisObj: any): void {
            Dispatcher.eventDispatcher.removeEventListener(eventName,callback,thisObj);
        }
    }
}
