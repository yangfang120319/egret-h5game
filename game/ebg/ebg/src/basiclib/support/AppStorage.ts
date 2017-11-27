/**
 *Created by jq on 2016/1/24
 * @APP数据库
 *
 */
module basic {
    export class appStorage {
        //获取文本数据
        static getItem(key: string): string {
            //判断返回
            if(basic.AppNative.AppData[key]){
                return basic.AppNative.AppData[key];
            }
            else{
                return null;
            }
        }
        
        //保存文本数据
        static setItem(key: string,value: string): boolean {
            if(basic.AppNative.AppData[key]==null){
                //数据赋值
                basic.AppNative.AppData[key]=value;
                
                //保存数据
                basic.AppNative.saveData(JSON.stringify(basic.AppNative.AppData));
                
                //返回
                return false;
            }
            else{
                //数据赋值
                basic.AppNative.AppData[key]=value;

                //保存数据
                basic.AppNative.saveData(JSON.stringify(basic.AppNative.AppData));
                
                //返回
                return true;
            }
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