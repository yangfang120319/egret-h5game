/**
 *
 * @夜市场-路子
 *
 */
class YSC_LuZi extends eui.Component {
    //定义变量
    private point_num:number=0;
    private point_picture:eui.Image[]=[];
    
    //初始化
    createChildren(): void {
        super.createChildren();

        //定义事件
        basic.Dispatcher.addListener(EventNames.YSC_History,this.onShowLuZi,this);
    }
    
    //显示历史记录
    private onShowLuZi(e:egret.TouchEvent):void{
        //定义变量
        var row_num:number=0;

        //判断清除点
        for(var i:number=0;i<this.point_num;i++){
            this.removeChild(this.point_picture[i]);
        }
        this.point_num=0;
        this.point_picture=[];
        
        //显示界面
        for(var i:number=0;i<e.data.historysColor.length;i++){
            //判断显示
            if(row_num>=12){
                break;
            }
            else{
                for(var j:number=0;j<e.data.historysColor[i][1];j++){
                    //定义变量
                    var img:eui.Image=new eui.Image();

                    //判断赋值
                    if(j==8){
                        row_num+=1;
                    }

                    //定义图片颜色
                    if(e.data.historysColor[i][0]==0){
                        img.source="icon_ysc_luzi_red_png";
                    }
                    else{
                        img.source="icon_ysc_luzi_blue_png";
                    }
                    
                    //定义位置
                    img.x=12+31*row_num;
                    img.y=7+24*(j%8);

                    //数据赋值
                    this.point_picture[this.point_num]=img;

                    //显示界面
                    this.addChild( this.point_picture[this.point_num]);
                    this.point_num+=1;
                }
                row_num+=1;
            }
        }
    }
}
