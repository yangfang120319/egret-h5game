/**
 * Created by lenovo on 2014/6/12.
 */

module basic {
	export class Utils {
		static injectProp(target:Object, data:Object = null, ignoreMethod:boolean = true):boolean {
			if (!data) {
				return false;
			}

			var result = true;
			for (var key in data) {
				var value:any = data[key];
				if(!ignoreMethod || typeof value != 'function'){
					target[key] = value;
				}
			}
			return result;
		}

		static clone(source:any, def:any = null, ignoreMethod:boolean = true):any{
			var target:any = def ? new def() : {};
			this.injectProp(target, source, ignoreMethod)

			return target;
		}

		static arrToIntArr(arr:any[]):number[] {
			for (var i:number = 0, li:number = arr.length; i < li; i++) {
				arr[i] = parseInt(arr[i]);
			}

			return arr;
		}

        static getUrlParams(): any {
            var params: any = {};
            var href: string = window.location.href;
            var index: number = href.indexOf("?");
            if(index < 0) {
                return params;
            }
            var hashes = href.substr(index + 1).split('&');
            for(var i = 0;i < hashes.length;i++) {
                var arr: Array<string> = hashes[i].split('=');
                params[arr[0]] = arr[1];
            }

            return params;
        }

		static getUrlBase():string {
			var href:string = window.location.href;
			var index:number = href.indexOf("?");
			return href.substring(0, index < 0 ? href.length : index);
		}

		static anchorCenter(target:any, width:number = 0, height:number = 0):void {
			this.anchorRate(target, 0.5, 0.5, width, height);
		}

		static anchorRate(target:any, rx:number, ry:number, width:number = 0, height:number = 0):void {
			if(width == 0){
				width = target.width;
			}
			if(height == 0){
				height = target.height;
			}
			target.x += target.anchorOffsetX = width * rx;
			target.y += target.anchorOffsetY = height * ry;
		}

		/**
		 * object转成查询字符串
		 * @param obj
		 * @returns {string}
		 */
		static obj2query(obj:any):string{
			if(!obj){
				return '';
			}
			var arr:string[] = [];
			for(var key in obj){
				arr.push(key + '=' + obj[key]);
			}
			return arr.join('&');
		}
	}
}