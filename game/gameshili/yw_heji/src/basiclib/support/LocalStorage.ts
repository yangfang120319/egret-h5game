/**
 *Created by jq on 2016/1/24
 * @本地数据库
 *
 */
module basic {
    export class localStorage {
        //定义变量
        static ID: string;
        
        //初始化
        static init(ID: string): void {
            this.ID = ID;
        }
        
        //获取文本数据
        static getItem(key: string): string {
            return egret.localStorage.getItem(this.ID && this.ID != '' ? this.ID + '_' + key : key);
        }
        
        //保存文本数据
        static setItem(key: string,value: string): boolean {
            return egret.localStorage.setItem(this.ID && this.ID != '' ? this.ID + '_' + key : key,value);
        }
        
        //获取对象数据
        static getItemObj(key: string,defaultObj: any = null): any {
            var result: any;
            try {
                result = JSON.parse(this.getItem(key));
            } catch(e) {

            }
            if(!result) {
                result = defaultObj;
            }
            return result;
        }
        
        //保存对象数据
        static setItemObj(key: string,itemObj: any): boolean {
            return this.setItem(key,JSON.stringify(itemObj));
        }
    }
}