/**
 * Created by jq on 2016/2/8.
 */

module basic {
    export class Native extends egret.EventDispatcher {
        //封装
        private static _instance: Native;
        public static get instance(): Native {
            if(this._instance == undefined) {
                this._instance = new Native();
            }
            return this._instance;
        }
        
        //初始化
        constructor() {
            super();
            
            
            egret.ExternalInterface.addCallback('egretCall',this.egretCall.bind(this));
        }

        static call(method: string,params: any = null): void {
            this.instance.call(method,params);
        }

        get isNative(): boolean {
            return egret.Capabilities.runtimeType == egret.RuntimeType.NATIVE;
        }

        private egretCall(str: string): void {
            var params: any = JSON.parse(str);
            var method: string = params.method;
            this.dispatchEventWith(method,false,params);
        }

        call(method: string,params: any = null): void {
            params = params || {};
            params.method = method;
            egret.ExternalInterface.call('nativeCall',JSON.stringify(params));
        }

        navigateToUrl(url): void {
            if(this.isNative) {
                this.call('navigateToUrl',{ url: url });
            } else {
                location.href = url;
            }
        }

        closeApp(): void {
            this.call('closeApp');
        }

        showBanner(): void {
            //console.log('showBanner');
            if(this.isNative) {
                this.call('showBanner');
            } else {

            }
        }

        hideBanner(): void {
            //console.log('hideBanner');
            if(this.isNative) {
                this.call('hideBanner');
            } else {

            }
        }

        showInterstitial(): void {
            //console.log('showInterstitial');
            if(this.isNative) {
                this.call('showInterstitial');
            } else {

            }
        }

        jumpApp(params: any): void {
            //console.log('download');
            if(this.isNative) {
                this.call('jumpApp',params);
            } else {
                this.navigateToUrl(params.android_apk_url);
            }
        }

        openAppMarket(): void {
            //console.log('openAppMarket');
            if(this.isNative) {
                this.call('openAppMarket',{});
            } else {

            }
        }

        share(title: string,name: string,description: string,picture: string,link: string): void {
            //console.log('share');
            if(this.isNative) {
                this.call('share',{
                    title: title,
                    name: name,
                    description: description,
                    picture: picture,
                    link: link
                });
            } else {
                //share(title, description, link);
            }
        }

        shareSystem(title: string,description: string,link: string): void {
            //console.log('shareSystem');
            if(this.isNative) {
                this.call('shareSystem',{
                    title: title,
                    description: description
                });
            } else {
                this.share(title,'',description,'',link);
            }
        }

        sendEvent(eventId: string,params): void {
            //console.log('sendEvent');
            if(this.isNative) {
                this.call('sendEvent',{ eventId: eventId,params: params });
            } else {

            }
        }
    }
}